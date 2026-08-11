import { getCurrentUser } from '../auth/authStore';

const keyFor = (name) => `tebyan-doctor-${getCurrentUser()?.id || 'guest'}-${name}`;

const defaults = {
  consultations: [
    { id: 'C-1048', patientId: 'P-201', patient: 'سارة أحمد', age: 29, gender: 'أنثى', topic: 'طفح جلدي وحكة مستمرة', status: 'new', priority: 'urgent', createdAt: new Date().toISOString(), messages: [{ id: 1, sender: 'patient', text: 'بدأت الأعراض قبل ثلاثة أيام وأصبحت الحكة أقوى مساءً.', at: '10:12 ص' }] },
    { id: 'C-1047', patientId: 'P-202', patient: 'محمد علي', age: 41, gender: 'ذكر', topic: 'متابعة نتائج التحاليل', status: 'in_progress', priority: 'normal', createdAt: new Date(Date.now()-3600000).toISOString(), messages: [{ id: 1, sender: 'patient', text: 'أرفقت نتائج التحاليل الجديدة وأرغب بمراجعتها.', at: '09:40 ص' }] },
    { id: 'C-1046', patientId: 'P-203', patient: 'ريم خالد', age: 35, gender: 'أنثى', topic: 'متابعة العلاج', status: 'waiting', priority: 'normal', createdAt: new Date(Date.now()-7200000).toISOString(), messages: [] },
    { id: 'C-1045', patientId: 'P-204', patient: 'خالد حسن', age: 52, gender: 'ذكر', topic: 'صداع متكرر ودوخة', status: 'completed', priority: 'normal', createdAt: new Date(Date.now()-86400000).toISOString(), messages: [] },
  ],
  patients: [
    { id: 'P-201', name: 'سارة أحمد', age: 29, gender: 'أنثى', phone: '0500000201', condition: 'حساسية جلدية', visits: 3, allergies: 'البنسلين', chronic: 'لا يوجد', medications: 'لا يوجد' },
    { id: 'P-202', name: 'محمد علي', age: 41, gender: 'ذكر', phone: '0500000202', condition: 'ارتفاع ضغط الدم', visits: 5, allergies: 'لا يوجد', chronic: 'ارتفاع ضغط الدم', medications: 'دواء ضغط يومي' },
    { id: 'P-203', name: 'ريم خالد', age: 35, gender: 'أنثى', phone: '0500000203', condition: 'متابعة علاج', visits: 2, allergies: 'لا يوجد', chronic: 'لا يوجد', medications: 'علاج موضعي' },
    { id: 'P-204', name: 'خالد حسن', age: 52, gender: 'ذكر', phone: '0500000204', condition: 'صداع نصفي', visits: 7, allergies: 'لا يوجد', chronic: 'سكري من النوع الثاني', medications: 'منظم سكر' },
  ],
  appointments: [
    { id: 'A-1', date: new Date().toISOString().slice(0,10), time: '10:30', patient: 'أحمد عبدالله', type: 'استشارة فيديو', status: 'confirmed' },
    { id: 'A-2', date: new Date().toISOString().slice(0,10), time: '12:00', patient: 'ليان صالح', type: 'متابعة علاج', status: 'confirmed' },
    { id: 'A-3', date: new Date().toISOString().slice(0,10), time: '14:30', patient: 'خالد حسن', type: 'استشارة نصية', status: 'pending' },
  ],
  diseases: [
    { id: 'D-1', name: 'الأكزيما', category: 'الأمراض الجلدية', symptoms: 'حكة، احمرار، جفاف', redFlags: 'تورم الوجه أو صعوبة التنفس', status: 'published' },
    { id: 'D-2', name: 'حب الشباب', category: 'الأمراض الجلدية', symptoms: 'بثور، رؤوس سوداء، التهاب', redFlags: 'انتشار التهاب شديد أو حمى', status: 'published' },
  ],
  notifications: [
    { id: 'N-1', title: 'استشارة عاجلة جديدة', body: 'سارة أحمد أرسلت استشارة تحتاج مراجعة.', read: false, at: 'منذ 8 دقائق' },
    { id: 'N-2', title: 'موعد قريب', body: 'لديك موعد مع أحمد عبدالله الساعة 10:30.', read: false, at: 'منذ 25 دقيقة' },
    { id: 'N-3', title: 'تم إكمال استشارة', body: 'تم حفظ وإغلاق استشارة خالد حسن.', read: true, at: 'أمس' },
  ],
};

export function loadDoctorData(name) {
  try {
    const raw = localStorage.getItem(keyFor(name));
    if (raw) return JSON.parse(raw);
  } catch {}
  return structuredClone(defaults[name]);
}

export function saveDoctorData(name, value) {
  localStorage.setItem(keyFor(name), JSON.stringify(value));
  window.dispatchEvent(new CustomEvent('doctor-data-change', { detail: name }));
  return value;
}

export function updateDoctorData(name, updater) {
  const current = loadDoctorData(name);
  return saveDoctorData(name, updater(current));
}
