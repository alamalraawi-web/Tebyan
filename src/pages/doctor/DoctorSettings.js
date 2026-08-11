import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Bell, CalendarClock, ChevronLeft, LockKeyhole, MessageCircleMore,
  Moon, Palette, Save, ShieldCheck, Smartphone, Stethoscope, UserRound,
  Video, Volume2, Languages, Clock3, FileLock2
} from 'lucide-react';
import { updateCurrentUser } from '../../auth/authStore';
import { loadDoctorData, saveDoctorData } from '../../doctor/doctorStore';

const defaults = {
  notifications: true, messageSound: true, vibration: true, consultationAlerts: true,
  appointmentReminders: true, reminderMinutes: '30', readReceipts: true, onlineStatus: true,
  autoDownloadImages: true, autoDownloadFiles: false, allowVoiceCalls: true, allowVideoCalls: true,
  quietMode: false, quietFrom: '22:00', quietTo: '07:00', theme: 'light', language: 'ar',
  compactMode: false, requirePin: false, consultationDuration: '30', instantConsultations: true,
};

function Toggle({ checked, onChange }) {
  return <button type="button" className={`settings-toggle ${checked ? 'on' : ''}`} onClick={() => onChange(!checked)} aria-pressed={checked}><i /></button>;
}

function SettingRow({ icon: Icon, title, description, children }) {
  return <div className="setting-row"><span className="setting-icon"><Icon /></span><div className="setting-copy"><strong>{title}</strong><small>{description}</small></div><div className="setting-control">{children}</div></div>;
}

