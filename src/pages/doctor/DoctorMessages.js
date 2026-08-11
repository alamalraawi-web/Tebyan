import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircleMore, Search, CheckCheck, Pin, Archive, Filter } from 'lucide-react';
import { loadDoctorData, saveDoctorData } from '../../doctor/doctorStore';

export default function DoctorMessages() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [consultations, setConsultations] = useState(() => loadDoctorData('consultations'));

  const rows = useMemo(() => consultations
    .filter((item) => item.messages?.length || item.status !== 'completed')
    .filter((item) => filter === 'all' || (filter === 'unread' ? item.unread : item.status === filter))
    .filter((item) => `${item.patient} ${item.topic}`.includes(query.trim()))
    .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned))), [consultations, filter, query]);

  function update(id, changes) {
    const next = consultations.map((item) => item.id === id ? { ...item, ...changes } : item);
    setConsultations(next);
    saveDoctorData('consultations', next);
  }

  return <>
    <div className="page-head messages-title"><div><h1>المحادثات</h1><p>تواصل طبي آمن وسريع مع مرضاك.</p></div><div className="message-head-icon"><MessageCircleMore /></div></div>
    <div className="messages-toolbar">
      <div className="message-search"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن مريض أو موضوع..." /></div>
      <button className="filter-chip active" onClick={() => setFilter('all')}>الكل</button>
      <button className={`filter-chip ${filter === 'unread' ? 'active' : ''}`} onClick={() => setFilter('unread')}><Filter /> غير مقروءة</button>
    </div>
    <section className="conversation-list">
      {rows.map((item) => {
        const last = item.messages?.at(-1);
        return <article className="conversation-card" key={item.id} onClick={() => { update(item.id, { unread: 0 }); navigate(`/doctor/messages/${item.id}`); }}>
          <div className="conversation-avatar">{item.patient.charAt(0)}<i /></div>
          <div className="conversation-content"><div><h3>{item.patient}</h3><time>{last?.at || 'الآن'}</time></div><p>{last?.type === 'audio' ? '🎙️ رسالة صوتية' : last?.type === 'image' ? '📷 صورة' : last?.type === 'file' ? '📎 ملف مرفق' : last?.text || item.topic}</p><small>{item.topic}</small></div>
          <div className="conversation-status">{item.unread > 0 ? <b>{item.unread}</b> : <CheckCheck />}{item.pinned && <Pin />}</div>
          <button className="conversation-more" onClick={(e) => { e.stopPropagation(); update(item.id, { pinned: !item.pinned }); }} title="تثبيت"><Pin /></button>
          <button className="conversation-more archive" onClick={(e) => { e.stopPropagation(); update(item.id, { archived: true }); }} title="أرشفة"><Archive /></button>
        </article>;
      })}
      {!rows.length && <div className="empty">لا توجد محادثات مطابقة.</div>}
    </section>
  </>;
}
