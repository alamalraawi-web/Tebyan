import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowRight, CircleCheck, Eye, EyeOff, KeyRound, Loader2, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { findUserByEmail, resetPassword } from "../auth/authStore.js";

function HeartPulseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />
      <path d="M3 12h4l1.4-3 3.2 7 2.1-4H21" />
    </svg>
  );
}

function StethoscopeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="M6 3v5a6 6 0 0 0 12 0V3" />
      <path d="M6 3H4M18 3h2M12 14v2a5 5 0 0 0 10 0v-1" />
      <circle cx="21" cy="12" r="2" />
    </svg>
  );
}

function ClipboardIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="M9 5H6a2 2 0 0 0-2 2v13h16V7a2 2 0 0 0-2-2h-3" />
      <path d="M9 3h6v4H9zM8 12l1.5 1.5L12 11M14 12h3M8 17l1.5 1.5L12 16M14 17h3" />
    </svg>
  );
}

function LabIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="M9 3h6M10 3v6l-5.3 8.8A2 2 0 0 0 6.4 21h11.2a2 2 0 0 0 1.7-3.2L14 9V3" />
      <path d="M7.5 16h9M10 13h4" />
    </svg>
  );
}

function PharmacyIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="m8.5 4.5 11 11a4.24 4.24 0 0 1-6 6l-11-11a4.24 4.24 0 1 1 6-6Z" />
      <path d="m7 15 8-8" />
    </svg>
  );
}

function ConsultationIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 13h3v3H8zM14 13h2M14 16h2" />
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

const orbitIcons = [
  {
    Icon: HeartPulseIcon,
    color: "#0876d9",
  },
  {
    Icon: StethoscopeIcon,
    color: "#08a6b9",
  },
  {
    Icon: ClipboardIcon,
    color: "#116dcc",
  },
  {
    Icon: LabIcon,
    color: "#0a8ac8",
  },
  {
    Icon: PharmacyIcon,
    color: "#17aeaa",
  },
  {
    Icon: ConsultationIcon,
    color: "#35bd70",
  },
];


const DEMO_CODE = "246810";

