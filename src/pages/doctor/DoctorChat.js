import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight, Camera, CheckCheck, Download, FileText, Image as ImageIcon,
  Mic, MoreVertical, Paperclip, Pause, Phone, Play, Send, Smile,
  Trash2, Video, X, StopCircle, UserRound, Volume2
} from 'lucide-react';
import { loadDoctorData, saveDoctorData } from '../../doctor/doctorStore';

const nowTime = () => new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function CallModal({ type, patient, onClose }) {
  const [status, setStatus] = useState('جاري الاتصال...');
  const [seconds, setSeconds] = useState(0);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let timer;
    let connectTimer = setTimeout(() => {
      setStatus('متصل');
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    }, 1400);

    if (type === 'video' && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      }).catch(() => setStatus('تعذر تشغيل الكاميرا أو الميكروفون'));
    }

    return () => {
      clearTimeout(connectTimer);
      clearInterval(timer);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [type]);

  return <div className="call-screen" role="dialog" aria-modal="true">
    {type === 'video' && <video ref={videoRef} className="call-video" autoPlay muted playsInline />}
    <div className="call-shade" />
    <div className="call-content">
      <div className="call-avatar">{patient?.charAt(0)}</div>
      <h2>{patient}</h2>
      <p>{status === 'متصل' ? formatDuration(seconds) : status}</p>
      <div className="call-actions">
        <button className="call-tool"><Mic /><span>كتم</span></button>
        <button className="call-tool"><Volume2 /><span>السماعة</span></button>
        <button className="call-tool"><Video /><span>الكاميرا</span></button>
      </div>
      <button className="end-call" onClick={onClose}><Phone /></button>
    </div>
  </div>;
}

function MessageContent({ message }) {
  if (message.type === 'image') {
    return <a className="chat-image-wrap" href={message.url} target="_blank" rel="noreferrer">
      <img src={message.url} alt={message.name || 'صورة مرفقة'} />
    </a>;
  }
  if (message.type === 'file') {
    return <a className="chat-file" href={message.url} download={message.name}>
      <span><FileText /></span><div><strong>{message.name}</strong><small>{message.size || 'ملف مرفق'}</small></div><Download />
    </a>;
  }
  if (message.type === 'audio') {
    return <div className="chat-audio"><button type="button"><Play /></button><audio controls src={message.url} /><small>{message.duration || '00:00'}</small></div>;
  }
  return <p>{message.text}</p>;
}

