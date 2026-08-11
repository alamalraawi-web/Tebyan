import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronLeft,
  Clock3,
  FileHeart,
  HeartPulse,
  LayoutDashboard,
  Menu,
  MessageCircleMore,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

const navItems = [
  { label: "لوحة التحكم", icon: LayoutDashboard, active: true },
  { label: "الاستشارات", icon: MessageCircleMore, badge: 6 },
  { label: "المرضى", icon: UsersRound },
  { label: "المواعيد", icon: CalendarDays },
  { label: "دليل الأمراض", icon: FileHeart },
  { label: "الإشعارات", icon: Bell, badge: 3 },
  { label: "الإعدادات", icon: Settings },
];

const consultations = [
  {
    name: "سارة أحمد",
    initials: "س أ",
    age: "29 سنة",
    topic: "طفح جلدي وحكة مستمرة",
    time: "منذ 8 دقائق",
    status: "عاجلة",
    statusClass: "urgent",
  },
  {
    name: "محمد علي",
    initials: "م ع",
    age: "41 سنة",
    topic: "متابعة نتائج التحاليل",
    time: "منذ 22 دقيقة",
    status: "جديدة",
    statusClass: "new",
  },
  {
    name: "ريم خالد",
    initials: "ر خ",
    age: "35 سنة",
    topic: "استشارة متابعة العلاج",
    time: "منذ 45 دقيقة",
    status: "متابعة",
    statusClass: "followup",
  },
];

const appointments = [
  { time: "10:30", period: "ص", name: "أحمد عبدالله", type: "استشارة فيديو", tone: "blue" },
  { time: "12:00", period: "م", name: "ليان صالح", type: "متابعة علاج", tone: "green" },
  { time: "02:30", period: "م", name: "خالد حسن", type: "استشارة نصية", tone: "violet" },
];

function getProfile() {
  try {
    return JSON.parse(localStorage.getItem("tebyan-profile") || "null") || {};
  } catch {
    return {};
  }
}

function DoctorMark() {
  return (
    <span className="doctor-mark" aria-hidden="true">
      <HeartPulse size={25} strokeWidth={2.4} />
    </span>
  );
}