function LoginLogoStage() {
  return (
    <div className="tebyan-logo-stage">
      <div className="tebyan-orbit-canvas" aria-hidden="true">
        <div className="tebyan-engineering-ring" />
        <div className="tebyan-engineering-ring reverse" />
        <div className="tebyan-energy-ring" />
        {orbitIcons.map(({ Icon, color }, index) => {
          const angle = index * 60;
          return <div key={index} className="tebyan-orbit-slot" style={{ transform: `rotate(${angle}deg)` }}>
            <div className="tebyan-orbit-runner"><div className="tebyan-orbit-anchor"><div style={{ transform: `rotate(${-angle}deg)` }}><div className="tebyan-orbit-counter"><div className="tebyan-orbit-badge" style={{ color }}><Icon /></div></div></div></div></div>
          </div>;
        })}
      </div>
      <div className="tebyan-logo-aura" />
      <div className="tebyan-logo-core"><TibyanLogo /></div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const refs = useRef([]);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  async function verifyEmail(e) {
    e.preventDefault();
    setNotice(null);
    if (!findUserByEmail(email)) { setNotice({ type: "error", text: "لا يوجد حساب محفوظ بهذا البريد الإلكتروني." }); return; }
    setLoading(true); await new Promise(r => setTimeout(r, 350)); setLoading(false); setStep(2);
    setNotice({ type: "success", text: `تم إرسال رمز التحقق. الرمز التجريبي: ${DEMO_CODE}` });
  }
  function codeChange(i, value) {
    const digit=value.replace(/\D/g,"").slice(-1); const next=[...code]; next[i]=digit; setCode(next); if(digit&&i<5) refs.current[i+1]?.focus();
  }
  function verifyCode(e) { e.preventDefault(); if(code.join("")!==DEMO_CODE){setNotice({type:"error",text:"رمز التحقق غير صحيح."});return;} setNotice(null); setStep(3); }
  async function save(e) {
    e.preventDefault();
    if(password.length<6){setNotice({type:"error",text:"كلمة المرور يجب أن تكون 6 أحرف على الأقل."});return;}
    if(password!==confirm){setNotice({type:"error",text:"كلمتا المرور غير متطابقتين."});return;}
    setLoading(true); await new Promise(r=>setTimeout(r,350)); resetPassword(email,password); setLoading(false); setStep(4); setNotice(null);
  }

  return <div dir="rtl" className="tebyan-login-root"><main className="tebyan-login-main">
    <div className="tebyan-login-background" aria-hidden="true"><div className="tebyan-login-grid"/><div className="tebyan-login-blob tebyan-login-blob-one"/><div className="tebyan-login-blob tebyan-login-blob-two"/></div>
    <div className="tebyan-login-wrapper"><section className="tebyan-login-card">
      <button type="button" onClick={()=>navigate("/login")} aria-label="العودة" style={{position:"absolute",right:18,top:18,border:0,background:"#eef8ff",width:42,height:42,borderRadius:14,display:"grid",placeItems:"center",color:"#0876d9",cursor:"pointer"}}><ArrowRight size={20}/></button>
      <LoginLogoStage/>
      <div className="tebyan-login-brand"><h2>تبيان</h2><div className="tebyan-brand-chip"><ShieldCheck size={15}/> استعادة الحساب بأمان</div></div>
      <div className="tebyan-login-heading"><h1>{step===1?"نسيت كلمة المرور؟":step===2?"تحقق من الرمز":step===3?"كلمة مرور جديدة":"تمت الاستعادة"}</h1><p>{step===1?"أدخل البريد المستخدم عند إنشاء الحساب.":step===2?`أدخل الرمز المرسل إلى ${email}`:step===3?"اختر كلمة مرور جديدة وآمنة.":"يمكنك الآن تسجيل الدخول إلى حسابك."}</p></div>
      <div className="tebyan-notice-area" aria-live="polite">{notice&&<div className={notice.type==="error"?"tebyan-notice error":"tebyan-notice success"}>{notice.type==="error"?<AlertCircle size={20}/>:<CircleCheck size={20}/>}<span>{notice.text}</span></div>}</div>
      {step===1&&<form className="tebyan-login-form" onSubmit={verifyEmail}><label className="tebyan-field"><span>البريد الإلكتروني</span><div className="tebyan-input-wrapper"><Mail className="tebyan-input-icon" size={20}/><input type="email" dir="ltr" inputMode="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@example.com" required/></div></label><button className="tebyan-submit-button" disabled={loading}>{loading?<><Loader2 className="tebyan-spinner" size={19}/> جاري التحقق</>:"إرسال رمز التحقق"}</button></form>}
      {step===2&&<form className="tebyan-login-form" onSubmit={verifyCode}><div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,direction:"ltr"}}>{code.map((v,i)=><input key={i} ref={el=>refs.current[i]=el} value={v} onChange={e=>codeChange(i,e.target.value)} inputMode="numeric" maxLength="1" style={{minWidth:0,height:52,border:"1px solid #d6e8f3",borderRadius:14,textAlign:"center",fontSize:20,fontWeight:800,outline:"none"}}/>)}</div><button className="tebyan-submit-button">تأكيد الرمز</button><button type="button" className="tebyan-forgot-password" onClick={()=>setNotice({type:"success",text:`تم إرسال رمز جديد: ${DEMO_CODE}`})}>إعادة إرسال الرمز</button></form>}
      {step===3&&<form className="tebyan-login-form" onSubmit={save}><label className="tebyan-field"><span>كلمة المرور الجديدة</span><div className="tebyan-input-wrapper"><LockKeyhole className="tebyan-input-icon" size={20}/><input type={show?"text":"password"} dir="ltr" value={password} onChange={e=>setPassword(e.target.value)} placeholder="6 أحرف على الأقل"/><button type="button" className="tebyan-password-toggle" onClick={()=>setShow(v=>!v)}>{show?<EyeOff size={20}/>:<Eye size={20}/>}</button></div></label><label className="tebyan-field"><span>تأكيد كلمة المرور</span><div className="tebyan-input-wrapper"><KeyRound className="tebyan-input-icon" size={20}/><input type={show?"text":"password"} dir="ltr" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="أعد كتابة كلمة المرور"/></div></label><button className="tebyan-submit-button" disabled={loading}>{loading?"جاري الحفظ...":"حفظ كلمة المرور"}</button></form>}
      {step===4&&<div style={{display:"grid",gap:16,textAlign:"center"}}><CircleCheck size={62} color="#21b778" style={{margin:"auto"}}/><button className="tebyan-submit-button" onClick={()=>navigate("/login",{replace:true})}>العودة لتسجيل الدخول</button></div>}
      <div className="tebyan-login-footer">تبيان — رعاية صحية أسهل وأذكى</div>
    </section></div>
  </main><style>{`
        .tebyan-login-root,
        .tebyan-login-root *,
        .tebyan-login-root *::before,
        .tebyan-login-root *::after {
          box-sizing: border-box;
        }

        html,
        body {
          max-width: 100%;
          overflow-x: hidden;
        }

        .tebyan-login-root button,
        .tebyan-login-root input {
          max-width: 100%;
          font: inherit;
        }

        .tebyan-login-root {
          width: 100%;
          min-width: 0;
          min-height: 100vh;
          min-height: 100dvh;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 85% 8%, rgba(18,183,189,.12), transparent 28%),
            radial-gradient(circle at 8% 92%, rgba(56,201,111,.10), transparent 26%),
            #f7fcff;
          color: #073b72;
          font-family: "IBM Plex Sans Arabic", Tahoma, Arial, sans-serif;
        }

        .tebyan-login-main {
          position: relative;
          width: 100%;
          min-width: 0;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          overflow: hidden;
        }

        .tebyan-login-background {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .tebyan-login-grid {
          position: absolute;
          inset: 0;
          opacity: .42;
          background-image:
            linear-gradient(rgba(8,118,217,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,118,217,.035) 1px, transparent 1px);
          background-size: 36px 36px;
          animation: elegantGrid 22s linear infinite;
        }

        .tebyan-login-blob {
          display: none;
        }

        .tebyan-login-wrapper {
          position: relative;
          z-index: 1;
          width: min(100%, 390px);
          min-width: 0;
          margin-inline: auto;
        }

        .tebyan-login-card {
          width: 100%;
          min-width: 0;
          padding: 18px 18px 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.82);
          border-radius: 26px;
          background: rgba(255,255,255,.92);
          box-shadow:
            0 24px 65px rgba(4,70,127,.12),
            inset 0 1px 0 rgba(255,255,255,.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .tebyan-logo-stage {
          --orbit-radius: 50px;
          position: relative;
          width: 126px;
          height: 126px;
          display: grid;
          place-items: center;
          margin: 0 auto 2px;
          isolation: isolate;
        }

        .tebyan-orbit-canvas {
          position: absolute;
          width: 126px;
          height: 126px;
          pointer-events: none;
        }

        .tebyan-engineering-ring {
          position: absolute;
          inset: 0;
          border: 1px dashed rgba(10,134,199,.20);
          border-radius: 50%;
          animation: elegantSpin 22s linear infinite;
        }

        .tebyan-engineering-ring.reverse {
          inset: 14px;
          border-style: solid;
          border-color: rgba(18,183,189,.15);
          animation-direction: reverse;
          animation-duration: 16s;
        }

        .tebyan-energy-ring {
          position: absolute;
          inset: 29px;
          border: 1px solid rgba(53,200,111,.12);
          border-radius: 50%;
          animation: elegantPulse 4.5s ease-in-out infinite;
        }

        .tebyan-orbit-slot,
        .tebyan-orbit-runner {
          position: absolute;
          inset: 0;
        }

        .tebyan-orbit-runner {
          transform-origin: 50% 50%;
          animation: elegantOrbit 26s linear infinite;
        }

        .tebyan-orbit-anchor {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translateX(var(--orbit-radius));
        }

        .tebyan-orbit-counter {
          animation: elegantCounter 26s linear infinite;
        }

        .tebyan-orbit-badge {
          width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.92);
          border-radius: 8px;
          background: rgba(255,255,255,.98);
          box-shadow: 0 5px 12px rgba(4,77,132,.10);
        }

        .tebyan-orbit-badge svg {
          width: 13px;
          height: 13px;
        }

        .tebyan-logo-aura {
          position: absolute;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(18,183,189,.16), rgba(8,118,217,.06) 52%, transparent 72%);
          filter: blur(12px);
          animation: elegantAura 5s ease-in-out infinite;
        }

        .tebyan-logo-core {
          position: relative;
          z-index: 2;
          width: 72px;
          height: 72px;
          filter: drop-shadow(0 10px 14px rgba(3,82,143,.18));
          animation: elegantFloat 4.8s ease-in-out infinite;
        }

        .tebyan-logo-core svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .tibyan-login-heartbeat {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: elegantHeartbeat 4.2s ease-in-out infinite;
        }

        .tibyan-login-leaf {
          transform-box: fill-box;
          transform-origin: 50% 80%;
          animation: elegantLeaf 4.8s ease-in-out infinite;
        }

        .tebyan-login-brand {
          text-align: center;
        }

        .tebyan-login-brand h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 700;
          line-height: 1.1;
          background: linear-gradient(270deg,#0876d9,#0eabb8,#36c96f);
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }

        .tebyan-brand-chip {
          width: fit-content;
          margin: 5px auto 0;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 9px;
          border: 1px solid rgba(18,183,189,.16);
          border-radius: 999px;
          background: #effbfb;
          color: #078c96;
          font-size: 9px;
          font-weight: 700;
        }

        .tebyan-login-heading {
          margin-top: 14px;
          text-align: center;
        }

        .tebyan-login-heading h1 {
          margin: 0;
          color: #064c91;
          font-size: 20px;
          font-weight: 700;
        }

        .tebyan-login-heading p {
          margin: 4px auto 0;
          max-width: 270px;
          color: #64879d;
          font-size: 10.5px;
          line-height: 1.65;
        }

        .tebyan-notice-area {
          min-height: 1px;
          margin-top: 10px;
        }

        .tebyan-notice {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 10px;
          border-radius: 12px;
          font-size: 10.5px;
          font-weight: 600;
        }

        .tebyan-notice.error {
          border: 1px solid #fecaca;
          background: #fff5f5;
          color: #991b1b;
        }

        .tebyan-notice.success {
          border: 1px solid #a7f3d0;
          background: #f0fdf7;
          color: #065f46;
        }

        .tebyan-login-form {
          width: 100%;
          min-width: 0;
          display: grid;
          gap: 11px;
          margin-top: 12px;
        }

        .tebyan-field {
          width: 100%;
          min-width: 0;
          display: grid;
          gap: 6px;
        }

        .tebyan-field > span {
          color: #064c91;
          font-size: 11px;
          font-weight: 700;
        }

        .tebyan-input-wrapper {
          position: relative;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          overflow: hidden;
          border-radius: 13px;
        }

        .tebyan-input-wrapper input {
          display: block;
          width: 100% !important;
          min-width: 0 !important;
          max-width: 100% !important;
          height: 43px;
          margin: 0 !important;
          padding: 0 42px !important;
          border: 1px solid rgba(10,134,199,.16);
          border-radius: 13px;
          outline: none;
          background: #fff;
          color: #315f7a;
          font-family: inherit;
          font-size: 16px;
          line-height: 1;
          box-shadow: 0 4px 12px rgba(4,77,132,.04);
          direction: ltr;
          text-align: left;
          -webkit-appearance: none;
          appearance: none;
          transition: .2s ease;
        }

        .tebyan-input-wrapper input:focus {
          border-color: rgba(8,118,217,.58);
          box-shadow: 0 0 0 3px rgba(8,118,217,.08);
        }

        .tebyan-input-icon {
          position: absolute;
          z-index: 2;
          top: 50%;
          right: 13px;
          width: 17px;
          height: 17px;
          transform: translateY(-50%);
          color: #7a9bad;
          pointer-events: none;
        }

        .tebyan-password-toggle {
          position: absolute;
          z-index: 3;
          top: 50%;
          left: 7px;
          width: 31px;
          height: 31px;
          display: grid;
          place-items: center;
          transform: translateY(-50%);
          border: 0;
          border-radius: 9px;
          background: transparent;
          color: #7a9bad;
        }

        .tebyan-forgot-password {
          width: fit-content;
          margin-right: auto;
          display: inline-flex;
          align-items: center;
          gap: 3px;
          border: 0;
          background: transparent;
          color: #0876d9;
          font-family: inherit;
          font-size: 9px;
          font-weight: 700;
        }

        .tebyan-remember {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #466b82;
          font-size: 10.5px;
        }

        .tebyan-checkbox-container {
          position: relative;
          display: inline-flex;
        }

        .tebyan-checkbox-container input {
          position: absolute;
          opacity: 0;
        }

        .tebyan-checkbox {
          width: 17px;
          height: 17px;
          display: grid;
          place-items: center;
          border: 1px solid #cbd5e1;
          border-radius: 5px;
          background: #fff;
          color: #fff;
        }

        .tebyan-checkbox.checked {
          border-color: transparent;
          background: linear-gradient(135deg,#0876d9,#12c7c4);
        }

        .tebyan-submit-button {
          width: 100%;
          height: 43px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 0;
          border-radius: 13px;
          background: linear-gradient(270deg,#0876d9,#0caab8);
          color: #fff;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 12px 26px rgba(8,118,217,.22);
          transition: .2s ease;
        }

        .tebyan-submit-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 16px 34px rgba(8,118,217,.28);
        }

        .tebyan-spinner {
          animation: elegantSpinner .7s linear infinite;
        }

        .tebyan-login-separator {
          position: relative;
          height: 23px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tebyan-login-separator::before {
          content: "";
          position: absolute;
          right: 0;
          left: 0;
          height: 1px;
          background: rgba(10,134,199,.10);
        }

        .tebyan-login-separator span {
          position: relative;
          padding: 0 9px;
          background: rgba(255,255,255,.96);
          color: #7998aa;
          font-size: 8.5px;
        }

        .tebyan-social-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .tebyan-social-button {
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: 1px solid rgba(10,134,199,.13);
          border-radius: 12px;
          background: #fff;
          color: #064c91;
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
        }

        .tebyan-social-button svg {
          width: 17px;
          height: 17px;
        }

        .tebyan-signup-link {
          margin: 14px 0 0;
          text-align: center;
          color: #6a8fa7;
          font-size: 10.5px;
        }

        .tebyan-signup-link button {
          border: 0;
          background: transparent;
          color: #0876d9;
          font-family: inherit;
          font-size: inherit;
          font-weight: 700;
        }

        .tebyan-login-footer {
          margin: 10px 0 0;
          text-align: center;
          color: #91acbd;
          font-size: 8.5px;
        }

        @keyframes elegantGrid { to { background-position: 36px 36px; } }
        @keyframes elegantSpin { to { transform: rotate(360deg); } }
        @keyframes elegantOrbit { to { transform: rotate(360deg); } }
        @keyframes elegantCounter { to { transform: rotate(-360deg); } }
        @keyframes elegantPulse {
          0%,100% { opacity:.45; transform:scale(.96); }
          50% { opacity:1; transform:scale(1.04); }
        }
        @keyframes elegantAura {
          0%,100% { opacity:.5; transform:scale(.92); }
          50% { opacity:1; transform:scale(1.05); }
        }
        @keyframes elegantFloat {
          0%,100% { transform:translateY(0) rotate(0); }
          50% { transform:translateY(-4px) rotate(.8deg); }
        }
        @keyframes elegantHeartbeat {
          0%,14% { stroke-dashoffset:260; opacity:.35; }
          44%,78% { stroke-dashoffset:0; opacity:1; }
          100% { stroke-dashoffset:-260; opacity:.35; }
        }
        @keyframes elegantLeaf {
          0%,100% { transform:rotate(0) scale(1); }
          50% { transform:rotate(1deg) scale(1.012); }
        }
        @keyframes elegantSpinner { to { transform:rotate(360deg); } }

        @media (max-width: 360px) {
          .tebyan-login-main {
            padding: 8px;
          }

          .tebyan-login-wrapper {
            width: 100%;
          }

          .tebyan-login-card {
            padding: 14px 13px 16px;
            border-radius: 21px;
          }

          .tebyan-logo-stage {
            width: 112px;
            height: 112px;
            --orbit-radius: 44px;
          }

          .tebyan-orbit-canvas {
            width: 112px;
            height: 112px;
          }

          .tebyan-logo-core {
            width: 64px;
            height: 64px;
          }

          .tebyan-logo-aura {
            width: 78px;
            height: 78px;
          }

          .tebyan-login-brand h2 {
            font-size: 23px;
          }

          .tebyan-login-heading h1 {
            font-size: 18px;
          }

          .tebyan-login-heading p {
            font-size: 9.5px;
          }

          .tebyan-input-wrapper input,
          .tebyan-submit-button {
            height: 41px;
          }
        }

        @media (max-height: 690px) {
          .tebyan-login-main {
            align-items: flex-start;
            padding-top: 8px;
          }

          .tebyan-logo-stage {
            transform: scale(.88);
            margin-top: -8px;
            margin-bottom: -8px;
          }

          .tebyan-login-heading {
            margin-top: 10px;
          }

          .tebyan-login-form {
            gap: 9px;
          }

          .tebyan-signup-link {
            margin-top: 10px;
          }
        }


        @media (min-width: 768px) {
          .tebyan-login-main {
            padding: 32px 20px;
          }

          .tebyan-login-wrapper {
            width: min(100%, 420px);
          }

          .tebyan-login-card {
            padding: 24px 26px 26px;
            border-radius: 30px;
          }

          .tebyan-logo-stage {
            width: 138px;
            height: 138px;
            --orbit-radius: 55px;
          }

          .tebyan-orbit-canvas {
            width: 138px;
            height: 138px;
          }

          .tebyan-logo-core {
            width: 78px;
            height: 78px;
          }

          .tebyan-input-wrapper input,
          .tebyan-submit-button {
            height: 48px;
          }
        }

        @media (max-width: 767px) {
          .tebyan-login-main {
            align-items: flex-start;
            justify-content: center;
            padding:
              max(10px, env(safe-area-inset-top))
              max(10px, env(safe-area-inset-right))
              max(18px, env(safe-area-inset-bottom))
              max(10px, env(safe-area-inset-left));
            overflow-y: auto;
          }

          .tebyan-login-wrapper {
            width: 100%;
            max-width: 430px;
          }

          .tebyan-login-card {
            width: 100%;
            padding: 16px 14px 18px;
            border-radius: 22px;
          }

          .tebyan-login-form,
          .tebyan-field,
          .tebyan-input-wrapper,
          .tebyan-input-wrapper input {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
          }

          .tebyan-input-wrapper input {
            height: 48px;
            padding-right: 43px !important;
            padding-left: 43px !important;
            border-radius: 14px;
            font-size: 16px;
          }

          .tebyan-field > span {
            font-size: 12px;
          }

          .tebyan-submit-button {
            height: 48px;
            border-radius: 14px;
            font-size: 14px;
          }

          .tebyan-social-button {
            min-width: 0;
            height: 44px;
          }
        }

        @media (max-width: 390px) {
          .tebyan-login-card {
            padding-inline: 12px;
          }

          .tebyan-logo-stage {
            transform: scale(.92);
            margin-top: -4px;
            margin-bottom: -5px;
          }

          .tebyan-social-grid {
            gap: 7px;
          }
        }


        /* Mobile-first polish: keeps the original visual identity */
        @media (max-width: 767px) {
          .tebyan-login-main,
          .signup-main {
            align-items: flex-start !important;
            padding: max(12px, env(safe-area-inset-top)) 12px max(20px, env(safe-area-inset-bottom)) !important;
          }

          .tebyan-login-wrapper,
          .signup-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
          }

          .tebyan-login-card,
          .signup-card {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 24px !important;
            padding: 18px 16px 20px !important;
            overflow: hidden !important;
          }

          .tebyan-logo-stage,
          .signup-logo-stage {
            min-height: 172px !important;
            height: 172px !important;
            margin: -4px auto 2px !important;
            transform: scale(.88);
            transform-origin: center center;
          }

          .tebyan-logo-core,
          .signup-logo-core {
            width: 124px !important;
            height: 124px !important;
          }

          .tebyan-orbit-canvas,
          .signup-orbit-canvas {
            width: 170px !important;
            height: 170px !important;
          }

          .tebyan-login-brand h2,
          .signup-brand h2 {
            font-size: 28px !important;
          }

          .tebyan-login-heading h1,
          .signup-heading h1 {
            font-size: 25px !important;
            line-height: 1.3 !important;
          }

          .tebyan-login-heading p,
          .signup-heading p {
            font-size: 14px !important;
            line-height: 1.8 !important;
          }

          .tebyan-login-form,
          .signup-form {
            gap: 14px !important;
          }

          .tebyan-input-wrapper,
          .signup-input-wrapper {
            min-height: 54px !important;
            border-radius: 16px !important;
          }

          .tebyan-input-wrapper input,
          .signup-input-wrapper input,
          .signup-input-wrapper select,
          .signup-input-wrapper textarea {
            min-height: 52px !important;
            font-size: 16px !important;
          }

          .tebyan-submit-button,
          .signup-submit-button {
            min-height: 54px !important;
            border-radius: 17px !important;
            font-size: 16px !important;
          }

          .signup-role-grid,
          .role-options-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }

          .tebyan-login-options {
            align-items: center !important;
            gap: 10px !important;
          }
        }

        @media (max-width: 380px) {
          .tebyan-login-card,
          .signup-card {
            padding-inline: 12px !important;
            border-radius: 20px !important;
          }

          .tebyan-logo-stage,
          .signup-logo-stage {
            transform: scale(.78);
            margin-block: -14px -8px !important;
          }

          .tebyan-login-heading h1,
          .signup-heading h1 {
            font-size: 22px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tebyan-login-grid,
          .tebyan-engineering-ring,
          .tebyan-energy-ring,
          .tebyan-orbit-runner,
          .tebyan-orbit-counter,
          .tebyan-logo-aura,
          .tebyan-logo-core,
          .tibyan-login-heartbeat,
          .tibyan-login-leaf,
          .tebyan-spinner {
            animation: none !important;
          }
        }
      `}</style></div>;
}
