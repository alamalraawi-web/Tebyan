import TibyanHeader from "../components/TibyanHeader";

import { useState } from "react";
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

  function goBack() {
    if (window.history.length > 1) navigate(-1);
    else navigate("/home");
  }

  function closeModal() {
    setActiveMode(null);
    setMessage("");
    setConfirmed(false);
  }

  return (
    <>
      <TibyanHeader />
      <main dir="rtl" className="nutrition-page">
      <div className="nutrition-container">
        <button type="button" onClick={goBack} className="nutrition-back">
          <ArrowIcon />
          العودة
        </button>

        <section className="nutrition-hero">
          <div className="nutrition-copy">
            <span className="nutrition-kicker">
              <i />
              رعاية غذائية ذكية ومتكاملة
            </span>

            <h1>
              التغذية العلاجية
              <span>بين الذكاء والخبرة</span>
            </h1>

            <p>
              اختر المسار الأنسب لك: دكتور ذكاء اصطناعي يرافقك يوميًا،
              أو أخصائي تغذية بشري يقدم لك متابعة شخصية دقيقة.
            </p>

            <div className="nutrition-actions">
              <button type="button" className="primary" onClick={() => setActiveMode("ai")}>
                <SparklesIcon />
                دكتور الذكاء الاصطناعي
              </button>

              <button type="button" className="secondary" onClick={() => setActiveMode("human")}>
                <DoctorIcon />
                أخصائي التغذية
              </button>
            </div>
          </div>

          <div className="nutrition-visual" aria-hidden="true">
            <div className="nutrition-logo-static">
              <BowlIcon />
            </div>
          </div>
        </section>

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

                <button type="button" className="nutrition-main-btn" onClick={() => setConfirmed(true)}>
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
                  <button type="button" key={`${day}-${time}`} onClick={() => setConfirmed(true)}>
                    <strong>{day}</strong>
                    <span>{time}</span>
                  </button>
                ))}

                <button type="button" className="nutrition-main-btn green" onClick={() => setConfirmed(true)}>
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

        @media(max-width:820px){
          .nutrition-hero{grid-template-columns:minmax(0,1fr) 180px;padding:25px 26px}
          .nutrition-visual{min-height:180px}
          .nutrition-logo-static{width:98px;height:98px;border-radius:26px}
          .nutrition-logo-static svg{width:51px;height:51px}
          .nutrition-steps{grid-template-columns:1fr}
        }

        @media(max-width:620px){
          .nutrition-page{background:#f7fbfd}
          .nutrition-container{width:100%;padding:10px 0 34px}
          .nutrition-back{margin-right:10px}
          .nutrition-hero{margin-top:10px;grid-template-columns:1fr;gap:15px;padding:20px 15px;border-right:0;border-left:0;border-radius:0 0 22px 22px;box-shadow:0 13px 35px rgba(4,70,127,.08)}
          .nutrition-copy h1{font-size:28px}
          .nutrition-copy>p{font-size:10px;line-height:1.8}
          .nutrition-actions{margin-top:16px}
          .nutrition-actions button{flex:1 1 150px;justify-content:center}
          .nutrition-visual{min-height:120px}
          .nutrition-logo-static{width:78px;height:78px;border-radius:22px;box-shadow:0 13px 30px rgba(4,86,143,.16)}
          .nutrition-logo-static svg{width:40px;height:40px}
          .nutrition-choices{grid-template-columns:1fr;gap:10px;margin-top:12px;padding:0 10px}
          .nutrition-card{padding:16px;border-radius:18px}
          .nutrition-card h2{font-size:17px}
          .nutrition-card>p,.nutrition-card li{font-size:9.5px}
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
          .nutrition-actions{display:grid;grid-template-columns:1fr}
          .steps-grid{grid-template-columns:1fr}
          .steps-grid div{text-align:right}
        }

        @media(prefers-reduced-motion:reduce){.nutrition-page *{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
      `}</style>
      </main>
    </>
  );
}
