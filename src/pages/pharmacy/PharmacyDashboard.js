import { Link, useOutletContext } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  BellRing,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  MessageCircleMore,
  PackageCheck,
  Pill,
  Plus,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Truck,
  Wallet,
} from 'lucide-react';
import {
  formatCurrency,
  formatDateTime,
  getInventoryStatus,
  getOrderStatus,
  getPrescriptionStatus,
  orderTotal,
} from '../../pharmacy/pharmacyData.js';

function StatCard({ icon: Icon, label, value, note, tone = 'blue', trend }) {
  return (
    <article className={`pharmacy-stat-card tone-${tone}`}>
      <span className="pharmacy-stat-icon"><Icon /></span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <p>{note}</p>
      </div>
      {trend && <em><TrendingUp />{trend}</em>}
    </article>
  );
}

function StatusBadge({ status, type = 'order' }) {
  const meta = type === 'inventory'
    ? getInventoryStatus(status)
    : type === 'prescription'
      ? getPrescriptionStatus(status)
      : getOrderStatus(status);
  return <span className={`pharmacy-badge tone-${meta.tone}`}>{meta.label}</span>;
}

export default function PharmacyDashboard() {
  const { data, pharmacistName, pharmacyName } = useOutletContext();
  const { orders, inventory, reportSeries } = data;
  const nowHour = new Date().getHours();
  const greeting = nowHour < 12 ? 'صباح الخير' : nowHour < 18 ? 'مساء الخير' : 'مساء النور';

  const activeOrders = orders.filter((order) => !['completed', 'cancelled'].includes(order.status));
  const newOrders = orders.filter((order) => order.status === 'new').length;
  const readyOrders = orders.filter((order) => order.status === 'ready').length;
  const deliveringOrders = orders.filter((order) => order.status === 'delivering').length;
  const pendingPrescriptions = orders.filter((order) =>
    order.prescription && ['pending', 'reviewing', 'clarification'].includes(order.prescription.status),
  );
  const stockAlerts = inventory.filter((item) => ['low', 'out', 'expiring', 'expired'].includes(item.status));
  const completedSales = orders
    .filter((order) => order.status === 'completed')
    .reduce((sum, order) => sum + orderTotal(order), 0);
  const maxSales = Math.max(...reportSeries.map((item) => item.sales), 1);

  const pipeline = [
    { key: 'new', label: 'جديدة', icon: BellRing },
    { key: 'reviewing', label: 'مراجعة', icon: ClipboardCheck },
    { key: 'preparing', label: 'تجهيز', icon: Pill },
    { key: 'ready', label: 'جاهزة', icon: PackageCheck },
    { key: 'delivering', label: 'توصيل', icon: Truck },
  ];

  return (
    <div className="pharmacy-dashboard-page">
      <section className="pharmacy-welcome-card">
        <div className="pharmacy-welcome-copy">
          <span className="pharmacy-eyebrow"><Sparkles /> إدارة يومية أكثر وضوحًا</span>
          <h1>{greeting}، {pharmacistName}</h1>
          <p>
            في <strong>{pharmacyName}</strong> لديك اليوم {activeOrders.length} طلبات نشطة و{' '}
            {pendingPrescriptions.length} وصفات تحتاج انتباهك.
          </p>
          <div className="pharmacy-hero-actions">
            <Link className="pharmacy-btn pharmacy-btn-light" to="/pharmacy/orders">
              <ShoppingBag /> عرض الطلبات
            </Link>
            <Link className="pharmacy-btn pharmacy-btn-ghost" to="/pharmacy/prescriptions">
              <ClipboardCheck /> مراجعة الوصفات
            </Link>
          </div>
        </div>

        <div className="pharmacy-welcome-visual" aria-hidden="true">
          <div className="pharmacy-visual-orbit orbit-one" />
          <div className="pharmacy-visual-orbit orbit-two" />
          <span className="pharmacy-visual-pill pill-one"><Pill /></span>
          <span className="pharmacy-visual-pill pill-two"><ClipboardCheck /></span>
          <span className="pharmacy-visual-core"><ShoppingBag /></span>
          <small>{newOrders} جديدة</small>
        </div>
      </section>

      <section className="pharmacy-stats-grid">
        <StatCard icon={ShoppingBag} label="طلبات جديدة" value={newOrders} note="بانتظار المراجعة" tone="blue" trend="12%" />
        <StatCard icon={ClipboardCheck} label="وصفات معلقة" value={pendingPrescriptions.length} note="تحتاج اعتمادًا" tone="orange" />
        <StatCard icon={PackageCheck} label="جاهزة للاستلام" value={readyOrders} note="أبلغ العملاء" tone="green" />
        <StatCard icon={Truck} label="قيد التوصيل" value={deliveringOrders} note="تابع المندوبين" tone="cyan" />
        <StatCard icon={AlertTriangle} label="تنبيهات المخزون" value={stockAlerts.length} note="نقص أو صلاحية" tone="red" />
        <StatCard icon={Wallet} label="مبيعات مكتملة" value={formatCurrency(completedSales)} note="ضمن البيانات الحالية" tone="purple" trend="8%" />
      </section>

      <section className="pharmacy-dashboard-grid pharmacy-dashboard-grid-main">
        <article className="pharmacy-panel pharmacy-orders-panel">
          <header className="pharmacy-panel-head">
            <div>
              <span className="pharmacy-panel-icon"><ShoppingBag /></span>
              <div><h2>أحدث الطلبات</h2><p>الأولوية للطلبات الجديدة والعاجلة</p></div>
            </div>
            <Link to="/pharmacy/orders">عرض الكل <ArrowLeft /></Link>
          </header>

          <div className="pharmacy-order-list">
            {orders.slice(0, 5).map((order) => (
              <Link key={order.id} className="pharmacy-order-row" to={`/pharmacy/orders/${order.id}`}>
                <span className={`pharmacy-order-avatar ${order.priority === 'urgent' ? 'urgent' : ''}`}>
                  {order.customer.name.charAt(0)}
                </span>
                <div className="pharmacy-order-main">
                  <strong>{order.customer.name}</strong>
                  <small>{order.id} · {order.medicines.length} أصناف</small>
                </div>
                <div className="pharmacy-order-meta">
                  <strong>{formatCurrency(orderTotal(order))}</strong>
                  <small>{formatDateTime(order.createdAt)}</small>
                </div>
                <StatusBadge status={order.status} />
                <ArrowLeft className="pharmacy-row-arrow" />
              </Link>
            ))}
          </div>
        </article>

        <article className="pharmacy-panel pharmacy-sales-panel">
          <header className="pharmacy-panel-head">
            <div>
              <span className="pharmacy-panel-icon"><BarChart3 /></span>
              <div><h2>أداء الأسبوع</h2><p>المبيعات حسب أيام الأسبوع</p></div>
            </div>
            <span className="pharmacy-soft-chip"><TrendingUp /> +11.4%</span>
          </header>

          <div className="pharmacy-mini-chart" aria-label="رسم مبيعات الأسبوع">
            {reportSeries.map((item) => (
              <div key={item.day} className="pharmacy-chart-column">
                <span className="pharmacy-chart-value">{formatCurrency(item.sales)}</span>
                <div className="pharmacy-chart-track">
                  <i style={{ height: `${Math.max(16, (item.sales / maxSales) * 100)}%` }} />
                </div>
                <small>{item.day}</small>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="pharmacy-panel pharmacy-pipeline-panel">
        <header className="pharmacy-panel-head">
          <div>
            <span className="pharmacy-panel-icon"><Clock3 /></span>
            <div><h2>مسار الطلبات النشطة</h2><p>صورة سريعة لمراحل العمل الحالية</p></div>
          </div>
          <Link to="/pharmacy/orders">إدارة المسار <ArrowLeft /></Link>
        </header>
        <div className="pharmacy-pipeline">
          {pipeline.map(({ key, label, icon: Icon }, index) => {
            const count = orders.filter((order) => order.status === key).length;
            return (
              <div key={key} className={`pharmacy-pipeline-step ${count ? 'has-orders' : ''}`}>
                <span><Icon /></span>
                <strong>{count}</strong>
                <small>{label}</small>
                {index < pipeline.length - 1 && <i aria-hidden="true" />}
              </div>
            );
          })}
        </div>
      </section>

      <section className="pharmacy-dashboard-grid pharmacy-dashboard-grid-secondary">
        <article className="pharmacy-panel">
          <header className="pharmacy-panel-head">
            <div>
              <span className="pharmacy-panel-icon warning"><Boxes /></span>
              <div><h2>تنبيهات المخزون</h2><p>عناصر تحتاج إجراء قريبًا</p></div>
            </div>
            <Link to="/pharmacy/inventory">المخزون <ArrowLeft /></Link>
          </header>
          <div className="pharmacy-compact-list">
            {stockAlerts.slice(0, 4).map((item) => (
              <Link to="/pharmacy/inventory" key={item.id} className="pharmacy-compact-row">
                <span className="pharmacy-medicine-mark"><Pill /></span>
                <div><strong>{item.name}</strong><small>{item.quantity} وحدة · ينتهي {item.expiry}</small></div>
                <StatusBadge type="inventory" status={item.status} />
              </Link>
            ))}
          </div>
        </article>

        <article className="pharmacy-panel">
          <header className="pharmacy-panel-head">
            <div>
              <span className="pharmacy-panel-icon success"><ClipboardCheck /></span>
              <div><h2>وصفات بانتظارك</h2><p>راجعها قبل بدء التجهيز</p></div>
            </div>
            <Link to="/pharmacy/prescriptions">عرض الكل <ArrowLeft /></Link>
          </header>
          <div className="pharmacy-compact-list">
            {pendingPrescriptions.slice(0, 4).map((order) => (
              <Link to={`/pharmacy/orders/${order.id}`} key={order.id} className="pharmacy-compact-row">
                <span className="pharmacy-document-mark"><ClipboardCheck /></span>
                <div><strong>{order.customer.name}</strong><small>{order.prescription.doctor} · {order.id}</small></div>
                <StatusBadge type="prescription" status={order.prescription.status} />
              </Link>
            ))}
          </div>
        </article>

        <article className="pharmacy-panel pharmacy-quick-actions-panel">
          <header className="pharmacy-panel-head">
            <div>
              <span className="pharmacy-panel-icon purple"><Plus /></span>
              <div><h2>إجراءات سريعه</h2><p>اختصارات للمهام المتكررة</p></div>
            </div>
          </header>
          <div className="pharmacy-quick-actions">
            <Link to="/pharmacy/inventory"><span><Plus /></span><strong>إضافة دواء</strong><small>إلى المخزون</small></Link>
            <Link to="/pharmacy/orders"><span><ShoppingBag /></span><strong>طلب يدوي</strong><small>عميل داخل الصيدلية</small></Link>
            <Link to="/pharmacy/consultations"><span><MessageCircleMore /></span><strong>الاستشارات</strong><small>الرد على المرضى</small></Link>
            <Link to="/pharmacy/notifications"><span><BellRing /></span><strong>التنبيهات</strong><small>راجع المستجدات</small></Link>
          </div>
        </article>
      </section>

      <section className="pharmacy-daily-note">
        <span><CheckCircle2 /></span>
        <div><strong>مؤشر التشغيل جيد</strong><p>أعلى أولوية الآن: مراجعة الوصفات الجديدة وتحديث مخزون الأدوية منخفضة الكمية.</p></div>
        <Link to="/pharmacy/reports">التقرير اليومي <ArrowLeft /></Link>
      </section>
    </div>
  );
}
