import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  AlertTriangle,
  Boxes,
  CalendarClock,
  Download,
  Edit3,
  Minus,
  PackageX,
  Pill,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  X,
} from 'lucide-react';
import { usePharmacyStore } from '../../pharmacy/pharmacyStore.js';
import {
  formatCurrency,
  formatDate,
  getInventoryStatus,
} from '../../pharmacy/pharmacyData.js';

const emptyForm = {
  name: '', scientificName: '', concentration: '', form: 'أقراص', company: '', category: '',
  barcode: '', quantity: 0, minQuantity: 5, purchasePrice: '', salePrice: '', batch: '', expiry: '', prescription: false,
};

function deriveStatus(item) {
  const quantity = Number(item.quantity || 0);
  const minimum = Number(item.minQuantity || 0);
  if (quantity <= 0) return 'out';
  const expiry = item.expiry ? new Date(item.expiry) : null;
  const days = expiry && !Number.isNaN(expiry.getTime())
    ? Math.ceil((expiry.getTime() - Date.now()) / 86400000)
    : Number.POSITIVE_INFINITY;
  if (days < 0) return 'expired';
  if (days <= 120) return 'expiring';
  if (quantity <= minimum) return 'low';
  return 'available';
}

function exportInventory(items) {
  const rows = [
    ['الدواء', 'المادة الفعالة', 'الكمية', 'الحد الأدنى', 'سعر البيع', 'الصلاحية', 'الحالة'],
    ...items.map((item) => [item.name, item.scientificName, item.quantity, item.minQuantity, item.salePrice, item.expiry, getInventoryStatus(item.status).label]),
  ];
  const csv = `\uFEFF${rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'tebyan-pharmacy-inventory.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export default function PharmacyInventory() {
  const { data, updateSection, updateInventoryItem } = usePharmacyStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!modalOpen) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [modalOpen]);

  const categories = useMemo(() => [...new Set(data.inventory.map((item) => item.category))].sort(), [data.inventory]);
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.inventory.filter((item) => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const haystack = [item.name, item.scientificName, item.company, item.barcode, item.batch].join(' ').toLowerCase();
      return matchesStatus && matchesCategory && (!query || haystack.includes(query));
    });
  }, [categoryFilter, data.inventory, search, statusFilter]);

  const stats = {
    total: data.inventory.length,
    available: data.inventory.filter((item) => item.status === 'available').length,
    low: data.inventory.filter((item) => item.status === 'low').length,
    out: data.inventory.filter((item) => item.status === 'out').length,
    expiry: data.inventory.filter((item) => ['expiring', 'expired'].includes(item.status)).length,
  };

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditingId(item.id);
    setForm({ ...item });
    setModalOpen(true);
  }

  function saveMedicine(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.salePrice || !form.expiry) return;
    const prepared = {
      ...form,
      name: form.name.trim(),
      scientificName: form.scientificName.trim() || 'غير محدد',
      quantity: Number(form.quantity || 0),
      minQuantity: Number(form.minQuantity || 0),
      purchasePrice: Number(form.purchasePrice || 0),
      salePrice: Number(form.salePrice || 0),
      status: deriveStatus(form),
    };

    if (editingId) {
      updateInventoryItem(editingId, { ...prepared, id: editingId });
    } else {
      updateSection('inventory', (items) => [{ ...prepared, id: `MED-${Date.now()}` }, ...items]);
    }
    setModalOpen(false);
  }

  function adjustQuantity(item, amount) {
    updateInventoryItem(item.id, (current) => {
      const quantity = Math.max(0, Number(current.quantity || 0) + amount);
      return { ...current, quantity, status: deriveStatus({ ...current, quantity }) };
    });
  }

  function deleteMedicine(item) {
    if (!window.confirm(`هل تريد حذف ${item.name} من المخزون؟`)) return;
    updateSection('inventory', (items) => items.filter((entry) => entry.id !== item.id));
  }

  return (
    <div className="pharmacy-inventory-page">
      <section className="pharmacy-page-heading">
        <div>
          <span className="pharmacy-heading-icon cyan"><Boxes /></span>
          <div><h1>المخزون والأدوية</h1><p>راقب الكميات والأسعار والصلاحية من شاشة تشغيل واحدة.</p></div>
        </div>
        <div className="pharmacy-heading-actions">
          <button type="button" className="pharmacy-btn pharmacy-btn-soft" onClick={() => exportInventory(filtered)}><Download /> تصدير</button>
          <button type="button" className="pharmacy-btn pharmacy-btn-primary" onClick={openCreate}><Plus /> إضافة دواء</button>
        </div>
      </section>

      <section className="pharmacy-inventory-stats">
        <article><span className="tone-blue"><Boxes /></span><div><small>إجمالي الأصناف</small><strong>{stats.total}</strong></div></article>
        <article><span className="tone-green"><Pill /></span><div><small>متوفرة</small><strong>{stats.available}</strong></div></article>
        <article><span className="tone-orange"><AlertTriangle /></span><div><small>كمية منخفضة</small><strong>{stats.low}</strong></div></article>
        <article><span className="tone-red"><PackageX /></span><div><small>غير متوفرة</small><strong>{stats.out}</strong></div></article>
        <article><span className="tone-purple"><CalendarClock /></span><div><small>تنبيه صلاحية</small><strong>{stats.expiry}</strong></div></article>
      </section>

      <section className="pharmacy-panel pharmacy-inventory-workspace">
        <div className="pharmacy-toolbar inventory-toolbar">
          <label className="pharmacy-search-box">
            <Search />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث بالاسم، المادة الفعالة، الشركة أو الباركود" />
            {search && <button type="button" onClick={() => setSearch('')}><X /></button>}
          </label>
          <button type="button" className={`pharmacy-filter-toggle ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters((value) => !value)}><SlidersHorizontal /> تصفية</button>
        </div>

        {showFilters && (
          <div className="pharmacy-filter-panel inventory-filters">
            <label><span>حالة المخزون</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">كل الحالات</option><option value="available">متوفر</option><option value="low">كمية منخفضة</option><option value="out">غير متوفر</option><option value="expiring">قريب الانتهاء</option><option value="expired">منتهي الصلاحية</option></select></label>
            <label><span>الفئة</span><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option value="all">كل الفئات</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
            <button type="button" onClick={() => { setStatusFilter('all'); setCategoryFilter('all'); }}>إعادة الضبط</button>
          </div>
        )}

        <div className="pharmacy-table-wrap pharmacy-inventory-table-wrap">
          <table className="pharmacy-table pharmacy-inventory-table">
            <thead><tr><th>الدواء</th><th>الفئة</th><th>الكمية</th><th>سعر البيع</th><th>الصلاحية</th><th>الحالة</th><th>التحكم</th></tr></thead>
            <tbody>
              {filtered.map((item) => {
                const meta = getInventoryStatus(item.status);
                const percentage = Math.min(100, Math.round((item.quantity / Math.max(item.minQuantity * 3, 1)) * 100));
                return (
                  <tr key={item.id}>
                    <td><div className="pharmacy-medicine-cell"><span><Pill /></span><div><strong>{item.name}</strong><small>{item.scientificName} · {item.concentration}</small><em>{item.company}</em></div></div></td>
                    <td>{item.category}<small className="pharmacy-prescription-tag">{item.prescription ? 'بوصفة' : 'بدون وصفة'}</small></td>
                    <td><div className="pharmacy-stock-cell"><div><strong>{item.quantity}</strong><small>الحد {item.minQuantity}</small></div><span><i style={{ width: `${percentage}%` }} /></span></div></td>
                    <td><strong>{formatCurrency(item.salePrice)}</strong><small>شراء {formatCurrency(item.purchasePrice)}</small></td>
                    <td><strong>{formatDate(item.expiry)}</strong><small>{item.batch}</small></td>
                    <td><span className={`pharmacy-badge tone-${meta.tone}`}>{meta.label}</span></td>
                    <td><div className="pharmacy-table-actions"><button type="button" onClick={() => adjustQuantity(item, 1)} title="زيادة"><Plus /></button><button type="button" onClick={() => adjustQuantity(item, -1)} title="نقص"><Minus /></button><button type="button" onClick={() => openEdit(item)} title="تعديل"><Edit3 /></button><button type="button" className="danger" onClick={() => deleteMedicine(item)} title="حذف"><Trash2 /></button></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pharmacy-inventory-card-grid">
          {filtered.map((item) => {
            const meta = getInventoryStatus(item.status);
            return (
              <article key={item.id} className="pharmacy-inventory-card">
                <header><span><Pill /></span><div><strong>{item.name}</strong><small>{item.scientificName}</small></div><span className={`pharmacy-badge tone-${meta.tone}`}>{meta.label}</span></header>
                <div className="pharmacy-inventory-card-meta"><span><small>التركيز</small><strong>{item.concentration}</strong></span><span><small>الفئة</small><strong>{item.category}</strong></span><span><small>السعر</small><strong>{formatCurrency(item.salePrice)}</strong></span><span><small>الصلاحية</small><strong>{formatDate(item.expiry)}</strong></span></div>
                <div className="pharmacy-mobile-stock-adjust"><button type="button" onClick={() => adjustQuantity(item, -1)}><Minus /></button><div><small>الكمية الحالية</small><strong>{item.quantity}</strong><span>الحد الأدنى {item.minQuantity}</span></div><button type="button" onClick={() => adjustQuantity(item, 1)}><Plus /></button></div>
                <footer><button type="button" onClick={() => openEdit(item)}><Edit3 /> تعديل</button><button type="button" className="danger" onClick={() => deleteMedicine(item)}><Trash2 /> حذف</button></footer>
              </article>
            );
          })}
        </div>

        {!filtered.length && <div className="pharmacy-empty-state"><Search /><h3>لا توجد أدوية مطابقة</h3><p>غيّر البحث أو التصفية، أو أضف الدواء إلى المخزون.</p><button type="button" onClick={openCreate}>إضافة دواء جديد</button></div>}
      </section>

      {modalOpen && createPortal(
        <div className="pharmacy-modal-layer pharmacy-mobile-sheet-layer" dir="rtl">
          <button type="button" className="pharmacy-modal-backdrop" onClick={() => setModalOpen(false)} aria-label="إغلاق" />
          <form className="pharmacy-modal pharmacy-medicine-modal" onSubmit={saveMedicine}>
            <header><div><span><Pill /></span><div><h2>{editingId ? 'تعديل بيانات الدواء' : 'إضافة دواء جديد'}</h2><p>أدخل معلومات الصنف والمخزون بدقة.</p></div></div><button type="button" onClick={() => setModalOpen(false)}><X /></button></header>
            <div className="pharmacy-form-grid three">
              <label><span>الاسم التجاري *</span><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
              <label><span>المادة الفعالة</span><input value={form.scientificName} onChange={(event) => setForm({ ...form, scientificName: event.target.value })} /></label>
              <label><span>التركيز</span><input value={form.concentration} onChange={(event) => setForm({ ...form, concentration: event.target.value })} placeholder="500 ملغ" /></label>
              <label><span>الشكل الدوائي</span><select value={form.form} onChange={(event) => setForm({ ...form, form: event.target.value })}><option>أقراص</option><option>كبسولات</option><option>شراب</option><option>بخاخ</option><option>حقن</option><option>كريم</option><option>مستلزم طبي</option></select></label>
              <label><span>الشركة المصنعة</span><input value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} /></label>
              <label><span>الفئة</span><input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} placeholder="مسكنات" /></label>
              <label><span>الباركود</span><input value={form.barcode} onChange={(event) => setForm({ ...form, barcode: event.target.value })} /></label>
              <label><span>رقم التشغيلة</span><input value={form.batch} onChange={(event) => setForm({ ...form, batch: event.target.value })} /></label>
              <label><span>تاريخ الصلاحية *</span><input required type="date" value={form.expiry} onChange={(event) => setForm({ ...form, expiry: event.target.value })} /></label>
              <label><span>الكمية</span><input type="number" min="0" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} /></label>
              <label><span>الحد الأدنى</span><input type="number" min="0" value={form.minQuantity} onChange={(event) => setForm({ ...form, minQuantity: event.target.value })} /></label>
              <label><span>سعر الشراء</span><input type="number" min="0" step="0.01" value={form.purchasePrice} onChange={(event) => setForm({ ...form, purchasePrice: event.target.value })} /></label>
              <label><span>سعر البيع *</span><input required type="number" min="0" step="0.01" value={form.salePrice} onChange={(event) => setForm({ ...form, salePrice: event.target.value })} /></label>
              <label className="pharmacy-check-option modal-check"><input type="checkbox" checked={form.prescription} onChange={(event) => setForm({ ...form, prescription: event.target.checked })} /><span><i /> يحتاج وصفة طبية</span></label>
            </div>
            <footer><button type="button" className="pharmacy-btn pharmacy-btn-soft" onClick={() => setModalOpen(false)}>إلغاء</button><button type="submit" className="pharmacy-btn pharmacy-btn-primary"><Plus /> {editingId ? 'حفظ التعديلات' : 'إضافة للمخزون'}</button></footer>
          </form>
        </div>,
        document.body,
      )}
    </div>
  );
}
