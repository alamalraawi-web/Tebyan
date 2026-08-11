import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  Banknote,
  CheckCircle2,
  ChevronLeft,
  ClipboardCheck,
  Clock3,
  FileText,
  MapPin,
  MessageSquareText,
  PackageCheck,
  Phone,
  Pill,
  Printer,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserRound,
  X,
  ZoomIn,
} from 'lucide-react';
import { usePharmacyStore } from '../../pharmacy/pharmacyStore.js';
import {
  FULFILLMENT_LABELS,
  PAYMENT_LABELS,
  formatCurrency,
  formatDate,
  formatDateTime,
  getOrderStatus,
  getPrescriptionStatus,
  orderTotal,
} from '../../pharmacy/pharmacyData.js';

const nextStatusMap = {
  new: ['reviewing', 'بدء المراجعة'],
  reviewing: ['confirmed', 'تأكيد الطلب'],
  confirmed: ['preparing', 'بدء التجهيز'],
  preparing: ['ready', 'تحديده كجاهز'],
  ready: ['completed', 'تسليم الطلب'],
  delivering: ['completed', 'تأكيد التسليم'],
};

export default function PharmacyOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, updateOrder } = usePharmacyStore();
  const [showPrescription, setShowPrescription] = useState(false);
  const [note, setNote] = useState('');

  const order = useMemo(() => data.orders.find((item) => item.id === id), [data.orders, id]);

  if (!order) {
    return (
      <div className="pharmacy-empty-page">
        <span><ShoppingBag /></span>
        <h1>الطلب غير موجود</h1>
        <p>ربما تم حذف الطلب أو أن الرابط غير صحيح.</p>
        <Link className="pharmacy-btn pharmacy-btn-primary" to="/pharmacy/orders"><ArrowRight /> العودة إلى الطلبات</Link>
      </div>
    );
  }

  const status = getOrderStatus(order.status);
  const prescriptionStatus = order.prescription ? getPrescriptionStatus(order.prescription.status) : null;
  const subtotal = order.medicines.reduce((sum, medicine) => sum + medicine.price * medicine.quantity, 0);
  const nextAction = nextStatusMap[order.status];
  const canDeliver = order.fulfillment === 'delivery' && order.status === 'ready';

  function addTimeline(statusKey, label) {
    return {
      id: `TL-${Date.now()}`,
      status: statusKey,
      label,
      at: new Date().toISOString(),
    };
  }

  function moveTo(statusKey, label) {
    updateOrder(order.id, (current) => ({
      ...current,
      status: statusKey,
      timeline: [...current.timeline, addTimeline(statusKey, label)],
    }));
  }

  function handlePrimaryAction() {
    if (!nextAction) return;
    moveTo(nextAction[0], nextAction[1]);
  }

  function sendToDelivery() {
    moveTo('delivering', 'خرج الطلب للتوصيل');
  }

  function cancelOrder() {
    if (!window.confirm('هل تريد إلغاء هذا الطلب؟')) return;
    moveTo('cancelled', 'تم إلغاء الطلب من الصيدلية');
  }

  function updatePrescription(statusKey, label) {
    updateOrder(order.id, (current) => ({
      ...current,
      prescription: {
        ...current.prescription,
        status: statusKey,
        note: note.trim() || current.prescription.note,
      },
      timeline: [...current.timeline, addTimeline(current.status, label)],
    }));
    setNote('');
  }

  function togglePayment() {
    updateOrder(order.id, (current) => ({
      ...current,
      paymentStatus: current.paymentStatus === 'paid' ? 'pending' : 'paid',
      timeline: [
        ...current.timeline,
        addTimeline(current.status, current.paymentStatus === 'paid' ? 'تمت إعادة حالة الدفع إلى غير مدفوع' : 'تم تسجيل الدفع'),
      ],
    }));
  }

  return (
    <div className="pharmacy-order-detail-page">
      <section className="pharmacy-order-detail-head">
        <div className="pharmacy-detail-heading">
          <button type="button" onClick={() => navigate('/pharmacy/orders')} aria-label="العودة"><ArrowRight /></button>
          <div>
            <div><span>{order.id}</span>{order.priority === 'urgent' && <b><AlertTriangle /> عاجل</b>}</div>
            <h1>طلب {order.customer.name}</h1>
            <p>تم الإنشاء {formatDateTime(order.createdAt)}</p>
          </div>
        </div>
        <div className="pharmacy-order-head-actions">
          <span className={`pharmacy-badge large tone-${status.tone}`}>{status.label}</span>
          <button type="button" className="pharmacy-btn pharmacy-btn-soft" onClick={() => window.print()}><Printer /> طباعة</button>
          {canDeliver && <button type="button" className="pharmacy-btn pharmacy-btn-cyan" onClick={sendToDelivery}><Truck /> إرسال للتوصيل</button>}
          {nextAction && <button type="button" className="pharmacy-btn pharmacy-btn-primary" onClick={handlePrimaryAction}><CheckCircle2 /> {nextAction[1]}</button>}
        </div>
      </section>

      <section className="pharmacy-order-progress-card">
        <div className="pharmacy-order-progress">
          {[
            ['new', 'استقبال', ShoppingBag],
            ['reviewing', 'مراجعة', ClipboardCheck],
            ['confirmed', 'تأكيد', ShieldCheck],
            ['preparing', 'تجهيز', Pill],
            ['ready', 'جاهز', PackageCheck],
            [order.fulfillment === 'delivery' ? 'delivering' : 'completed', order.fulfillment === 'delivery' ? 'توصيل' : 'تسليم', order.fulfillment === 'delivery' ? Truck : CheckCircle2],
          ].map(([key, label, Icon], index, all) => {
            const orderIndex = ['new', 'reviewing', 'confirmed', 'preparing', 'ready', 'delivering', 'completed'].indexOf(order.status);
            const stepIndex = ['new', 'reviewing', 'confirmed', 'preparing', 'ready', 'delivering', 'completed'].indexOf(key);
            const complete = order.status !== 'cancelled' && stepIndex <= orderIndex;
            return (
              <div key={`${key}-${label}`} className={`pharmacy-progress-step ${complete ? 'complete' : ''}`}>
                <span><Icon /></span>
                <small>{label}</small>
                {index < all.length - 1 && <i />}
              </div>
            );
          })}
        </div>
        {order.status === 'cancelled' && <div className="pharmacy-cancelled-banner"><Ban /> تم إلغاء هذا الطلب ولن ينتقل إلى مراحل أخرى.</div>}
      </section>

      <section className="pharmacy-detail-grid">
        <div className="pharmacy-detail-main-column">
          <article className="pharmacy-panel">
            <header className="pharmacy-panel-head">
              <div><span className="pharmacy-panel-icon"><Pill /></span><div><h2>الأدوية المطلوبة</h2><p>{order.medicines.length} أصناف في هذا الطلب</p></div></div>
            </header>
            <div className="pharmacy-order-medicines">
              {order.medicines.map((medicine) => (
                <div key={medicine.id} className="pharmacy-order-medicine-row">
                  <span className="pharmacy-medicine-photo"><Pill /></span>
                  <div className="pharmacy-medicine-copy">
                    <strong>{medicine.name}</strong>
                    <small>{medicine.concentration} · الكمية {medicine.quantity}</small>
                    <div>
                      {medicine.prescription && <b><FileText /> يحتاج وصفة</b>}
                      <em className={medicine.availability === 'available' ? 'available' : 'unavailable'}>{medicine.availability === 'available' ? 'متوفر' : 'غير متوفر'}</em>
                    </div>
                  </div>
                  <div className="pharmacy-medicine-price">
                    <strong>{formatCurrency(medicine.price * medicine.quantity)}</strong>
                    <small>{formatCurrency(medicine.price)} للوحدة</small>
                  </div>
                </div>
              ))}
            </div>
            <div className="pharmacy-order-totals">
              <div><span>المجموع الفرعي</span><strong>{formatCurrency(subtotal)}</strong></div>
              <div><span>رسوم التوصيل</span><strong>{formatCurrency(order.deliveryFee)}</strong></div>
              {order.discount > 0 && <div className="discount"><span>الخصم</span><strong>- {formatCurrency(order.discount)}</strong></div>}
              <div className="grand"><span>الإجمالي</span><strong>{formatCurrency(orderTotal(order))}</strong></div>
            </div>
          </article>

          {order.prescription && (
            <article className="pharmacy-panel pharmacy-prescription-review-card">
              <header className="pharmacy-panel-head">
                <div><span className="pharmacy-panel-icon success"><ClipboardCheck /></span><div><h2>الوصفة الطبية</h2><p>{order.prescription.id} · {formatDate(order.prescription.date)}</p></div></div>
                <span className={`pharmacy-badge tone-${prescriptionStatus.tone}`}>{prescriptionStatus.label}</span>
              </header>

              <div className="pharmacy-prescription-review-layout">
                <button type="button" className="pharmacy-prescription-preview" onClick={() => setShowPrescription(true)}>
                  <span className="rx-paper-lines" />
                  <span className="rx-cross">+</span>
                  <strong>وصفة طبية</strong>
                  <small>{order.prescription.fileName}</small>
                  <em><ZoomIn /> تكبير</em>
                </button>
                <div className="pharmacy-prescription-info">
                  <dl>
                    <div><dt>الطبيب</dt><dd>{order.prescription.doctor}</dd></div>
                    <div><dt>تاريخ الوصفة</dt><dd>{formatDate(order.prescription.date)}</dd></div>
                    <div><dt>اسم الملف</dt><dd>{order.prescription.fileName}</dd></div>
                    <div><dt>ملاحظة سابقة</dt><dd>{order.prescription.note || 'لا توجد ملاحظات'}</dd></div>
                  </dl>
                  <label><span>ملاحظة الصيدلي</span><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="أضف ملاحظة مختصرة حول الوصفة..." /></label>
                  <div className="pharmacy-prescription-actions">
                    <button type="button" className="pharmacy-btn pharmacy-btn-success" onClick={() => updatePrescription('approved', 'تم اعتماد الوصفة')}><CheckCircle2 /> اعتماد</button>
                    <button type="button" className="pharmacy-btn pharmacy-btn-soft" onClick={() => updatePrescription('clarification', 'تم طلب توضيح للوصفة')}><MessageSquareText /> طلب توضيح</button>
                    <button type="button" className="pharmacy-btn pharmacy-btn-danger" onClick={() => updatePrescription('rejected', 'تم رفض الوصفة')}><Ban /> رفض</button>
                  </div>
                </div>
              </div>
            </article>
          )}

          <article className="pharmacy-panel">
            <header className="pharmacy-panel-head">
              <div><span className="pharmacy-panel-icon purple"><Clock3 /></span><div><h2>سجل حركة الطلب</h2><p>تسلسل زمني لكل إجراء تم على الطلب</p></div></div>
            </header>
            <div className="pharmacy-order-timeline">
              {[...order.timeline].reverse().map((entry, index) => (
                <div key={entry.id} className="pharmacy-timeline-entry">
                  <span className={index === 0 ? 'current' : ''}><CheckCircle2 /></span>
                  <div><strong>{entry.label}</strong><small>{formatDateTime(entry.at)}</small></div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="pharmacy-detail-side-column">
          <article className="pharmacy-panel pharmacy-customer-card">
            <header><span><UserRound /></span><div><h2>بيانات العميل</h2><p>{order.customer.id}</p></div></header>
            <div className="pharmacy-customer-profile"><span>{order.customer.name.charAt(0)}</span><div><strong>{order.customer.name}</strong><small>{order.customer.age ? `${order.customer.age} سنة` : 'العمر غير مسجل'}</small></div></div>
            <dl>
              <div><dt><Phone /> الهاتف</dt><dd>{order.customer.phone}</dd></div>
              <div><dt><MapPin /> العنوان</dt><dd>{order.customer.address}</dd></div>
              <div><dt><AlertTriangle /> الحساسية</dt><dd>{order.customer.allergy}</dd></div>
              <div><dt><ShieldCheck /> الحالة المزمنة</dt><dd>{order.customer.chronic}</dd></div>
            </dl>
            <Link className="pharmacy-btn pharmacy-btn-soft full" to={`/pharmacy/messages/${data.conversations.find((item) => item.customerId === order.customer.id)?.id || ''}`}><MessageSquareText /> مراسلة العميل</Link>
          </article>

          <article className="pharmacy-panel pharmacy-fulfillment-card">
            <header><span><Truck /></span><div><h2>الاستلام والدفع</h2><p>تفاصيل تنفيذ الطلب</p></div></header>
            <dl>
              <div><dt>طريقة الاستلام</dt><dd>{FULFILLMENT_LABELS[order.fulfillment]}</dd></div>
              <div><dt>طريقة الدفع</dt><dd>{PAYMENT_LABELS[order.payment]}</dd></div>
              <div><dt>حالة الدفع</dt><dd className={order.paymentStatus === 'paid' ? 'paid' : 'pending'}>{order.paymentStatus === 'paid' ? 'مدفوع' : 'غير مدفوع'}</dd></div>
              {order.courier && <div><dt>المندوب</dt><dd>{order.courier}</dd></div>}
              {order.eta && <div><dt>الوصول المتوقع</dt><dd>{order.eta}</dd></div>}
            </dl>
            <button type="button" className="pharmacy-btn pharmacy-btn-soft full" onClick={togglePayment}><Banknote /> {order.paymentStatus === 'paid' ? 'تعديل إلى غير مدفوع' : 'تسجيل الدفع'}</button>
          </article>

          {order.notes && (
            <article className="pharmacy-order-note-card">
              <MessageSquareText />
              <div><strong>ملاحظة الطلب</strong><p>{order.notes}</p></div>
            </article>
          )}

          {!['completed', 'cancelled'].includes(order.status) && (
            <button type="button" className="pharmacy-cancel-order" onClick={cancelOrder}><Ban /> إلغاء الطلب</button>
          )}
        </aside>
      </section>

      {showPrescription && (
        <div className="pharmacy-modal-layer pharmacy-rx-viewer">
          <button type="button" className="pharmacy-modal-backdrop" onClick={() => setShowPrescription(false)} aria-label="إغلاق" />
          <div className="pharmacy-rx-modal">
            <header><div><ClipboardCheck /><span><strong>الوصفة الطبية</strong><small>{order.prescription.fileName}</small></span></div><button type="button" onClick={() => setShowPrescription(false)}><X /></button></header>
            <div className="pharmacy-rx-document">
              <div className="rx-document-top"><span>+</span><div><strong>وصفة طبية</strong><small>Medical Prescription</small></div></div>
              <div className="rx-patient-row"><span>المريض: {order.customer.name}</span><span>التاريخ: {formatDate(order.prescription.date)}</span></div>
              <strong className="rx-symbol">℞</strong>
              <div className="rx-medicine-lines">{order.medicines.map((medicine) => <p key={medicine.id}>{medicine.name} — {medicine.concentration}</p>)}</div>
              <div className="rx-signature"><span>الطبيب</span><strong>{order.prescription.doctor}</strong></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
