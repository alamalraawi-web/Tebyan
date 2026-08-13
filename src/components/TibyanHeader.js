import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TibyanAI from "./TibyanAI";

const SETTINGS_STORAGE_KEY = "tibyan-app-settings-v1";
const AI_REST_DURATION_MS = 10_000;

const DEFAULT_SETTINGS = {
  language: "ar",
  theme: "system",
  largeText: false,
  highContrast: false,
  reducedMotion: false,
  dataSaver: false,
  hideSensitivePreview: true,
  lockOnBackground: true,
};

const LANGUAGE_DIRECTIONS = { ar: "rtl", en: "ltr", fr: "ltr", es: "ltr", de: "ltr", tr: "ltr", zh: "ltr" };

function readSavedSettings() {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const saved = JSON.parse(window.localStorage.getItem(SETTINGS_STORAGE_KEY) || "{}");
    return { ...DEFAULT_SETTINGS, ...saved };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function applySavedSettings(settings = readSavedSettings()) {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  const root = document.documentElement;
  const media = window.matchMedia?.("(prefers-color-scheme: dark)");
  const resolvedTheme = settings.theme === "system" ? (media?.matches ? "dark" : "light") : settings.theme;
  root.lang = settings.language || "ar";
  root.dir = LANGUAGE_DIRECTIONS[settings.language] || "rtl";
  root.dataset.tibyanTheme = resolvedTheme;
  root.style.colorScheme = resolvedTheme;
  root.classList.toggle("tibyan-text-large", Boolean(settings.largeText));
  root.classList.toggle("tibyan-high-contrast", Boolean(settings.highContrast));
  root.classList.toggle("tibyan-reduced-motion", Boolean(settings.reducedMotion));
  root.classList.toggle("tibyan-data-saver", Boolean(settings.dataSaver));
  root.classList.toggle("tibyan-hide-sensitive-preview", Boolean(settings.hideSensitivePreview));
  root.classList.toggle("tibyan-privacy-lock", Boolean(settings.lockOnBackground));
}

function SettingsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21h-4v-.08A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.87.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.64 15 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.64 1.7 1.7 0 0 0 10 3.08V3h4v.08A1.7 1.7 0 0 0 15 4.64a1.7 1.7 0 0 0 1.87-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.36 9 1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z" />
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

/**
 * الشريط العلوي الموحد لتبيان.
 * زر الإعدادات ينتقل مباشرة إلى صفحة /main/settings.
 */
export default function TibyanHeader({ homePath = "/home", settingsPath = "/main/settings", reserveSpace = true }) {
  const navigate = useNavigate();
  const [aiMoving, setAiMoving] = useState(false);
  const [aiResting, setAiResting] = useState(false);
  const aiStatusRef = useRef(null);
  const aiMotionRef = useRef(false);
  const aiRestTimerRef = useRef(null);

  const setMotionUiImmediately = (moving) => {
    // نبدّل الكلاس مباشرة على العنصر نفسه قبل تحديث React،
    // حتى تختفي/تظهر الرسالة والنقاط في نفس لحظة إشارة الحركة دون أي تأخير بصري.
    const host = aiStatusRef.current;
    if (host) {
      host.classList.toggle("tibyan-ai-is-moving", Boolean(moving));
      host.classList.toggle("tibyan-ai-is-still", !moving);
    }
    setAiMoving(Boolean(moving));
  };

  const startAiRestPeriod = () => {
    if (aiRestTimerRef.current) window.clearTimeout(aiRestTimerRef.current);
    setAiResting(true);
    aiRestTimerRef.current = window.setTimeout(() => {
      aiRestTimerRef.current = null;
      setAiResting(false);
    }, AI_REST_DURATION_MS);
  };

  const handleAiMotionChange = (moving) => {
    const nextMoving = Boolean(moving);

    // نتجاهل الإشارات المكررة فقط؛ التبديل الحقيقي بين الحركة والثبات يُنفّذ فورًا.
    if (aiMotionRef.current === nextMoving) return;
    aiMotionRef.current = nextMoving;

    if (nextMoving) {
      // مصدر الحقيقة هو الحركة الفعلية للأيقونة: أول ما تبدأ نخفي الواجهة فورًا.
      if (aiRestTimerRef.current) {
        window.clearTimeout(aiRestTimerRef.current);
        aiRestTimerRef.current = null;
      }
      setAiResting(false);
      setMotionUiImmediately(true);
      return;
    }

    // أول ما تنتهي الحركة نُظهر الرسالة والنقاط فورًا، ثم نبدأ ثبات 10 ثوانٍ.
    setMotionUiImmediately(false);
    startAiRestPeriod();
  };

  useEffect(() => {
    document.body.classList.add("tibyan-shared-header-active");
    applySavedSettings();
    const onSettingsChanged = (event) => applySavedSettings(event?.detail || readSavedSettings());
    const onStorage = (event) => { if (event.key === SETTINGS_STORAGE_KEY) applySavedSettings(); };
    window.addEventListener("tibyan:settings-changed", onSettingsChanged);
    window.addEventListener("storage", onStorage);
    return () => {
      document.body.classList.remove("tibyan-shared-header-active");
      window.removeEventListener("tibyan:settings-changed", onSettingsChanged);
      window.removeEventListener("storage", onStorage);
      if (aiRestTimerRef.current) window.clearTimeout(aiRestTimerRef.current);
    };
  }, []);

  return (
    <>
      <header dir="rtl" className="tibyan-shared-header home-icon-topbar" aria-label="التنقل الرئيسي">
        <button type="button" className="home-brand-button" onClick={() => navigate(homePath)} aria-label="الصفحة الرئيسية">
          <span className="home-brand-logo"><TibyanLogo /></span>
          <span className="home-brand-copy"><strong>تبيان</strong><small>صحتك أوضح</small></span>
        </button>
        <div className="home-top-actions">
          <div
            ref={aiStatusRef}
            className={`tibyan-header-ai-status ${aiMoving ? "tibyan-ai-is-moving" : "tibyan-ai-is-still"}${aiResting ? " tibyan-ai-resting" : ""}`}
          >
            <TibyanAI
              variant="header"
              onMotionChange={handleAiMotionChange}
              restDuration={AI_REST_DURATION_MS}
              restDurationMs={AI_REST_DURATION_MS}
            />
            <span className="tibyan-ai-status-ui" aria-hidden={aiMoving ? "true" : "false"}>
              <span className="tibyan-ai-thinking-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="tibyan-ai-ready-hint" aria-live="polite">
                <span>أنا هنا</span>
                <span>للمساعدة</span>
              </span>
            </span>
          </div>
          <button
            type="button"
            className="home-settings-button"
            onClick={() => navigate(settingsPath)}
            aria-label="إعدادات تبيان"
            title="إعدادات تبيان"
          >
            <SettingsIcon />
          </button>
        </div>
      </header>
      {reserveSpace && <div className="tibyan-shared-header-spacer" aria-hidden="true" />}
      <style>{`
        body.tibyan-shared-header-active .tibyan-header-wrap{display:none!important}
        .home-icon-topbar,.home-icon-topbar *{box-sizing:border-box}
        .home-icon-topbar{position:fixed!important;top:6px!important;right:50%!important;z-index:100!important;width:min(calc(100% - 12px),1180px)!important;min-height:58px!important;margin:0!important;padding:6px 8px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:8px!important;direction:rtl;border:1px solid rgba(7,92,145,.12);border-radius:18px!important;background:rgba(255,255,255,.96)!important;box-shadow:0 14px 36px rgba(3,66,112,.13)!important;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);transform:translateX(50%)!important;font-family:var(--font-tibyan,"IBM Plex Sans Arabic"),Tahoma,Arial,sans-serif}
        .home-icon-topbar button{font:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}
        .home-brand-button{width:auto;min-width:150px;height:56px;flex:0 0 auto;display:flex;align-items:center;justify-content:flex-start;gap:10px;padding:4px 7px;border:0;border-radius:18px;background:transparent;text-align:right}
        .home-brand-logo{width:54px;height:54px;flex:0 0 54px;display:block;animation:homeHeaderLogoFloat 4.6s ease-in-out infinite}
        .home-brand-logo svg{width:100%;height:100%;display:block;overflow:visible;opacity:1;shape-rendering:geometricPrecision;text-rendering:geometricPrecision;vector-effect:non-scaling-stroke}
        .home-brand-copy{min-width:0;display:grid;gap:1px;line-height:1}.home-brand-copy strong{display:block;color:#075dab;font-size:20px;font-weight:900;line-height:1.15}.home-brand-copy small{color:#59a0ae;font-size:9px;font-weight:800}
        .home-top-actions{display:flex;align-items:center;gap:5px}
        .tibyan-shared-header .home-nav-icon{position:relative;width:44px;height:44px;flex:0 0 44px;display:grid;place-items:center;padding:0;border:0;border-radius:0;background:transparent;color:#0876d9;box-shadow:none;cursor:pointer;transition:transform .2s ease,color .2s ease,filter .2s ease;overflow:visible}
        .tibyan-shared-header .home-nav-icon svg{width:23px;height:23px}
        .tibyan-shared-header .home-nav-icon:hover,.tibyan-shared-header .home-nav-icon:focus-visible{transform:translateY(-3px);color:#0876d9;outline:none;background:transparent;box-shadow:none}
        .tibyan-shared-header .home-nav-icon.ai.tibyan-ai-inline-trigger{position:relative!important;overflow:visible!important}
        .tibyan-shared-header .tibyan-ai-online-dot{right:6px!important;bottom:2px!important}
        .tibyan-header-ai-status{position:relative;width:50px;height:50px;flex:0 0 50px;display:grid;place-items:center;overflow:visible}
        .tibyan-header-ai-status>.tibyan-ai-inline-trigger{margin:0!important}
        .tibyan-header-ai-status.tibyan-ai-resting>.tibyan-ai-inline-trigger,.tibyan-header-ai-status.tibyan-ai-resting>.tibyan-ai-inline-trigger *{animation-play-state:paused!important}
        .tibyan-ai-status-ui{position:absolute;inset:0;z-index:5;display:block;pointer-events:none;opacity:1;visibility:visible;transition:none!important}
        .tibyan-header-ai-status.tibyan-ai-is-moving>.tibyan-ai-status-ui{display:none!important;opacity:0!important;visibility:hidden!important}
        .tibyan-header-ai-status.tibyan-ai-is-still>.tibyan-ai-status-ui{display:block!important;opacity:1!important;visibility:visible!important}
        .tibyan-ai-ready-hint{position:absolute;top:calc(100% - 2px);left:50%;min-width:23px;transform:translateX(-50%);color:#0869ad;font-size:5.5px;font-weight:900;line-height:1.12;padding:1px 2.2px;border:1px solid rgba(8,118,217,.11);border-radius:5px;background:rgba(255,255,255,.99);box-shadow:0 2px 6px rgba(3,77,132,.07);letter-spacing:0;text-align:center}
        .tibyan-ai-ready-hint span{display:block;white-space:nowrap}
        .tibyan-ai-thinking-dots{position:absolute;right:-5px;top:-4px;width:12px;height:17px;display:block;color:#0b79cf}
        .tibyan-ai-thinking-dots i{position:absolute;display:block;border-radius:50%;background:currentColor;transform-origin:50% 50%;opacity:.28;box-shadow:0 1px 2px rgba(8,118,217,.12);animation:tibyanAiThinkingDot 2.8s ease-in-out infinite}
        .tibyan-ai-thinking-dots i:nth-child(1){width:2px;height:2px;left:2px;bottom:3px;animation-delay:0s}
        .tibyan-ai-thinking-dots i:nth-child(2){width:3px;height:3px;left:4px;bottom:6px;animation-delay:.42s}
        .tibyan-ai-thinking-dots i:nth-child(3){width:4px;height:4px;left:6.4px;bottom:9px;animation-delay:.84s}
        html[data-tibyan-theme="dark"] .tibyan-ai-ready-hint{color:#dff7ff;background:rgba(7,28,44,.98);border-color:rgba(112,223,234,.15);box-shadow:0 2px 8px rgba(0,0,0,.24)}
        html[data-tibyan-theme="dark"] .tibyan-ai-thinking-dots{color:#70dfea}
        .home-settings-button{position:relative;width:44px;height:44px;flex:0 0 44px;display:grid;place-items:center;padding:0;border:0!important;border-radius:0!important;background:transparent!important;color:#0876d9;box-shadow:none!important;cursor:pointer;transition:transform .22s ease,color .22s ease,filter .22s ease;overflow:visible}
        .home-settings-button:hover,.home-settings-button:focus-visible{transform:translateY(-3px) rotate(6deg);color:#0876d9;filter:saturate(1.08);outline:none;background:transparent!important;box-shadow:none!important}
        .home-settings-button svg{width:23px;height:23px;display:block;filter:drop-shadow(0 2px 3px rgba(3,77,132,.14))}
        .tibyan-shared-header-spacer{width:100%;height:76px;flex:0 0 76px;pointer-events:none}
        .home-brand-logo .tibyan-heartbeat{stroke-dasharray:260;stroke-dashoffset:260;animation:tibyanSharedHeartbeatTrace 4.2s linear infinite}.home-brand-logo .tibyan-leaf,.home-brand-logo .tibyan-head,.home-brand-logo .tibyan-blue-arc{animation:none}
        html[data-tibyan-theme="dark"] .home-icon-topbar{border-color:rgb(243, 247, 249);background:rgba(8,28,45,.94)!important;box-shadow:0 14px 36px rgba(0,0,0,.28)!important}html[data-tibyan-theme="dark"] .home-brand-copy strong{color:#dff4ff}html[data-tibyan-theme="dark"] .home-brand-copy small{color:#76b8c2}html[data-tibyan-theme="dark"] .home-settings-button{background:transparent!important;color:#62d8ec!important;box-shadow:none!important}
        @keyframes homeHeaderLogoFloat{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-2px) rotate(.6deg)}}@keyframes tibyanSharedHeartbeatTrace{0%{stroke-dashoffset:260;opacity:.45}38%{stroke-dashoffset:0;opacity:1}72%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:-260;opacity:.45}}
        @keyframes tibyanAiThinkingDot{0%,100%{opacity:.24;transform:translateY(0) scale(.72)}40%{opacity:.95;transform:translateY(-1.1px) scale(1.08)}70%{opacity:.42;transform:translateY(-.45px) scale(.9)}}
        @media (max-width:760px){.home-icon-topbar{width:calc(100% - 12px)!important}.home-brand-button{min-width:108px!important;height:42px!important;padding:2px!important;gap:7px!important}.home-brand-logo{width:36px!important;height:36px!important;flex:0 0 36px!important}.home-brand-copy strong{font-size:16px!important}.home-brand-copy small{font-size:7px!important}.tibyan-shared-header .home-nav-icon{width:40px;height:40px;flex-basis:40px}.tibyan-shared-header .home-nav-icon svg{width:21px;height:21px}.home-settings-button{width:40px;height:40px;flex-basis:40px}.home-settings-button svg{width:21px;height:21px}.tibyan-shared-header-spacer{height:70px;flex-basis:70px}}
        @media (max-width:390px){.home-brand-button{min-width:102px!important;gap:6px!important}.home-brand-logo{width:34px!important;height:34px!important;flex:0 0 34px!important}.home-brand-copy strong{font-size:15px!important}}
        @media (prefers-reduced-motion:reduce){.home-icon-topbar *,.home-icon-topbar *::before,.home-icon-topbar *::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}}
      `}</style>
    </>
  );
}
