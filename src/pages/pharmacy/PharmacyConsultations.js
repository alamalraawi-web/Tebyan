import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  MessageCircleMore,
  Phone,
  Search,
  Send,
  ShieldAlert,
  Stethoscope,
  UserRound,
  X,
} from 'lucide-react';
import { usePharmacyStore } from '../../pharmacy/pharmacyStore.js';
import {
  CONSULTATION_STATUSES,
  formatDateTime,
  getConsultationStatus,
} from '../../pharmacy/pharmacyData.js';

const tabs = [
  ['all', 'الكل'],
  ['new', 'جديدة'],
  ['urgent', 'عاجلة'],
  ['waiting', 'بانتظار الرد'],
  ['active', 'قيد المتابعة'],
  ['completed', 'مكتملة'],
  ['transferred', 'محولة'],
];

export default function PharmacyConsultations() {
  const { data, updateConsultation } = usePharmacyStore();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(data.consultations[0]?.id || null);
  const [reply, setReply] = useState('');

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.consultations.filter((consultation) => {
      const matchesTab = activeTab === 'all' || consultation.status === activeTab;
      const haystack = [consultation.id, consultation.patient, consultation.subject, consultation.medicine, consultation.phone].join(' ').toLowerCase();
      return matchesTab && (!query || haystack.includes(query));
    });
  }, [activeTab, data.consultations, search]);

  const selected = data.consultations.find((item) => item.id === selectedId) || filtered[0] || null;
  const counts = Object.keys(CONSULTATION_STATUSES).reduce((result, key) => ({
    ...result,
    [key]: data.consultations.filter((item) => item.status === key).length,
  }), {});

  function sendReply() {
    if (!selected || !reply.trim()) return;
    updateConsultation(selected.id, (current) => ({
      ...current,
      status: current.status === 'urgent' ? 'active' : current.status === 'new' ? 'active' : current.status,
      notes: [...current.notes, { id: `NOTE-${Date.now()}`, text: reply.trim(), at: new Date().toISOString() }],
    }));
    setReply('');
  }

  function setStatus(status, noteText) {
    if (!selected) return;
    updateConsultation(selected.id, (current) => ({
      ...current,
      status,
      notes: noteText
        ? [...current.notes, { id: `NOTE-${Date.now()}`, text: noteText, at: new Date().toISOString() }]
        : current.notes,
    }));
  }

  return (
    <div className="pharmacy-consultations-page">
      <section className="pharmacy-page-heading">
        <div>
          <span className="pharmacy-heading-icon purple"><MessageCircleMore /></span>
          <div><h1>الاستشارات الصيدلانية</h1><p>تعامل مع أسئلة المرضى وحدد ما يحتاج إحالة إلى الطبيب.</p></div>
        </div>
        <div className="pharmacy-consultation-kpis">
          <span className="urgent"><AlertTriangle /><strong>{counts.urgent || 0}</strong><small>عاجلة</small></span>
          <span><Clock3 /><strong>{(counts.new || 0) + (counts.waiting || 0)}</strong><small>بانتظارك</small></span>
          <span className="done"><CheckCircle2 /><strong>{counts.completed || 0}</strong><small>مكتملة</small></span>
        </div>
      </section>

      <section className="pharmacy-consultation-workspace">
        <aside className="pharmacy-consultation-list-panel">
          <div className="pharmacy-consultation-tabs">
            {tabs.map(([key, label]) => (
              <button key={key} type="button" className={activeTab === key ? 'active' : ''} onClick={() => setActiveTab(key)}>
                {label}<b>{key === 'all' ? data.consultations.length : counts[key] || 0}</b>
              </button>
            ))}
          </div>

          <label className="pharmacy-search-box compact">
            <Search />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث باسم المريض أو الدواء" />
            {search && <button type="button" onClick={() => setSearch('')}><X /></button>}
          </label>

          <div className="pharmacy-consultation-list">
            {filtered.map((consultation) => {
              const meta = getConsultationStatus(consultation.status);
              return (
                <button
                  key={consultation.id}
                  type="button"
                  className={selected?.id === consultation.id ? 'active' : ''}
                  onClick={() => setSelectedId(consultation.id)}
                >
                  <span className={`pharmacy-consultation-avatar ${consultation.status === 'urgent' ? 'urgent' : ''}`}>{consultation.patient.charAt(0)}</span>
                  <div>
                    <header><strong>{consultation.patient}</strong><span className={`pharmacy-badge tone-${meta.tone}`}>{meta.label}</span></header>
                    <p>{consultation.subject}</p>
                    <small>{consultation.medicine} · {formatDateTime(consultation.createdAt)}</small>
                  </div>
                </button>
              );
            })}
          </div>

          {!filtered.length && <div className="pharmacy-empty-state small"><MessageCircleMore /><h3>لا توجد استشارات</h3><p>لا توجد استشارات مطابقة لهذا التصنيف.</p></div>}
        </aside>

        <article className="pharmacy-consultation-detail-panel">
          {selected ? (
            <>
              <header className="pharmacy-consultation-detail-head">
                <div className="pharmacy-consultation-person">
                  <span>{selected.patient.charAt(0)}</span>
                  <div><h2>{selected.patient}</h2><p>{selected.id} · {selected.age} سنة · {selected.phone}</p></div>
                </div>
                <div>
                  <span className={`pharmacy-badge large tone-${getConsultationStatus(selected.status).tone}`}>{getConsultationStatus(selected.status).label}</span>
                  <button type="button" aria-label="اتصال"><Phone /></button>
                </div>
              </header>

              <div className="pharmacy-consultation-detail-body">
                <section className="pharmacy-consultation-question-card">
                  <span><MessageCircleMore /></span>
                  <div><small>سؤال المريض</small><h3>{selected.subject}</h3><p>{selected.question}</p><em>{formatDateTime(selected.createdAt)}</em></div>
                </section>

                <section className="pharmacy-consultation-health-grid">
                  <article><span><UserRound /></span><div><small>العمر</small><strong>{selected.age} سنة</strong></div></article>
                  <article><span><AlertTriangle /></span><div><small>الحساسية</small><strong>{selected.allergy}</strong></div></article>
                  <article><span><ShieldAlert /></span><div><small>حالة مزمنة</small><strong>{selected.chronic}</strong></div></article>
                  <article><span><Stethoscope /></span><div><small>الأدوية الحالية</small><strong>{selected.currentMedicines}</strong></div></article>
                </section>

                <section className="pharmacy-consultation-medicine-card">
                  <div><span>Rx</span><div><small>الدواء موضوع الاستشارة</small><strong>{selected.medicine}</strong></div></div>
                  <button type="button">عرض المعلومات الدوائية</button>
                </section>

                <section className="pharmacy-consultation-notes">
                  <h3>سجل الردود والمتابعة</h3>
                  {selected.notes.length ? selected.notes.map((entry) => (
                    <div key={entry.id}><span><CheckCircle2 /></span><div><p>{entry.text}</p><small>{formatDateTime(entry.at)}</small></div></div>
                  )) : <div className="pharmacy-no-notes">لم يُرسل رد بعد.</div>}
                </section>
              </div>

              <footer className="pharmacy-consultation-composer">
                <div>
                  <textarea value={reply} onChange={(event) => setReply(event.target.value)} placeholder="اكتب ردًا واضحًا وآمنًا للمريض..." />
                  <button type="button" onClick={sendReply} disabled={!reply.trim()}><Send /></button>
                </div>
                <section>
                  <button type="button" className="pharmacy-btn pharmacy-btn-success" onClick={() => setStatus('completed', 'تم إنهاء الاستشارة بعد تقديم الإرشاد الصيدلاني.')}><CheckCircle2 /> إنهاء الاستشارة</button>
                  <button type="button" className="pharmacy-btn pharmacy-btn-soft" onClick={() => setStatus('waiting', 'تم طلب معلومات إضافية من المريض.')}><Clock3 /> طلب معلومات</button>
                  <button type="button" className="pharmacy-btn pharmacy-btn-danger" onClick={() => setStatus('transferred', 'تم تحويل الحالة إلى طبيب لاحتياجها تقييمًا طبيًا.')}><Stethoscope /> تحويل إلى طبيب</button>
                </section>
              </footer>
            </>
          ) : (
            <div className="pharmacy-empty-state"><MessageCircleMore /><h3>اختر استشارة</h3><p>ستظهر تفاصيل المريض والسؤال وخيارات الرد هنا.</p></div>
          )}
        </article>
      </section>
    </div>
  );
}
