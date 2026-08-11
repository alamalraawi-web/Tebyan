import { useEffect, useMemo, useState } from 'react';
import {
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  Bell,
  CalendarDays,
  FileHeart,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircleMore,
  MessagesSquare,
  Settings,
  Stethoscope,
  UsersRound,
  X,
} from 'lucide-react';
import { getCurrentUser, logout } from '../auth/authStore';
import { loadDoctorData } from './doctorStore';
import DoctorBottomNavigation from './DoctorBottomNavigation';
import './doctor.css';

const items = [
  ['/doctor/dashboard', 'الرئيسية', LayoutDashboard],
  ['/doctor/consultations', 'الاستشارات', MessageCircleMore],
  ['/doctor/patients', 'المرضى', UsersRound],
  ['/doctor/appointments', 'المواعيد', CalendarDays],
  ['/doctor/diseases', 'دليل الأمراض', FileHeart],
  ['/doctor/messages', 'الرسائل', MessagesSquare],
  ['/doctor/notifications', 'الإشعارات', Bell],
  ['/doctor/settings', 'الإعدادات', Settings],
];

export default function DoctorLayout() {
  const user = useMemo(getCurrentUser, []);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(user?.availability !== 'offline');
  const unread = loadDoctorData('notifications').filter((item) => !item.read).length;
  const isChat = /^\/doctor\/messages\/[^/]+$/.test(location.pathname);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function closeOnEscape(event) {
      if (event.key === 'Escape') setOpen(false);
    }

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== 'doctor') {
    return (
      <Navigate
        to={user.role === 'pharmacist' ? '/main/pharmacy' : '/home'}
        replace
      />
    );
  }

  const name = user.fullName || 'الطبيب';

  function signOut() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className={`doctor-app ${open ? 'menu-open' : ''}`} dir="rtl">
      <button
        type="button"
        className={`doctor-overlay ${open ? 'show' : ''}`}
        onClick={() => setOpen(false)}
        aria-label="إغلاق قائمة الطبيب"
        tabIndex={open ? 0 : -1}
      />

      <aside className={`doctor-side ${open ? 'open' : ''}`}>
        <div className="doctor-brand">
          <span><Stethoscope /></span>
          <div>
            <strong>تبيان</strong>
            <small>مساحة الطبيب</small>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="إغلاق القائمة"
          >
            <X />
          </button>
        </div>

        <nav aria-label="التنقل الرئيسي لمساحة الطبيب">
          {items.map(([to, label, Icon]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <Icon />
              <span>{label}</span>
              {label === 'الإشعارات' && unread > 0 && <b>{unread}</b>}
            </NavLink>
          ))}
        </nav>

        <div className="doctor-mini-profile">
          <div className="doctor-avatar">{name.charAt(0)}</div>
          <div>
            <strong>د. {name}</strong>
            <small>{user.specialty || 'الطب العام'}</small>
          </div>
        </div>

        <button type="button" className="doctor-logout" onClick={signOut}>
          <LogOut />
          تسجيل الخروج
        </button>
      </aside>

      <section className={`doctor-shell ${isChat ? 'chat-mode' : ''}`}>
        {!isChat && (
          <header className="doctor-topbar">
            <button
              type="button"
              className="icon-button mobile-menu"
              onClick={() => setOpen(true)}
              aria-label="فتح قائمة الطبيب"
              aria-expanded={open}
            >
              <Menu />
            </button>

            <div className="top-title">
              <strong>مساحة الطبيب</strong>
              <small>إدارة يومك الطبي بوضوح</small>
            </div>

            <button
              type="button"
              className={`availability ${online ? 'on' : ''}`}
              onClick={() => setOnline((value) => !value)}
              aria-label={online ? 'متاح للاستشارات' : 'غير متاح للاستشارات'}
              aria-pressed={online}
            >
              <i />
              <span>{online ? 'متاح للاستشارات' : 'غير متاح'}</span>
            </button>

            <NavLink
              className="top-bell"
              to="/doctor/notifications"
              aria-label={unread > 0 ? `الإشعارات، ${unread} غير مقروءة` : 'الإشعارات'}
            >
              <Bell />
              {unread > 0 && <span>{unread}</span>}
            </NavLink>
          </header>
        )}

        <main className={`doctor-page ${isChat ? 'doctor-chat-main' : ''}`}>
          <Outlet context={{ user, name, online, setOnline }} />
        </main>

        {!isChat && <DoctorBottomNavigation />}
      </section>
    </div>
  );
}