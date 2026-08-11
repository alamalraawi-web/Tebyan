import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Bell,
  BellRing,
  CheckCheck,
  ChevronLeft,
  ClipboardCheck,
  Clock3,
  MessageSquareText,
  PackageCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react';
import { usePharmacyStore } from '../../pharmacy/pharmacyStore.js';
import { formatDateTime } from '../../pharmacy/pharmacyData.js';

const iconMap = {
  order: ShoppingBag,
  prescription: ClipboardCheck,
  message: MessageSquareText,
  stock: AlertTriangle,
  consultation: BellRing,
  delivery: Truck,
  expiry: Clock3,
  ready: PackageCheck,
};

const filterOptions = [
  ['all', 'الكل'],
  ['unread', 'غير المقروءة'],
  ['order', 'الطلبات'],
  ['prescription', 'الوصفات'],
  ['stock', 'المخزون'],
  ['message', 'الرسائل'],
];

export default function PharmacyNotifications() {
  const navigate = useNavigate();
  const { data, updateSection } = usePharmacyStore();
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => [...data.notifications]
    .sort((a, b) => new Date(b.at) - new Date(a.at))
    .filter((notification) => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !notification.read;
      return notification.type === filter;
    }), [data.notifications, filter]);

  const unreadCount = data.notifications.filter((notification) => !notification.read).length;

  function markRead(notificationId) {
    updateSection('notifications', (items) => items.map((item) => item.id === notificationId ? { ...item, read: true } : item));
  }

  function openNotification(notification) {
    markRead(notification.id);
    if (notification.href) navigate(notification.href);
  }

  function markAllRead() {
    updateSection('notifications', (items) => items.map((item) => ({ ...item, read: true })));
  }

  function clearRead() {
    updateSection('notifications', (items) => items.filter((item) => !item.read));
  }

  return (
    <div className="pharmacy-notifications-page">
      <section className="pharmacy-page-heading">
        <div>
          <span className="pharmacy-heading-icon orange"><Bell /></span>
          <div><h1>الإشعارات</h1><p>تابع الطلبات والوصفات والمخزون والرسائل دون أن يفوتك شيء.</p></div>
        </div>
        <div className="pharmacy-heading-actions">
          <button type="button" className="pharmacy-btn pharmacy-btn-soft" onClick={clearRead}><Trash2 /> حذف المقروءة</button>
          <button type="button" className="pharmacy-btn pharmacy-btn-primary" onClick={markAllRead} disabled={!unreadCount}><CheckCheck /> تعليم الكل كمقروء</button>
        </div>
      </section>

      <section className="pharmacy-notification-summary">
        <article><span><BellRing /></span><div><small>غير مقروءة</small><strong>{unreadCount}</strong></div></article>
        <article><span><ShoppingBag /></span><div><small>إشعارات الطلبات</small><strong>{data.notifications.filter((item) => item.type === 'order').length}</strong></div></article>
        <article><span><ClipboardCheck /></span><div><small>وصفات ومراجعات</small><strong>{data.notifications.filter((item) => item.type === 'prescription').length}</strong></div></article>
        <article><span><AlertTriangle /></span><div><small>تنبيهات المخزون</small><strong>{data.notifications.filter((item) => ['stock', 'expiry'].includes(item.type)).length}</strong></div></article>
      </section>

      <section className="pharmacy-panel pharmacy-notifications-workspace">
        <div className="pharmacy-notification-filters">
          {filterOptions.map(([key, label]) => (
            <button key={key} type="button" className={filter === key ? 'active' : ''} onClick={() => setFilter(key)}>{label}</button>
          ))}
        </div>

        <div className="pharmacy-notification-list">
          {filtered.map((notification) => {
            const Icon = iconMap[notification.type] || Bell;
            return (
              <button
                key={notification.id}
                type="button"
                className={notification.read ? 'read' : 'unread'}
                onClick={() => openNotification(notification)}
              >
                <span className={`pharmacy-notification-icon type-${notification.type}`}><Icon /></span>
                <div><header><strong>{notification.title}</strong>{!notification.read && <i>جديد</i>}</header><p>{notification.text}</p><small>{formatDateTime(notification.at)}</small></div>
                <ChevronLeft />
              </button>
            );
          })}
        </div>

        {!filtered.length && (
          <div className="pharmacy-empty-state"><Bell /><h3>لا توجد إشعارات</h3><p>لا توجد عناصر ضمن التصنيف المحدد حاليًا.</p></div>
        )}
      </section>
    </div>
  );
}
