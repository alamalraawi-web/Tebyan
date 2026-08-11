import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TibyanHeader from "../components/TibyanHeader";


function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

function LabIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M9 3h6M10 3v6l-5.3 8.8A2 2 0 0 0 6.4 21h11.2a2 2 0 0 0 1.7-3.2L14 9V3" />
      <path d="M7.5 16h9M10 13h4" />
    </svg>
  );
}

function NutritionIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M4 11h16a8 8 0 0 1-16 0Z" />
      <path d="M8 7c1.5-2 3.5-2 5-4M14 8c1-1.8 2.8-2.2 4-3.5M7 19h10" />
    </svg>
  );
}

function PharmacyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="m8.5 4.5 11 11a4.24 4.24 0 0 1-6 6l-11-11a4.24 4.24 0 1 1 6-6Z" />
      <path d="m7 15 8-8" />
    </svg>
  );
}

function ConsultationIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 13h3v3H8zM14 13h2M14 16h2" />
    </svg>
  );
}

function HeartPulseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />
      <path d="M3 12h4l1.4-3 3.2 7 2.1-4H21" />
    </svg>
  );
}


function StethoscopeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M6 3v5a6 6 0 0 0 12 0V3" />
      <path d="M6 3H4M18 3h2M12 14v2a5 5 0 0 0 10 0v-1" />
      <circle cx="21" cy="12" r="2" />
    </svg>
  );
}

function ClipboardIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M9 5H6a2 2 0 0 0-2 2v13h16V7a2 2 0 0 0-2-2h-3" />
      <path d="M9 3h6v4H9zM8 12l1.5 1.5L12 11M14 12h3M8 17l1.5 1.5L12 16M14 17h3" />
    </svg>
  );
}


function ReportIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M5 3h14a2 2 0 0 1 2 2v16H3V5a2 2 0 0 1 2-2Z" />
      <path d="M7 16v-3M12 16V8M17 16v-5M7 19h10" />
    </svg>
  );
}


/**
 * شعار تبيان مرسوم بالكامل داخل الكود بصيغة SVG.
 * تمت إعادة رسمه وفق الصورة المرجعية الجديدة، من دون استخدام أي ملف صورة.
 */
function TibyanLogo({ className = "" }) {
  return (
    <svg
      viewBox="70 180 520 520"
      role="img"
      aria-labelledby="tibyan-logo-title tibyan-logo-description"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
    >
      <title id="tibyan-logo-title">شعار مشروع تبيان الطبي</title>
      <desc id="tibyan-logo-description">
        شعار طبي يجمع الصليب ونبض القلب والإنسان والورقة الصحية.
      </desc>

      <defs>
        <linearGradient
          id="tibyan-main-gradient"
          x1="330"
          y1="205"
          x2="230"
          y2="650"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#16c9ca" />
          <stop offset="0.24" stopColor="#0796d7" />
          <stop offset="0.58" stopColor="#0874d6" />
          <stop offset="1" stopColor="#073fbd" />
        </linearGradient>

        <linearGradient
          id="tibyan-blue-swoosh"
          x1="520"
          y1="290"
          x2="400"
          y2="555"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0876df" />
          <stop offset="0.52" stopColor="#075dca" />
          <stop offset="1" stopColor="#0879d6" />
        </linearGradient>

        <linearGradient
          id="tibyan-green-gradient"
          x1="525"
          y1="330"
          x2="300"
          y2="645"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#49d78b" />
          <stop offset="0.48" stopColor="#27c79b" />
          <stop offset="1" stopColor="#00a9b5" />
        </linearGradient>

        <linearGradient
          id="tibyan-main-shine"
          x1="258"
          y1="205"
          x2="330"
          y2="405"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#62e8e4" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <radialGradient
          id="tibyan-head-gradient"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(383 291) rotate(52) scale(65)"
        >
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.72" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eef7fb" />
        </radialGradient>

        <filter
          id="tibyan-logo-shadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="175%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="16"
            stdDeviation="14"
            floodColor="#075c9e"
            floodOpacity="0.2"
          />
        </filter>

        <filter
          id="tibyan-pulse-glow"
          x="-30%"
          y="-60%"
          width="160%"
          height="220%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="2.3" result="pulseBlur" />
          <feMerge>
            <feMergeNode in="pulseBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g>
        {/* الصليب الطبي والجسم الأزرق في كتلة واحدة */}
        <path
          d="M398 205
             L319 201 L267 201
             C250 201 238 208 228 222
             C224 229 226 249 226 326
             L124 326
             C104 326 87 343 87 364
             L87 495
             C87 517 104 534 125 534
             L226 536
             L226 616
             C207 632 195 645 190 667
             C222 638 253 626 276 614
             C321 591 344 559 352 512
             C356 479 343 430 316 380
             C308 365 301 354 298 344
             C324 360 346 368 373 368
             C400 368 417 356 424 337
             C430 320 422 296 422 270
             L422 240
             C422 219 412 205 398 205
             Z

             M382 273
             C405 273 423 289 423 309
             C423 330 405 345 388 345
             C368 345 354 330 354 309
             C354 288 369 273 382 273
             Z"
          fill="url(#tibyan-main-gradient)"
          fillRule="evenodd"
          clipRule="evenodd"
        />

        {/* لمعان علوي ناعم مطابق لطابع الصورة */}
        <path
          d="M398 205
             L319 201 L267 201
             C246 201 228 218 228 239
             L228 326
             C278 324 327 333 365 355
             C391 369 418 353 424 331
             C429 309 422 287 422 240
             C422 219 412 205 398 205Z"
          fill="url(#tibyan-main-shine)"
        />

        {/* نبض القلب المتحرك */}
        <path
          className="tibyan-heartbeat"
          d="M87 436
             H178
             L195 410
             L222 492
             L250 366
             L276 470
             L289 436
             H339"
          fill="none"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* الرأس الأبيض */}
        <circle
          className="tibyan-head"
          cx="388"
          cy="309"
          r="36"
          fill="url(#tibyan-head-gradient)"
        />

        {/* القوس الأزرق الطويل */}
        <path
          className="tibyan-blue-arc"
          d="M535 287
             C503 319 470 352 445 380
             C424 404 409 427 400 456
             C390 490 394 526 410 558
             C403 526 408 491 419 458
             C433 420 463 385 501 344
             Z"
          fill="url(#tibyan-blue-swoosh)"
        />

        {/* الورقة والقوس السفلي الأخضر */}
        <path
          className="tibyan-leaf"
          d="M529 333
             C515 350 507 362 502 369
             C481 397 461 419 448 437
             C432 458 423 482 421 508
             C420 524 421 539 424 551
             C441 539 459 520 470 508
             C485 491 495 470 501 453
             C505 442 507 442 505 453
             C501 476 489 505 470 529
             C452 551 431 570 406 584
             C370 604 322 620 271 638
             L271 644
             C339 634 395 619 441 602
             C485 585 519 558 540 527
             C560 497 566 463 562 428
             C560 390 547 355 529 333
             Z"
          fill="url(#tibyan-green-gradient)"
        />

        {/* الفاصل الأبيض داخل الورقة */}
        <path
          className="tibyan-leaf-vein"
          d="M505 448
             C494 478 478 506 456 531
             C444 544 433 553 424 558"
          fill="none"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* لمعان رفيع في الذيل السفلي */}
        <path
          d="M284 639
             C333 627 373 613 407 596"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.34"
        />
      </g>
    </svg>
  );
}

const orbitIcons = [
  { Icon: HeartPulseIcon, color: "#0876d9" },
  { Icon: StethoscopeIcon, color: "#08a6b9" },
  { Icon: ClipboardIcon, color: "#116dcc" },
  { Icon: LabIcon, color: "#0a8ac8" },
  { Icon: PharmacyIcon, color: "#17aeaa" },
  { Icon: ConsultationIcon, color: "#35bd70" },
];

const DAILY_REPORT_CATEGORIES = [
  { id: "labs", label: "الفحوصات والمختبرات", Icon: LabIcon, accent: "#0876d9" },
  { id: "nutrition", label: "التغذية العلاجية", Icon: NutritionIcon, accent: "#0caab8" },
  { id: "pharmacy", label: "الصيدلية الذكية", Icon: PharmacyIcon, accent: "#16a99c" },
  { id: "consultations", label: "الاستشارات والمواعيد", Icon: ConsultationIcon, accent: "#35b96f" },
];

function readDailyReports() {
  try {
    const stored = JSON.parse(localStorage.getItem("tibyan-daily-reports") || "{}");
    return DAILY_REPORT_CATEGORIES.reduce((result, category) => {
      const item = stored?.[category.id] || {};
      result[category.id] = {
        count: Number.isFinite(Number(item.count)) ? Number(item.count) : 0,
        completed: Number.isFinite(Number(item.completed)) ? Number(item.completed) : 0,
        pending: Number.isFinite(Number(item.pending)) ? Number(item.pending) : 0,
        updatedAt: typeof item.updatedAt === "string" ? item.updatedAt : "",
      };
      return result;
    }, {});
  } catch {
    return DAILY_REPORT_CATEGORIES.reduce((result, category) => {
      result[category.id] = { count: 0, completed: 0, pending: 0, updatedAt: "" };
      return result;
    }, {});
  }
}

