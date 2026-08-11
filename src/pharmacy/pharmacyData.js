export const ORDER_STATUSES = {
  new: { label: 'جديد', tone: 'blue' },
  reviewing: { label: 'قيد المراجعة', tone: 'orange' },
  confirmed: { label: 'تم التأكيد', tone: 'cyan' },
  preparing: { label: 'جاري التجهيز', tone: 'purple' },
  ready: { label: 'جاهز', tone: 'green' },
  delivering: { label: 'قيد التوصيل', tone: 'teal' },
  completed: { label: 'مكتمل', tone: 'success' },
  cancelled: { label: 'ملغي', tone: 'danger' },
};

export const PRESCRIPTION_STATUSES = {
  pending: { label: 'بانتظار المراجعة', tone: 'orange' },
  reviewing: { label: 'قيد المراجعة', tone: 'blue' },
  approved: { label: 'معتمدة', tone: 'success' },
  clarification: { label: 'تحتاج توضيحًا', tone: 'purple' },
  rejected: { label: 'مرفوضة', tone: 'danger' },
};

export const CONSULTATION_STATUSES = {
  new: { label: 'جديدة', tone: 'blue' },
  urgent: { label: 'عاجلة', tone: 'danger' },
  waiting: { label: 'بانتظار الرد', tone: 'orange' },
  active: { label: 'قيد المتابعة', tone: 'cyan' },
  completed: { label: 'مكتملة', tone: 'success' },
  transferred: { label: 'محولة إلى طبيب', tone: 'purple' },
};

export const INVENTORY_STATUSES = {
  available: { label: 'متوفر', tone: 'success' },
  low: { label: 'كمية منخفضة', tone: 'orange' },
  out: { label: 'غير متوفر', tone: 'danger' },
  expiring: { label: 'قريب الانتهاء', tone: 'purple' },
  expired: { label: 'منتهي الصلاحية', tone: 'danger' },
};

export const PAYMENT_LABELS = {
  cash: 'الدفع عند الاستلام',
  card: 'بطاقة بنكية',
  wallet: 'محفظة إلكترونية',
  transfer: 'تحويل بنكي',
};

export const FULFILLMENT_LABELS = {
  delivery: 'توصيل',
  pickup: 'استلام من الصيدلية',
};