export default function DoctorSettings() {
  const { user } = useOutletContext();
  const [active, setActive] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState(() => ({ ...defaults, ...(loadDoctorData('settings') || {}) }));

  useEffect(() => {
    saveDoctorData('settings', prefs);
  }, [prefs]);
  const set = (key, value) => setPrefs((current) => ({ ...current, [key]: value }));

  function submitProfile(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    updateCurrentUser({
      fullName: form.get('fullName'), specialty: form.get('specialty'), phone: form.get('phone'),
      bio: form.get('bio'), availability: form.get('availability'), licenseNumber: form.get('licenseNumber'),
      yearsExperience: form.get('yearsExperience'), clinicName: form.get('clinicName'), city: form.get('city'),
    });
    setSaved(true); setTimeout(() => setSaved(false), 1800);
  }

  const tabs = [
    ['profile', 'الملف المهني', UserRound], ['consultations', 'الاستشارات والمواعيد', Stethoscope],
    ['messages', 'المحادثات والمكالمات', MessageCircleMore], ['notifications', 'الإشعارات', Bell],
    ['privacy', 'الخصوصية والأمان', ShieldCheck], ['appearance', 'المظهر والتطبيق', Palette],
  ];

  return <>
    <div className="page-head settings-page-title"><div><h1>الإعدادات</h1><p>خصّص مساحة عملك الطبية بالطريقة المناسبة لك.</p></div></div>
    <div className="settings-layout">
      <aside className="settings-tabs">{tabs.map(([id, label, Icon]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => setActive(id)}><Icon /><span>{label}</span><ChevronLeft /></button>)}</aside>
      <section className="settings-content">
        {active === 'profile' && <form className="settings-section" onSubmit={submitProfile}>
          <div className="settings-section-head"><span><UserRound /></span><div><h2>الملف المهني</h2><p>المعلومات التي تمثل حسابك داخل تبيان.</p></div></div>
          <div className="form-grid">
            <div className="field"><label>الاسم الكامل</label><input className="input" name="fullName" defaultValue={user.fullName} required /></div>
            <div className="field"><label>التخصص</label><input className="input" name="specialty" defaultValue={user.specialty || ''} required /></div>
            <div className="field"><label>رقم الترخيص</label><input className="input" name="licenseNumber" defaultValue={user.licenseNumber || ''} /></div>
            <div className="field"><label>سنوات الخبرة</label><input className="input" type="number" min="0" name="yearsExperience" defaultValue={user.yearsExperience || ''} /></div>
            <div className="field"><label>رقم الجوال</label><input className="input" name="phone" defaultValue={user.phone || ''} /></div>
            <div className="field"><label>البريد الإلكتروني</label><input className="input" value={user.email} readOnly /></div>
            <div className="field"><label>اسم العيادة أو المنشأة</label><input className="input" name="clinicName" defaultValue={user.clinicName || ''} /></div>
            <div className="field"><label>المدينة</label><input className="input" name="city" defaultValue={user.city || ''} /></div>
            <div className="field"><label>حالة استقبال الاستشارات</label><select className="select" name="availability" defaultValue={user.availability || 'available'}><option value="available">متاح</option><option value="busy">مشغول</option><option value="offline">غير متاح</option></select></div>
            <div className="field full"><label>نبذة مهنية</label><textarea name="bio" defaultValue={user.bio || ''} placeholder="اكتب نبذة قصيرة عن خبرتك..." /></div>
          </div>
          <button className="btn btn-primary settings-save"><Save /> حفظ الملف المهني</button>
        </form>}

        {active === 'consultations' && <div className="settings-section"><div className="settings-section-head"><span><CalendarClock /></span><div><h2>الاستشارات والمواعيد</h2><p>تحكم بطريقة استقبال وتنظيم الحالات.</p></div></div>
          <SettingRow icon={Stethoscope} title="الاستشارات الفورية" description="السماح للمرضى بطلب استشارة فورية"><Toggle checked={prefs.instantConsultations} onChange={(v) => set('instantConsultations', v)} /></SettingRow>
          <SettingRow icon={Clock3} title="مدة الاستشارة الافتراضية" description="المدة المقترحة عند إضافة موعد"><select className="mini-select" value={prefs.consultationDuration} onChange={(e) => set('consultationDuration', e.target.value)}><option value="15">15 دقيقة</option><option value="30">30 دقيقة</option><option value="45">45 دقيقة</option><option value="60">60 دقيقة</option></select></SettingRow>
          <SettingRow icon={CalendarClock} title="تذكير الموعد" description="إرسال تنبيه قبل الموعد"><select className="mini-select" value={prefs.reminderMinutes} onChange={(e) => set('reminderMinutes', e.target.value)}><option value="10">قبل 10 دقائق</option><option value="30">قبل 30 دقيقة</option><option value="60">قبل ساعة</option></select></SettingRow>
        </div>}

        {active === 'messages' && <div className="settings-section"><div className="settings-section-head"><span><MessageCircleMore /></span><div><h2>المحادثات والمكالمات</h2><p>إعدادات التواصل مع المرضى.</p></div></div>
          <SettingRow icon={PhoneIcon} title="المكالمات الصوتية" description="السماح باستقبال المكالمات الصوتية"><Toggle checked={prefs.allowVoiceCalls} onChange={(v) => set('allowVoiceCalls', v)} /></SettingRow>
          <SettingRow icon={Video} title="مكالمات الفيديو" description="السماح باستقبال مكالمات مرئية"><Toggle checked={prefs.allowVideoCalls} onChange={(v) => set('allowVideoCalls', v)} /></SettingRow>
          <SettingRow icon={Volume2} title="صوت الرسائل" description="تشغيل نغمة عند وصول رسالة جديدة"><Toggle checked={prefs.messageSound} onChange={(v) => set('messageSound', v)} /></SettingRow>
          <SettingRow icon={Smartphone} title="الاهتزاز" description="اهتزاز الهاتف عند التنبيهات"><Toggle checked={prefs.vibration} onChange={(v) => set('vibration', v)} /></SettingRow>
          <SettingRow icon={FileLock2} title="تنزيل الصور تلقائيًا" description="تحميل الصور الواردة عند فتح المحادثة"><Toggle checked={prefs.autoDownloadImages} onChange={(v) => set('autoDownloadImages', v)} /></SettingRow>
          <SettingRow icon={FileLock2} title="تنزيل الملفات تلقائيًا" description="يفضل تعطيله لتقليل استهلاك البيانات"><Toggle checked={prefs.autoDownloadFiles} onChange={(v) => set('autoDownloadFiles', v)} /></SettingRow>
        </div>}

        {active === 'notifications' && <div className="settings-section"><div className="settings-section-head"><span><Bell /></span><div><h2>الإشعارات</h2><p>اختر التنبيهات المهمة لك.</p></div></div>
          <SettingRow icon={Bell} title="جميع الإشعارات" description="تشغيل أو إيقاف إشعارات الطبيب"><Toggle checked={prefs.notifications} onChange={(v) => set('notifications', v)} /></SettingRow>
          <SettingRow icon={MessageCircleMore} title="تنبيهات الاستشارات" description="عند وصول طلب أو رد جديد"><Toggle checked={prefs.consultationAlerts} onChange={(v) => set('consultationAlerts', v)} /></SettingRow>
          <SettingRow icon={CalendarClock} title="تذكيرات المواعيد" description="تنبيهات المواعيد القادمة"><Toggle checked={prefs.appointmentReminders} onChange={(v) => set('appointmentReminders', v)} /></SettingRow>
          <SettingRow icon={Moon} title="وضع عدم الإزعاج" description="كتم الإشعارات خلال فترة محددة"><Toggle checked={prefs.quietMode} onChange={(v) => set('quietMode', v)} /></SettingRow>
          {prefs.quietMode && <div className="quiet-grid"><label>من<input type="time" value={prefs.quietFrom} onChange={(e) => set('quietFrom', e.target.value)} /></label><label>إلى<input type="time" value={prefs.quietTo} onChange={(e) => set('quietTo', e.target.value)} /></label></div>}
        </div>}

        {active === 'privacy' && <div className="settings-section"><div className="settings-section-head"><span><ShieldCheck /></span><div><h2>الخصوصية والأمان</h2><p>تحكم بظهورك وحماية بياناتك.</p></div></div>
          <SettingRow icon={CheckIcon} title="مؤشرات قراءة الرسائل" description="إظهار علامتي القراءة للمريض"><Toggle checked={prefs.readReceipts} onChange={(v) => set('readReceipts', v)} /></SettingRow>
          <SettingRow icon={UserRound} title="إظهار حالة الاتصال" description="السماح للمريض بمعرفة أنك متصل"><Toggle checked={prefs.onlineStatus} onChange={(v) => set('onlineStatus', v)} /></SettingRow>
          <SettingRow icon={LockKeyhole} title="قفل التطبيق برمز" description="طلب رمز عند فتح مساحة الطبيب"><Toggle checked={prefs.requirePin} onChange={(v) => set('requirePin', v)} /></SettingRow>
        </div>}

        {active === 'appearance' && <div className="settings-section"><div className="settings-section-head"><span><Palette /></span><div><h2>المظهر والتطبيق</h2><p>خيارات العرض واللغة.</p></div></div>
          <SettingRow icon={Moon} title="مظهر التطبيق" description="اختر المظهر المناسب"><select className="mini-select" value={prefs.theme} onChange={(e) => set('theme', e.target.value)}><option value="light">فاتح</option><option value="system">حسب الجهاز</option><option value="dark">داكن</option></select></SettingRow>
          <SettingRow icon={Languages} title="لغة الواجهة" description="لغة مساحة الطبيب"><select className="mini-select" value={prefs.language} onChange={(e) => set('language', e.target.value)}><option value="ar">العربية</option><option value="en">English</option></select></SettingRow>
          <SettingRow icon={Smartphone} title="الوضع المضغوط" description="تقليل المسافات لإظهار محتوى أكثر"><Toggle checked={prefs.compactMode} onChange={(v) => set('compactMode', v)} /></SettingRow>
        </div>}
      </section>
    </div>
    {saved && <div className="toast">تم حفظ البيانات بنجاح</div>}
  </>;
}

function PhoneIcon(props) { return <Volume2 {...props} />; }
function CheckIcon(props) { return <ShieldCheck {...props} />; }