export default function DoctorChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState(() => loadDoctorData('consultations'));
  const consultation = consultations.find((item) => item.id === id);
  const [text, setText] = useState('');
  const [attachOpen, setAttachOpen] = useState(false);
  const [callType, setCallType] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [toast, setToast] = useState('');
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recordTimerRef = useRef(null);
  const bottomRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const messages = useMemo(() => consultation?.messages || [], [consultation]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  useEffect(() => {
    return () => {
      clearInterval(recordTimerRef.current);

      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state !== 'inactive') {
        recorder.onstop = null;
        recorder.stop();
      }

      recorder?.stream?.getTracks?.().forEach((track) => track.stop());
    };
  }, []);

  if (!consultation) return <div className="panel empty">المحادثة غير موجودة.</div>;

  function persistMessages(nextMessages, changes = {}) {
    const next = consultations.map((item) => item.id === id ? {
      ...item,
      ...changes,
      status: item.status === 'new' ? 'in_progress' : item.status,
      messages: nextMessages,
    } : item);
    setConsultations(next);
    saveDoctorData('consultations', next);
  }

  function sendText() {
    const value = text.trim();
    if (!value) return;
    persistMessages([...messages, {
      id: `M-${Date.now()}`, sender: 'doctor', type: 'text', text: value, at: nowTime(), delivered: true,
    }]);
    setText('');
  }

  function sendFile(file, type) {
    if (!file) return;
    const maxSize = type === 'image' ? 8 : 20;
    if (file.size > maxSize * 1024 * 1024) {
      setToast(`الحد الأعلى ${maxSize} ميجابايت`);
      setTimeout(() => setToast(''), 1800);
      return;
    }
    const url = URL.createObjectURL(file);
    persistMessages([...messages, {
      id: `M-${Date.now()}`, sender: 'doctor', type, url, name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`, at: nowTime(), delivered: true,
    }]);
    setAttachOpen(false);
  }

  async function startRecording() {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setToast('التسجيل الصوتي غير مدعوم في هذا المتصفح');
      setTimeout(() => setToast(''), 2000);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => event.data.size && chunksRef.current.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        const url = URL.createObjectURL(blob);
        persistMessages([...messages, {
          id: `M-${Date.now()}`, sender: 'doctor', type: 'audio', url,
          duration: formatDuration(recordSeconds), at: nowTime(), delivered: true,
        }]);
        stream.getTracks().forEach((track) => track.stop());
        setRecordSeconds(0);
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
      recordTimerRef.current = setInterval(() => setRecordSeconds((s) => s + 1), 1000);
    } catch {
      setToast('يرجى السماح باستخدام الميكروفون');
      setTimeout(() => setToast(''), 2000);
    }
  }

  function stopRecording(send = true) {
    clearInterval(recordTimerRef.current);
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === 'inactive') return;
    if (!send) recorder.onstop = () => recorder.stream.getTracks().forEach((track) => track.stop());
    recorder.stop();
    setRecording(false);
    if (!send) setRecordSeconds(0);
  }

  function deleteLastMessage() {
    const index = [...messages].reverse().findIndex((m) => m.sender === 'doctor');
    if (index < 0) return;
    const actual = messages.length - 1 - index;
    persistMessages(messages.filter((_, i) => i !== actual));
    setToast('تم حذف آخر رسالة أرسلتها');
    setTimeout(() => setToast(''), 1700);
  }

  return <div className="doctor-chat-page">
    <header className="chat-header">
      <button className="chat-icon" onClick={() => navigate('/doctor/messages')}><ArrowRight /></button>
      <div className="chat-person"><div className="chat-person-avatar">{consultation.patient.charAt(0)}</div><div><strong>{consultation.patient}</strong><small><i /> متصل الآن · {consultation.topic}</small></div></div>
      <div className="chat-header-actions">
        <button className="chat-icon" onClick={() => setCallType('audio')} title="اتصال صوتي"><Phone /></button>
        <button className="chat-icon" onClick={() => setCallType('video')} title="اتصال مرئي"><Video /></button>
        <button className="chat-icon" onClick={deleteLastMessage} title="حذف آخر رسالة"><MoreVertical /></button>
      </div>
    </header>

    <main className="chat-wall">
      <div className="chat-day">اليوم</div>
      <div className="chat-security">المحادثة الطبية محفوظة داخل سجل الاستشارة</div>
      {messages.map((message) => <div className={`wa-bubble ${message.sender === 'doctor' ? 'mine' : 'theirs'}`} key={message.id}>
        <MessageContent message={message} />
        <div className="message-meta"><span>{message.at}</span>{message.sender === 'doctor' && <CheckCheck />}</div>
      </div>)}
      {!messages.length && <div className="chat-empty"><UserRound /><h3>ابدأ المحادثة الطبية</h3><p>اسأل المريض عن الأعراض أو اطلب منه إرسال صورة أو تقرير.</p></div>}
      <div ref={bottomRef} />
    </main>

    <footer className="chat-composer">
      {recording ? <div className="recording-bar"><button onClick={() => stopRecording(false)}><Trash2 /></button><div className="record-pulse" /><strong>{formatDuration(recordSeconds)}</strong><span>جارٍ تسجيل الصوت...</span><button className="record-send" onClick={() => stopRecording(true)}><Send /></button></div> : <>
        <button className="composer-tool" onClick={() => setAttachOpen((v) => !v)}><Paperclip /></button>
        <div className="composer-input"><button type="button"><Smile /></button><textarea rows="1" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText(); } }} placeholder="اكتب رسالة..." /><button type="button" onClick={() => imageInputRef.current?.click()}><Camera /></button></div>
        {text.trim() ? <button className="composer-send" onClick={sendText}><Send /></button> : <button className="composer-send" onClick={startRecording}><Mic /></button>}
      </>}
      {attachOpen && <div className="attachment-menu">
        <button onClick={() => imageInputRef.current?.click()}><span className="attach-image"><ImageIcon /></span><b>الصور</b></button>
        <button onClick={() => fileInputRef.current?.click()}><span className="attach-file"><FileText /></span><b>الملفات</b></button>
        <button onClick={() => setCallType('video')}><span className="attach-video"><Video /></span><b>فيديو</b></button>
      </div>}
      <input ref={imageInputRef} hidden type="file" accept="image/*" onChange={(e) => sendFile(e.target.files?.[0], 'image')} />
      <input ref={fileInputRef} hidden type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,image/*" onChange={(e) => sendFile(e.target.files?.[0], 'file')} />
    </footer>

    {callType && <CallModal type={callType} patient={consultation.patient} onClose={() => setCallType(null)} />}
    {toast && <div className="toast">{toast}</div>}
  </div>;
}
