import TibyanHeader from "../components/TibyanHeader";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SparklesIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="m12 3 1.2 3.2L16.5 7.5l-3.3 1.2L12 12l-1.2-3.3-3.3-1.2 3.3-1.3L12 3Z" />
      <path d="m18.5 13 .8 2.1 2.2.9-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.9.8-2.1Z" />
      <path d="m5 13 .7 1.8 1.8.7-1.8.7L5 18l-.7-1.8-1.8-.7 1.8-.7L5 13Z" />
    </svg>
  );
}

function DoctorIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="7" r="3.2" />
      <path d="M5.5 20v-2.2A6.5 6.5 0 0 1 12 11.3a6.5 6.5 0 0 1 6.5 6.5V20" />
      <path d="M8 14.5v2.2a2 2 0 0 0 4 0v-2.2M16.5 15.5h2M17.5 14.5v2" />
    </svg>
  );
}

function ChatIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M5 5h14v10H9l-4 4V5Z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 13h3v3H8zM14 13h2M14 16h2" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function BowlIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 11h16a8 8 0 0 1-16 0Z" />
      <path d="M8 7c1.5-2 3.5-2 5-4M14 8c1-1.8 2.8-2.2 4-3.5M7 19h10" />
    </svg>
  );
}

function AppleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12.2 8.2c-2.3-2.2-6.4-1.3-7.2 2.2-1 4.2 2.4 9.1 5.2 9.1 1 0 1.2-.5 1.8-.5s.8.5 1.8.5c2.8 0 6.2-4.9 5.2-9.1-.8-3.5-4.9-4.4-7.2-2.2" />
      <path d="M12 7c.2-2 1.4-3.2 3.4-3.8M12.5 6c-1.3-1.4-2.8-1.8-4.5-1.2" />
    </svg>
  );
}

function LeafIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M20 4C11 4 5 8.2 5 14.2c0 3.1 2.2 5.3 5.2 5.3C16.2 19.5 20 12 20 4Z" />
      <path d="M6 18c2.6-4.6 6.1-7.6 10.8-9.3" />
    </svg>
  );
}

function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 3 5 6v5c0 4.5 2.8 7.8 7 10 4.2-2.2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function MoreIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" />
    </svg>
  );
}

function HistoryIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 4v4h4M12 7v5l3 2" />
    </svg>
  );
}

function ReportIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M7 3h7l4 4v14H7V3Z" /><path d="M14 3v5h5M10 12h5M10 16h5" />
    </svg>
  );
}

function TextSizeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 6h10M9 6v12M6 18h6" /><path d="M15 10h5M17.5 10v8M15.5 18h4" />
    </svg>
  );
}

const aiBenefits = [
  "تحليل أولي للعادات الغذائية",
  "اقتراح خطة يومية مرنة",
  "متابعة الأهداف والتقدم",
  "إجابات فورية على مدار الساعة",
];

const humanBenefits = [
  "استشارة مع مختص تغذية",
  "خطة علاجية مخصصة",
  "متابعة دورية وتقييم مستمر",
  "مراعاة التاريخ الصحي والاحتياجات",
];