export const seedOrders = [
  {
    id: 'TBY-1048',
    createdAt: '2026-08-07T01:18:00.000Z',
    status: 'new',
    priority: 'urgent',
    customer: {
      id: 'CUS-01',
      name: 'سارة عبدالله',
      phone: '050 742 1198',
      age: 31,
      address: 'حي الروضة، شارع الأمير سلطان',
      allergy: 'حساسية من البنسلين',
      chronic: 'لا يوجد',
    },
    medicines: [
      { id: 'MED-05', name: 'كلاريتين', concentration: '10 ملغ', quantity: 1, price: 28, prescription: false, availability: 'available' },
      { id: 'MED-09', name: 'بخاخ فنتولين', concentration: '100 مكغ', quantity: 1, price: 34, prescription: true, availability: 'available' },
    ],
    prescription: {
      id: 'RX-301',
      status: 'pending',
      doctor: 'د. ياسر القحطاني',
      date: '2026-08-06',
      fileName: 'prescription-1048.jpg',
      note: '',
    },
    fulfillment: 'delivery',
    payment: 'cash',
    paymentStatus: 'pending',
    deliveryFee: 15,
    discount: 0,
    notes: 'يرجى التواصل قبل الوصول.',
    timeline: [
      { id: 'TL-1', status: 'new', label: 'تم استقبال الطلب', at: '2026-08-07T01:18:00.000Z' },
    ],
  },
  {
    id: 'TBY-1047',
    createdAt: '2026-08-06T22:42:00.000Z',
    status: 'reviewing',
    priority: 'normal',
    customer: {
      id: 'CUS-02',
      name: 'محمد أمين',
      phone: '055 381 9420',
      age: 46,
      address: 'حي النخيل، طريق الملك فهد',
      allergy: 'لا توجد حساسية مسجلة',
      chronic: 'ضغط الدم',
    },
    medicines: [
      { id: 'MED-03', name: 'كونكور', concentration: '5 ملغ', quantity: 1, price: 39, prescription: true, availability: 'available' },
      { id: 'MED-01', name: 'بانادول أدفانس', concentration: '500 ملغ', quantity: 2, price: 14, prescription: false, availability: 'available' },
    ],
    prescription: {
      id: 'RX-300',
      status: 'reviewing',
      doctor: 'د. ندى السالم',
      date: '2026-08-05',
      fileName: 'rx-mohammed.pdf',
      note: 'الصورة واضحة وتحت المراجعة.',
    },
    fulfillment: 'pickup',
    payment: 'card',
    paymentStatus: 'paid',
    deliveryFee: 0,
    discount: 5,
    notes: '',
    timeline: [
      { id: 'TL-2-1', status: 'new', label: 'تم استقبال الطلب', at: '2026-08-06T22:42:00.000Z' },
      { id: 'TL-2-2', status: 'reviewing', label: 'بدأت مراجعة الطلب والوصفة', at: '2026-08-06T22:48:00.000Z' },
    ],
  },
  {
    id: 'TBY-1046',
    createdAt: '2026-08-06T20:10:00.000Z',
    status: 'confirmed',
    priority: 'normal',
    customer: {
      id: 'CUS-03',
      name: 'ريم خالد',
      phone: '053 109 8461',
      age: 27,
      address: 'حي الياسمين، شارع أنس بن مالك',
      allergy: 'لا توجد',
      chronic: 'لا يوجد',
    },
    medicines: [
      { id: 'MED-04', name: 'فيتامين د3', concentration: '5000 وحدة', quantity: 1, price: 42, prescription: false, availability: 'available' },
      { id: 'MED-07', name: 'أوميغا 3', concentration: '1000 ملغ', quantity: 1, price: 55, prescription: false, availability: 'available' },
    ],
    prescription: null,
    fulfillment: 'delivery',
    payment: 'wallet',
    paymentStatus: 'paid',
    deliveryFee: 12,
    discount: 8,
    notes: '',
    timeline: [
      { id: 'TL-3-1', status: 'new', label: 'تم استقبال الطلب', at: '2026-08-06T20:10:00.000Z' },
      { id: 'TL-3-2', status: 'confirmed', label: 'تم تأكيد توفر المنتجات', at: '2026-08-06T20:17:00.000Z' },
    ],
  },
  {
    id: 'TBY-1045',
    createdAt: '2026-08-06T17:36:00.000Z',
    status: 'preparing',
    priority: 'normal',
    customer: {
      id: 'CUS-04',
      name: 'عبدالله صالح',
      phone: '056 450 2318',
      age: 38,
      address: 'حي المروج، طريق العليا',
      allergy: 'لا توجد',
      chronic: 'سكري النوع الثاني',
    },
    medicines: [
      { id: 'MED-08', name: 'جلوكوفاج', concentration: '850 ملغ', quantity: 2, price: 31, prescription: true, availability: 'available' },
      { id: 'MED-06', name: 'شرائط قياس السكر', concentration: '50 شريط', quantity: 1, price: 89, prescription: false, availability: 'available' },
    ],
    prescription: {
      id: 'RX-299',
      status: 'approved',
      doctor: 'د. فراس الحربي',
      date: '2026-08-03',
      fileName: 'rx-abdullah.png',
      note: 'تم اعتماد الوصفة.',
    },
    fulfillment: 'pickup',
    payment: 'cash',
    paymentStatus: 'pending',
    deliveryFee: 0,
    discount: 0,
    notes: '',
    timeline: [
      { id: 'TL-4-1', status: 'new', label: 'تم استقبال الطلب', at: '2026-08-06T17:36:00.000Z' },
      { id: 'TL-4-2', status: 'reviewing', label: 'تمت مراجعة الوصفة', at: '2026-08-06T17:42:00.000Z' },
      { id: 'TL-4-3', status: 'confirmed', label: 'تم تأكيد الطلب', at: '2026-08-06T17:47:00.000Z' },
      { id: 'TL-4-4', status: 'preparing', label: 'بدأ تجهيز الطلب', at: '2026-08-06T17:55:00.000Z' },
    ],
  },
  {
    id: 'TBY-1044',
    createdAt: '2026-08-06T14:20:00.000Z',
    status: 'ready',
    priority: 'normal',
    customer: {
      id: 'CUS-05',
      name: 'منال فهد',
      phone: '054 820 7190',
      age: 41,
      address: 'حي الملز، شارع جرير',
      allergy: 'حساسية السلفا',
      chronic: 'لا يوجد',
    },
    medicines: [
      { id: 'MED-02', name: 'أوجمنتين', concentration: '625 ملغ', quantity: 1, price: 52, prescription: true, availability: 'available' },
    ],
    prescription: {
      id: 'RX-298',
      status: 'approved',
      doctor: 'د. لمياء عمر',
      date: '2026-08-06',
      fileName: 'rx-manal.jpg',
      note: '',
    },
    fulfillment: 'pickup',
    payment: 'card',
    paymentStatus: 'paid',
    deliveryFee: 0,
    discount: 0,
    notes: '',
    timeline: [
      { id: 'TL-5-1', status: 'new', label: 'تم استقبال الطلب', at: '2026-08-06T14:20:00.000Z' },
      { id: 'TL-5-2', status: 'reviewing', label: 'تمت مراجعة الوصفة', at: '2026-08-06T14:25:00.000Z' },
      { id: 'TL-5-3', status: 'confirmed', label: 'تم تأكيد الطلب', at: '2026-08-06T14:29:00.000Z' },
      { id: 'TL-5-4', status: 'preparing', label: 'بدأ تجهيز الطلب', at: '2026-08-06T14:36:00.000Z' },
      { id: 'TL-5-5', status: 'ready', label: 'الطلب جاهز للاستلام', at: '2026-08-06T14:48:00.000Z' },
    ],
  },
  {
    id: 'TBY-1043',
    createdAt: '2026-08-06T12:05:00.000Z',
    status: 'delivering',
    priority: 'normal',
    customer: {
      id: 'CUS-06',
      name: 'خالد ناصر',
      phone: '058 611 0034',
      age: 52,
      address: 'حي قرطبة، شارع خالد بن الوليد',
      allergy: 'لا توجد',
      chronic: 'ارتفاع الكوليسترول',
    },
    medicines: [
      { id: 'MED-10', name: 'ليبيتور', concentration: '20 ملغ', quantity: 1, price: 78, prescription: true, availability: 'available' },
    ],
    prescription: {
      id: 'RX-297',
      status: 'approved',
      doctor: 'د. سامي الشمري',
      date: '2026-08-01',
      fileName: 'rx-khaled.pdf',
      note: '',
    },
    fulfillment: 'delivery',
    payment: 'transfer',
    paymentStatus: 'paid',
    deliveryFee: 15,
    discount: 0,
    courier: 'أحمد سالم',
    eta: '18 دقيقة',
    notes: '',
    timeline: [
      { id: 'TL-6-1', status: 'new', label: 'تم استقبال الطلب', at: '2026-08-06T12:05:00.000Z' },
      { id: 'TL-6-2', status: 'confirmed', label: 'تم تأكيد الطلب', at: '2026-08-06T12:13:00.000Z' },
      { id: 'TL-6-3', status: 'preparing', label: 'بدأ تجهيز الطلب', at: '2026-08-06T12:20:00.000Z' },
      { id: 'TL-6-4', status: 'ready', label: 'الطلب جاهز', at: '2026-08-06T12:31:00.000Z' },
      { id: 'TL-6-5', status: 'delivering', label: 'خرج الطلب للتوصيل', at: '2026-08-06T12:38:00.000Z' },
    ],
  },
  {
    id: 'TBY-1042',
    createdAt: '2026-08-05T19:12:00.000Z',
    status: 'completed',
    priority: 'normal',
    customer: {
      id: 'CUS-07',
      name: 'هدى علي',
      phone: '050 994 1862',
      age: 35,
      address: 'حي الندى، طريق عثمان بن عفان',
      allergy: 'لا توجد',
      chronic: 'لا يوجد',
    },
    medicines: [
      { id: 'MED-01', name: 'بانادول أدفانس', concentration: '500 ملغ', quantity: 1, price: 14, prescription: false, availability: 'available' },
      { id: 'MED-11', name: 'فيتامين سي', concentration: '1000 ملغ', quantity: 1, price: 33, prescription: false, availability: 'available' },
    ],
    prescription: null,
    fulfillment: 'delivery',
    payment: 'card',
    paymentStatus: 'paid',
    deliveryFee: 12,
    discount: 0,
    notes: '',
    timeline: [
      { id: 'TL-7-1', status: 'new', label: 'تم استقبال الطلب', at: '2026-08-05T19:12:00.000Z' },
      { id: 'TL-7-2', status: 'completed', label: 'تم تسليم الطلب بنجاح', at: '2026-08-05T20:07:00.000Z' },
    ],
  },
  {
    id: 'TBY-1041',
    createdAt: '2026-08-05T16:30:00.000Z',
    status: 'cancelled',
    priority: 'normal',
    customer: {
      id: 'CUS-08',
      name: 'أمل يوسف',
      phone: '059 115 2900',
      age: 29,
      address: 'حي الملقا، شارع وادي حنيفة',
      allergy: 'لا توجد',
      chronic: 'لا يوجد',
    },
    medicines: [
      { id: 'MED-12', name: 'روأكيوتان', concentration: '20 ملغ', quantity: 1, price: 122, prescription: true, availability: 'out' },
    ],
    prescription: {
      id: 'RX-296',
      status: 'clarification',
      doctor: 'غير واضح',
      date: '2026-08-05',
      fileName: 'rx-amal-blurry.jpg',
      note: 'الصورة غير واضحة والدواء غير متوفر.',
    },
    fulfillment: 'pickup',
    payment: 'cash',
    paymentStatus: 'pending',
    deliveryFee: 0,
    discount: 0,
    notes: 'ألغته العميلة بعد عدم توفر الدواء.',
    timeline: [
      { id: 'TL-8-1', status: 'new', label: 'تم استقبال الطلب', at: '2026-08-05T16:30:00.000Z' },
      { id: 'TL-8-2', status: 'cancelled', label: 'تم إلغاء الطلب', at: '2026-08-05T16:44:00.000Z' },
    ],
  },
];

