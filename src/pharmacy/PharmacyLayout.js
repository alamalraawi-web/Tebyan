import { useEffect, useMemo, useState } from 'react';
import {
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  BarChart3,
  Bell,
  Boxes,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircleMore,
  MessagesSquare,
  Settings,
  ShoppingBag,
  Store,
  X,
} from 'lucide-react';
import { getCurrentUser, logout } from '../auth/authStore.js';
import TibyanBrandLogo from '../components/TibyanBrandLogo.js';
import PharmacyBottomNavigation from './PharmacyBottomNavigation.js';
import { usePharmacyStore } from './pharmacyStore.js';
import './pharmacy.css';

const navigationItems = [
  { to: '/pharmacy/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
  { to: '/pharmacy/orders', label: 'الطلبات', icon: ShoppingBag, badge: 'newOrders' },
  { to: '/pharmacy/prescriptions', label: 'الوصفات الطبية', icon: ClipboardCheck, badge: 'pendingPrescriptions' },
  { to: '/pharmacy/inventory', label: 'المخزون والأدوية', icon: Boxes, badge: 'stockAlerts' },
  { to: '/pharmacy/consultations', label: 'الاستشارات', icon: MessageCircleMore },
  { to: '/pharmacy/messages', label: 'الرسائل', icon: MessagesSquare, badge: 'unreadMessages' },
  { to: '/pharmacy/notifications', label: 'الإشعارات', icon: Bell, badge: 'unreadNotifications' },
  { to: '/pharmacy/reports', label: 'التقارير', icon: BarChart3 },
  { to: '/pharmacy/settings', label: 'الإعدادات', icon: Settings },
];

const pageTitles = [
  { pattern: /^\/pharmacy\/orders\/[^/]+$/, title: 'تفاصيل الطلب', subtitle: 'مراجعة الأدوية والوصفة وحركة الطلب' },
  { pattern: /^\/pharmacy\/orders/, title: 'الطلبات', subtitle: 'إدارة الطلبات من الاستقبال حتى التسليم' },
  { pattern: /^\/pharmacy\/prescriptions/, title: 'الوصفات الطبية', subtitle: 'مراجعة الوصفات واعتمادها بأمان' },
  { pattern: /^\/pharmacy\/inventory/, title: 'المخزون والأدوية', subtitle: 'الكميات والأسعار والصلاحية والتنبيهات' },
  { pattern: /^\/pharmacy\/consultations/, title: 'الاستشارات الصيدلانية', subtitle: 'متابعة أسئلة المرضى والرد عليها' },
  { pattern: /^\/pharmacy\/messages/, title: 'الرسائل', subtitle: 'التواصل مع العملاء حول الطلبات' },
  { pattern: /^\/pharmacy\/notifications/, title: 'الإشعارات', subtitle: 'كل التنبيهات التشغيلية في مكان واحد' },
  { pattern: /^\/pharmacy\/reports/, title: 'التقارير', subtitle: 'مؤشرات المبيعات والطلبات والمخزون' },
  { pattern: /^\/pharmacy\/settings/, title: 'الإعدادات', subtitle: 'بيانات الصيدلية وطرق التشغيل' },
  { pattern: /^\/pharmacy/, title: 'لوحة تحكم الصيدلية', subtitle: 'إدارة يوم العمل بوضوح وسرعة' },
];

export default function PharmacyLayout() {
  const user = useMemo(() => getCurrentUser(), []);
  const navigate = useNavigate();
  const location = useLocation();
  const { data, summary, updateSection } = usePharmacyStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.classList.add('pharmacy-dashboard-root');
    body.classList.add('pharmacy-dashboard-active');

    return () => {
      html.classList.remove('pharmacy-dashboard-root');
      body.classList.remove('pharmacy-dashboard-active');
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    /*
      نقفل المستند كله فقط أثناء فتح القائمة.
      قفل body وحده كان يسبب اختلافًا بين وضع الكمبيوتر ووضع الهاتف.
    */
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'pharmacist') {
    return <Navigate to={user.role === 'doctor' ? '/doctor/dashboard' : '/home'} replace />;
  }

  const pharmacistName = user.fullName || data.profile.pharmacistName || 'الصيدلي';
  const pharmacyName = data.settings.pharmacyName || user.labName || data.profile.pharmacyName || 'صيدلية تبيان';
  const pharmacyAddress = data.settings.pharmacyAddress || user.labAddress || data.profile.pharmacyAddress || 'العنوان غير محدد';
  const isOpen = Boolean(data.settings.open);
  const isChat = /^\/pharmacy\/messages\/[^/]+$/.test(location.pathname);
  const pageMeta = pageTitles.find((item) => item.pattern.test(location.pathname)) || pageTitles.at(-1);

  function signOut() {
    logout();
    navigate('/login', { replace: true });
  }

  function toggleAvailability() {
    updateSection('settings', (settings) => ({ ...settings, open: !settings.open }));
  }

  return (
    <div className={`pharmacy-app ${isChat ? 'pharmacy-chat-mode' : ''}`} dir="rtl">
      <button
        type="button"
        aria-label="إغلاق القائمة"
        className={`pharmacy-side-overlay ${menuOpen ? 'show' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      <aside className={`pharmacy-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="pharmacy-brand">
          <span className="pharmacy-brand-logo"><TibyanBrandLogo /></span>
          <div>
            <strong>تبيان</strong>
            <small>مساحة الصيدلية</small>
          </div>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="إغلاق القائمة"><X /></button>
        </div>

        <div className="pharmacy-identity-card">
          <span><Store /></span>
          <div>
            <strong>{pharmacyName}</strong>
            <small>{pharmacyAddress}</small>
          </div>
          <i className={isOpen ? 'open' : ''}>{isOpen ? 'مفتوحة' : 'مغلقة'}</i>
        </div>

        <nav className="pharmacy-side-nav" aria-label="قائمة الصيدلية">
          {navigationItems.map(({ to, label, icon: Icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <Icon />
              <span>{label}</span>
              {badge && summary[badge] > 0 && <b>{summary[badge] > 99 ? '99+' : summary[badge]}</b>}
            </NavLink>
          ))}
        </nav>

        <div className="pharmacy-sidebar-bottom">
          <div className="pharmacy-mini-profile">
            <div className="pharmacy-avatar">{pharmacistName.trim().charAt(0) || 'ص'}</div>
            <div>
              <strong>{pharmacistName}</strong>
              <small>صيدلي مسؤول</small>
            </div>
          </div>

          <button type="button" className="pharmacy-logout" onClick={signOut}>
            <LogOut />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <section className="pharmacy-shell">
        {!isChat && (
          <header className="pharmacy-topbar">
            <button
              type="button"
              className="pharmacy-icon-button pharmacy-mobile-menu"
              onClick={() => setMenuOpen(true)}
              aria-label="فتح القائمة"
            >
              <Menu />
            </button>

            <div className="pharmacy-top-title">
              <strong>{pageMeta.title}</strong>
              <small>{pageMeta.subtitle}</small>
            </div>

            <button
              type="button"
              className={`pharmacy-availability ${isOpen ? 'on' : ''}`}
              onClick={toggleAvailability}
              aria-pressed={isOpen}
            >
              <i />
              <span>{isOpen ? 'الصيدلية مفتوحة' : 'الصيدلية مغلقة'}</span>
            </button>

            <NavLink className="pharmacy-top-bell" to="/pharmacy/notifications" aria-label="الإشعارات">
              <Bell />
              {summary.unreadNotifications > 0 && <span>{summary.unreadNotifications}</span>}
            </NavLink>

            <div className="pharmacy-top-profile">
              <span>{pharmacistName.trim().charAt(0) || 'ص'}</span>
              <div>
                <strong>{pharmacistName}</strong>
                <small>{pharmacyName}</small>
              </div>
            </div>
          </header>
        )}

        <main className={`pharmacy-page ${isChat ? 'pharmacy-chat-main' : ''}`}>
          <Outlet
            context={{
              user,
              data,
              summary,
              pharmacistName,
              pharmacyName,
              pharmacyAddress,
              isOpen,
              toggleAvailability,
            }}
          />
        </main>

        <PharmacyBottomNavigation
          counts={summary}
          hidden={isChat || menuOpen}
          onLogout={signOut}
        />
      </section>
    </div>
  );
}
