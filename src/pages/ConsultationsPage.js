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
function TibyanPrintLogo({ className = "" }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tb-print-blue" x1="60" y1="115" x2="260" y2="470" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1299f0" />
          <stop offset="0.55" stopColor="#0b69df" />
          <stop offset="1" stopColor="#073a91" />
        </linearGradient>
        <linearGradient id="tb-print-teal" x1="150" y1="55" x2="355" y2="385" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#18d2d4" />
          <stop offset="1" stopColor="#0792c8" />
        </linearGradient>
        <linearGradient id="tb-print-green" x1="215" y1="145" x2="405" y2="455" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#59df80" />
          <stop offset="0.52" stopColor="#27cf91" />
          <stop offset="1" stopColor="#12b9b2" />
        </linearGradient>
      </defs>

      {/* جسم الطبيب والصليب الطبي */}
      <path
        d="M121 164h116c27 0 48 21 48 48v43h-69c-20 0-37 17-37 37v59h-58c-27 0-48-22-48-48v-91c0-27 21-48 48-48Z"
        fill="url(#tb-print-teal)"
      />
      <path
        d="M58 220h139c30 0 55 25 55 55v58c0 80-44 142-129 177 21-31 31-64 33-109H98c-30 0-54-24-54-54v-73c0-30 24-54 54-54Z"
        fill="url(#tb-print-blue)"
      />
      <path
        d="M68 305h72l17-41 21 93 24-147 25 110 16-29h65"
        fill="none"
        stroke="#ffffff"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="224" cy="216" r="34" fill="#ffffff" />

      {/* الورقة الصحية */}
      <path
        d="M189 377c58-42 111-98 167-177-12 64-31 117-53 162-25 54-62 97-125 136 18-34 16-73 11-121Z"
        fill="url(#tb-print-green)"
      />
      <path
        d="M253 356c38-41 73-87 116-144-6 51-16 96-32 136-20 52-52 97-109 139 34-44 32-85 25-131Z"
        fill="url(#tb-print-blue)"
      />
      <path
        d="M282 336c39 32 73 46 119 48 20 1 39-2 56-8"
        fill="none"
        stroke="#ffffff"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity=".96"
      />

      {/* المسار الدائري للخدمات */}
      <g fill="none" stroke="url(#tb-print-teal)" strokeWidth="8" strokeLinecap="round">
        <path d="M194 98c38-14 83-21 126-18" />
        <path d="M349 90c64 12 118 48 150 98" />
        <path d="M490 232c8 29 10 60 6 91" />
        <path d="M483 352c-20 54-61 100-115 129" />
        <path d="M322 489c-41 12-85 13-126 2" />
        <path d="M159 480c-16-5-32-12-47-21" />
      </g>

      {/* دوائر الخدمات */}
      <circle cx="216" cy="84" r="36" fill="url(#tb-print-teal)" />
      <circle cx="361" cy="111" r="36" fill="url(#tb-print-blue)" />
      <circle cx="455" cy="219" r="36" fill="url(#tb-print-blue)" />
      <circle cx="439" cy="343" r="36" fill="url(#tb-print-teal)" />
      <circle cx="313" cy="436" r="36" fill="url(#tb-print-green)" />
      <circle cx="181" cy="444" r="36" fill="url(#tb-print-green)" />

      {/* سماعة الطبيب */}
      <g fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M199 68v13c0 13 8 23 19 23s19-10 19-23V68" />
        <circle cx="199" cy="66" r="3.5" fill="#ffffff" stroke="none" />
        <circle cx="237" cy="66" r="3.5" fill="#ffffff" stroke="none" />
        <path d="M218 104v8c0 10 8 18 18 18s18-8 18-18v-3" />
        <circle cx="254" cy="105" r="5" />
      </g>

      {/* سجل طبي */}
      <g fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="343" y="91" width="36" height="43" rx="6" />
        <path d="M354 88h14v9h-14zM351 106h20M351 117h15M351 127h18" />
      </g>

      {/* مختبر */}
      <g fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M448 193h14M451 193v17l-13 23a7 7 0 0 0 6 10h22a7 7 0 0 0 6-10l-13-23v-17" />
        <path d="M444 229h22" />
      </g>

      {/* دواء */}
      <g fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="m424 331 18-18a12 12 0 0 1 17 17l-18 18a12 12 0 1 1-17-17Z" />
        <path d="m433 322 17 17" />
      </g>

      {/* تقويم */}
      <g fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="292" y="416" width="42" height="36" rx="5" />
        <path d="M292 428h42M303 409v12M323 409v12" />
        <path d="M303 438h1M313 438h1M323 438h1M303 447h1M313 447h1M323 447h1" />
      </g>

      {/* تغذية */}
      <g fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M159 443h44c-2 16-11 25-22 25s-20-9-22-25Z" />
        <path d="M168 437c2-8 7-13 13-17M181 437c0-8 4-14 10-18M194 437c1-6 5-10 10-13" />
      </g>
    </svg>
  );
}

