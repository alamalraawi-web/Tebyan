import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Ban,
  CheckCircle2,
  ChevronLeft,
  ClipboardCheck,
  Clock3,
  FileSearch,
  MessageSquareText,
  Search,
  ShieldCheck,
  UserRound,
  ZoomIn,
} from 'lucide-react';
import { usePharmacyStore } from '../../pharmacy/pharmacyStore.js';
import {
  PRESCRIPTION_STATUSES,
  formatDate,
  formatDateTime,
  getPrescriptionStatus,
} from '../../pharmacy/pharmacyData.js';

const tabs = [
  ['all', 'الكل'],
  ['pending', 'جديدة'],
  ['reviewing', 'قيد المراجعة'],
  ['approved', 'معتمدة'],
  ['clarification', 'تحتاج توضيحًا'],
  ['rejected', 'مرفوضة'],
];

export default function PharmacyPrescriptions() {
  const { data, updateOrder } = usePharmacyStore();
  const [active, setActive] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [note, setNote] = useState('');

  const prescriptions = useMemo(() => data.orders
    .filter((order) => order.prescription)
    .map((order) => ({ ...order.prescription, order })), [data.orders]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return prescriptions.filter((prescription) => {
      const matchesTab = active === 'all' || prescription.status === active;
      const haystack = [
        prescription.id,
        prescription.order.id,
        prescription.order.customer.name,
        prescription.doctor,
        ...prescription.order.medicines.map((medicine) => medicine.name),
      ].join(' ').toLowerCase();
      return matchesTab && (!query || haystack.includes(query));
    });
  }, [active, prescriptions, search]);

  const selected = prescriptions.find((item) => item.id === selectedId) || filtered[0] || null;
  const counts = Object.keys(PRESCRIPTION_STATUSES).reduce((result, key) => ({
    ...result,
    [key]: prescriptions.filter((item) => item.status === key).length,
  }), {});

  function updatePrescription(prescription, status, actionLabel) {
    updateOrder(prescription.order.id, (order) => ({
      ...order,
      prescription: {
        ...order.prescription,
        status,
        note: note.trim() || order.prescription.note,
      },
      timeline: [
        ...order.timeline,
        {
          id: `TL-RX-${Date.now()}`,
          status: order.status,
          label: actionLabel,
          at: new Date().toISOString(),
        },
      ],
    }));
    setNote('');
  }

  return (
    <div className="pharmacy-prescriptions-page">
      <section className="pharmacy-page-heading">
        <div>
          <span className="pharmacy-heading-icon success"><ClipboardCheck /></span>
          <div><h1>الوصفات الطبية</h1><p>راجع الملفات المرفوعة وتحقق منها قبل صرف الأدوية.</p></div>
        </div>
        <div className="pharmacy-prescription-kpis">
          <span><Clock3 /><strong>{counts.pending || 0}</strong><small>جديدة</small></span>
          <span><FileSearch /><strong>{counts.clarification || 0}</strong><small>توضيح</small></span>
          <span><ShieldCheck /><strong>{counts.approved || 0}</strong><small>معتمدة</small></span>
        </div>
      </section>

      <section className="pharmacy-prescription-workspace">
        <aside className="pharmacy-prescription-list-panel">
          <div className="pharmacy-prescription-tabs">
            {tabs.map(([key, label]) => (
              <button key={key} type="button" className={active === key ? 'active' : ''} onClick={() => setActive(key)}>
                {label}<b>{key === 'all' ? prescriptions.length : counts[key] || 0}</b>
              </button>
            ))}
          </div>

          <label className="pharmacy-search-box compact">
            <Search />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث عن وصفة أو مريض" />
          </label>

          <div className="pharmacy-prescription-list">
            {filtered.map((prescription) => {
              const meta = getPrescriptionStatus(prescription.status);
              return (
                <button
                  key={prescription.id}
                  type="button"
                  className={selected?.id === prescription.id ? 'active' : ''}
                  onClick={() => setSelectedId(prescription.id)}
                >
                  <span className="pharmacy-rx-mini-preview"><strong>℞</strong><i /></span>
                  <div>
                    <header><strong>{prescription.order.customer.name}</strong><span className={`pharmacy-badge tone-${meta.tone}`}>{meta.label}</span></header>
                    <p>{prescription.id} · {prescription.order.id}</p>
                    <small>{prescription.doctor} · {formatDate(prescription.date)}</small>
                  </div>
                  <ChevronLeft />
                </button>
              );
            })}
          </div>

          {!filtered.length && (
            <div className="pharmacy-empty-state small"><FileSearch /><h3>لا توجد وصفات</h3><p>لا توجد نتائج ضمن هذا التصنيف.</p></div>
          )}
        </aside>

        <article className="pharmacy-prescription-detail-panel">
          {selected ? (
            <>
              <header className="pharmacy-prescription-detail-head">
                <div><span><ClipboardCheck /></span><div><h2>{selected.order.customer.name}</h2><p>{selected.id} · وصلت {formatDateTime(selected.order.createdAt)}</p></div></div>
                <span className={`pharmacy-badge large tone-${getPrescriptionStatus(selected.status).tone}`}>{getPrescriptionStatus(selected.status).label}</span>
              </header>

              <div className="pharmacy-prescription-detail-grid">
                <div className="pharmacy-rx-large-preview">
                  <div className="rx-preview-top"><span>+</span><div><strong>وصفة طبية</strong><small>Medical Prescription</small></div></div>
                  <div className="rx-preview-patient"><span>{selected.order.customer.name}</span><span>{formatDate(selected.date)}</span></div>
                  <strong className="rx-preview-symbol">℞</strong>
                  <div className="rx-preview-lines">
                    {selected.order.medicines.map((medicine) => <p key={medicine.id}>{medicine.name} — {medicine.concentration}</p>)}
                  </div>
                  <div className="rx-preview-sign"><small>الطبيب</small><strong>{selected.doctor}</strong></div>
                  <button type="button"><ZoomIn /> عرض بحجم أكبر</button>
                </div>

                <div className="pharmacy-rx-review-info">
                  <section>
                    <h3><UserRound /> بيانات الوصفة</h3>
                    <dl>
                      <div><dt>المريض</dt><dd>{selected.order.customer.name}</dd></div>
                      <div><dt>العمر</dt><dd>{selected.order.customer.age || 'غير مسجل'} سنة</dd></div>
                      <div><dt>الطبيب</dt><dd>{selected.doctor}</dd></div>
                      <div><dt>تاريخ الوصفة</dt><dd>{formatDate(selected.date)}</dd></div>
                      <div><dt>الطلب المرتبط</dt><dd><Link to={`/pharmacy/orders/${selected.order.id}`}>{selected.order.id}</Link></dd></div>
                      <div><dt>اسم الملف</dt><dd>{selected.fileName}</dd></div>
                    </dl>
                  </section>

                  <section>
                    <h3><ClipboardCheck /> الأدوية المكتوبة</h3>
                    <div className="pharmacy-rx-medicines">
                      {selected.order.medicines.map((medicine) => (
                        <div key={medicine.id}><span>Rx</span><div><strong>{medicine.name}</strong><small>{medicine.concentration} · الكمية {medicine.quantity}</small></div></div>
                      ))}
                    </div>
                  </section>

                  <label className="pharmacy-rx-note">
                    <span>ملاحظة المراجعة</span>
                    <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder={selected.note || 'دوّن ملاحظة مختصرة...'} />
                  </label>
                </div>
              </div>

              <footer className="pharmacy-rx-actions-bar">
                <button type="button" className="pharmacy-btn pharmacy-btn-success" onClick={() => updatePrescription(selected, 'approved', 'تم اعتماد الوصفة الطبية')}><CheckCircle2 /> اعتماد الوصفة</button>
                <button type="button" className="pharmacy-btn pharmacy-btn-soft" onClick={() => updatePrescription(selected, 'clarification', 'تم طلب صورة أو توضيح إضافي للوصفة')}><MessageSquareText /> طلب توضيح</button>
                <button type="button" className="pharmacy-btn pharmacy-btn-danger" onClick={() => updatePrescription(selected, 'rejected', 'تم رفض الوصفة الطبية')}><Ban /> رفض الوصفة</button>
                <Link className="pharmacy-btn pharmacy-btn-ghost-dark" to={`/pharmacy/orders/${selected.order.id}`}>فتح الطلب <ChevronLeft /></Link>
              </footer>
            </>
          ) : (
            <div className="pharmacy-empty-state"><ClipboardCheck /><h3>اختر وصفة للمراجعة</h3><p>ستظهر كل تفاصيل الوصفة وإجراءاتها هنا.</p></div>
          )}
        </article>
      </section>
    </div>
  );
}
