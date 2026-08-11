import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TibyanAI from "./TibyanAI";

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

function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10M9 20v-6h6v6" />
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

function LogoutIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" {...props}>
      <path d="M10 17l5-5-5-5M15 12H3" />
      <path d="M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 7h14M5 12h14M5 17h14" />
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

export function TibyanLogo({ className = "" }) {
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

function normalizePath(path) {
  const normalized = String(path || "/").replace(/\/+$/, "");
  return normalized || "/";
}

/**
 * الشريط العلوي الموحد لمشروع تبيان.
 * يوضع داخل src/components بجانب TibyanAI.js.
 */
export default function TibyanHeader({
  homePath = "/main",
  reserveSpace = true,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentPath = normalizePath(location.pathname);
  const normalizedHomePath = normalizePath(homePath);
  const isHomePage = currentPath === normalizedHomePath;

  useEffect(() => {
    document.body.classList.add("tibyan-shared-header-active");

    return () => {
      document.body.classList.remove("tibyan-shared-header-active");
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (mobileMenuOpen && !headerRef.current?.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const goHome = () => {
    setMobileMenuOpen(false);

    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate(homePath);
  };

  const goToReports = () => {
    setMobileMenuOpen(false);

    if (isHomePage) {
      document.getElementById("daily-reports")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    sessionStorage.setItem("tibyan-scroll-target", "daily-reports");
    navigate(homePath);
  };

  const goTo = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const logout = () => {
    localStorage.removeItem("tebyan-user");
    localStorage.removeItem("tebyan-profile");
    sessionStorage.clear();
    setMobileMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const menuItems = [
    ["الفحوصات والمختبرات", LabIcon, () => goTo("/main/labs")],
    ["التغذية العلاجية", NutritionIcon, () => goTo("/main/scans")],
    ["الرئيسية", HomeIcon, goHome],
    ["الصيدلية الذكية", PharmacyIcon, () => goTo("/main/pharmacy")],
    ["الاستشارات والمواعيد", ConsultationIcon, () => goTo("/main/consultations")],
    ["التقارير اليومية", ReportIcon, goToReports],
  ];

  return (
    <>
      <header
        ref={headerRef}
        dir="rtl"
        className="tibyan-shared-header home-icon-topbar"
        aria-label="التنقل الرئيسي"
      >
        <button
          type="button"
          className="home-brand-button"
          onClick={goHome}
          aria-label="الصفحة الرئيسية"
        >
          <span className="home-brand-logo"><TibyanLogo /></span>
          <span className="home-brand-copy">
            <strong>تبيان</strong>
            <small>صحتك أوضح</small>
          </span>
        </button>

        <div className="home-top-actions">
          <TibyanAI variant="header" />

          <button
            type="button"
            className={`home-mobile-menu-button ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="tibyan-shared-mobile-menu"
            aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <div
          id="tibyan-shared-mobile-menu"
          className={`home-mobile-menu ${mobileMenuOpen ? "open" : ""}`}
        >
          {menuItems.map(([label, Icon, action]) => (
            <button key={label} type="button" onClick={action}>
              <span><Icon /></span>
              <strong>{label}</strong>
              <ArrowIcon />
            </button>
          ))}

          <button
            type="button"
            className="mobile-menu-logout"
            onClick={logout}
          >
            <span><LogoutIcon /></span>
            <strong>تسجيل الخروج</strong>
            <ArrowIcon />
          </button>
        </div>
      </header>

      {reserveSpace && <div className="tibyan-shared-header-spacer" aria-hidden="true" />}

      <style>{`
        body.tibyan-shared-header-active .tibyan-header-wrap {
          display: none !important;
        }

        .home-icon-topbar,
        .home-icon-topbar * {
          box-sizing: border-box;
        }

        .home-icon-topbar {
          position: fixed !important;
          top: 6px !important;
          right: 50% !important;
          z-index: 100 !important;
          width: min(calc(100% - 12px), 1180px) !important;
          min-height: 58px !important;
          margin: 0 !important;
          padding: 6px 8px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 8px !important;
          direction: rtl;
          border: 1px solid rgba(7, 92, 145, 0.12);
          border-radius: 18px !important;
          background: rgba(255,255,255,.96) !important;
          box-shadow: 0 14px 36px rgba(3,66,112,.13) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transform: translateX(50%) !important;
          font-family: var(--font-tibyan), "IBM Plex Sans Arabic", Tahoma, Arial, sans-serif;
        }

        .home-icon-topbar button {
          font: inherit;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .home-brand-button {
          width: auto;
          min-width: 150px;
          height: 56px;
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
          padding: 4px 7px;
          border: 0;
          border-radius: 18px;
          background: transparent;
          text-align: right;
        }

        .home-brand-logo {
          width: 54px;
          height: 54px;
          flex: 0 0 54px;
          display: block;
          animation: homeHeaderLogoFloat 4.6s ease-in-out infinite;
        }

        .home-brand-logo svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
          opacity: 1;
          shape-rendering: geometricPrecision;
          text-rendering: geometricPrecision;
          vector-effect: non-scaling-stroke;
        }

        .home-brand-copy {
          min-width: 0;
          display: grid;
          gap: 1px;
          line-height: 1;
        }

        .home-brand-copy strong {
          display: block;
          color: #075dab;
          font-size: 20px;
          font-weight: 900;
          line-height: 1.15;
        }

        .home-brand-copy small {
          color: #59a0ae;
          font-size: 9px;
          font-weight: 800;
        }

        .home-top-actions {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .tibyan-shared-header .home-nav-icon {
          position: relative;
          width: 44px;
          height: 44px;
          flex: 0 0 44px;
          display: grid;
          place-items: center;
          padding: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          color: #0876d9;
          box-shadow: none;
          cursor: pointer;
          transition: transform .2s ease, color .2s ease, background .2s ease, box-shadow .2s ease;
        }

        .tibyan-shared-header .home-nav-icon svg {
          width: 23px;
          height: 23px;
        }

        .tibyan-shared-header .home-nav-icon:hover,
        .tibyan-shared-header .home-nav-icon:focus-visible {
          transform: translateY(-3px);
          color: #0876d9;
          border-color: transparent;
          outline: none;
          background: transparent;
          box-shadow: none;
        }

        .home-mobile-menu-button {
          width: 38px;
          height: 38px;
          flex: 0 0 38px;
          display: grid !important;
          place-items: center;
          padding: 0;
          border: 1px solid rgba(8,118,217,.13);
          border-radius: 12px;
          background: linear-gradient(145deg,#fff,#eefbff);
          color: #0876d9;
          box-shadow: 0 8px 18px rgba(3,77,132,.09);
        }

        .home-mobile-menu-button.open {
          color: #fff;
          border-color: transparent;
          background: linear-gradient(145deg,#0876d9,#10b5b5);
        }

        .home-mobile-menu-button svg {
          width: 19px;
          height: 19px;
        }

        .home-mobile-menu {
          position: absolute;
          top: calc(100% + 7px);
          right: 0;
          left: 0;
          display: block !important;
          padding: 8px;
          border: 1px solid rgba(7,92,145,.10);
          border-radius: 18px;
          background: rgba(255,255,255,.98);
          box-shadow: 0 20px 50px rgba(3,66,112,.16);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          transform: translateY(-7px) scale(.98);
          transform-origin: top center;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: .22s ease;
        }

        .home-mobile-menu.open {
          transform: translateY(0) scale(1);
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .home-mobile-menu > button {
          width: 100%;
          min-height: 43px;
          display: grid;
          grid-template-columns: 34px 1fr 17px;
          align-items: center;
          gap: 8px;
          padding: 5px 7px;
          border: 0;
          border-radius: 12px;
          background: transparent;
          color: #315f7a;
          text-align: right;
        }

        .home-mobile-menu > button + button {
          margin-top: 2px;
        }

        .home-mobile-menu > button:hover,
        .home-mobile-menu > button:active {
          background: #eefaff;
          color: #0876d9;
        }

        .home-mobile-menu > button > span {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: linear-gradient(145deg,#eef8ff,#edfffb);
          color: #0876d9;
        }

        .home-mobile-menu > button > span svg {
          width: 17px;
          height: 17px;
        }

        .home-mobile-menu > button > strong {
          font-size: 10.5px;
          font-weight: 800;
        }

        .home-mobile-menu > button > svg {
          width: 14px;
          height: 14px;
          opacity: .55;
        }

        .home-mobile-menu .mobile-menu-logout {
          margin-top: 5px;
          border-top: 1px solid rgba(239,68,68,.10);
          color: #d93645;
        }

        .home-mobile-menu .mobile-menu-logout > span {
          background: #fff3f3;
          color: #d93645;
        }

        .tibyan-shared-header-spacer {
          width: 100%;
          height: 76px;
          flex: 0 0 76px;
          pointer-events: none;
        }

        .home-brand-logo .tibyan-heartbeat {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: tibyanSharedHeartbeatTrace 4.2s linear infinite;
          will-change: stroke-dashoffset, opacity;
        }

        .home-brand-logo .tibyan-leaf,
        .home-brand-logo .tibyan-head,
        .home-brand-logo .tibyan-blue-arc {
          animation: none;
        }

        @keyframes homeHeaderLogoFloat {
          0%,100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-2px) rotate(.6deg); }
        }

        @keyframes tibyanSharedHeartbeatTrace {
          0% { stroke-dashoffset: 260; opacity: .45; }
          38% { stroke-dashoffset: 0; opacity: 1; }
          72% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -260; opacity: .45; }
        }

        @media (max-width: 760px) {
          .home-icon-topbar {
            width: calc(100% - 12px) !important;
          }

          .home-brand-button {
            min-width: 108px !important;
            height: 42px !important;
            padding: 2px !important;
            gap: 7px !important;
          }

          .home-brand-logo {
            width: 36px !important;
            height: 36px !important;
            flex: 0 0 36px !important;
          }

          .home-brand-copy strong {
            font-size: 16px !important;
          }

          .home-brand-copy small {
            font-size: 7px !important;
          }

          .tibyan-shared-header .home-nav-icon {
            width: 40px;
            height: 40px;
            flex-basis: 40px;
            border-radius: 13px;
          }

          .tibyan-shared-header .home-nav-icon svg {
            width: 21px;
            height: 21px;
          }

          .tibyan-shared-header-spacer {
            height: 70px;
            flex-basis: 70px;
          }
        }

        @media (max-width: 390px) {
          .home-brand-button {
            min-width: 102px !important;
            gap: 6px !important;
          }

          .home-brand-logo {
            width: 34px !important;
            height: 34px !important;
            flex-basis: 34px !important;
          }

          .home-brand-copy strong {
            font-size: 15px !important;
          }

          .home-mobile-menu-button {
            width: 36px;
            height: 36px;
            flex-basis: 36px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-icon-topbar *,
          .home-icon-topbar *::before,
          .home-icon-topbar *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .001ms !important;
          }
        }
      `}</style>
    </>
  );
}