export const seedInventory = [
  { id: 'MED-01', name: 'بانادول أدفانس', scientificName: 'Paracetamol', concentration: '500 ملغ', form: 'أقراص', company: 'GSK', category: 'مسكنات', barcode: '6281001010012', quantity: 86, minQuantity: 20, purchasePrice: 9, salePrice: 14, batch: 'PA-2607', expiry: '2027-10-30', prescription: false, status: 'available' },
  { id: 'MED-02', name: 'أوجمنتين', scientificName: 'Amoxicillin/Clavulanate', concentration: '625 ملغ', form: 'أقراص', company: 'GSK', category: 'مضادات حيوية', barcode: '6281001010029', quantity: 14, minQuantity: 18, purchasePrice: 39, salePrice: 52, batch: 'AU-2604', expiry: '2027-04-18', prescription: true, status: 'low' },
  { id: 'MED-03', name: 'كونكور', scientificName: 'Bisoprolol', concentration: '5 ملغ', form: 'أقراص', company: 'Merck', category: 'ضغط وقلب', barcode: '6281001010036', quantity: 32, minQuantity: 12, purchasePrice: 29, salePrice: 39, batch: 'CO-2601', expiry: '2027-01-09', prescription: true, status: 'available' },
  { id: 'MED-04', name: 'فيتامين د3', scientificName: 'Cholecalciferol', concentration: '5000 وحدة', form: 'كبسولات', company: 'Jamieson', category: 'فيتامينات', barcode: '6281001010043', quantity: 51, minQuantity: 15, purchasePrice: 31, salePrice: 42, batch: 'VD-2512', expiry: '2026-11-22', prescription: false, status: 'expiring' },
  { id: 'MED-05', name: 'كلاريتين', scientificName: 'Loratadine', concentration: '10 ملغ', form: 'أقراص', company: 'Bayer', category: 'حساسية', barcode: '6281001010050', quantity: 40, minQuantity: 15, purchasePrice: 20, salePrice: 28, batch: 'CL-2605', expiry: '2027-05-15', prescription: false, status: 'available' },
  { id: 'MED-06', name: 'شرائط قياس السكر', scientificName: 'Glucose Test Strips', concentration: '50 شريط', form: 'مستلزم طبي', company: 'Accu-Chek', category: 'سكري', barcode: '6281001010067', quantity: 9, minQuantity: 12, purchasePrice: 69, salePrice: 89, batch: 'GS-2606', expiry: '2027-06-28', prescription: false, status: 'low' },
  { id: 'MED-07', name: 'أوميغا 3', scientificName: 'Omega-3 Fish Oil', concentration: '1000 ملغ', form: 'كبسولات', company: 'Nature Made', category: 'مكملات', barcode: '6281001010074', quantity: 25, minQuantity: 10, purchasePrice: 41, salePrice: 55, batch: 'OM-2603', expiry: '2027-03-14', prescription: false, status: 'available' },
  { id: 'MED-08', name: 'جلوكوفاج', scientificName: 'Metformin', concentration: '850 ملغ', form: 'أقراص', company: 'Merck', category: 'سكري', barcode: '6281001010081', quantity: 18, minQuantity: 12, purchasePrice: 23, salePrice: 31, batch: 'GL-2602', expiry: '2027-02-20', prescription: true, status: 'available' },
  { id: 'MED-09', name: 'بخاخ فنتولين', scientificName: 'Salbutamol', concentration: '100 مكغ', form: 'بخاخ', company: 'GSK', category: 'تنفس', barcode: '6281001010098', quantity: 7, minQuantity: 10, purchasePrice: 25, salePrice: 34, batch: 'VE-2606', expiry: '2027-06-02', prescription: true, status: 'low' },
  { id: 'MED-10', name: 'ليبيتور', scientificName: 'Atorvastatin', concentration: '20 ملغ', form: 'أقراص', company: 'Pfizer', category: 'كوليسترول', barcode: '6281001010104', quantity: 21, minQuantity: 10, purchasePrice: 59, salePrice: 78, batch: 'LI-2604', expiry: '2027-04-11', prescription: true, status: 'available' },
  { id: 'MED-11', name: 'فيتامين سي', scientificName: 'Ascorbic Acid', concentration: '1000 ملغ', form: 'فوار', company: 'Redoxon', category: 'فيتامينات', barcode: '6281001010111', quantity: 38, minQuantity: 15, purchasePrice: 24, salePrice: 33, batch: 'VC-2601', expiry: '2027-01-26', prescription: false, status: 'available' },
  { id: 'MED-12', name: 'روأكيوتان', scientificName: 'Isotretinoin', concentration: '20 ملغ', form: 'كبسولات', company: 'Roche', category: 'جلدية', barcode: '6281001010128', quantity: 0, minQuantity: 8, purchasePrice: 95, salePrice: 122, batch: 'RO-2510', expiry: '2026-10-05', prescription: true, status: 'out' },
];

