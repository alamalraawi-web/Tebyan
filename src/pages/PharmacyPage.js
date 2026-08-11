import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TibyanHeader from "../components/TibyanHeader";

function IconBase({ children, ...props }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

function ArrowIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="M37 24H11M21 34 11 24l10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

function CloseIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="24" cy="24" r="18" fill="currentColor" opacity=".1" />
      <path
        d="m16 16 16 16M32 16 16 32"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

function CheckIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="24" cy="24" r="18" fill="currentColor" opacity=".12" />
      <path
        d="m15 24 6 6 13-14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

function ShieldIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="M24 5 39 11v10c0 11-6 18-15 22C15 39 9 32 9 21V11L24 5Z"
        fill="currentColor"
        opacity=".12"
      />
      <path
        d="M24 5 39 11v10c0 11-6 18-15 22C15 39 9 32 9 21V11L24 5Z"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      <path
        d="m17 24 5 5 10-11"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

function DoctorIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="24" cy="13" r="7" fill="currentColor" opacity=".12" />
      <circle cx="24" cy="13" r="7" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M10 42v-6a14 14 0 0 1 28 0v6M16 28v5a4 4 0 0 0 8 0v-5M31 29v6M28 32h6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

function HumanIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="24" cy="13" r="7" fill="currentColor" opacity=".12" />
      <circle cx="24" cy="13" r="7" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M10 42v-6a14 14 0 0 1 28 0v6M15 29h18M24 25v13"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

function CapsuleIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="m13 8 27 27a8 8 0 0 1-11 11L2 19A8 8 0 0 1 13 8Z"
        fill="currentColor"
        opacity=".12"
      />
      <path
        d="m14 9 25 25a7 7 0 1 1-10 10L4 19A7 7 0 0 1 14 9Z"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path d="m17 32 15-15" stroke="currentColor" strokeWidth="2.4" />
    </IconBase>
  );
}

function CameraIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="M10 14h7l2-4h10l2 4h7a4 4 0 0 1 4 4v19a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4Z"
        fill="currentColor"
        opacity=".08"
      />
      <path
        d="M10 14h7l2-4h10l2 4h7a4 4 0 0 1 4 4v19a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4Z"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <circle cx="24" cy="27" r="8" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M16 27h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeDasharray="3 3"
        className="ph-scan-line"
      />
    </IconBase>
  );
}

function RadarIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="24" cy="24" r="18" fill="currentColor" opacity=".07" />
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="2.2" />
      <circle
        cx="24"
        cy="24"
        r="10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeDasharray="3 3"
        className="ph-radar-ring"
      />
      <path
        d="m24 24 13-8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        className="ph-radar-hand"
      />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    </IconBase>
  );
}

function MapIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="m7 11 11-4 12 4 11-4v30l-11 4-12-4-11 4V11Z"
        fill="currentColor"
        opacity=".07"
      />
      <path
        d="m7 11 11-4 12 4 11-4v30l-11 4-12-4-11 4V11Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M18 7v30M30 11v30" stroke="currentColor" strokeWidth="1.7" opacity=".7" />
      <path
        d="M24 15a5 5 0 0 1 5 5c0 4-5 9-5 9s-5-5-5-9a5 5 0 0 1 5-5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="24" cy="20" r="1.8" fill="currentColor" />
    </IconBase>
  );
}

function DroneIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M16 21h16v10H16V21Z" fill="currentColor" opacity=".1" />
      <path d="M16 21h16v10H16V21Z" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M12 20h24M10 14h9M29 14h9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="7" cy="14" r="4" stroke="currentColor" strokeWidth="2" className="ph-rotor" />
      <circle
        cx="41"
        cy="14"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
        className="ph-rotor reverse"
      />
      <path
        d="m17 31-5 6M31 31l5 6M12 37h7M29 37h7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

function WalletIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M8 14h28a6 6 0 0 1 6 6v20H8V14Z" fill="currentColor" opacity=".08" />
      <path d="M8 14h28a6 6 0 0 1 6 6v20H8V14Z" stroke="currentColor" strokeWidth="2.2" />
      <path d="M32 22h10v10H32a5 5 0 1 1 0-10Z" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="35" cy="27" r="1.7" fill="currentColor" />
      <path d="M11 10h21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </IconBase>
  );
}

function ReportIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 6h19l8 8v28H12V6Z" fill="currentColor" opacity=".07" />
      <path d="M12 6h19l8 8v28H12V6Z" stroke="currentColor" strokeWidth="2.2" />
      <path d="M31 6v9h8M18 22h15M18 28h15M18 34h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </IconBase>
  );
}

function BellIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M13 34h22l-3-5V20a8 8 0 0 0-16 0v9l-3 5Z" fill="currentColor" opacity=".08" />
      <path d="M13 34h22l-3-5V20a8 8 0 0 0-16 0v9l-3 5Z" stroke="currentColor" strokeWidth="2.2" />
      <path d="M20 38a4 4 0 0 0 8 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </IconBase>
  );
}

function HeartPulseIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="M24 40S8 31 8 18a9 9 0 0 1 16-5 9 9 0 0 1 16 5c0 13-16 22-16 22Z"
        fill="currentColor"
        opacity=".08"
      />
      <path
        d="M24 40S8 31 8 18a9 9 0 0 1 16-5 9 9 0 0 1 16 5c0 13-16 22-16 22Z"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M12 25h7l3-6 4 12 3-6h7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

function LockIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="10" y="20" width="28" height="22" rx="5" fill="currentColor" opacity=".08" />
      <rect x="10" y="20" width="28" height="22" rx="5" stroke="currentColor" strokeWidth="2.2" />
      <path d="M16 20v-5a8 8 0 0 1 16 0v5" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="24" cy="31" r="2" fill="currentColor" />
    </IconBase>
  );
}

function StarIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="m24 6 5.5 11.2L42 19l-9 8.8L35.2 40 24 34.1 12.8 40 15 27.8 6 19l12.5-1.8L24 6Z"
        fill="currentColor"
        opacity=".1"
      />
      <path
        d="m24 6 5.5 11.2L42 19l-9 8.8L35.2 40 24 34.1 12.8 40 15 27.8 6 19l12.5-1.8L24 6Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

function StoreIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M8 18h32v24H8V18Z" fill="currentColor" opacity=".08" />
      <path d="M8 18h32v24H8V18ZM6 18l4-10h28l4 10" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M18 42V29h12v13M17 8v10M31 8v10" stroke="currentColor" strokeWidth="2.2" />
      <path d="M6 18c0 4 6 5 9 1 3 4 9 4 12 0 3 4 9 3 15-1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </IconBase>
  );
}

function ClockIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="24" cy="24" r="18" fill="currentColor" opacity=".08" />
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.2" />
      <path d="M24 14v11l8 5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
}

const pharmacies = [
  { name: "صيدلية الشفاء", distance: "1.2 كم", stock: "متوفر", eta: "20 دقيقة" },
  { name: "صيدلية النور", distance: "2.8 كم", stock: "كمية محدودة", eta: "35 دقيقة" },
  { name: "صيدلية الحياة", distance: "4.1 كم", stock: "متوفر", eta: "45 دقيقة" },
];

