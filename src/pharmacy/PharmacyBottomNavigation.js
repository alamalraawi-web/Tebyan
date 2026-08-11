import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Bell,
  Boxes,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  MessageCircleMore,
  MessagesSquare,
  MoreHorizontal,
  Settings,
  ShoppingBag,
  Store,
} from 'lucide-react';
import TibyanBrandLogo from '../components/TibyanBrandLogo.js';

const dockItems = [
  {
    id: 'orders',
    title: 'الطلبات',
    description: 'متابعة الطلبات الجديدة وحالات التجهيز.',
    href: '/pharmacy/orders',
    icon: ShoppingBag,
    accent: '#0876d9',
    secondary: '#0caab8',
  },
  {
    id: 'inventory',
    title: 'المخزون',
    description: 'الكميات والتنبيهات والصلاحية.',
    href: '/pharmacy/inventory',
    icon: Boxes,
    accent: '#0b9fa7',
    secondary: '#35bd70',
  },
  {
    id: 'dashboard',
    title: 'الرئيسية',
    description: 'لوحة التحكم الرئيسية للصيدلية.',
    href: '/pharmacy/dashboard',
    icon: LayoutDashboard,
    accent: '#0876d9',
    secondary: '#35c86f',
  },
  {
    id: 'messages',
    title: 'الرسائل',
    description: 'محادثات العملاء والطلبات.',
    href: '/pharmacy/messages',
    icon: MessagesSquare,
    accent: '#22a97a',
    secondary: '#0caab8',
  },
  {
    id: 'more',
    title: 'المزيد',
    description: 'الوصفات والاستشارات والتقارير والإعدادات.',
    icon: MoreHorizontal,
    accent: '#6b63d7',
    secondary: '#0876d9',
  },
];

const moreItems = [
  { to: '/pharmacy/prescriptions', label: 'الوصفات الطبية', icon: ClipboardCheck, badgeKey: 'pendingPrescriptions' },
  { to: '/pharmacy/consultations', label: 'الاستشارات', icon: MessageCircleMore },
  { to: '/pharmacy/notifications', label: 'الإشعارات', icon: Bell, badgeKey: 'unreadNotifications' },
  { to: '/pharmacy/reports', label: 'التقارير', icon: BarChart3 },
  { to: '/pharmacy/settings', label: 'الإعدادات', icon: Settings },
  { to: '/main/pharmacy', label: 'واجهة المريض', icon: Store },
];

export default function PharmacyBottomNavigation({ counts = {}, hidden = false, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    setMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!moreOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKey = (event) => {
      if (event.key === 'Escape') setMoreOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [moreOpen]);

  const moreActive = useMemo(
    () => moreItems.some((item) => location.pathname.startsWith(item.to)),
    [location.pathname],
  );

  function isActive(item) {
    if (item.id === 'dashboard') {
      return ['/pharmacy', '/pharmacy/dashboard'].includes(location.pathname);
    }
    if (item.id === 'more') return moreActive;
    return location.pathname.startsWith(item.href);
  }

  function handleItem(item) {
    if (item.id === 'more') {
      setMoreOpen((current) => !current);
      return;
    }
    if (item.id === 'dashboard' && isActive(item)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate(item.href);
  }

  return (
    <>
      <nav
        className={`pharmacy-luxury-dock ${hidden ? 'is-hidden' : ''}`}
        aria-label="شريط التنقل السفلي للصيدلية"
        dir="rtl"
      >
        <div className="pharmacy-dock-frame">
          <span className="pharmacy-dock-sheen" aria-hidden="true" />
          <div className="pharmacy-dock-grid">
            {dockItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              const count = item.id === 'orders'
                ? counts.newOrders
                : item.id === 'messages'
                  ? counts.unreadMessages
                  : 0;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={[
                    'pharmacy-dock-item',
                    active ? 'is-active is-featured' : '',
                  ].filter(Boolean).join(' ')}
                  style={{
                    '--dock-accent': item.accent,
                    '--dock-accent-secondary': item.secondary,
                  }}
                  aria-current={active ? 'page' : undefined}
                  aria-expanded={item.id === 'more' ? moreOpen : undefined}
                  aria-label={`${item.title}. ${item.description}`}
                  onClick={() => handleItem(item)}
                >
                  <span className="pharmacy-dock-tooltip" aria-hidden="true">
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                  <span className="pharmacy-dock-icon-shell" aria-hidden="true">
                    <span className="pharmacy-dock-icon">
                      {item.id === 'dashboard' && active ? (
                        <TibyanBrandLogo className="pharmacy-dock-home-logo" />
                      ) : (
                        <Icon />
                      )}
                    </span>
                    {count > 0 && <b className="pharmacy-dock-count">{count > 9 ? '9+' : count}</b>}
                  </span>
                  <span className="pharmacy-dock-label">{item.title}</span>
                  {active && <span className="pharmacy-dock-active-dot" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <button
        type="button"
        aria-label="إغلاق قائمة المزيد"
        className={`pharmacy-more-backdrop ${moreOpen ? 'show' : ''}`}
        onClick={() => setMoreOpen(false)}
      />

      <section
        className={`pharmacy-more-sheet ${moreOpen ? 'show' : ''}`}
        aria-hidden={!moreOpen}
        dir="rtl"
      >
        <div className="pharmacy-more-handle" aria-hidden="true" />
        <header>
          <div>
            <strong>المزيد</strong>
            <small>كل أدوات إدارة الصيدلية في مكان واحد</small>
          </div>
          <button type="button" onClick={() => setMoreOpen(false)} aria-label="إغلاق">×</button>
        </header>

        <div className="pharmacy-more-grid">
          {moreItems.map(({ to, label, icon: Icon, badgeKey }) => (
            <NavLink key={to} to={to} onClick={() => setMoreOpen(false)}>
              <span><Icon /></span>
              <strong>{label}</strong>
              {badgeKey && counts[badgeKey] > 0 && <b>{counts[badgeKey]}</b>}
            </NavLink>
          ))}
        </div>

        <button type="button" className="pharmacy-more-logout" onClick={onLogout}>
          <LogOut />
          تسجيل الخروج
        </button>
      </section>
    </>
  );
}
