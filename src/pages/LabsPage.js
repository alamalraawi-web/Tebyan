import { useEffect, useMemo, useRef, useState } from "react";
import TibyanHeader from "../components/TibyanHeader";

const I = ({ children, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

const Camera = (props) => <I {...props}><path d="M4 8h3l1.5-2h7L17 8h3v10H4V8Z"/><circle cx="12" cy="13" r="3.5"/></I>;
const Upload = (props) => <I {...props}><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 20h14"/></I>;
const Arrow = (props) => <I {...props}><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></I>;
const Check = (props) => <I {...props}><path d="m5 12 4 4L19 6"/></I>;
const Shield = (props) => <I {...props}><path d="M12 3 5 6v5c0 4.5 2.8 8.2 7 10 4.2-1.8 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></I>;
const Brain = (props) => <I {...props}><path d="M9 4.5A3.5 3.5 0 0 0 5.5 8v.5A3.5 3.5 0 0 0 4 11.4 3.6 3.6 0 0 0 7.6 15H9"/><path d="M15 4.5A3.5 3.5 0 0 1 18.5 8v.5a3.5 3.5 0 0 1 1.5 2.9 3.6 3.6 0 0 1-3.6 3.6H15"/><path d="M9 4.5V19M15 4.5V19M9 8H7M15 8h2M9 12H7.5M15 12h1.5"/></I>;
const Report = (props) => <I {...props}><path d="M7 3h7l4 4v14H7V3Z"/><path d="M14 3v5h5M10 12h5M10 16h5"/></I>;
const History = (props) => <I {...props}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 4v4h4M12 7v5l3 2"/></I>;
const Eye = (props) => <I {...props}><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.6"/></I>;
const Skin = (props) => <I {...props}><path d="M5 4h14v16H5z"/><path d="M8 8c2 2 6 2 8 0M8 12c2-2 6-2 8 0M8 16c2 2 6 2 8 0"/></I>;
const Close = (props) => <I {...props}><path d="m6 6 12 12M18 6 6 18"/></I>;
const Trash = (props) => <I {...props}><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13"/></I>;
const Baby = (props) => <I {...props}><circle cx="12" cy="8" r="4"/><path d="M5 21c.8-4.4 3.2-7 7-7s6.2 2.6 7 7"/><path d="M9.5 8h.01M14.5 8h.01"/><path d="M10 11c.7.6 1.3.9 2 .9s1.3-.3 2-.9"/></I>;
const Timeline = (props) => <I {...props}><path d="M5 4v16"/><circle cx="5" cy="7" r="2"/><circle cx="5" cy="13" r="2"/><circle cx="5" cy="19" r="2"/><path d="M9 7h10M9 13h7M9 19h9"/></I>;
const Plus = (props) => <I {...props}><path d="M12 5v14M5 12h14"/></I>;
const Home = (props) => <I {...props}><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></I>;
const TextSize = (props) => <I {...props}><path d="M4 6h10M9 6v12M6 18h6"/><path d="M15 10h5M17.5 10v8M15.5 18h4"/></I>;
const Info = (props) => <I {...props}><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></I>;
const More = (props) => <I {...props}><circle cx="12" cy="5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none"/></I>;
const Sparkles = (props) => <I {...props}><path d="m12 3 1.2 3.3L16.5 7.5l-3.3 1.2L12 12l-1.2-3.3-3.3-1.2 3.3-1.2L12 3Z"/><path d="m18.5 13 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"/><path d="m5 14 .7 1.8 1.8.7-1.8.7L5 19l-.7-1.8-1.8-.7 1.8-.7L5 14Z"/></I>;
const Chevron = (props) => <I {...props}><path d="m8 10 4 4 4-4"/></I>;
const Alert = (props) => <I {...props}><path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v4M12 17h.01"/></I>;
const ImageIcon = (props) => <I {...props}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="m4 17 5-5 4 4 2-2 5 5"/></I>;

const exams = [
  {
    id: "skin",
    title: "الفحص الجلدي الشامل",
    code: "Skin AI",
    Icon: Skin,
    accent: "#1479d5",
    soft: "#eaf4ff",
    desc: "فحص بصري شامل لكل ما يتعلق بالجلد، بما في ذلك الحبوب، الجروح، الحروق، التصبغات، البهاق، الطفح، فروة الرأس والأظافر.",
    cases: ["الحبوب والبثور وآثارها", "الجروح والحروق والقرح", "البهاق والتصبغات والبقع", "الطفح والاحمرار والجفاف", "فروة الرأس والأظافر"],
    tips: ["استخدم إضاءة طبيعية بدون فلاتر.", "التقط صورة قريبة وأخرى أوسع.", "اجعل المنطقة كاملة وواضحة داخل الإطار."]
  },
  {
    id: "eye",
    title: "فحص العين الخارجي",
    code: "Eye AI",
    Icon: Eye,
    accent: "#0798a5",
    soft: "#e8fafb",
    desc: "تحليل بصري لاحمرار العين والجفن والإفرازات الظاهرة واصفرار البياض والاختلافات بين العينين.",
    cases: ["احمرار العين", "تورم الجفن", "الإفرازات الظاهرة", "اصفرار بياض العين", "الاختلاف بين العينين"],
    tips: ["صوّر العينين معًا ثم كل عين منفردة.", "تجنب الفلاش المباشر والانعكاسات.", "ثبّت الجهاز واجعل العين واضحة."]
  },
  {
    id: "children",
    title: "مختبر الأطفال الشامل",
    code: "Kids AI",
    Icon: Baby,
    accent: "#0b5fa9",
    soft: "#eaf4ff",
    desc: "مختبر بصري متخصص لمتابعة الحالات الظاهرة لدى الأطفال، مع فحص الجلد والعين والفم والجروح والكدمات والحروق والطفح والحساسية ومقارنة تطور الحالة زمنيًا.",
    cases: [
      "الطفح الجلدي العام", "طفح الحفاض", "الإكزيما وجفاف الجلد", "الحساسية والاحمرار",
      "الحبوب والبثور", "لدغات الحشرات", "الجدري المائي كمؤشرات بصرية", "مرض اليد والقدم والفم كمؤشرات بصرية",
      "الحصبة أو الطفح المنتشر كمؤشرات بصرية", "القوباء والالتهاب السطحي الظاهر", "الحروق البسيطة وحروق الشمس", "الجروح والخدوش",
      "الكدمات وتغير اللون", "التورم والانتفاخ", "التهاب موضع التطعيم الظاهر", "احمرار العين الخارجي",
      "تورم الجفن والإفرازات الظاهرة", "تشقق الشفاه وجفاف الفم", "تقرحات الفم الظاهرة", "التهاب زوايا الفم",
      "فروة الرأس والقشرة والاحمرار", "تساقط الشعر الموضعي الظاهر", "تغير لون الأظافر", "التهاب الجلد حول الأظافر",
      "التهاب الجلد حول الجبس", "تورم الأصابع أو تغير لونها", "متابعة جرح ما بعد العملية", "متابعة الختان والالتئام الظاهر",
      "متابعة السرة لدى حديثي الولادة", "اصفرار الجلد الظاهر للمراجعة فقط"
    ],
    tips: [
      "استخدم إضاءة طبيعية واضحة ومن دون فلاتر.",
      "التقط صورة قريبة وأخرى أوسع للمنطقة.",
      "ثبّت المسافة والزاوية عند المتابعة الزمنية.",
      "تجنب تصوير الوجه كاملًا إن لم تكن الحالة في الوجه.",
      "لا تعتمد على النتيجة وحدها عند وجود حرارة، خمول، صعوبة تنفس أو انتشار سريع."
    ]
  }
];

const navItems = [
  { id: "home", label: "الفحوصات", Icon: Home },
  { id: "ops", label: "العمليات", Icon: History },
  { id: "reports", label: "التقارير", Icon: Report }
];

function formatArabicDate(date = new Date()) {
  try {
    return new Intl.DateTimeFormat("ar-SA", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}

export default function LabsPage() {
  const [view, setView] = useState("home");
  const [exam, setExam] = useState(exams[0]);
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [quality, setQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [ops, setOps] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [timelineEnabled, setTimelineEnabled] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [largeText, setLargeText] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const timelineFileRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileRef = useRef(null);
  const examTitleRef = useRef(null);
  const analysisTimerRef = useRef(null);

  const currentStep = useMemo(() => {
    if (report) return 4;
    if (quality || loading) return 3;
    if (img) return 2;
    return 1;
  }, [report, quality, loading, img]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("tibyan-visual-lab-records");
      if (saved) setOps(JSON.parse(saved));
      setLargeText(window.localStorage.getItem("tibyan-large-text") === "1");
    } catch {
      // يستمر التطبيق بصورة طبيعية إذا كان التخزين المحلي غير متاح.
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    const currentViewport = document.querySelector('meta[name="viewport"]');
    if (!currentViewport) {
      const viewport = document.createElement("meta");
      viewport.name = "viewport";
      viewport.content = "width=device-width, initial-scale=1, viewport-fit=cover";
      document.head.appendChild(viewport);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("tibyan-visual-lab-records", JSON.stringify(ops));
    } catch {
      // لا نوقف تجربة المستخدم عند تعذر الحفظ المحلي.
    }
  }, [ops, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("tibyan-large-text", largeText ? "1" : "0");
    } catch {
      // لا يلزم إجراء إضافي.
    }
  }, [largeText, storageReady]);

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
      if (analysisTimerRef.current) clearInterval(analysisTimerRef.current);
    };
  }, [stream]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (cameraOpen) closeCamera();
      if (selectedReport) setSelectedReport(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cameraOpen, selectedReport, stream]);

  const goTo = (nextView) => {
    setMenuOpen(false);
    setView(nextView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetExam = () => {
    setImg("");
    setName("");
    setNote("");
    setQuality(null);
    setReport(null);
    setLoading(false);
    setProgress(0);
    setTimelineEnabled(false);
    setTimeline([]);
    if (analysisTimerRef.current) clearInterval(analysisTimerRef.current);
  };

  const openExam = (nextExam) => {
    setExam(nextExam);
    resetExam();
    setView("exam");
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => examTitleRef.current?.focus(), 250);
  };

  const useFile = (file) => {
    if (!file || !file.type?.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
      setName(file.name || "صورة مرفوعة");
      setQuality(null);
      setReport(null);
    };
    reader.readAsDataURL(file);
  };

  const addTimelineFiles = (files) => {
    [...(files || [])].forEach((file, index) => {
      if (!file.type?.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        setTimeline((items) => [
          ...items,
          {
            id: `${Date.now()}-${index}`,
            name: file.name || "صورة متابعة",
            date: formatArabicDate(),
            src: reader.result,
            note: ""
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const updateTimelineNote = (id, value) => {
    setTimeline((items) => items.map((item) => item.id === id ? { ...item, note: value } : item));
  };

  const removeTimeline = (id) => {
    setTimeline((items) => items.filter((item) => item.id !== id));
  };

  async function openCamera() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false
      });
      setStream(mediaStream);
      setCameraOpen(true);
      window.setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      }, 80);
    } catch {
      fileRef.current?.click();
    }
  }

  function closeCamera() {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
    setCameraOpen(false);
  }

  function capture() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    setImg(canvas.toDataURL("image/jpeg", 0.92));
    setName("صورة من الكاميرا");
    setQuality(null);
    setReport(null);
    closeCamera();
  }

  function checkQuality() {
    if (!img) return;
    setQuality({ score: 92, light: "جيدة", sharp: "واضحة", frame: "مناسب" });
  }

  function analyze() {
    if (!quality || loading) return;
    setLoading(true);
    setProgress(8);

    if (analysisTimerRef.current) clearInterval(analysisTimerRef.current);
    analysisTimerRef.current = window.setInterval(() => {
      setProgress((previous) => {
        const next = Math.min(previous + 11, 100);
        if (next === 100) {
          clearInterval(analysisTimerRef.current);
          analysisTimerRef.current = null;
          window.setTimeout(() => {
            const id = `TB-${Date.now().toString().slice(-8)}`;
            const result = {
              id,
              title: exam.title,
              confidence: "87%",
              quality: "92%",
              priority: "يحتاج متابعة",
              items: [
                "تم رصد مؤشرات بصرية قابلة للمراجعة.",
                "جودة الصورة مناسبة للتحليل الأولي.",
                "لا يمكن تأكيد الحالة من الصورة وحدها."
              ],
              note,
              timelineCount: timelineEnabled ? timeline.length : 0,
              createdAt: formatArabicDate()
            };
            setReport(result);
            setLoading(false);
            setOps((items) => [
              {
                ...result,
                test: exam.title,
                status: "تقرير جديد"
              },
              ...items
            ]);
          }, 260);
        }
        return next;
      });
    }, 220);
  }

  const scrollToExams = () => {
    document.getElementById("exam-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <TibyanHeader />
      <main dir="rtl" className={`lab ${largeText ? "largeText" : ""}`}>
      <div className="appShell">




        {view === "home" && (
          <>
            <section className="labsBanner">
              <div className="bannerMenu">
                <button
                  className="bannerMenuButton"
                  onClick={() => setMenuOpen((value) => !value)}
                  aria-expanded={menuOpen}
                  aria-label="فتح القائمة"
                >
                  <More />
                </button>
                {menuOpen && (
                  <div className="bannerMenuList">
                    <button className={view === "home" ? "active" : ""} onClick={() => goTo("home")} title="الفحوصات" aria-label="الفحوصات"><Home /></button>
                    <button className={view === "ops" ? "active" : ""} onClick={() => goTo("ops")} title="العمليات" aria-label="العمليات"><History /></button>
                    <button className={view === "reports" ? "active" : ""} onClick={() => goTo("reports")} title="التقارير" aria-label="التقارير"><Report /></button>
                    <button
                      onClick={() => { setLargeText((value) => !value); setMenuOpen(false); }}
                      title={largeText ? "الخط العادي" : "تكبير الخط"}
                      aria-label={largeText ? "الخط العادي" : "تكبير الخط"}
                    >
                      <TextSize />
                    </button>
                  </div>
                )}
              </div>
              <div className="labsBannerCopy">
                <span>مختبر تبيان البصري</span>
                <h1>فحوصات أذكى. رؤية أوضح.</h1>
                <p>ابدأ الفحص بصورة واضحة واحصل على قراءة بصرية أولية مرتبة خلال خطوات بسيطة.</p>
              </div>

              <svg className="labArt" viewBox="0 0 320 150" aria-hidden="true">
                <defs>
                  <linearGradient id="labG" x1="0" x2="1">
                    <stop offset="0" stopColor="#1479d5"/>
                    <stop offset="1" stopColor="#0798a5"/>
                  </linearGradient>
                </defs>
                <g className="orb">
                  <circle cx="236" cy="73" r="55"/>
                  <circle cx="236" cy="73" r="38"/>
                </g>
                <g className="microscope">
                  <path d="M203 34h28l-7 24h-20z"/>
                  <path d="M214 58c-7 11-7 22-1 30"/>
                  <path d="M207 88h35"/>
                  <path d="M229 88c0 18-13 27-30 27"/>
                  <path d="M188 115h69"/>
                  <path d="M194 115v10h61"/>
                </g>
                <g className="tube">
                  <path d="M93 34h37"/>
                  <path d="M101 34v58c0 15 22 15 22 0V34"/>
                  <path d="M101 77h22"/>
                  <circle cx="112" cy="67" r="4"/>
                  <circle cx="116" cy="55" r="3"/>
                </g>
                <g className="scan">
                  <path d="M51 53V41h12M87 41h12v12M99 89v12H87M63 101H51V89"/>
                  <circle cx="75" cy="71" r="15"/>
                  <path d="M69 71h12M75 65v12"/>
                </g>
                <g className="spark">
                  <path d="M267 31v12M261 37h12"/>
                  <path d="M150 33v9M146 37h8"/>
                </g>
              </svg>
            </section>

            <section className="sectionBlock" id="exam-list">
              <header className="sectionHeading">
                <div>
                  <span className="sectionKicker">ابدأ من هنا</span>
                  <h2>اختر نوع الفحص</h2>
                  <p>كل فحص يحتوي على تعليمات مخصصة تساعدك على التقاط صورة أوضح.</p>
                </div>
              </header>

              <div className="examCards">
                {exams.map((item) => {
                  const { Icon } = item;
                  return (
                    <article className="examCard" key={item.id} style={{ "--accent": item.accent, "--soft": item.soft }}>
                      <div className="examCardTop">
                        <span className="examIcon"><Icon /></span>
                        <span className="examCode">{item.code}</span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                      <div className="examQuickList">
                        {item.cases.slice(0, 3).map((caseName) => <span key={caseName}><Check />{caseName}</span>)}
                        {item.cases.length > 3 && <span className="moreCases">+ {item.cases.length - 3} حالات أخرى</span>}
                      </div>
                      <button onClick={() => openExam(item)}>
                        ابدأ هذا الفحص <Arrow />
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="howSection" id="how-it-works">
              <header className="sectionHeading compact">
                <div>
                  <span className="sectionKicker">بدون تعقيد</span>
                  <h2>كيف تستخدم المنصة؟</h2>
                </div>
              </header>
              <div className="howGrid">
                <article><span>01</span><Camera /><h3>التقط صورة واضحة</h3><p>استخدم إضاءة جيدة، وقرّب المنطقة المطلوبة دون فلاتر.</p></article>
                <article><span>02</span><Shield /><h3>افحص جودة الصورة</h3><p>تأكد من الإضاءة والوضوح والإطار قبل تشغيل التحليل.</p></article>
                <article><span>03</span><Report /><h3>اقرأ التقرير بسهولة</h3><p>ستظهر النتيجة في ملخص مرتب مع مستوى الجودة والتنبيهات.</p></article>
              </div>
            </section>

            <section className="safetyBanner">
              <span className="safetyIcon"><Alert /></span>
              <div>
                <h2>متى تحتاج إلى مساعدة طبية مباشرة؟</h2>
                <p>عند وجود حرارة مرتفعة، صعوبة تنفس، خمول شديد، ألم قوي، نزيف، تورم سريع أو انتشار مفاجئ للحالة، اطلب تقييمًا طبيًا مباشرًا ولا تعتمد على الصورة وحدها.</p>
              </div>
            </section>
          </>
        )}

        {view === "exam" && (
          <>
            <div className="pageTools">
              <button className="backButton" onClick={() => goTo("home")}><Arrow /> العودة إلى الفحوصات</button>
              <span className="saveHint"><Shield /> يتم حفظ التقارير على هذا الجهاز</span>
            </div>

            <section className="examHeader" style={{ "--accent": exam.accent, "--soft": exam.soft }}>
              <span className="examHeaderIcon"><exam.Icon /></span>
              <div>
                <small>{exam.code}</small>
                <h1 tabIndex="-1" ref={examTitleRef}>{exam.title}</h1>
                <p>{exam.desc}</p>
              </div>
            </section>

            <section className="stepper" aria-label="مراحل الفحص">
              {["إضافة الصورة", "المعلومات", "فحص الجودة", "النتيجة"].map((label, index) => {
                const number = index + 1;
                const complete = currentStep > number;
                const active = currentStep === number;
                return (
                  <div key={label} className={`${complete ? "complete" : ""} ${active ? "current" : ""}`}>
                    <span>{complete ? <Check /> : number}</span>
                    <small>{label}</small>
                  </div>
                );
              })}
            </section>

            <div className="examLayout">
              <section className="taskPanel">
                <header className="taskHeading">
                  <span>1</span>
                  <div><h2>أضف صورة الحالة</h2><p>يمكنك التصوير الآن أو اختيار صورة محفوظة في جهازك.</p></div>
                </header>

                {!img ? (
                  <div
                    className={`uploadArea ${dragging ? "dragging" : ""}`}
                    onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(event) => {
                      event.preventDefault();
                      setDragging(false);
                      useFile(event.dataTransfer.files?.[0]);
                    }}
                  >
                    <span className="uploadIcon"><ImageIcon /></span>
                    <h3>ضع الصورة هنا</h3>
                    <p>أو استخدم أحد الخيارين التاليين</p>
                    <div className="uploadActions">
                      <button className="primaryButton" onClick={openCamera}><Camera /> التصوير بالكاميرا</button>
                      <button className="secondaryButton" onClick={() => fileRef.current?.click()}><Upload /> اختيار صورة</button>
                    </div>
                    <small>الملفات المقبولة: صور JPG أو PNG أو الصور الملتقطة من الهاتف</small>
                  </div>
                ) : (
                  <div className="imagePreview">
                    <div className="previewImageWrap"><img src={img} alt="الصورة المختارة للفحص" /></div>
                    <div className="previewBar">
                      <div><ImageIcon /><span><b>الصورة جاهزة</b><small>{name}</small></span></div>
                      <div className="previewActions">
                        <button onClick={openCamera}><Camera /> إعادة التصوير</button>
                        <button onClick={() => fileRef.current?.click()}><Upload /> استبدال</button>
                        <button className="dangerButton" onClick={resetExam}><Trash /> حذف</button>
                      </div>
                    </div>
                  </div>
                )}
                <input ref={fileRef} hidden type="file" accept="image/*" onChange={(event) => useFile(event.target.files?.[0])} />

                <div className="formSection">
                  <header className="taskHeading smallHeading">
                    <span>2</span>
                    <div><h2>أضف معلومات تساعد على الفهم</h2><p>هذه الخطوة اختيارية، لكنها تجعل التقرير أكثر تنظيمًا.</p></div>
                  </header>
                  <label className="field">
                    <span>ملاحظات عن الحالة <em>اختياري</em></span>
                    <textarea
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      placeholder="مثال: ظهرت الحالة منذ ثلاثة أيام، يوجد ألم خفيف، ولم يتغير حجمها..."
                    />
                  </label>

                  <div className={`timelineBox ${timelineEnabled ? "open" : ""}`}>
                    <button className="timelineToggle" onClick={() => setTimelineEnabled((value) => !value)} aria-expanded={timelineEnabled}>
                      <span className="timelineToggleIcon"><Timeline /></span>
                      <span className="timelineToggleCopy"><b>المتابعة الزمنية للحالة</b><small>أضف صورًا من أيام مختلفة للمقارنة قبل وبعد.</small></span>
                      <span className="optionalLabel">{timelineEnabled ? "مفعّلة" : "اختيارية"}</span>
                      <Chevron />
                    </button>

                    {timelineEnabled && (
                      <div className="timelineContent">
                        <div className="timelineHeader">
                          <div><b>صور المتابعة</b><small>حافظ على نفس المسافة والإضاءة قدر الإمكان.</small></div>
                          <button onClick={() => timelineFileRef.current?.click()}><Plus /> إضافة صور</button>
                          <input ref={timelineFileRef} hidden type="file" accept="image/*" multiple onChange={(event) => addTimelineFiles(event.target.files)} />
                        </div>

                        {timeline.length ? (
                          <div className="timelineGrid">
                            {timeline.map((item, index) => (
                              <article key={item.id}>
                                <img src={item.src} alt={`صورة متابعة رقم ${index + 1}`} />
                                <div className="timelineMeta">
                                  <span><b>{index === 0 ? "اليوم الأول" : `المتابعة ${index + 1}`}</b><small>{item.date}</small></span>
                                  <button onClick={() => removeTimeline(item.id)} aria-label={`حذف صورة المتابعة رقم ${index + 1}`}><Trash /></button>
                                </div>
                                <input value={item.note} onChange={(event) => updateTimelineNote(item.id, event.target.value)} placeholder="ملاحظة عن هذه الصورة" />
                              </article>
                            ))}
                          </div>
                        ) : (
                          <div className="timelineEmpty"><Timeline /><b>لم تضف صور متابعة بعد</b><small>يمكنك إضافة صورة اليوم الأول ثم صور لاحقة بعد عدة أيام.</small></div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="actionStage">
                  <header className="taskHeading smallHeading">
                    <span>3</span>
                    <div><h2>تحقق ثم شغّل التحليل</h2><p>لن يبدأ التحليل قبل التأكد من جودة الصورة.</p></div>
                  </header>

                  {!img && <div className="stageMessage"><Info /><span><b>أضف صورة أولًا</b><small>سيظهر زر فحص الجودة بعد اختيار الصورة.</small></span></div>}

                  {img && !quality && (
                    <button className="widePrimary" onClick={checkQuality}>فحص جودة الصورة <Shield /></button>
                  )}

                  {quality && (
                    <div className="qualityCard">
                      <div className="qualityScore"><strong>{quality.score}%</strong><small>جودة الصورة</small></div>
                      <div className="qualityItems">
                        <span><small>الإضاءة</small><b><Check />{quality.light}</b></span>
                        <span><small>الوضوح</small><b><Check />{quality.sharp}</b></span>
                        <span><small>الإطار</small><b><Check />{quality.frame}</b></span>
                      </div>
                    </div>
                  )}

                  {quality && !report && !loading && (
                    <button className="widePrimary" onClick={analyze}>تشغيل التحليل الذكي <Brain /></button>
                  )}

                  {loading && (
                    <div className="analysisProgress" aria-live="polite">
                      <div><span><Brain /><b>جاري تحليل الصورة</b></span><strong>{progress}%</strong></div>
                      <div className="progressTrack"><span style={{ width: `${progress}%` }} /></div>
                      <small>يرجى إبقاء الصفحة مفتوحة حتى تظهر النتيجة.</small>
                    </div>
                  )}

                  {report && (
                    <div className="resultCard" aria-live="polite">
                      <header>
                        <span className="resultIcon"><Report /></span>
                        <div><small>اكتمل التحليل</small><h2>التقرير {report.id}</h2></div>
                        <em>{report.priority}</em>
                      </header>

                      <div className="resultSummary">
                        <span><small>نوع الفحص</small><b>{report.title}</b></span>
                        <span><small>جودة الصورة</small><b>{report.quality}</b></span>
                        <span><small>الثقة البصرية</small><b>{report.confidence}</b></span>
                      </div>

                      {timelineEnabled && (
                        <div className="timelineReport"><Timeline /><span><b>المتابعة الزمنية مفعّلة</b><small>{timeline.length} صورة محفوظة للمقارنة داخل هذه الحالة.</small></span></div>
                      )}

                      <div className="resultItems">
                        {report.items.map((item) => <p key={item}><Check />{item}</p>)}
                      </div>

                      <div className="resultWarning"><Alert /> هذه النتيجة تحليل بصري أولي ولا تؤكد تشخيصًا طبيًا.</div>

                      <footer>
                        <button className="secondaryButton" onClick={() => goTo("reports")}><Report /> عرض كل التقارير</button>
                        <button className="primaryButton" onClick={resetExam}><Camera /> بدء فحص جديد</button>
                      </footer>
                    </div>
                  )}
                </div>
              </section>

              <aside className="helpPanel">
                <div className="helpIntro">
                  <span><Info /></span>
                  <div><h2>دليل الفحص</h2><p>افتح الأقسام التالية عند حاجتك للمساعدة.</p></div>
                </div>

                <details open>
                  <summary><span><Camera />تعليمات التصوير</span><Chevron /></summary>
                  <div className="detailsContent">
                    {exam.tips.map((tip) => <p key={tip}><Check />{tip}</p>)}
                  </div>
                </details>

                <details>
                  <summary><span><Shield />الحالات المشمولة</span><Chevron /></summary>
                  <div className="detailsContent caseList">
                    {exam.cases.map((caseName) => <p key={caseName}><Check />{caseName}</p>)}
                  </div>
                </details>

                <div className="medicalNotice">
                  <Alert />
                  <div><b>تنبيه مهم</b><p>لا تعتمد على النتيجة وحدها عند وجود حرارة، خمول، صعوبة تنفس، ألم شديد أو انتشار سريع.</p></div>
                </div>
              </aside>
            </div>
          </>
        )}

        {view === "ops" && (
          <section className="recordsPage">
            <header className="recordsHeader">
              <div><span className="sectionKicker">سجل الاستخدام</span><h1>العمليات</h1><p>جميع الفحوصات التي تم تنفيذها على هذا الجهاز.</p></div>
              <span className="recordCount">{ops.length} عملية</span>
            </header>

            {ops.length ? (
              <div className="recordList">
                {ops.map((item) => (
                  <article key={item.id}>
                    <span className="recordIcon"><History /></span>
                    <div className="recordMain"><small>{item.id}</small><h2>{item.test}</h2><p>{item.createdAt}</p></div>
                    <span className="statusBadge">{item.status}</span>
                    <button onClick={() => setSelectedReport(item)}>عرض التفاصيل <Arrow /></button>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyRecords Icon={History} title="لا توجد عمليات بعد" text="ابدأ أول فحص، وستظهر عملياته هنا تلقائيًا." onStart={() => openExam(exams[0])} />
            )}
          </section>
        )}

        {view === "reports" && (
          <section className="recordsPage">
            <header className="recordsHeader">
              <div><span className="sectionKicker">نتائج محفوظة</span><h1>التقارير</h1><p>ارجع إلى نتائج الفحوصات السابقة بسهولة.</p></div>
              <span className="recordCount">{ops.length} تقرير</span>
            </header>

            {ops.length ? (
              <div className="reportGrid">
                {ops.map((item) => (
                  <article key={item.id}>
                    <header><span><Report /></span><em>{item.priority}</em></header>
                    <small>{item.id}</small>
                    <h2>{item.test}</h2>
                    <p>{item.createdAt}</p>
                    <div><span><small>الجودة</small><b>{item.quality}</b></span><span><small>الثقة</small><b>{item.confidence}</b></span></div>
                    <button onClick={() => setSelectedReport(item)}>فتح التقرير <Arrow /></button>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyRecords Icon={Report} title="لا توجد تقارير محفوظة" text="بعد إكمال أول تحليل سيُحفظ التقرير هنا على جهازك." onStart={() => openExam(exams[0])} />
            )}
          </section>
        )}
      </div>

      {cameraOpen && (
        <div className="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="camera-title">
          <div className="cameraModal">
            <header><div><small>الكاميرا الخلفية</small><h2 id="camera-title">التصوير الفوري</h2></div><button onClick={closeCamera} aria-label="إغلاق الكاميرا"><Close /></button></header>
            <video ref={videoRef} autoPlay playsInline muted />
            <canvas ref={canvasRef} hidden />
            <div className="cameraTip"><Info /> ثبّت الهاتف واجعل المنطقة كاملة داخل الإطار.</div>
            <button className="captureButton" onClick={capture}><Camera /> التقاط الصورة</button>
          </div>
        </div>
      )}

      {selectedReport && (
        <div className="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="saved-report-title">
          <div className="savedReportModal">
            <header>
              <span><Report /></span>
              <div><small>تقرير محفوظ</small><h2 id="saved-report-title">{selectedReport.id}</h2></div>
              <button onClick={() => setSelectedReport(null)} aria-label="إغلاق التقرير"><Close /></button>
            </header>
            <div className="savedReportBody">
              <div className="savedReportTitle"><small>نوع الفحص</small><h3>{selectedReport.test}</h3><p>{selectedReport.createdAt}</p></div>
              <div className="resultSummary">
                <span><small>الجودة</small><b>{selectedReport.quality}</b></span>
                <span><small>الثقة البصرية</small><b>{selectedReport.confidence}</b></span>
                <span><small>الأولوية</small><b>{selectedReport.priority}</b></span>
              </div>
              <div className="resultItems">
                {selectedReport.items?.map((item) => <p key={item}><Check />{item}</p>)}
              </div>
              {selectedReport.note && <div className="savedNote"><small>ملاحظات المستخدم</small><p>{selectedReport.note}</p></div>}
              <div className="resultWarning"><Alert /> هذا التقرير تحليل بصري أولي وليس تشخيصًا طبيًا نهائيًا.</div>
            </div>
            <footer><button className="primaryButton" onClick={() => setSelectedReport(null)}>تم</button></footer>
          </div>
        </div>
      )}


      <style>{`
        :root {
          --ink: #12344b;
          --title: #0b4f7d;
          --muted: #607f91;
          --blue: #1479d5;
          --blue-dark: #0b5fa9;
          --cyan: #0798a5;
          --green: #1a9a68;
          --violet: #0b5fa9;
          --danger: #c63c4b;
          --warning: #9a6815;
          --line: #dbeaf1;
          --surface: #ffffff;
          --soft: #f4f9fc;
          --shadow: 0 22px 65px rgba(27, 83, 117, .10);
          --radius-xl: 30px;
          --radius-lg: 22px;
          --radius-md: 16px;
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #f2f8fb; }
        button, input, textarea { font: inherit; }
        button { cursor: pointer; }
        img { max-width: 100%; }
        button:focus-visible, input:focus-visible, textarea:focus-visible, summary:focus-visible, [tabindex="-1"]:focus-visible {
          outline: 3px solid rgba(20, 121, 213, .25);
          outline-offset: 3px;
        }

        .lab {
          min-height: 100vh;
          padding: 18px;
          color: var(--ink);
          background:
            radial-gradient(circle at 95% 0%, rgba(7, 152, 165, .12), transparent 26rem),
            radial-gradient(circle at 0% 55%, rgba(20, 121, 213, .09), transparent 28rem),
            linear-gradient(180deg, #f8fcfe 0%, #f1f8fb 100%);
          font-family: var(--font-tibyan), "IBM Plex Sans Arabic", "Tajawal", "Noto Kufi Arabic", Tahoma, Arial, sans-serif;
          font-size: 16px;
          line-height: 1.7;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        }

        .lab.largeText { font-size: 18px; }
        .appShell { width: min(100%, 1240px); margin: auto; }

        .topbar {
          position: sticky;
          top: 10px;
          z-index: 50;
          display: grid;
          grid-template-columns: minmax(250px, 1fr) auto minmax(150px, 1fr);
          align-items: center;
          gap: 14px;
          min-height: 78px;
          padding: 10px 12px;
          border: 1px solid rgba(255, 255, 255, .95);
          border-radius: 24px;
          background: rgba(255, 255, 255, .90);
          box-shadow: 0 16px 50px rgba(24, 80, 112, .12);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .topbar {
          grid-template-columns: 1fr !important;
        }

        .quickMenuWrap {
          position: relative;
          z-index: 120;
          display: flex;
          justify-content: flex-start;
          margin-top: 7px;
        }
        .quickMenuButton {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line);
          border-radius: 13px;
          color: var(--title);
          background: #fff;
          box-shadow: 0 9px 24px rgba(24,80,112,.10);
        }
        .quickMenuButton svg { width: 21px; height: 21px; }

        .quickMenu {
          position: absolute;
          top: 48px;
          right: 0;
          display: grid;
          gap: 6px;
          padding: 7px;
          border: 1px solid var(--line);
          border-radius: 15px;
          background: rgba(255,255,255,.98);
          box-shadow: 0 18px 42px rgba(24,80,112,.16);
        }
        .quickMenu button {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 11px;
          color: #668395;
          background: transparent;
        }
        .quickMenu button:hover,
        .quickMenu button.active {
          color: #fff;
          background: linear-gradient(145deg,var(--blue),var(--cyan));
        }
        .quickMenu svg { width: 20px; height: 20px; }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          padding: 4px;
          border: 0;
          border-radius: 17px;
          background: transparent;
          color: inherit;
          text-align: right;
        }
        .brandMark {
          width: 54px;
          height: 54px;
          flex: 0 0 54px;
          display: grid;
          place-items: center;
          border-radius: 18px;
          color: white;
          background: linear-gradient(145deg, var(--blue), var(--cyan));
          box-shadow: 0 12px 28px rgba(20, 121, 213, .24);
        }
        .brandMark svg { width: 29px; height: 29px; }
        .brandCopy b, .brandCopy small { display: block; }
        .brandCopy b { color: var(--title); font-size: 1em; font-weight: 900; }
        .brandCopy small { margin-top: 1px; color: var(--muted); font-size: .72em; font-weight: 700; }

        .appNav {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px;
          border: 1px solid var(--line);
          border-radius: 17px;
          background: #f5fafc;
        }
        .appNav button {
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 9px 16px;
          border: 0;
          border-radius: 13px;
          background: transparent;
          color: #668395;
          font-size: .8em;
          font-weight: 850;
          transition: background .2s ease, color .2s ease, transform .2s ease;
        }
        .appNav button:hover { color: var(--blue); transform: translateY(-1px); }
        .appNav button.active { color: white; background: linear-gradient(145deg, var(--blue), var(--cyan)); box-shadow: 0 9px 22px rgba(20, 121, 213, .20); }
        .appNav svg { width: 19px; height: 19px; }

        .accessButton {
          justify-self: end;
          min-height: 46px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 13px;
          border: 1px solid var(--line);
          border-radius: 14px;
          background: #fff;
          color: var(--title);
          font-size: .76em;
          font-weight: 850;
        }
        .accessButton:hover { background: #f3f9fc; }
        .accessButton svg { width: 20px; height: 20px; }

        .hero {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(310px, .72fr);
          gap: 24px;
          margin-top: 22px;
          padding: clamp(30px, 5vw, 56px);
          border: 1px solid rgba(255, 255, 255, .95);
          border-radius: 34px;
          background:
            radial-gradient(circle at 8% 100%, rgba(20, 121, 213, .08), transparent 21rem),
            linear-gradient(125deg, #ffffff 0%, #f5fbfd 64%, #eaf8f8 100%);
          box-shadow: var(--shadow);
        }
        .heroCopy { align-self: center; }
        .eyebrow, .sectionKicker {
          width: max-content;
          max-width: 100%;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #087f89;
          font-size: .76em;
          font-weight: 900;
        }
        .eyebrow { padding: 7px 11px; border: 1px solid #d0eeee; border-radius: 999px; background: #edfbfb; }
        .eyebrow svg { width: 17px; height: 17px; }
        .hero h1 {
          max-width: 750px;
          margin: 17px 0 0;
          color: var(--title);
          font-size: clamp(2.35em, 5vw, 4.1em);
          font-weight: 950;
          letter-spacing: -.035em;
          line-height: 1.22;
        }
        .heroCopy > p { max-width: 710px; margin: 18px 0 0; color: var(--muted); font-size: 1.03em; line-height: 1.95; }
        .heroActions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
        .primaryButton, .secondaryButton, .widePrimary {
          min-height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 17px;
          border-radius: 14px;
          font-size: .82em;
          font-weight: 900;
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .primaryButton, .widePrimary { border: 0; color: #fff; background: linear-gradient(145deg, var(--blue), var(--cyan)); box-shadow: 0 13px 28px rgba(20, 121, 213, .21); }
        .secondaryButton { border: 1px solid #cfe0e9; color: var(--title); background: #fff; }
        .primaryButton:hover, .widePrimary:hover { transform: translateY(-2px); box-shadow: 0 17px 34px rgba(20, 121, 213, .26); }
        .secondaryButton:hover { transform: translateY(-1px); background: #f6fbfd; }
        .primaryButton svg, .secondaryButton svg, .widePrimary svg { width: 19px; height: 19px; }

        .trustRow { display: flex; flex-wrap: wrap; gap: 9px 17px; margin-top: 22px; color: #58798c; font-size: .75em; font-weight: 800; }
        .trustRow span { display: inline-flex; align-items: center; gap: 6px; }
        .trustRow svg { width: 17px; height: 17px; color: var(--green); }

        .heroGuide {
          align-self: stretch;
          padding: 22px;
          border: 1px solid rgba(20, 121, 213, .12);
          border-radius: 26px;
          background: rgba(255, 255, 255, .86);
          box-shadow: 0 18px 45px rgba(24, 80, 112, .08);
        }
        .guideTop { display: flex; align-items: center; gap: 11px; padding-bottom: 16px; border-bottom: 1px solid var(--line); }
        .guideTop > span { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 15px; color: #fff; background: linear-gradient(145deg, var(--blue), var(--cyan)); }
        .guideTop svg { width: 24px; height: 24px; }
        .guideTop small, .guideTop b { display: block; }
        .guideTop small { color: var(--muted); font-size: .68em; }
        .guideTop b { margin-top: 1px; color: var(--title); font-size: .96em; }
        .heroGuide ol { display: grid; gap: 12px; margin: 18px 0; padding: 0; list-style: none; }
        .heroGuide li { display: flex; align-items: center; gap: 11px; }
        .heroGuide li > b { width: 36px; height: 36px; flex: 0 0 36px; display: grid; place-items: center; border-radius: 12px; color: var(--blue); background: #eaf4ff; font-size: .78em; }
        .heroGuide li strong, .heroGuide li small { display: block; }
        .heroGuide li strong { color: var(--title); font-size: .82em; }
        .heroGuide li small { color: var(--muted); font-size: .7em; }
        .guideNotice { display: flex; align-items: flex-start; gap: 8px; padding: 12px; border-radius: 14px; color: #7b622b; background: #fff8e9; font-size: .7em; line-height: 1.7; }
        .guideNotice svg { width: 18px; height: 18px; flex: 0 0 18px; }

        .sectionBlock, .howSection, .recordsPage { margin-top: 22px; padding: clamp(22px, 4vw, 36px); border: 1px solid rgba(255, 255, 255, .94); border-radius: 30px; background: rgba(255, 255, 255, .92); box-shadow: var(--shadow); scroll-margin-top: 110px; }
        .sectionHeading { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 22px; }
        .sectionHeading.compact { margin-bottom: 18px; }
        .sectionHeading h2, .recordsHeader h1 { margin: 4px 0 0; color: var(--title); font-size: clamp(1.8em, 3vw, 2.6em); line-height: 1.3; }
        .sectionHeading p, .recordsHeader p { margin: 7px 0 0; color: var(--muted); font-size: .86em; }

        .examCards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .examCard {
          --accent: var(--blue);
          --soft: #eaf4ff;
          min-width: 0;
          display: flex;
          flex-direction: column;
          padding: 22px;
          border: 1px solid color-mix(in srgb, var(--accent) 15%, #dfeaf0);
          border-radius: 24px;
          background: linear-gradient(160deg, #fff 0%, #fff 70%, var(--soft) 140%);
          box-shadow: 0 14px 40px rgba(24, 80, 112, .07);
          transition: transform .24s ease, box-shadow .24s ease, border-color .24s ease;
        }
        .examCard:hover { transform: translateY(-5px); border-color: color-mix(in srgb, var(--accent) 36%, #dfeaf0); box-shadow: 0 22px 52px rgba(24, 80, 112, .12); }
        .examCardTop { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .examIcon { width: 62px; height: 62px; display: grid; place-items: center; border-radius: 19px; color: var(--accent); background: var(--soft); }
        .examIcon svg { width: 31px; height: 31px; }
        .examCode { color: var(--accent); font-size: .68em; font-weight: 900; }
        .examCard h3 { margin: 17px 0 0; color: var(--title); font-size: 1.24em; line-height: 1.4; }
        .examCard > p { flex: 1; margin: 8px 0 0; color: var(--muted); font-size: .78em; line-height: 1.85; }
        .examQuickList { display: grid; gap: 7px; margin-top: 15px; }
        .examQuickList span { display: flex; align-items: center; gap: 6px; color: #58798b; font-size: .72em; }
        .examQuickList svg { width: 15px; height: 15px; flex: 0 0 15px; color: var(--green); }
        .examQuickList .moreCases { color: var(--accent); font-weight: 850; }
        .examCard > button { width: 100%; min-height: 48px; display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 19px; padding: 10px 14px; border: 0; border-radius: 14px; color: #fff; background: linear-gradient(145deg, var(--accent), color-mix(in srgb, var(--accent) 62%, var(--cyan))); font-size: .78em; font-weight: 900; }
        .examCard > button svg { width: 18px; height: 18px; }

        .howSection { background: linear-gradient(135deg, #0d4d77, #0c6d88); color: #fff; }
        .howSection .sectionKicker { color: #aee8e9; }
        .howSection .sectionHeading h2 { color: #fff; }
        .howGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 13px; }
        .howGrid article { position: relative; padding: 22px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 21px; background: rgba(255, 255, 255, .08); }
        .howGrid article > span { position: absolute; top: 14px; left: 16px; color: rgba(255, 255, 255, .35); font-size: 1.8em; font-weight: 900; }
        .howGrid svg { width: 34px; height: 34px; color: #aee8e9; }
        .howGrid h3 { margin: 15px 0 0; font-size: 1.05em; }
        .howGrid p { margin: 7px 0 0; color: rgba(255, 255, 255, .78); font-size: .77em; line-height: 1.8; }

        .safetyBanner { display: flex; align-items: flex-start; gap: 16px; margin-top: 22px; padding: 24px; border: 1px solid #f0ddb6; border-radius: 24px; background: #fffaf0; }
        .safetyIcon { width: 54px; height: 54px; flex: 0 0 54px; display: grid; place-items: center; border-radius: 17px; color: #9b6713; background: #fff0ce; }
        .safetyIcon svg { width: 27px; height: 27px; }
        .safetyBanner h2 { margin: 0; color: #744d0e; font-size: 1.08em; }
        .safetyBanner p { margin: 6px 0 0; color: #7d6843; font-size: .8em; line-height: 1.85; }

        .pageTools { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-top: 20px; }
        .backButton { min-height: 44px; display: inline-flex; align-items: center; gap: 7px; padding: 9px 13px; border: 1px solid var(--line); border-radius: 13px; color: var(--title); background: #fff; font-size: .76em; font-weight: 900; }
        .backButton svg { width: 17px; height: 17px; transform: rotate(180deg); }
        .saveHint { display: inline-flex; align-items: center; gap: 7px; color: var(--muted); font-size: .72em; font-weight: 750; }
        .saveHint svg { width: 17px; height: 17px; color: var(--green); }

        .examHeader {
          --accent: var(--blue);
          --soft: #eaf4ff;
          display: flex;
          align-items: center;
          gap: 19px;
          margin-top: 13px;
          padding: 24px;
          border: 1px solid color-mix(in srgb, var(--accent) 16%, var(--line));
          border-radius: 25px;
          background: linear-gradient(130deg, #fff 0%, #f8fcfe 74%, var(--soft) 100%);
          box-shadow: 0 15px 44px rgba(24, 80, 112, .08);
        }
        .examHeaderIcon { width: 78px; height: 78px; flex: 0 0 78px; display: grid; place-items: center; border-radius: 23px; color: var(--accent); background: var(--soft); }
        .examHeaderIcon svg { width: 38px; height: 38px; }
        .examHeader small { color: var(--accent); font-size: .7em; font-weight: 900; }
        .examHeader h1 { margin: 3px 0 0; color: var(--title); font-size: clamp(1.7em, 3vw, 2.5em); line-height: 1.35; }
        .examHeader p { max-width: 850px; margin: 6px 0 0; color: var(--muted); font-size: .82em; line-height: 1.85; }

        .stepper { position: relative; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-top: 12px; }
        .stepper::before { content: ""; position: absolute; top: 29px; right: 12%; left: 12%; height: 2px; background: #dce9ef; }
        .stepper > div { position: relative; z-index: 1; min-height: 70px; display: grid; place-items: center; align-content: center; gap: 5px; padding: 8px; border: 1px solid var(--line); border-radius: 16px; color: #8aa0ad; background: rgba(255, 255, 255, .93); text-align: center; }
        .stepper > div > span { width: 32px; height: 32px; display: grid; place-items: center; border-radius: 50%; background: #edf3f6; font-size: .75em; font-weight: 900; }
        .stepper > div > span svg { width: 17px; height: 17px; }
        .stepper small { font-size: .68em; font-weight: 850; }
        .stepper .complete, .stepper .current { color: var(--blue); border-color: #bcd9ec; }
        .stepper .complete > span, .stepper .current > span { color: #fff; background: linear-gradient(145deg, var(--blue), var(--cyan)); }
        .stepper .current { box-shadow: 0 10px 25px rgba(20, 121, 213, .10); }

        .examLayout { display: grid; grid-template-columns: minmax(0, 1fr) 330px; gap: 16px; margin-top: 15px; }
        .taskPanel, .helpPanel { border: 1px solid rgba(255, 255, 255, .95); border-radius: 26px; background: rgba(255, 255, 255, .95); box-shadow: 0 17px 50px rgba(24, 80, 112, .08); }
        .taskPanel { padding: 22px; }
        .helpPanel { position: sticky; top: 104px; align-self: start; padding: 18px; }

        .taskHeading { display: flex; align-items: flex-start; gap: 12px; }
        .taskHeading > span { width: 38px; height: 38px; flex: 0 0 38px; display: grid; place-items: center; border-radius: 12px; color: #fff; background: linear-gradient(145deg, var(--blue), var(--cyan)); font-size: .78em; font-weight: 900; }
        .taskHeading h2 { margin: 0; color: var(--title); font-size: 1.16em; }
        .taskHeading p { margin: 2px 0 0; color: var(--muted); font-size: .75em; }
        .smallHeading h2 { font-size: 1.05em; }
        .smallHeading > span { width: 34px; height: 34px; flex-basis: 34px; }

        .uploadArea { min-height: 300px; display: grid; place-items: center; align-content: center; gap: 7px; margin-top: 17px; padding: 25px; border: 2px dashed #c6dde9; border-radius: 22px; background: linear-gradient(180deg, #f9fdff, #f3f9fc); text-align: center; transition: border-color .2s ease, background .2s ease, transform .2s ease; }
        .uploadArea.dragging { border-color: var(--blue); background: #edf7ff; transform: scale(.995); }
        .uploadIcon { width: 70px; height: 70px; display: grid; place-items: center; border-radius: 22px; color: #fff; background: linear-gradient(145deg, var(--blue), var(--cyan)); box-shadow: 0 15px 32px rgba(20, 121, 213, .23); }
        .uploadIcon svg { width: 34px; height: 34px; }
        .uploadArea h3 { margin: 8px 0 0; color: var(--title); font-size: 1.15em; }
        .uploadArea p { margin: 0; color: var(--muted); font-size: .78em; }
        .uploadActions { display: flex; flex-wrap: wrap; justify-content: center; gap: 9px; margin-top: 12px; }
        .uploadArea > small { margin-top: 8px; color: #7f96a3; font-size: .66em; }

        .imagePreview { margin-top: 17px; overflow: hidden; border: 1px solid var(--line); border-radius: 22px; background: #edf3f6; }
        .previewImageWrap { display: grid; place-items: center; max-height: 510px; overflow: hidden; background: #e9f1f5; }
        .previewImageWrap img { width: 100%; max-height: 510px; display: block; object-fit: contain; }
        .previewBar { display: flex; align-items: center; justify-content: space-between; gap: 13px; padding: 12px; background: #fff; }
        .previewBar > div:first-child { min-width: 0; display: flex; align-items: center; gap: 9px; }
        .previewBar > div:first-child > svg { width: 21px; height: 21px; flex: 0 0 21px; color: var(--green); }
        .previewBar b, .previewBar small { display: block; }
        .previewBar b { color: var(--title); font-size: .76em; }
        .previewBar small { max-width: 270px; overflow: hidden; color: var(--muted); font-size: .66em; text-overflow: ellipsis; white-space: nowrap; }
        .previewActions { display: flex; flex-wrap: wrap; gap: 7px; }
        .previewActions button { min-height: 42px; display: inline-flex; align-items: center; gap: 6px; padding: 8px 10px; border: 1px solid var(--line); border-radius: 11px; color: var(--title); background: #f8fcfe; font-size: .68em; font-weight: 850; }
        .previewActions button:hover { background: #eef7fb; }
        .previewActions button.dangerButton { color: var(--danger); background: #fff7f8; }
        .previewActions svg { width: 16px; height: 16px; }

        .formSection, .actionStage { margin-top: 19px; padding-top: 19px; border-top: 1px solid var(--line); }
        .field { display: block; margin-top: 14px; }
        .field > span { display: flex; align-items: center; gap: 7px; margin-bottom: 7px; color: var(--title); font-size: .77em; font-weight: 900; }
        .field em { padding: 3px 7px; border-radius: 999px; color: #6b8493; background: #eef4f6; font-size: .58em; font-style: normal; }
        .field textarea { width: 100%; min-height: 115px; resize: vertical; padding: 13px 14px; border: 1px solid #cfe0e8; border-radius: 15px; outline: 0; color: var(--ink); background: #f8fcfe; font-size: .8em; line-height: 1.8; }
        .field textarea:focus { border-color: var(--blue); background: #fff; }

        .timelineBox { margin-top: 13px; overflow: hidden; border: 1px solid #d8e8f1; border-radius: 17px; background: #f7fbfd; }
        .timelineBox.open { border-color: #b9d8e9; }
        .timelineToggle { width: 100%; display: grid; grid-template-columns: 48px minmax(0, 1fr) auto 20px; align-items: center; gap: 10px; padding: 12px; border: 0; background: transparent; color: #0b5fa9; text-align: right; }
        .timelineToggleIcon { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 14px; background: #eaf4ff; }
        .timelineToggleIcon svg { width: 23px; height: 23px; }
        .timelineToggleCopy b, .timelineToggleCopy small { display: block; }
        .timelineToggleCopy b { font-size: .78em; }
        .timelineToggleCopy small { margin-top: 2px; color: #607f91; font-size: .66em; }
        .optionalLabel { padding: 5px 9px; border-radius: 999px; color: var(--violet); background: #fff; font-size: .6em; font-weight: 900; }
        .timelineToggle > svg { width: 18px; height: 18px; transition: transform .2s ease; }
        .timelineBox.open .timelineToggle > svg { transform: rotate(180deg); }
        .timelineContent { padding: 0 13px 13px; border-top: 1px solid #dceaf1; }
        .timelineHeader { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding-top: 13px; }
        .timelineHeader b, .timelineHeader small { display: block; }
        .timelineHeader b { color: #0b5fa9; font-size: .76em; }
        .timelineHeader small { color: #607f91; font-size: .64em; }
        .timelineHeader button { min-height: 40px; display: inline-flex; align-items: center; gap: 6px; padding: 8px 11px; border: 0; border-radius: 11px; color: #fff; background: var(--violet); font-size: .66em; font-weight: 900; }
        .timelineHeader svg { width: 15px; height: 15px; }
        .timelineGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 11px; }
        .timelineGrid article { overflow: hidden; border: 1px solid #d8e7ef; border-radius: 15px; background: #fff; }
        .timelineGrid article > img { width: 100%; height: 190px; display: block; object-fit: cover; }
        .timelineMeta { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 9px; }
        .timelineMeta b, .timelineMeta small { display: block; }
        .timelineMeta b { color: #0b5fa9; font-size: .7em; }
        .timelineMeta small { color: #607f91; font-size: .58em; }
        .timelineMeta button { width: 34px; height: 34px; display: grid; place-items: center; border: 0; border-radius: 10px; color: var(--danger); background: #fff3f4; }
        .timelineMeta svg { width: 15px; height: 15px; }
        .timelineGrid input { width: calc(100% - 18px); margin: 0 9px 9px; padding: 9px 10px; border: 1px solid #d8e7ef; border-radius: 10px; outline: 0; color: #0b5fa9; background: #f7fbfd; font-size: .65em; }
        .timelineEmpty { min-height: 135px; display: grid; place-items: center; align-content: center; gap: 4px; margin-top: 11px; border: 1px dashed #bfd9e8; border-radius: 14px; color: var(--violet); text-align: center; }
        .timelineEmpty svg { width: 28px; height: 28px; }
        .timelineEmpty b { font-size: .74em; }
        .timelineEmpty small { color: #607f91; font-size: .63em; }

        .stageMessage { display: flex; align-items: center; gap: 9px; margin-top: 14px; padding: 13px; border-radius: 14px; color: #617d8d; background: #f2f7f9; }
        .stageMessage > svg { width: 21px; height: 21px; flex: 0 0 21px; color: var(--blue); }
        .stageMessage b, .stageMessage small { display: block; }
        .stageMessage b { color: var(--title); font-size: .75em; }
        .stageMessage small { font-size: .65em; }
        .widePrimary { width: 100%; margin-top: 14px; }

        .qualityCard { display: grid; grid-template-columns: 135px minmax(0, 1fr); gap: 10px; margin-top: 14px; padding: 12px; border: 1px solid #ccebdc; border-radius: 18px; background: #effaf5; }
        .qualityScore { min-height: 105px; display: grid; place-items: center; align-content: center; border-radius: 14px; background: #fff; box-shadow: 0 8px 22px rgba(26, 154, 104, .07); }
        .qualityScore strong { color: var(--green); font-size: 1.9em; line-height: 1; }
        .qualityScore small { margin-top: 7px; color: #708b7e; font-size: .64em; }
        .qualityItems { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; }
        .qualityItems > span { display: grid; place-items: center; align-content: center; border-radius: 12px; background: rgba(255, 255, 255, .9); text-align: center; }
        .qualityItems small { color: #708b7e; font-size: .61em; }
        .qualityItems b { display: flex; align-items: center; gap: 4px; margin-top: 4px; color: var(--green); font-size: .7em; }
        .qualityItems svg { width: 14px; height: 14px; }

        .analysisProgress { margin-top: 14px; padding: 14px; border: 1px solid #cfe0e8; border-radius: 16px; background: #f7fbfd; }
        .analysisProgress > div:first-child { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .analysisProgress > div:first-child > span { display: flex; align-items: center; gap: 7px; color: var(--title); font-size: .75em; }
        .analysisProgress svg { width: 19px; height: 19px; color: var(--blue); }
        .analysisProgress strong { color: var(--blue); font-size: .8em; }
        .progressTrack { height: 10px; margin-top: 11px; overflow: hidden; border-radius: 999px; background: #e1ecf1; }
        .progressTrack span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--blue), var(--cyan), var(--green)); transition: width .2s linear; }
        .analysisProgress > small { display: block; margin-top: 7px; color: var(--muted); font-size: .62em; }

        .resultCard { margin-top: 15px; overflow: hidden; border: 1px solid #c9e0ec; border-radius: 21px; background: #fff; box-shadow: 0 14px 37px rgba(24, 80, 112, .08); }
        .resultCard > header { display: flex; align-items: center; gap: 11px; padding: 14px; background: linear-gradient(120deg, #edf8ff, #effbf8); }
        .resultIcon { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 15px; color: #fff; background: linear-gradient(145deg, var(--blue), var(--cyan)); }
        .resultIcon svg { width: 23px; height: 23px; }
        .resultCard header small { color: var(--muted); font-size: .62em; }
        .resultCard header h2 { margin: 2px 0 0; color: var(--title); font-size: .95em; }
        .resultCard header em { margin-right: auto; padding: 6px 10px; border-radius: 999px; color: var(--warning); background: #fff7e7; font-size: .62em; font-style: normal; font-weight: 900; }
        .resultSummary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; padding: 13px; }
        .resultSummary > span { min-height: 78px; display: grid; place-items: center; align-content: center; padding: 8px; border-radius: 12px; background: #f5fafc; text-align: center; }
        .resultSummary small { color: var(--muted); font-size: .61em; }
        .resultSummary b { margin-top: 4px; color: var(--title); font-size: .72em; }
        .timelineReport { display: flex; align-items: center; gap: 9px; margin: 0 13px 12px; padding: 11px; border-radius: 12px; color: #0b5fa9; background: #edf6fb; }
        .timelineReport > svg { width: 21px; height: 21px; flex: 0 0 21px; }
        .timelineReport b, .timelineReport small { display: block; }
        .timelineReport b { font-size: .7em; }
        .timelineReport small { color: #6d8795; font-size: .6em; }
        .resultItems { display: grid; gap: 8px; padding: 0 13px 13px; }
        .resultItems p { display: flex; align-items: flex-start; gap: 7px; margin: 0; color: #56778a; font-size: .72em; }
        .resultItems svg { width: 16px; height: 16px; flex: 0 0 16px; margin-top: 3px; color: var(--green); }
        .resultWarning { display: flex; align-items: flex-start; gap: 7px; margin: 0 13px 13px; padding: 10px; border-radius: 11px; color: #80652f; background: #fff8e9; font-size: .65em; }
        .resultWarning svg { width: 17px; height: 17px; flex: 0 0 17px; }
        .resultCard footer { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; padding: 13px; border-top: 1px solid var(--line); }

        .helpIntro { display: flex; align-items: center; gap: 10px; padding-bottom: 14px; }
        .helpIntro > span { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 14px; color: var(--blue); background: #eaf4ff; }
        .helpIntro svg { width: 22px; height: 22px; }
        .helpIntro h2 { margin: 0; color: var(--title); font-size: .95em; }
        .helpIntro p { margin: 2px 0 0; color: var(--muted); font-size: .64em; }
        .helpPanel details { overflow: hidden; margin-top: 9px; border: 1px solid var(--line); border-radius: 14px; background: #fbfdfe; }
        .helpPanel summary { min-height: 50px; display: flex; align-items: center; justify-content: space-between; gap: 9px; padding: 10px 12px; color: var(--title); list-style: none; cursor: pointer; font-size: .75em; font-weight: 900; }
        .helpPanel summary::-webkit-details-marker { display: none; }
        .helpPanel summary > span { display: flex; align-items: center; gap: 7px; }
        .helpPanel summary svg { width: 18px; height: 18px; color: var(--blue); }
        .helpPanel summary > svg { transition: transform .2s ease; }
        .helpPanel details[open] summary > svg { transform: rotate(180deg); }
        .detailsContent { max-height: 380px; overflow: auto; display: grid; gap: 7px; padding: 0 11px 11px; border-top: 1px solid var(--line); scrollbar-width: thin; }
        .detailsContent p { display: flex; align-items: flex-start; gap: 7px; margin: 0; padding-top: 9px; color: #5c7889; font-size: .68em; line-height: 1.7; }
        .detailsContent p svg { width: 15px; height: 15px; flex: 0 0 15px; margin-top: 2px; color: var(--green); }
        .caseList { grid-template-columns: 1fr; }
        .medicalNotice { display: flex; align-items: flex-start; gap: 9px; margin-top: 11px; padding: 12px; border: 1px solid #f0ddb6; border-radius: 14px; color: #775c25; background: #fff9ed; }
        .medicalNotice > svg { width: 20px; height: 20px; flex: 0 0 20px; }
        .medicalNotice b { display: block; font-size: .72em; }
        .medicalNotice p { margin: 3px 0 0; font-size: .63em; line-height: 1.7; }

        .recordsHeader { display: flex; align-items: end; justify-content: space-between; gap: 15px; }
        .recordCount { padding: 7px 11px; border-radius: 999px; color: var(--blue); background: #eaf4ff; font-size: .7em; font-weight: 900; }
        .recordList { display: grid; gap: 10px; margin-top: 21px; }
        .recordList article { display: grid; grid-template-columns: 54px minmax(0, 1fr) auto auto; align-items: center; gap: 12px; padding: 14px; border: 1px solid var(--line); border-radius: 17px; background: #f9fcfd; }
        .recordIcon { width: 52px; height: 52px; display: grid; place-items: center; border-radius: 15px; color: var(--blue); background: #eaf4ff; }
        .recordIcon svg { width: 24px; height: 24px; }
        .recordMain small { color: var(--muted); font-size: .6em; }
        .recordMain h2 { margin: 1px 0 0; color: var(--title); font-size: .86em; }
        .recordMain p { margin: 2px 0 0; color: var(--muted); font-size: .64em; }
        .statusBadge { padding: 6px 10px; border-radius: 999px; color: var(--green); background: #eaf8f1; font-size: .62em; font-weight: 900; }
        .recordList article > button, .reportGrid article > button { min-height: 42px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 11px; border: 1px solid #cfe0e8; border-radius: 11px; color: var(--title); background: #fff; font-size: .68em; font-weight: 900; }
        .recordList article > button svg, .reportGrid article > button svg { width: 16px; height: 16px; }

        .reportGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 21px; }
        .reportGrid article { padding: 19px; border: 1px solid var(--line); border-radius: 21px; background: linear-gradient(160deg, #fff, #f7fbfd); box-shadow: 0 12px 35px rgba(24, 80, 112, .06); }
        .reportGrid article > header { display: flex; align-items: center; justify-content: space-between; gap: 9px; }
        .reportGrid article > header > span { width: 47px; height: 47px; display: grid; place-items: center; border-radius: 14px; color: #fff; background: linear-gradient(145deg, var(--blue), var(--cyan)); }
        .reportGrid article > header svg { width: 23px; height: 23px; }
        .reportGrid article > header em { padding: 5px 8px; border-radius: 999px; color: var(--warning); background: #fff7e7; font-size: .59em; font-style: normal; font-weight: 900; }
        .reportGrid article > small { display: block; margin-top: 14px; color: var(--muted); font-size: .6em; }
        .reportGrid article > h2 { margin: 3px 0 0; color: var(--title); font-size: .93em; }
        .reportGrid article > p { margin: 4px 0 0; color: var(--muted); font-size: .63em; }
        .reportGrid article > div { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; margin-top: 14px; }
        .reportGrid article > div > span { display: grid; place-items: center; align-content: center; min-height: 65px; border-radius: 11px; background: #f0f6f8; text-align: center; }
        .reportGrid article > div small { color: var(--muted); font-size: .58em; }
        .reportGrid article > div b { margin-top: 2px; color: var(--title); font-size: .72em; }
        .reportGrid article > button { width: 100%; margin-top: 13px; }

        .emptyRecords { min-height: 320px; display: grid; place-items: center; align-content: center; gap: 7px; margin-top: 21px; padding: 25px; border: 1px dashed #c8dce6; border-radius: 21px; background: #f8fcfd; text-align: center; }
        .emptyRecords > span { width: 68px; height: 68px; display: grid; place-items: center; border-radius: 21px; color: var(--blue); background: #eaf4ff; }
        .emptyRecords svg { width: 32px; height: 32px; }
        .emptyRecords h2 { margin: 8px 0 0; color: var(--title); font-size: 1.05em; }
        .emptyRecords p { margin: 0; color: var(--muted); font-size: .75em; }
        .emptyRecords button { margin-top: 10px; }

        .modalBackdrop { position: fixed; inset: 0; z-index: 999; display: grid; place-items: center; padding: 16px; background: rgba(5, 28, 43, .78); backdrop-filter: blur(9px); -webkit-backdrop-filter: blur(9px); }
        .cameraModal, .savedReportModal { width: min(100%, 820px); max-height: calc(100vh - 32px); overflow: auto; border: 1px solid rgba(255, 255, 255, .2); border-radius: 25px; background: #fff; box-shadow: 0 35px 100px rgba(0, 0, 0, .35); }
        .cameraModal > header, .savedReportModal > header { display: flex; align-items: center; gap: 11px; padding: 14px 16px; }
        .cameraModal > header { justify-content: space-between; }
        .cameraModal header small, .cameraModal header h2, .savedReportModal header small, .savedReportModal header h2 { display: block; margin: 0; }
        .cameraModal header small, .savedReportModal header small { color: var(--muted); font-size: .62em; }
        .cameraModal header h2, .savedReportModal header h2 { color: var(--title); font-size: 1em; }
        .cameraModal header button, .savedReportModal header button { width: 40px; height: 40px; display: grid; place-items: center; border: 0; border-radius: 12px; color: var(--danger); background: #fff2f3; }
        .cameraModal header svg, .savedReportModal header button svg { width: 19px; height: 19px; }
        .cameraModal video { width: 100%; max-height: 65vh; display: block; background: #000; }
        .cameraTip { display: flex; align-items: center; gap: 7px; margin: 12px 14px 0; padding: 10px; border-radius: 12px; color: #5d7889; background: #f2f7f9; font-size: .68em; }
        .cameraTip svg { width: 17px; height: 17px; color: var(--blue); }
        .captureButton { width: calc(100% - 28px); min-height: 52px; display: flex; align-items: center; justify-content: center; gap: 8px; margin: 12px 14px 14px; border: 0; border-radius: 15px; color: #fff; background: linear-gradient(145deg, var(--blue), var(--cyan)); font-size: .8em; font-weight: 900; }
        .captureButton svg { width: 20px; height: 20px; }

        .savedReportModal { width: min(100%, 660px); }
        .savedReportModal > header { background: linear-gradient(120deg, #edf8ff, #effbf8); }
        .savedReportModal > header > span { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 15px; color: #fff; background: linear-gradient(145deg, var(--blue), var(--cyan)); }
        .savedReportModal > header > span svg { width: 23px; height: 23px; }
        .savedReportModal > header button { margin-right: auto; }
        .savedReportBody { padding: 15px; }
        .savedReportTitle small { color: var(--muted); font-size: .62em; }
        .savedReportTitle h3 { margin: 2px 0 0; color: var(--title); font-size: 1em; }
        .savedReportTitle p { margin: 3px 0 0; color: var(--muted); font-size: .64em; }
        .savedReportModal .resultSummary { padding-inline: 0; }
        .savedReportModal .resultItems { padding-inline: 0; }
        .savedReportModal .resultWarning { margin-inline: 0; }
        .savedNote { margin-bottom: 13px; padding: 12px; border-radius: 12px; background: #f5fafc; }
        .savedNote small { color: var(--muted); font-size: .6em; }
        .savedNote p { margin: 3px 0 0; color: var(--ink); font-size: .72em; }
        .savedReportModal > footer { display: flex; justify-content: flex-end; padding: 13px 15px; border-top: 1px solid var(--line); }
        .savedReportModal > footer button { min-width: 110px; }

        @media (max-width: 1040px) {
          .topbar { grid-template-columns: minmax(220px, 1fr) auto auto; }
          .hero { grid-template-columns: 1fr; }
          .heroGuide { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 14px 20px; align-items: start; }
          .guideTop { border-bottom: 0; padding-bottom: 0; }
          .heroGuide ol { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-column: 1 / -1; margin: 0; }
          .guideNotice { grid-column: 1 / -1; }
          .examCards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .examLayout { grid-template-columns: 1fr; }
          .helpPanel { position: relative; top: auto; }
          .detailsContent { max-height: 420px; }
        }

        @media (max-width: 820px) {
          .lab { padding: 10px 10px 92px; }
          .topbar { position: relative; top: auto; grid-template-columns: minmax(0, 1fr) auto; border-radius: 21px; }
          .appNav { position: fixed; right: 10px; bottom: 9px; left: 10px; z-index: 100; justify-content: stretch; padding: 6px; border-color: rgba(255, 255, 255, .9); background: rgba(255, 255, 255, .93); box-shadow: 0 15px 45px rgba(17, 60, 85, .2); backdrop-filter: blur(15px); }
          .appNav button { flex: 1; flex-direction: column; gap: 2px; min-height: 58px; padding: 6px; font-size: .62em; }
          .appNav svg { width: 20px; height: 20px; }
          .accessButton { grid-column: 2; }
          .hero, .sectionBlock, .howSection, .recordsPage { border-radius: 25px; }
          .heroGuide ol { grid-template-columns: 1fr; }
          .howGrid { grid-template-columns: 1fr; }
          .reportGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .recordList article { grid-template-columns: 48px minmax(0, 1fr) auto; }
          .recordList article > button { grid-column: 2 / -1; justify-self: stretch; }
        }

        @media (max-width: 620px) {
          .lab { padding-inline: 7px; }
          .topbar { gap: 8px; padding: 8px; }
          .brandMark { width: 47px; height: 47px; flex-basis: 47px; border-radius: 15px; }
          .brandMark svg { width: 25px; height: 25px; }
          .brandCopy b { font-size: .88em; }
          .brandCopy small { font-size: .61em; }
          .accessButton { width: 46px; height: 46px; justify-content: center; padding: 0; }
          .accessButton span { display: none; }
          .hero { padding: 25px 18px; }
          .hero h1 { font-size: clamp(2em, 11vw, 3em); }
          .heroActions { display: grid; }
          .heroActions button { width: 100%; }
          .heroGuide { display: block; padding: 17px; }
          .heroGuide ol { margin-top: 16px; }
          .examCards { grid-template-columns: 1fr; }
          .sectionBlock, .howSection, .recordsPage { padding: 19px 15px; }
          .safetyBanner { padding: 18px; }
          .safetyIcon { width: 47px; height: 47px; flex-basis: 47px; }
          .pageTools { align-items: flex-start; flex-direction: column; }
          .examHeader { align-items: flex-start; gap: 13px; padding: 17px; }
          .examHeaderIcon { width: 59px; height: 59px; flex-basis: 59px; border-radius: 18px; }
          .examHeaderIcon svg { width: 29px; height: 29px; }
          .examHeader p { font-size: .73em; }
          .stepper { overflow-x: auto; grid-template-columns: repeat(4, minmax(115px, 1fr)); padding-bottom: 4px; scrollbar-width: thin; }
          .stepper::before { display: none; }
          .taskPanel { padding: 16px; }
          .uploadArea { min-height: 285px; padding: 18px; }
          .uploadActions { width: 100%; display: grid; }
          .uploadActions button { width: 100%; }
          .previewBar { align-items: stretch; flex-direction: column; }
          .previewActions { display: grid; grid-template-columns: 1fr; }
          .previewActions button { justify-content: center; }
          .timelineToggle { grid-template-columns: 44px minmax(0, 1fr) 18px; }
          .optionalLabel { grid-column: 2; justify-self: start; }
          .timelineToggle > svg { grid-column: 3; grid-row: 1; }
          .timelineHeader { align-items: stretch; flex-direction: column; }
          .timelineHeader button { justify-content: center; }
          .timelineGrid { grid-template-columns: 1fr; }
          .qualityCard { grid-template-columns: 1fr; }
          .qualityScore { min-height: 88px; }
          .resultSummary { grid-template-columns: 1fr; }
          .resultCard footer { grid-template-columns: 1fr; }
          .reportGrid { grid-template-columns: 1fr; }
          .recordsHeader { align-items: flex-start; flex-direction: column; }
          .recordList article { grid-template-columns: 46px minmax(0, 1fr); }
          .statusBadge { grid-column: 2; justify-self: start; }
          .recordList article > button { grid-column: 1 / -1; }
          .cameraModal, .savedReportModal { border-radius: 20px; }
        }

        @media (max-width: 390px) {
          .brandCopy small { display: none; }
          .hero { padding-inline: 15px; }
          .hero h1 { font-size: 1.9em; }
          .trustRow { display: grid; }
          .sectionHeading h2, .recordsHeader h1 { font-size: 1.75em; }
          .safetyBanner { flex-direction: column; }
          .examHeader { display: grid; }
          .qualityItems { grid-template-columns: 1fr; }
        }


        /* ===== النسخة المتجاوبة الموحّدة ===== */
        .lab {
          --page-radius: 22px;
          --card-radius: 18px;
          --control-radius: 13px;
          padding: clamp(8px, 1.4vw, 16px);
          overflow-x: clip;
          font-size: 16px;
        }
        .lab.largeText { font-size: 18px; }
        .lab :where(h1, h2, h3, p, small, b, strong, span, label, button) { overflow-wrap: anywhere; }
        .lab button { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
        .appShell { width: min(100%, 1180px); }

        .topbar {
          top: 8px;
          grid-template-columns: minmax(190px, 1fr) auto auto;
          gap: 10px;
          min-height: 68px;
          padding: 8px 10px;
          border-radius: var(--page-radius);
        }
        .brand { gap: 10px; }
        .brandMark {
          width: 48px;
          height: 48px;
          flex-basis: 48px;
          border-radius: 15px;
        }
        .brandMark svg { width: 26px; height: 26px; }
        .brandCopy b { font-size: .94em; }
        .brandCopy small { font-size: .67em; }
        .appNav { border-radius: 14px; }
        .appNav button {
          min-height: 43px;
          padding: 8px 13px;
          border-radius: 11px;
          font-size: .75em;
        }
        .accessButton {
          min-height: 43px;
          padding: 8px 12px;
          border-radius: 12px;
          white-space: nowrap;
          font-size: .74em;
        }

        .hero,
        .sectionBlock,
        .howSection,
        .recordsPage,
        .examHeader,
        .taskPanel,
        .helpPanel {
          border-radius: var(--page-radius);
        }
        .hero {
          grid-template-columns: minmax(0, 1.3fr) minmax(280px, .72fr);
          gap: 18px;
          margin-top: 16px;
          padding: clamp(24px, 3.6vw, 40px);
        }
        .hero h1 {
          max-width: 690px;
          font-size: clamp(2.05em, 4.2vw, 3.25em);
          line-height: 1.24;
        }
        .heroCopy > p {
          max-width: 680px;
          margin-top: 13px;
          font-size: .96em;
          line-height: 1.85;
        }
        .heroActions { margin-top: 19px; }
        .trustRow { margin-top: 17px; }
        .heroGuide { padding: 18px; border-radius: var(--card-radius); }

        .sectionBlock,
        .howSection,
        .recordsPage {
          margin-top: 16px;
          padding: clamp(20px, 3vw, 30px);
        }
        .sectionHeading { margin-bottom: 17px; }
        .sectionHeading h2,
        .recordsHeader h1 { font-size: clamp(1.65em, 2.5vw, 2.2em); }

        .examCards { gap: 13px; }
        .examCard {
          min-height: 100%;
          padding: 19px;
          border-radius: var(--card-radius);
        }
        .examIcon { width: 56px; height: 56px; border-radius: 16px; }
        .examIcon svg { width: 28px; height: 28px; }
        .examCard h3 { margin-top: 14px; font-size: 1.12em; }
        .examCard > p { font-size: .76em; line-height: 1.8; }
        .examCard > button { min-height: 46px; margin-top: 16px; border-radius: 12px; }

        .howGrid { gap: 11px; }
        .howGrid article { padding: 19px; border-radius: 17px; }
        .safetyBanner { margin-top: 16px; padding: 20px; border-radius: var(--page-radius); }

        .pageTools { margin-top: 15px; }
        .examHeader { margin-top: 10px; padding: 20px; }
        .examHeaderIcon {
          width: 68px;
          height: 68px;
          flex-basis: 68px;
          border-radius: 19px;
        }
        .examHeaderIcon svg { width: 34px; height: 34px; }
        .examHeader h1 { font-size: clamp(1.55em, 2.7vw, 2.15em); }

        .stepper { margin-top: 10px; gap: 7px; }
        .stepper > div { min-height: 64px; border-radius: 14px; }
        .stepper::before { top: 27px; }
        .stepper > div > span { width: 30px; height: 30px; }

        .examLayout {
          grid-template-columns: minmax(0, 1fr) 310px;
          gap: 13px;
          margin-top: 12px;
        }
        .taskPanel { padding: 19px; }
        .helpPanel { top: 91px; padding: 15px; }
        .taskHeading h2 { font-size: 1.05em; }
        .uploadArea {
          min-height: 250px;
          margin-top: 14px;
          padding: 21px;
          border-radius: 18px;
        }
        .uploadIcon { width: 62px; height: 62px; border-radius: 18px; }
        .uploadIcon svg { width: 30px; height: 30px; }
        .previewImageWrap,
        .previewImageWrap img { max-height: 460px; }
        .formSection,
        .actionStage { margin-top: 16px; padding-top: 16px; }
        .field textarea { min-height: 105px; }
        .timelineBox,
        .qualityCard,
        .resultCard { border-radius: 16px; }
        .timelineGrid article > img { height: 170px; }
        .widePrimary { min-height: 50px; }

        .reportGrid { gap: 12px; }
        .reportGrid article { padding: 17px; border-radius: var(--card-radius); }
        .recordList article { padding: 12px; border-radius: 15px; }

        .modalBackdrop {
          padding: max(10px, env(safe-area-inset-top)) max(10px, env(safe-area-inset-right)) max(10px, env(safe-area-inset-bottom)) max(10px, env(safe-area-inset-left));
        }
        .cameraModal,
        .savedReportModal {
          max-height: 94dvh;
          overflow: auto;
          border-radius: var(--page-radius);
        }

        @media (max-width: 1100px) {
          .hero { grid-template-columns: 1fr; }
          .heroGuide {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            gap: 13px 18px;
          }
          .guideTop { padding-bottom: 0; border-bottom: 0; }
          .heroGuide ol {
            grid-column: 1 / -1;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            margin: 0;
          }
          .guideNotice { grid-column: 1 / -1; }
          .examCards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .examLayout { grid-template-columns: 1fr; }
          .helpPanel { position: static; }
        }

        @media (max-width: 860px) {
          .lab { padding: 8px 8px calc(84px + env(safe-area-inset-bottom)); }
          .topbar {
            position: relative;
            top: auto;
            grid-template-columns: minmax(0, 1fr) auto;
          }
          .appNav {
            position: fixed;
            right: max(8px, env(safe-area-inset-right));
            bottom: max(8px, env(safe-area-inset-bottom));
            left: max(8px, env(safe-area-inset-left));
            z-index: 100;
            justify-content: stretch;
            padding: 5px;
            border-color: rgba(255,255,255,.92);
            background: rgba(255,255,255,.96);
            box-shadow: 0 14px 38px rgba(17,60,85,.20);
          }
          .appNav button {
            flex: 1;
            flex-direction: column;
            gap: 1px;
            min-height: 55px;
            padding: 5px;
            font-size: .61em;
          }
          .accessButton { grid-column: 2; }
          .howGrid { grid-template-columns: repeat(3, minmax(280px, 1fr)); overflow-x: auto; }
          .reportGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .recordList article { grid-template-columns: 48px minmax(0, 1fr) auto; }
          .recordList article > button { grid-column: 2 / -1; width: 100%; }
        }

        @media (max-width: 640px) {
          .lab { font-size: 15px; }
          .lab.largeText { font-size: 17px; }
          .topbar { padding: 7px; border-radius: 17px; }
          .brandMark { width: 44px; height: 44px; flex-basis: 44px; border-radius: 13px; }
          .brandMark svg { width: 24px; height: 24px; }
          .brandCopy b { font-size: .86em; }
          .brandCopy small { font-size: .59em; }
          .accessButton { min-width: 44px; min-height: 44px; justify-content: center; padding: 0 10px; }

          .hero,
          .sectionBlock,
          .howSection,
          .recordsPage,
          .examHeader,
          .taskPanel,
          .helpPanel { border-radius: 18px; }
          .hero { padding: 22px 16px; }
          .hero h1 { font-size: clamp(1.85em, 9vw, 2.45em); }
          .heroActions { display: grid; }
          .heroActions button { width: 100%; }
          .heroGuide { display: block; padding: 15px; }
          .heroGuide ol { grid-template-columns: 1fr; margin-top: 14px; }
          .sectionBlock,
          .howSection,
          .recordsPage { padding: 18px 14px; }
          .examCards { grid-template-columns: repeat(3, minmax(320px, 1fr)); overflow-x: auto; }
          .reportGrid { grid-template-columns: 1fr; }
          .examCard { padding: 17px; }
          .safetyBanner { align-items: flex-start; padding: 16px; }

          .pageTools { align-items: stretch; flex-direction: column; }
          .backButton { justify-content: center; }
          .examHeader { align-items: flex-start; gap: 12px; padding: 16px; }
          .examHeaderIcon { width: 56px; height: 56px; flex-basis: 56px; border-radius: 16px; }
          .examHeaderIcon svg { width: 28px; height: 28px; }
          .stepper { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .stepper::before { display: none; }
          .stepper > div { min-width: 0; }
          .taskPanel { padding: 14px; }
          .field textarea,
          .timelineGrid input { font-size: 16px; }
          .lab.largeText .field textarea,
          .lab.largeText .timelineGrid input { font-size: 18px; }
          .taskHeading { gap: 9px; }
          .uploadArea { min-height: 225px; padding: 16px; }
          .uploadActions { width: 100%; display: grid; }
          .uploadActions button { width: 100%; }
          .previewBar { align-items: stretch; flex-direction: column; }
          .previewActions { display: grid; grid-template-columns: 1fr; }
          .previewActions button { justify-content: center; }
          .timelineToggle { grid-template-columns: 42px minmax(0, 1fr) 18px; }
          .optionalLabel { grid-column: 2; justify-self: start; }
          .timelineToggle > svg { grid-column: 3; grid-row: 1; }
          .timelineHeader { align-items: stretch; flex-direction: column; }
          .timelineHeader button { justify-content: center; }
          .timelineGrid,
          .qualityCard,
          .resultSummary,
          .resultCard footer { grid-template-columns: 1fr; }
          .recordsHeader { align-items: flex-start; flex-direction: column; }
          .recordList article { grid-template-columns: 44px minmax(0, 1fr); }
          .statusBadge { grid-column: 2; justify-self: start; }
          .recordList article > button { grid-column: 1 / -1; }
        }

        @media (max-width: 430px) {
          .brandCopy small,
          .accessButton span { display: none; }
          .accessButton { width: 44px; padding: 0; }
          .hero { padding-inline: 14px; }
          .hero h1 { font-size: 1.85em; }
          .trustRow { display: grid; }
          .sectionHeading h2,
          .recordsHeader h1 { font-size: 1.62em; }
          .safetyBanner { flex-direction: column; }
          .examHeader { display: grid; }
          .qualityItems { grid-template-columns: 1fr; }
        }

        @media (max-width: 350px) {
          .brandCopy b { font-size: .78em; }
          .hero h1 { font-size: 1.68em; }
          .stepper { grid-template-columns: 1fr; }
        }


        /* ===== الشريط العلوي الموحّد للجوال واللابتوب ===== */
        @media (max-width: 860px) {
          .lab {
            padding: 8px;
            padding-top: max(8px, env(safe-area-inset-top));
            padding-right: max(8px, env(safe-area-inset-right));
            padding-left: max(8px, env(safe-area-inset-left));
            padding-bottom: max(8px, env(safe-area-inset-bottom));
          }

          .topbar {
            position: sticky;
            top: max(6px, env(safe-area-inset-top));
            z-index: 100;
            grid-template-columns: minmax(84px, .82fr) minmax(0, 1.45fr) 42px;
            align-items: center;
            gap: 6px;
            width: 100%;
            min-height: 58px;
            padding: 6px;
            overflow: hidden;
            border-radius: 18px;
          }

          .brand {
            min-width: 0;
            gap: 6px;
            padding: 0;
            overflow: hidden;
          }
          .brandMark {
            width: 38px;
            height: 38px;
            flex: 0 0 38px;
            border-radius: 12px;
          }
          .brandMark svg { width: 21px; height: 21px; }
          .brandCopy {
            min-width: 0;
            overflow: hidden;
          }
          .brandCopy b {
            overflow: hidden;
            font-size: .72em;
            line-height: 1.25;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .brandCopy small { display: none; }

          .appNav {
            position: static;
            inset: auto;
            z-index: auto;
            width: 100%;
            min-width: 0;
            display: flex;
            justify-content: stretch;
            gap: 2px;
            padding: 3px;
            overflow: hidden;
            border-color: var(--line);
            border-radius: 13px;
            background: #f5fafc;
            box-shadow: none;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
          .appNav button {
            flex: 1 1 0;
            min-width: 0;
            min-height: 40px;
            flex-direction: row;
            gap: 3px;
            padding: 4px 3px;
            overflow: hidden;
            border-radius: 10px;
            font-size: .60em;
            white-space: nowrap;
          }
          .appNav button span {
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .appNav svg {
            width: 15px;
            height: 15px;
            flex: 0 0 15px;
          }

          .accessButton {
            grid-column: auto;
            justify-self: stretch;
            width: 42px;
            min-width: 42px;
            height: 42px;
            min-height: 42px;
            justify-content: center;
            gap: 0;
            padding: 0;
            border-radius: 12px;
          }
          .accessButton span { display: none; }
          .accessButton svg { width: 19px; height: 19px; }
        }

        @media (max-width: 430px) {
          .topbar {
            grid-template-columns: minmax(108px, .85fr) minmax(0, 1.4fr) 40px;
            gap: 4px;
            min-height: 54px;
            padding: 5px;
            border-radius: 16px;
          }
          .brand { gap: 4px; }
          .brandMark {
            width: 34px;
            height: 34px;
            flex-basis: 34px;
            border-radius: 10px;
          }
          .brandMark svg { width: 19px; height: 19px; }
          .brandCopy b { font-size: .64em; }
          .appNav { padding: 2px; gap: 1px; border-radius: 11px; }
          .appNav button {
            min-height: 38px;
            gap: 2px;
            padding: 3px 2px;
            border-radius: 9px;
            font-size: .56em;
          }
          .appNav svg {
            width: 14px;
            height: 14px;
            flex-basis: 14px;
          }
          .accessButton {
            width: 40px;
            min-width: 40px;
            height: 40px;
            min-height: 40px;
            border-radius: 11px;
          }
        }

        @media (max-width: 350px) {
          .lab {
            padding-right: max(5px, env(safe-area-inset-right));
            padding-left: max(5px, env(safe-area-inset-left));
          }
          .topbar {
            grid-template-columns: 34px minmax(0, 1fr) 38px;
            gap: 4px;
            padding: 4px;
          }
          .brandCopy { display: none; }
          .brandMark {
            width: 34px;
            height: 34px;
            flex-basis: 34px;
          }
          .appNav button { font-size: .54em; }
          .accessButton {
            width: 38px;
            min-width: 38px;
            height: 38px;
            min-height: 38px;
          }
        }


        /* مساحة آمنة للشريط السفلي الخارجي المشترك */
        .lab {
          padding-bottom: calc(155px + env(safe-area-inset-bottom)) !important;
        }

        @media (max-width: 860px) {
          .lab {
            padding-bottom: calc(135px + env(safe-area-inset-bottom)) !important;
          }
        }


        /* ===== عرض بطاقات الفحوصات وخطوات الاستخدام ثابتة على الجوال ===== */
        @media (max-width: 860px) {
          .examCards,
          .howGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            overflow: visible;
          }

          .examCards { gap: 8px; }
          .examCard {
            min-width: 0;
            padding: 12px;
          }
          .examIcon {
            width: 44px;
            height: 44px;
            border-radius: 13px;
          }
          .examIcon svg { width: 22px; height: 22px; }
          .examCode { font-size: .58em; }
          .examCard h3 {
            margin-top: 10px;
            font-size: .88em;
          }
          .examCard > p {
            font-size: .64em;
            line-height: 1.65;
          }
          .examQuickList { gap: 5px; margin-top: 10px; }
          .examQuickList span { gap: 4px; font-size: .58em; }
          .examQuickList svg {
            width: 12px;
            height: 12px;
            flex-basis: 12px;
          }
          .examCard > button {
            min-height: 40px;
            margin-top: 12px;
            padding: 8px;
            font-size: .62em;
          }
          .examCard > button svg { width: 14px; height: 14px; }

          .howGrid { gap: 8px; }
          .howGrid article {
            min-width: 0;
            padding: 13px;
          }
          .howGrid article > span {
            top: 9px;
            left: 10px;
            font-size: 1.25em;
          }
          .howGrid svg { width: 25px; height: 25px; }
          .howGrid h3 { margin-top: 10px; font-size: .82em; }
          .howGrid p { margin-top: 5px; font-size: .62em; line-height: 1.65; }
        }

        @media (max-width: 640px) {
          .examCards,
          .howGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            overflow: visible;
          }

          .examCards { gap: 5px; }
          .examCard {
            padding: 8px;
            border-radius: 13px;
          }
          .examCardTop { gap: 4px; }
          .examIcon {
            width: 34px;
            height: 34px;
            border-radius: 10px;
          }
          .examIcon svg { width: 18px; height: 18px; }
          .examCode { font-size: .46em; }
          .examCard h3 {
            margin-top: 7px;
            font-size: .68em;
            line-height: 1.35;
          }
          .examCard > p {
            margin-top: 5px;
            font-size: .50em;
            line-height: 1.55;
          }
          .examQuickList { gap: 3px; margin-top: 7px; }
          .examQuickList span {
            gap: 3px;
            font-size: .46em;
            line-height: 1.5;
          }
          .examQuickList svg {
            width: 9px;
            height: 9px;
            flex-basis: 9px;
          }
          .examCard > button {
            min-height: 34px;
            margin-top: 8px;
            padding: 5px 6px;
            border-radius: 9px;
            font-size: .49em;
          }
          .examCard > button svg { width: 11px; height: 11px; }

          .howGrid { gap: 5px; }
          .howGrid article {
            padding: 9px;
            border-radius: 12px;
          }
          .howGrid article > span {
            top: 6px;
            left: 7px;
            font-size: .95em;
          }
          .howGrid svg { width: 20px; height: 20px; }
          .howGrid h3 {
            margin-top: 7px;
            font-size: .64em;
            line-height: 1.4;
          }
          .howGrid p {
            margin-top: 4px;
            font-size: .49em;
            line-height: 1.55;
          }
        }



        /* ===== تحسين بطاقة الدليل السريع على الجوال فقط ===== */
        @media (max-width: 640px) {
          .heroGuide {
            display: block;
            padding: 14px;
            border-radius: 17px;
          }

          .guideTop {
            display: flex;
            align-items: center;
            gap: 9px;
            padding: 0 0 11px;
            border-bottom: 1px solid var(--line);
          }
          .guideTop > span {
            width: 42px;
            height: 42px;
            flex: 0 0 42px;
            border-radius: 13px;
          }
          .guideTop svg { width: 22px; height: 22px; }
          .guideTop small { font-size: .58em; }
          .guideTop b { font-size: .82em; }

          .heroGuide ol {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 6px;
            margin: 11px 0 10px;
          }
          .heroGuide li {
            min-width: 0;
            min-height: 104px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            gap: 6px;
            padding: 9px 5px;
            border: 1px solid #dceaf1;
            border-radius: 12px;
            background: #f8fcfe;
            text-align: center;
          }
          .heroGuide li > b {
            width: 31px;
            height: 31px;
            flex: 0 0 31px;
            border-radius: 10px;
            font-size: .66em;
          }
          .heroGuide li > span { min-width: 0; }
          .heroGuide li strong {
            font-size: .64em;
            line-height: 1.45;
          }
          .heroGuide li small {
            margin-top: 2px;
            font-size: .52em;
            line-height: 1.45;
          }

          .guideNotice {
            width: 100%;
            margin: 0;
            padding: 9px 10px;
            border-radius: 11px;
            font-size: .55em;
            line-height: 1.6;
          }
          .guideNotice svg {
            width: 16px;
            height: 16px;
            flex-basis: 16px;
          }
        }

        @media (max-width: 390px) {
          .heroGuide { padding: 12px; }
          .heroGuide ol { gap: 4px; }
          .heroGuide li {
            min-height: 99px;
            padding: 8px 3px;
          }
          .heroGuide li strong { font-size: .60em; }
          .heroGuide li small { font-size: .48em; }
        }


        /* ===== واجهة الفحوصات والمختبرات العلوية ===== */
        .labsBanner {
          position: relative;
          min-height: 138px;
          display: grid;
          grid-template-columns: minmax(0,1fr) 280px;
          align-items: center;
          gap: 18px;
          margin-top: 14px;
          padding: 18px 26px;
          overflow: visible;
          border: 1px solid rgba(20,121,213,.10);
          border-radius: 20px;
          background:
            radial-gradient(circle at 82% 30%, rgba(7,152,165,.10), transparent 18rem),
            linear-gradient(135deg,#fff 0%,#f7fbfd 58%,#edf7fb 100%);
          box-shadow: 0 14px 42px rgba(24,80,112,.08);
        }
        .bannerMenu {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 20;
        }
        .bannerMenuButton {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          padding: 0;
          border: 1px solid rgba(255,255,255,.58);
          border-radius: 50%;
          color: #1479d5;
          background: linear-gradient(145deg,rgba(255,255,255,.62),rgba(164,226,239,.30));
          box-shadow: inset 0 1px 1px rgba(255,255,255,.85),0 7px 18px rgba(7,152,165,.13);
          backdrop-filter: blur(10px) saturate(145%);
          -webkit-backdrop-filter: blur(10px) saturate(145%);
        }
        .bannerMenuButton svg { width: 18px; height: 18px; }
        .bannerMenuList {
          position: absolute;
          top: 42px;
          left: 0;
          display: grid;
          gap: 5px;
          padding: 6px;
          border: 1px solid rgba(20,121,213,.12);
          border-radius: 13px;
          background: rgba(255,255,255,.97);
          box-shadow: 0 15px 34px rgba(24,80,112,.16);
        }
        .bannerMenuList button {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          padding: 0;
          border: 0;
          border-radius: 10px;
          color: #668395;
          background: transparent;
        }
        .bannerMenuList button:hover,
        .bannerMenuList button.active {
          color: #fff;
          background: linear-gradient(145deg,var(--blue),var(--cyan));
        }
        .bannerMenuList svg { width: 18px; height: 18px; }
        .labsBannerCopy { position: relative; z-index: 2; }
        .labsBannerCopy span {
          display: inline-block;
          color: var(--cyan);
          font-size: .68em;
          font-weight: 900;
          letter-spacing: .01em;
        }
        .labsBannerCopy h1 {
          margin: 3px 0 2px;
          color: var(--title);
          font-size: clamp(1.55em,2.7vw,2.25em);
          line-height: 1.28;
          font-weight: 950;
        }
        .labsBannerCopy p {
          max-width: 650px;
          margin: 0;
          color: var(--muted);
          font-size: .78em;
          line-height: 1.7;
        }
        .labArt {
          width: 100%;
          height: 118px;
          overflow: visible;
        }
        .labArt .orb circle {
          fill: rgba(20,121,213,.035);
          stroke: rgba(20,121,213,.12);
          stroke-width: 1.5;
        }
        .labArt .microscope,
        .labArt .tube,
        .labArt .scan,
        .labArt .spark {
          fill: none;
          stroke: url(#labG);
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .labArt .tube circle {
          fill: rgba(7,152,165,.16);
          stroke: none;
        }
        .labArt .spark { stroke-width: 3; }

        @media (max-width: 640px) {
          .labsBanner {
            min-height: 118px;
            grid-template-columns: minmax(0,1fr) 112px;
            gap: 8px;
            padding: 14px 14px;
            border-radius: 16px;
          }
          .labsBannerCopy span { font-size: .58em; }
          .labsBannerCopy h1 {
            margin-top: 2px;
            font-size: 1.25em;
          }
          .labsBannerCopy p {
            font-size: .66em;
            line-height: 1.55;
          }
          .labArt {
            height: 92px;
            transform: translateX(-2px);
          }
        }

        @media (max-width: 390px) {
          .labsBanner {
            min-height: 108px;
            grid-template-columns: minmax(0,1fr) 92px;
            padding: 12px;
          }
          .labsBannerCopy h1 { font-size: 1.12em; }
          .labsBannerCopy p { font-size: .62em; }
          .labArt { height: 78px; }
        }

        @media (max-width: 860px) {
          .topbar { grid-template-columns: 1fr !important; }
          .quickMenuWrap { margin-top: 6px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            scroll-behavior: auto !important;
            transition-duration: .001ms !important;
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
      </main>
    </>
  );
}

function EmptyRecords({ Icon, title, text, onStart }) {
  return (
    <div className="emptyRecords">
      <span><Icon /></span>
      <h2>{title}</h2>
      <p>{text}</p>
      <button className="primaryButton" onClick={onStart}>ابدأ أول فحص <Arrow /></button>
    </div>
  );
}
