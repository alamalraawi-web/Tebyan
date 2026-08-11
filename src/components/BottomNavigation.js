import { useLocation, useNavigate } from "react-router-dom";

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

const bottomNavigationItems = [
  {
    id: "labs",
    title: "الفحوصات والمختبرات",
    shortTitle: "الفحوصات",
    description: "فحوصات ومختبرات متكاملة لعرض النتائج وإدارتها.",
    href: "/main/labs",
    badge: "5 فحوصات ذكية",
    icon: LabIcon,
    accent: "#0876d9",
    accentSecondary: "#0caab8",
  },
  {
    id: "nutrition",
    title: "التغذية العلاجية الذكية",
    shortTitle: "التغذية",
    description: "خطط غذائية علاجية مخصصة ومتابعة صحية تناسب احتياجاتك.",
    href: "/main/scans",
    badge: "خطة مخصصة",
    icon: NutritionIcon,
    accent: "#24b979",
    accentSecondary: "#0caab8",
  },
  {
    id: "home",
    title: "الرئيسية",
    shortTitle: "الرئيسية",
    description: "صحتك أوضح مع تبيان.",
    href: "/home",
    icon: HomeIcon,
    accent: "#0876d9",
    accentSecondary: "#35c86f",
    featured: true,
  },
  {
    id: "pharmacy",
    title: "الصيدلية الذكية",
    shortTitle: "الصيدلية",
    description: "البحث عن الأدوية والبدائل ومتابعة الطلبات.",
    href: "/main/pharmacy",
    badge: "بحث فوري",
    icon: PharmacyIcon,
    accent: "#0b9fa7",
    accentSecondary: "#0876d9",
  },
  {
    id: "consultations",
    title: "الاستشارات والمواعيد",
    shortTitle: "الاستشارات",
    description: "حجز واستشارات طبية مع الأطباء والمختصين.",
    href: "/main/consultations",
    badge: "حجز سريع",
    icon: ConsultationIcon,
    accent: "#35bd70",
    accentSecondary: "#0caab8",
  },
];

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  function isActive(item) {
    if (item.id === "home") {
      return ["/", "/home", "/main"].includes(location.pathname);
    }

    return location.pathname.startsWith(item.href);
  }

  function openPage(item) {
    if (item.id === "home" && isActive(item)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate(item.href);
  }

  return (
    <>
      <nav
        className="tibyan-luxury-dock"
        dir="rtl"
        aria-label="شريط التنقل السفلي لخدمات تبيان"
      >
        <div className="tibyan-dock-frame">
          <span className="tibyan-dock-sheen" aria-hidden="true" />

          <div className="tibyan-dock-grid">
            {bottomNavigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              const isHome = item.id === "home";
              const accessibleDescription = item.badge
                ? `${item.title}. ${item.description} ${item.badge}.`
                : `${item.title}. ${item.description}`;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={[
                    "tibyan-dock-item",
                    active ? "is-featured" : "",
                    active ? "is-active" : "",
                  ].filter(Boolean).join(" ")}
                  onClick={() => openPage(item)}
                  aria-current={active ? "page" : undefined}
                  aria-label={accessibleDescription}
                  title={accessibleDescription}
                  style={{
                    "--dock-accent": item.accent,
                    "--dock-accent-secondary": item.accentSecondary,
                  }}
                >
                  <span className="tibyan-dock-tooltip" aria-hidden="true">
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                    {item.badge && <em>{item.badge}</em>}
                  </span>

                  <span className="tibyan-dock-icon-shell" aria-hidden="true">
                    <span className="tibyan-dock-icon">
                      {isHome ? (
                        <TibyanLogo className="tibyan-dock-home-logo" />
                      ) : (
                        <Icon />
                      )}
                    </span>
                  </span>

                  <span className="tibyan-dock-label">{item.shortTitle}</span>

                  {active && (
                    <span
                      className="tibyan-dock-active-dot"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <style>{`
        .tibyan-luxury-dock,
        .tibyan-luxury-dock * {
          box-sizing: border-box;
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

        .tibyan-dock-item.is-featured {
          min-height: 78px;
          margin-top: -36px;
          padding-top: 0;
          color: #0876d9;
          transform: translateY(-1px);
        }

        .tibyan-dock-item.is-featured::before {
          inset: 20px 3px 2px;
          opacity: .72;
          background: linear-gradient(180deg, rgba(8,118,217,.06), rgba(18,183,189,.025));
          transform: none;
        }

        .tibyan-dock-item.is-featured:hover,
        .tibyan-dock-item.is-featured:focus-visible {
          transform: translateY(-5px);
        }

        .tibyan-dock-item.is-featured .tibyan-dock-icon-shell {
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

        .tibyan-dock-item.is-featured .tibyan-dock-icon-shell::before {
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

        .tibyan-dock-item.is-featured .tibyan-dock-icon-shell::after {
          inset: auto 12px -9px;
          height: 12px;
          opacity: .25;
          background: linear-gradient(90deg, var(--dock-accent), var(--dock-accent-secondary));
          filter: blur(7px);
        }

        .tibyan-dock-item.is-featured .tibyan-dock-icon {
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

        .tibyan-dock-item.is-featured:not([aria-label^="الرئيسية"])
          .tibyan-dock-icon {
          width: 34px;
          height: 34px;
          color: var(--dock-accent);
        }

        .tibyan-dock-item.is-featured:not([aria-label^="الرئيسية"])
          .tibyan-dock-icon svg {
          width: 100%;
          height: 100%;
        }

        .tibyan-dock-item.is-featured .tibyan-dock-label {
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

          .tibyan-dock-item.is-featured .tibyan-dock-icon-shell {
            width: 84px;
            height: 84px;
            flex-basis: 84px;
          }

          .tibyan-dock-item.is-featured .tibyan-dock-icon {
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

          .tibyan-dock-item.is-featured {
            min-height: 70px;
            margin-top: -28px;
          }

          .tibyan-dock-item.is-featured .tibyan-dock-icon-shell {
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

          .tibyan-dock-item.is-featured .tibyan-dock-icon-shell::before {
            inset: -9px;
          }

          .tibyan-dock-item.is-featured .tibyan-dock-icon {
            width: 53px;
            height: 53px;
          }

          .tibyan-dock-item.is-featured .tibyan-dock-label {
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

          .tibyan-dock-item.is-featured .tibyan-dock-icon-shell {
            width: 61px;
            height: 61px;
            flex-basis: 61px;
          }

          .tibyan-dock-item.is-featured .tibyan-dock-icon {
            width: 48px;
            height: 48px;
          }
        }

        .tibyan-dock-item.is-active {
          color: var(--dock-accent);
        }

        .tibyan-dock-item.is-active::before {
          opacity: 1;
          transform: scale(1);
        }

        .tibyan-dock-item.is-active .tibyan-dock-icon-shell {
          box-shadow:
            0 16px 30px rgba(3,77,132,.15),
            0 0 0 5px rgba(255,255,255,.55),
            inset 0 0 0 1px rgba(8,118,217,.055);
        }

        .tibyan-dock-item.is-active:not(.is-featured)
          .tibyan-dock-icon-shell {
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