export default function NutritionPage() {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState(null);
  const [message, setMessage] = useState("");
  const [goal, setGoal] = useState("تحسين نمط الغذاء");
  const [confirmed, setConfirmed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [view, setView] = useState("home");
  const [records, setRecords] = useState([]);
  const [storageReady, setStorageReady] = useState(false);

  function goBack() {
    if (window.history.length > 1) navigate(-1);
    else navigate("/home");
  }

  function closeModal() {
    setActiveMode(null);
    setMessage("");
    setConfirmed(false);
  }

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("tibyan-nutrition-records");
      if (saved) setRecords(JSON.parse(saved));
      setLargeText(window.localStorage.getItem("tibyan-nutrition-large-text") === "1");
    } catch {
      // تستمر الصفحة بصورة طبيعية إذا لم يكن التخزين المحلي متاحًا.
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("tibyan-nutrition-records", JSON.stringify(records));
      window.localStorage.setItem("tibyan-nutrition-large-text", largeText ? "1" : "0");
    } catch {
      // لا نوقف تجربة المستخدم عند تعذر الحفظ المحلي.
    }
  }, [records, largeText, storageReady]);

  function goTo(nextView) {
    setView(nextView);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addRecord(type, title, detail) {
    const record = {
      id: `NUT-${Date.now().toString().slice(-7)}`,
      type,
      title,
      detail,
      createdAt: new Intl.DateTimeFormat("ar-SA", {
        day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit"
      }).format(new Date())
    };
    setRecords((items) => [record, ...items]);
  }

  function confirmAi() {
    if (!confirmed) addRecord("ai", "استشارة دكتور التغذية الذكي", `${goal}${message.trim() ? ` — ${message.trim()}` : ""}`);
    setConfirmed(true);
  }

  function confirmHuman() {
    if (!confirmed) addRecord("human", "طلب استشارة أخصائي تغذية بشري", "تم تسجيل طلب حجز ومتابعة شخصية");
    setConfirmed(true);
  }

  return (
    <>
      <TibyanHeader />
      <main dir="rtl" className={`nutrition-page ${largeText ? "large-text" : ""}`}>
      <div className="nutrition-container">
        <button type="button" onClick={goBack} className="nutrition-back">
          <ArrowIcon />
          العودة
        </button>

        <section className="nutrition-intro" aria-label="مدخل التغذية الذكية">
          <div className="nutrition-banner-menu">
            <button
              type="button"
              className="nutrition-banner-menu-button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-label="فتح القائمة"
            >
              <MoreIcon />
            </button>

            {menuOpen && (
              <div className="nutrition-banner-menu-list">
                <button type="button" className={view === "home" ? "active" : ""} onClick={() => goTo("home")} title="التغذية" aria-label="التغذية">
                  <HomeIcon />
                </button>
                <button type="button" className={view === "ops" ? "active" : ""} onClick={() => goTo("ops")} title="العمليات" aria-label="العمليات">
                  <HistoryIcon />
                </button>
                <button type="button" className={view === "reports" ? "active" : ""} onClick={() => goTo("reports")} title="التقارير" aria-label="التقارير">
                  <ReportIcon />
                </button>
                <button type="button" onClick={() => { setLargeText((value) => !value); setMenuOpen(false); }} title={largeText ? "الخط العادي" : "تكبير الخط"} aria-label={largeText ? "الخط العادي" : "تكبير الخط"}>
                  <TextSizeIcon />
                </button>
              </div>
            )}
          </div>

          <div className="nutrition-intro-art" aria-hidden="true">
            <span className="nutrition-art-circle nutrition-art-circle-main"><BowlIcon /></span>
            <span className="nutrition-art-circle nutrition-art-circle-apple"><AppleIcon /></span>
            <span className="nutrition-art-leaf"><LeafIcon /></span>
            <span className="nutrition-scene-chip chip-bowl"><BowlIcon /><b>وجبة</b></span>
            <span className="nutrition-scene-chip chip-apple"><AppleIcon /><b>صحي</b></span>
            <span className="nutrition-scene-chip chip-leaf"><LeafIcon /><b>متوازن</b></span>
          </div>

          <div className="nutrition-intro-copy">
            <small>مختبر التغذية الذكي</small>
            <h1>غذاؤك أذكى، صحتك أوضح</h1>
            <p>ابدأ تقييمك الغذائي بصورة واضحة واحصل على قراءة أولية مرتبة تساعدك على فهم احتياجاتك بخطوات بسيطة.</p>
          </div>

        </section>

        {view === "home" && (<>
        <section className="nutrition-choices">
          <article className="nutrition-card">
            <div className="nutrition-card-head">
              <span className="nutrition-card-icon blue"><SparklesIcon /></span>
              <span className="nutrition-label blue-label">متاح 24/7</span>
            </div>

            <h2>دكتور الذكاء الاصطناعي</h2>
            <p>مساعد غذائي ذكي يحلل بياناتك الأولية ويقترح خطوات يومية قابلة للتطبيق.</p>

            <ul>
              {aiBenefits.map((item) => (
                <li key={item}>
                  <span><CheckIcon /></span>
                  {item}
                </li>
              ))}
            </ul>

            <button type="button" className="nutrition-main-btn" onClick={() => setActiveMode("ai")}>
              <ChatIcon />
              ابدأ الاستشارة الذكية
            </button>
          </article>

          <article className="nutrition-card">
            <div className="nutrition-card-head">
              <span className="nutrition-card-icon green"><DoctorIcon /></span>
              <span className="nutrition-label green-label">متابعة شخصية</span>
            </div>

            <h2>أخصائي تغذية بشري</h2>
            <p>تواصل مع مختص مؤهل للحصول على خطة علاجية ومتابعة مستمرة حسب حالتك.</p>

            <ul>
              {humanBenefits.map((item) => (
                <li key={item}>
                  <span className="green-check"><CheckIcon /></span>
                  {item}
                </li>
              ))}
            </ul>

            <button type="button" className="nutrition-main-btn green" onClick={() => setActiveMode("human")}>
              <CalendarIcon />
              احجز مع أخصائي
            </button>
          </article>
        </section>

        <section className="nutrition-steps">
          <div>
            <small>كيف تبدأ؟</small>
            <h2>ثلاث خطوات لصحة غذائية أوضح</h2>
            <p>أدخل بياناتك الأساسية، اختر المسار، ثم تابع خطتك وتقدمك من مكان واحد.</p>
          </div>

          <div className="steps-grid">
            {[
              ["01", "أدخل بياناتك"],
              ["02", "اختر نوع المتابعة"],
              ["03", "ابدأ خطتك"],
            ].map(([number, label]) => (
              <div key={number}>
                <strong>{number}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="nutrition-warning">
          <ShieldIcon />
          <p>
            الإرشادات الذكية للمساعدة العامة ولا تغني عن تقييم الطبيب أو أخصائي التغذية،
            خصوصًا عند وجود أمراض مزمنة أو أعراض مقلقة.
          </p>
        </div>
        </>)}

        {view === "ops" && (
          <section className="nutrition-records-page" aria-label="عمليات التغذية">
            <header className="nutrition-records-head">
              <div><small>سجل الاستخدام</small><h2>العمليات</h2><p>كل الاستشارات والحجوزات التي نفذتها من صفحة التغذية تظهر هنا.</p></div>
              <span>{records.length} عملية</span>
            </header>
            {records.length ? (
              <div className="nutrition-record-list">
                {records.map((item) => (
                  <article key={item.id}>
                    <span className={item.type === "ai" ? "record-icon blue" : "record-icon green"}>{item.type === "ai" ? <SparklesIcon /> : <DoctorIcon />}</span>
                    <div><small>{item.id}</small><h3>{item.title}</h3><p>{item.createdAt}</p></div>
                    <span className="record-status">مكتملة</span>
                  </article>
                ))}
              </div>
            ) : (
              <div className="nutrition-empty"><HistoryIcon /><h3>لا توجد عمليات بعد</h3><p>ابدأ استشارة ذكية أو احجز مع أخصائي، وستظهر العملية هنا تلقائيًا.</p><button type="button" onClick={() => goTo("home")}>ابدأ الآن</button></div>
            )}
          </section>
        )}

        {view === "reports" && (
          <section className="nutrition-records-page" aria-label="تقارير التغذية">
            <header className="nutrition-records-head">
              <div><small>ملخصات محفوظة</small><h2>تقارير التغذية</h2><p>ملخص منظم للاستشارات والحجوزات المحفوظة على هذا الجهاز.</p></div>
              <span>{records.length} تقرير</span>
            </header>
            {records.length ? (
              <div className="nutrition-report-grid">
                {records.map((item) => (
                  <article key={item.id}>
                    <header><span className={item.type === "ai" ? "blue" : "green"}>{item.type === "ai" ? <ReportIcon /> : <CalendarIcon />}</span><em>{item.type === "ai" ? "تحليل ذكي" : "متابعة بشرية"}</em></header>
                    <small>{item.id}</small><h3>{item.title}</h3><p>{item.detail}</p><footer>{item.createdAt}</footer>
                  </article>
                ))}
              </div>
            ) : (
              <div className="nutrition-empty"><ReportIcon /><h3>لا توجد تقارير محفوظة</h3><p>بعد استخدام إحدى خدمات التغذية سيظهر ملخصها هنا تلقائيًا.</p><button type="button" onClick={() => goTo("home")}>اذهب للخدمات</button></div>
            )}
          </section>
        )}
      </div>

      {activeMode && (
        <div className="nutrition-modal" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeModal();
        }}>
          <section className="nutrition-dialog">
            <button type="button" className="nutrition-close" onClick={closeModal}>
              <CloseIcon />
            </button>

            <div className="nutrition-dialog-head">
              <span className={activeMode === "ai" ? "blue" : "green"}>
                {activeMode === "ai" ? <SparklesIcon /> : <DoctorIcon />}
              </span>
              <div>
                <small>{activeMode === "ai" ? "استشارة فورية" : "حجز موعد"}</small>
                <h2>{activeMode === "ai" ? "دكتور التغذية الذكي" : "أخصائي التغذية البشري"}</h2>
              </div>
            </div>

            {activeMode === "ai" ? (
              <div className="nutrition-form">
                <label>هدفك الغذائي</label>
                <select value={goal} onChange={(event) => setGoal(event.target.value)}>
                  <option>تحسين نمط الغذاء</option>
                  <option>إنقاص الوزن</option>
                  <option>زيادة الوزن بشكل صحي</option>
                  <option>تنظيم الوجبات</option>
                  <option>متابعة حالة مزمنة</option>
                </select>

                <label>اكتب سؤالك</label>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="مثال: أريد خطة غذائية يومية تناسب وقت عملي..."
                />

                <button type="button" className="nutrition-main-btn" onClick={confirmAi}>
                  <ChatIcon />
                  إرسال إلى الدكتور الذكي
                </button>
              </div>
            ) : (
              <div className="nutrition-times">
                {[
                  ["الأحد", "05:00 مساءً"],
                  ["الاثنين", "07:30 مساءً"],
                  ["الأربعاء", "04:00 مساءً"],
                  ["الخميس", "08:00 مساءً"],
                ].map(([day, time]) => (
                  <button type="button" key={`${day}-${time}`} onClick={confirmHuman}>
                    <strong>{day}</strong>
                    <span>{time}</span>
                  </button>
                ))}

                <button type="button" className="nutrition-main-btn green" onClick={confirmHuman}>
                  <CalendarIcon />
                  تأكيد طلب الحجز
                </button>
              </div>
            )}

            {confirmed && (
              <div className="nutrition-success">
                <CheckIcon />
                <p>{activeMode === "ai" ? "تم إرسال سؤالك بنجاح." : "تم تسجيل طلب الحجز بنجاح."}</p>
              </div>
            )}
          </section>
        </div>
      )}


      <style>{`
        .nutrition-page,.nutrition-page *{box-sizing:border-box}
        .nutrition-page{min-height:100vh;overflow-x:hidden;background:#f4f9fc;color:#073b72;font-family:Tahoma,Arial,sans-serif}
        .nutrition-page button,.nutrition-page select,.nutrition-page textarea{font:inherit}
        .nutrition-page button{cursor:pointer}
        .nutrition-container{width:min(calc(100% - 28px),1120px);margin:0 auto;padding:24px 0 52px}

        .nutrition-back{min-height:40px;display:inline-flex;align-items:center;gap:7px;padding:0 13px;border:1px solid rgba(8,118,217,.12);border-radius:13px;background:#fff;color:#0876d9;font-size:11px;font-weight:900;box-shadow:0 8px 20px rgba(4,77,132,.06);transition:.2s ease}
        .nutrition-back:hover{transform:translateY(-1px);box-shadow:0 11px 24px rgba(4,77,132,.09)}
        .nutrition-back svg{width:16px;height:16px}

        .nutrition-page.large-text{font-size:18px}
        .nutrition-banner-menu{position:absolute;top:10px;left:10px;z-index:100;direction:ltr}
        .nutrition-banner-menu-button{width:36px;height:36px;display:grid;place-items:center;padding:0;border:1px solid rgba(255,255,255,.58);border-radius:50%;color:#1479d5;background:linear-gradient(145deg,rgba(255,255,255,.62),rgba(164,226,239,.30));box-shadow:inset 0 1px 1px rgba(255,255,255,.85),0 7px 18px rgba(7,152,165,.13);backdrop-filter:blur(10px) saturate(145%);-webkit-backdrop-filter:blur(10px) saturate(145%)}
        .nutrition-banner-menu-button svg{width:18px;height:18px}
        .nutrition-banner-menu-list{position:absolute;top:42px;left:0;z-index:101;display:grid;gap:5px;padding:6px;border:1px solid rgba(20,121,213,.12);border-radius:13px;background:rgba(255,255,255,.97);box-shadow:0 15px 34px rgba(24,80,112,.16)}
        .nutrition-banner-menu-list button{width:38px;height:38px;display:grid;place-items:center;padding:0;border:0;border-radius:10px;color:#668395;background:transparent}
        .nutrition-banner-menu-list button:hover,.nutrition-banner-menu-list button:focus-visible{color:#fff;background:linear-gradient(145deg,#1479d5,#0798a5)}
        .nutrition-banner-menu-list svg{width:18px;height:18px}
        .nutrition-intro{position:relative;margin-top:14px;min-height:150px;display:grid;grid-template-columns:220px minmax(0,1fr);grid-template-areas:"art copy";align-items:center;gap:26px;padding:24px 34px;border:1px solid rgba(8,118,217,.10);border-radius:25px;background:radial-gradient(circle at 12% 18%,rgba(10,169,186,.10),transparent 30%),linear-gradient(135deg,#f1fbf7 0%,#f7fcff 42%,#fff 100%);box-shadow:0 16px 45px rgba(4,70,127,.08);overflow:visible;direction:ltr}
        .nutrition-intro:after{content:"";position:absolute;inset:auto -70px -95px auto;width:230px;height:230px;border-radius:50%;border:35px solid rgba(56,201,111,.045);pointer-events:none}
        .nutrition-intro-copy{grid-area:copy;min-width:0;text-align:right;position:relative;z-index:2;direction:rtl}
        .nutrition-intro-copy small{display:block;color:#08a2a7;font-size:10px;font-weight:900;margin-bottom:7px}
        .nutrition-intro-copy h1{margin:0;color:#064c91;font-size:clamp(24px,3vw,36px);line-height:1.35;font-weight:900}
        .nutrition-intro-copy p{max-width:690px;margin:8px 0 0;color:#66899d;font-size:11px;font-weight:600;line-height:1.9}
                .nutrition-intro-art{grid-area:art;position:relative;width:200px;height:104px;justify-self:start;direction:ltr}
        .nutrition-art-circle{position:absolute;display:grid;place-items:center;border-radius:50%;border:1px solid rgba(8,118,217,.12);background:rgba(255,255,255,.78);color:#0876d9;box-shadow:0 10px 24px rgba(4,91,150,.07)}
        .nutrition-art-circle svg{width:34px;height:34px}
        .nutrition-art-circle-main{left:72px;top:19px;width:72px;height:72px;color:#0aa9ba;background:linear-gradient(145deg,#f9fdff,#eefaff)}
        .nutrition-art-circle-apple{left:12px;top:31px;width:54px;height:54px;color:#38b96d;background:#f8fffb}
        .nutrition-art-circle-apple svg{width:27px;height:27px}
        .nutrition-art-leaf{position:absolute;right:8px;top:8px;width:52px;height:52px;display:grid;place-items:center;color:#31b86a;transform:rotate(-10deg)}
        .nutrition-art-leaf svg{width:39px;height:39px}
        .nutrition-scene-chip{position:absolute;z-index:4;min-height:31px;display:inline-flex;align-items:center;gap:5px;padding:4px 7px;border:1px solid rgba(7,91,145,.10);border-radius:10px;background:rgba(255,255,255,.97);color:#0876d9;box-shadow:0 8px 18px rgba(4,70,127,.10);animation:nutritionFloat 4s ease-in-out infinite;direction:rtl}
        .nutrition-scene-chip svg{width:15px;height:15px}
        .nutrition-scene-chip b{font-size:7px;font-weight:900}
        .nutrition-scene-chip.chip-bowl{top:-2px;left:62px}
        .nutrition-scene-chip.chip-apple{bottom:-4px;left:2px;color:#0aa9ba;animation-delay:.8s}
        .nutrition-scene-chip.chip-leaf{top:24px;right:-2px;color:#31b86a;animation-delay:1.5s}
        @keyframes nutritionFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}

        .nutrition-hero{margin-top:14px;display:grid;grid-template-columns:minmax(0,1fr) 240px;align-items:center;gap:26px;padding:30px 34px;border:1px solid rgba(7,92,145,.08);border-radius:26px;background:#fff;box-shadow:0 20px 55px rgba(4,70,127,.09)}
        .nutrition-copy{min-width:0}
        .nutrition-kicker{display:inline-flex;align-items:center;gap:7px;padding:7px 11px;border-radius:999px;background:#effaf4;color:#169b58;font-size:10px;font-weight:900}
        .nutrition-kicker i{width:7px;height:7px;border-radius:50%;background:#38c96f;box-shadow:0 0 0 4px rgba(56,201,111,.12)}
        .nutrition-copy h1{margin:14px 0 0;font-size:clamp(32px,4vw,50px);line-height:1.25;color:#064c91}
        .nutrition-copy h1 span{display:block;margin-top:2px;background:linear-gradient(270deg,#0876d9,#0aa9ba,#38c96f);color:transparent;background-clip:text;-webkit-background-clip:text}
        .nutrition-copy>p{max-width:690px;margin:15px 0 0;color:#5c839a;font-size:13px;font-weight:600;line-height:1.9}
        .nutrition-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:20px}
        .nutrition-actions button{min-height:44px;display:inline-flex;align-items:center;gap:8px;padding:0 15px;border-radius:14px;font-size:10px;font-weight:900;transition:.2s ease}
        .nutrition-actions button:hover{transform:translateY(-2px)}
        .nutrition-actions svg{width:19px;height:19px}
        .nutrition-actions .primary{border:0;background:linear-gradient(135deg,#0876d9,#0aa9ba);color:#fff;box-shadow:0 11px 23px rgba(8,118,217,.18)}
        .nutrition-actions .secondary{border:1px solid rgba(8,118,217,.13);background:#fff;color:#52788f}

        .nutrition-visual{min-height:210px;display:grid;place-items:center;border-radius:22px;background:linear-gradient(145deg,#f1f9ff,#f2fff8)}
        .nutrition-logo-static{width:116px;height:116px;display:grid;place-items:center;border-radius:30px;background:linear-gradient(145deg,#0876d9,#0aa9ba,#38c96f);color:#fff;box-shadow:0 20px 46px rgba(4,86,143,.18)}
        .nutrition-logo-static svg{width:60px;height:60px}

        .nutrition-choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:16px}
        .nutrition-card{display:flex;flex-direction:column;min-width:0;padding:20px;border:1px solid rgba(10,134,199,.09);border-radius:22px;background:#fff;box-shadow:0 15px 40px rgba(3,77,132,.07)}
        .nutrition-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
        .nutrition-card-icon{width:52px;height:52px;display:grid;place-items:center;border-radius:16px;color:#fff;flex:0 0 auto}
        .nutrition-card-icon.blue{background:linear-gradient(145deg,#0876d9,#0aa9ba)}
        .nutrition-card-icon.green{background:linear-gradient(145deg,#38c96f,#0aa9ba)}
        .nutrition-card-icon svg{width:27px;height:27px}
        .nutrition-label{padding:5px 9px;border-radius:999px;font-size:8.5px;font-weight:900;white-space:nowrap}
        .blue-label{background:#eef8ff;color:#0876d9}
        .green-label{background:#effdf4;color:#18a95d}
        .nutrition-card h2{margin:13px 0 0;color:#075dab;font-size:20px}
        .nutrition-card>p{margin:8px 0 0;color:#658ba3;font-size:10.5px;line-height:1.8}
        .nutrition-card ul{list-style:none;padding:0;margin:14px 0 0;display:grid;gap:8px}
        .nutrition-card li{display:flex;align-items:center;gap:8px;color:#416c85;font-size:10px;font-weight:800}
        .nutrition-card li>span{width:23px;height:23px;display:grid;place-items:center;border-radius:50%;background:#eaf8ff;color:#0876d9;flex:0 0 auto}
        .nutrition-card li>span.green-check{background:#effdf4;color:#18a95d}
        .nutrition-card li svg{width:12px;height:12px}
        .nutrition-main-btn{width:100%;min-height:44px;margin-top:auto;padding:0 12px;display:flex;align-items:center;justify-content:center;gap:7px;border:0;border-radius:13px;background:linear-gradient(135deg,#0876d9,#0aa9ba);color:#fff;font-size:10px;font-weight:900;box-shadow:0 9px 20px rgba(8,118,217,.14);transition:.2s ease}
        .nutrition-card .nutrition-main-btn{margin-top:17px}
        .nutrition-main-btn:hover{transform:translateY(-1px)}
        .nutrition-main-btn.green{background:linear-gradient(135deg,#38c96f,#0aa9ba)}
        .nutrition-main-btn svg{width:18px;height:18px}

        .nutrition-steps{margin-top:14px;display:grid;grid-template-columns:.8fr 1.2fr;align-items:center;gap:20px;padding:20px;border:1px solid rgba(10,134,199,.09);border-radius:22px;background:#fff;box-shadow:0 15px 40px rgba(3,77,132,.07)}
        .nutrition-steps small{color:#10a4a9;font-size:9px;font-weight:900}
        .nutrition-steps h2{margin:5px 0 0;color:#064c91;font-size:21px}
        .nutrition-steps p{margin:8px 0 0;color:#658ba3;font-size:10.5px;line-height:1.8}
        .steps-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
        .steps-grid div{padding:13px;border:1px solid rgba(8,118,217,.09);border-radius:14px;background:#f8fcff}
        .steps-grid strong{display:block;color:#0aa9ba;font-size:19px}
        .steps-grid span{display:block;margin-top:7px;color:#416c85;font-size:8.5px;font-weight:900}

        .nutrition-warning{margin-top:14px;display:flex;align-items:flex-start;gap:9px;padding:12px 13px;border:1px solid rgba(241,199,91,.28);border-radius:14px;background:#fffaf0;color:#7b6532}
        .nutrition-warning svg{width:21px;height:21px;flex:0 0 auto}
        .nutrition-warning p{margin:0;font-size:9px;line-height:1.8;font-weight:700}

        .nutrition-modal{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:15px;background:rgba(3,47,87,.46);backdrop-filter:blur(7px)}
        .nutrition-dialog{position:relative;width:min(100%,540px);max-height:calc(100vh - 30px);overflow-y:auto;padding:22px;border-radius:23px;background:#fff;box-shadow:0 35px 110px rgba(1,35,67,.28)}
        .nutrition-close{position:absolute;left:12px;top:12px;width:35px;height:35px;display:grid;place-items:center;border:1px solid rgba(8,118,217,.1);border-radius:11px;background:#fff;color:#6b91a8}
        .nutrition-close svg{width:17px;height:17px}
        .nutrition-dialog-head{display:flex;align-items:center;gap:11px;padding-left:45px}
        .nutrition-dialog-head>span{width:54px;height:54px;display:grid;place-items:center;border-radius:16px;color:#fff;flex:0 0 auto}
        .nutrition-dialog-head>span.blue{background:linear-gradient(145deg,#0876d9,#0aa9ba)}
        .nutrition-dialog-head>span.green{background:linear-gradient(145deg,#38c96f,#0aa9ba)}
        .nutrition-dialog-head svg{width:28px;height:28px}
        .nutrition-dialog-head small{color:#0aa3a7;font-size:9px;font-weight:900}
        .nutrition-dialog-head h2{margin:3px 0 0;color:#064c91;font-size:20px}
        .nutrition-form{margin-top:17px}
        .nutrition-form label{display:block;margin-top:11px;color:#416c85;font-size:9.5px;font-weight:900}
        .nutrition-form select,.nutrition-form textarea{width:100%;margin-top:6px;border:1px solid rgba(8,118,217,.14);border-radius:13px;background:#f7fcff;padding:11px;color:#315f7a;outline:0}
        .nutrition-form select:focus,.nutrition-form textarea:focus{border-color:#0aa9ba;box-shadow:0 0 0 3px rgba(10,169,186,.09)}
        .nutrition-form select{min-height:43px}
        .nutrition-form textarea{min-height:112px;resize:vertical}
        .nutrition-times{margin-top:17px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
        .nutrition-times>button:not(.nutrition-main-btn){padding:12px;border:1px solid rgba(8,118,217,.11);border-radius:13px;background:#f7fcff;text-align:right}
        .nutrition-times strong{display:block;color:#075dab}
        .nutrition-times span{display:block;margin-top:4px;color:#5f8399;font-size:8.5px}
        .nutrition-times .nutrition-main-btn{grid-column:1/-1}
        .nutrition-success{margin-top:12px;display:flex;align-items:center;gap:8px;padding:10px;border:1px solid rgba(56,201,111,.22);border-radius:12px;background:#effdf4;color:#1d8b56}
        .nutrition-success svg{width:18px;height:18px}
        .nutrition-success p{margin:0;font-size:9px;font-weight:900}


        .nutrition-banner-menu-list button.active{color:#fff;background:linear-gradient(145deg,#1479d5,#0798a5)}
        .nutrition-records-page{margin-top:14px;padding:22px;border:1px solid rgba(8,118,217,.09);border-radius:22px;background:#fff;box-shadow:0 15px 40px rgba(3,77,132,.07)}
        .nutrition-records-head{display:flex;align-items:flex-end;justify-content:space-between;gap:14px}
        .nutrition-records-head small{color:#0aa3a7;font-size:9px;font-weight:900}
        .nutrition-records-head h2{margin:3px 0 0;color:#064c91;font-size:24px}
        .nutrition-records-head p{margin:5px 0 0;color:#66899d;font-size:10px}
        .nutrition-records-head>span{padding:6px 10px;border-radius:999px;background:#edf7ff;color:#0876d9;font-size:9px;font-weight:900;white-space:nowrap}
        .nutrition-record-list{display:grid;gap:9px;margin-top:17px}
        .nutrition-record-list article{display:grid;grid-template-columns:46px minmax(0,1fr) auto;align-items:center;gap:10px;padding:11px;border:1px solid rgba(8,118,217,.09);border-radius:14px;background:#f9fcfe}
        .record-icon{width:44px;height:44px;display:grid;place-items:center;border-radius:13px;color:#fff}.record-icon.blue{background:linear-gradient(145deg,#0876d9,#0aa9ba)}.record-icon.green{background:linear-gradient(145deg,#38c96f,#0aa9ba)}.record-icon svg{width:22px;height:22px}
        .nutrition-record-list article small{color:#7895a6;font-size:7px}.nutrition-record-list article h3{margin:2px 0 0;color:#064c91;font-size:12px}.nutrition-record-list article p{margin:2px 0 0;color:#66899d;font-size:8px}.record-status{padding:5px 8px;border-radius:999px;background:#effdf4;color:#1d8b56;font-size:8px;font-weight:900}
        .nutrition-report-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:17px}.nutrition-report-grid article{padding:14px;border:1px solid rgba(8,118,217,.09);border-radius:16px;background:linear-gradient(160deg,#fff,#f7fcff)}.nutrition-report-grid article header{display:flex;align-items:center;justify-content:space-between;gap:8px}.nutrition-report-grid article header>span{width:40px;height:40px;display:grid;place-items:center;border-radius:12px;color:#fff}.nutrition-report-grid article header>span.blue{background:linear-gradient(145deg,#0876d9,#0aa9ba)}.nutrition-report-grid article header>span.green{background:linear-gradient(145deg,#38c96f,#0aa9ba)}.nutrition-report-grid article header svg{width:20px;height:20px}.nutrition-report-grid article em{padding:4px 7px;border-radius:999px;background:#eefaf7;color:#18845a;font-size:7px;font-style:normal;font-weight:900}.nutrition-report-grid article>small{display:block;margin-top:11px;color:#7895a6;font-size:7px}.nutrition-report-grid article h3{margin:3px 0 0;color:#064c91;font-size:12px}.nutrition-report-grid article p{min-height:44px;margin:6px 0 0;color:#66899d;font-size:8px;line-height:1.65}.nutrition-report-grid article footer{margin-top:10px;padding-top:8px;border-top:1px solid rgba(8,118,217,.08);color:#7895a6;font-size:7px}
        .nutrition-empty{min-height:220px;display:grid;place-items:center;align-content:center;gap:6px;margin-top:17px;padding:20px;border:1px dashed rgba(8,118,217,.18);border-radius:16px;background:#f8fcff;text-align:center}.nutrition-empty>svg{width:34px;height:34px;color:#0876d9}.nutrition-empty h3{margin:4px 0 0;color:#064c91}.nutrition-empty p{max-width:420px;margin:0;color:#66899d;font-size:9px}.nutrition-empty button{margin-top:7px;min-height:38px;padding:0 13px;border:0;border-radius:11px;background:linear-gradient(145deg,#0876d9,#0aa9ba);color:#fff;font-size:9px;font-weight:900}

        @media(max-width:820px){
          .nutrition-intro{grid-template-columns:180px minmax(0,1fr);padding:22px 26px;gap:20px}
          .nutrition-intro-art{width:170px;transform:scale(.9);transform-origin:left center}
          .nutrition-hero{grid-template-columns:minmax(0,1fr) 180px;padding:25px 26px}
          .nutrition-visual{min-height:180px}
          .nutrition-logo-static{width:98px;height:98px;border-radius:26px}
          .nutrition-logo-static svg{width:51px;height:51px}
          .nutrition-steps{grid-template-columns:1fr}
        }

        @media(max-width:620px){
          .nutrition-page{background:#f7fbfd}
          .nutrition-banner-menu{top:8px;left:8px}
          .nutrition-banner-menu-button{width:34px;height:34px}
          .nutrition-banner-menu-button svg{width:17px;height:17px}
          .nutrition-banner-menu-list{top:39px}
          .nutrition-container{width:100%;padding:10px 0 34px}
          .nutrition-back{margin-right:10px}
          .nutrition-intro{margin:10px 10px 0;min-height:128px;grid-template-columns:112px minmax(0,1fr);grid-template-areas:"art copy";gap:10px;padding:17px 15px 17px 18px;border-radius:19px;direction:ltr}
          .nutrition-intro-copy small{font-size:8px;margin-bottom:4px}
          .nutrition-intro-copy h1{font-size:20px;line-height:1.4}
          .nutrition-intro-copy p{margin-top:5px;font-size:8.8px;line-height:1.75}
          .nutrition-intro-art{width:112px;height:86px;transform:none}
          .nutrition-art-circle-main{left:42px;top:15px;width:57px;height:57px}
          .nutrition-art-circle-main svg{width:29px;height:29px}
          .nutrition-art-circle-apple{left:0;top:27px;width:42px;height:42px}
          .nutrition-art-circle-apple svg{width:22px;height:22px}
          .nutrition-art-leaf{right:-7px;top:1px;width:37px;height:37px}
          .nutrition-art-leaf svg{width:30px;height:30px}
          .nutrition-scene-chip{min-height:23px;gap:3px;padding:3px 5px;border-radius:8px}
          .nutrition-scene-chip svg{width:11px;height:11px}
          .nutrition-scene-chip b{font-size:5.7px}
          .nutrition-scene-chip.chip-bowl{top:-3px;left:38px}
          .nutrition-scene-chip.chip-apple{bottom:-3px;left:-2px}
          .nutrition-scene-chip.chip-leaf{top:24px;right:-5px}
          .nutrition-hero{margin-top:10px;grid-template-columns:1fr;gap:15px;padding:20px 15px;border-right:0;border-left:0;border-radius:0 0 22px 22px;box-shadow:0 13px 35px rgba(4,70,127,.08)}
          .nutrition-copy h1{font-size:28px}
          .nutrition-copy>p{font-size:10px;line-height:1.8}
          .nutrition-actions{margin-top:16px}
          .nutrition-actions button{flex:1 1 150px;justify-content:center}
          .nutrition-visual{min-height:120px}
          .nutrition-logo-static{width:78px;height:78px;border-radius:22px;box-shadow:0 13px 30px rgba(4,86,143,.16)}
          .nutrition-logo-static svg{width:40px;height:40px}
          .nutrition-choices{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px;padding:0 10px;align-items:stretch}
          .nutrition-card{min-width:0;padding:12px 9px;border-radius:17px}
          .nutrition-card-head{gap:5px;align-items:center}
          .nutrition-card-icon{width:39px;height:39px;flex-basis:39px;border-radius:12px}
          .nutrition-card-icon svg{width:21px;height:21px}
          .nutrition-label{max-width:78px;padding:4px 6px;font-size:6.5px;line-height:1.3;text-align:center;white-space:normal}
          .nutrition-card h2{font-size:13px;line-height:1.5}
          .nutrition-card>p{font-size:8.2px;line-height:1.65}
          .nutrition-card ul{gap:6px;margin-top:10px}
          .nutrition-card li{align-items:flex-start;gap:5px;font-size:7.6px;line-height:1.55}
          .nutrition-card li>span{width:18px;height:18px;flex-basis:18px}
          .nutrition-card li svg{width:10px;height:10px}
          .nutrition-card .nutrition-main-btn{min-height:39px;margin-top:12px;padding:5px 6px;font-size:8px;line-height:1.35}
          .nutrition-main-btn svg{width:15px;height:15px}
          .nutrition-steps,.nutrition-warning{margin-left:10px;margin-right:10px}
          .nutrition-steps{padding:16px;border-radius:18px}
          .nutrition-steps h2{font-size:18px}
          .steps-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
          .steps-grid div{padding:10px 7px;text-align:center}
          .steps-grid strong{font-size:17px}
          .steps-grid span{font-size:7.5px}
          .nutrition-dialog{padding:16px;border-radius:18px}
          .nutrition-dialog-head{padding-left:38px}
          .nutrition-dialog-head>span{width:48px;height:48px;border-radius:14px}
          .nutrition-dialog-head h2{font-size:17px}
          .nutrition-times{grid-template-columns:1fr}
        }

        @media(max-width:360px){
          .nutrition-intro{grid-template-columns:94px minmax(0,1fr);padding:14px 11px 14px 14px}
          .nutrition-intro-art{width:94px;transform:scale(.88);transform-origin:left center}
          .nutrition-intro-copy h1{font-size:17px}
          .nutrition-intro-copy p{font-size:8px}

          .nutrition-choices{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;padding:0 8px}
          .nutrition-card{padding:10px 7px;border-radius:15px}
          .nutrition-card-icon{width:35px;height:35px;flex-basis:35px}
          .nutrition-card-icon svg{width:19px;height:19px}
          .nutrition-label{font-size:5.8px;padding:3px 4px}
          .nutrition-card h2{font-size:11.5px}
          .nutrition-card>p{font-size:7.4px}
          .nutrition-card li{font-size:7px}
          .nutrition-card .nutrition-main-btn{font-size:7.3px;min-height:37px}
          .nutrition-actions{display:grid;grid-template-columns:1fr}
          .steps-grid{grid-template-columns:1fr}
          .steps-grid div{text-align:right}
        }


        @media(max-width:620px){
          .nutrition-records-page{margin:12px 10px 0;padding:14px;border-radius:18px}
          .nutrition-records-head{align-items:flex-start;flex-direction:column}.nutrition-records-head h2{font-size:19px}.nutrition-records-head p{font-size:8.5px}
          .nutrition-record-list article{grid-template-columns:40px minmax(0,1fr) auto;padding:9px;gap:7px}.record-icon{width:38px;height:38px}.record-icon svg{width:19px;height:19px}.nutrition-record-list article h3{font-size:10px}.nutrition-record-list article p{font-size:7px}.record-status{font-size:6.5px;padding:4px 6px}
          .nutrition-report-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.nutrition-report-grid article{padding:10px}.nutrition-report-grid article h3{font-size:10px}.nutrition-report-grid article p{font-size:7px}.nutrition-report-grid article header>span{width:34px;height:34px}.nutrition-report-grid article header svg{width:17px;height:17px}.nutrition-report-grid article em{font-size:6px}
        }
        @media(max-width:360px){.nutrition-report-grid{grid-template-columns:1fr}}

        @media(prefers-reduced-motion:reduce){.nutrition-page *{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
      `}</style>
      </main>
    </>
  );
}
