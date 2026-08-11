import {
    CalendarDays,
    LayoutDashboard,
    MessageCircleMore,
    MessagesSquare,
    Settings,
  } from 'lucide-react';
  import { useLocation, useNavigate } from 'react-router-dom';
  import TibyanBrandLogo from '../components/TibyanBrandLogo';
  
  const doctorDockItems = [
    {
      id: 'appointments',
      title: 'المواعيد',
      shortTitle: 'المواعيد',
      description: 'عرض مواعيد الطبيب وتنظيم الجدول اليومي.',
      href: '/doctor/appointments',
      icon: CalendarDays,
      accent: '#0876d9',
      accentSecondary: '#0caab8',
    },
    {
      id: 'consultations',
      title: 'الاستشارات',
      shortTitle: 'الاستشارات',
      description: 'متابعة الاستشارات والحالات الطبية الواردة.',
      href: '/doctor/consultations',
      icon: MessageCircleMore,
      accent: '#24b979',
      accentSecondary: '#0caab8',
    },
    {
      id: 'dashboard',
      title: 'الرئيسية',
      shortTitle: 'الرئيسية',
      description: 'العودة إلى لوحة الطبيب الرئيسية.',
      href: '/doctor/dashboard',
      icon: LayoutDashboard,
      accent: '#0876d9',
      accentSecondary: '#35c86f',
      dashboard: true,
    },
    {
      id: 'messages',
      title: 'الرسائل',
      shortTitle: 'الرسائل',
      description: 'فتح محادثات الطبيب مع المرضى.',
      href: '/doctor/messages',
      icon: MessagesSquare,
      accent: '#0b9fa7',
      accentSecondary: '#0876d9',
    },
    {
      id: 'settings',
      title: 'الإعدادات',
      shortTitle: 'الإعدادات',
      description: 'تخصيص الملف المهني وإعدادات مساحة الطبيب.',
      href: '/doctor/settings',
      icon: Settings,
      accent: '#35bd70',
      accentSecondary: '#0caab8',
    },
  ];
  
  function isRouteActive(item, pathname) {
    if (item.id === 'dashboard') {
      return pathname === '/doctor' || pathname === item.href;
    }
  
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }
  
  export default function DoctorBottomNavigation() {
    const navigate = useNavigate();
    const location = useLocation();
  
    function openPage(item, active) {
      if (active) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
  
      navigate(item.href);
    }
  
    return (
      <nav
        className="doctor-luxury-dock"
        dir="rtl"
        aria-label="شريط التنقل السفلي لمساحة الطبيب"
      >
        <div className="doctor-dock-frame">
          <span className="doctor-dock-sheen" aria-hidden="true" />
  
          <div className="doctor-dock-grid">
            {doctorDockItems.map((item) => {
              const Icon = item.icon;
              const active = isRouteActive(item, location.pathname);
  
              return (
                <button
                  key={item.id}
                  type="button"
                  className={[
                    'doctor-dock-item',
                    item.dashboard ? 'is-dashboard' : '',
                    active ? 'is-featured' : '',
                    active ? 'is-active' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => openPage(item, active)}
                  aria-current={active ? 'page' : undefined}
                  aria-label={`${item.title}. ${item.description}`}
                  title={`${item.title}. ${item.description}`}
                  style={{
                    '--dock-accent': item.accent,
                    '--dock-accent-secondary': item.accentSecondary,
                  }}
                >
                  <span className="doctor-dock-icon-shell" aria-hidden="true">
                    <span className="doctor-dock-icon">
                      {item.dashboard && active ? (
                        <TibyanBrandLogo className="doctor-dock-home-logo" />
                      ) : (
                        <Icon />
                      )}
                    </span>
                  </span>
  
                  <span className="doctor-dock-label">{item.shortTitle}</span>
  
                  {active && (
                    <span className="doctor-dock-active-dot" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }