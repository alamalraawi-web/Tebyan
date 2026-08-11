import { useEffect, useMemo, useState } from "react";
import TibyanHeader from "../components/TibyanHeader";

const SERVICES = [
  { id: "instant", title: "أحتاج طبيباً الآن", desc: "استشارة عاجلة عن بُعد خلال دقائق", icon: "⚡", tone: "cyan", eta: "5–12 دقيقة" },
  { id: "appointment", title: "أريد حجز موعد", desc: "اختر الطبيب واليوم والوقت المناسب", icon: "◷", tone: "blue", eta: "موعد مجدول" },
  { id: "clinic", title: "أريد زيارة عيادة", desc: "زيارة حضورية في منشأة قريبة", icon: "✚", tone: "green", eta: "حضور شخصي" },
  { id: "lab", title: "أريد فحصاً مخبرياً", desc: "في المختبر أو بسحب عينة من المنزل", icon: "◉", tone: "amber", eta: "نتائج رقمية" },
];

const SPECIALTIES = ["الطب العام", "طب الأسرة", "الباطنة", "الأطفال", "القلب", "العيون", "الجلدية", "النساء والولادة", "العظام", "الطب النفسي", "الأسنان"];
const DOCTORS = SPECIALTIES.flatMap((specialty, i) => [
  { id: `d-${i}-1`, name: `د. ${["أحمد الحكيمي", "سارة الوداعي", "خالد الزبيري", "ريم العريقي"][i % 4]}`, specialty, rating: Number((4.7 + (i % 3) * 0.1).toFixed(1)), reviews: 90 + i * 13, experience: 6 + (i % 10), fee: 18 + (i % 5) * 4, wait: 5 + (i % 4) * 3, place: i % 2 ? "عيادات تبيان" : "مركز تبيان الطبي", availableNow: i % 3 !== 0, languages: "العربية، الإنجليزية" },
  { id: `d-${i}-2`, name: `د. ${["محمد الصبري", "ليان الشامي", "عبدالله القباطي", "هدى الآنسي"][i % 4]}`, specialty, rating: Number((4.6 + (i % 4) * 0.1).toFixed(1)), reviews: 64 + i * 9, experience: 8 + (i % 7), fee: 20 + (i % 4) * 5, wait: 7 + (i % 5) * 4, place: i % 2 ? "مستشفى تبيان" : "مجمع تبيان", availableNow: i % 4 !== 0, languages: "العربية" },
]);
const LABS = [
  { id: "l1", name: "مختبرات الدقة", distance: "1.4 كم", rating: 4.9, fee: 10, home: true, result: "خلال 6 ساعات" },
  { id: "l2", name: "مختبرات النخبة", distance: "2.7 كم", rating: 4.8, fee: 12, home: true, result: "خلال 8 ساعات" },
  { id: "l3", name: "مختبرات الحياة", distance: "4.2 كم", rating: 4.7, fee: 9, home: false, result: "خلال 24 ساعة" },
];
const TESTS = ["تحليل دم شامل", "سكر تراكمي", "وظائف الكبد", "وظائف الكلى", "فيتامين د", "الغدة الدرقية"];
const TIMES = ["09:00 ص", "10:30 ص", "12:00 م", "04:00 م", "06:00 م", "08:30 م"];
const INITIAL = { service: "", specialty: "", doctorId: "", labId: "", test: "", channel: "video", date: "", time: "", patientName: "", phone: "", age: "", gender: "", symptoms: "", notes: "", visitMode: "branch", address: "", relation: "self", insurance: "none", emergencyAccepted: false, consent: false };
const STORAGE_KEY = "tebyan-consultation-draft-v2";