function PhonePrintIcon(){return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.8 9 3l2 4.8-1.8 1.7a14.8 14.8 0 0 0 5.3 5.3L16.2 13l4.8 2-.8 2.4c-.5 1.4-1.8 2.3-3.3 2.2C9.9 19 5 14.1 4.4 7.1 4.3 5.6 5.2 4.3 6.6 3.8Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>}
function MailPrintIcon(){return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="m4.5 7 7.5 6 7.5-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>}
function LocationPrintIcon(){return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.7"/></svg>}

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

  if (stage === "done") return <><TibyanHeader /><main dir="rtl" className="cx-root" style={{ "--cx-bottom-nav-height": `${bottomNavHeight}px` }}><div className="cx-shell"><section className="cx-success" aria-live="polite">
    <div className="cx-print-letterhead" aria-hidden="true">
      <div className="cx-print-topband">
        <div className="cx-print-logo-wrap">
          <TibyanPrintLogo className="cx-print-logo" />
        </div>
        <div className="cx-print-title">
          <strong>تبيان</strong>
          <span>النظام الصحي الذكي</span>
          <small>TIBYAN SMART HEALTH SYSTEM</small>
        </div>
        <div className="cx-print-topline" />
      </div>

      <div className="cx-print-watermark">
        <TibyanPrintLogo className="cx-print-watermark-logo" />
      </div>

      <div className="cx-print-arrival-note">
        <span className="cx-print-info-mark">i</span>
        <span>يرجى الحضور قبل الموعد بـ 10 دقائق مع إحضار البطاقة أو المستندات الخاصة.</span>
      </div>

      <div className="cx-print-slogan">
        <span>⌁</span><strong>صحتك .. أولويتنا</strong><span>⌁</span>
      </div>

      <div className="cx-print-footer">
        <div className="cx-print-footer-feature"><span className="cx-print-mini-icon">♡</span><strong>صحة أفضل</strong></div><i />
        <div className="cx-print-footer-feature"><span className="cx-print-mini-icon">▦</span><strong>رعاية ذكية</strong></div><i />
        <div className="cx-print-footer-feature"><MailPrintIcon /><strong>خدمات أسرع</strong></div><i />
        <div className="cx-print-footer-feature"><LocationPrintIcon /><strong>مواعيد أكثر دقة</strong></div>
      </div>
    </div>
    <div className="cx-success-icon">✓</div><span className="cx-badge">تم الحجز بنجاح</span><h1>موعدك أصبح جاهزاً</h1><p>احتفظ برقم الحجز، وستصلك تفاصيل الموعد على رقم الهاتف المسجل.</p><div className="cx-ticket"><small>رقم الحجز</small><strong>{booking}</strong><div><span>{service?.title}</span><span>{doctor?.name || lab?.name}</span><span>{form.date || "اليوم"} • {form.time}</span><span>الإجمالي: {total}$</span></div></div><div className="cx-success-actions"><button className="cx-primary" onClick={() => { setForm(INITIAL); setStage("service"); setBooking(""); }}>حجز خدمة جديدة</button><button className="cx-back" onClick={() => typeof window !== "undefined" && window.print()}>طباعة التأكيد</button></div>
  </section></div><Styles /></main></>;

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
  .cx-print-letterhead{display:none}
  @media print{
    @page{size:A4 portrait;margin:0}
    html,body,#root{width:210mm!important;min-width:210mm!important;max-width:210mm!important;height:297mm!important;min-height:297mm!important;max-height:297mm!important;margin:0!important;padding:0!important;overflow:hidden!important;background:#fff!important}
    body *{visibility:hidden!important}
    .cx-root,.cx-root *,.cx-success,.cx-success *{visibility:visible!important}
    .tibyan-shared-header,.tibyan-shared-header-spacer,.cx-success-actions{display:none!important}
    .cx-root{position:fixed!important;inset:0!important;width:210mm!important;height:297mm!important;margin:0!important;padding:0!important;overflow:hidden!important;background:#fff!important}
    .cx-shell{width:210mm!important;height:297mm!important;max-width:none!important;margin:0!important;padding:0!important;overflow:hidden!important}
    .cx-success{position:relative!important;isolation:isolate!important;box-sizing:border-box!important;width:210mm!important;height:297mm!important;min-height:297mm!important;max-height:297mm!important;max-width:none!important;margin:0!important;padding:64mm 13mm 42mm!important;overflow:hidden!important;border:0!important;border-radius:0!important;background:#fff!important;box-shadow:none!important;color:#102c46!important;text-align:center!important;print-color-adjust:exact;-webkit-print-color-adjust:exact}

    .cx-print-letterhead{display:block!important;position:absolute!important;inset:0!important;width:210mm!important;height:297mm!important;z-index:0!important;pointer-events:none!important;overflow:hidden!important}

    .cx-print-topband{position:absolute!important;top:-1mm!important;left:-1mm!important;width:212mm!important;height:58mm!important;background:radial-gradient(circle at 11% 8%,rgba(255,255,255,.10),transparent 24%),linear-gradient(112deg,#0656a9 0%,#0877d9 58%,#099fe0 100%)!important;clip-path:polygon(0 0,100% 0,100% 76%,89% 82%,76% 84%,61% 83%,45% 79%,30% 72%,14% 65%,0 68%)!important;print-color-adjust:exact;-webkit-print-color-adjust:exact}
    .cx-print-topband:before{content:"";position:absolute;left:-3mm;right:-3mm;bottom:-4mm;height:18mm;background:#fff;clip-path:polygon(0 28%,12% 13%,25% 21%,40% 39%,56% 59%,73% 63%,87% 56%,100% 43%,100% 100%,0 100%);z-index:2}
    .cx-print-topband:after{content:"";position:absolute;left:-2mm;right:-2mm;bottom:-.5mm;height:8.5mm;background:linear-gradient(90deg,#22c9e1 0%,#12b8da 46%,#08bfa2 76%,#05b45e 100%);clip-path:polygon(0 42%,13% 22%,28% 34%,45% 53%,62% 68%,78% 67%,91% 55%,100% 41%,100% 76%,90% 83%,78% 90%,62% 92%,45% 78%,28% 56%,13% 42%,0 64%);opacity:.98;z-index:3}

    .cx-print-logo-wrap{position:absolute!important;top:3.8mm!important;right:6mm!important;width:35mm!important;height:35mm!important;display:grid!important;place-items:center!important;overflow:visible!important;background:transparent!important;border:0!important;box-shadow:none!important;z-index:4!important}
    .cx-print-logo{width:100%!important;height:100%!important;display:block!important;overflow:visible!important;filter:drop-shadow(0 .8mm 1.2mm rgba(0,52,112,.14))!important}

    .cx-print-title{position:absolute!important;top:7mm!important;right:47mm!important;display:grid!important;gap:.55mm!important;color:#fff!important;text-align:right!important;direction:rtl!important;z-index:4!important;min-width:56mm!important}
    .cx-print-title strong{font-size:25pt!important;line-height:1!important;font-weight:900!important;letter-spacing:-.25mm!important}
    .cx-print-title span{font-size:10.7pt!important;font-weight:800!important;line-height:1.05!important}
    .cx-print-title small{font-size:6.2pt!important;line-height:1!important;font-weight:700!important;letter-spacing:.18mm!important;opacity:.97!important}

    .cx-print-topline{position:absolute!important;top:34mm!important;right:45mm!important;width:58mm!important;height:7mm!important;z-index:4!important;opacity:.74!important}
    .cx-print-topline:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent 0 6%,#21d7d7 6% 32%,transparent 32% 36%,#21d7d7 36% 39%,transparent 39% 44%,#21d7d7 44% 47%,transparent 47% 51%,#21d7d7 51% 54%,transparent 54% 62%,#1ecf88 62% 91%,transparent 91%);clip-path:polygon(0 48%,28% 48%,33% 48%,36% 8%,40% 92%,44% 34%,48% 60%,53% 48%,100% 48%,100% 55%,54% 55%,48% 68%,44% 45%,40% 100%,35% 22%,32% 55%,0 55%)}

    .cx-print-watermark{position:absolute!important;top:57%!important;left:50%!important;width:112mm!important;height:112mm!important;transform:translate(-50%,-50%)!important;opacity:.085!important;z-index:0!important}
    .cx-print-watermark-logo{width:100%!important;height:100%!important;display:block!important;overflow:visible!important;filter:saturate(.92)!important}

    .cx-success>*:not(.cx-print-letterhead){position:relative!important;z-index:2!important}
    .cx-success-icon{width:23mm!important;height:23mm!important;margin:0 auto 3.8mm!important;border-radius:50%!important;background:linear-gradient(145deg,#08aa5b,#20c978)!important;color:#fff!important;font-size:31pt!important;box-shadow:0 0 0 2.8mm rgba(20,192,104,.08),0 0 0 5.5mm rgba(20,192,104,.035)!important;print-color-adjust:exact;-webkit-print-color-adjust:exact}
    .cx-success .cx-badge{padding:1.7mm 4.6mm!important;background:#dff6e9!important;color:#148653!important;border:0!important;border-radius:999px!important;font-size:8.7pt!important;font-weight:900!important;print-color-adjust:exact;-webkit-print-color-adjust:exact}
    .cx-success h1{margin:4.5mm 0 2mm!important;font-size:27pt!important;color:#06488b!important;font-weight:900!important;letter-spacing:-.15mm!important}
    .cx-success p{max-width:158mm!important;margin:0 auto!important;font-size:10pt!important;line-height:1.75!important;color:#3d6590!important}

    .cx-ticket{width:176mm!important;max-width:none!important;margin:36mm auto 0!important;padding:5.5mm 4mm 4.8mm!important;border:1px solid #bdddf3!important;border-radius:5.5mm!important;background:rgba(249,253,255,.94)!important;box-shadow:0 1.2mm 4mm rgba(4,78,142,.04)!important;overflow:hidden!important;print-color-adjust:exact;-webkit-print-color-adjust:exact}
    .cx-ticket:before{content:"رقم الحجز";display:block!important;width:calc(100% - 4mm)!important;margin:-3.2mm auto 1.2mm!important;padding:1.4mm 0!important;border-radius:999px!important;background:linear-gradient(90deg,#eaf6ff,#dcefff,#eaf6ff)!important;color:#2c6798!important;font-size:8.5pt!important;font-weight:900!important}
    .cx-ticket>small{display:none!important}
    .cx-ticket strong{display:block!important;margin:0 0 4mm!important;font-size:24pt!important;color:#07589d!important;letter-spacing:.55mm!important}
    .cx-ticket div{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:0!important;border-top:1px solid #d8eaf6!important;padding-top:3.6mm!important}
    .cx-ticket div span{position:relative!important;display:grid!important;place-items:center!important;min-height:13mm!important;padding:2mm 2.5mm!important;border:0!important;border-left:1px solid #dcecf7!important;background:transparent!important;color:#315f87!important;font-size:8.4pt!important;font-weight:800!important;line-height:1.35!important}
    .cx-ticket div span:last-child{border-left:0!important}

    .cx-print-arrival-note{position:absolute!important;left:50%!important;bottom:39mm!important;transform:translateX(-50%)!important;width:166mm!important;min-height:10mm!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:3mm!important;padding:2mm 5mm!important;border-radius:999px!important;background:#e6f3fc!important;color:#2f6090!important;font-size:8.4pt!important;font-weight:700!important;print-color-adjust:exact;-webkit-print-color-adjust:exact}
    .cx-print-info-mark{width:6mm!important;height:6mm!important;border-radius:50%!important;background:#0874c9!important;color:#fff!important;display:grid!important;place-items:center!important;font-family:Arial,sans-serif!important;font-size:9pt!important;font-weight:900!important}

    .cx-print-slogan{position:absolute!important;left:50%!important;bottom:29.3mm!important;transform:translateX(-50%)!important;display:flex!important;align-items:center!important;gap:3mm!important;color:#074b88!important;font-size:10.5pt!important;white-space:nowrap!important}
    .cx-print-slogan span{color:#0b80d2!important;font-size:16pt!important;line-height:1!important}

    .cx-print-footer{position:absolute!important;left:-1mm!important;bottom:-1mm!important;width:212mm!important;height:30mm!important;display:grid!important;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr!important;align-items:end!important;gap:4.5mm!important;padding:10mm 11mm 5mm!important;background:linear-gradient(115deg,#079fd6 0%,#0876d9 48%,#064d9c 100%)!important;clip-path:polygon(0 28%,14% 10%,30% 12%,47% 20%,64% 17%,82% 9%,100% 2%,100% 100%,0 100%)!important;color:#fff!important;print-color-adjust:exact;-webkit-print-color-adjust:exact}
    .cx-print-footer:before{content:"";position:absolute;top:0;left:0;right:0;height:5.5mm;background:linear-gradient(90deg,#0fc1e6 0%,#11c4b3 58%,#10b96e 100%);clip-path:polygon(0 50%,18% 18%,38% 30%,57% 55%,77% 34%,100% 9%,100% 40%,78% 67%,57% 82%,38% 56%,18% 46%,0 76%)}
    .cx-print-footer>i{width:.25mm!important;height:10mm!important;background:rgba(255,255,255,.42)!important;align-self:end!important}
    .cx-print-footer-feature{position:relative!important;z-index:2!important;display:grid!important;justify-items:center!important;gap:1mm!important;color:#fff!important;font-size:8.1pt!important;font-weight:800!important;white-space:nowrap!important}
    .cx-print-footer-feature svg{width:7mm!important;height:7mm!important;color:#fff!important}
    .cx-print-mini-icon{width:7mm!important;height:7mm!important;border:1px solid rgba(255,255,255,.9)!important;border-radius:50%!important;display:grid!important;place-items:center!important;color:#fff!important;font-size:13pt!important;line-height:1!important}
  }
`}</style>; }