export const seedConsultations = [
  {
    id: 'CON-501',
    patient: 'نورة أحمد',
    age: 26,
    phone: '053 991 4820',
    subject: 'هل يمكن الجمع بين الدواءين؟',
    medicine: 'كلاريتين + بانادول',
    status: 'urgent',
    createdAt: '2026-08-07T00:54:00.000Z',
    allergy: 'حساسية موسمية',
    chronic: 'لا يوجد',
    currentMedicines: 'لا يوجد',
    question: 'أعاني من حساسية وصداع، هل يمكن تناول كلاريتين وبانادول في الوقت نفسه؟',
    notes: [],
  },
  {
    id: 'CON-500',
    patient: 'أحمد إبراهيم',
    age: 54,
    phone: '055 470 0018',
    subject: 'طريقة استخدام البخاخ',
    medicine: 'فنتولين',
    status: 'new',
    createdAt: '2026-08-06T23:30:00.000Z',
    allergy: 'لا توجد',
    chronic: 'ربو',
    currentMedicines: 'بخاخ وقائي صباحًا ومساءً',
    question: 'ما الطريقة الصحيحة لاستخدام البخاخ وكم المدة بين البخات؟',
    notes: [],
  },
  {
    id: 'CON-499',
    patient: 'هند سليمان',
    age: 33,
    phone: '050 818 3201',
    subject: 'جرعة فيتامين د',
    medicine: 'فيتامين د3',
    status: 'waiting',
    createdAt: '2026-08-06T20:05:00.000Z',
    allergy: 'لا توجد',
    chronic: 'لا يوجد',
    currentMedicines: 'حديد',
    question: 'وصفت لي الطبيبة فيتامين د 5000، هل أتناوله يوميًا أم أسبوعيًا؟',
    notes: [{ id: 'N-1', text: 'تم طلب صورة الوصفة لتأكيد الجرعة.', at: '2026-08-06T20:12:00.000Z' }],
  },
  {
    id: 'CON-498',
    patient: 'يوسف مازن',
    age: 44,
    phone: '058 203 1189',
    subject: 'بديل دواء غير متوفر',
    medicine: 'ليبيتور 20 ملغ',
    status: 'active',
    createdAt: '2026-08-06T16:28:00.000Z',
    allergy: 'لا توجد',
    chronic: 'كوليسترول',
    currentMedicines: 'أسبرين أطفال',
    question: 'هل يوجد بديل بنفس المادة والتركيز؟',
    notes: [{ id: 'N-2', text: 'تم اقتراح بديل بنفس المادة مع توجيهه لمراجعة وصفة الطبيب.', at: '2026-08-06T16:40:00.000Z' }],
  },
  {
    id: 'CON-497',
    patient: 'ميساء عادل',
    age: 37,
    phone: '056 772 9410',
    subject: 'غثيان بعد المضاد',
    medicine: 'أوجمنتين',
    status: 'transferred',
    createdAt: '2026-08-05T18:15:00.000Z',
    allergy: 'لا توجد',
    chronic: 'لا يوجد',
    currentMedicines: 'أوجمنتين منذ يومين',
    question: 'أشعر بغثيان شديد وألم في البطن بعد الجرعة.',
    notes: [{ id: 'N-3', text: 'تم تحويل الحالة إلى الطبيب بسبب شدة الأعراض.', at: '2026-08-05T18:26:00.000Z' }],
  },
  {
    id: 'CON-496',
    patient: 'سلمان راشد',
    age: 29,
    phone: '054 112 7894',
    subject: 'توقيت المكمل الغذائي',
    medicine: 'أوميغا 3',
    status: 'completed',
    createdAt: '2026-08-05T12:44:00.000Z',
    allergy: 'لا توجد',
    chronic: 'لا يوجد',
    currentMedicines: 'لا يوجد',
    question: 'هل الأفضل تناوله قبل أم بعد الطعام؟',
    notes: [{ id: 'N-4', text: 'تمت الإجابة وإغلاق الاستشارة.', at: '2026-08-05T12:52:00.000Z' }],
  },
];

