import { useMemo, useState } from 'react';
import {
  BarChart3,
  Boxes,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Download,
  PackageCheck,
  Pill,
  Printer,
  ShoppingBag,
  TrendingUp,
  Truck,
  UsersRound,
} from 'lucide-react';
import { usePharmacyStore } from '../../pharmacy/pharmacyStore.js';
import {
  PAYMENT_LABELS,
  formatCurrency,
  getOrderStatus,
  orderTotal,
} from '../../pharmacy/pharmacyData.js';

const periodOptions = [
  ['today', 'اليوم'],
  ['week', 'هذا الأسبوع'],
  ['month', 'هذا الشهر'],
  ['quarter', 'آخر 3 أشهر'],
];

const periodMultiplier = { today: 0.18, week: 1, month: 4.25, quarter: 12.5 };

function downloadReport(rows) {
  const csv = `\uFEFF${rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'tebyan-pharmacy-report.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export default function PharmacyReports() {
  const { data } = usePharmacyStore();
  const [period, setPeriod] = useState('week');
  const multiplier = periodMultiplier[period];

  const metrics = useMemo(() => {
    const completed = data.orders.filter((order) => order.status === 'completed');
    const gross = data.orders.reduce((sum, order) => sum + orderTotal(order), 0);
    const completedGross = completed.reduce((sum, order) => sum + orderTotal(order), 0);
    const customers = new Set(data.orders.map((order) => order.customer.id)).size;
    const deliveries = data.orders.filter((order) => order.fulfillment === 'delivery').length;
    return {
      orders: Math.max(1, Math.round(data.reportSeries.reduce((sum, item) => sum + item.orders, 0) * multiplier)),
      sales: Math.round(data.reportSeries.reduce((sum, item) => sum + item.sales, 0) * multiplier),
      average: gross / Math.max(data.orders.length, 1),
      completionRate: (completed.length / Math.max(data.orders.length, 1)) * 100,
      customers: Math.max(customers, Math.round(customers * multiplier)),
      deliveries: Math.max(deliveries, Math.round(deliveries * multiplier)),
      completedGross,
    };
  }, [data.orders, data.reportSeries, multiplier]);

  const topMedicines = useMemo(() => {
    const map = new Map();
    data.orders.forEach((order) => order.medicines.forEach((medicine) => {
      const current = map.get(medicine.name) || { name: medicine.name, quantity: 0, sales: 0 };
      current.quantity += Number(medicine.quantity || 0);
      current.sales += Number(medicine.quantity || 0) * Number(medicine.price || 0);
      map.set(medicine.name, current);
    }));
    return [...map.values()].sort((a, b) => b.quantity - a.quantity).slice(0, 6);
  }, [data.orders]);

  const paymentDistribution = useMemo(() => {
    const counts = data.orders.reduce((result, order) => ({
      ...result,
      [order.payment]: (result[order.payment] || 0) + 1,
    }), {});
    return Object.entries(counts).map(([key, value]) => ({ key, label: PAYMENT_LABELS[key], value }));
  }, [data.orders]);

  const statusDistribution = useMemo(() => Object.entries(
    data.orders.reduce((result, order) => ({ ...result, [order.status]: (result[order.status] || 0) + 1 }), {}),
  ).map(([key, value]) => ({ key, value, ...getOrderStatus(key) })), [data.orders]);

  const maxSales = Math.max(...data.reportSeries.map((item) => item.sales), 1);
  const lowStock = data.inventory.filter((item) => ['low', 'out', 'expiring', 'expired'].includes(item.status));

  function exportCurrentReport() {
    downloadReport([
      ['المؤشر', 'القيمة'],
      ['الفترة', periodOptions.find(([key]) => key === period)?.[1]],
      ['إجمالي الطلبات', metrics.orders],
      ['إجمالي المبيعات', metrics.sales],
      ['متوسط قيمة الطلب', metrics.average.toFixed(2)],
      ['نسبة الإكمال', `${metrics.completionRate.toFixed(1)}%`],
      [],
      ['الأدوية الأكثر طلبًا', 'الكمية', 'المبيعات'],
      ...topMedicines.map((item) => [item.name, item.quantity, item.sales]),
    ]);
  }

  return (
    <div className="pharmacy-reports-page">
      <section className="pharmacy-page-heading">
        <div>
          <span className="pharmacy-heading-icon blue"><BarChart3 /></span>
          <div><h1>التقارير ومؤشرات الأداء</h1><p>قراءة واضحة للمبيعات والطلبات والمخزون لتسهيل القرار.</p></div>
        </div>
        <div className="pharmacy-heading-actions">
          <button type="button" className="pharmacy-btn pharmacy-btn-soft" onClick={() => window.print()}><Printer /> طباعة</button>
          <button type="button" className="pharmacy-btn pharmacy-btn-primary" onClick={exportCurrentReport}><Download /> تصدير التقرير</button>
        </div>
      </section>

      <section className="pharmacy-report-periods">
        <div><CalendarDays /><span>الفترة</span></div>
        {periodOptions.map(([key, label]) => <button key={key} type="button" className={period === key ? 'active' : ''} onClick={() => setPeriod(key)}>{label}</button>)}
      </section>

      <section className="pharmacy-report-kpis">
        <article><span className="tone-blue"><ShoppingBag /></span><div><small>إجمالي الطلبات</small><strong>{metrics.orders}</strong><p><TrendingUp /> 12.6% عن الفترة السابقة</p></div></article>
        <article><span className="tone-green"><CircleDollarSign /></span><div><small>إجمالي المبيعات</small><strong>{formatCurrency(metrics.sales)}</strong><p><TrendingUp /> 9.8% نمو</p></div></article>
        <article><span className="tone-purple"><PackageCheck /></span><div><small>متوسط الطلب</small><strong>{formatCurrency(metrics.average)}</strong><p>قيمة متوسطة لكل عملية</p></div></article>
        <article><span className="tone-cyan"><CheckCircle2 /></span><div><small>معدل الإكمال</small><strong>{metrics.completionRate.toFixed(0)}%</strong><p>من الطلبات المسجلة</p></div></article>
        <article><span className="tone-orange"><UsersRound /></span><div><small>عملاء نشطون</small><strong>{metrics.customers}</strong><p>خلال الفترة المحددة</p></div></article>
        <article><span className="tone-red"><Truck /></span><div><small>طلبات التوصيل</small><strong>{metrics.deliveries}</strong><p>إلى عناوين العملاء</p></div></article>
      </section>

      <section className="pharmacy-report-grid main">
        <article className="pharmacy-panel pharmacy-report-sales-chart">
          <header className="pharmacy-panel-head"><div><span className="pharmacy-panel-icon"><BarChart3 /></span><div><h2>حركة المبيعات</h2><p>مقارنة يومية لقيمة المبيعات</p></div></div><span className="pharmacy-soft-chip"><TrendingUp /> أداء متصاعد</span></header>
          <div className="pharmacy-report-bars">
            {data.reportSeries.map((item) => (
              <div key={item.day}>
                <span>{formatCurrency(Math.round(item.sales * multiplier))}</span>
                <div><i style={{ height: `${Math.max(12, (item.sales / maxSales) * 100)}%` }} /></div>
                <small>{item.day}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="pharmacy-panel pharmacy-status-report">
          <header className="pharmacy-panel-head"><div><span className="pharmacy-panel-icon purple"><ShoppingBag /></span><div><h2>حالات الطلبات</h2><p>توزيع الطلبات حسب المرحلة</p></div></div></header>
          <div className="pharmacy-donut-wrap">
            <div className="pharmacy-donut" style={{ '--done': `${metrics.completionRate * 3.6}deg` }}><span><strong>{data.orders.length}</strong><small>طلبًا</small></span></div>
            <div className="pharmacy-status-legend">
              {statusDistribution.map((item) => <div key={item.key}><i className={`tone-${item.tone}`} /><span>{item.label}</span><strong>{item.value}</strong></div>)}
            </div>
          </div>
        </article>
      </section>

      <section className="pharmacy-report-grid secondary">
        <article className="pharmacy-panel pharmacy-top-products-report">
          <header className="pharmacy-panel-head"><div><span className="pharmacy-panel-icon success"><Pill /></span><div><h2>الأدوية الأكثر طلبًا</h2><p>الأصناف الأعلى حركة في الطلبات</p></div></div></header>
          <div className="pharmacy-top-products-list">
            {topMedicines.map((item, index) => (
              <div key={item.name}><b>{index + 1}</b><span><Pill /></span><div><strong>{item.name}</strong><small>{item.quantity} وحدة مباعة</small></div><em>{formatCurrency(item.sales)}</em></div>
            ))}
          </div>
        </article>

        <article className="pharmacy-panel pharmacy-payment-report">
          <header className="pharmacy-panel-head"><div><span className="pharmacy-panel-icon cyan"><CircleDollarSign /></span><div><h2>طرق الدفع</h2><p>تفضيلات العملاء الحالية</p></div></div></header>
          <div className="pharmacy-payment-distribution">
            {paymentDistribution.map((item, index) => {
              const percentage = Math.round((item.value / Math.max(data.orders.length, 1)) * 100);
              return <div key={item.key}><header><span><i className={`payment-${index + 1}`} />{item.label}</span><strong>{percentage}%</strong></header><div><i className={`payment-${index + 1}`} style={{ width: `${percentage}%` }} /></div><small>{item.value} طلبات</small></div>;
            })}
          </div>
        </article>

        <article className="pharmacy-panel pharmacy-stock-report">
          <header className="pharmacy-panel-head"><div><span className="pharmacy-panel-icon warning"><Boxes /></span><div><h2>مخاطر المخزون</h2><p>الأصناف التي تحتاج قرارًا</p></div></div></header>
          <div className="pharmacy-stock-risk-list">
            {lowStock.slice(0, 5).map((item) => <div key={item.id}><span><Boxes /></span><div><strong>{item.name}</strong><small>المتوفر {item.quantity} · الحد {item.minQuantity}</small></div><b>{item.status === 'out' ? 'نفد' : item.status === 'low' ? 'منخفض' : 'صلاحية'}</b></div>)}
          </div>
        </article>
      </section>
    </div>
  );
}