export default function PharmacyPage() {
  const navigate = useNavigate();
  const [panel, setPanel] = useState(null);
  const [medicineImage, setMedicineImage] = useState("");
  const [reportName, setReportName] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [question, setQuestion] = useState("");
  const [searched, setSearched] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState("pickup");
  const [paymentMode, setPaymentMode] = useState("wallet");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const imageInputRef = useRef(null);
  const reportInputRef = useRef(null);
  const chosenPharmacy = useMemo(
    () => pharmacies[selectedPharmacy ?? 0],
    [selectedPharmacy],
  );

  const workflowSteps = useMemo(() => [
    { Icon: CameraIcon, num: "01", label: "صورة أو سؤال", done: Boolean(question.trim() || medicineName.trim() || medicineImage || reportName || searched) },
    { Icon: RadarIcon, num: "02", label: "تحقق من التوفر", done: searched },
    { Icon: MapIcon, num: "03", label: "اختر الصيدلية", done: searched && selectedPharmacy !== null },
    { Icon: DroneIcon, num: "04", label: "استلام أو توصيل", done: confirmed },
  ], [question, medicineName, medicineImage, reportName, searched, selectedPharmacy, confirmed]);

  function goBack() {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => setMedicineImage(String(reader.result));
    reader.readAsDataURL(file);
  }

  function handleReport(event) {
    const file = event.target.files?.[0];
    if (file) setReportName(file.name);
  }

  function closePanel() {
    setPanel(null);
    setSearched(false);
    setConfirmed(false);
    setSelectedPharmacy(null);
  }

  useEffect(() => {
    if (!panel) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePanel();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [panel]);

  const features = [
    {
      title: "الدكتور الصيدلي الذكي",
      tag: "TIBYAN PHARMA AI",
      desc: "محادثة منظمة تفهم اسم الدواء، العمر، الحساسية، الحالة الصحية والأدوية الحالية.",
      Icon: DoctorIcon,
      action: "بدء المحادثة",
      panel: "ai",
    },
    {
      title: "الصيدلي الاستشاري",
      tag: "مراجعة بشرية",
      desc: "استشارة بشرية للحالات المعقدة والتداخلات الدوائية التي تحتاج مختصًا.",
      Icon: HumanIcon,
      action: "طلب استشارة",
      panel: "human",
    },
    {
      title: "البحث الذكي عن الدواء",
      tag: "شبكة الصيدليات",
      desc: "ارفع صورة الدواء أو التقرير، ثم اعرض التوفر والمسافة ووقت الوصول.",
      Icon: RadarIcon,
      action: "بدء البحث",
      panel: "scan",
    },
  ];

  return (
    <>
      <TibyanHeader />
      <main dir="rtl" className="pharmacy-page">
      <div className="ph-bg" aria-hidden="true">
        <div className="ph-grid" />
        <div className="ph-blob one" />
        <div className="ph-blob two" />
      </div>

      <div className="ph-container">
        <section className="ph-hero" aria-labelledby="pharmacy-title">
          <div className="ph-copy">
            <span className="ph-kicker"><i />صيدلية ذكية تستجيب لك في كل لحظة</span>
            <h1 id="pharmacy-title">من صورة الدواء <span>إلى باب منزلك</span></h1>
            <p>
              اسأل الدكتور الصيدلي الذكي، ارفع صورة العبوة أو التقرير، اعثر على الدواء داخل شبكة الصيدليات، ثم اختر الاستلام أو التوصيل والدفع من مكان واحد.
            </p>

            <div className="ph-hero-actions">
              <button type="button" className="primary" onClick={() => setPanel("ai")}>
                <DoctorIcon />
                <span>ابدأ مع الدكتور الذكي</span>
              </button>
              <button type="button" className="secondary" onClick={() => setPanel("scan")}>
                <CameraIcon />
                <span>افحص صورة الدواء</span>
              </button>
            </div>

            <div className="ph-warning">
              <ShieldIcon />
              <p>
                المنصة تقدم معلومات دوائية وإرشادًا أوليًا ولا تستبدل الطبيب أو الصيدلي، ولا تغيّر الجرعات أو الوصفات دون مراجعة مختص.
              </p>
            </div>
          </div>

          <div className="ph-visual" aria-hidden="true">
            <div className="ph-visual-glow" />
            <div className="ph-mini-pharmacy">
              <div className="ph-mini-sign">
                <StoreIcon />
                <div>
                  <b>صيدلية تبيان</b>
                  <small>رعاية أقرب وأسهل</small>
                </div>
              </div>

              <div className="ph-mini-window">
                <span className="ph-mini-bottle"><CapsuleIcon /></span>
                <div className="ph-mini-lines"><i /><i /><i /></div>
                <span className="ph-mini-cross">+</span>
              </div>

              <div className="ph-mini-footer">
                <span><i />متوفر الآن</span>
                <span><ClockIcon />20 دقيقة</span>
              </div>
            </div>

            <span className="ph-scene-chip chip-one"><ShieldIcon /><b>آمن</b></span>
            <span className="ph-scene-chip chip-two"><DroneIcon /><b>توصيل</b></span>
            <span className="ph-scene-chip chip-three"><MapIcon /><b>قريب</b></span>
          </div>
        </section>

        <section className="ph-stats" aria-label="مزايا الصيدلية الذكية">
          {[
            [RadarIcon, "بحث أسرع", "وصول فوري لأقرب صيدلية"],
            [ShieldIcon, "أمان أعلى", "تنبيهات للتداخلات والمخاطر"],
            [BellIcon, "تذكير ذكي", "متابعة مواعيد الجرعات"],
            [HumanIcon, "دعم بشري", "تصعيد مباشر لمختص عند الحاجة"],
          ].map(([Icon, title, desc], index) => (
            <article key={title} style={{ "--stat-index": index }}>
              <span className="ph-stat-icon"><Icon /></span>
              <div><b>{title}</b><small>{desc}</small></div>
            </article>
          ))}
        </section>

        <section className="ph-features-section" aria-labelledby="ph-services-title">
          <div className="ph-section-heading">
            <div>
              <small>الخدمات الأساسية</small>
              <h2 id="ph-services-title">اختر الطريقة الأنسب لك</h2>
            </div>
            <p>أيقونات واضحة وخطوات مباشرة تساعد كل مستخدم على الوصول للخدمة بسرعة.</p>
          </div>

          <div className="ph-features">
            {features.map(({ title, tag, desc, Icon, action, panel: itemPanel }, index) => (
              <article className="ph-card" key={title} style={{ "--card-index": index }}>
                <div className="ph-card-top">
                  <span className="ph-feature-icon"><Icon /></span>
                  <small>{tag}</small>
                </div>
                <h2>{title}</h2>
                <p>{desc}</p>
                <button type="button" onClick={() => setPanel(itemPanel)}>
                  <span>{action}</span>
                  <ArrowIcon />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="ph-workflow-row" aria-label="رحلة الطلب الذكية">
          <article className="ph-workflow">
            <small>رحلة الطلب الذكية</small>
            <h2>أربع مراحل في تجربة واحدة</h2>
            <div className="steps" aria-label="تقدم مراحل الطلب">
              {workflowSteps.map(({ Icon, num, label, done }) => (
                <div
                  key={num}
                  className={`ph-workflow-step ${done ? "is-done" : ""}`}
                  aria-label={`${label}: ${done ? "مكتملة" : "بانتظار التنفيذ"}`}
                >
                  <span className="ph-step-check" aria-hidden="true"><CheckIcon /></span>
                  <span className="ph-step-icon"><Icon /></span>
                  <strong>{done ? "تم" : num}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="ph-smart-section" aria-label="الأمان والخصوصية">
          <article className="ph-smart-main">
            <div className="ph-smart-head">
              <span><HeartPulseIcon /></span>
              <div><small>مساعد الأمان الدوائي</small><h2>تنبيهات ذكية قبل الاستخدام</h2></div>
            </div>
            <p>
              أضف العمر والحساسية والأدوية الحالية ليعرض النظام تنبيهات أولية تساعدك على طرح الأسئلة الصحيحة على الصيدلي.
            </p>
            <div className="ph-smart-points">
              <span><CheckIcon />تداخلات دوائية محتملة</span>
              <span><CheckIcon />تنبيه الحساسية</span>
              <span><CheckIcon />مراجعة ملاءمة العمر</span>
              <span><CheckIcon />تنبيه تكرار المادة الفعالة</span>
            </div>
            <button type="button" onClick={() => setPanel("ai")}><ShieldIcon />ابدأ فحص الأمان</button>
          </article>

          <article className="ph-trust-card">
            <span className="ph-trust-icon"><LockIcon /></span>
            <small>خصوصيتك أولًا</small>
            <h2>بيانات صحية محمية</h2>
            <p>
              الصور والتقارير تستخدم داخل مسار الخدمة فقط، مع واجهة واضحة تمنح المستخدم تحكمًا كاملًا في الملفات المرفوعة.
            </p>
            <div className="ph-trust-row">
              <span><StarIcon />تجربة موثوقة</span>
              <span><ShieldIcon />تحكم بالبيانات</span>
            </div>
          </article>
        </section>

        <section className="ph-bottom-grid" aria-label="مركز التحكم">
          <article className="ph-control">
            <div className="ph-control-head">
              <div><small>مركز التحكم</small><h2>كل شيء تحت السيطرة</h2></div>
              <span><WalletIcon /></span>
            </div>
            {[
              ["التوفر اللحظي", "شبكة الصيدليات"],
              ["طرق الدفع", "محفظة وحساب بنكي"],
              ["التوصيل", "تتبع حالة الطلب"],
            ].map(([a, b]) => (
              <div className="control-row" key={a}><strong>{a}</strong><span>{b}</span></div>
            ))}
            <button type="button" onClick={() => setPanel("order")}>
              <span>فتح مركز الطلب</span>
              <ArrowIcon />
            </button>
          </article>
        </section>
      </div>

      {panel && (
        <div className="ph-modal" onMouseDown={(event) => event.target === event.currentTarget && closePanel()}>
          <section
            className="ph-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ph-dialog-title"
          >
            <button className="ph-close" type="button" onClick={closePanel} aria-label="إغلاق النافذة">
              <CloseIcon />
            </button>

            <aside className={`ph-aside ${panel === "human" ? "green" : ""}`}>
              <span className="ph-aside-icon">
                {panel === "ai" && <DoctorIcon />}
                {panel === "human" && <HumanIcon />}
                {(panel === "scan" || panel === "order") && <CameraIcon />}
              </span>
              <small>
                {panel === "ai"
                  ? "TIBYAN PHARMA AI"
                  : panel === "human"
                    ? "مراجعة بشرية"
                    : "فحص وطلب الدواء"}
              </small>
              <h2 id="ph-dialog-title">
                {panel === "ai"
                  ? "الدكتور الصيدلي الذكي"
                  : panel === "human"
                    ? "الصيدلي الاستشاري"
                    : "ابحث وأكمل طلبك"}
              </h2>
              <p>خطوات واضحة وسريعة داخل صفحة واحدة.</p>

              <div className="ph-aside-guide" aria-hidden="true">
                <i /><i /><i />
              </div>
            </aside>

            <div className="ph-dialog-content">
              {panel === "ai" && (
                <>
                  <h3>ابدأ الحديث عن الدواء</h3>
                  <div className="ph-ai-message">
                    <DoctorIcon />
                    <p>أهلاً بك. أخبرني باسم الدواء أو أرفق صورته، ومن سيستخدمه وما عمره؟</p>
                  </div>
                  <label htmlFor="pharmacy-question">سؤالك</label>
                  <textarea
                    id="pharmacy-question"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="مثال: لدي دواء لا أعرف استخدامه..."
                  />
                  <button className="ph-main-btn" type="button" onClick={() => setConfirmed(true)}>
                    إرسال السؤال
                  </button>
                </>
              )}

              {panel === "human" && (
                <>
                  <h3>اختر موعد الاستشارة</h3>
                  <div className="ph-times">
                    {["اليوم 05:30 مساءً", "اليوم 08:00 مساءً", "غدًا 11:00 صباحًا", "غدًا 06:30 مساءً"].map((time) => (
                      <button key={time} type="button" onClick={() => setConfirmed(true)}>
                        <ClockIcon />
                        <span>{time}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {(panel === "scan" || panel === "order") && !searched && (
                <>
                  <h3>بيانات الدواء</h3>
                  <label htmlFor="medicine-name">اسم الدواء</label>
                  <input
                    id="medicine-name"
                    value={medicineName}
                    onChange={(event) => setMedicineName(event.target.value)}
                    placeholder="اكتب الاسم كما يظهر على العبوة"
                  />

                  <div className="ph-upload-grid">
                    <button type="button" onClick={() => imageInputRef.current?.click()}>
                      <CameraIcon />
                      <span>صورة الدواء</span>
                    </button>
                    <button type="button" onClick={() => reportInputRef.current?.click()}>
                      <ReportIcon />
                      <span>التقرير الطبي</span>
                    </button>
                  </div>

                  {medicineImage && <img className="ph-preview" src={medicineImage} alt="صورة الدواء" />}
                  {reportName && <p className="ph-file">تم إرفاق: {reportName}</p>}

                  <input ref={imageInputRef} type="file" accept="image/*" hidden onChange={handleImage} />
                  <input ref={reportInputRef} type="file" accept=".pdf,image/*" hidden onChange={handleReport} />

                  <button className="ph-main-btn" type="button" onClick={() => setSearched(true)}>
                    البحث داخل شبكة الصيدليات
                  </button>
                </>
              )}

              {(panel === "scan" || panel === "order") && searched && (
                <>
                  <h3>الصيدليات الأقرب</h3>
                  <div className="ph-results" aria-live="polite">
                    {pharmacies.map((item, index) => (
                      <button
                        type="button"
                        className={selectedPharmacy === index ? "selected" : ""}
                        key={item.name}
                        onClick={() => setSelectedPharmacy(index)}
                      >
                        <div><strong>{item.name}</strong><small>{item.distance} • {item.eta}</small></div>
                        <span>{item.stock}</span>
                      </button>
                    ))}
                  </div>

                  <div className="ph-choice-grid">
                    <button
                      type="button"
                      className={deliveryMode === "pickup" ? "selected" : ""}
                      onClick={() => setDeliveryMode("pickup")}
                    >
                      <MapIcon />
                      <span>استلام من الصيدلية</span>
                    </button>
                    <button
                      type="button"
                      className={deliveryMode === "delivery" ? "selected green" : ""}
                      onClick={() => setDeliveryMode("delivery")}
                    >
                      <DroneIcon />
                      <span>توصيل إلى الموقع</span>
                    </button>
                  </div>

                  <div className="ph-payments" aria-label="طرق الدفع">
                    {[
                      ["wallet", "محفظة إلكترونية"],
                      ["bank", "حساب بنكي"],
                      ["cash", "عند الاستلام"],
                    ].map(([value, label]) => (
                      <button
                        type="button"
                        key={value}
                        className={paymentMode === value ? "selected" : ""}
                        onClick={() => setPaymentMode(value)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <div className="ph-summary">
                    {chosenPharmacy.name} — {deliveryMode === "pickup" ? "استلام شخصي" : "توصيل"} — {paymentMode === "wallet" ? "محفظة إلكترونية" : paymentMode === "bank" ? "حساب بنكي" : "عند الاستلام"}
                  </div>

                  <button className="ph-main-btn green" type="button" onClick={() => setConfirmed(true)}>
                    تأكيد الطلب
                  </button>
                </>
              )}

              {confirmed && (
                <div className="ph-success" role="status" aria-live="polite">
                  <CheckIcon />
                  <p>تم تسجيل طلبك بنجاح.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}


      <style>{`
        .pharmacy-page,
        .pharmacy-page * {
          box-sizing: border-box;
        }

        .pharmacy-page {
          --ph-primary: #0868c4;
          --ph-primary-dark: #064b8d;
          --ph-teal: #0b9fa7;
          --ph-green: #27b96f;
          --ph-ink: #123f61;
          --ph-muted: #5e8197;
          --ph-line: rgba(7, 91, 145, 0.12);
          --ph-soft-blue: #edf7ff;
          --ph-soft-teal: #eefcfb;
          --ph-soft-green: #effbf4;
          --ph-white: #ffffff;
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          background: #f4f9fd;
          color: var(--ph-ink);
          font-family: "IBM Plex Sans Arabic", "Noto Kufi Arabic", Tahoma, Arial, sans-serif;
          font-size: 16px;
          line-height: 1.65;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        .pharmacy-page button,
        .pharmacy-page input,
        .pharmacy-page textarea {
          font: inherit;
        }

        .pharmacy-page button {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .pharmacy-page button:focus-visible,
        .pharmacy-page input:focus-visible,
        .pharmacy-page textarea:focus-visible {
          outline: 3px solid rgba(8, 104, 196, 0.28);
          outline-offset: 3px;
        }

        .ph-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .ph-grid {
          position: absolute;
          inset: 0;
          opacity: 0.52;
          background-image:
            linear-gradient(rgba(8, 104, 196, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8, 104, 196, 0.035) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: linear-gradient(to bottom, black 0%, transparent 88%);
        }

        .ph-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.65;
        }

        .ph-blob.one {
          width: 360px;
          height: 360px;
          right: -170px;
          top: 70px;
          background: rgba(8, 104, 196, 0.16);
        }

        .ph-blob.two {
          width: 420px;
          height: 420px;
          left: -190px;
          bottom: 5%;
          background: rgba(11, 159, 167, 0.14);
        }

        .ph-container {
          position: relative;
          z-index: 2;
          width: min(calc(100% - 32px), 1220px);
          margin-inline: auto;
          padding: 18px 0 125px;
        }

        .ph-topbar {
          min-height: 68px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 14px;
          padding: 8px 10px;
          border: 1px solid rgba(7, 91, 145, 0.1);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 16px 40px rgba(3, 66, 112, 0.08);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .ph-back {
          justify-self: start;
          min-width: 112px;
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 16px;
          border: 1px solid rgba(8, 104, 196, 0.15);
          border-radius: 15px;
          background: #fff;
          color: var(--ph-primary);
          font-size: 14px;
          font-weight: 900;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .ph-back:hover {
          transform: translateY(-2px);
          background: var(--ph-primary);
          color: #fff;
        }

        .ph-back svg {
          width: 21px;
          height: 21px;
        }

        .ph-page-identity {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .ph-page-icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          background: linear-gradient(145deg, var(--ph-primary), var(--ph-teal));
          color: #fff;
          box-shadow: 0 12px 24px rgba(8, 104, 196, 0.2);
        }

        .ph-page-icon svg {
          width: 29px;
          height: 29px;
        }

        .ph-page-identity small,
        .ph-page-identity strong {
          display: block;
          white-space: nowrap;
        }

        .ph-page-identity small {
          color: var(--ph-teal);
          font-size: 11px;
          font-weight: 800;
        }

        .ph-page-identity strong {
          color: var(--ph-primary-dark);
          font-size: 18px;
          font-weight: 900;
        }

        .ph-live-status {
          justify-self: end;
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 14px;
          border: 1px solid rgba(39, 185, 111, 0.15);
          border-radius: 999px;
          background: var(--ph-soft-green);
          color: #17794b;
          font-size: 12px;
          font-weight: 900;
        }

        .ph-live-status i {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--ph-green);
          box-shadow: 0 0 0 5px rgba(39, 185, 111, 0.13);
        }

        .ph-hero {
          position: relative;
          overflow: hidden;
          margin-top: 16px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 350px;
          align-items: center;
          gap: 36px;
          padding: 42px;
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 30px;
          background:
            linear-gradient(135deg, rgba(255,255,255,.98), rgba(243,251,255,.94));
          box-shadow: 0 28px 80px rgba(4, 70, 127, 0.11);
        }

        .ph-hero::before {
          content: "";
          position: absolute;
          width: 260px;
          height: 260px;
          right: -90px;
          bottom: -130px;
          border-radius: 50%;
          border: 42px solid rgba(11, 159, 167, 0.055);
          pointer-events: none;
        }

        .ph-copy {
          position: relative;
          z-index: 2;
          min-width: 0;
        }

        .ph-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 36px;
          padding: 7px 13px;
          border: 1px solid rgba(11, 159, 167, 0.14);
          border-radius: 999px;
          background: var(--ph-soft-teal);
          color: #087f87;
          font-size: 12px;
          font-weight: 900;
        }

        .ph-kicker i {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--ph-green);
          box-shadow: 0 0 0 5px rgba(39, 185, 111, 0.12);
        }

        .ph-copy h1 {
          max-width: 760px;
          margin: 18px 0 0;
          color: var(--ph-primary-dark);
          font-size: clamp(38px, 5vw, 64px);
          line-height: 1.2;
          font-weight: 950;
          letter-spacing: -0.03em;
        }

        .ph-copy h1 span {
          display: block;
          background: linear-gradient(270deg, var(--ph-primary), var(--ph-teal), var(--ph-green));
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }

        .ph-copy > p {
          max-width: 760px;
          margin: 20px 0 0;
          color: var(--ph-muted);
          font-size: 16px;
          line-height: 2;
          font-weight: 650;
        }

        .ph-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }

        .ph-hero-actions button {
          min-height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 20px;
          border-radius: 17px;
          font-size: 14px;
          font-weight: 900;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .ph-hero-actions button:hover {
          transform: translateY(-3px);
        }

        .ph-hero-actions svg {
          width: 28px;
          height: 28px;
          flex: 0 0 auto;
        }

        .ph-hero-actions .primary {
          border: 0;
          background: linear-gradient(135deg, var(--ph-primary), var(--ph-teal));
          color: #fff;
          box-shadow: 0 16px 32px rgba(8, 104, 196, 0.22);
        }

        .ph-hero-actions .secondary {
          border: 1px solid rgba(8, 104, 196, 0.15);
          background: #fff;
          color: var(--ph-primary);
          box-shadow: 0 12px 26px rgba(4, 70, 127, 0.07);
        }

        .ph-warning {
          max-width: 760px;
          margin-top: 20px;
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 14px 15px;
          border: 1px solid rgba(218, 166, 53, 0.26);
          border-radius: 16px;
          background: #fffaf0;
          color: #6f5a2b;
        }

        .ph-warning svg {
          width: 28px;
          height: 28px;
          flex: 0 0 auto;
          color: #b78b2f;
        }

        .ph-warning p {
          margin: 0;
          font-size: 12px;
          line-height: 1.9;
          font-weight: 800;
        }

        .ph-visual {
          position: relative;
          min-height: 310px;
          display: grid;
          place-items: center;
          isolation: isolate;
        }

        .ph-visual-glow {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(11,159,167,.2), rgba(8,104,196,.1) 45%, transparent 72%);
          filter: blur(12px);
        }

        .ph-mini-pharmacy {
          position: relative;
          z-index: 2;
          width: min(100%, 290px);
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 26px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 26px 62px rgba(4, 70, 127, 0.17);
          transform: rotate(-1.5deg);
        }

        .ph-mini-sign {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border-radius: 17px;
          background: linear-gradient(135deg, var(--ph-primary), var(--ph-teal));
          color: #fff;
        }

        .ph-mini-sign > svg {
          width: 38px;
          height: 38px;
          flex: 0 0 auto;
        }

        .ph-mini-sign b,
        .ph-mini-sign small {
          display: block;
        }

        .ph-mini-sign b {
          font-size: 14px;
          font-weight: 950;
        }

        .ph-mini-sign small {
          margin-top: 1px;
          color: rgba(255,255,255,.76);
          font-size: 9px;
          font-weight: 700;
        }

        .ph-mini-window {
          position: relative;
          min-height: 128px;
          margin-top: 12px;
          display: grid;
          grid-template-columns: 92px 1fr;
          align-items: center;
          gap: 12px;
          padding: 14px;
          overflow: hidden;
          border: 1px solid rgba(8, 104, 196, 0.08);
          border-radius: 18px;
          background: linear-gradient(145deg, #f8fcff, #effaf9);
        }

        .ph-mini-bottle {
          width: 82px;
          height: 96px;
          display: grid;
          place-items: center;
          border: 5px solid #fff;
          border-radius: 18px 18px 24px 24px;
          background: linear-gradient(145deg, #e8f7ff, #dff8f5);
          color: var(--ph-primary);
          box-shadow: 0 12px 24px rgba(4,70,127,.1);
        }

        .ph-mini-bottle::before {
          content: "";
          position: absolute;
          width: 44px;
          height: 13px;
          margin-top: -100px;
          border-radius: 7px 7px 3px 3px;
          background: var(--ph-primary);
        }

        .ph-mini-bottle svg {
          width: 48px;
          height: 48px;
        }

        .ph-mini-lines {
          display: grid;
          gap: 10px;
        }

        .ph-mini-lines i {
          height: 9px;
          border-radius: 999px;
          background: rgba(8,104,196,.11);
        }

        .ph-mini-lines i:nth-child(2) { width: 82%; }
        .ph-mini-lines i:nth-child(3) { width: 64%; }

        .ph-mini-cross {
          position: absolute;
          left: 14px;
          bottom: 8px;
          color: var(--ph-green);
          font-size: 36px;
          font-weight: 900;
          line-height: 1;
          opacity: 0.75;
        }

        .ph-mini-footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .ph-mini-footer span {
          min-height: 30px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0 9px;
          border-radius: 999px;
          background: var(--ph-soft-green);
          color: #187a4b;
          font-size: 9px;
          font-weight: 900;
        }

        .ph-mini-footer span:first-child i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--ph-green);
        }

        .ph-mini-footer svg {
          width: 15px;
          height: 15px;
        }

        .ph-scene-chip {
          position: absolute;
          z-index: 3;
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 11px;
          border: 1px solid rgba(7,91,145,.1);
          border-radius: 14px;
          background: rgba(255,255,255,.98);
          color: var(--ph-primary);
          box-shadow: 0 12px 26px rgba(4,70,127,.12);
          animation: phFloat 4s ease-in-out infinite;
        }

        .ph-scene-chip svg {
          width: 23px;
          height: 23px;
        }

        .ph-scene-chip b {
          font-size: 10px;
          font-weight: 900;
        }

        .ph-scene-chip.chip-one { top: 16px; right: 2px; }
        .ph-scene-chip.chip-two { bottom: 22px; left: -4px; animation-delay: .8s; color: var(--ph-teal); }
        .ph-scene-chip.chip-three { top: 80px; left: -14px; animation-delay: 1.5s; color: var(--ph-green); }

        .ph-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 16px;
        }

        .ph-stats article {
          min-width: 0;
          min-height: 104px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          border: 1px solid var(--ph-line);
          border-radius: 19px;
          background: rgba(255,255,255,.94);
          box-shadow: 0 12px 30px rgba(4,70,127,.055);
          transition: transform .22s ease, box-shadow .22s ease;
        }

        .ph-stats article:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 38px rgba(4,70,127,.09);
        }

        .ph-stat-icon {
          width: 52px;
          height: 52px;
          flex: 0 0 52px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          background: linear-gradient(145deg, var(--ph-soft-blue), var(--ph-soft-teal));
          color: var(--ph-primary);
        }

        .ph-stats article:nth-child(2) .ph-stat-icon,
        .ph-stats article:nth-child(4) .ph-stat-icon {
          color: var(--ph-teal);
        }

        .ph-stats article:nth-child(3) .ph-stat-icon {
          color: var(--ph-green);
        }

        .ph-stat-icon svg {
          width: 30px;
          height: 30px;
        }

        .ph-stats b,
        .ph-stats small {
          display: block;
        }

        .ph-stats b {
          color: var(--ph-primary-dark);
          font-size: 14px;
          font-weight: 950;
        }

        .ph-stats small {
          margin-top: 4px;
          color: var(--ph-muted);
          font-size: 11px;
          line-height: 1.55;
          font-weight: 650;
        }

        .ph-features-section {
          margin-top: 34px;
        }

        .ph-section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 15px;
        }

        .ph-section-heading small {
          display: block;
          color: var(--ph-teal);
          font-size: 12px;
          font-weight: 900;
        }

        .ph-section-heading h2 {
          margin: 4px 0 0;
          color: var(--ph-primary-dark);
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.35;
          font-weight: 950;
        }

        .ph-section-heading p {
          max-width: 440px;
          margin: 0;
          color: var(--ph-muted);
          font-size: 12px;
          line-height: 1.8;
          font-weight: 650;
        }

        .ph-features {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .ph-card,
        .ph-smart-main,
        .ph-trust-card,
        .ph-workflow,
        .ph-control {
          border: 1px solid var(--ph-line);
          background: rgba(255,255,255,.97);
          box-shadow: 0 16px 44px rgba(4,70,127,.065);
        }

        .ph-card {
          position: relative;
          overflow: hidden;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          padding: 22px;
          border-radius: 24px;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }

        .ph-card::before {
          content: "";
          position: absolute;
          width: 150px;
          height: 150px;
          left: -70px;
          top: -70px;
          border-radius: 50%;
          background: rgba(8,104,196,.06);
        }

        .ph-card:hover {
          transform: translateY(-7px);
          border-color: rgba(11,159,167,.3);
          box-shadow: 0 25px 58px rgba(4,70,127,.12);
        }

        .ph-card-top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .ph-feature-icon {
          width: clamp(48px, 4vw, 56px);
          height: clamp(48px, 4vw, 56px);
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border-radius: 17px;
          background: linear-gradient(145deg, var(--ph-primary), var(--ph-teal));
          color: #fff;
          box-shadow: 0 16px 30px rgba(8,104,196,.2);
        }

        .ph-card:nth-child(2) .ph-feature-icon {
          background: linear-gradient(145deg, #1d9c6a, var(--ph-teal));
        }

        .ph-card:nth-child(3) .ph-feature-icon {
          background: linear-gradient(145deg, #0875bb, #4c8fe4);
        }

        .ph-feature-icon svg {
          width: clamp(26px, 2.6vw, 32px);
          height: clamp(26px, 2.6vw, 32px);
        }

        .ph-card-top small {
          min-height: 32px;
          display: inline-flex;
          align-items: center;
          padding: 0 10px;
          border: 1px solid rgba(11,159,167,.12);
          border-radius: 999px;
          background: var(--ph-soft-teal);
          color: #087f87;
          font-size: 9px;
          font-weight: 900;
        }

        .ph-card h2 {
          position: relative;
          z-index: 1;
          margin: 22px 0 0;
          color: var(--ph-primary-dark);
          font-size: 22px;
          line-height: 1.45;
          font-weight: 950;
        }

        .ph-card p {
          position: relative;
          z-index: 1;
          margin: 10px 0 0;
          color: var(--ph-muted);
          font-size: 13px;
          line-height: 1.9;
          font-weight: 650;
        }

        .ph-card > button,
        .ph-control > button {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 50px;
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 0;
          border-radius: 15px;
          background: linear-gradient(135deg, var(--ph-primary), var(--ph-teal));
          color: #fff;
          font-size: 13px;
          font-weight: 900;
          box-shadow: 0 13px 26px rgba(8,104,196,.16);
        }

        .ph-card > button svg,
        .ph-control > button svg {
          width: 20px;
          height: 20px;
        }

        .ph-workflow-row {
          margin-top: 16px;
        }

        .ph-workflow-row .ph-workflow {
          width: 100%;
        }

        .ph-smart-section {
          display: grid;
          grid-template-columns: 1.25fr .75fr;
          gap: 14px;
          margin-top: 16px;
        }

        .ph-smart-main,
        .ph-trust-card {
          padding: 24px;
          border-radius: 24px;
        }

        .ph-smart-main {
          background:
            linear-gradient(145deg, rgba(255,255,255,.98), rgba(244,251,255,.97));
        }

        .ph-smart-head {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .ph-smart-head > span,
        .ph-trust-icon {
          width: 60px;
          height: 60px;
          flex: 0 0 60px;
          display: grid;
          place-items: center;
          border-radius: 19px;
          background: linear-gradient(145deg, var(--ph-primary), var(--ph-teal));
          color: #fff;
          box-shadow: 0 14px 28px rgba(8,104,196,.18);
        }

        .ph-smart-head svg,
        .ph-trust-icon svg {
          width: 35px;
          height: 35px;
        }

        .ph-smart-head small,
        .ph-trust-card > small,
        .ph-workflow > small,
        .ph-control small {
          color: var(--ph-teal);
          font-size: 11px;
          font-weight: 900;
        }

        .ph-smart-head h2,
        .ph-trust-card h2,
        .ph-workflow h2,
        .ph-control h2 {
          margin: 4px 0 0;
          color: var(--ph-primary-dark);
          font-size: 22px;
          line-height: 1.45;
          font-weight: 950;
        }

        .ph-smart-main > p,
        .ph-trust-card > p {
          margin: 14px 0 0;
          color: var(--ph-muted);
          font-size: 13px;
          line-height: 1.9;
          font-weight: 650;
        }

        .ph-smart-points {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 9px;
          margin-top: 15px;
        }

        .ph-smart-points span {
          min-height: 48px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px;
          border: 1px solid rgba(39,185,111,.08);
          border-radius: 13px;
          background: var(--ph-soft-green);
          color: #336a50;
          font-size: 11px;
          font-weight: 900;
        }

        .ph-smart-points svg {
          width: 21px;
          height: 21px;
          flex: 0 0 auto;
          color: var(--ph-green);
        }

        .ph-smart-main > button {
          width: 100%;
          min-height: 50px;
          margin-top: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: 15px;
          background: linear-gradient(135deg, var(--ph-primary), var(--ph-teal));
          color: #fff;
          font-size: 13px;
          font-weight: 900;
        }

        .ph-smart-main > button svg {
          width: 23px;
          height: 23px;
        }

        .ph-trust-card {
          background: linear-gradient(145deg, #fff, #f2fbf7);
        }

        .ph-trust-icon {
          margin-bottom: 14px;
          background: linear-gradient(145deg, var(--ph-green), var(--ph-teal));
          box-shadow: 0 14px 28px rgba(39,185,111,.17);
        }

        .ph-trust-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          margin-top: 15px;
        }

        .ph-trust-row span {
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 8px;
          border: 1px solid rgba(11,159,167,.1);
          border-radius: 13px;
          background: #fff;
          color: #427085;
          font-size: 10px;
          font-weight: 900;
        }

        .ph-trust-row svg {
          width: 20px;
          height: 20px;
          color: var(--ph-teal);
        }

        .ph-bottom-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-top: 16px;
        }

        .ph-workflow,
        .ph-control {
          padding: 24px;
          border-radius: 24px;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          margin-top: 17px;
        }

        .steps > div {
          min-height: 146px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 13px 9px;
          border: 1px solid var(--ph-line);
          border-radius: 17px;
          background: linear-gradient(145deg, #f8fcff, #f1faf9);
          text-align: center;
        }

        .ph-workflow-step {
          position: relative;
          overflow: hidden;
          transition: transform .24s ease, border-color .24s ease, background .24s ease, box-shadow .24s ease;
        }

        .ph-workflow-step::after {
          content: "";
          position: absolute;
          inset-inline: 18%;
          bottom: 0;
          height: 3px;
          border-radius: 999px 999px 0 0;
          background: rgba(8,104,196,.12);
          transition: inset .24s ease, background .24s ease;
        }

        .ph-workflow-step.is-done {
          border-color: rgba(39,185,111,.34);
          background: linear-gradient(145deg, #ffffff, var(--ph-soft-green));
          box-shadow: 0 13px 28px rgba(39,185,111,.12);
          transform: translateY(-3px);
        }

        .ph-workflow-step.is-done::after {
          inset-inline: 0;
          background: var(--ph-green);
        }

        .ph-step-check {
          position: absolute;
          top: 8px;
          left: 8px;
          width: 25px;
          height: 25px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #fff;
          color: #9db1bd;
          opacity: 0;
          transform: scale(.65);
          transition: opacity .2s ease, transform .24s ease, color .2s ease;
        }

        .ph-step-check svg {
          width: 25px;
          height: 25px;
        }

        .ph-workflow-step.is-done .ph-step-check {
          opacity: 1;
          transform: scale(1);
          color: var(--ph-green);
        }

        .ph-workflow-step.is-done .ph-step-icon {
          background: var(--ph-green);
          color: #fff;
          box-shadow: 0 10px 22px rgba(39,185,111,.2);
        }

        .ph-workflow-step.is-done strong {
          color: var(--ph-green);
        }

        .ph-step-icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          background: #fff;
          color: var(--ph-primary);
          box-shadow: 0 10px 22px rgba(4,70,127,.08);
        }

        .ph-step-icon svg {
          width: 29px;
          height: 29px;
        }

        .steps strong {
          margin-top: 10px;
          color: var(--ph-teal);
          font-size: 12px;
          font-weight: 950;
        }

        .steps > div > span:last-child {
          margin-top: 3px;
          color: #416c85;
          font-size: 10px;
          line-height: 1.5;
          font-weight: 900;
        }

        .ph-control-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .ph-control-head > span {
          width: 58px;
          height: 58px;
          flex: 0 0 58px;
          display: grid;
          place-items: center;
          border-radius: 18px;
          background: var(--ph-soft-blue);
          color: var(--ph-primary);
        }

        .ph-control-head svg {
          width: 34px;
          height: 34px;
        }

        .control-row {
          min-height: 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 10px;
          padding: 11px 13px;
          border: 1px solid rgba(8,104,196,.07);
          border-radius: 14px;
          background: #f8fcff;
          font-size: 11px;
        }

        .control-row strong {
          color: var(--ph-primary-dark);
          font-weight: 900;
        }

        .control-row span {
          color: var(--ph-teal);
          text-align: left;
          font-weight: 800;
        }

        .ph-control > button {
          margin-top: 14px;
        }

        .ph-modal {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: grid;
          place-items: center;
          padding: 18px;
          overflow-y: auto;
          background: rgba(3,47,87,.62);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .ph-dialog {
          position: relative;
          width: min(100%, 930px);
          max-height: calc(100dvh - 36px);
          overflow: hidden;
          display: grid;
          grid-template-columns: 0.72fr 1.28fr;
          border: 1px solid rgba(255,255,255,.65);
          border-radius: 28px;
          background: #fff;
          box-shadow: 0 40px 110px rgba(1,35,67,.4);
        }

        .ph-close {
          position: absolute;
          left: 14px;
          top: 14px;
          z-index: 6;
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          padding: 0;
          border: 1px solid rgba(8,104,196,.12);
          border-radius: 14px;
          background: #fff;
          color: #5f8196;
          box-shadow: 0 8px 18px rgba(4,70,127,.08);
        }

        .ph-close:hover {
          color: #c43b48;
          background: #fff5f5;
        }

        .ph-close svg {
          width: 23px;
          height: 23px;
        }

        .ph-aside {
          position: relative;
          min-height: 470px;
          padding: 32px;
          overflow: hidden;
          background: linear-gradient(145deg, #064a8a, var(--ph-primary) 55%, var(--ph-teal));
          color: #fff;
        }

        .ph-aside::after {
          content: "";
          position: absolute;
          width: 240px;
          height: 240px;
          left: -100px;
          bottom: -110px;
          border: 34px solid rgba(255,255,255,.08);
          border-radius: 50%;
        }

        .ph-aside.green {
          background: linear-gradient(145deg, #17784e, var(--ph-green) 54%, var(--ph-teal));
        }

        .ph-aside-icon {
          width: 72px;
          height: 72px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 22px;
          background: rgba(255,255,255,.14);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.16);
        }

        .ph-aside-icon svg {
          width: 44px;
          height: 44px;
        }

        .ph-aside small {
          display: block;
          margin-top: 24px;
          color: #d8fff8;
          font-size: 11px;
          font-weight: 900;
        }

        .ph-aside h2 {
          margin: 6px 0 0;
          font-size: 28px;
          line-height: 1.45;
          font-weight: 950;
        }

        .ph-aside p {
          margin: 12px 0 0;
          color: rgba(255,255,255,.79);
          font-size: 13px;
          line-height: 1.8;
          font-weight: 650;
        }

        .ph-aside-guide {
          position: absolute;
          right: 32px;
          bottom: 30px;
          display: flex;
          gap: 8px;
        }

        .ph-aside-guide i {
          width: 34px;
          height: 5px;
          border-radius: 999px;
          background: rgba(255,255,255,.35);
        }

        .ph-aside-guide i:first-child {
          width: 52px;
          background: #fff;
        }

        .ph-dialog-content {
          min-height: 0;
          max-height: calc(100dvh - 36px);
          overflow-y: auto;
          padding: 34px;
          scrollbar-width: thin;
          scrollbar-color: rgba(8,104,196,.25) transparent;
        }

        .ph-dialog-content h3 {
          margin: 0 0 16px;
          color: var(--ph-primary-dark);
          font-size: 24px;
          line-height: 1.45;
          font-weight: 950;
        }

        .ph-dialog-content > label {
          display: block;
          margin: 14px 0 7px;
          color: #315f7a;
          font-size: 12px;
          font-weight: 900;
        }

        .ph-dialog-content > input,
        .ph-dialog-content textarea {
          width: 100%;
          min-height: 50px;
          border: 1px solid rgba(8,104,196,.17);
          border-radius: 15px;
          background: #f8fcff;
          padding: 13px 14px;
          color: #315f7a;
          outline: 0;
          font-size: 14px;
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }

        .ph-dialog-content > input:focus,
        .ph-dialog-content textarea:focus {
          border-color: rgba(8,104,196,.45);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(8,104,196,.08);
        }

        .ph-dialog-content textarea {
          min-height: 140px;
          resize: vertical;
        }

        .ph-ai-message {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 14px;
          border: 1px solid rgba(8,104,196,.08);
          border-radius: 16px;
          background: #f7fcff;
        }

        .ph-ai-message svg {
          width: 40px;
          height: 40px;
          flex: 0 0 auto;
          color: var(--ph-primary);
        }

        .ph-ai-message p {
          margin: 0;
          color: #416c85;
          font-size: 13px;
          line-height: 1.8;
          font-weight: 650;
        }

        .ph-main-btn {
          width: 100%;
          min-height: 52px;
          margin-top: 16px;
          border: 0;
          border-radius: 15px;
          background: linear-gradient(135deg, var(--ph-primary), var(--ph-teal));
          color: #fff;
          font-size: 14px;
          font-weight: 900;
          box-shadow: 0 13px 28px rgba(8,104,196,.17);
        }

        .ph-main-btn.green {
          background: linear-gradient(135deg, var(--ph-green), var(--ph-teal));
        }

        .ph-times,
        .ph-upload-grid,
        .ph-choice-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .ph-times button,
        .ph-upload-grid button,
        .ph-choice-grid button {
          min-height: 108px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 14px;
          border: 1px solid rgba(8,104,196,.13);
          border-radius: 16px;
          background: #f8fcff;
          color: var(--ph-primary-dark);
          font-size: 12px;
          font-weight: 900;
          transition: transform .2s ease, border-color .2s ease, background .2s ease;
        }

        .ph-times button:hover,
        .ph-upload-grid button:hover,
        .ph-choice-grid button:hover {
          transform: translateY(-2px);
          border-color: rgba(8,104,196,.33);
          background: #fff;
        }

        .ph-times svg,
        .ph-upload-grid svg,
        .ph-choice-grid svg {
          width: 38px;
          height: 38px;
          color: var(--ph-primary);
        }

        .ph-upload-grid {
          margin-top: 14px;
        }

        .ph-upload-grid span,
        .ph-choice-grid span {
          display: block;
          font-size: 11px;
        }

        .ph-preview {
          width: 100%;
          height: 190px;
          object-fit: cover;
          border: 1px solid var(--ph-line);
          border-radius: 16px;
          margin-top: 12px;
        }

        .ph-file {
          margin: 11px 0 0;
          padding: 11px 12px;
          border: 1px solid rgba(39,185,111,.15);
          border-radius: 13px;
          background: var(--ph-soft-green);
          color: #1f8052;
          font-size: 11px;
          font-weight: 900;
        }

        .ph-results {
          display: grid;
          gap: 9px;
        }

        .ph-results button {
          width: 100%;
          min-height: 72px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 13px 14px;
          border: 1px solid rgba(8,104,196,.11);
          border-radius: 15px;
          background: #f8fcff;
          text-align: right;
        }

        .ph-results button.selected {
          border-color: rgba(11,159,167,.34);
          background: var(--ph-soft-teal);
          box-shadow: inset 4px 0 0 var(--ph-teal);
        }

        .ph-results strong {
          display: block;
          color: var(--ph-primary-dark);
          font-size: 13px;
          font-weight: 950;
        }

        .ph-results small {
          display: block;
          margin-top: 3px;
          color: var(--ph-muted);
          font-size: 10px;
          font-weight: 700;
        }

        .ph-results button > span {
          flex: 0 0 auto;
          padding: 5px 9px;
          border-radius: 999px;
          background: var(--ph-soft-green);
          color: #17814f;
          font-size: 9px;
          font-weight: 900;
        }

        .ph-choice-grid {
          margin-top: 12px;
        }

        .ph-choice-grid button.selected {
          border-color: rgba(8,104,196,.36);
          background: var(--ph-soft-blue);
          box-shadow: inset 0 0 0 2px rgba(8,104,196,.05);
        }

        .ph-choice-grid button.selected.green {
          border-color: rgba(39,185,111,.36);
          background: var(--ph-soft-green);
        }

        .ph-choice-grid button.selected.green svg {
          color: var(--ph-green);
        }

        .ph-payments {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          margin-top: 12px;
        }

        .ph-payments button {
          min-height: 48px;
          padding: 9px;
          border: 1px solid rgba(8,104,196,.11);
          border-radius: 13px;
          background: #fff;
          color: #5f8196;
          font-size: 10px;
          font-weight: 900;
        }

        .ph-payments button.selected {
          border-color: rgba(11,159,167,.3);
          background: var(--ph-soft-teal);
          color: var(--ph-primary);
        }

        .ph-summary {
          margin-top: 12px;
          padding: 13px;
          border: 1px dashed rgba(8,104,196,.18);
          border-radius: 14px;
          background: #f8fcff;
          color: var(--ph-primary-dark);
          font-size: 11px;
          line-height: 1.7;
          font-weight: 900;
        }

        .ph-success {
          margin-top: 13px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px 13px;
          border: 1px solid rgba(39,185,111,.24);
          border-radius: 14px;
          background: var(--ph-soft-green);
          color: #1d8050;
        }

        .ph-success svg {
          width: 24px;
          height: 24px;
          flex: 0 0 auto;
        }

        .ph-success p {
          margin: 0;
          font-size: 12px;
          font-weight: 900;
        }

        .ph-scan-line {
          animation: phScan 2s ease-in-out infinite;
        }

        .ph-radar-ring,
        .ph-radar-hand {
          animation: phSpin 2.8s linear infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        .ph-rotor {
          animation: phSpin .8s linear infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        .ph-rotor.reverse {
          animation-direction: reverse;
        }

        @keyframes phSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes phFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        @keyframes phScan {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(5px); }
        }

        @media (max-width: 1040px) {
          .ph-hero {
            grid-template-columns: minmax(0, 1fr) 300px;
            gap: 24px;
            padding: 34px;
          }

          .ph-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ph-features {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ph-card:last-child {
            grid-column: 1 / -1;
            min-height: 260px;
          }

          .ph-bottom-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1040px) and (min-width: 641px) {
          .ph-feature-icon {
            width: 50px;
            height: 50px;
            border-radius: 15px;
          }

          .ph-feature-icon svg {
            width: 28px;
            height: 28px;
          }
        }

        @media (max-width: 820px) {
          .ph-container {
            width: min(calc(100% - 22px), 760px);
          }

          .ph-topbar {
            grid-template-columns: auto 1fr auto;
          }

          .ph-page-identity {
            justify-self: center;
          }

          .ph-hero {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .ph-visual {
            min-height: 250px;
          }

          .ph-mini-pharmacy {
            width: 280px;
          }

          .ph-smart-section {
            grid-template-columns: 1fr;
          }

          .ph-dialog {
            grid-template-columns: 1fr;
            overflow-y: auto;
          }

          .ph-aside {
            min-height: auto;
            padding: 24px;
          }

          .ph-aside-guide {
            display: none;
          }

          .ph-dialog-content {
            max-height: none;
          }
        }

        @media (max-width: 640px) {
          .pharmacy-page {
            font-size: 15px;
          }

          .ph-container {
            width: 100%;
            padding-top: 8px;
          }

          .ph-topbar {
            width: calc(100% - 16px);
            min-height: 60px;
            margin-inline: auto;
            padding: 6px;
            border-radius: 18px;
          }

          .ph-back {
            min-width: 48px;
            width: 48px;
            min-height: 48px;
            padding: 0;
            border-radius: 14px;
          }

          .ph-back span {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
          }

          .ph-page-icon {
            width: 42px;
            height: 42px;
            border-radius: 13px;
          }

          .ph-page-icon svg {
            width: 25px;
            height: 25px;
          }

          .ph-page-identity small {
            font-size: 8px;
          }

          .ph-page-identity strong {
            font-size: 14px;
          }

          .ph-live-status {
            width: 42px;
            min-height: 42px;
            padding: 0;
            justify-content: center;
            font-size: 0;
          }

          .ph-live-status i {
            width: 10px;
            height: 10px;
          }

          .ph-hero {
            width: calc(100% - 16px);
            margin: 10px auto 0;
            padding: 24px 16px;
            border-radius: 24px;
          }

          .ph-kicker {
            min-height: 32px;
            padding: 6px 10px;
            font-size: 9px;
          }

          .ph-copy h1 {
            margin-top: 14px;
            font-size: clamp(31px, 10.4vw, 42px);
            line-height: 1.22;
          }

          .ph-copy > p {
            margin-top: 14px;
            font-size: 13px;
            line-height: 1.9;
          }

          .ph-hero-actions {
            display: grid;
            grid-template-columns: 1fr;
            gap: 9px;
            margin-top: 20px;
          }

          .ph-hero-actions button {
            width: 100%;
            min-height: 52px;
            font-size: 13px;
          }

          .ph-warning {
            margin-top: 14px;
            padding: 12px;
          }

          .ph-warning p {
            font-size: 10px;
          }

          .ph-visual {
            min-height: 220px;
          }

          .ph-mini-pharmacy {
            width: 245px;
            padding: 12px;
            border-radius: 22px;
          }

          .ph-mini-sign {
            padding: 8px;
          }

          .ph-mini-sign > svg {
            width: 31px;
            height: 31px;
          }

          .ph-mini-sign b {
            font-size: 12px;
          }

          .ph-mini-window {
            min-height: 100px;
            grid-template-columns: 72px 1fr;
            padding: 10px;
          }

          .ph-mini-bottle {
            width: 66px;
            height: 78px;
          }

          .ph-mini-bottle::before {
            width: 35px;
            margin-top: -82px;
          }

          .ph-mini-bottle svg {
            width: 38px;
            height: 38px;
          }

          .ph-scene-chip {
            min-height: 36px;
            padding: 5px 8px;
          }

          .ph-scene-chip svg {
            width: 19px;
            height: 19px;
          }

          .ph-scene-chip b {
            font-size: 8px;
          }

          .ph-scene-chip.chip-one { top: 2px; right: 2px; }
          .ph-scene-chip.chip-two { bottom: 6px; left: 2px; }
          .ph-scene-chip.chip-three { top: 72px; left: -2px; }

          .ph-stats,
          .ph-features-section,
          .ph-workflow-row,
          .ph-smart-section,
          .ph-bottom-grid {
            width: calc(100% - 16px);
            margin-right: auto;
            margin-left: auto;
          }

          .ph-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
            margin-top: 10px;
          }

          .ph-stats article {
            min-height: 118px;
            flex-direction: column;
            align-items: flex-start;
            padding: 12px;
          }

          .ph-stat-icon {
            width: 46px;
            height: 46px;
            flex-basis: 46px;
          }

          .ph-stat-icon svg {
            width: 27px;
            height: 27px;
          }

          .ph-stats b {
            font-size: 12px;
          }

          .ph-stats small {
            font-size: 9px;
          }

          .ph-features-section {
            margin-top: 28px;
          }

          .ph-section-heading {
            display: block;
          }

          .ph-section-heading h2 {
            font-size: 24px;
          }

          .ph-section-heading p {
            margin-top: 7px;
            font-size: 10px;
          }

          .ph-features {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .ph-card,
          .ph-card:last-child {
            grid-column: auto;
            min-height: auto;
            padding: 18px;
            border-radius: 20px;
          }

          .ph-feature-icon {
            width: 46px;
            height: 46px;
            border-radius: 14px;
          }

          .ph-feature-icon svg {
            width: 26px;
            height: 26px;
          }

          .ph-card h2 {
            margin-top: 17px;
            font-size: 19px;
          }

          .ph-card p {
            font-size: 12px;
          }

          .ph-card > button {
            margin-top: 18px;
          }

          .ph-smart-main,
          .ph-trust-card,
          .ph-workflow,
          .ph-control {
            padding: 18px;
            border-radius: 20px;
          }

          .ph-smart-head > span,
          .ph-trust-icon {
            width: 54px;
            height: 54px;
            flex-basis: 54px;
          }

          .ph-smart-head h2,
          .ph-trust-card h2,
          .ph-workflow h2,
          .ph-control h2 {
            font-size: 19px;
          }

          .ph-smart-main > p,
          .ph-trust-card > p {
            font-size: 12px;
          }

          .ph-smart-points {
            grid-template-columns: 1fr;
          }

          .steps {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .steps > div {
            min-height: 132px;
          }

          .ph-modal {
            padding: 0;
            place-items: stretch;
          }

          .ph-dialog {
            width: 100%;
            min-height: 100dvh;
            max-height: 100dvh;
            border: 0;
            border-radius: 0;
          }

          .ph-close {
            position: fixed;
            left: 10px;
            top: 10px;
          }

          .ph-aside {
            padding: 22px 18px 18px;
          }

          .ph-aside-icon {
            width: 58px;
            height: 58px;
            border-radius: 18px;
          }

          .ph-aside-icon svg {
            width: 35px;
            height: 35px;
          }

          .ph-aside small {
            margin-top: 14px;
            font-size: 9px;
          }

          .ph-aside h2 {
            font-size: 22px;
          }

          .ph-aside p {
            margin-top: 7px;
            font-size: 11px;
          }

          .ph-dialog-content {
            padding: 22px 16px 28px;
          }

          .ph-dialog-content h3 {
            font-size: 21px;
          }

          .ph-times,
          .ph-upload-grid,
          .ph-choice-grid {
            grid-template-columns: 1fr 1fr;
          }

          .ph-times button,
          .ph-upload-grid button,
          .ph-choice-grid button {
            min-height: 102px;
            padding: 11px;
          }

          .ph-payments {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 390px) {
          .ph-page-identity small {
            display: none;
          }

          .ph-page-identity strong {
            font-size: 13px;
          }

          .ph-stats {
            grid-template-columns: 1fr;
          }

          .ph-stats article {
            min-height: 90px;
            flex-direction: row;
            align-items: center;
          }

          .ph-times,
          .ph-upload-grid,
          .ph-choice-grid {
            grid-template-columns: 1fr;
          }
        }


        /* =========================================================
           تحسين واجهة الصيدلية على الهواتف
           يحافظ على جميع المعلومات ويحوّل المشهد الكبير إلى بطاقة
           جانبية صغيرة حتى تبقى الشاشة الأولى واضحة ومختصرة.
        ========================================================= */
        @media (max-width: 640px) {
          .pharmacy-page {
            font-size: 14px;
            background:
              radial-gradient(circle at 92% 5%, rgba(11,159,167,.09), transparent 24%),
              radial-gradient(circle at 8% 26%, rgba(8,104,196,.07), transparent 27%),
              #f4f9fd;
          }

          .ph-container {
            padding-top: 6px;
            padding-bottom: 110px;
          }

          .ph-topbar {
            width: calc(100% - 12px);
            min-height: 56px;
            padding: 6px;
            border-radius: 16px;
            background: rgba(255,255,255,.96);
            box-shadow: 0 12px 28px rgba(4,70,127,.10);
          }

          .ph-back {
            width: 44px;
            min-width: 44px;
            min-height: 44px;
            border-radius: 12px;
          }

          .ph-back svg {
            width: 23px;
            height: 23px;
          }

          .ph-page-icon {
            width: 38px;
            height: 38px;
            border-radius: 12px;
          }

          .ph-page-icon svg {
            width: 23px;
            height: 23px;
          }

          .ph-page-identity {
            gap: 7px;
          }

          .ph-page-identity strong {
            font-size: 13px;
          }

          .ph-live-status {
            width: 38px;
            min-height: 38px;
          }

          .ph-hero {
            position: relative;
            display: block;
            width: calc(100% - 12px);
            min-height: 0;
            margin-top: 8px;
            padding: 15px 12px 13px;
            overflow: hidden;
            border-radius: 20px;
            box-shadow: 0 18px 44px rgba(4,70,127,.10);
          }

          .ph-hero::before {
            width: 130px;
            height: 130px;
            right: -54px;
            bottom: -74px;
            border-width: 22px;
          }

          .ph-copy {
            min-height: 0;
            padding-left: 116px;
          }

          .ph-kicker {
            width: fit-content;
            max-width: 100%;
            min-height: 27px;
            padding: 4px 8px;
            gap: 6px;
            border-radius: 11px;
            font-size: 8.5px;
            line-height: 1.45;
            white-space: normal;
          }

          .ph-kicker i {
            width: 6px;
            height: 6px;
            flex: 0 0 6px;
            box-shadow: 0 0 0 3px rgba(39,185,111,.11);
          }

          .ph-copy h1 {
            margin-top: 9px;
            font-size: clamp(24px, 7.1vw, 30px);
            line-height: 1.24;
            letter-spacing: -0.02em;
          }

          .ph-copy h1 span {
            display: inline;
            margin-right: .18em;
          }

          .ph-copy > p {
            margin-top: 9px;
            font-size: 10.8px;
            line-height: 1.75;
            font-weight: 650;
          }

          .ph-visual {
            position: absolute;
            top: 43px;
            left: 7px;
            width: 108px;
            min-height: 142px;
            z-index: 3;
            pointer-events: none;
          }

          .ph-visual-glow {
            width: 112px;
            height: 112px;
            filter: blur(7px);
            opacity: .8;
          }

          .ph-mini-pharmacy {
            width: 100px;
            padding: 6px;
            border-radius: 15px;
            box-shadow: 0 14px 30px rgba(4,70,127,.15);
            transform: rotate(-1deg);
          }

          .ph-mini-sign {
            gap: 4px;
            padding: 5px;
            border-radius: 9px;
          }

          .ph-mini-sign > svg {
            width: 17px;
            height: 17px;
          }

          .ph-mini-sign b {
            font-size: 7.5px;
            line-height: 1.3;
          }

          .ph-mini-sign small {
            margin-top: 0;
            font-size: 5.2px;
            line-height: 1.25;
          }

          .ph-mini-window {
            min-height: 54px;
            margin-top: 5px;
            grid-template-columns: 34px 1fr;
            gap: 5px;
            padding: 5px;
            border-radius: 10px;
          }

          .ph-mini-bottle {
            width: 31px;
            height: 38px;
            border-width: 3px;
            border-radius: 8px 8px 11px 11px;
          }

          .ph-mini-bottle::before {
            width: 17px;
            height: 6px;
            margin-top: -40px;
            border-radius: 4px 4px 2px 2px;
          }

          .ph-mini-bottle svg {
            width: 18px;
            height: 18px;
          }

          .ph-mini-lines {
            gap: 4px;
          }

          .ph-mini-lines i {
            height: 4px;
          }

          .ph-mini-cross {
            left: 5px;
            bottom: 2px;
            font-size: 18px;
          }

          .ph-mini-footer {
            margin-top: 5px;
            gap: 3px;
          }

          .ph-mini-footer span {
            min-height: 17px;
            gap: 2px;
            padding: 0 4px;
            font-size: 5.4px;
          }

          .ph-mini-footer span:first-child i {
            width: 4px;
            height: 4px;
          }

          .ph-mini-footer svg {
            width: 8px;
            height: 8px;
          }

          .ph-scene-chip {
            min-height: 23px;
            gap: 3px;
            padding: 3px 5px;
            border-radius: 8px;
            box-shadow: 0 7px 15px rgba(4,70,127,.11);
          }

          .ph-scene-chip svg {
            width: 11px;
            height: 11px;
          }

          .ph-scene-chip b {
            font-size: 6.2px;
          }

          .ph-scene-chip.chip-one {
            top: -5px;
            right: -2px;
          }

          .ph-scene-chip.chip-two {
            bottom: -7px;
            left: -3px;
          }

          .ph-scene-chip.chip-three {
            top: 48px;
            left: -7px;
          }

          .ph-hero-actions {
            width: auto;
            margin-top: 13px;
            margin-left: -116px;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 7px;
          }

          .ph-hero-actions button {
            width: 100%;
            min-width: 0;
            min-height: 46px;
            gap: 5px;
            padding: 6px 8px;
            border-radius: 13px;
            font-size: 10.5px;
            line-height: 1.35;
            white-space: normal;
          }

          .ph-hero-actions svg {
            width: 19px;
            height: 19px;
          }

          .ph-warning {
            width: auto;
            margin-top: 9px;
            margin-left: -116px;
            gap: 7px;
            padding: 9px;
            border-radius: 13px;
          }

          .ph-warning svg {
            width: 20px;
            height: 20px;
          }

          .ph-warning p {
            font-size: 9.7px;
            line-height: 1.65;
          }

          .ph-stats,
          .ph-features-section,
          .ph-workflow-row,
          .ph-smart-section,
          .ph-bottom-grid {
            width: calc(100% - 12px);
          }

          .ph-stats {
            gap: 7px;
            margin-top: 8px;
          }

          .ph-stats article {
            min-height: 104px;
            padding: 11px;
            border-radius: 16px;
          }

          .ph-stat-icon {
            width: 42px;
            height: 42px;
            flex-basis: 42px;
            border-radius: 13px;
          }

          .ph-stat-icon svg {
            width: 24px;
            height: 24px;
          }

          .ph-stats b {
            font-size: 11.5px;
          }

          .ph-stats small {
            font-size: 8.5px;
            line-height: 1.45;
          }

          .ph-features-section {
            margin-top: 24px;
          }

          .ph-section-heading h2 {
            font-size: 21px;
          }

          .ph-section-heading p {
            font-size: 10px;
            line-height: 1.65;
          }

          .ph-card,
          .ph-card:last-child {
            padding: 15px;
            border-radius: 18px;
          }

          .ph-feature-icon {
            width: 44px;
            height: 44px;
            border-radius: 13px;
          }

          .ph-feature-icon svg {
            width: 24px;
            height: 24px;
          }

          .ph-card h2 {
            margin-top: 14px;
            font-size: 17px;
          }

          .ph-card p {
            font-size: 11.5px;
            line-height: 1.75;
          }

          .ph-card > button {
            min-height: 45px;
            margin-top: 14px;
          }
        }

        @media (max-width: 420px) {
          .ph-copy {
            padding-left: 104px;
          }

          .ph-visual {
            top: 47px;
            left: 5px;
            width: 96px;
            min-height: 132px;
          }

          .ph-mini-pharmacy {
            width: 90px;
            padding: 5px;
          }

          .ph-copy h1 {
            font-size: clamp(23px, 7.2vw, 27px);
          }

          .ph-copy > p {
            font-size: 10.4px;
          }

          .ph-hero-actions,
          .ph-warning {
            margin-left: -104px;
          }

          .ph-hero-actions button {
            min-height: 44px;
            font-size: 10px;
          }
        }

        @media (max-width: 390px) {
          .ph-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ph-stats article {
            min-height: 98px;
            flex-direction: column;
            align-items: flex-start;
          }

          .ph-page-identity strong {
            font-size: 12.5px;
          }
        }

        @media (max-width: 340px) {
          .ph-copy {
            padding-left: 92px;
          }

          .ph-visual {
            top: 52px;
            width: 84px;
            min-height: 122px;
          }

          .ph-mini-pharmacy {
            width: 80px;
          }

          .ph-copy h1 {
            font-size: 22px;
          }

          .ph-copy > p {
            font-size: 10px;
          }

          .ph-hero-actions,
          .ph-warning {
            margin-left: -92px;
          }

          .ph-hero-actions {
            grid-template-columns: 1fr;
          }
        }


        /* =========================================================
           ضبط واجهة الصيدلية الرئيسية على الهاتف والتابلت
           النص في الجهة اليمنى، ومشهد الصيدلية المصغّر في الجهة المقابلة
        ========================================================= */
        @media (max-width: 900px) {
          .ph-hero {
            width: calc(100% - 16px) !important;
            min-height: 0 !important;
            margin: 10px auto 0 !important;
            padding: 16px !important;
            display: grid !important;
            grid-template-columns: 126px minmax(0, 1fr) !important;
            grid-template-areas:
              "visual kicker"
              "visual title"
              "visual description"
              "actions actions"
              "warning warning" !important;
            align-items: center !important;
            column-gap: 16px !important;
            row-gap: 0 !important;
            overflow: hidden !important;
            border-radius: 24px !important;
            box-shadow: 0 18px 46px rgba(4, 70, 127, 0.11) !important;
          }

          .ph-hero::before {
            width: 150px !important;
            height: 150px !important;
            right: auto !important;
            left: -70px !important;
            bottom: -80px !important;
            border-width: 24px !important;
          }

          .ph-copy {
            display: contents !important;
          }

          .ph-kicker {
            grid-area: kicker !important;
            justify-self: start !important;
            width: fit-content !important;
            max-width: 100% !important;
            min-height: 28px !important;
            margin: 0 !important;
            padding: 4px 8px !important;
            gap: 6px !important;
            border-radius: 11px !important;
            font-size: 8.5px !important;
            line-height: 1.45 !important;
            white-space: normal !important;
          }

          .ph-kicker i {
            width: 6px !important;
            height: 6px !important;
            flex: 0 0 6px !important;
            box-shadow: 0 0 0 3px rgba(39, 185, 111, 0.11) !important;
          }

          .ph-copy h1 {
            grid-area: title !important;
            width: 100% !important;
            max-width: none !important;
            margin: 9px 0 0 !important;
            font-size: clamp(24px, 4.8vw, 34px) !important;
            line-height: 1.22 !important;
            letter-spacing: -0.02em !important;
          }

          .ph-copy h1 span {
            display: block !important;
            margin: 0 !important;
          }

          .ph-copy > p {
            grid-area: description !important;
            width: 100% !important;
            max-width: none !important;
            margin: 9px 0 0 !important;
            font-size: 10.5px !important;
            line-height: 1.72 !important;
            font-weight: 650 !important;
          }

          .ph-visual {
            grid-area: visual !important;
            position: relative !important;
            inset: auto !important;
            width: 126px !important;
            min-width: 126px !important;
            max-width: 126px !important;
            min-height: 154px !important;
            height: 154px !important;
            margin: 0 !important;
            align-self: center !important;
            justify-self: center !important;
            z-index: 2 !important;
            pointer-events: none !important;
          }

          .ph-visual-glow {
            width: 126px !important;
            height: 126px !important;
            filter: blur(7px) !important;
            opacity: 0.72 !important;
          }

          .ph-mini-pharmacy {
            width: 112px !important;
            max-width: 112px !important;
            padding: 7px !important;
            border-radius: 16px !important;
            box-shadow: 0 14px 30px rgba(4, 70, 127, 0.15) !important;
            transform: rotate(-1deg) !important;
          }

          .ph-mini-sign {
            gap: 5px !important;
            padding: 6px !important;
            border-radius: 10px !important;
          }

          .ph-mini-sign > svg {
            width: 19px !important;
            height: 19px !important;
          }

          .ph-mini-sign b {
            font-size: 8px !important;
            line-height: 1.25 !important;
          }

          .ph-mini-sign small {
            margin-top: 0 !important;
            font-size: 5.4px !important;
            line-height: 1.2 !important;
          }

          .ph-mini-window {
            min-height: 60px !important;
            margin-top: 6px !important;
            grid-template-columns: 38px minmax(0, 1fr) !important;
            gap: 6px !important;
            padding: 6px !important;
            border-radius: 11px !important;
          }

          .ph-mini-bottle {
            width: 35px !important;
            height: 43px !important;
            border-width: 3px !important;
            border-radius: 9px 9px 12px 12px !important;
          }

          .ph-mini-bottle::before {
            width: 19px !important;
            height: 7px !important;
            margin-top: -45px !important;
            border-radius: 4px 4px 2px 2px !important;
          }

          .ph-mini-bottle svg {
            width: 20px !important;
            height: 20px !important;
          }

          .ph-mini-lines {
            gap: 4px !important;
          }

          .ph-mini-lines i {
            height: 4px !important;
          }

          .ph-mini-cross {
            left: 5px !important;
            bottom: 2px !important;
            font-size: 19px !important;
          }

          .ph-mini-footer {
            margin-top: 6px !important;
            gap: 3px !important;
          }

          .ph-mini-footer span {
            min-height: 18px !important;
            gap: 2px !important;
            padding: 0 4px !important;
            font-size: 5.6px !important;
          }

          .ph-mini-footer span:first-child i {
            width: 4px !important;
            height: 4px !important;
          }

          .ph-mini-footer svg {
            width: 8px !important;
            height: 8px !important;
          }

          .ph-scene-chip {
            min-height: 23px !important;
            gap: 3px !important;
            padding: 3px 5px !important;
            border-radius: 8px !important;
            box-shadow: 0 7px 15px rgba(4, 70, 127, 0.11) !important;
          }

          .ph-scene-chip svg {
            width: 11px !important;
            height: 11px !important;
          }

          .ph-scene-chip b {
            font-size: 6.2px !important;
          }

          .ph-scene-chip.chip-one {
            top: 2px !important;
            right: -4px !important;
            left: auto !important;
          }

          .ph-scene-chip.chip-two {
            right: auto !important;
            left: -3px !important;
            bottom: 1px !important;
          }

          .ph-scene-chip.chip-three {
            top: 58px !important;
            right: auto !important;
            left: -5px !important;
          }

          .ph-hero-actions {
            grid-area: actions !important;
            width: 100% !important;
            margin: 14px 0 0 !important;
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 8px !important;
          }

          .ph-hero-actions button {
            width: 100% !important;
            min-width: 0 !important;
            min-height: 45px !important;
            gap: 6px !important;
            padding: 7px 9px !important;
            border-radius: 13px !important;
            font-size: 10.5px !important;
            line-height: 1.35 !important;
            white-space: normal !important;
          }

          .ph-hero-actions svg {
            width: 19px !important;
            height: 19px !important;
          }

          .ph-warning {
            grid-area: warning !important;
            width: 100% !important;
            max-width: none !important;
            margin: 9px 0 0 !important;
            gap: 7px !important;
            padding: 9px 10px !important;
            border-radius: 13px !important;
          }

          .ph-warning svg {
            width: 19px !important;
            height: 19px !important;
          }

          .ph-warning p {
            font-size: 9.5px !important;
            line-height: 1.6 !important;
          }
        }

        @media (max-width: 520px) {
          .ph-hero {
            grid-template-columns: 104px minmax(0, 1fr) !important;
            column-gap: 10px !important;
            padding: 14px 12px !important;
            border-radius: 21px !important;
          }

          .ph-copy h1 {
            font-size: clamp(22px, 6.8vw, 28px) !important;
          }

          .ph-copy > p {
            font-size: 10px !important;
            line-height: 1.65 !important;
          }

          .ph-visual {
            width: 104px !important;
            min-width: 104px !important;
            max-width: 104px !important;
            min-height: 138px !important;
            height: 138px !important;
          }

          .ph-visual-glow {
            width: 104px !important;
            height: 104px !important;
          }

          .ph-mini-pharmacy {
            width: 94px !important;
            max-width: 94px !important;
            padding: 5px !important;
            border-radius: 14px !important;
          }

          .ph-mini-sign {
            gap: 4px !important;
            padding: 5px !important;
            border-radius: 9px !important;
          }

          .ph-mini-sign > svg {
            width: 16px !important;
            height: 16px !important;
          }

          .ph-mini-sign b {
            font-size: 7px !important;
          }

          .ph-mini-sign small {
            font-size: 4.8px !important;
          }

          .ph-mini-window {
            min-height: 51px !important;
            margin-top: 5px !important;
            grid-template-columns: 31px minmax(0, 1fr) !important;
            gap: 4px !important;
            padding: 5px !important;
            border-radius: 9px !important;
          }

          .ph-mini-bottle {
            width: 29px !important;
            height: 36px !important;
            border-width: 2px !important;
            border-radius: 7px 7px 10px 10px !important;
          }

          .ph-mini-bottle::before {
            width: 16px !important;
            height: 6px !important;
            margin-top: -38px !important;
          }

          .ph-mini-bottle svg {
            width: 17px !important;
            height: 17px !important;
          }

          .ph-mini-cross {
            font-size: 16px !important;
          }

          .ph-mini-footer {
            margin-top: 4px !important;
          }

          .ph-mini-footer span {
            min-height: 16px !important;
            font-size: 4.8px !important;
          }

          .ph-scene-chip {
            display: none !important;
          }

          .ph-hero-actions {
            margin-top: 12px !important;
            gap: 7px !important;
          }

          .ph-hero-actions button {
            min-height: 43px !important;
            padding: 6px 7px !important;
            font-size: 9.8px !important;
          }

          .ph-warning p {
            font-size: 9px !important;
          }
        }

        @media (max-width: 350px) {
          .ph-hero {
            grid-template-columns: 86px minmax(0, 1fr) !important;
            column-gap: 8px !important;
          }

          .ph-copy h1 {
            font-size: 21px !important;
          }

          .ph-copy > p {
            font-size: 9.5px !important;
          }

          .ph-visual {
            width: 86px !important;
            min-width: 86px !important;
            max-width: 86px !important;
            min-height: 122px !important;
            height: 122px !important;
          }

          .ph-mini-pharmacy {
            width: 78px !important;
            max-width: 78px !important;
          }

          .ph-mini-sign small,
          .ph-mini-footer {
            display: none !important;
          }

          .ph-mini-window {
            min-height: 47px !important;
          }

          .ph-hero-actions {
            grid-template-columns: 1fr !important;
          }
        }



        /* تثبيت النص يمينًا ومشهد الصيدلية في الجهة المقابلة على الهاتف فقط */
        @media (max-width: 900px) {
          .ph-hero {
            direction: ltr !important;
          }

          .ph-kicker,
          .ph-copy h1,
          .ph-copy > p,
          .ph-hero-actions,
          .ph-warning {
            direction: rtl !important;
            text-align: right !important;
          }

          .ph-visual {
            grid-column: 1 !important;
          }

          .ph-kicker,
          .ph-copy h1,
          .ph-copy > p {
            grid-column: 2 !important;
          }
        }

        @media (max-width: 390px) {
          .ph-feature-icon {
            width: 42px !important;
            height: 42px !important;
            border-radius: 12px !important;
          }

          .ph-feature-icon svg {
            width: 23px !important;
            height: 23px !important;
          }
        }



        /* =========================================================
           تحسين بطاقات "اختر الطريقة الأنسب لك"
           أحجام مريحة ومتوازنة للهاتف والتابلت واللابتوب
        ========================================================= */
        .ph-features {
          align-items: stretch;
        }

        .ph-card {
          min-height: 292px;
          padding: 20px;
        }

        .ph-feature-icon {
          width: 54px;
          height: 54px;
          flex: 0 0 54px;
          border-radius: 17px;
          box-shadow: 0 12px 24px rgba(8,104,196,.17);
        }

        .ph-feature-icon svg {
          width: 30px;
          height: 30px;
        }

        .ph-card h2 {
          margin-top: 18px;
          font-size: 20px;
        }

        .ph-card p {
          margin-top: 8px;
          font-size: 12.5px;
          line-height: 1.8;
        }

        .ph-card > button {
          min-height: 47px;
          margin-top: 18px;
          border-radius: 14px;
        }

        @media (max-width: 1040px) {
          .ph-card,
          .ph-card:last-child {
            min-height: 270px;
            padding: 18px;
          }

          .ph-feature-icon {
            width: 50px;
            height: 50px;
            flex-basis: 50px;
            border-radius: 16px;
          }

          .ph-feature-icon svg {
            width: 28px;
            height: 28px;
          }
        }

        @media (max-width: 640px) {
          .ph-features {
            gap: 11px !important;
          }

          .ph-card,
          .ph-card:last-child {
            min-height: 0 !important;
            padding: 15px 14px 13px !important;
            border-radius: 18px !important;
          }

          .ph-card-top {
            align-items: center;
          }

          .ph-feature-icon {
            width: 44px !important;
            height: 44px !important;
            flex: 0 0 44px !important;
            border-radius: 14px !important;
            box-shadow: 0 9px 18px rgba(8,104,196,.16) !important;
          }

          .ph-feature-icon svg {
            width: 25px !important;
            height: 25px !important;
          }

          .ph-card-top small {
            min-height: 27px;
            padding: 0 8px;
            font-size: 8px;
          }

          .ph-card h2 {
            margin-top: 13px !important;
            font-size: 17px !important;
            line-height: 1.4 !important;
          }

          .ph-card p {
            margin-top: 6px !important;
            font-size: 10.8px !important;
            line-height: 1.7 !important;
          }

          .ph-card > button {
            min-height: 43px !important;
            margin-top: 13px !important;
            border-radius: 13px !important;
            font-size: 11.5px !important;
          }

          .ph-card > button svg {
            width: 17px !important;
            height: 17px !important;
          }
        }

        @media (max-width: 390px) {
          .ph-card,
          .ph-card:last-child {
            padding: 13px 12px 12px !important;
          }

          .ph-feature-icon {
            width: 41px !important;
            height: 41px !important;
            flex-basis: 41px !important;
            border-radius: 13px !important;
          }

          .ph-feature-icon svg {
            width: 23px !important;
            height: 23px !important;
          }

          .ph-card h2 {
            font-size: 16px !important;
          }

          .ph-card p {
            font-size: 10.3px !important;
          }

          .ph-card > button {
            min-height: 41px !important;
            font-size: 11px !important;
          }
        }

        /* إبقاء مراحل الطلب الأربع في صف واحد على جميع الشاشات */
        .steps {
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
        }

        @media (max-width: 640px) {
          .steps {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 5px !important;
            margin-top: 13px !important;
          }

          .steps > div {
            min-width: 0 !important;
            min-height: 112px !important;
            padding: 10px 3px 9px !important;
            border-radius: 13px !important;
          }

          .ph-step-icon {
            width: 37px !important;
            height: 37px !important;
            border-radius: 11px !important;
          }

          .ph-step-icon svg {
            width: 21px !important;
            height: 21px !important;
          }

          .ph-step-check {
            top: 5px !important;
            left: 5px !important;
            width: 18px !important;
            height: 18px !important;
          }

          .ph-step-check svg {
            width: 18px !important;
            height: 18px !important;
          }

          .steps strong {
            margin-top: 7px !important;
            font-size: 8px !important;
          }

          .steps > div > span:last-child {
            margin-top: 3px !important;
            font-size: 7.2px !important;
            line-height: 1.4 !important;
            overflow-wrap: anywhere !important;
          }
        }

        @media (max-width: 360px) {
          .steps { gap: 4px !important; }
          .steps > div { min-height: 105px !important; padding-inline: 2px !important; }
          .ph-step-icon { width: 33px !important; height: 33px !important; }
          .ph-step-icon svg { width: 19px !important; height: 19px !important; }
          .steps > div > span:last-child { font-size: 6.5px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pharmacy-page *,
          .pharmacy-page *::before,
          .pharmacy-page *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.001ms !important;
          }
        }



        /* =========================================================
           عرض بطاقات الخدمات بعمودين على الهواتف
           مع مقاسات مريحة وواضحة للمس والقراءة.
        ========================================================= */
        @media (max-width: 640px) {
          .ph-features {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 9px !important;
          }

          .ph-card,
          .ph-card:last-child {
            grid-column: auto !important;
            min-width: 0 !important;
            min-height: 244px !important;
            padding: 13px 11px !important;
            border-radius: 18px !important;
          }

          .ph-card:last-child {
            grid-column: 1 / -1 !important;
            min-height: 220px !important;
          }

          .ph-card-top {
            gap: 7px !important;
          }

          .ph-feature-icon {
            width: 44px !important;
            height: 44px !important;
            flex: 0 0 44px !important;
            border-radius: 14px !important;
            box-shadow: 0 10px 20px rgba(8,104,196,.16) !important;
          }

          .ph-feature-icon svg {
            width: 25px !important;
            height: 25px !important;
          }

          .ph-card-top small {
            min-height: 25px !important;
            max-width: 86px !important;
            padding: 3px 7px !important;
            font-size: 7px !important;
            line-height: 1.35 !important;
            text-align: center !important;
            white-space: normal !important;
          }

          .ph-card h2 {
            margin-top: 12px !important;
            font-size: 14px !important;
            line-height: 1.5 !important;
          }

          .ph-card p {
            margin-top: 7px !important;
            font-size: 9.4px !important;
            line-height: 1.65 !important;
          }

          .ph-card > button {
            min-height: 41px !important;
            margin-top: 12px !important;
            gap: 5px !important;
            padding: 6px 7px !important;
            border-radius: 12px !important;
            font-size: 9.4px !important;
            line-height: 1.35 !important;
          }

          .ph-card > button svg {
            width: 16px !important;
            height: 16px !important;
          }

          .ph-card:last-child .ph-card-top {
            align-items: center !important;
          }

          .ph-card:last-child p {
            max-width: 96% !important;
          }
        }

        @media (max-width: 390px) {
          .ph-features {
            gap: 7px !important;
          }

          .ph-card,
          .ph-card:last-child {
            min-height: 236px !important;
            padding: 11px 9px !important;
            border-radius: 16px !important;
          }

          .ph-card:last-child {
            min-height: 210px !important;
          }

          .ph-feature-icon {
            width: 40px !important;
            height: 40px !important;
            flex-basis: 40px !important;
          }

          .ph-feature-icon svg {
            width: 23px !important;
            height: 23px !important;
          }

          .ph-card-top small {
            max-width: 74px !important;
            padding-inline: 5px !important;
            font-size: 6.4px !important;
          }

          .ph-card h2 {
            font-size: 13px !important;
          }

          .ph-card p {
            font-size: 8.7px !important;
            line-height: 1.6 !important;
          }

          .ph-card > button {
            min-height: 39px !important;
            font-size: 8.7px !important;
          }
        }

        @media (max-width: 330px) {
          .ph-features {
            grid-template-columns: 1fr !important;
          }

          .ph-card,
          .ph-card:last-child {
            grid-column: auto !important;
            min-height: auto !important;
          }
        }

        @media (prefers-contrast: more) {
          .pharmacy-page {
            --ph-muted: #345f76;
            --ph-line: rgba(4, 65, 109, 0.28);
          }

          .ph-card,
          .ph-stats article,
          .ph-smart-main,
          .ph-trust-card,
          .ph-workflow,
          .ph-control {
            border-width: 2px;
          }
        }


        /* =========================================================
           تثبيت مزايا الصيدلية الأربع في صف واحد
           على الهاتف والتابلت واللابتوب، مع إبقاء جميع النصوص.
        ========================================================= */
        .ph-stats {
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
        }

        @media (max-width: 1040px) {
          .ph-stats {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 8px;
          }

          .ph-stats article {
            min-width: 0;
          }
        }

        @media (max-width: 640px) {
          .ph-stats {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 5px !important;
          }

          .ph-stats article {
            min-width: 0 !important;
            min-height: 132px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 6px !important;
            padding: 8px 4px !important;
            border-radius: 14px !important;
            text-align: center !important;
          }

          .ph-stat-icon {
            width: 34px !important;
            height: 34px !important;
            flex: 0 0 34px !important;
            border-radius: 11px !important;
          }

          .ph-stat-icon svg {
            width: 20px !important;
            height: 20px !important;
          }

          .ph-stats article > div {
            min-width: 0;
            width: 100%;
          }

          .ph-stats b {
            font-size: 8.5px !important;
            line-height: 1.35 !important;
            overflow-wrap: anywhere;
          }

          .ph-stats small {
            margin-top: 3px !important;
            font-size: 6.8px !important;
            line-height: 1.45 !important;
            overflow-wrap: anywhere;
          }
        }

        @media (max-width: 390px) {
          .ph-stats {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 4px !important;
          }

          .ph-stats article {
            min-height: 126px !important;
            flex-direction: column !important;
            align-items: center !important;
            padding: 7px 3px !important;
          }

          .ph-stat-icon {
            width: 31px !important;
            height: 31px !important;
            flex-basis: 31px !important;
          }

          .ph-stat-icon svg {
            width: 18px !important;
            height: 18px !important;
          }

          .ph-stats b {
            font-size: 7.8px !important;
          }

          .ph-stats small {
            font-size: 6.2px !important;
            line-height: 1.4 !important;
          }
        }



        /* =========================================================
           الطريقة الأولى: ثلاث بطاقات متساوية في صف واحد على الهاتف
           تصميم مضغوط واحترافي مع إبقاء جميع الوظائف كما هي.
        ========================================================= */
        @media (max-width: 640px) {
          .ph-features {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 7px !important;
            align-items: stretch !important;
          }

          .ph-card,
          .ph-card:last-child {
            grid-column: auto !important;
            min-width: 0 !important;
            min-height: 238px !important;
            padding: 10px 7px !important;
            border-radius: 16px !important;
            text-align: center !important;
          }

          .ph-card::before {
            width: 92px !important;
            height: 92px !important;
            left: -48px !important;
            top: -48px !important;
          }

          .ph-card-top,
          .ph-card:last-child .ph-card-top {
            min-width: 0 !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 6px !important;
          }

          .ph-feature-icon {
            width: 42px !important;
            height: 42px !important;
            flex: 0 0 42px !important;
            border-radius: 13px !important;
            box-shadow: 0 9px 18px rgba(8,104,196,.16) !important;
          }

          .ph-feature-icon svg {
            width: 24px !important;
            height: 24px !important;
          }

          .ph-card-top small {
            width: 100% !important;
            max-width: 100% !important;
            min-height: 22px !important;
            justify-content: center !important;
            padding: 3px 3px !important;
            border-radius: 8px !important;
            font-size: 6.3px !important;
            line-height: 1.3 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          .ph-card h2 {
            min-height: 42px !important;
            margin-top: 10px !important;
            display: -webkit-box !important;
            overflow: hidden !important;
            -webkit-box-orient: vertical !important;
            -webkit-line-clamp: 2 !important;
            font-size: 11px !important;
            line-height: 1.55 !important;
            text-align: center !important;
          }

          .ph-card p,
          .ph-card:last-child p {
            min-height: 48px !important;
            max-width: 100% !important;
            margin-top: 5px !important;
            display: -webkit-box !important;
            overflow: hidden !important;
            -webkit-box-orient: vertical !important;
            -webkit-line-clamp: 3 !important;
            font-size: 7.7px !important;
            line-height: 1.55 !important;
            text-align: center !important;
          }

          .ph-card > button {
            width: 100% !important;
            min-height: 36px !important;
            margin-top: auto !important;
            gap: 3px !important;
            padding: 5px 3px !important;
            border-radius: 10px !important;
            font-size: 7.8px !important;
            line-height: 1.3 !important;
            white-space: normal !important;
          }

          .ph-card > button svg {
            width: 13px !important;
            height: 13px !important;
            flex: 0 0 13px !important;
          }
        }

        @media (max-width: 390px) {
          .ph-features {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 5px !important;
          }

          .ph-card,
          .ph-card:last-child {
            min-height: 226px !important;
            padding: 8px 5px !important;
            border-radius: 14px !important;
          }

          .ph-feature-icon {
            width: 38px !important;
            height: 38px !important;
            flex-basis: 38px !important;
            border-radius: 12px !important;
          }

          .ph-feature-icon svg {
            width: 21px !important;
            height: 21px !important;
          }

          .ph-card-top small {
            font-size: 5.7px !important;
          }

          .ph-card h2 {
            min-height: 40px !important;
            font-size: 9.8px !important;
          }

          .ph-card p {
            min-height: 45px !important;
            font-size: 7px !important;
          }

          .ph-card > button {
            min-height: 34px !important;
            font-size: 7px !important;
          }
        }

        @media (max-width: 340px) {
          .ph-features {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 4px !important;
          }

          .ph-card,
          .ph-card:last-child {
            min-height: 216px !important;
            padding: 7px 4px !important;
          }

          .ph-feature-icon {
            width: 34px !important;
            height: 34px !important;
            flex-basis: 34px !important;
          }

          .ph-feature-icon svg {
            width: 19px !important;
            height: 19px !important;
          }

          .ph-card-top small {
            font-size: 5.2px !important;
          }

          .ph-card h2 {
            font-size: 9px !important;
          }

          .ph-card p {
            font-size: 6.4px !important;
          }

          .ph-card > button {
            font-size: 6.5px !important;
          }
        }

      `}</style>
      </main>
    </>
  );
}