export const seedConversations = [
  {
    id: 'MSG-201',
    customerId: 'CUS-01',
    name: 'سارة عبدالله',
    phone: '050 742 1198',
    orderId: 'TBY-1048',
    online: true,
    unread: 2,
    lastAt: '2026-08-07T01:26:00.000Z',
    messages: [
      { id: 'M-1', from: 'customer', type: 'text', text: 'مساء الخير، أرسلت الوصفة مع الطلب.', at: '2026-08-07T01:20:00.000Z' },
      { id: 'M-2', from: 'customer', type: 'text', text: 'هل يمكن التأكد من توفر البخاخ؟', at: '2026-08-07T01:26:00.000Z' },
    ],
  },
  {
    id: 'MSG-200',
    customerId: 'CUS-02',
    name: 'محمد أمين',
    phone: '055 381 9420',
    orderId: 'TBY-1047',
    online: false,
    unread: 1,
    lastAt: '2026-08-06T22:55:00.000Z',
    messages: [
      { id: 'M-3', from: 'pharmacy', type: 'text', text: 'تم استلام وصفتك وبدأنا المراجعة.', at: '2026-08-06T22:49:00.000Z' },
      { id: 'M-4', from: 'customer', type: 'text', text: 'شكرًا، سأستلم الطلب من الصيدلية.', at: '2026-08-06T22:55:00.000Z' },
    ],
  },
  {
    id: 'MSG-199',
    customerId: 'CUS-04',
    name: 'عبدالله صالح',
    phone: '056 450 2318',
    orderId: 'TBY-1045',
    online: true,
    unread: 0,
    lastAt: '2026-08-06T18:02:00.000Z',
    messages: [
      { id: 'M-5', from: 'pharmacy', type: 'text', text: 'وصفة جلوكوفاج معتمدة والطلب قيد التجهيز.', at: '2026-08-06T17:52:00.000Z' },
      { id: 'M-6', from: 'customer', type: 'text', text: 'ممتاز، شكرًا لكم.', at: '2026-08-06T18:02:00.000Z' },
    ],
  },
  {
    id: 'MSG-198',
    customerId: 'CUS-05',
    name: 'منال فهد',
    phone: '054 820 7190',
    orderId: 'TBY-1044',
    online: false,
    unread: 0,
    lastAt: '2026-08-06T14:50:00.000Z',
    messages: [
      { id: 'M-7', from: 'pharmacy', type: 'text', text: 'طلبك جاهز الآن للاستلام.', at: '2026-08-06T14:49:00.000Z' },
      { id: 'M-8', from: 'customer', type: 'text', text: 'سأصل خلال نصف ساعة.', at: '2026-08-06T14:50:00.000Z' },
    ],
  },
  {
    id: 'MSG-197',
    customerId: 'CUS-06',
    name: 'خالد ناصر',
    phone: '058 611 0034',
    orderId: 'TBY-1043',
    online: false,
    unread: 0,
    lastAt: '2026-08-06T12:42:00.000Z',
    messages: [
      { id: 'M-9', from: 'pharmacy', type: 'text', text: 'المندوب في طريقه إليك، وقت الوصول المتوقع 18 دقيقة.', at: '2026-08-06T12:42:00.000Z' },
    ],
  },
];

