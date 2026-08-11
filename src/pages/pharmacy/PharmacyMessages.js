import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCheck,
  Image,
  Info,
  MessageSquareText,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  ShoppingBag,
  Smile,
  Video,
  X,
} from 'lucide-react';
import { usePharmacyStore } from '../../pharmacy/pharmacyStore.js';
import { formatDateTime, formatTime } from '../../pharmacy/pharmacyData.js';

export default function PharmacyMessages() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, updateConversation } = usePharmacyStore();
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  const wallRef = useRef(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...data.conversations]
      .sort((a, b) => new Date(b.lastAt) - new Date(a.lastAt))
      .filter((conversation) => !query || [conversation.name, conversation.phone, conversation.orderId].join(' ').toLowerCase().includes(query));
  }, [data.conversations, search]);

  const activeConversation = data.conversations.find((conversation) => conversation.id === id)
    || (!id ? filtered[0] : null);
  const linkedOrder = activeConversation
    ? data.orders.find((order) => order.id === activeConversation.orderId)
    : null;

  useEffect(() => {
    if (!id) return;
    const conversation = data.conversations.find((item) => item.id === id);
    if (conversation?.unread) {
      updateConversation(id, (current) => ({ ...current, unread: 0 }));
    }
  }, [data.conversations, id, updateConversation]);

  useEffect(() => {
    if (!wallRef.current) return;
    wallRef.current.scrollTop = wallRef.current.scrollHeight;
  }, [activeConversation?.messages.length]);

  function openConversation(conversationId) {
    navigate(`/pharmacy/messages/${conversationId}`);
  }

  function sendMessage(event) {
    event.preventDefault();
    if (!activeConversation || !message.trim()) return;
    const text = message.trim();
    updateConversation(activeConversation.id, (current) => ({
      ...current,
      unread: 0,
      lastAt: new Date().toISOString(),
      messages: [
        ...current.messages,
        { id: `MSG-OUT-${Date.now()}`, from: 'pharmacy', type: 'text', text, at: new Date().toISOString(), read: true },
      ],
    }));
    setMessage('');
  }

  function sendAttachment(type) {
    if (!activeConversation) return;
    const labels = { image: 'تم إرسال صورة', document: 'تم إرسال ملف مرفق' };
    updateConversation(activeConversation.id, (current) => ({
      ...current,
      lastAt: new Date().toISOString(),
      messages: [
        ...current.messages,
        { id: `MSG-FILE-${Date.now()}`, from: 'pharmacy', type, text: labels[type], at: new Date().toISOString(), read: true },
      ],
    }));
    setAttachmentOpen(false);
  }

  return (
    <div className={`pharmacy-messages-page ${id ? 'has-active-route' : ''}`}>
      <aside className="pharmacy-conversations-panel">
        <header className="pharmacy-messages-title">
          <div><span><MessageSquareText /></span><div><h1>الرسائل</h1><p>{data.conversations.reduce((sum, item) => sum + item.unread, 0)} غير مقروءة</p></div></div>
          <button type="button"><MoreVertical /></button>
        </header>
        <label className="pharmacy-search-box compact">
          <Search />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث في المحادثات" />
          {search && <button type="button" onClick={() => setSearch('')}><X /></button>}
        </label>
        <div className="pharmacy-conversation-list">
          {filtered.map((conversation) => {
            const lastMessage = conversation.messages.at(-1);
            return (
              <button
                key={conversation.id}
                type="button"
                className={activeConversation?.id === conversation.id ? 'active' : ''}
                onClick={() => openConversation(conversation.id)}
              >
                <span className="pharmacy-conversation-avatar">
                  {conversation.name.charAt(0)}
                  {conversation.online && <i />}
                </span>
                <div>
                  <header><strong>{conversation.name}</strong><time>{formatTime(conversation.lastAt)}</time></header>
                  <p>{lastMessage?.from === 'pharmacy' && <CheckCheck />}{lastMessage?.text || 'لا توجد رسائل'}</p>
                  <small><ShoppingBag /> {conversation.orderId}</small>
                </div>
                {conversation.unread > 0 && <b>{conversation.unread}</b>}
              </button>
            );
          })}
        </div>
      </aside>

      <section className="pharmacy-chat-panel">
        {activeConversation ? (
          <>
            <header className="pharmacy-chat-header">
              <button type="button" className="pharmacy-chat-back" onClick={() => navigate('/pharmacy/messages')} aria-label="العودة"><ArrowRight /></button>
              <span className="pharmacy-chat-avatar">{activeConversation.name.charAt(0)}{activeConversation.online && <i />}</span>
              <div className="pharmacy-chat-person"><strong>{activeConversation.name}</strong><small>{activeConversation.online ? 'متصل الآن' : `آخر تواصل ${formatDateTime(activeConversation.lastAt)}`}</small></div>
              <div className="pharmacy-chat-actions"><button type="button" aria-label="مكالمة"><Phone /></button><button type="button" aria-label="مكالمة فيديو"><Video /></button><button type="button" aria-label="معلومات"><Info /></button></div>
            </header>

            {linkedOrder && (
              <Link className="pharmacy-chat-order-strip" to={`/pharmacy/orders/${linkedOrder.id}`}>
                <span><ShoppingBag /></span>
                <div><strong>{linkedOrder.id}</strong><small>{linkedOrder.medicines.length} أصناف · {linkedOrder.customer.name}</small></div>
                <em>فتح الطلب</em>
              </Link>
            )}

            <div className="pharmacy-chat-wall" ref={wallRef}>
              <div className="pharmacy-chat-day"><span>المحادثة الحالية</span></div>
              {activeConversation.messages.map((entry) => (
                <div key={entry.id} className={`pharmacy-chat-bubble-row ${entry.from === 'pharmacy' ? 'sent' : 'received'}`}>
                  <div className={`pharmacy-chat-bubble type-${entry.type}`}>
                    {entry.type === 'image' && <span className="pharmacy-message-attachment"><Image /><strong>صورة مرفقة</strong></span>}
                    {entry.type === 'document' && <span className="pharmacy-message-attachment"><Paperclip /><strong>ملف مرفق</strong></span>}
                    <p>{entry.text}</p>
                    <small>{formatTime(entry.at)}{entry.from === 'pharmacy' && <CheckCheck />}</small>
                  </div>
                </div>
              ))}
            </div>

            <form className="pharmacy-chat-composer" onSubmit={sendMessage}>
              {attachmentOpen && (
                <div className="pharmacy-attachment-menu">
                  <button type="button" onClick={() => sendAttachment('image')}><span><Image /></span><strong>صورة</strong></button>
                  <button type="button" onClick={() => sendAttachment('document')}><span><Paperclip /></span><strong>مستند</strong></button>
                </div>
              )}
              <button type="button" className={attachmentOpen ? 'active' : ''} onClick={() => setAttachmentOpen((value) => !value)} aria-label="إرفاق"><Paperclip /></button>
              <button type="button" aria-label="رمز تعبيري"><Smile /></button>
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="اكتب رسالة للعميل..." rows="1" />
              <button type="submit" className="send" disabled={!message.trim()} aria-label="إرسال"><Send /></button>
            </form>
          </>
        ) : (
          <div className="pharmacy-empty-chat"><span><MessageSquareText /></span><h2>ابدأ محادثة</h2><p>اختر عميلًا من القائمة لعرض الرسائل والطلب المرتبط.</p></div>
        )}
      </section>
    </div>
  );
}