function TibyanPrintMark() {
  return (
    <div className="cx-print-mark" aria-hidden="true">
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cx-print-blue" x1="18" y1="16" x2="86" y2="102" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#16c9ca" />
            <stop offset=".48" stopColor="#0876d9" />
            <stop offset="1" stopColor="#073fbd" />
          </linearGradient>
          <linearGradient id="cx-print-green" x1="98" y1="35" x2="57" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#49d78b" />
            <stop offset="1" stopColor="#00a9b5" />
          </linearGradient>
        </defs>
        <path d="M48 13h22a8 8 0 0 1 8 8v19h19a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H78v16c-8 8-17 13-29 17 8-7 12-16 12-27 0-12-4-23-11-34H22a8 8 0 0 1-8-8V48a8 8 0 0 1 8-8h18V21a8 8 0 0 1 8-8Z" fill="url(#cx-print-blue)" />
        <path d="M14 61h18l5-8 6 18 6-27 6 22 5-5h15" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="73" cy="36" r="8" fill="#fff" />
        <path d="M101 42c-8 9-16 17-21 27-6 12-5 23 0 32 11-7 19-15 23-25 5-12 4-24-2-34Z" fill="url(#cx-print-green)" />
        <path d="M98 67c-4 9-10 17-18 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function ConsultationsPage({ onSubmit, supportPhone = "800 000 000", bottomNavHeight = 72 }) {
  const [stage, setStage] = useState("service");
  const [form, setForm] = useState(() => {
    if (typeof window === "undefined") return INITIAL;
    try { return { ...INITIAL, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
    catch { return INITIAL; }
  });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [booking, setBooking] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const service = SERVICES.find(x => x.id === form.service);
  const doctor = DOCTORS.find(x => x.id === form.doctorId);
  const lab = LABS.find(x => x.id === form.labId);

  const filteredDoctors = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result = DOCTORS.filter(d =>
      (!form.specialty || d.specialty === form.specialty) &&
      (!q || `${d.name} ${d.specialty} ${d.place}`.toLowerCase().includes(q)) &&
      (form.service !== "instant" || d.availableNow)
    );
    return [...result].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return a.fee - b.fee;
      if (sortBy === "wait") return a.wait - b.wait;
      return (Number(b.availableNow) - Number(a.availableNow)) || (b.rating - a.rating);
    });
  }, [form.specialty, form.service, search, sortBy]);

  const total = form.service === "lab" ? (lab?.fee || 0) + (form.visitMode === "home" ? 8 : 0) : (doctor?.fee || 0);
  const stages = [
    { id: "service", label: "الخدمة" },
    { id: "provider", label: form.service === "lab" ? "المختبر" : "الطبيب" },
    { id: "details", label: "التفاصيل" },
    { id: "review", label: "التأكيد" },
  ];
  const stageIndex = Math.max(0, stages.findIndex(x => x.id === stage));

  const update = (key, value) => { setForm(s => ({ ...s, [key]: value })); setError(""); };
  const scrollTop = () => typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: "smooth" });

  const chooseService = id => {
    setForm(s => ({ ...INITIAL, patientName: s.patientName, phone: s.phone, age: s.age, gender: s.gender, relation: s.relation, service: id }));
    setSearch(""); setError(""); setStage("provider"); scrollTop();
  };

  function validate(current) {
    if (current === "service" && !form.service) return "اختر نوع الخدمة أولاً.";
    if (current === "provider") {
      if (form.service === "lab") {
        if (!form.test) return "اختر الفحص المطلوب.";
        if (!form.labId) return "اختر المختبر المناسب.";
      } else {
        if (!form.specialty) return "اختر التخصص الطبي.";
        if (!form.doctorId) return "اختر الطبيب المناسب.";
      }
    }
    if (current === "details") {
      if (!form.patientName.trim()) return "اكتب اسم المريض.";
      if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone.trim())) return "اكتب رقم هاتف صحيحاً.";
      if (!form.age || Number(form.age) < 1 || Number(form.age) > 120) return "اكتب عمر المريض بشكل صحيح.";
      if (!form.gender) return "اختر جنس المريض.";
      if (form.service !== "instant" && !form.date) return "اختر تاريخ الموعد.";
      if (!form.time) return "اختر الوقت المناسب.";
      if (form.service === "instant" && form.symptoms.trim().length < 10) return "اكتب وصفاً أوضح للحالة (10 أحرف على الأقل).";
      if (form.service === "lab" && form.visitMode === "home" && !form.address.trim()) return "اكتب عنوان الزيارة المنزلية.";
      if (!form.emergencyAccepted) return "أكد أن الحالة لا تتطلب إسعافاً فورياً.";
    }
    if (current === "review" && !form.consent) return "يلزم الموافقة على سياسة إرسال بيانات الحجز.";
    return "";
  }

  function goNext() {
    const msg = validate(stage);
    if (msg) return setError(msg);
    setStage(stages[Math.min(stageIndex + 1, stages.length - 1)]?.id);
    setError(""); scrollTop();
  }
  function goBack() {
    setStage(stages[Math.max(stageIndex - 1, 0)]?.id);
    setError(""); scrollTop();
  }
  async function confirmBooking() {
    const msg = validate("review");
    if (msg) return setError(msg);
    const number = `TB-${Date.now().toString().slice(-6)}`;
    const payload = { ...form, service, doctor: doctor || null, lab: lab || null, total, bookingNumber: number, createdAt: new Date().toISOString() };
    try {
      setSending(true); setError("");
      if (typeof onSubmit === "function") await onSubmit(payload); else console.log("Consultation booking", payload);
      if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
      setBooking(number); setStage("done"); scrollTop();
    } catch (e) {
      console.error(e); setError("تعذر إكمال الحجز الآن. تأكد من الاتصال وحاول مرة أخرى.");
    } finally { setSending(false); }
  }

  if (stage === "done") return <><TibyanHeader /><main dir="rtl" className="cx-root" style={{ "--cx-bottom-nav-height": `${bottomNavHeight}px` }}><div className="cx-shell"><section className="cx-success" aria-live="polite"><TibyanPrintMark /><div className="cx-success-icon">✓</div><span className="cx-badge">تم الحجز بنجاح</span><h1>موعدك أصبح جاهزاً</h1><p>احتفظ برقم الحجز، وستصلك تفاصيل الموعد على رقم الهاتف المسجل.</p><div className="cx-ticket"><small>رقم الحجز</small><strong>{booking}</strong><div><span>{service?.title}</span><span>{doctor?.name || lab?.name}</span><span>{form.date || "اليوم"} • {form.time}</span><span>الإجمالي: {total}$</span></div></div><div className="cx-success-actions"><button className="cx-primary" onClick={() => { setForm(INITIAL); setStage("service"); setBooking(""); }}>حجز خدمة جديدة</button><button className="cx-back" onClick={() => typeof window !== "undefined" && window.print()}>طباعة التأكيد</button></div></section></div><Styles /></main></>;

  return <><TibyanHeader /><main dir="rtl" className="cx-root" style={{ "--cx-bottom-nav-height": `${bottomNavHeight}px` }}><div className="cx-shell">
    <section className="cx-workspace">
      <aside className="cx-side">
        <div className="cx-progress-title"><span>خطوات الحجز</span><b>{stageIndex + 1}/4</b></div>
        <div className="cx-steps">{stages.map((s, i) => <button key={s.id} className={`cx-step ${i === stageIndex ? "active" : ""} ${i < stageIndex ? "done" : ""}`} onClick={() => i < stageIndex && setStage(s.id)} disabled={i > stageIndex}><i>{i < stageIndex ? "✓" : i + 1}</i><span>{s.label}<small>{i === stageIndex ? "أنت هنا الآن" : i < stageIndex ? "مكتملة" : "لاحقاً"}</small></span></button>)}</div>
        <div className="cx-help"><span>؟</span><div><strong>تحتاج مساعدة؟</strong><small>اتصل بالدعم على {supportPhone} وسنكمل الحجز معك.</small></div></div>
        {service && <div className="cx-mini-summary"><small>اختيارك الحالي</small><strong>{service.title}</strong><span>{doctor?.name || lab?.name || "لم تحدد مقدم الخدمة بعد"}</span></div>}
      </aside>

      <section className="cx-main" aria-live="polite">
        {stage === "service" && <><div className="cx-heading"><span>الخطوة الأولى</span><h2>ما الخدمة التي تحتاجها؟</h2><p>اختر الخيار الأقرب لحاجتك، وسنظهر لك الخطوات المناسبة فقط.</p></div><div className="cx-service-grid">{SERVICES.map(s => <button key={s.id} className={`cx-service ${s.tone}`} onClick={() => chooseService(s.id)}><span className="cx-service-icon">{s.icon}</span><div><b>{s.title}</b><small>{s.desc}</small><em>{s.eta}</em><span className="cx-card-action">اختيار الخدمة <b aria-hidden="true">‹</b></span></div></button>)}</div></>}

        {stage === "provider" && form.service !== "lab" && <><div className="cx-heading"><span>{service?.title}</span><h2>اختر الطبيب الأنسب لك</h2><p>حدد التخصص ثم قارن حسب التقييم، السعر، ووقت الانتظار.</p></div><div className="cx-specialties">{SPECIALTIES.map(s => <button key={s} className={form.specialty === s ? "active" : ""} onClick={() => { update("specialty", s); update("doctorId", ""); }}>{s}</button>)}</div><div className="cx-toolbar"><div className="cx-search"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث باسم الطبيب أو المنشأة" aria-label="البحث عن طبيب" /></div><select value={sortBy} onChange={e => setSortBy(e.target.value)} aria-label="ترتيب الأطباء"><option value="recommended">الأنسب أولاً</option><option value="rating">الأعلى تقييماً</option><option value="price">الأقل سعراً</option><option value="wait">الأسرع انتظاراً</option></select></div><div className="cx-result-count">{filteredDoctors.length} نتيجة متاحة</div><div className="cx-doctors">{filteredDoctors.length ? filteredDoctors.map(d => <button key={d.id} className={`cx-doctor ${form.doctorId === d.id ? "selected" : ""}`} onClick={() => update("doctorId", d.id)}><div className="cx-avatar">{d.name.replace("د. ", "").charAt(0)}</div><div className="cx-doctor-info"><div><strong>{d.name}</strong>{d.availableNow && <span className="cx-online">متاح الآن</span>}</div><small>{d.specialty} • خبرة {d.experience} سنوات • {d.languages}</small><div className="cx-meta"><span>★ {d.rating} ({d.reviews})</span><span>{d.place}</span><span>انتظار {d.wait} د</span><span>{d.fee}$</span></div><span className="cx-select-action">{form.doctorId === d.id ? "تم اختيار الطبيب" : "اختر هذا الطبيب"}</span></div><i aria-hidden="true">{form.doctorId === d.id ? "✓" : ""}</i></button>) : <div className="cx-empty"><b>لا توجد نتائج مطابقة</b><span>غيّر التخصص أو امسح عبارة البحث.</span></div>}</div></>}

        {stage === "provider" && form.service === "lab" && <><div className="cx-heading"><span>{service?.title}</span><h2>ما الفحص وأين تفضله؟</h2><p>اختر الفحص ثم قارن المختبرات حسب المسافة والنتيجة والسعر.</p></div><div className="cx-field"><label>الفحص المطلوب</label><select value={form.test} onChange={e => update("test", e.target.value)}><option value="">اختر الفحص</option>{TESTS.map(t => <option key={t}>{t}</option>)}</select></div><div className="cx-labs">{LABS.map(l => <button key={l.id} className={`cx-lab ${form.labId === l.id ? "selected" : ""}`} onClick={() => update("labId", l.id)}><span className="cx-lab-icon">◉</span><div><strong>{l.name}</strong><small>★ {l.rating} • {l.distance} • رسوم {l.fee}$ • النتيجة {l.result}</small>{l.home && <em>زيارة منزلية متاحة</em>}<span className="cx-select-action">{form.labId === l.id ? "تم اختيار المختبر" : "اختر هذا المختبر"}</span></div><i aria-hidden="true">{form.labId === l.id ? "✓" : ""}</i></button>)}</div></>}

        {stage === "details" && <><div className="cx-heading"><span>تفاصيل الموعد</span><h2>بقيت معلومات بسيطة</h2><p>لن نطلب إلا ما يحتاجه مقدم الخدمة لإكمال الموعد بأمان.</p></div>
          {form.service !== "clinic" && form.service !== "lab" && <div className="cx-block"><h3>كيف تريد التواصل؟</h3><div className="cx-choice-row">{[["video","مكالمة فيديو","▣"],["chat","محادثة كتابية","▤"],["phone","اتصال صوتي","◖"]].map(([id,title,icon]) => <button key={id} className={form.channel === id ? "active" : ""} onClick={() => update("channel", id)}><span>{icon}</span><b>{title}</b></button>)}</div></div>}
          {form.service === "lab" && <div className="cx-block"><h3>طريقة أخذ العينة</h3><div className="cx-choice-row two">{[["branch","زيارة المختبر","⌂"],["home","زيارة منزلية","⌖"]].map(([id,title,icon]) => <button key={id} className={form.visitMode === id ? "active" : ""} onClick={() => update("visitMode", id)}><span>{icon}</span><b>{title}</b></button>)}</div></div>}
          <div className="cx-form-grid"><div className="cx-field"><label>الحجز لمن؟</label><select value={form.relation} onChange={e => update("relation", e.target.value)}><option value="self">لي شخصياً</option><option value="child">لابني / ابنتي</option><option value="family">لأحد أفراد الأسرة</option><option value="other">لشخص آخر</option></select></div><div className="cx-field"><label>اسم المريض</label><input value={form.patientName} onChange={e => update("patientName", e.target.value)} placeholder="الاسم الثلاثي" autoComplete="name" /></div><div className="cx-field"><label>رقم الهاتف</label><input value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="مثال: 777000000" inputMode="tel" autoComplete="tel" /></div><div className="cx-field"><label>العمر</label><input value={form.age} onChange={e => update("age", e.target.value)} placeholder="العمر" type="number" min="1" max="120" /></div><div className="cx-field"><label>الجنس</label><select value={form.gender} onChange={e => update("gender", e.target.value)}><option value="">اختر</option><option value="male">ذكر</option><option value="female">أنثى</option></select></div><div className="cx-field"><label>التأمين <small>اختياري</small></label><select value={form.insurance} onChange={e => update("insurance", e.target.value)}><option value="none">بدون تأمين</option><option value="private">تأمين خاص</option><option value="company">تأمين جهة العمل</option></select></div>{form.service !== "instant" && <div className="cx-field"><label>تاريخ الموعد</label><input type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={e => update("date", e.target.value)} /></div>}</div>
          <div className="cx-block"><h3>اختر الوقت المناسب</h3><div className="cx-times">{TIMES.map(t => <button key={t} className={form.time === t ? "active" : ""} onClick={() => update("time", t)}>{t}</button>)}</div></div>
          {form.service === "instant" && <div className="cx-field"><label>ما الذي تشعر به؟</label><textarea value={form.symptoms} maxLength={500} onChange={e => update("symptoms", e.target.value)} placeholder="مثال: صداع وارتفاع حرارة منذ يومين، ولا توجد حساسية دوائية معروفة" /><small className="cx-counter">{form.symptoms.length}/500</small></div>}
          {form.service === "lab" && form.visitMode === "home" && <div className="cx-field"><label>عنوان الزيارة المنزلية</label><textarea value={form.address} onChange={e => update("address", e.target.value)} placeholder="المدينة، الحي، الشارع وأقرب علامة" /></div>}
          <div className="cx-field"><label>ملاحظة إضافية <small>اختياري</small></label><textarea value={form.notes} maxLength={500} onChange={e => update("notes", e.target.value)} placeholder="أدوية حالية، حساسية، احتياجات وصول، أو أي تفاصيل مفيدة" /></div>
          <label className="cx-check"><input type="checkbox" checked={form.emergencyAccepted} onChange={e => update("emergencyAccepted", e.target.checked)} /><span><b>أؤكد أن الحالة ليست طارئة.</b> في الحالات الخطرة سأتوجه إلى أقرب قسم طوارئ.</span></label>
        </>}

        {stage === "review" && <><div className="cx-heading"><span>المراجعة النهائية</span><h2>تأكد أن كل شيء صحيح</h2><p>راجع التفاصيل، ويمكنك العودة لأي خطوة قبل إرسال الحجز.</p></div><div className="cx-review">
          <ReviewRow title="الخدمة" value={service?.title} onEdit={() => setStage("service")} />
          <ReviewRow title={form.service === "lab" ? "المختبر" : "الطبيب"} value={form.service === "lab" ? `${lab?.name} — ${form.test}` : `${doctor?.name} — ${doctor?.specialty}`} onEdit={() => setStage("provider")} />
          <ReviewRow title="المريض" value={`${form.patientName} • ${form.age} سنة • ${form.phone}`} onEdit={() => setStage("details")} />
          <ReviewRow title="الموعد" value={`${form.date || "اليوم"} • ${form.time}`} onEdit={() => setStage("details")} />
          <ReviewRow title="طريقة الخدمة" value={form.service === "lab" ? (form.visitMode === "home" ? "زيارة منزلية" : "زيارة المختبر") : form.service === "clinic" ? "زيارة حضورية" : ({ video: "فيديو", chat: "محادثة", phone: "اتصال صوتي" }[form.channel])} onEdit={() => setStage("details")} />
          <div className="cx-total"><div><span>الإجمالي المتوقع</span><small>الدفع حسب سياسة مقدم الخدمة</small></div><strong>{total}$</strong></div>
          <label className="cx-consent"><input type="checkbox" checked={form.consent} onChange={e => update("consent", e.target.checked)} /><span>أوافق على إرسال بيانات الحجز الضرورية إلى مقدم الخدمة لإتمام الموعد، وأفهم أن هذه الصفحة لا تقدم تشخيصاً طبياً.</span></label>
        </div></>}

        {error && <div className="cx-error" role="alert">! {error}</div>}
        {stage !== "service" && <div className="cx-actions"><button className="cx-back cx-nav-button" onClick={goBack}><span className="cx-nav-icon" aria-hidden="true">›</span><span>الخطوة السابقة</span></button>{stage === "review" ? <button className="cx-primary cx-nav-button cx-nav-next" disabled={sending} onClick={confirmBooking}><span>{sending ? "جارٍ تأكيد الحجز..." : "تأكيد الحجز النهائي"}</span><span className="cx-nav-icon" aria-hidden="true">✓</span></button> : <button className="cx-primary cx-nav-button cx-nav-next" onClick={goNext}><span>{stage === "provider" ? "متابعة إلى بيانات المريض" : "متابعة إلى مراجعة الحجز"}</span><span className="cx-nav-icon" aria-hidden="true">‹</span></button>}</div>}
      </section>
    </section>
  </div><Styles /></main></>;
}