export default function HomePage() {
  const navigate = useNavigate();
  const [stylesReady, setStylesReady] = useState(Boolean(window.tailwind));
  const [dailyReports, setDailyReports] = useState(() => readDailyReports());
  const [activeReport, setActiveReport] = useState("all");

  const dailyReportOverview = DAILY_REPORT_CATEGORIES.reduce(
    (summary, category) => {
      const report = dailyReports?.[category.id] || {};
      summary.total += Number(report.count || 0);
      summary.completed += Number(report.completed || 0);
      summary.pending += Number(report.pending || 0);
      return summary;
    },
    { total: 0, completed: 0, pending: 0 }
  );

  const dailyCompletionRate = dailyReportOverview.total > 0
    ? Math.min(100, Math.round((dailyReportOverview.completed / dailyReportOverview.total) * 100))
    : 0;

  useEffect(() => {
    document.title = "تبيان - الصفحة الرئيسية";

    const finishLoading = () => {
      window.setTimeout(() => setStylesReady(true), 120);
    };

    if (window.tailwind) {
      finishLoading();
      return undefined;
    }

    const scriptId = "tibyan-tailwind-cdn";
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://cdn.tailwindcss.com";
      script.async = true;
      document.head.appendChild(script);
    }

    script.addEventListener("load", finishLoading);
    script.addEventListener("error", finishLoading);

    return () => {
      script?.removeEventListener("load", finishLoading);
      script?.removeEventListener("error", finishLoading);
    };
  }, []);


  useEffect(() => {
    if (!stylesReady) return undefined;

    const targetId = sessionStorage.getItem("tibyan-scroll-target");
    if (!targetId) return undefined;

    sessionStorage.removeItem("tibyan-scroll-target");
    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }, 180);

    return () => window.clearTimeout(timer);
  }, [stylesReady]);

  if (!stylesReady) {
    return (
      <>
        <TibyanHeader reserveSpace={false} />
        <main
          dir="rtl"
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            paddingTop: 76,
            background: "#f7fcff",
            color: "#064c91",
            fontFamily: '"IBM Plex Sans Arabic", Tahoma, Arial, sans-serif',
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 72,
                height: 72,
                margin: "0 auto 18px",
                borderRadius: "50%",
                border: "6px solid rgba(8,118,217,.12)",
                borderTopColor: "#0876d9",
                animation: "tibyanHomeLoader .8s linear infinite",
              }}
            />
            <strong>جارٍ تجهيز الصفحة الرئيسية...</strong>
            <style>{`@keyframes tibyanHomeLoader { to { transform: rotate(360deg); } }`}</style>
          </div>
        </main>
      </>
    );
  }

  return (
    // الشريط السفلي مستدعى مرة واحدة من App.js خارج Routes.
    <main
      dir="rtl"
      className="tibyan-page min-h-screen overflow-x-hidden bg-[#f7fcff] text-[#073b72]"
    >
      <TibyanHeader reserveSpace={false} />
      {/* خلفية هندسية طبية */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="medical-grid absolute inset-0 opacity-60" />
        <div className="absolute -right-28 top-28 h-80 w-80 rounded-full bg-[#12b7bd]/15 blur-3xl" />
        <div className="absolute -left-32 top-[36rem] h-96 w-96 rounded-full bg-[#0876d9]/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[20%] h-80 w-80 rounded-full bg-[#38c96f]/15 blur-3xl" />
      </div>


      <div className="home-page-content relative z-10 mx-auto w-full max-w-[1480px] px-4 pb-16 pt-[78px] sm:px-6 sm:pt-[88px] lg:px-8">
        {/* القسم الرئيسي */}
        <section className="hero-shell home-full-hero relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 px-5 py-8 shadow-[0_35px_100px_rgba(4,70,127,0.12)] backdrop-blur-xl sm:px-9 sm:py-11 lg:px-12 lg:py-14">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="hero-scan absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-[#12b7bd]/10 to-transparent" />
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full border-[32px] border-[#0876d9]/5" />
            <div className="absolute -bottom-24 right-[35%] h-64 w-64 rounded-full border-[38px] border-[#35c86f]/5" />
          </div>

          <div className="hero-responsive-layout relative grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div className="hero-responsive-content">
              <div className="hero-responsive-badge mb-5 inline-flex items-center gap-2 rounded-full border border-[#12b7bd]/20 bg-[#eafafa] px-4 py-2 text-xs font-bold text-[#078c96] shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38c96f] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#38c96f]" />
                </span>
                منصة طبية هندسية مدعومة بالذكاء الاصطناعي
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-[1.25] text-[#064c91] sm:text-5xl lg:text-6xl">
                صحتك أوضح مع
                <span className="relative mx-3 inline-block bg-gradient-to-l from-[#0876d9] via-[#0eabb8] to-[#36c96f] bg-clip-text text-transparent">
                  تبيان
                  <span className="absolute -bottom-2 right-0 h-1.5 w-full origin-right rounded-full bg-gradient-to-l from-[#0876d9] via-[#12b7bd] to-[#38c96f] hero-underline" />
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-[#4e7894] sm:text-lg">
                منظومة تجمع الطب والهندسة في تجربة واحدة؛ من الفحوصات البصرية والمختبرات إلى التغذية العلاجية والصيدلية الذكية والاستشارات الطبية.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/main/labs")}
                  className="group inline-flex min-h-12 items-center gap-3 rounded-2xl bg-gradient-to-l from-[#0876d9] to-[#0caab8] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_35px_rgba(8,118,217,0.28)] transition hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(8,118,217,0.35)] focus:outline-none focus:ring-4 focus:ring-[#0876d9]/20"
                >
                  ابدأ رحلتك الصحية
                  <ArrowIcon className="h-5 w-5 transition group-hover:-translate-x-1" />
                </button>

              </div>

            </div>

            {/* الشعار المتحرك — مرسوم بالكامل بالكود */}
            <div className="hero-responsive-logo tibyan-logo-stage relative mx-auto grid min-h-[360px] w-full max-w-[470px] place-items-center sm:min-h-[430px]">
              <div className="orbit-canvas pointer-events-none absolute h-[340px] w-[340px] sm:h-[420px] sm:w-[420px]" aria-hidden="true">
                <div className="engineering-ring absolute inset-0 rounded-full border border-dashed border-[#0a86c7]/25" />
                <div className="engineering-ring reverse absolute inset-[30px] rounded-full border border-[#12b7bd]/20 sm:inset-[38px]" />
                <div className="orbit-energy-ring absolute inset-[66px] rounded-full border border-[#35c86f]/15 sm:inset-[78px]" />

                {orbitIcons.map(({ Icon, color }, index) => {
                  const angle = index * 60;

                  return (
                    <div
                      key={index}
                      className="orbit-slot absolute inset-0"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      <div className="orbit-runner absolute inset-0">
                        <div className="orbit-anchor absolute left-1/2 top-1/2">
                          <div style={{ transform: `rotate(${-angle}deg)` }}>
                            <div className="orbit-counter">
                              <div
                                className="orbit-badge grid place-items-center rounded-2xl border border-white/90 bg-white/95 backdrop-blur-md"
                                style={{ color }}
                              >
                                <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="logo-aura pointer-events-none absolute h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(18,183,189,0.20)_0%,rgba(8,118,217,0.10)_46%,transparent_72%)] blur-xl sm:h-80 sm:w-80" aria-hidden="true" />

              <div className="logo-core relative z-10 h-56 w-56 sm:h-72 sm:w-72">
                <TibyanLogo className="h-full w-full overflow-visible" />
              </div>
            </div>
          </div>
        </section>



        {/* بوابة الخدمات — التنقل الفعلي موجود في الشريط السفلي */}
        <section className="tibyan-services-intro mt-12" aria-labelledby="tibyan-services-title">
          <div className="tibyan-services-intro-copy">
            <p>منظومة تبيان</p>
            <h2 id="tibyan-services-title">كل ما تحتاجه لصحة أوضح</h2>
          </div>

          <p className="tibyan-services-intro-note">
            اختر الخدمة، وستظهر حركة الشعار قبل انتقالك إلى الصفحة المطلوبة.
          </p>

          <div className="tibyan-services-path" aria-hidden="true">
            <span />
            <span />
            <span className="is-center" />
            <span />
            <span />
          </div>
        </section>

        {/* التقارير اليومية — لوحة القيادة الصحية */}
        <section id="daily-reports" className="daily-reports-section mt-10" aria-labelledby="daily-reports-title">
          <div className="daily-reports-hero">
            <div className="daily-reports-heading">
              <span className="daily-reports-kicker"><ReportIcon /> مركز العمليات اليومية</span>
              <h2 id="daily-reports-title">لوحة تقارير تبيان</h2>
              <p>قراءة سريعة وواضحة لأداء جميع الخدمات، مع حالة كل عملية ونسبة الإنجاز اليومية.</p>
            </div>

            <div className="daily-overall-progress" style={{ "--overall-progress": `${dailyCompletionRate * 3.6}deg` }}>
              <div>
                <strong>{dailyCompletionRate}%</strong>
                <span>الإنجاز العام</span>
              </div>
            </div>
          </div>

          <div className="daily-summary-grid">
            {[
              ["إجمالي العمليات", dailyReportOverview.total, "جميع خدمات تبيان", "total"],
              ["العمليات المكتملة", dailyReportOverview.completed, "تم إنجازها اليوم", "completed"],
              ["قيد المتابعة", dailyReportOverview.pending, "تحتاج متابعة", "pending"],
            ].map(([label, value, hint, type]) => (
              <article key={label} className={`daily-summary-card ${type}`}>
                <span className="daily-summary-symbol"><ReportIcon /></span>
                <div>
                  <small>{label}</small>
                  <strong>{value}</strong>
                  <p>{hint}</p>
                </div>
              </article>
            ))}

            <button
              type="button"
              className="daily-reports-refresh"
              onClick={() => setDailyReports(readDailyReports())}
              title="تحديث بيانات التقارير"
            >
              <ReportIcon />
              <span>تحديث التقارير</span>
              <small>جلب آخر البيانات</small>
            </button>
          </div>

          <div className="daily-reports-toolbar">
            <div className="daily-reports-tabs" role="tablist" aria-label="تصفية التقارير">
              <button
                type="button"
                className={activeReport === "all" ? "active" : ""}
                onClick={() => setActiveReport("all")}
              >
                جميع الخدمات
              </button>
              {DAILY_REPORT_CATEGORIES.map(({ id, label, Icon }) => (
                <button
                  type="button"
                  key={id}
                  className={activeReport === id ? "active" : ""}
                  onClick={() => setActiveReport(id)}
                >
                  <Icon />
                  {label}
                </button>
              ))}
            </div>
            <span className="daily-live-state"><i /> بيانات اليوم</span>
          </div>

          <div className="daily-reports-grid">
            {DAILY_REPORT_CATEGORIES
              .filter(({ id }) => activeReport === "all" || activeReport === id)
              .map(({ id, label, Icon, accent }, index) => {
                const report = dailyReports[id] || {};
                const count = Number(report.count || 0);
                const completed = Number(report.completed || 0);
                const pending = Number(report.pending || 0);
                const completionRate = count > 0 ? Math.min(100, Math.round((completed / count) * 100)) : 0;
                const remaining = Math.max(0, count - completed - pending);

                return (
                  <article
                    key={id}
                    className="daily-report-card"
                    style={{ "--report-accent": accent, "--report-progress": `${completionRate * 3.6}deg`, animationDelay: `${index * 70}ms` }}
                  >
                    <div className="daily-report-card-head">
                      <span className="daily-report-icon"><Icon /></span>
                      <div className="daily-report-title">
                        <span>تقرير الخدمة</span>
                        <h3>{label}</h3>
                      </div>
                      <span className={`daily-report-health ${completionRate >= 75 ? "excellent" : completionRate >= 40 ? "steady" : "starting"}`}>
                        {completionRate >= 75 ? "ممتاز" : completionRate >= 40 ? "مستقر" : "بداية اليوم"}
                      </span>
                    </div>

                    <div className="daily-report-body">
                      <div className="daily-report-ring">
                        <div>
                          <strong>{completionRate}%</strong>
                          <span>مكتمل</span>
                        </div>
                      </div>

                      <div className="daily-report-primary">
                        <small>إجمالي عمليات اليوم</small>
                        <strong>{count}</strong>
                        <span>{count === 0 ? "لا توجد عمليات مسجلة" : "عملية مسجلة حتى الآن"}</span>
                      </div>
                    </div>

                    <div className="daily-report-metrics">
                      <div className="is-completed"><i /><span>مكتملة</span><b>{completed}</b></div>
                      <div className="is-pending"><i /><span>قيد المتابعة</span><b>{pending}</b></div>
                      <div className="is-remaining"><i /><span>أخرى</span><b>{remaining}</b></div>
                    </div>

                    <div className="daily-report-progress" aria-label={`نسبة الإنجاز ${completionRate}%`}>
                      <span style={{ width: `${completionRate}%` }} />
                    </div>

                    <footer>
                      <span><i /> تحديث تلقائي عند توفر البيانات</span>
                      <time>{report.updatedAt || "لم تُحدّث بعد"}</time>
                    </footer>
                  </article>
                );
              })}
          </div>

          <div className="daily-reports-note">
            <span><ReportIcon /></span>
            <div>
              <strong>جاهزة للربط المباشر</strong>
              <p>تعتمد اللوحة حالياً على بيانات <code>tibyan-daily-reports</code>، ويمكن ربطها بقاعدة البيانات أو API دون تغيير الواجهة.</p>
            </div>
          </div>
        </section>

        {/* إحصائيات تبيان */}
        <section id="tibyan-stats" className="tibyan-stats-section mt-10">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[#10a4a9]">تبيان بالأرقام</p>
              <h2 className="mt-1 text-2xl font-bold text-[#064c91] sm:text-3xl">
                منظومة صحية مصممة لتكون أوضح
              </h2>
            </div>
            <span className="stats-live-chip">
              <span />
              جاهزية رقمية
            </span>
          </div>

          <div className="tibyan-stats-grid">
            {[
              ["04", "خدمات مترابطة", "من الفحص إلى الاستشارة"],
              ["03", "خطوات واضحة", "رحلة استخدام مختصرة"],
              ["24/7", "وصول رقمي", "واجهة متاحة في أي وقت"],
              ["01", "تجربة موحدة", "كل احتياجاتك في مكان واحد"],
            ].map(([value, label, hint], index) => (
              <article
                key={label}
                className="tibyan-stat-card"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="tibyan-stat-number">{value}</span>
                <strong>{label}</strong>
                <small>{hint}</small>
              </article>
            ))}
          </div>
        </section>

        {/* مسار العمل */}
        <section className="workflow-section mt-10">
          <div className="workflow-glow workflow-glow-one" />
          <div className="workflow-glow workflow-glow-two" />

          <div className="workflow-content">
            <div className="workflow-copy">
              <span className="workflow-kicker">هندسة التجربة الصحية</span>
              <h2>من السؤال إلى القرار في خطوات واضحة</h2>
              <p>
                رحلة قصيرة ومنظمة؛ اختر الخدمة، أدخل بياناتك، ثم انتقل إلى التوجيه المناسب.
              </p>
            </div>

            <div className="workflow-steps">
              {[
                ["01", "اختر الخدمة", "حدّد ما تحتاجه"],
                ["02", "أدخل البيانات", "بخطوات بسيطة"],
                ["03", "استلم التوجيه", "بشكل واضح ومنظم"],
              ].map(([number, label, hint], index) => (
                <div key={number} className="workflow-step">
                  <span className="workflow-step-number">{number}</span>
                  <div>
                    <strong>{label}</strong>
                    <small>{hint}</small>
                  </div>
                  {index < 2 && <span className="workflow-connector" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#0a86c7]/10 py-6 text-center text-xs font-semibold text-[#7194aa] sm:flex-row sm:text-right">
          <p>© تبيان — منصة تجمع الطب والهندسة بذكاء.</p>
          <p>الواجهة للإرشاد التقني ولا تُعد تشخيصاً طبياً.</p>
        </footer>
      </div>


      <style>{`
        * {
          box-sizing: border-box;
        }


        .tibyan-page {
          min-height: 100vh;
          background: #f7fcff;
          color: #073b72;
          direction: rtl;
        }
        .tibyan-page button {
          font: inherit;
          cursor: pointer;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #f7fcff;
        }


        .tibyan-page,
        .tibyan-page button,
        .tibyan-page input,
        .tibyan-page textarea,
        .tibyan-page select {
          font-family: var(--font-tibyan), "IBM Plex Sans Arabic", Tahoma, Arial, sans-serif;
        }

        .tibyan-page {
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .tibyan-page :where(h1, h2, h3, p, span, button) {
          letter-spacing: 0;
        }

        .medical-grid,
        .transition-grid {
          background-image:
            linear-gradient(rgba(8, 118, 217, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8, 118, 217, 0.045) 1px, transparent 1px);
          background-size: 42px 42px;
          animation: gridMove 18s linear infinite;
        }

        .hero-shell::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,.48) 45%, transparent 70%);
          transform: translateX(110%);
          animation: softShine 7s ease-in-out infinite;
        }

        .hero-scan {
          animation: heroScan 6.5s ease-in-out infinite;
        }

        .hero-underline {
          animation: underlinePulse 2.8s ease-in-out infinite;
        }

        .engineering-ring {
          animation: slowSpin 18s linear infinite;
          box-shadow: 0 0 50px rgba(18, 183, 189, 0.08);
        }

        .engineering-ring.reverse {
          animation-direction: reverse;
          animation-duration: 13s;
        }

        .tibyan-logo-stage {
          --orbit-radius: 142px;
          isolation: isolate;
        }

        .logo-core svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
          opacity: 1;
          shape-rendering: geometricPrecision;
          text-rendering: geometricPrecision;
          vector-effect: non-scaling-stroke;
        }

        .logo-core {
          position: relative;
          animation: logoFloat 4.5s ease-in-out infinite;
          transform-origin: 50% 55%;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          contain: layout paint;
        }

        .logo-core::after {
          content: "";
          position: absolute;
          inset: 17% 15% 8%;
          z-index: -1;
          border-radius: 50%;
          background: rgba(3, 82, 143, 0.15);
          filter: blur(22px);
          pointer-events: none;
        }

        .logo-aura {
          animation: logoAura 4.8s ease-in-out infinite;
        }

        .orbit-energy-ring {
          box-shadow:
            0 0 45px rgba(18, 183, 189, 0.08),
            inset 0 0 35px rgba(56, 201, 111, 0.04);
          animation: orbitEnergy 4s ease-in-out infinite;
        }

        .orbit-runner {
          animation: orbitSpin 22s linear infinite;
          transform-origin: 50% 50%;
          will-change: transform;
        }

        .orbit-anchor {
          transform: translate(-50%, -50%) translateX(var(--orbit-radius));
        }

        .orbit-counter {
          animation: orbitCounter 22s linear infinite;
          will-change: transform;
        }

        .orbit-badge {
          width: 56px;
          height: 56px;
          box-shadow:
            0 16px 34px rgba(4, 77, 132, 0.16),
            0 0 0 5px rgba(255, 255, 255, 0.32),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          animation: orbitBadgeBreath 3.8s ease-in-out infinite;
        }

        .orbit-slot:nth-child(5) .orbit-badge {
          animation-delay: .35s;
        }

        .orbit-slot:nth-child(6) .orbit-badge {
          animation-delay: .7s;
        }

        .orbit-slot:nth-child(7) .orbit-badge {
          animation-delay: 1.05s;
        }

        .orbit-slot:nth-child(8) .orbit-badge {
          animation-delay: 1.4s;
        }

        .orbit-slot:nth-child(9) .orbit-badge {
          animation-delay: 1.75s;
        }

        .orbit-slot:nth-child(10) .orbit-badge {
          animation-delay: 2.1s;
        }

        .tibyan-logo-stage:hover .orbit-runner,
        .tibyan-logo-stage:hover .orbit-counter {
          animation-play-state: paused;
        }

        .tibyan-heartbeat {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: heartbeatTrace 4.2s linear infinite;
          will-change: stroke-dashoffset, opacity;
        }

        .tibyan-leaf {
          transform-box: fill-box;
          transform-origin: 50% 80%;
          animation: leafBreath 4.6s ease-in-out infinite;
        }

        .tibyan-head {
          transform-box: fill-box;
          transform-origin: center;
          animation: headBreath 4.5s ease-in-out infinite;
        }

        .tibyan-blue-arc {
          transform-box: fill-box;
          transform-origin: 50% 85%;
          animation: blueArcBreath 4.8s ease-in-out infinite;
        }

        .tibyan-leaf-vein {
          stroke-dasharray: 150;
          stroke-dashoffset: 0;
          animation: leafVeinFlow 4.6s ease-in-out infinite;
        }

        /* منع تضارب حركات أجزاء الشعار مع الحفاظ على الرسم الأصلي */
        .tibyan-leaf,
        .tibyan-head,
        .tibyan-blue-arc {
          animation: none;
        }

        .service-card {
          animation: cardEnter .75s both;
        }

        .service-card::after {
          content: "";
          position: absolute;
          top: -120%;
          left: -30%;
          width: 32%;
          height: 340%;
          transform: rotate(18deg);
          background: linear-gradient(to right, transparent, rgba(255,255,255,.72), transparent);
          transition: transform .85s ease;
        }

        .service-card:hover::after {
          transform: translateX(520%) rotate(18deg);
        }

        .transition-screen {
          animation: screenIn .28s ease-out both;
        }

        .transition-logo {
          animation: transitionLogo 1.2s cubic-bezier(.2,.85,.25,1) both;
        }

        .transition-orbit {
          --x: 0px;
          --y: 0px;
          --delay: 0ms;
          animation: orbitExplode 1.15s cubic-bezier(.22,.85,.25,1) var(--delay) both;
        }

        .transition-ring {
          animation: fastSpin 2.2s linear infinite;
        }

        .transition-ring.reverse {
          animation-direction: reverse;
          animation-duration: 1.7s;
        }

        .loading-line {
          animation: loadingProgress 1.25s ease-in-out both;
          transform-origin: right;
        }

        @keyframes gridMove {
          to { background-position: 42px 42px; }
        }

        @keyframes softShine {
          0%, 45% { transform: translateX(110%); }
          70%, 100% { transform: translateX(-110%); }
        }

        @keyframes heroScan {
          0%, 100% { left: -15%; opacity: 0; }
          20% { opacity: 1; }
          60% { opacity: 1; }
          80% { left: 110%; opacity: 0; }
        }

        @keyframes underlinePulse {
          0%, 100% { transform: scaleX(.72); opacity: .7; }
          50% { transform: scaleX(1); opacity: 1; }
        }

        @keyframes slowSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes fastSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1.5deg); }
        }


        @keyframes logoAura {
          0%, 100% { opacity: .58; transform: scale(.92); }
          50% { opacity: 1; transform: scale(1.08); }
        }

        @keyframes orbitSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes orbitCounter {
          to { transform: rotate(-360deg); }
        }

        @keyframes orbitEnergy {
          0%, 100% { opacity: .45; transform: scale(.96); }
          50% { opacity: 1; transform: scale(1.04); }
        }

        @keyframes orbitBadgeBreath {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.045); }
        }

        @keyframes heartbeatTrace {
          0% { stroke-dashoffset: 260; opacity: .45; }
          38% { stroke-dashoffset: 0; opacity: 1; }
          72% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -260; opacity: .45; }
        }

        @keyframes leafBreath {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(1.4deg) scale(1.018); }
        }

        @keyframes headBreath {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-2px) scale(1.025); }
        }

        @keyframes blueArcBreath {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-0.8deg) scale(1.012); }
        }

        @keyframes leafVeinFlow {
          0%, 100% { stroke-dashoffset: 0; opacity: .92; }
          50% { stroke-dashoffset: -28; opacity: 1; }
        }



        /* لوحة التقارير اليومية الاحترافية */
        .daily-reports-section {
          position: relative;
          overflow: hidden;
          padding: 30px;
          border: 1px solid rgba(8,118,217,.10);
          border-radius: 32px;
          background:
            radial-gradient(circle at 100% 0%, rgba(18,183,189,.12), transparent 31%),
            radial-gradient(circle at 0% 100%, rgba(8,118,217,.08), transparent 34%),
            linear-gradient(145deg, rgba(255,255,255,.97), rgba(245,251,254,.94));
          box-shadow: 0 28px 75px rgba(3,77,132,.11);
          isolation: isolate;
        }

        .daily-reports-section::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: .5;
          background-image:
            linear-gradient(rgba(8,118,217,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,118,217,.025) 1px, transparent 1px);
          background-size: 30px 30px;
          mask-image: linear-gradient(180deg,#000,transparent 78%);
          -webkit-mask-image: linear-gradient(180deg,#000,transparent 78%);
        }

        .daily-reports-hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .daily-reports-heading { min-width: 0; }

        .daily-reports-kicker {
          width: max-content;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 11px;
          border: 1px solid rgba(18,183,189,.16);
          border-radius: 999px;
          background: rgba(235,251,250,.8);
          color: #078c96;
          font-size: 10px;
          font-weight: 900;
        }

        .daily-reports-kicker svg { width: 16px; height: 16px; }

        .daily-reports-heading h2 {
          margin: 10px 0 0;
          color: #064c91;
          font-size: clamp(26px, 3vw, 38px);
          line-height: 1.25;
          font-weight: 950;
        }

        .daily-reports-heading p {
          max-width: 760px;
          margin: 9px 0 0;
          color: #668ba2;
          font-size: 12px;
          font-weight: 650;
          line-height: 1.9;
        }

        .daily-overall-progress,
        .daily-report-ring {
          position: relative;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: conic-gradient(#0caab8 0 var(--overall-progress, 0deg), #e7f1f5 var(--overall-progress, 0deg) 360deg);
        }

        .daily-overall-progress {
          width: 112px;
          height: 112px;
          flex: 0 0 112px;
          box-shadow: 0 16px 36px rgba(8,118,217,.13);
        }

        .daily-overall-progress::before,
        .daily-report-ring::before {
          content: "";
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          background: #fff;
          box-shadow: inset 0 0 0 1px rgba(8,118,217,.06);
        }

        .daily-overall-progress > div,
        .daily-report-ring > div {
          position: relative;
          z-index: 1;
          display: grid;
          justify-items: center;
        }

        .daily-overall-progress strong { color:#075dab; font-size:25px; line-height:1; font-weight:950; }
        .daily-overall-progress span { margin-top:5px; color:#7898aa; font-size:8px; font-weight:850; }

        .daily-summary-grid {
          display: grid;
          grid-template-columns: repeat(4,minmax(0,1fr));
          gap: 12px;
          margin-top: 24px;
        }

        .daily-summary-card,
        .daily-reports-refresh {
          min-width: 0;
          min-height: 104px;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 16px;
          border: 1px solid rgba(8,118,217,.08);
          border-radius: 21px;
          background: rgba(255,255,255,.88);
          box-shadow: 0 13px 32px rgba(3,77,132,.07);
        }

        .daily-summary-symbol {
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: #eef8ff;
          color: #0876d9;
        }
        .daily-summary-symbol svg { width:21px; height:21px; }
        .daily-summary-card.completed .daily-summary-symbol { background:#eafaf1; color:#25ad67; }
        .daily-summary-card.pending .daily-summary-symbol { background:#fff7e8; color:#e49a22; }

        .daily-summary-card small { display:block; color:#6d90a5; font-size:8px; font-weight:850; }
        .daily-summary-card strong { display:block; margin-top:3px; color:#075dab; font-size:27px; line-height:1; font-weight:950; }
        .daily-summary-card p { margin:5px 0 0; color:#8aa4b4; font-size:7.5px; font-weight:700; }

        .daily-reports-refresh {
          flex-direction: column;
          justify-content: center;
          gap: 3px;
          border: 0;
          background: linear-gradient(145deg,#0876d9,#0caab8);
          color: #fff;
          cursor: pointer;
          transition: transform .22s ease, box-shadow .22s ease;
          box-shadow: 0 15px 32px rgba(8,118,217,.24);
        }
        .daily-reports-refresh:hover { transform:translateY(-3px); box-shadow:0 20px 38px rgba(8,118,217,.30); }
        .daily-reports-refresh svg { width:22px; height:22px; }
        .daily-reports-refresh span { font-size:10px; font-weight:900; }
        .daily-reports-refresh small { color:rgba(255,255,255,.72); font-size:7px; font-weight:700; }

        .daily-reports-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(8,118,217,.08);
        }

        .daily-reports-tabs {
          min-width: 0;
          display: flex;
          gap: 7px;
          overflow-x: auto;
          padding-bottom: 3px;
          scrollbar-width: none;
        }
        .daily-reports-tabs::-webkit-scrollbar { display:none; }
        .daily-reports-tabs button {
          flex: 0 0 auto;
          min-height: 36px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border: 1px solid rgba(8,118,217,.10);
          border-radius: 12px;
          background: rgba(255,255,255,.75);
          color: #6289a2;
          font-size: 8.5px;
          font-weight: 850;
          transition: .2s ease;
        }
        .daily-reports-tabs button svg { width:15px; height:15px; }
        .daily-reports-tabs button.active {
          border-color: transparent;
          background: linear-gradient(145deg,#0876d9,#0caab8);
          color: #fff;
          box-shadow: 0 9px 20px rgba(8,118,217,.18);
        }

        .daily-live-state {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color:#6d90a5;
          font-size:8px;
          font-weight:850;
        }
        .daily-live-state i { width:7px; height:7px; border-radius:50%; background:#38c96f; box-shadow:0 0 0 4px rgba(56,201,111,.12); animation:statsLivePulse 1.8s ease-in-out infinite; }

        .daily-reports-grid {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 15px;
          margin-top: 15px;
        }

        .daily-report-card {
          --report-accent:#0876d9;
          position: relative;
          overflow: hidden;
          min-width: 0;
          padding: 19px;
          border: 1px solid rgba(8,118,217,.085);
          border-radius: 24px;
          background: linear-gradient(145deg,rgba(255,255,255,.98),rgba(245,251,253,.95));
          box-shadow: 0 15px 38px rgba(3,77,132,.075);
          animation: dailyReportIn .55s both;
          transition: transform .24s ease, box-shadow .24s ease;
        }
        .daily-report-card:hover { transform:translateY(-4px); box-shadow:0 22px 46px rgba(3,77,132,.12); }
        .daily-report-card::after { content:""; position:absolute; width:130px; height:130px; left:-58px; top:-62px; border-radius:50%; background:var(--report-accent); opacity:.055; }

        .daily-report-card-head { position:relative; z-index:1; display:grid; grid-template-columns:44px 1fr auto; align-items:center; gap:10px; }
        .daily-report-icon { width:44px; height:44px; display:grid; place-items:center; border-radius:14px; background:color-mix(in srgb,var(--report-accent) 10%,white); color:var(--report-accent); }
        @supports not (background:color-mix(in srgb,red,blue)) { .daily-report-icon { background:#eef8ff; } }
        .daily-report-icon svg { width:22px; height:22px; }
        .daily-report-title span { display:block; color:#8aa4b4; font-size:7px; font-weight:800; }
        .daily-report-title h3 { margin:3px 0 0; color:#315f7a; font-size:12px; line-height:1.45; font-weight:950; }

        .daily-report-health { padding:5px 8px; border-radius:999px; font-size:7px; font-weight:900; }
        .daily-report-health.excellent { background:#e9f9f0; color:#26a862; }
        .daily-report-health.steady { background:#eaf7fb; color:#078c96; }
        .daily-report-health.starting { background:#fff6e6; color:#d88b1c; }

        .daily-report-body { position:relative; z-index:1; display:grid; grid-template-columns:92px 1fr; align-items:center; gap:16px; margin-top:17px; }
        .daily-report-ring { --overall-progress:var(--report-progress); width:88px; height:88px; background:conic-gradient(var(--report-accent) 0 var(--report-progress,0deg),#e7f1f5 var(--report-progress,0deg) 360deg); }
        .daily-report-ring::before { inset:7px; }
        .daily-report-ring strong { color:var(--report-accent); font-size:20px; line-height:1; font-weight:950; }
        .daily-report-ring span { margin-top:4px; color:#8aa4b4; font-size:7px; font-weight:800; }
        .daily-report-primary small { display:block; color:#7898aa; font-size:8px; font-weight:800; }
        .daily-report-primary strong { display:block; margin-top:5px; color:#075dab; font-size:36px; line-height:1; font-weight:950; }
        .daily-report-primary span { display:block; margin-top:7px; color:#8aa4b4; font-size:7.5px; font-weight:700; }

        .daily-report-metrics { position:relative; z-index:1; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:7px; margin-top:16px; }
        .daily-report-metrics > div { min-width:0; display:grid; grid-template-columns:7px 1fr auto; align-items:center; gap:5px; padding:9px 8px; border-radius:12px; background:#f5f9fb; color:#7898aa; }
        .daily-report-metrics i { width:6px; height:6px; border-radius:50%; }
        .daily-report-metrics span { overflow:hidden; font-size:7px; font-weight:800; white-space:nowrap; text-overflow:ellipsis; }
        .daily-report-metrics b { color:#315f7a; font-size:10px; font-weight:950; }
        .daily-report-metrics .is-completed i { background:#38c96f; }
        .daily-report-metrics .is-pending i { background:#f0a52f; }
        .daily-report-metrics .is-remaining i { background:#88a7b9; }

        .daily-report-progress { position:relative; z-index:1; height:6px; overflow:hidden; margin-top:13px; border-radius:999px; background:#e8f0f4; }
        .daily-report-progress span { display:block; height:100%; border-radius:inherit; background:linear-gradient(90deg,var(--report-accent),#38c96f); transition:width .45s ease; }
        .daily-report-card footer { position:relative; z-index:1; display:flex; align-items:center; justify-content:space-between; gap:8px; margin-top:9px; color:#8aa4b4; font-size:7px; font-weight:750; }
        .daily-report-card footer span { display:inline-flex; align-items:center; gap:5px; }
        .daily-report-card footer i { width:5px; height:5px; border-radius:50%; background:#38c96f; }
        .daily-report-card time { text-align:left; }

        .daily-reports-note { display:flex; align-items:center; gap:11px; margin-top:16px; padding:12px 14px; border:1px dashed rgba(8,118,217,.14); border-radius:16px; background:rgba(245,251,254,.86); color:#668ba2; }
        .daily-reports-note > span { width:38px; height:38px; flex:0 0 38px; display:grid; place-items:center; border-radius:12px; background:#eef8ff; color:#0876d9; }
        .daily-reports-note svg { width:19px; height:19px; }
        .daily-reports-note strong { display:block; color:#315f7a; font-size:9px; font-weight:900; }
        .daily-reports-note p { margin:3px 0 0; font-size:8px; font-weight:700; line-height:1.7; }
        .daily-reports-note code { color:#075dab; font-weight:900; }

        @keyframes dailyReportIn { from { opacity:0; transform:translateY(15px) scale(.985); } to { opacity:1; transform:none; } }

        @media (max-width:900px) {
          .daily-summary-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
        }

        @media (max-width:560px) {
          .daily-reports-section { padding:18px 11px; border-radius:24px; }
          .daily-reports-hero { align-items:flex-start; gap:10px; }
          .daily-reports-heading h2 { font-size:21px; }
          .daily-reports-heading p { font-size:8.5px; line-height:1.75; }
          .daily-reports-kicker { padding:5px 8px; font-size:7.5px; }
          .daily-overall-progress { width:74px; height:74px; flex-basis:74px; }
          .daily-overall-progress::before { inset:6px; }
          .daily-overall-progress strong { font-size:17px; }
          .daily-overall-progress span { font-size:6px; }
          .daily-summary-grid { gap:7px; margin-top:16px; }
          .daily-summary-card,.daily-reports-refresh { min-height:76px; padding:10px; border-radius:15px; gap:8px; }
          .daily-summary-symbol { width:32px; height:32px; flex-basis:32px; border-radius:10px; }
          .daily-summary-symbol svg { width:16px; height:16px; }
          .daily-summary-card small { font-size:6.5px; }
          .daily-summary-card strong { font-size:20px; }
          .daily-summary-card p,.daily-reports-refresh small { display:none; }
          .daily-reports-refresh svg { width:18px; height:18px; }
          .daily-reports-refresh span { font-size:8px; }
          .daily-reports-toolbar { margin-top:16px; padding-top:14px; }
          .daily-live-state { display:none; }
          .daily-reports-tabs button { min-height:32px; padding:7px 9px; font-size:7.3px; }
          .daily-reports-tabs button svg { width:13px; height:13px; }
          .daily-reports-grid { grid-template-columns:1fr; gap:9px; margin-top:10px; }
          .daily-report-card { padding:13px; border-radius:18px; }
          .daily-report-card-head { grid-template-columns:37px 1fr auto; gap:8px; }
          .daily-report-icon { width:37px; height:37px; border-radius:12px; }
          .daily-report-icon svg { width:19px; height:19px; }
          .daily-report-title h3 { font-size:10px; }
          .daily-report-health { font-size:6px; padding:4px 6px; }
          .daily-report-body { grid-template-columns:70px 1fr; gap:12px; margin-top:12px; }
          .daily-report-ring { width:68px; height:68px; }
          .daily-report-ring strong { font-size:16px; }
          .daily-report-primary strong { font-size:28px; }
          .daily-report-metrics { gap:5px; margin-top:11px; }
          .daily-report-metrics > div { padding:7px 6px; }
          .daily-report-metrics span { font-size:6px; }
          .daily-report-metrics b { font-size:8px; }
          .daily-report-card footer { font-size:6px; }
          .daily-reports-note { padding:10px; }
          .daily-reports-note > span { width:32px; height:32px; flex-basis:32px; }
          .daily-reports-note strong { font-size:8px; }
          .daily-reports-note p { font-size:7px; }
        }

        /* إحصائيات تبيان */
        .stats-live-chip {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          border: 1px solid rgba(18,183,189,.16);
          border-radius: 999px;
          background: #fff;
          color: #078c96;
          font-size: 11px;
          font-weight: 800;
          box-shadow: 0 10px 24px rgba(3,77,132,.07);
        }

        .stats-live-chip > span {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #38c96f;
          box-shadow: 0 0 0 5px rgba(56,201,111,.12);
          animation: statsLivePulse 1.8s ease-in-out infinite;
        }

        .tibyan-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .tibyan-stat-card {
          position: relative;
          overflow: hidden;
          min-height: 145px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          border: 1px solid rgba(10,134,199,.10);
          border-radius: 24px;
          background:
            linear-gradient(145deg, rgba(255,255,255,.96), rgba(239,252,252,.94));
          box-shadow: 0 18px 45px rgba(3,77,132,.08);
          animation: statCardIn .65s both;
        }

        .tibyan-stat-card::before {
          content: "";
          position: absolute;
          top: -42px;
          left: -36px;
          width: 115px;
          height: 115px;
          border-radius: 50%;
          background: rgba(8,118,217,.07);
          filter: blur(3px);
        }

        .tibyan-stat-number {
          position: relative;
          z-index: 1;
          display: block;
          margin-bottom: 10px;
          color: #0876d9;
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -.04em;
        }

        .tibyan-stat-card strong {
          position: relative;
          z-index: 1;
          color: #075dab;
          font-size: 14px;
          font-weight: 900;
        }

        .tibyan-stat-card small {
          position: relative;
          z-index: 1;
          margin-top: 5px;
          color: #6b91a8;
          font-size: 11px;
          font-weight: 600;
          line-height: 1.6;
        }

        /* مسار العمل المطور */
        .workflow-section {
          position: relative;
          overflow: hidden;
          padding: 30px;
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 32px;
          background:
            linear-gradient(125deg, #064f97 0%, #0876d9 52%, #0aa7b7 100%);
          color: #fff;
          box-shadow: 0 30px 80px rgba(4,85,151,.22);
          isolation: isolate;
        }

        .workflow-glow {
          position: absolute;
          z-index: 0;
          border-radius: 50%;
          filter: blur(55px);
          pointer-events: none;
        }

        .workflow-glow-one {
          top: -80px;
          right: -70px;
          width: 220px;
          height: 220px;
          background: rgba(61,226,218,.18);
        }

        .workflow-glow-two {
          bottom: -110px;
          left: -65px;
          width: 250px;
          height: 250px;
          background: rgba(56,201,111,.16);
        }

        .workflow-content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 30px;
          align-items: center;
        }

        .workflow-kicker {
          display: inline-flex;
          padding: 7px 11px;
          border: 1px solid rgba(169,255,240,.22);
          border-radius: 999px;
          background: rgba(255,255,255,.10);
          color: #a9fff0;
          font-size: 11px;
          font-weight: 900;
        }

        .workflow-copy h2 {
          margin: 13px 0 0;
          font-size: clamp(1.55rem, 3vw, 2.25rem);
          font-weight: 900;
          line-height: 1.35;
        }

        .workflow-copy p {
          max-width: 520px;
          margin: 14px 0 0;
          color: rgba(255,255,255,.76);
          font-size: 13px;
          font-weight: 600;
          line-height: 1.9;
        }

        .workflow-steps {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .workflow-step {
          position: relative;
          min-height: 150px;
          padding: 17px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid rgba(255,255,255,.16);
          border-radius: 22px;
          background: rgba(255,255,255,.10);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.12);
        }

        .workflow-step-number {
          color: #a9fff0;
          font-size: 26px;
          font-weight: 900;
          line-height: 1;
        }

        .workflow-step strong {
          display: block;
          font-size: 13px;
          font-weight: 900;
        }

        .workflow-step small {
          display: block;
          margin-top: 5px;
          color: rgba(255,255,255,.66);
          font-size: 10px;
          font-weight: 600;
        }

        @keyframes statsLivePulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(.78); opacity: .58; }
        }

        @keyframes statCardIn {
          from { opacity: 0; transform: translateY(18px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 760px) {
          .tibyan-stats-section {
            margin-top: 32px !important;
          }

          .tibyan-stats-section > div:first-child {
            align-items: center !important;
          }

          .tibyan-stats-section h2 {
            font-size: 20px !important;
            line-height: 1.45 !important;
          }

          .stats-live-chip {
            padding: 6px 8px;
            font-size: 8px;
          }

          .stats-live-chip > span {
            width: 6px;
            height: 6px;
            box-shadow: 0 0 0 3px rgba(56,201,111,.12);
          }

          .tibyan-stats-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 5px;
          }

          .tibyan-stat-card {
            min-width: 0;
            min-height: 82px;
            padding: 9px 5px;
            justify-content: center;
            align-items: center;
            text-align: center;
            border-radius: 14px;
          }

          .tibyan-stat-card::before {
            width: 64px;
            height: 64px;
          }

          .tibyan-stat-number {
            margin-bottom: 5px;
            font-size: clamp(17px, 5.3vw, 23px);
            letter-spacing: -.05em;
          }

          .tibyan-stat-card strong {
            font-size: 8px;
            line-height: 1.35;
          }

          .tibyan-stat-card small {
            display: none;
          }

          .workflow-section {
            margin-top: 32px !important;
            padding: 19px 14px 16px;
            border-radius: 25px;
          }

          .workflow-content {
            display: block;
          }

          .workflow-copy {
            text-align: right;
          }

          .workflow-kicker {
            padding: 5px 8px;
            font-size: 8px;
          }

          .workflow-copy h2 {
            margin-top: 9px;
            font-size: 20px;
            line-height: 1.45;
          }

          .workflow-copy p {
            margin-top: 8px;
            font-size: 10px;
            line-height: 1.75;
          }

          .workflow-steps {
            position: relative;
            margin-top: 16px;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 7px;
          }

          .workflow-step {
            min-height: 104px;
            padding: 11px 9px;
            border-radius: 16px;
          }

          .workflow-step-number {
            font-size: 20px;
          }

          .workflow-step strong {
            font-size: 9px;
            line-height: 1.45;
          }

          .workflow-step small {
            font-size: 7.5px;
            line-height: 1.4;
          }
        }

        @media (max-width: 360px) {
          .tibyan-stats-grid {
            gap: 4px;
          }

          .tibyan-stat-card {
            min-height: 74px;
            padding: 7px 3px;
            border-radius: 12px;
          }

          .tibyan-stat-number {
            font-size: 16px;
          }

          .tibyan-stat-card strong {
            font-size: 7px;
          }

          .workflow-section {
            padding-inline: 11px;
          }

          .workflow-steps {
            gap: 5px;
          }

          .workflow-step {
            min-height: 98px;
            padding: 9px 7px;
          }

          .workflow-step-number {
            font-size: 18px;
          }

          .workflow-step strong {
            font-size: 8.2px;
          }

          .workflow-step small {
            display: none;
          }
        }

        .services-grid {
          align-items: stretch;
        }

        .service-card {
          cursor: pointer;
          isolation: isolate;
          touch-action: manipulation;
        }

        .service-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          border-radius: inherit;
          background:
            linear-gradient(145deg, rgba(8,118,217,.035), transparent 45%),
            radial-gradient(circle at 85% 15%, rgba(18,183,189,.08), transparent 38%);
        }

        .service-click-hint {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 3;
          padding: 4px 7px;
          border: 1px solid rgba(8,118,217,.12);
          border-radius: 999px;
          background: rgba(255,255,255,.92);
          color: #6b91a8;
          font-size: 8px;
          font-weight: 800;
          box-shadow: 0 6px 14px rgba(3,77,132,.07);
          opacity: .92;
        }

        .service-action {
          width: 100%;
          border-top: 1px dashed rgba(10,134,199,.14);
        }

        .service-tap-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #38c96f;
          box-shadow: 0 0 0 4px rgba(56,201,111,.12);
          animation: serviceTapPulse 1.8s ease-in-out infinite;
        }

        .service-action-circle {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: linear-gradient(145deg,#0876d9,#10b5b5);
          color: #fff;
          box-shadow: 0 8px 18px rgba(8,118,217,.22);
          transition: transform .25s ease;
        }

        .service-card:hover .service-action-circle {
          transform: translateX(-3px) scale(1.04);
        }

        .service-card:active .service-action-circle {
          transform: scale(.94);
        }

        @keyframes serviceTapPulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(.75); opacity: .55; }
        }

        @media (max-width: 420px) {
          .services-grid {
            gap: 9px !important;
          }

          .service-card {
            min-height: 196px !important;
            padding: 12px !important;
            border-radius: 20px !important;
          }

          .service-main-icon {
            width: 44px !important;
            height: 44px !important;
            border-radius: 14px !important;
          }

          .service-badge {
            max-width: 72px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .service-title {
            font-size: 13px !important;
            line-height: 1.55 !important;
          }

          .service-description {
            font-size: 9.5px !important;
            line-height: 1.65 !important;
          }

          .service-click-hint {
            top: 8px;
            left: 8px;
            font-size: 7px;
            padding: 3px 6px;
          }

          .service-action {
            font-size: 9.5px !important;
          }

          .service-action-circle {
            width: 25px;
            height: 25px;
            border-radius: 9px;
          }
        }

        @media (max-width: 350px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(28px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes screenIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes transitionLogo {
          0% { opacity: 0; transform: scale(.45) rotate(-18deg); filter: blur(10px); }
          35% { opacity: 1; transform: scale(1.08) rotate(3deg); filter: blur(0); }
          75% { transform: scale(.94) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        @keyframes orbitExplode {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(.25) rotate(-90deg);
          }
          38% {
            opacity: 1;
            transform: translate(var(--x), var(--y)) scale(1.08) rotate(10deg);
          }
          68% {
            opacity: 1;
            transform: translate(var(--x), var(--y)) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(0, 0) scale(.22) rotate(180deg);
          }
        }

        @keyframes loadingProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }


        /* تحسين أداء بطاقة الشعار على الجوال دون تغيير الشعار */
        @media (max-width: 760px) {
          .hero-shell {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            background: rgba(255, 255, 255, .94) !important;
          }

          .logo-aura {
            filter: blur(8px) !important;
          }

          .engineering-ring {
            box-shadow: none !important;
          }

          .orbit-badge {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            background: rgba(255, 255, 255, .98) !important;
          }
        }

        /* تخطيط البطل على الجوال: النص يمين والشعار المتحرك يسار */
        @media (max-width: 760px) {
          .hero-shell {
            padding: 20px 12px 22px !important;
            border-radius: 25px !important;
          }

          .hero-responsive-layout {
            width: 100% !important;
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 10px !important;
          }

          /* أول عنصر في RTL يظهر يمينًا: النص */
          .hero-responsive-content {
            order: 1 !important;
            flex: 1 1 auto !important;
            width: auto !important;
            min-width: 0 !important;
            text-align: right !important;
          }

          /* الشعار يثبت يسارًا ولا ينزل أسفل النص */
          .hero-responsive-logo {
            order: 2 !important;
            flex: 0 0 118px !important;
            --orbit-radius: 52px !important;
            width: 118px !important;
            max-width: 118px !important;
            min-width: 118px !important;
            min-height: 150px !important;
            height: 150px !important;
            margin: 0 !important;
            align-self: center !important;
          }

          .hero-responsive-logo .orbit-canvas {
            width: 136px !important;
            height: 136px !important;
          }

          .hero-responsive-logo .engineering-ring.reverse {
            inset: 15px !important;
          }

          .hero-responsive-logo .orbit-energy-ring {
            inset: 32px !important;
          }

          .hero-responsive-logo .logo-aura {
            width: 102px !important;
            height: 102px !important;
            filter: blur(12px) !important;
          }

          .hero-responsive-logo .logo-core {
            width: 86px !important;
            height: 86px !important;
          }

          .hero-responsive-logo .orbit-badge {
            width: 28px !important;
            height: 28px !important;
            border-radius: 9px !important;
            box-shadow:
              0 7px 15px rgba(4,77,132,.14),
              0 0 0 2px rgba(255,255,255,.3) !important;
          }

          .hero-responsive-logo .orbit-badge svg {
            width: 15px !important;
            height: 15px !important;
          }

          .hero-responsive-badge {
            max-width: 100% !important;
            margin-bottom: 9px !important;
            padding: 5px 8px !important;
            gap: 4px !important;
            font-size: 8px !important;
            line-height: 1.45 !important;
            white-space: normal !important;
          }

          .hero-responsive-content h1 {
            max-width: none !important;
            margin: 0 !important;
            font-size: clamp(21px, 6.7vw, 29px) !important;
            line-height: 1.3 !important;
          }

          .hero-responsive-content h1 > span {
            margin-inline: 4px !important;
          }

          .hero-responsive-content p {
            margin-top: 11px !important;
            font-size: 10.5px !important;
            line-height: 1.75 !important;
          }

          .hero-responsive-content > div:last-child {
            margin-top: 13px !important;
          }

          .hero-responsive-content > div:last-child button {
            min-height: 39px !important;
            padding: 8px 11px !important;
            border-radius: 13px !important;
            font-size: 10px !important;
            gap: 6px !important;
          }

          .hero-responsive-content > div:last-child button svg {
            width: 16px !important;
            height: 16px !important;
          }
        }

        /* الهواتف شديدة الصغر */
        @media (max-width: 360px) {
          .hero-responsive-layout {
            gap: 6px !important;
          }

          .hero-responsive-logo {
            flex-basis: 102px !important;
            --orbit-radius: 44px !important;
            width: 102px !important;
            max-width: 102px !important;
            min-width: 102px !important;
            min-height: 132px !important;
            height: 132px !important;
          }

          .hero-responsive-logo .orbit-canvas {
            width: 116px !important;
            height: 116px !important;
          }

          .hero-responsive-logo .logo-core {
            width: 72px !important;
            height: 72px !important;
          }

          .hero-responsive-logo .logo-aura {
            width: 84px !important;
            height: 84px !important;
          }

          .hero-responsive-logo .orbit-badge {
            width: 25px !important;
            height: 25px !important;
          }

          .hero-responsive-content h1 {
            font-size: 20px !important;
          }

          .hero-responsive-content p {
            font-size: 9.7px !important;
            line-height: 1.65 !important;
          }

          .hero-responsive-badge {
            font-size: 7.3px !important;
          }
        }

        @media (min-width: 640px) {
          .tibyan-logo-stage {
            --orbit-radius: 180px;
          }

          .orbit-badge {
            width: 64px;
            height: 64px;
          }
        }

        @media (max-width: 760px) {
          .hero-shell {
            margin-top: 0 !important;
            padding: 18px 12px 20px !important;
            border-radius: 23px !important;
          }
        }

        


        /* البطاقة الرئيسية ممتدة على الجوال ومتوازنة على الكمبيوتر */
        .home-full-hero {
          width: 100%;
        }

        @media (max-width: 760px) {
          .home-page-content {
            padding-right: 14px !important;
            padding-left: 14px !important;
          }

          .home-full-hero {
            width: calc(100% + 28px) !important;
            margin-right: -14px !important;
            margin-left: -14px !important;
            border-right: 0 !important;
            border-left: 0 !important;
            border-radius: 0 0 26px 26px !important;
          }
        }

        @media (max-width: 430px) {
          .home-page-content {
            padding-right: 10px !important;
            padding-left: 10px !important;
          }

          .home-full-hero {
            width: calc(100% + 20px) !important;
            margin-right: -10px !important;
            margin-left: -10px !important;
            border-radius: 0 0 23px 23px !important;
          }
        }

        @media (min-width: 761px) and (max-width: 1100px) {
          .home-full-hero {
            width: 100%;
            border-radius: 30px !important;
          }
        }

        @media (min-width: 1101px) {
          .home-page-content {
            max-width: 1480px !important;
          }

          .home-full-hero {
            min-height: 520px;
            display: flex;
            align-items: center;
          }

          .home-full-hero .hero-responsive-layout {
            width: 100%;
          }
        }


        /* ضبط حقيقي لمقاس الكمبيوتر */
        @media (min-width: 1101px) {
          .home-page-content {
            max-width: 1280px !important;
            padding-right: 28px !important;
            padding-left: 28px !important;
          }

          .home-full-hero {
            min-height: 410px !important;
            max-height: 470px !important;
            padding: 34px 42px !important;
            border-radius: 30px !important;
          }

          .home-full-hero .hero-responsive-layout {
            grid-template-columns: 1.08fr .92fr !important;
            gap: 34px !important;
          }

          .home-full-hero .hero-responsive-content h1 {
            font-size: clamp(40px, 4vw, 54px) !important;
            line-height: 1.22 !important;
          }

          .home-full-hero .hero-responsive-content p {
            max-width: 680px !important;
            margin-top: 18px !important;
            font-size: 15px !important;
            line-height: 1.9 !important;
          }

          .home-full-hero .hero-responsive-badge {
            margin-bottom: 14px !important;
            padding: 7px 12px !important;
            font-size: 10px !important;
          }

          .home-full-hero .hero-responsive-content > div:last-child {
            margin-top: 22px !important;
          }

          .home-full-hero .hero-responsive-content > div:last-child button {
            min-height: 46px !important;
            padding: 10px 18px !important;
            border-radius: 15px !important;
            font-size: 12px !important;
          }

          .home-full-hero .hero-responsive-logo {
            min-height: 320px !important;
            max-width: 390px !important;
          }

          .home-full-hero .hero-responsive-logo .orbit-canvas {
            width: 300px !important;
            height: 300px !important;
          }

          .home-full-hero .hero-responsive-logo {
            --orbit-radius: 126px !important;
          }

          .home-full-hero .hero-responsive-logo .logo-core {
            width: 190px !important;
            height: 190px !important;
          }

          .home-full-hero .hero-responsive-logo .logo-aura {
            width: 230px !important;
            height: 230px !important;
          }

          .home-full-hero .hero-responsive-logo .orbit-badge {
            width: 46px !important;
            height: 46px !important;
            border-radius: 14px !important;
          }

          .home-full-hero .hero-responsive-logo .orbit-badge svg {
            width: 23px !important;
            height: 23px !important;
          }
        }

        @media (min-width: 761px) and (max-width: 1100px) {
          .home-page-content {
            max-width: 980px !important;
            padding-right: 20px !important;
            padding-left: 20px !important;
          }

          .home-full-hero {
            min-height: 360px !important;
            padding: 28px 30px !important;
          }

          .home-full-hero .hero-responsive-layout {
            grid-template-columns: 1fr .85fr !important;
            gap: 24px !important;
          }

          .home-full-hero .hero-responsive-content h1 {
            font-size: clamp(34px, 4.5vw, 46px) !important;
          }

          .home-full-hero .hero-responsive-logo {
            min-height: 280px !important;
          }

          .home-full-hero .hero-responsive-logo .orbit-canvas {
            width: 260px !important;
            height: 260px !important;
          }

          .home-full-hero .hero-responsive-logo {
            --orbit-radius: 108px !important;
          }

          .home-full-hero .hero-responsive-logo .logo-core {
            width: 165px !important;
            height: 165px !important;
          }

          .home-full-hero .hero-responsive-logo .orbit-badge {
            width: 42px !important;
            height: 42px !important;
          }

          .home-full-hero .hero-responsive-logo .orbit-badge svg {
            width: 21px !important;
            height: 21px !important;
          }
        }


        /* =========================================================
           بوابة الخدمات المختصرة والشريط السفلي الفاخر
        ========================================================= */
        .home-page-content {
          padding-bottom: 170px !important;
        }

        .tibyan-services-intro {
          position: relative;
          isolation: isolate;
          min-height: 116px;
          display: grid;
          grid-template-columns: minmax(0, .9fr) minmax(280px, 1.1fr);
          align-items: center;
          gap: 26px;
          overflow: hidden;
          padding: 24px 28px;
          border: 1px solid rgba(8, 118, 217, .10);
          border-radius: 26px;
          background:
            linear-gradient(130deg, rgba(255,255,255,.94), rgba(241,251,255,.88)),
            radial-gradient(circle at 92% 10%, rgba(18,183,189,.12), transparent 38%);
          box-shadow: 0 18px 52px rgba(3, 77, 132, .08);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .tibyan-services-intro::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: .55;
          background-image:
            linear-gradient(rgba(8,118,217,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,118,217,.025) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent);
        }

        .tibyan-services-intro-copy p {
          margin: 0;
          color: #10a4a9;
          font-size: 13px;
          font-weight: 900;
        }

        .tibyan-services-intro-copy h2 {
          margin: 7px 0 0;
          color: #064c91;
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.35;
          font-weight: 950;
          letter-spacing: -.02em;
        }

        .tibyan-services-intro-note {
          position: relative;
          z-index: 2;
          margin: 0;
          padding-inline-start: 42px;
          color: #6289a2;
          font-size: 13px;
          line-height: 1.9;
          font-weight: 700;
        }

        .tibyan-services-intro-note::before {
          content: "";
          position: absolute;
          top: 50%;
          inset-inline-start: 0;
          width: 28px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #0876d9, #12b7bd, #38c96f);
          box-shadow: 0 0 16px rgba(18,183,189,.34);
        }

        .tibyan-services-path {
          position: absolute;
          inset-inline-end: 24px;
          bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: .55;
        }

        .tibyan-services-path::before {
          content: "";
          position: absolute;
          inset-inline: 4px;
          top: 50%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(8,118,217,.36), rgba(18,183,189,.42), transparent);
        }

        .tibyan-services-path span {
          position: relative;
          z-index: 1;
          width: 7px;
          height: 7px;
          border: 2px solid #fff;
          border-radius: 50%;
          background: #0caab8;
          box-shadow: 0 4px 10px rgba(3,77,132,.18);
        }

        .tibyan-services-path span.is-center {
          width: 11px;
          height: 11px;
          background: #38c96f;
          box-shadow: 0 0 0 5px rgba(56,201,111,.10), 0 5px 14px rgba(3,77,132,.20);
        }

        .tibyan-luxury-dock {
          position: fixed;
          left: 50%;
          bottom: max(14px, env(safe-area-inset-bottom));
          z-index: 120;
          width: min(calc(100% - 24px), 940px);
          transform: translateX(-50%);
          pointer-events: none;
          direction: rtl;
        }

        .tibyan-dock-frame {
          position: relative;
          min-height: 86px;
          padding: 10px 18px 9px;
          overflow: visible;
          border: 1px solid rgba(255,255,255,.96);
          border-radius: 31px;
          background:
            linear-gradient(135deg, rgba(255,255,255,.95), rgba(246,252,255,.88)),
            radial-gradient(circle at 50% -20%, rgba(18,183,189,.16), transparent 45%);
          box-shadow:
            0 28px 75px rgba(3, 57, 99, .19),
            0 8px 24px rgba(8, 118, 217, .08),
            inset 0 1px 0 rgba(255,255,255,.96),
            inset 0 -1px 0 rgba(8,118,217,.05);
          backdrop-filter: blur(28px) saturate(1.32);
          -webkit-backdrop-filter: blur(28px) saturate(1.32);
          pointer-events: auto;
          isolation: isolate;
        }

        .tibyan-dock-frame::before {
          content: "";
          position: absolute;
          inset: 5px;
          z-index: -1;
          border: 1px solid rgba(8,118,217,.045);
          border-radius: 25px;
          pointer-events: none;
        }

        .tibyan-dock-frame::after {
          content: "";
          position: absolute;
          left: 50%;
          top: -24px;
          z-index: -2;
          width: 132px;
          height: 54px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(18,183,189,.24), rgba(8,118,217,.08) 48%, transparent 72%);
          filter: blur(13px);
          transform: translateX(-50%);
          pointer-events: none;
        }

        .tibyan-dock-sheen {
          position: absolute;
          top: 0;
          right: 9%;
          left: 9%;
          z-index: 0;
          height: 1px;
          overflow: hidden;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(8,118,217,.20), rgba(18,183,189,.34), rgba(56,201,111,.24), transparent);
        }

        .tibyan-dock-sheen::after {
          content: "";
          position: absolute;
          inset-block: 0;
          width: 24%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.96), transparent);
          animation: tibyanDockSheen 5.6s ease-in-out infinite;
        }

        .tibyan-dock-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          align-items: end;
          gap: 6px;
          direction: rtl;
        }

        .tibyan-dock-item {
          --dock-accent: #0876d9;
          --dock-accent-secondary: #0caab8;
          position: relative;
          min-width: 0;
          min-height: 66px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
          padding: 7px 5px 4px;
          border: 0;
          border-radius: 20px;
          background: transparent;
          color: #547c95;
          cursor: pointer;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          transition:
            color .24s ease,
            background .24s ease,
            transform .24s cubic-bezier(.2,.8,.2,1),
            box-shadow .24s ease;
        }

        .tibyan-dock-item::before {
          content: "";
          position: absolute;
          inset: 3px;
          z-index: -1;
          border-radius: 17px;
          background: linear-gradient(145deg, color-mix(in srgb, var(--dock-accent) 8%, transparent), transparent 72%);
          opacity: 0;
          transform: scale(.90);
          transition: opacity .24s ease, transform .24s ease;
        }

        @supports not (background: color-mix(in srgb, red, blue)) {
          .tibyan-dock-item::before {
            background: linear-gradient(145deg, rgba(8,118,217,.08), transparent 72%);
          }
        }

        .tibyan-dock-item:hover,
        .tibyan-dock-item:focus-visible {
          color: var(--dock-accent);
          transform: translateY(-4px);
        }

        .tibyan-dock-item:hover::before,
        .tibyan-dock-item:focus-visible::before {
          opacity: 1;
          transform: scale(1);
        }

        .tibyan-dock-item:focus-visible {
          outline: 3px solid rgba(8,118,217,.18);
          outline-offset: 2px;
        }

        .tibyan-dock-item:active {
          transform: translateY(-1px) scale(.97);
        }

        .tibyan-dock-icon-shell {
          position: relative;
          width: 46px;
          height: 46px;
          flex: 0 0 46px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.95);
          border-radius: 16px;
          background:
            linear-gradient(145deg, rgba(255,255,255,.98), rgba(239,249,253,.92));
          box-shadow:
            0 11px 24px rgba(3,77,132,.10),
            inset 0 0 0 1px rgba(8,118,217,.045);
          transition: transform .28s cubic-bezier(.2,.8,.2,1), box-shadow .28s ease;
        }

        .tibyan-dock-icon-shell::after {
          content: "";
          position: absolute;
          inset: auto 9px -4px;
          height: 7px;
          border-radius: 50%;
          background: var(--dock-accent);
          opacity: .13;
          filter: blur(5px);
          transform: scaleX(.7);
          transition: opacity .25s ease, transform .25s ease;
        }

        .tibyan-dock-icon {
          width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          color: var(--dock-accent);
        }

        .tibyan-dock-icon svg {
          width: 100%;
          height: 100%;
        }

        .tibyan-dock-item:hover .tibyan-dock-icon-shell,
        .tibyan-dock-item:focus-visible .tibyan-dock-icon-shell {
          transform: translateY(-3px) rotate(-2deg) scale(1.06);
          box-shadow:
            0 16px 30px rgba(3,77,132,.15),
            0 0 0 5px rgba(255,255,255,.55),
            inset 0 0 0 1px rgba(8,118,217,.055);
        }

        .tibyan-dock-item:hover .tibyan-dock-icon-shell::after,
        .tibyan-dock-item:focus-visible .tibyan-dock-icon-shell::after {
          opacity: .24;
          transform: scaleX(1);
        }

        .tibyan-dock-label {
          width: 100%;
          overflow: hidden;
          color: currentColor;
          font-size: 10.5px;
          line-height: 1.25;
          font-weight: 900;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: color .22s ease;
        }

        .tibyan-dock-item.is-home {
          min-height: 78px;
          margin-top: -36px;
          padding-top: 0;
          color: #0876d9;
          transform: translateY(-1px);
        }

        .tibyan-dock-item.is-home::before {
          inset: 20px 3px 2px;
          opacity: .72;
          background: linear-gradient(180deg, rgba(8,118,217,.06), rgba(18,183,189,.025));
          transform: none;
        }

        .tibyan-dock-item.is-home:hover,
        .tibyan-dock-item.is-home:focus-visible {
          transform: translateY(-5px);
        }

        .tibyan-dock-item.is-home .tibyan-dock-icon-shell {
          width: 78px;
          height: 78px;
          flex-basis: 78px;
          overflow: visible;
          border: 7px solid rgba(255,255,255,.98);
          border-radius: 50%;
          background:
            radial-gradient(circle at 42% 32%, #ffffff 0 36%, #effaff 72%, #e6f8f5 100%);
          box-shadow:
            0 23px 46px rgba(3,77,132,.22),
            0 0 0 1px rgba(8,118,217,.12),
            0 0 0 8px rgba(255,255,255,.42),
            inset 0 0 25px rgba(18,183,189,.08);
          animation: tibyanDockHomeFloat 4.5s ease-in-out infinite;
        }

        .tibyan-dock-item.is-home .tibyan-dock-icon-shell::before {
          content: "";
          position: absolute;
          inset: -12px;
          z-index: -1;
          border: 1px dashed rgba(8,118,217,.24);
          border-radius: 50%;
          background:
            conic-gradient(from 90deg, transparent 0 22%, rgba(18,183,189,.32) 28%, transparent 36% 63%, rgba(56,201,111,.26) 70%, transparent 78%);
          mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px));
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px));
          animation: tibyanDockOrbit 12s linear infinite;
        }

        .tibyan-dock-item.is-home .tibyan-dock-icon-shell::after {
          inset: auto 12px -9px;
          height: 12px;
          opacity: .25;
          background: linear-gradient(90deg, var(--dock-accent), var(--dock-accent-secondary));
          filter: blur(7px);
        }

        .tibyan-dock-item.is-home .tibyan-dock-icon {
          width: 61px;
          height: 61px;
          overflow: visible;
          color: inherit;
        }

        .tibyan-dock-home-logo {
          width: 100%;
          height: 100%;
          overflow: visible;
          filter: drop-shadow(0 8px 12px rgba(3,82,143,.14));
        }

        .tibyan-dock-item.is-home .tibyan-dock-label {
          margin-top: -1px;
          color: #075dab;
          font-size: 11px;
        }

        .tibyan-dock-active-dot {
          position: absolute;
          left: 50%;
          bottom: -2px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38c96f;
          box-shadow: 0 0 0 4px rgba(56,201,111,.12), 0 0 14px rgba(56,201,111,.45);
          transform: translateX(-50%);
          animation: tibyanDockActivePulse 2.2s ease-in-out infinite;
        }

        .tibyan-dock-tooltip {
          position: absolute;
          left: 50%;
          bottom: calc(100% + 16px);
          z-index: 20;
          width: min(235px, 44vw);
          display: grid;
          gap: 4px;
          padding: 12px 13px;
          border: 1px solid rgba(255,255,255,.96);
          border-radius: 17px;
          background: rgba(255,255,255,.96);
          color: #315f7a;
          box-shadow: 0 20px 50px rgba(3,57,99,.18);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translate(-50%, 10px) scale(.96);
          transform-origin: 50% 100%;
          transition: opacity .2s ease, transform .2s ease, visibility .2s ease;
        }

        .tibyan-dock-tooltip::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 12px;
          height: 12px;
          border-right: 1px solid rgba(255,255,255,.96);
          border-bottom: 1px solid rgba(255,255,255,.96);
          background: rgba(255,255,255,.96);
          transform: translateX(-50%) rotate(45deg);
        }

        .tibyan-dock-tooltip strong {
          color: #075dab;
          font-size: 12px;
          line-height: 1.5;
          font-weight: 950;
        }

        .tibyan-dock-tooltip small {
          color: #668ba2;
          font-size: 9.5px;
          line-height: 1.7;
          font-weight: 700;
        }

        .tibyan-dock-tooltip em {
          width: max-content;
          max-width: 100%;
          margin-top: 3px;
          padding: 4px 8px;
          border-radius: 999px;
          background: linear-gradient(145deg, rgba(8,118,217,.08), rgba(18,183,189,.09));
          color: var(--dock-accent);
          font-size: 8px;
          font-style: normal;
          font-weight: 900;
        }

        .tibyan-dock-item:hover .tibyan-dock-tooltip,
        .tibyan-dock-item:focus-visible .tibyan-dock-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, 0) scale(1);
        }

        .tibyan-dock-grid > .tibyan-dock-item:first-child .tibyan-dock-tooltip {
          right: 0;
          left: auto;
          transform: translateY(10px) scale(.96);
          transform-origin: 100% 100%;
        }

        .tibyan-dock-grid > .tibyan-dock-item:first-child:hover .tibyan-dock-tooltip,
        .tibyan-dock-grid > .tibyan-dock-item:first-child:focus-visible .tibyan-dock-tooltip {
          transform: translateY(0) scale(1);
        }

        .tibyan-dock-grid > .tibyan-dock-item:first-child .tibyan-dock-tooltip::after {
          right: 22px;
          left: auto;
          transform: rotate(45deg);
        }

        .tibyan-dock-grid > .tibyan-dock-item:last-child .tibyan-dock-tooltip {
          right: auto;
          left: 0;
          transform: translateY(10px) scale(.96);
          transform-origin: 0 100%;
        }

        .tibyan-dock-grid > .tibyan-dock-item:last-child:hover .tibyan-dock-tooltip,
        .tibyan-dock-grid > .tibyan-dock-item:last-child:focus-visible .tibyan-dock-tooltip {
          transform: translateY(0) scale(1);
        }

        .tibyan-dock-grid > .tibyan-dock-item:last-child .tibyan-dock-tooltip::after {
          right: auto;
          left: 22px;
          transform: rotate(45deg);
        }

        @keyframes tibyanDockSheen {
          0%, 12% { right: -28%; opacity: 0; }
          24% { opacity: .8; }
          54% { opacity: .8; }
          68%, 100% { right: 104%; opacity: 0; }
        }

        @keyframes tibyanDockHomeFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(.8deg); }
        }

        @keyframes tibyanDockOrbit {
          to { transform: rotate(360deg); }
        }

        @keyframes tibyanDockActivePulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 1; }
          50% { transform: translateX(-50%) scale(.72); opacity: .58; }
        }

        @media (min-width: 1101px) {
          .tibyan-luxury-dock {
            width: min(calc(100% - 40px), 920px);
            bottom: max(18px, env(safe-area-inset-bottom));
          }

          .tibyan-dock-frame {
            min-height: 92px;
            padding-inline: 24px;
          }

          .tibyan-dock-icon-shell {
            width: 49px;
            height: 49px;
            flex-basis: 49px;
          }

          .tibyan-dock-label {
            font-size: 11px;
          }

          .tibyan-dock-item.is-home .tibyan-dock-icon-shell {
            width: 84px;
            height: 84px;
            flex-basis: 84px;
          }

          .tibyan-dock-item.is-home .tibyan-dock-icon {
            width: 66px;
            height: 66px;
          }
        }

        @media (max-width: 760px) {
          .home-page-content {
            padding-bottom: calc(136px + env(safe-area-inset-bottom)) !important;
          }

          .tibyan-services-intro {
            min-height: 0;
            grid-template-columns: 1fr;
            gap: 10px;
            margin-top: 26px !important;
            padding: 18px 16px 26px;
            border-radius: 21px;
          }

          .tibyan-services-intro-copy h2 {
            font-size: 21px;
          }

          .tibyan-services-intro-note {
            padding-inline-start: 0;
            font-size: 10px;
            line-height: 1.8;
          }

          .tibyan-services-intro-note::before {
            display: none;
          }

          .tibyan-services-path {
            inset-inline-end: 16px;
            bottom: 10px;
          }

          .tibyan-luxury-dock {
            width: calc(100% - 12px);
            bottom: max(6px, env(safe-area-inset-bottom));
          }

          .tibyan-dock-frame {
            min-height: 78px;
            padding: 8px 5px 7px;
            border-radius: 25px;
            box-shadow:
              0 18px 48px rgba(3,57,99,.20),
              0 5px 16px rgba(8,118,217,.08),
              inset 0 1px 0 rgba(255,255,255,.95);
            backdrop-filter: blur(22px) saturate(1.26);
            -webkit-backdrop-filter: blur(22px) saturate(1.26);
          }

          .tibyan-dock-frame::before {
            inset: 4px;
            border-radius: 20px;
          }

          .tibyan-dock-grid {
            gap: 1px;
          }

          .tibyan-dock-item {
            min-height: 61px;
            gap: 4px;
            padding: 6px 2px 3px;
            border-radius: 16px;
          }

          .tibyan-dock-icon-shell {
            width: 39px;
            height: 39px;
            flex-basis: 39px;
            border-radius: 13px;
          }

          .tibyan-dock-icon {
            width: 20px;
            height: 20px;
          }

          .tibyan-dock-label {
            font-size: 8.4px;
            letter-spacing: -.02em;
          }

          .tibyan-dock-item.is-home {
            min-height: 70px;
            margin-top: -28px;
          }

          .tibyan-dock-item.is-home .tibyan-dock-icon-shell {
            width: 67px;
            height: 67px;
            flex-basis: 67px;
            border-width: 6px;
            box-shadow:
              0 18px 34px rgba(3,77,132,.21),
              0 0 0 1px rgba(8,118,217,.10),
              0 0 0 6px rgba(255,255,255,.38),
              inset 0 0 20px rgba(18,183,189,.08);
          }

          .tibyan-dock-item.is-home .tibyan-dock-icon-shell::before {
            inset: -9px;
          }

          .tibyan-dock-item.is-home .tibyan-dock-icon {
            width: 53px;
            height: 53px;
          }

          .tibyan-dock-item.is-home .tibyan-dock-label {
            font-size: 8.8px;
          }

          .tibyan-dock-active-dot {
            width: 5px;
            height: 5px;
            bottom: -1px;
          }

          .tibyan-dock-tooltip {
            display: none;
          }
        }

        @media (max-width: 390px) {
          .tibyan-luxury-dock {
            width: calc(100% - 8px);
          }

          .tibyan-dock-frame {
            padding-inline: 2px;
          }

          .tibyan-dock-icon-shell {
            width: 35px;
            height: 35px;
            flex-basis: 35px;
            border-radius: 12px;
          }

          .tibyan-dock-icon {
            width: 18px;
            height: 18px;
          }

          .tibyan-dock-label {
            font-size: 7.4px;
          }

          .tibyan-dock-item.is-home .tibyan-dock-icon-shell {
            width: 61px;
            height: 61px;
            flex-basis: 61px;
          }

          .tibyan-dock-item.is-home .tibyan-dock-icon {
            width: 48px;
            height: 48px;
          }
        }


        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .001ms !important;
          }
        }
      `}</style>
    </main>
  );
}