export const seedNotifications = [
  { id: 'NOT-01', type: 'order', title: 'طلب جديد', text: 'وصل الطلب TBY-1048 من سارة عبدالله.', at: '2026-08-07T01:18:00.000Z', read: false, href: '/pharmacy/orders/TBY-1048' },
  { id: 'NOT-02', type: 'prescription', title: 'وصفة جديدة', text: 'وصفة الطلب TBY-1048 تنتظر المراجعة.', at: '2026-08-07T01:19:00.000Z', read: false, href: '/pharmacy/prescriptions' },
  { id: 'NOT-03', type: 'message', title: 'رسالتان جديدتان', text: 'سارة عبدالله أرسلت استفسارًا عن توفر البخاخ.', at: '2026-08-07T01:26:00.000Z', read: false, href: '/pharmacy/messages/MSG-201' },
  { id: 'NOT-04', type: 'stock', title: 'كمية منخفضة', text: 'وصل مخزون بخاخ فنتولين إلى 7 وحدات.', at: '2026-08-06T23:05:00.000Z', read: false, href: '/pharmacy/inventory' },
  { id: 'NOT-05', type: 'consultation', title: 'استشارة عاجلة', text: 'نورة أحمد تسأل عن الجمع بين دواءين.', at: '2026-08-07T00:54:00.000Z', read: false, href: '/pharmacy/consultations' },
  { id: 'NOT-06', type: 'delivery', title: 'خرج الطلب للتوصيل', text: 'الطلب TBY-1043 أصبح مع المندوب أحمد سالم.', at: '2026-08-06T12:38:00.000Z', read: true, href: '/pharmacy/orders/TBY-1043' },
  { id: 'NOT-07', type: 'expiry', title: 'تنبيه صلاحية', text: 'روأكيوتان يقترب من تاريخ الانتهاء وهو غير متوفر حاليًا.', at: '2026-08-06T09:00:00.000Z', read: true, href: '/pharmacy/inventory' },
  { id: 'NOT-08', type: 'order', title: 'طلب جاهز', text: 'تم تجهيز الطلب TBY-1044 وأصبح جاهزًا للاستلام.', at: '2026-08-06T14:48:00.000Z', read: true, href: '/pharmacy/orders/TBY-1044' },
];

