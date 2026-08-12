import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Bell,
  Building2,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  CreditCard,
  KeyRound,
  LockKeyhole,
  MapPin,
  PackageCheck,
  Save,
  ShieldCheck,
  Store,
  Truck,
  UserRound,
  Wallet,
} from 'lucide-react';
import { updateCurrentUser } from '../../auth/authStore.js';
import { usePharmacyStore } from '../../pharmacy/pharmacyStore.js';

const tabs = [
  ['profile', 'بيانات الصيدلية', Store],
  ['hours', 'ساعات العمل', Clock3],
  ['orders', 'الطلبات والتوصيل', PackageCheck],
  ['payments', 'طرق الدفع', CreditCard],
  ['notifications', 'الإشعارات', Bell],
  ['security', 'الحساب والأمان', ShieldCheck],
];

function Toggle({ checked, onChange, label }) {
  return (
    <button type="button" className={`pharmacy-settings-toggle ${checked ? 'on' : ''}`} onClick={() => onChange(!checked)} aria-pressed={checked} aria-label={label}>
      <i />
    </button>
  );
}

export default function PharmacySettings() {
  const { user } = useOutletContext();
  const { data, updateSection } = usePharmacyStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [draft, setDraft] = useState(data.settings);
  const [saved, setSaved] = useState(false);
  const [security, setSecurity] = useState({ current: '', next: '', confirm: '' });
  const [securityNotice, setSecurityNotice] = useState(null);

  useEffect(() => setDraft(data.settings), [data.settings]);

  function updateField(key, value) {
    setDraft((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function saveSettings(event) {
    event?.preventDefault?.();
    updateSection('settings', draft);
    updateSection('profile', (profile) => ({
      ...profile,
      pharmacyName: draft.pharmacyName,
      pharmacyAddress: draft.pharmacyAddress,
      phone: draft.pharmacyPhone,
    }));
    try {
      updateCurrentUser({
        labName: draft.pharmacyName,
        labAddress: draft.pharmacyAddress,
        phone: draft.pharmacyPhone,
      });
    } catch {
      // تبقى إعدادات لوحة الصيدلية محفوظة محليًا حتى لو انتهت الجلسة.
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  function updatePassword(event) {
    event.preventDefault();
    setSecurityNotice(null);
    if (security.current !== user.password) {
      setSecurityNotice({ type: 'error', text: 'كلمة المرور الحالية غير صحيحة.' });
      return;
    }
    if (security.next.length < 6) {
      setSecurityNotice({ type: 'error', text: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل.' });
      return;
    }
    if (security.next !== security.confirm) {
      setSecurityNotice({ type: 'error', text: 'تأكيد كلمة المرور غير مطابق.' });
      return;
    }
    updateCurrentUser({ password: security.next });
    setSecurity({ current: '', next: '', confirm: '' });
    setSecurityNotice({ type: 'success', text: 'تم تحديث كلمة المرور بنجاح.' });
  }

  return (
    <div className="pharmacy-settings-page">
      <section className="pharmacy-page-heading pharmacy-settings-heading">
        <div>
          <span className="pharmacy-heading-icon"><Store /></span>
          <div><h1>إعدادات الصيدلية</h1><p>خصص بيانات الصيدلية وساعات العمل والطلبات والإشعارات.</p></div>
        </div>
        <button type="button" className={`pharmacy-btn ${saved ? 'pharmacy-btn-success' : 'pharmacy-btn-primary'}`} onClick={saveSettings}>
          {saved ? <CheckCircle2 /> : <Save />}{saved ? 'تم الحفظ' : 'حفظ التغييرات'}
        </button>
      </section>

      <section className="pharmacy-settings-layout">
        <aside className="pharmacy-settings-tabs">
          {tabs.map(([key, label, Icon]) => (
            <button key={key} type="button" className={activeTab === key ? 'active' : ''} onClick={() => setActiveTab(key)}>
              <Icon /><span>{label}</span><ChevronLeft />
            </button>
          ))}
        </aside>

        <div className="pharmacy-settings-content">
          {activeTab === 'profile' && (
            <form className="pharmacy-settings-section" onSubmit={saveSettings}>
              <header><span><Building2 /></span><div><h2>بيانات الصيدلية</h2><p>المعلومات التي تظهر في لوحة التحكم والطلبات.</p></div></header>
              <div className="pharmacy-settings-profile-card"><span><Store /></span><div><strong>{draft.pharmacyName || 'صيدلية تبيان'}</strong><small>{draft.pharmacyAddress || 'أضف عنوان الصيدلية'}</small></div><i className={draft.open ? 'open' : ''}>{draft.open ? 'مفتوحة' : 'مغلقة'}</i></div>
              <div className="pharmacy-form-grid">
                <label><span>اسم الصيدلية</span><div className="pharmacy-input-with-icon"><Store /><input value={draft.pharmacyName} onChange={(event) => updateField('pharmacyName', event.target.value)} /></div></label>
                <label><span>رقم الهاتف</span><div className="pharmacy-input-with-icon"><UserRound /><input value={draft.pharmacyPhone} onChange={(event) => updateField('pharmacyPhone', event.target.value)} /></div></label>
                <label className="wide"><span>عنوان الصيدلية</span><div className="pharmacy-input-with-icon"><MapPin /><input value={draft.pharmacyAddress} onChange={(event) => updateField('pharmacyAddress', event.target.value)} /></div></label>
                <label><span>رقم الترخيص</span><div className="pharmacy-input-with-icon"><ShieldCheck /><input value={draft.licenseNumber} onChange={(event) => updateField('licenseNumber', event.target.value)} /></div></label>
                <label><span>البريد الإلكتروني</span><div className="pharmacy-input-with-icon"><Building2 /><input value={user.email || ''} readOnly /></div></label>
              </div>
              <footer><button type="submit" className="pharmacy-btn pharmacy-btn-primary"><Save /> حفظ البيانات</button></footer>
            </form>
          )}

          {activeTab === 'hours' && (
            <section className="pharmacy-settings-section">
              <header><span><Clock3 /></span><div><h2>ساعات العمل</h2><p>تحكم في حالة الصيدلية ومواعيد استقبال الطلبات.</p></div></header>
              <div className="pharmacy-setting-row important"><span className="pharmacy-setting-icon"><Store /></span><div><strong>حالة الصيدلية الآن</strong><small>عند الإغلاق يعرف العملاء أن الطلبات ستراجع لاحقًا.</small></div><div className="pharmacy-setting-control"><b className={draft.open ? 'status-open' : 'status-closed'}>{draft.open ? 'مفتوحة' : 'مغلقة'}</b><Toggle checked={draft.open} onChange={(value) => updateField('open', value)} label="حالة الصيدلية" /></div></div>
              <div className="pharmacy-setting-row"><span className="pharmacy-setting-icon"><Clock3 /></span><div><strong>خدمة 24 ساعة</strong><small>تجاهل وقت الفتح والإغلاق واستقبال الطلبات طوال اليوم.</small></div><Toggle checked={draft.alwaysOpen} onChange={(value) => updateField('alwaysOpen', value)} label="خدمة 24 ساعة" /></div>
              {!draft.alwaysOpen && <div className="pharmacy-time-grid"><label><span>وقت الفتح</span><input type="time" value={draft.openingTime} onChange={(event) => updateField('openingTime', event.target.value)} /></label><label><span>وقت الإغلاق</span><input type="time" value={draft.closingTime} onChange={(event) => updateField('closingTime', event.target.value)} /></label></div>}
              <div className="pharmacy-week-schedule"><h3>أيام العمل</h3>{['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day, index) => <div key={day}><span>{day}</span><b className={index === 6 ? 'closed' : ''}>{index === 6 ? 'إجازة' : draft.alwaysOpen ? '24 ساعة' : `${draft.openingTime} - ${draft.closingTime}`}</b><button type="button">تعديل</button></div>)}</div>
            </section>
          )}

          {activeTab === 'orders' && (
            <section className="pharmacy-settings-section">
              <header><span><PackageCheck /></span><div><h2>الطلبات والتوصيل</h2><p>حدد طرق الاستلام والقيم الافتراضية للطلبات.</p></div></header>
              <div className="pharmacy-setting-row"><span className="pharmacy-setting-icon"><Store /></span><div><strong>الاستلام من الصيدلية</strong><small>السماح للعميل بتجهيز الطلب واستلامه من الفرع.</small></div><Toggle checked={draft.pickupEnabled} onChange={(value) => updateField('pickupEnabled', value)} label="الاستلام" /></div>
              <div className="pharmacy-setting-row"><span className="pharmacy-setting-icon"><Truck /></span><div><strong>خدمة التوصيل</strong><small>تفعيل توصيل الطلبات إلى عنوان العميل.</small></div><Toggle checked={draft.deliveryEnabled} onChange={(value) => updateField('deliveryEnabled', value)} label="التوصيل" /></div>
              <div className="pharmacy-form-grid settings-numbers">
                <label><span>رسوم التوصيل</span><input type="number" min="0" value={draft.deliveryFee} onChange={(event) => updateField('deliveryFee', Number(event.target.value))} /></label>
                <label><span>الحد الأدنى للطلب</span><input type="number" min="0" value={draft.minOrder} onChange={(event) => updateField('minOrder', Number(event.target.value))} /></label>
                <label><span>وقت التجهيز المتوقع بالدقائق</span><input type="number" min="5" value={draft.preparationMinutes} onChange={(event) => updateField('preparationMinutes', Number(event.target.value))} /></label>
              </div>
            </section>
          )}

          {activeTab === 'payments' && (
            <section className="pharmacy-settings-section">
              <header><span><CreditCard /></span><div><h2>طرق الدفع</h2><p>اختر الطرق التي يمكن للعميل استخدامها عند الطلب.</p></div></header>
              {[
                ['paymentCash', 'الدفع عند الاستلام', Wallet, 'يتم تحصيل المبلغ عند الاستلام أو التوصيل.'],
                ['paymentCard', 'البطاقات البنكية', CreditCard, 'قبول بطاقات مدى والبطاقات البنكية.'],
                ['paymentWallet', 'المحفظة الإلكترونية', Wallet, 'الدفع باستخدام المحافظ الرقمية.'],
                ['paymentTransfer', 'التحويل البنكي', Building2, 'إتاحة التحويل إلى حساب الصيدلية.'],
              ].map(([key, label, Icon, description]) => <div key={key} className="pharmacy-payment-setting"><span><Icon /></span><div><strong>{label}</strong><small>{description}</small></div><Toggle checked={draft[key]} onChange={(value) => updateField(key, value)} label={label} /></div>)}
            </section>
          )}

          {activeTab === 'notifications' && (
            <section className="pharmacy-settings-section">
              <header><span><Bell /></span><div><h2>إعدادات الإشعارات</h2><p>حدد التنبيهات التي تريد استقبالها أثناء العمل.</p></div></header>
              {[
                ['notifyOrders', 'الطلبات الجديدة', 'تنبيه فوري عند وصول طلب جديد.'],
                ['notifyMessages', 'رسائل العملاء', 'تنبيه عند وصول رسالة أو استفسار.'],
                ['notifyStock', 'نقص المخزون', 'تنبيه عند وصول الدواء إلى الحد الأدنى.'],
                ['notifyExpiry', 'انتهاء الصلاحية', 'تنبيه مبكر للأدوية القريبة من الانتهاء.'],
              ].map(([key, label, description]) => <div key={key} className="pharmacy-setting-row"><span className="pharmacy-setting-icon"><Bell /></span><div><strong>{label}</strong><small>{description}</small></div><Toggle checked={draft[key]} onChange={(value) => updateField(key, value)} label={label} /></div>)}
              <div className="pharmacy-setting-row"><span className="pharmacy-setting-icon"><Clock3 /></span><div><strong>ساعات الهدوء</strong><small>كتم الإشعارات غير العاجلة خلال فترة محددة.</small></div><Toggle checked={draft.quietHours} onChange={(value) => updateField('quietHours', value)} label="ساعات الهدوء" /></div>
              {draft.quietHours && <div className="pharmacy-time-grid"><label><span>من</span><input type="time" value={draft.quietFrom} onChange={(event) => updateField('quietFrom', event.target.value)} /></label><label><span>إلى</span><input type="time" value={draft.quietTo} onChange={(event) => updateField('quietTo', event.target.value)} /></label></div>}
            </section>
          )}

          {activeTab === 'security' && (
            <section className="pharmacy-settings-section">
              <header><span><ShieldCheck /></span><div><h2>الحساب والأمان</h2><p>راجع بيانات الصيدلي وحدّث كلمة المرور.</p></div></header>
              <div className="pharmacy-account-card"><span>{(user.fullName || 'ص').charAt(0)}</span><div><strong>{user.fullName}</strong><small>{user.email}</small><p>حساب صيدلي موثّق داخل تبيان</p></div><b><ShieldCheck /> موثّق</b></div>
              <form className="pharmacy-password-form" onSubmit={updatePassword}>
                <h3><KeyRound /> تغيير كلمة المرور</h3>
                {securityNotice && <div className={`pharmacy-settings-notice ${securityNotice.type}`}>{securityNotice.type === 'success' ? <CheckCircle2 /> : <LockKeyhole />}{securityNotice.text}</div>}
                <div className="pharmacy-form-grid">
                  <label className="wide"><span>كلمة المرور الحالية</span><input type="password" required value={security.current} onChange={(event) => setSecurity({ ...security, current: event.target.value })} /></label>
                  <label><span>كلمة المرور الجديدة</span><input type="password" required value={security.next} onChange={(event) => setSecurity({ ...security, next: event.target.value })} /></label>
                  <label><span>تأكيد كلمة المرور</span><input type="password" required value={security.confirm} onChange={(event) => setSecurity({ ...security, confirm: event.target.value })} /></label>
                </div>
                <button type="submit" className="pharmacy-btn pharmacy-btn-primary"><KeyRound /> تحديث كلمة المرور</button>
              </form>
            </section>
          )}

          {activeTab !== 'security' && (
            <div className="pharmacy-settings-mobile-save">
              <button
                type="button"
                className={`pharmacy-btn ${saved ? 'pharmacy-btn-success' : 'pharmacy-btn-primary'}`}
                onClick={saveSettings}
              >
                {saved ? <CheckCircle2 /> : <Save />}
                {saved ? 'تم حفظ التغييرات' : 'حفظ التغييرات'}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
