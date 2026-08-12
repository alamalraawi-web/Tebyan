import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Download,
  Filter,
  PackageCheck,
  Plus,
  Search,
  ShoppingBag,
  Truck,
  UserRound,
  X,
} from 'lucide-react';
import { usePharmacyStore } from '../../pharmacy/pharmacyStore.js';
import {
  FULFILLMENT_LABELS,
  ORDER_STATUSES,
  PAYMENT_LABELS,
  formatCurrency,
  formatDateTime,
  getOrderStatus,
  orderTotal,
} from '../../pharmacy/pharmacyData.js';

const filterTabs = [
  ['all', 'الكل'],
  ['new', 'جديدة'],
  ['reviewing', 'قيد المراجعة'],
  ['confirmed', 'مؤكدة'],
  ['preparing', 'جاري التجهيز'],
  ['ready', 'جاهزة'],
  ['delivering', 'قيد التوصيل'],
  ['completed', 'مكتملة'],
  ['cancelled', 'ملغاة'],
];

function downloadOrdersCsv(orders) {
  const rows = [
    ['رقم الطلب', 'العميل', 'الحالة', 'طريقة الاستلام', 'الدفع', 'الإجمالي', 'التاريخ'],
    ...orders.map((order) => [
      order.id,
      order.customer.name,
      getOrderStatus(order.status).label,
      FULFILLMENT_LABELS[order.fulfillment],
      PAYMENT_LABELS[order.payment],
      orderTotal(order),
      formatDateTime(order.createdAt),
    ]),
  ];

  const csv = `\uFEFF${rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'tebyan-pharmacy-orders.csv';
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function PharmacyOrders() {
  const navigate = useNavigate();
  const { data, updateSection } = usePharmacyStore();
  const [activeStatus, setActiveStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [fulfillment, setFulfillment] = useState('all');
  const [prescriptionOnly, setPrescriptionOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    customerPhone: '',
    medicine: '',
    quantity: 1,
    price: '',
    fulfillment: 'pickup',
    payment: 'cash',
  });

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.orders.filter((order) => {
      const matchesStatus = activeStatus === 'all' || order.status === activeStatus;
      const matchesFulfillment = fulfillment === 'all' || order.fulfillment === fulfillment;
      const matchesPrescription = !prescriptionOnly || Boolean(order.prescription);
      const haystack = [
        order.id,
        order.customer.name,
        order.customer.phone,
        ...order.medicines.map((medicine) => medicine.name),
      ].join(' ').toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      return matchesStatus && matchesFulfillment && matchesPrescription && matchesSearch;
    });
  }, [activeStatus, data.orders, fulfillment, prescriptionOnly, search]);

  const counts = useMemo(() => Object.keys(ORDER_STATUSES).reduce((result, key) => ({
    ...result,
    [key]: data.orders.filter((order) => order.status === key).length,
  }), {}), [data.orders]);

  function createOrder(event) {
    event.preventDefault();
    if (!newOrder.customerName.trim() || !newOrder.medicine.trim() || !Number(newOrder.price)) return;

    const sequence = 1050 + data.orders.length;
    const created = {
      id: `TBY-${sequence}`,
      createdAt: new Date().toISOString(),
      status: 'new',
      priority: 'normal',
      customer: {
        id: `CUS-${Date.now()}`,
        name: newOrder.customerName.trim(),
        phone: newOrder.customerPhone.trim() || 'غير مسجل',
        age: null,
        address: 'طلب مسجل من الصيدلية',
        allergy: 'غير محدد',
        chronic: 'غير محدد',
      },
      medicines: [{
        id: `MANUAL-${Date.now()}`,
        name: newOrder.medicine.trim(),
        concentration: '—',
        quantity: Number(newOrder.quantity) || 1,
        price: Number(newOrder.price),
        prescription: false,
        availability: 'available',
      }],
      prescription: null,
      fulfillment: newOrder.fulfillment,
      payment: newOrder.payment,
      paymentStatus: 'pending',
      deliveryFee: newOrder.fulfillment === 'delivery' ? Number(data.settings.deliveryFee || 0) : 0,
      discount: 0,
      notes: 'طلب يدوي من لوحة الصيدلية.',
      timeline: [{ id: `TL-${Date.now()}`, status: 'new', label: 'تم إنشاء الطلب يدويًا', at: new Date().toISOString() }],
    };

    updateSection('orders', (orders) => [created, ...orders]);
    setShowCreate(false);
    setNewOrder({ customerName: '', customerPhone: '', medicine: '', quantity: 1, price: '', fulfillment: 'pickup', payment: 'cash' });
    navigate(`/pharmacy/orders/${created.id}`);
  }

  return (
    <div className="pharmacy-orders-page">
      <section className="pharmacy-page-heading">
        <div>
          <span className="pharmacy-heading-icon"><ShoppingBag /></span>
          <div>
            <h1>إدارة الطلبات</h1>
            <p>تابع كل طلب من لحظة الاستقبال وحتى التسليم للعميل.</p>
          </div>
        </div>
        <div className="pharmacy-heading-actions">
          <button type="button" className="pharmacy-btn pharmacy-btn-soft" onClick={() => downloadOrdersCsv(filteredOrders)}>
            <Download /> تصدير
          </button>
          <button type="button" className="pharmacy-btn pharmacy-btn-primary" onClick={() => setShowCreate(true)}>
            <Plus /> طلب جديد
          </button>
        </div>
      </section>

      <section className="pharmacy-order-summary-grid">
        <article><span className="tone-blue"><ShoppingBag /></span><div><small>كل الطلبات</small><strong>{data.orders.length}</strong></div></article>
        <article><span className="tone-orange"><PackageCheck /></span><div><small>تحتاج إجراء</small><strong>{data.orders.filter((order) => ['new', 'reviewing'].includes(order.status)).length}</strong></div></article>
        <article><span className="tone-cyan"><Truck /></span><div><small>نشطة الآن</small><strong>{data.orders.filter((order) => ['confirmed', 'preparing', 'ready', 'delivering'].includes(order.status)).length}</strong></div></article>
        <article><span className="tone-green"><CheckCircle2 /></span><div><small>مكتملة</small><strong>{counts.completed || 0}</strong></div></article>
      </section>

      <section className="pharmacy-panel pharmacy-orders-workspace">
        <div className="pharmacy-order-tabs" role="tablist" aria-label="حالة الطلب">
          {filterTabs.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={activeStatus === key ? 'active' : ''}
              onClick={() => setActiveStatus(key)}
            >
              {label}
              <b>{key === 'all' ? data.orders.length : counts[key] || 0}</b>
            </button>
          ))}
        </div>

        <div className="pharmacy-toolbar">
          <label className="pharmacy-search-box">
            <Search />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث برقم الطلب، العميل، الهاتف أو الدواء"
            />
            {search && <button type="button" onClick={() => setSearch('')} aria-label="مسح البحث"><X /></button>}
          </label>

          <button
            type="button"
            className={`pharmacy-filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters((current) => !current)}
          >
            <Filter /> تصفية
            {(fulfillment !== 'all' || prescriptionOnly) && <b>!</b>}
          </button>
        </div>

        {showFilters && (
          <div className="pharmacy-filter-panel">
            <label>
              <span>طريقة الاستلام</span>
              <select value={fulfillment} onChange={(event) => setFulfillment(event.target.value)}>
                <option value="all">الكل</option>
                <option value="pickup">استلام من الصيدلية</option>
                <option value="delivery">توصيل</option>
              </select>
            </label>
            <label className="pharmacy-check-option">
              <input type="checkbox" checked={prescriptionOnly} onChange={(event) => setPrescriptionOnly(event.target.checked)} />
              <span><i /> طلبات تحتوي على وصفة فقط</span>
            </label>
            <button type="button" onClick={() => { setFulfillment('all'); setPrescriptionOnly(false); }}>إعادة الضبط</button>
          </div>
        )}

        <div className="pharmacy-table-wrap pharmacy-orders-table-wrap">
          <table className="pharmacy-table">
            <thead>
              <tr>
                <th>الطلب</th>
                <th>العميل</th>
                <th>الأصناف</th>
                <th>الاستلام</th>
                <th>الدفع</th>
                <th>الإجمالي</th>
                <th>الحالة</th>
                <th>التاريخ</th>
                <th aria-label="الإجراء" />
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const status = getOrderStatus(order.status);
                return (
                  <tr key={order.id} onClick={() => navigate(`/pharmacy/orders/${order.id}`)}>
                    <td><strong className="pharmacy-order-id">{order.id}</strong>{order.priority === 'urgent' && <small className="pharmacy-urgent-label">عاجل</small>}</td>
                    <td><div className="pharmacy-customer-cell"><span>{order.customer.name.charAt(0)}</span><div><strong>{order.customer.name}</strong><small>{order.customer.phone}</small></div></div></td>
                    <td><strong>{order.medicines.length}</strong> أصناف{order.prescription && <small className="pharmacy-rx-hint">وصفة</small>}</td>
                    <td>{FULFILLMENT_LABELS[order.fulfillment]}</td>
                    <td><strong>{PAYMENT_LABELS[order.payment]}</strong><small className={order.paymentStatus === 'paid' ? 'paid' : 'pending'}>{order.paymentStatus === 'paid' ? 'مدفوع' : 'غير مدفوع'}</small></td>
                    <td><strong>{formatCurrency(orderTotal(order))}</strong></td>
                    <td><span className={`pharmacy-badge tone-${status.tone}`}>{status.label}</span></td>
                    <td><small>{formatDateTime(order.createdAt)}</small></td>
                    <td><button type="button" aria-label={`فتح ${order.id}`}><ChevronLeft /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pharmacy-mobile-order-list">
          {filteredOrders.map((order) => {
            const status = getOrderStatus(order.status);
            return (
              <button key={order.id} type="button" className="pharmacy-mobile-order-card" onClick={() => navigate(`/pharmacy/orders/${order.id}`)}>
                <header>
                  <div><strong>{order.id}</strong><small>{formatDateTime(order.createdAt)}</small></div>
                  <span className={`pharmacy-badge tone-${status.tone}`}>{status.label}</span>
                </header>
                <div className="pharmacy-mobile-customer"><span><UserRound /></span><div><strong>{order.customer.name}</strong><small>{order.customer.phone}</small></div></div>
                <div className="pharmacy-mobile-order-info">
                  <span><ShoppingBag /><small>الأصناف</small><strong>{order.medicines.length}</strong></span>
                  <span><Truck /><small>الاستلام</small><strong>{order.fulfillment === 'delivery' ? 'توصيل' : 'من الصيدلية'}</strong></span>
                  <span><CalendarDays /><small>الإجمالي</small><strong>{formatCurrency(orderTotal(order))}</strong></span>
                </div>
                <footer>
                  <span>{PAYMENT_LABELS[order.payment]}</span>
                  {order.prescription && <b>وصفة طبية</b>}
                  <ChevronLeft />
                </footer>
              </button>
            );
          })}
        </div>

        {!filteredOrders.length && (
          <div className="pharmacy-empty-state">
            <Search />
            <h3>لا توجد طلبات مطابقة</h3>
            <p>جرّب تغيير حالة الطلب أو مسح خيارات البحث والتصفية.</p>
            <button type="button" onClick={() => { setSearch(''); setActiveStatus('all'); setFulfillment('all'); setPrescriptionOnly(false); }}>إظهار جميع الطلبات</button>
          </div>
        )}
      </section>

      {showCreate && (
        <div className="pharmacy-modal-layer" role="presentation">
          <button type="button" className="pharmacy-modal-backdrop" onClick={() => setShowCreate(false)} aria-label="إغلاق" />
          <form className="pharmacy-modal pharmacy-create-order-modal" onSubmit={createOrder}>
            <header>
              <div><span><Plus /></span><div><h2>إنشاء طلب يدوي</h2><p>سجّل طلب عميل داخل الصيدلية بسرعة.</p></div></div>
              <button type="button" onClick={() => setShowCreate(false)} aria-label="إغلاق"><X /></button>
            </header>
            <div className="pharmacy-form-grid">
              <label><span>اسم العميل *</span><input required value={newOrder.customerName} onChange={(event) => setNewOrder({ ...newOrder, customerName: event.target.value })} placeholder="الاسم الكامل" /></label>
              <label><span>رقم الهاتف</span><input value={newOrder.customerPhone} onChange={(event) => setNewOrder({ ...newOrder, customerPhone: event.target.value })} placeholder="05xxxxxxxx" /></label>
              <label className="wide"><span>اسم الدواء أو المنتج *</span><input required value={newOrder.medicine} onChange={(event) => setNewOrder({ ...newOrder, medicine: event.target.value })} placeholder="مثال: بانادول أدفانس" /></label>
              <label><span>الكمية</span><input type="number" min="1" value={newOrder.quantity} onChange={(event) => setNewOrder({ ...newOrder, quantity: event.target.value })} /></label>
              <label><span>سعر الوحدة *</span><input required type="number" min="0.01" step="0.01" value={newOrder.price} onChange={(event) => setNewOrder({ ...newOrder, price: event.target.value })} /></label>
              <label><span>طريقة الاستلام</span><select value={newOrder.fulfillment} onChange={(event) => setNewOrder({ ...newOrder, fulfillment: event.target.value })}><option value="pickup">استلام من الصيدلية</option><option value="delivery">توصيل</option></select></label>
              <label><span>طريقة الدفع</span><select value={newOrder.payment} onChange={(event) => setNewOrder({ ...newOrder, payment: event.target.value })}><option value="cash">الدفع عند الاستلام</option><option value="card">بطاقة بنكية</option><option value="wallet">محفظة إلكترونية</option><option value="transfer">تحويل بنكي</option></select></label>
            </div>
            <footer>
              <button type="button" className="pharmacy-btn pharmacy-btn-soft" onClick={() => setShowCreate(false)}>إلغاء</button>
              <button type="submit" className="pharmacy-btn pharmacy-btn-primary"><Plus /> إنشاء الطلب</button>
            </footer>
          </form>
        </div>
      )}
    </div>
  );
}