function ReviewRow({ title, value, onEdit }) { return <div className="cx-review-row"><div><small>{title}</small><strong>{value || "—"}</strong></div><button onClick={onEdit}>تعديل</button></div>; }

function Styles() { return <style>{`
  .cx-root,.cx-root *{box-sizing:border-box}.cx-root{width:100%;overflow-x:hidden;min-height:100vh;background:radial-gradient(circle at 85% 0,#dff9ff 0,transparent 32%),linear-gradient(180deg,#f7fbff 0,#eef6fb 100%);color:#102c46;font-family:Tahoma,Arial,sans-serif;padding:22px}.cx-root button,.cx-root input,.cx-root select,.cx-root textarea{font:inherit}.cx-root button:focus-visible,.cx-root input:focus-visible,.cx-root select:focus-visible,.cx-root textarea:focus-visible{outline:3px solid rgba(10,160,160,.25);outline-offset:2px}.cx-shell{width:100%;max-width:1240px;min-width:0;margin:auto}.cx-root img,.cx-root svg{max-width:100%;height:auto}.cx-root button,.cx-root input,.cx-root select,.cx-root textarea{max-width:100%}.cx-hero{position:relative;overflow:hidden;display:grid;grid-template-columns:1.25fr .75fr;align-items:center;gap:30px;padding:42px;border-radius:34px;background:linear-gradient(135deg,#073d73 0,#086a9d 55%,#0da7a5 100%);box-shadow:0 30px 80px rgba(6,61,115,.24);color:white}.cx-hero:before{content:"";position:absolute;inset:auto -90px -130px auto;width:360px;height:360px;border-radius:50%;border:80px solid rgba(255,255,255,.08)}.cx-badge{display:inline-flex;padding:8px 13px;border-radius:999px;background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.16);font-size:12px;font-weight:900}.cx-hero h1{font-size:clamp(35px,5vw,64px);line-height:1.12;margin:18px 0 12px;letter-spacing:-1px}.cx-hero h1 em{font-style:normal;color:#8ff5dd}.cx-hero p{max-width:650px;margin:0;color:#d9eff8;line-height:1.9;font-size:15px}.cx-trust{display:flex;flex-wrap:wrap;gap:15px;margin-top:22px;color:#dffdf6;font-size:12px;font-weight:800}.cx-orbit{position:relative;min-height:260px;display:grid;place-items:center}.cx-orbit:before,.cx-orbit:after{content:"";position:absolute;border-radius:50%;border:1px solid rgba(255,255,255,.2)}.cx-orbit:before{width:250px;height:250px}.cx-orbit:after{width:180px;height:180px}.cx-orbit-card{position:relative;z-index:2;width:220px;padding:23px;border-radius:28px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(15px);box-shadow:0 25px 50px rgba(0,0,0,.15)}.cx-orbit-card span,.cx-orbit-card small{display:block;color:#d7f0f8}.cx-orbit-card strong{display:block;margin:10px 0 5px;font-size:21px}.cx-orbit-mark{position:absolute;z-index:3;left:18px;top:20px;width:62px;height:62px;border-radius:20px;background:#8ff5dd;color:#07536b;display:grid;place-items:center;font-size:36px;font-weight:900}.cx-safety{display:flex;justify-content:space-between;gap:15px;align-items:flex-start;margin-top:14px;padding:14px 17px;border-radius:18px;background:#fff7f1;border:1px solid #ffd8c1;color:#8c3d1f}.cx-safety b,.cx-safety span{display:block}.cx-safety span{font-size:12px;line-height:1.7;margin-top:3px}.cx-safety button{border:0;background:transparent;color:#8c3d1f;font-size:22px;cursor:pointer}.cx-workspace{min-width:0;display:grid;grid-template-columns:265px minmax(0,1fr);gap:18px;margin-top:18px}.cx-side,.cx-main{min-width:0;background:rgba(255,255,255,.94);border:1px solid rgba(8,94,150,.1);box-shadow:0 18px 60px rgba(11,67,110,.08)}.cx-side{border-radius:26px;padding:18px;height:max-content;position:sticky;top:18px}.cx-progress-title{display:flex;justify-content:space-between;align-items:center;padding:4px 3px 15px;border-bottom:1px solid #e8f0f5}.cx-progress-title span{font-weight:900}.cx-progress-title b{color:#0a82a1}.cx-steps{display:grid;gap:7px;margin-top:15px}.cx-step{width:100%;border:0;background:transparent;display:flex;align-items:center;gap:11px;text-align:right;padding:11px;border-radius:16px;color:#7891a3}.cx-step i{font-style:normal;flex:0 0 34px;height:34px;border-radius:12px;background:#edf3f7;display:grid;place-items:center;font-weight:900}.cx-step span{font-weight:900}.cx-step small{display:block;margin-top:3px;font-size:10px;font-weight:400}.cx-step.active{background:#edfafa;color:#08798d}.cx-step.active i{background:#0d9fa0;color:white}.cx-step.done{color:#2b765f;cursor:pointer}.cx-step.done i{background:#e2f7ee;color:#178858}.cx-help{display:flex;gap:10px;align-items:center;background:#f4f8fb;border-radius:17px;padding:13px;margin-top:18px}.cx-help>span{width:35px;height:35px;border-radius:50%;background:#fff;display:grid;place-items:center;font-weight:900;color:#0b7b9a}.cx-help strong,.cx-help small{display:block}.cx-help small{margin-top:3px;color:#7891a3;font-size:10px;line-height:1.5}.cx-mini-summary{margin-top:12px;padding:13px;border-radius:17px;background:#edfafa}.cx-mini-summary small,.cx-mini-summary strong,.cx-mini-summary span{display:block}.cx-mini-summary small{color:#6e8d98}.cx-mini-summary strong{margin:4px 0;color:#08798d}.cx-mini-summary span{font-size:10px;color:#64808f}.cx-main{border-radius:26px;padding:28px;min-height:560px}.cx-heading>span{color:#0b98a0;font-size:11px;font-weight:900}.cx-heading h2{margin:8px 0 7px;font-size:clamp(25px,3vw,38px);color:#073f71}.cx-heading p{margin:0 0 22px;color:#738fa2;line-height:1.8;font-size:13px}.cx-service-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.cx-service{border:1px solid #e4edf3;background:white;border-radius:22px;padding:20px;display:grid;grid-template-columns:56px 1fr 28px;align-items:center;gap:14px;text-align:right;cursor:pointer;transition:.25s;box-shadow:0 10px 30px rgba(11,67,110,.05)}.cx-service:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(11,67,110,.12);border-color:#a8dce3}.cx-service-icon{width:56px;height:56px;border-radius:18px;display:grid;place-items:center;font-size:24px;background:#eaf8fb;color:#087c93}.cx-service b,.cx-service small,.cx-service em{display:block}.cx-service b{color:#0a4776;font-size:17px}.cx-service small{margin-top:6px;color:#758fa0;line-height:1.6}.cx-service em{margin-top:8px;color:#0a9193;font-size:10px;font-style:normal;font-weight:900}.cx-card-action{display:inline-flex!important;width:max-content;align-items:center;gap:7px;margin-top:10px;padding:7px 11px;border-radius:999px;background:linear-gradient(135deg,#edfafa,#e4f5ff);border:1px solid #d2ebf1;color:#087f91;font-size:10px;font-weight:900;box-shadow:0 5px 14px rgba(8,127,145,.08)}.cx-card-action b{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;background:#0b8f9b;color:#fff;font-size:17px;line-height:1}.cx-service>i{font-style:normal;color:#0a96a0;font-size:22px}.cx-service.green .cx-service-icon{background:#eaf8ef;color:#21895b}.cx-service.amber .cx-service-icon{background:#fff7e6;color:#b37a12}.cx-service.blue .cx-service-icon{background:#ebf3ff;color:#266fd1}.cx-specialties{display:flex;gap:8px;overflow:auto;padding-bottom:8px}.cx-specialties button{white-space:nowrap;border:1px solid #dce9ef;background:#fff;color:#56798e;border-radius:999px;padding:9px 14px;font-weight:800;cursor:pointer}.cx-specialties button.active{background:#0b819d;color:#fff;border-color:#0b819d}.cx-toolbar{display:grid;grid-template-columns:1fr 155px;gap:9px;margin:12px 0}.cx-search{display:flex;align-items:center;gap:9px;background:#f7fafc;border:1px solid #dfeaf0;border-radius:15px;padding:0 13px}.cx-search input{width:100%;height:46px;border:0;background:transparent;outline:none;color:#214e6a}.cx-toolbar>select{border:1px solid #dfeaf0;border-radius:15px;background:#fff;padding:0 11px;color:#446b83}.cx-result-count{font-size:10px;color:#7891a3;margin-bottom:8px}.cx-doctors,.cx-labs{display:grid;gap:10px;max-height:470px;overflow:auto;padding-left:4px}.cx-doctor,.cx-lab{width:100%;border:1px solid #e2ebf0;background:#fff;border-radius:19px;padding:14px;display:flex;align-items:center;gap:13px;text-align:right;cursor:pointer}.cx-doctor.selected,.cx-lab.selected{border-color:#0ba2a2;background:#f0fdfb;box-shadow:0 0 0 3px rgba(11,162,162,.08)}.cx-avatar,.cx-lab-icon{flex:0 0 50px;height:50px;border-radius:16px;background:linear-gradient(145deg,#0b6aa0,#12aaa0);color:#fff;display:grid;place-items:center;font-size:20px;font-weight:900}.cx-doctor-info{flex:1;min-width:0}.cx-doctor-info strong{font-size:15px;color:#0b4774}.cx-doctor-info small{display:block;color:#7890a1;margin:5px 0}.cx-select-action{display:inline-flex;margin-top:9px;padding:6px 10px;border-radius:999px;background:#eef7fb;color:#087d96;font-size:10px;font-weight:900}.cx-doctor.selected .cx-select-action,.cx-lab.selected .cx-select-action{background:#dff8f1;color:#167b5a}.cx-online{margin-right:8px;background:#e5f8ef;color:#198455;padding:4px 7px;border-radius:999px;font-size:9px;font-weight:900}.cx-meta{display:flex;flex-wrap:wrap;gap:10px;font-size:10px;color:#486e84}.cx-doctor>i,.cx-lab>i{width:26px;height:26px;border-radius:50%;border:1px solid #cfdee6;display:grid;place-items:center;font-style:normal;color:#fff}.cx-doctor.selected>i,.cx-lab.selected>i{background:#0a9b9a;border-color:#0a9b9a}.cx-lab div{flex:1}.cx-lab strong,.cx-lab small,.cx-lab em{display:block}.cx-lab strong{color:#0b4774}.cx-lab small{margin-top:5px;color:#6f899b}.cx-lab em{margin-top:7px;color:#17865e;font-size:10px;font-style:normal;font-weight:900}.cx-empty{text-align:center;padding:35px;border:1px dashed #cedfe7;border-radius:18px;color:#6d8798}.cx-empty b,.cx-empty span{display:block}.cx-empty span{font-size:11px;margin-top:6px}.cx-block{margin-bottom:20px}.cx-block h3{margin:0 0 10px;color:#174d6f;font-size:14px}.cx-choice-row{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.cx-choice-row.two{grid-template-columns:1fr 1fr}.cx-choice-row button{border:1px solid #dfe9ee;background:white;border-radius:17px;padding:14px;display:flex;align-items:center;gap:9px;color:#466e85;cursor:pointer}.cx-choice-row button span{width:35px;height:35px;border-radius:11px;background:#f0f6f8;display:grid;place-items:center}.cx-choice-row button.active{border-color:#0b9d9d;background:#f0fcfa;color:#087c7c}.cx-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px}.cx-field{position:relative}.cx-field label{display:block;margin-bottom:7px;color:#446b83;font-size:11px;font-weight:900}.cx-field label small{font-weight:400;color:#91a3ae}.cx-field input,.cx-field select,.cx-field textarea{width:100%;min-height:48px;border:1px solid #dce7ed;border-radius:14px;background:#fbfdfe;padding:11px 13px;color:#214f6a;outline:none}.cx-field input:focus,.cx-field select:focus,.cx-field textarea:focus{border-color:#0aa0a0;box-shadow:0 0 0 3px rgba(10,160,160,.08)}.cx-field textarea{min-height:92px;resize:vertical}.cx-counter{display:block;text-align:left;color:#91a3ae;font-size:9px;margin-top:4px}.cx-times{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.cx-times button{border:1px solid #dce8ee;background:#fff;border-radius:13px;padding:12px;color:#426c84;font-weight:900;cursor:pointer}.cx-times button.active{background:#0b819d;border-color:#0b819d;color:white}.cx-check{display:flex;gap:10px;align-items:flex-start;margin-top:14px;padding:13px;border-radius:15px;background:#fffaf0;border:1px solid #f3dfb0;color:#705c2f;font-size:11px;line-height:1.7}.cx-check input{margin-top:4px}.cx-review{display:grid;gap:10px}.cx-review-row{display:flex;align-items:center;justify-content:space-between;gap:12px;background:#f7fafc;border:1px solid #e3edf2;border-radius:17px;padding:14px}.cx-review-row small,.cx-review-row strong{display:block}.cx-review-row small{color:#8095a3;margin-bottom:4px}.cx-review-row strong{color:#164c6e;overflow-wrap:anywhere}.cx-review-row button{border:0;background:white;color:#0a8595;border-radius:10px;padding:8px 11px;font-weight:900;cursor:pointer}.cx-total{display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,#083f71,#0b9b9d);color:white;border-radius:19px;padding:17px}.cx-total span,.cx-total small{display:block}.cx-total small{margin-top:4px;color:#d9f2f3}.cx-total strong{font-size:26px}.cx-consent{display:flex;gap:9px;align-items:flex-start;color:#617f91;font-size:11px;line-height:1.7}.cx-consent input{margin-top:4px}.cx-error{position:relative;z-index:5;margin:14px 0 18px;background:#fff0f0;color:#b13b3b;border:1px solid #ffd8d8;border-radius:13px;padding:12px 13px;font-weight:800;font-size:12px;line-height:1.65;overflow:visible}.cx-actions{display:flex;gap:10px;margin-top:20px}.cx-primary,.cx-back{min-height:50px;border-radius:16px;padding:0 20px;font-weight:900;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}.cx-primary{flex:1;border:0;background:linear-gradient(135deg,#075f98 0%,#078aa2 52%,#0aafa0 100%);color:white;box-shadow:0 13px 28px rgba(8,115,165,.24),inset 0 1px 0 rgba(255,255,255,.2)}.cx-primary:hover{transform:translateY(-1px);box-shadow:0 16px 32px rgba(8,115,165,.3)}.cx-primary:disabled{opacity:.65;cursor:not-allowed;transform:none}.cx-back{border:1px solid #d2e3ea;background:linear-gradient(180deg,#fff,#f7fbfd);color:#426b82;box-shadow:0 8px 20px rgba(20,72,105,.08)}.cx-back:hover{border-color:#a9cbd8;transform:translateY(-1px)}.cx-nav-button{display:flex;align-items:center;justify-content:center;gap:10px}.cx-nav-icon{width:30px;height:30px;flex:0 0 30px;border-radius:10px;display:grid;place-items:center;background:rgba(255,255,255,.17);font-size:22px;line-height:1}.cx-back .cx-nav-icon{background:#eaf4f7;color:#0a8293}.cx-nav-next{letter-spacing:0}.cx-success{max-width:650px;margin:55px auto;background:white;border-radius:30px;padding:40px;text-align:center;box-shadow:0 25px 80px rgba(8,62,107,.14)}.cx-success-icon{width:86px;height:86px;border-radius:28px;background:linear-gradient(145deg,#0b9d8a,#42d08b);color:white;display:grid;place-items:center;font-size:44px;font-weight:900;margin:0 auto 18px}.cx-success .cx-badge{background:#eaf8f4;color:#17865e}.cx-success h1{color:#0b4774;font-size:36px;margin:15px 0 8px}.cx-success p{color:#708b9b;line-height:1.8}.cx-ticket{margin:24px 0;background:#f4f9fb;border:1px dashed #b9d5df;border-radius:20px;padding:18px}.cx-ticket small,.cx-ticket strong{display:block}.cx-ticket strong{font-size:29px;color:#087d96;margin:7px 0 13px;letter-spacing:2px}.cx-ticket div{display:flex;flex-wrap:wrap;justify-content:center;gap:8px}.cx-ticket div span{background:white;border-radius:999px;padding:7px 10px;color:#56798d;font-size:10px}.cx-success-actions{display:flex;gap:10px}
  @media(max-width:1100px){.cx-root{padding:18px}.cx-hero{padding:34px}.cx-workspace{grid-template-columns:235px minmax(0,1fr)}.cx-main{padding:24px}.cx-service{padding:17px}.cx-choice-row button{padding:12px}}
  @media(max-width:900px){.cx-root{padding:14px}.cx-hero{grid-template-columns:1fr;padding:30px}.cx-orbit{display:none}.cx-workspace{grid-template-columns:1fr}.cx-side{position:static;top:auto}.cx-steps{grid-template-columns:repeat(4,minmax(0,1fr))}.cx-step{display:block;text-align:center;min-width:0}.cx-step i{margin:auto}.cx-step span{display:block;overflow:hidden;text-overflow:ellipsis}.cx-step small{display:none}.cx-main{min-height:auto}.cx-doctors,.cx-labs{max-height:none}}
  @media(max-width:700px){.cx-hero{padding:26px;border-radius:26px}.cx-hero h1{font-size:clamp(32px,9vw,46px)}.cx-hero p{font-size:14px}.cx-trust{gap:9px}.cx-safety{padding:12px 14px}.cx-main{padding:21px 18px}.cx-service-grid{grid-template-columns:1fr}.cx-form-grid,.cx-toolbar{grid-template-columns:1fr}.cx-choice-row{grid-template-columns:1fr}.cx-choice-row.two{grid-template-columns:1fr 1fr}.cx-doctor,.cx-lab{align-items:flex-start}.cx-review-row{align-items:flex-start}.cx-success-actions{flex-direction:column}}
  @media(max-width:520px){.cx-main{padding-bottom:40px;overflow:visible}.cx-root{padding:8px;padding-bottom:calc(var(--cx-bottom-nav-height,72px) + 72px + env(safe-area-inset-bottom))}.cx-shell{padding-bottom:20px}.cx-hero{padding:22px 18px;border-radius:22px}.cx-badge{font-size:10px;padding:7px 10px}.cx-hero h1{font-size:31px;letter-spacing:-.5px}.cx-hero p{line-height:1.75}.cx-trust{font-size:10px}.cx-safety{border-radius:15px}.cx-safety span{font-size:11px}.cx-workspace{margin-top:8px;gap:8px}.cx-side{padding:9px 7px;border-radius:18px;overflow:hidden}.cx-progress-title,.cx-help,.cx-mini-summary{display:none}.cx-steps{margin:0;gap:3px}.cx-step{padding:6px 2px;font-size:9px;border-radius:12px}.cx-step i{width:28px;height:28px;min-width:28px;border-radius:9px;font-size:11px}.cx-main{padding:18px 13px;border-radius:18px}.cx-heading h2{font-size:25px}.cx-heading p{font-size:12px;margin-bottom:17px}.cx-service{grid-template-columns:46px minmax(0,1fr) 18px;gap:10px;padding:13px;border-radius:17px}.cx-service-icon{width:46px;height:46px;border-radius:14px;font-size:20px}.cx-service b{font-size:15px}.cx-service small{font-size:11px}.cx-specialties{margin-left:-4px;margin-right:-4px;padding-inline:4px;scrollbar-width:none}.cx-specialties::-webkit-scrollbar{display:none}.cx-specialties button{padding:8px 11px;font-size:11px}.cx-toolbar{gap:7px}.cx-search input{height:44px}.cx-doctor,.cx-lab{padding:11px;gap:9px;border-radius:16px}.cx-avatar,.cx-lab-icon{flex-basis:43px;height:43px;border-radius:13px}.cx-doctor-info strong{font-size:13px}.cx-online{display:inline-block;margin:5px 0 0 6px}.cx-meta{gap:5px;font-size:9px}.cx-choice-row.two{grid-template-columns:1fr}.cx-choice-row button{min-height:52px;padding:11px}.cx-times{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.cx-times button{padding:11px 5px;font-size:12px}.cx-field input,.cx-field select,.cx-field textarea{font-size:16px}.cx-review-row{flex-direction:column}.cx-review-row button{align-self:flex-end}.cx-total{padding:14px}.cx-total strong{font-size:22px}.cx-actions{
      position:static;
      z-index:auto;
      bottom:auto;
      scroll-margin-bottom:0;
      margin-top:22px;
      margin-bottom:calc(var(--cx-bottom-nav-height,72px) + 42px + env(safe-area-inset-bottom));
      background:rgba(255,255,255,.985);
      padding:8px;
      border:1px solid rgba(8,118,217,.08);
      border-radius:17px;
      box-shadow:0 8px 22px rgba(7,66,105,.08);
      backdrop-filter:blur(14px);
      -webkit-backdrop-filter:blur(14px);
    }.cx-primary,.cx-back{min-height:46px;padding:0 14px;font-size:12px}.cx-success{margin:14px auto;padding:24px 15px;border-radius:22px}.cx-success h1{font-size:27px}.cx-ticket{padding:14px}.cx-ticket strong{font-size:23px;letter-spacing:1px}}
  @media(max-width:360px){.cx-root{padding:5px}.cx-hero{padding:19px 14px}.cx-hero h1{font-size:28px}.cx-trust span{width:100%}.cx-main{padding:16px 10px}.cx-step span{font-size:8px}.cx-service{grid-template-columns:42px minmax(0,1fr);}.cx-service>i{display:none}.cx-service-icon{width:42px;height:42px}.cx-times{grid-template-columns:1fr 1fr}.cx-actions{gap:6px}.cx-primary,.cx-back{padding:0 10px}.cx-ticket div{display:grid}.cx-success-icon{width:72px;height:72px;font-size:38px}}

  @media(max-width:520px){
    .cx-workspace,.cx-panel,.cx-main,.cx-shell{overflow:visible!important;max-height:none!important}
    .cx-actions{width:100%;flex-wrap:nowrap}
  }

    @media(max-height:620px) and (orientation:landscape){.cx-hero{padding:22px}.cx-hero h1{font-size:34px}.cx-trust{margin-top:12px}.cx-side{position:static}.cx-actions{position:static;bottom:auto}.cx-doctors,.cx-labs{max-height:none}}
  @media(hover:none){.cx-service:hover{transform:none;box-shadow:0 10px 30px rgba(11,67,110,.05)}}
  @media(prefers-reduced-motion:reduce){.cx-root *{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
  .cx-print-mark{display:none}

  @media print{
    @page{size:auto;margin:12mm}
    html,body{background:#fff!important}
    body *{visibility:hidden!important}
    .cx-root,.cx-root *,.cx-success,.cx-success *{visibility:visible!important}
    .tibyan-shared-header,.tibyan-shared-header-spacer,.cx-success-actions{display:none!important}
    .cx-root{
      position:static!important;
      width:100%!important;
      min-height:0!important;
      overflow:visible!important;
      padding:0!important;
      margin:0!important;
      background:#fff!important;
    }
    .cx-shell{width:100%!important;max-width:none!important;margin:0!important;padding:0!important}
    .cx-success{
      position:relative!important;
      isolation:isolate;
      width:100%!important;
      max-width:760px!important;
      min-height:245mm;
      margin:0 auto!important;
      padding:26mm 18mm 18mm!important;
      overflow:hidden!important;
      border:1px solid #dce8ef!important;
      border-radius:0!important;
      background:#fff!important;
      box-shadow:none!important;
      color:#102c46!important;
      print-color-adjust:exact;
      -webkit-print-color-adjust:exact;
    }
    .cx-success:before{
      content:"تبيان | تقرير طبي";
      position:absolute;
      top:9mm;
      right:18mm;
      left:18mm;
      padding-bottom:5mm;
      border-bottom:1px solid #dce8ef;
      color:#075695;
      font-size:13px;
      font-weight:900;
      text-align:right;
      letter-spacing:0;
    }
    .cx-success:after{
      content:"TIBYAN • صحتك أوضح";
      position:absolute;
      right:18mm;
      bottom:9mm;
      left:18mm;
      padding-top:4mm;
      border-top:1px solid #e5edf2;
      color:#7b94a4;
      font-size:9px;
      font-weight:700;
      text-align:center;
    }
    .cx-print-mark{
      display:block!important;
      position:absolute!important;
      z-index:0!important;
      top:50%!important;
      left:50%!important;
      width:112mm!important;
      height:112mm!important;
      transform:translate(-50%,-48%)!important;
      opacity:.055!important;
      pointer-events:none!important;
      print-color-adjust:exact;
      -webkit-print-color-adjust:exact;
    }
    .cx-print-mark svg{width:100%!important;height:100%!important;display:block!important}
    .cx-success>*:not(.cx-print-mark){position:relative;z-index:1}
    .cx-success-icon{width:68px!important;height:68px!important;margin-top:5mm!important}
    .cx-success h1{font-size:30px!important}
    .cx-success p{font-size:12px!important}
    .cx-ticket{
      margin-top:20px!important;
      padding:18px!important;
      border:1px solid #c9dce6!important;
      background:rgba(248,251,253,.88)!important;
      print-color-adjust:exact;
      -webkit-print-color-adjust:exact;
    }
  }
`}</style>; }