export default function DoctorDashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [availability, setAvailability] = useState(true);
  const profile = useMemo(getProfile, []);

  const doctorName = profile.fullName?.trim() || "أحمد محمد";
  const specialty = profile.specialty?.trim() || "الطب العام";
  const firstName = doctorName.split(" ")[0];

  const logout = () => {
    const user = getProfile();
    localStorage.setItem("tebyan-user", JSON.stringify({ ...user, loggedIn: false }));
    navigate("/login", { replace: true });
  };

  return (
    <div className="doctor-dashboard" dir="rtl">
      <div className={`doctor-sidebar-overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />

      <aside className={`doctor-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="doctor-brand">
          <DoctorMark />
          <div>
            <strong>تبيان</strong>
            <span>بوابة الطبيب</span>
          </div>
          <button className="doctor-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="إغلاق القائمة">
            <X size={20} />
          </button>
        </div>

        <nav className="doctor-nav" aria-label="قائمة الطبيب">
          <p>مساحة العمل</p>
          {navItems.map(({ label, icon: Icon, active, badge }) => (
            <button key={label} className={active ? "active" : ""} type="button">
              <Icon size={20} strokeWidth={2} />
              <span>{label}</span>
              {badge ? <b>{badge}</b> : null}
            </button>
          ))}
        </nav>

        <div className="doctor-help-card">
          <span><ShieldCheck size={20} /></span>
          <strong>الدعم الطبي</strong>
          <p>فريق تبيان جاهز لمساعدتك في أي وقت.</p>
          <button type="button">تواصل معنا</button>
        </div>

        <div className="doctor-profile-mini">
          <div className="doctor-avatar">{firstName.charAt(0)}</div>
          <div>
            <strong>د. {doctorName}</strong>
            <span>{specialty}</span>
          </div>
          <button type="button" onClick={logout} title="تسجيل الخروج"><MoreHorizontal size={19} /></button>
        </div>
      </aside>

      <main className="doctor-main">
        <header className="doctor-topbar">
          <button className="doctor-menu-button" onClick={() => setSidebarOpen(true)} aria-label="فتح القائمة">
            <Menu size={22} />
          </button>

          <div className="doctor-search">
            <Search size={19} />
            <input aria-label="بحث" placeholder="ابحث عن مريض أو استشارة..." />
            <kbd>⌘ K</kbd>
          </div>

          <div className="doctor-top-actions">
            <button className="icon-button" aria-label="الإشعارات">
              <Bell size={20} />
              <i />
            </button>
            <button className="doctor-user-chip" type="button">
              <span>{firstName.charAt(0)}</span>
              <div><strong>د. {firstName}</strong><small>{specialty}</small></div>
              <ChevronLeft size={16} />
            </button>
          </div>
        </header>

        <div className="doctor-content">
          <section className="doctor-hero">
            <div className="doctor-hero-copy">
              <span className="today-label"><Activity size={16} /> الاثنين، 3 أغسطس</span>
              <h1>صباح الخير، د. {firstName} 👋</h1>
              <p>إليك ملخص يومك الطبي، لديك <strong>6 استشارات جديدة</strong> و3 مواعيد قادمة.</p>
            </div>

            <div className="availability-card">
              <div className={`availability-dot ${availability ? "online" : "offline"}`} />
              <div>
                <span>حالة الاستقبال</span>
                <strong>{availability ? "متاح للاستشارات" : "غير متاح حاليًا"}</strong>
              </div>
              <button
                type="button"
                className={availability ? "on" : ""}
                onClick={() => setAvailability((value) => !value)}
                aria-label="تغيير حالة التوفر"
              >
                <i />
              </button>
            </div>
          </section>

          <section className="doctor-stats" aria-label="إحصائيات اليوم">
            <article className="stat-card primary">
              <div className="stat-icon"><MessageCircleMore size={22} /></div>
              <div><span>استشارات جديدة</span><strong>06</strong><small><b>+2</b> منذ الأمس</small></div>
              <button type="button"><ChevronLeft size={18} /></button>
            </article>
            <article className="stat-card warning">
              <div className="stat-icon"><Clock3 size={22} /></div>
              <div><span>قائمة الانتظار</span><strong>04</strong><small>متوسط الانتظار 12 د</small></div>
              <button type="button"><ChevronLeft size={18} /></button>
            </article>
            <article className="stat-card success">
              <div className="stat-icon"><CalendarDays size={22} /></div>
              <div><span>مواعيد اليوم</span><strong>03</strong><small>الموعد القادم 10:30</small></div>
              <button type="button"><ChevronLeft size={18} /></button>
            </article>
            <article className="stat-card violet">
              <div className="stat-icon"><Stethoscope size={22} /></div>
              <div><span>حالات مكتملة</span><strong>12</strong><small><b>85%</b> معدل الإنجاز</small></div>
              <button type="button"><ChevronLeft size={18} /></button>
            </article>
          </section>

          <section className="doctor-grid">
            <article className="dashboard-panel consultations-panel">
              <div className="panel-heading">
                <div><h2>الاستشارات ذات الأولوية</h2><p>الحالات التي تحتاج إلى انتباهك الآن</p></div>
                <button type="button">عرض الكل <ChevronLeft size={16} /></button>
              </div>

              <div className="consultation-list">
                {consultations.map((item) => (
                  <button className="consultation-row" type="button" key={item.name}>
                    <span className="patient-avatar">{item.initials}</span>
                    <span className="patient-info"><strong>{item.name}</strong><small>{item.age} • {item.topic}</small></span>
                    <span className="consultation-time"><small>{item.time}</small><b className={item.statusClass}>{item.status}</b></span>
                    <ChevronLeft className="row-arrow" size={18} />
                  </button>
                ))}
              </div>

              <button className="start-consultation" type="button">
                <span><MessageCircleMore size={20} /></span>
                <div><strong>بدء الاستشارة التالية</strong><small>المريض التالي ينتظر منذ 8 دقائق</small></div>
                <ChevronLeft size={19} />
              </button>
            </article>

            <article className="dashboard-panel appointments-panel">
              <div className="panel-heading compact">
                <div><h2>مواعيد اليوم</h2><p>الاثنين، 3 أغسطس</p></div>
                <button className="round-action" type="button"><CalendarDays size={18} /></button>
              </div>

              <div className="timeline">
                {appointments.map((appointment) => (
                  <div className="timeline-row" key={`${appointment.time}-${appointment.name}`}>
                    <div className="timeline-time"><strong>{appointment.time}</strong><span>{appointment.period}</span></div>
                    <i className={appointment.tone} />
                    <div className="appointment-info"><strong>{appointment.name}</strong><span>{appointment.type}</span></div>
                    <button type="button"><MoreHorizontal size={18} /></button>
                  </div>
                ))}
              </div>

              <button className="calendar-link" type="button">فتح جدول المواعيد <ChevronLeft size={16} /></button>
            </article>
          </section>

          <section className="doctor-bottom-grid">
            <article className="dashboard-panel quick-actions">
              <div className="panel-heading compact"><div><h2>إجراءات سريعة</h2><p>وصول أسرع لمهامك اليومية</p></div></div>
              <div className="quick-grid">
                <button type="button"><span><UserRound size={21} /></span><strong>إضافة مريض</strong></button>
                <button type="button"><span><CalendarDays size={21} /></span><strong>موعد جديد</strong></button>
                <button type="button"><span><FileHeart size={21} /></span><strong>إضافة حالة</strong></button>
                <button type="button"><span><MessageCircleMore size={21} /></span><strong>رسالة جديدة</strong></button>
              </div>
            </article>

            <article className="dashboard-panel daily-progress">
              <div className="progress-ring"><span>75%</span></div>
              <div><span>تقدمك اليوم</span><h3>أداء ممتاز يا دكتور!</h3><p>أكملت 12 من أصل 16 مهمة مجدولة اليوم.</p></div>
            </article>
          </section>
        </div>
      </main>

      <style>{`
        :root{--doctor-blue:#0878d1;--doctor-deep:#075ba9;--doctor-cyan:#13b9be;--doctor-text:#123047;--doctor-muted:#7890a1;--doctor-border:#e5eef4;--doctor-bg:#f5f9fc}
        *{box-sizing:border-box}.doctor-dashboard{min-height:100vh;background:radial-gradient(circle at 82% 0%,rgba(12,182,191,.09),transparent 27%),var(--doctor-bg);color:var(--doctor-text);font-family:inherit}.doctor-dashboard button,.doctor-dashboard input{font:inherit}.doctor-sidebar{position:fixed;top:0;right:0;z-index:40;width:270px;height:100vh;padding:24px 18px 18px;background:rgba(255,255,255,.97);border-left:1px solid var(--doctor-border);display:flex;flex-direction:column;box-shadow:-10px 0 40px rgba(21,70,103,.04)}
        .doctor-brand{height:56px;display:flex;align-items:center;gap:11px;padding:0 8px 18px;border-bottom:1px solid #edf3f7}.doctor-mark{width:43px;height:43px;border-radius:15px;display:grid;place-items:center;color:#fff;background:linear-gradient(145deg,var(--doctor-cyan),var(--doctor-blue));box-shadow:0 10px 22px rgba(8,120,209,.22)}.doctor-brand div{display:grid;gap:2px}.doctor-brand strong{font-size:20px;color:var(--doctor-deep);font-weight:900}.doctor-brand span{font-size:11px;color:#78a0b4;font-weight:700}.doctor-sidebar-close{display:none;margin-right:auto;border:0;background:#eef6fa;width:34px;height:34px;border-radius:10px;color:#426b83}
        .doctor-nav{display:grid;gap:5px;padding:24px 0 14px}.doctor-nav p{font-size:11px;color:#9aafbd;font-weight:900;padding:0 13px;margin:0 0 7px}.doctor-nav button{position:relative;width:100%;height:47px;border:0;border-radius:14px;background:transparent;color:#557083;display:flex;align-items:center;gap:13px;padding:0 14px;font-weight:800;cursor:pointer;transition:.2s}.doctor-nav button:hover{background:#f1f8fb;color:var(--doctor-deep)}.doctor-nav button.active{background:linear-gradient(90deg,rgba(8,120,209,.12),rgba(19,185,190,.07));color:var(--doctor-blue)}.doctor-nav button.active:before{content:"";position:absolute;right:-18px;width:4px;height:25px;border-radius:5px 0 0 5px;background:linear-gradient(var(--doctor-cyan),var(--doctor-blue))}.doctor-nav button b{margin-right:auto;min-width:23px;height:21px;border-radius:8px;background:#e9f5fb;color:#0878d1;display:grid;place-items:center;font-size:11px}
        .doctor-help-card{margin-top:auto;padding:16px;border:1px solid #dceef2;border-radius:19px;background:linear-gradient(145deg,#f5fcfd,#eef8ff)}.doctor-help-card>span{width:36px;height:36px;border-radius:12px;background:#fff;color:#0aa9b3;display:grid;place-items:center;box-shadow:0 7px 16px rgba(31,104,132,.08)}.doctor-help-card strong{display:block;margin-top:10px;font-size:13px}.doctor-help-card p{font-size:10px;line-height:1.7;color:#7791a2;margin:4px 0 10px}.doctor-help-card button{border:0;background:transparent;color:#0878d1;font-size:11px;font-weight:900;padding:0;cursor:pointer}.doctor-profile-mini{display:flex;align-items:center;gap:9px;padding:16px 4px 0;margin-top:12px;border-top:1px solid #edf3f7}.doctor-avatar,.doctor-user-chip>span{width:38px;height:38px;border-radius:13px;background:linear-gradient(145deg,#d9f4f4,#dceeff);color:#0878d1;display:grid;place-items:center;font-weight:900}.doctor-profile-mini>div:nth-child(2){min-width:0;display:grid;gap:2px}.doctor-profile-mini strong{font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.doctor-profile-mini span{font-size:9px;color:#8aa0ae}.doctor-profile-mini button{margin-right:auto;border:0;background:transparent;color:#8ca2b0;cursor:pointer}
        .doctor-main{min-height:100vh;margin-right:270px}.doctor-topbar{height:74px;padding:0 34px;display:flex;align-items:center;justify-content:space-between;gap:22px;background:rgba(255,255,255,.88);border-bottom:1px solid var(--doctor-border);backdrop-filter:blur(15px);position:sticky;top:0;z-index:20}.doctor-search{height:42px;width:min(430px,45vw);display:flex;align-items:center;gap:10px;padding:0 13px;border:1px solid #dfeaf0;border-radius:13px;background:#f8fbfd;color:#8ca3b2}.doctor-search input{min-width:0;flex:1;border:0;outline:0;background:transparent;color:#23465d;font-size:12px}.doctor-search input::placeholder{color:#9bb0bd}.doctor-search kbd{font-size:9px;border:1px solid #d8e6ed;border-radius:6px;background:#fff;padding:3px 6px;color:#8ba0ad}.doctor-menu-button{display:none}.doctor-top-actions{display:flex;align-items:center;gap:10px}.icon-button{position:relative;width:40px;height:40px;border:1px solid #e0eaf0;border-radius:13px;background:#fff;color:#567387;display:grid;place-items:center;cursor:pointer}.icon-button i{position:absolute;top:8px;right:9px;width:7px;height:7px;border-radius:50%;background:#ef5261;border:2px solid #fff}.doctor-user-chip{display:flex;align-items:center;gap:9px;border:0;background:transparent;color:#36566b;cursor:pointer}.doctor-user-chip>span{width:39px;height:39px}.doctor-user-chip div{display:grid;text-align:right;gap:1px}.doctor-user-chip strong{font-size:11px}.doctor-user-chip small{font-size:9px;color:#8ba1ae}
        .doctor-content{width:min(1220px,calc(100% - 54px));margin:0 auto;padding:32px 0 50px}.doctor-hero{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-bottom:25px}.today-label{display:inline-flex;align-items:center;gap:7px;color:#0a9ca8;font-size:11px;font-weight:900;margin-bottom:7px}.doctor-hero h1{font-size:27px;line-height:1.35;margin:0 0 5px;font-weight:900;letter-spacing:-.4px}.doctor-hero p{font-size:12px;color:#7b92a2;margin:0}.doctor-hero p strong{color:#0878d1}.availability-card{min-width:280px;padding:13px 15px;border:1px solid #dfeaf0;border-radius:17px;background:rgba(255,255,255,.9);display:flex;align-items:center;gap:11px;box-shadow:0 10px 28px rgba(24,77,110,.05)}.availability-dot{width:10px;height:10px;border-radius:50%}.availability-dot.online{background:#31c783;box-shadow:0 0 0 5px rgba(49,199,131,.12)}.availability-dot.offline{background:#a1afba;box-shadow:0 0 0 5px rgba(161,175,186,.12)}.availability-card>div:nth-child(2){display:grid;gap:2px}.availability-card span{font-size:9px;color:#8ca1af}.availability-card strong{font-size:11px}.availability-card button{margin-right:auto;width:42px;height:23px;border:0;border-radius:20px;background:#d9e3e9;padding:3px;cursor:pointer;transition:.2s}.availability-card button i{display:block;width:17px;height:17px;border-radius:50%;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.15);transition:.2s}.availability-card button.on{background:#29c58a}.availability-card button.on i{transform:translateX(-19px)}
        .doctor-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:18px}.stat-card{position:relative;min-height:132px;padding:19px;border:1px solid var(--doctor-border);border-radius:19px;background:#fff;display:flex;gap:13px;box-shadow:0 10px 35px rgba(23,67,94,.045);overflow:hidden}.stat-card:after{content:"";position:absolute;left:-28px;bottom:-38px;width:90px;height:90px;border-radius:50%;background:currentColor;opacity:.04}.stat-icon{width:43px;height:43px;border-radius:14px;display:grid;place-items:center;flex:0 0 auto}.stat-card>div:nth-child(2){display:grid;gap:3px}.stat-card span{font-size:10px;color:#7f95a4;font-weight:800}.stat-card strong{font-size:27px;line-height:1.1;color:#17374d}.stat-card small{font-size:9px;color:#96a9b5}.stat-card small b{color:#22af79}.stat-card>button{position:absolute;left:13px;top:15px;width:29px;height:29px;border:0;border-radius:10px;background:#f6f9fb;color:#8ba0ad;display:grid;place-items:center}.stat-card.primary{color:#0878d1}.stat-card.primary .stat-icon{background:#eaf4fd;color:#0878d1}.stat-card.warning{color:#ef9d2d}.stat-card.warning .stat-icon{background:#fff4e5;color:#ec9623}.stat-card.success{color:#25b67c}.stat-card.success .stat-icon{background:#e9f9f2;color:#25b67c}.stat-card.violet{color:#826edc}.stat-card.violet .stat-icon{background:#f0edfc;color:#826edc}
        .doctor-grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(300px,.75fr);gap:18px;margin-bottom:18px}.dashboard-panel{border:1px solid var(--doctor-border);border-radius:21px;background:#fff;box-shadow:0 10px 35px rgba(23,67,94,.045)}.panel-heading{padding:20px 21px 16px;display:flex;align-items:center;justify-content:space-between;gap:15px}.panel-heading h2{font-size:15px;margin:0 0 3px}.panel-heading p{font-size:9px;color:#8fa4b1;margin:0}.panel-heading>button:not(.round-action){border:0;background:transparent;color:#0878d1;display:flex;align-items:center;gap:4px;font-size:10px;font-weight:900;cursor:pointer}.consultation-list{padding:0 10px}.consultation-row{width:100%;min-height:68px;display:flex;align-items:center;gap:11px;padding:9px 10px;border:0;border-top:1px solid #edf3f6;background:#fff;text-align:right;cursor:pointer;transition:.2s}.consultation-row:hover{background:#f8fbfd;border-radius:13px}.patient-avatar{width:40px;height:40px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(145deg,#ecf7ff,#e6f8f5);color:#0878d1;font-size:11px;font-weight:900}.patient-info{display:grid;gap:4px;min-width:0;flex:1}.patient-info strong{font-size:11px}.patient-info small{font-size:9px;color:#879eac;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.consultation-time{display:grid;justify-items:end;gap:5px}.consultation-time small{font-size:8px;color:#9badb8}.consultation-time b{font-size:8px;padding:4px 8px;border-radius:8px}.consultation-time b.urgent{color:#e64c5d;background:#ffedf0}.consultation-time b.new{color:#0878d1;background:#eaf4fd}.consultation-time b.followup{color:#22a975;background:#e9f9f2}.row-arrow{color:#a2b3bd}.start-consultation{width:calc(100% - 32px);margin:13px 16px 17px;padding:13px;border:0;border-radius:15px;background:linear-gradient(105deg,#0878d1,#0faab9);color:#fff;display:flex;align-items:center;gap:10px;text-align:right;cursor:pointer;box-shadow:0 10px 22px rgba(8,120,209,.17)}.start-consultation>span{width:36px;height:36px;border-radius:11px;background:rgba(255,255,255,.16);display:grid;place-items:center}.start-consultation div{display:grid;gap:2px;flex:1}.start-consultation strong{font-size:11px}.start-consultation small{font-size:8px;color:rgba(255,255,255,.76)}
        .panel-heading.compact{padding-bottom:11px}.round-action{width:34px;height:34px;border:1px solid #e2ebf0;border-radius:11px;background:#f7fafc;color:#0878d1;display:grid;place-items:center}.timeline{padding:0 17px}.timeline-row{position:relative;min-height:66px;display:flex;align-items:center;gap:10px;border-top:1px solid #edf3f6}.timeline-time{width:48px;display:flex;align-items:baseline;gap:3px}.timeline-time strong{font-size:12px}.timeline-time span{font-size:8px;color:#91a5b1}.timeline-row>i{width:7px;height:7px;border-radius:50%;box-shadow:0 0 0 4px currentColor;opacity:.75}.timeline-row>i.blue{color:#1688d7;background:#1688d7}.timeline-row>i.green{color:#2eb986;background:#2eb986}.timeline-row>i.violet{color:#8a74dd;background:#8a74dd}.appointment-info{display:grid;gap:3px;flex:1}.appointment-info strong{font-size:10px}.appointment-info span{font-size:8px;color:#8da2af}.timeline-row>button{border:0;background:transparent;color:#9aacb7}.calendar-link{width:calc(100% - 34px);height:38px;margin:12px 17px 17px;border:1px solid #dceaf1;border-radius:12px;background:#f8fbfd;color:#0878d1;font-size:9px;font-weight:900;display:flex;align-items:center;justify-content:center;gap:4px}
        .doctor-bottom-grid{display:grid;grid-template-columns:1.3fr .9fr;gap:18px}.quick-actions{padding-bottom:17px}.quick-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:0 18px}.quick-grid button{min-height:77px;border:1px solid #e3edf2;border-radius:15px;background:#fbfdfe;display:grid;place-items:center;gap:6px;color:#456377;cursor:pointer}.quick-grid button:hover{border-color:#b8ddeb;background:#f3fbfd}.quick-grid button span{width:34px;height:34px;border-radius:11px;background:#eaf5fc;color:#0878d1;display:grid;place-items:center}.quick-grid button strong{font-size:9px}.daily-progress{min-height:154px;padding:23px;display:flex;align-items:center;gap:19px;background:linear-gradient(120deg,#fff,#f4fbfd)}.progress-ring{width:91px;height:91px;border-radius:50%;display:grid;place-items:center;flex:0 0 auto;background:conic-gradient(#0bb6ba 0 75%,#e4eef2 75% 100%);position:relative}.progress-ring:before{content:"";position:absolute;inset:9px;border-radius:50%;background:#fff}.progress-ring span{position:relative;font-size:17px;font-weight:900;color:#0878d1}.daily-progress>div:nth-child(2){display:grid;gap:5px}.daily-progress span{font-size:9px;color:#0ba5ae;font-weight:900}.daily-progress h3{font-size:14px;margin:0}.daily-progress p{font-size:9px;color:#849ba9;line-height:1.7;margin:0}
        .doctor-sidebar-overlay{display:none}.doctor-menu-button{width:40px;height:40px;border:1px solid #e0eaf0;border-radius:12px;background:#fff;color:#42677d;place-items:center}
        @media(max-width:1050px){.doctor-stats{grid-template-columns:repeat(2,1fr)}.doctor-grid{grid-template-columns:1fr}.doctor-bottom-grid{grid-template-columns:1fr}.appointments-panel{order:2}}
        @media(max-width:800px){.doctor-sidebar{transform:translateX(105%);transition:.25s}.doctor-sidebar.open{transform:translateX(0)}.doctor-sidebar-close{display:grid;place-items:center}.doctor-sidebar-overlay{position:fixed;inset:0;z-index:35;background:rgba(9,39,57,.34);backdrop-filter:blur(3px)}.doctor-sidebar-overlay.show{display:block}.doctor-main{margin-right:0}.doctor-menu-button{display:grid}.doctor-topbar{height:66px;padding:0 16px}.doctor-search{flex:1;width:auto}.doctor-user-chip div,.doctor-user-chip>svg{display:none}.doctor-content{width:min(100% - 28px,720px);padding-top:23px}.doctor-hero{align-items:flex-start;flex-direction:column}.availability-card{width:100%;min-width:0}.doctor-hero h1{font-size:23px}}
        @media(max-width:560px){.doctor-search kbd{display:none}.doctor-top-actions{gap:5px}.doctor-user-chip{padding:0}.doctor-user-chip>span{width:38px}.doctor-stats{grid-template-columns:1fr 1fr;gap:10px}.stat-card{min-height:119px;padding:15px;gap:9px}.stat-icon{width:38px;height:38px}.stat-card strong{font-size:23px}.stat-card>button{display:none}.quick-grid{grid-template-columns:repeat(2,1fr)}.doctor-bottom-grid{display:block}.daily-progress{margin-top:18px}.consultation-row{padding-inline:4px}.consultation-time small{display:none}.doctor-hero p{line-height:1.7}.panel-heading{padding-inline:15px}.patient-info small{max-width:160px}}
      `}</style>
    </div>
  );
}