export const seedSettings = {
  pharmacyName: '',
  pharmacyAddress: '',
  pharmacyPhone: '',
  licenseNumber: 'PH-2026-1842',
  open: true,
  alwaysOpen: false,
  openingTime: '08:00',
  closingTime: '23:30',
  deliveryEnabled: true,
  pickupEnabled: true,
  deliveryFee: 15,
  minOrder: 30,
  preparationMinutes: 25,
  paymentCash: true,
  paymentCard: true,
  paymentWallet: true,
  paymentTransfer: true,
  notifyOrders: true,
  notifyMessages: true,
  notifyStock: true,
  notifyExpiry: true,
  quietHours: false,
  quietFrom: '00:00',
  quietTo: '07:00',
};

export const reportSeries = [
  { day: 'السبت', orders: 18, sales: 1460 },
  { day: 'الأحد', orders: 23, sales: 1880 },
  { day: 'الاثنين', orders: 20, sales: 1720 },
  { day: 'الثلاثاء', orders: 28, sales: 2350 },
  { day: 'الأربعاء', orders: 31, sales: 2610 },
  { day: 'الخميس', orders: 35, sales: 3040 },
  { day: 'الجمعة', orders: 16, sales: 1380 },
];

export function formatCurrency(value) {
  const numeric = Number(value || 0);
  return `${new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 2 }).format(numeric)} ر.س`;
}

