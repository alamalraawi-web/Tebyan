import { createContext, useContext, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationContext = createContext(null);

const authPages = ["/login", "/signup", "/register"];

export function useTibyanNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error(
      "useTibyanNavigation يجب استخدامه داخل TibyanShell"
    );
  }

  return context;
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

      <g filter="url(#tibyan-logo-shadow)">
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
          filter="url(#tibyan-pulse-glow)"
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

function TibyanShell({ children }) {
  const navigateRouter = useNavigate();
  const location = useLocation();

  const isAuthPage = authPages.includes(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigationValue = useMemo(
    () => ({
      navigate: (path) => navigateRouter(path),

      goBack: () => {
        if (window.history.length > 1) {
          navigateRouter(-1);
        } else {
          navigateRouter("/");
        }
      },
    }),
    [navigateRouter]
  );

  return (
    <NavigationContext.Provider value={navigationValue}>
      <div dir="rtl" className="tibyan-app">
        {!isAuthPage && (
          <header className="main-header">
            <button
              type="button"
              className="brand-button"
              onClick={() => navigateRouter("/")}
            >
              <span className="header-logo">
                <TibyanLogo />
              </span>

              <span className="brand-text">
                <strong>تبيان</strong>
                <small>صحتك أوضح بذكاء</small>
              </span>
            </button>

            <nav className="header-actions">
              {location.pathname !== "/" && (
                <button
                  type="button"
                  onClick={() => navigateRouter(-1)}
                  className="header-icon-button back"
                  aria-label="رجوع"
                  title="رجوع"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M11 18l-6-6 6-6" />
                  </svg>
                </button>
              )}

              <button
                type="button"
                onClick={() => navigateRouter("/ai")}
                className="header-icon-button ai"
                aria-label="الذكاء الاصطناعي"
                title="الذكاء الاصطناعي"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 3h6M12 3V1M8 7h8a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-5a4 4 0 0 1 4-4Z" />
                  <path d="M8.5 12h.01M15.5 12h.01M9 16h6M2 13H1M23 13h-1" />
                </svg>
                <span className="ai-status-dot" />
              </button>

              <button
                type="button"
                className={`header-icon-button menu ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                aria-expanded={menuOpen}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {menuOpen ? (
                    <path d="m6 6 12 12M18 6 6 18" />
                  ) : (
                    <path d="M5 7h14M5 12h14M5 17h14" />
                  )}
                </svg>
              </button>

              <div className={`header-menu ${menuOpen ? "open" : ""}`}>
                <button type="button" onClick={() => { navigateRouter("/main/settings"); setMenuOpen(false); }}>
                  الإعدادات
                </button>
                <button type="button" className="logout" onClick={() => { navigateRouter("/login"); setMenuOpen(false); }}>
                  خروج
                </button>
              </div>
            </nav>
          </header>
        )}

        {children}

        <style>{`
          .main-header{position:fixed;top:6px;right:50%;transform:translateX(50%);z-index:100;width:min(calc(100% - 12px),1180px);min-height:58px;padding:6px 8px;display:flex;align-items:center;justify-content:space-between;gap:8px;border:1px solid rgba(7,92,145,.12);border-radius:18px;background:rgba(255,255,255,.96);box-shadow:0 14px 36px rgba(3,66,112,.13);backdrop-filter:blur(20px)}
          .brand-button{display:flex;align-items:center;gap:7px;min-width:108px;height:42px;padding:2px;border:0;background:transparent;text-align:right;cursor:pointer}
          .header-logo{width:42px;height:42px;display:block;flex:0 0 42px;filter:drop-shadow(0 7px 12px rgba(3,82,143,.16))}
          .header-logo svg{width:100%;height:100%;overflow:visible}
          .brand-text{display:grid;gap:1px;line-height:1}
          .brand-text strong{color:#075dab;font-size:16px;font-weight:900}
          .brand-text small{color:#59a0ae;font-size:7px;font-weight:800}
          .header-actions{position:relative;display:flex;align-items:center;gap:5px}
          .header-icon-button{position:relative;width:38px;height:38px;display:grid;place-items:center;padding:0;border:1px solid rgba(8,118,217,.13);border-radius:12px;background:linear-gradient(145deg,#fff,#eefbff);color:#0876d9;box-shadow:0 8px 18px rgba(3,77,132,.09);cursor:pointer}
          .header-icon-button svg{width:19px;height:19px}
          .header-icon-button.ai{border:0;background:linear-gradient(145deg,#0cb8c0,#078fd0);color:#fff}
          .header-icon-button.back{background:#fff;color:#0876d9}
          .header-icon-button.menu.open{border-color:transparent;background:linear-gradient(145deg,#0876d9,#10b5b5);color:#fff}
          .ai-status-dot{position:absolute;right:50%;bottom:-4px;transform:translateX(50%);width:9px;height:9px;border:2px solid #fff;border-radius:50%;background:#42d66f;box-shadow:0 0 0 3px rgba(66,214,111,.14)}
          .header-menu{position:absolute;top:calc(100% + 8px);left:0;width:170px;padding:7px;border:1px solid rgba(7,92,145,.10);border-radius:16px;background:rgba(255,255,255,.98);box-shadow:0 18px 45px rgba(3,66,112,.16);opacity:0;visibility:hidden;pointer-events:none;transform:translateY(-6px) scale(.98);transition:.2s ease}
          .header-menu.open{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0) scale(1)}
          .header-menu button{width:100%;min-height:38px;padding:7px 10px;border:0;border-radius:10px;background:transparent;color:#315f7a;text-align:right;font-size:10px;font-weight:800;cursor:pointer}
          .header-menu button:hover{background:#eefaff;color:#0876d9}
          .header-menu button.logout{color:#d93645;border-top:1px solid rgba(239,68,68,.10)}
          .tibyan-app{padding-top:70px}
          @media(max-width:640px){.main-header{min-height:56px}.brand-text small{display:none}.header-logo{width:39px;height:39px;flex-basis:39px}.tibyan-app{padding-top:68px}}
        `}</style>
      </div>
    </NavigationContext.Provider>
  );
}

export default TibyanShell;