export function formatDate(value, options = {}) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('ar-SA', {
    year: options.year ?? 'numeric',
    month: options.month ?? 'short',
    day: options.day ?? 'numeric',
    ...options,
  }).format(date);
}

export function formatTime(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('ar-SA', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function formatDateTime(value) {
  return `${formatDate(value, { year: undefined })}، ${formatTime(value)}`;
}

export function orderTotal(order) {
  const subtotal = (order?.medicines || []).reduce(
    (sum, medicine) => sum + Number(medicine.price || 0) * Number(medicine.quantity || 0),
    0,
  );
  return Math.max(0, subtotal + Number(order?.deliveryFee || 0) - Number(order?.discount || 0));
}

export function getOrderStatus(status) {
  return ORDER_STATUSES[status] || { label: status || 'غير محدد', tone: 'neutral' };
}

export function getPrescriptionStatus(status) {
  return PRESCRIPTION_STATUSES[status] || { label: status || 'غير محدد', tone: 'neutral' };
}

export function getConsultationStatus(status) {
  return CONSULTATION_STATUSES[status] || { label: status || 'غير محدد', tone: 'neutral' };
}

export function getInventoryStatus(status) {
  return INVENTORY_STATUSES[status] || { label: status || 'غير محدد', tone: 'neutral' };
}

export function createInitialPharmacyData(user = {}) {
  return {
    version: 1,
    profile: {
      pharmacistName: user.fullName || 'الصيدلي',
      email: user.email || '',
      phone: user.phone || '',
      pharmacyName: user.labName || 'صيدلية تبيان',
      pharmacyAddress: user.labAddress || 'العنوان غير محدد',
    },
    orders: seedOrders,
    inventory: seedInventory,
    consultations: seedConsultations,
    conversations: seedConversations,
    notifications: seedNotifications,
    settings: {
      ...seedSettings,
      pharmacyName: user.labName || 'صيدلية تبيان',
      pharmacyAddress: user.labAddress || '',
      pharmacyPhone: user.phone || '',
    },
    reportSeries,
    lastUpdatedAt: new Date().toISOString(),
  };
}
