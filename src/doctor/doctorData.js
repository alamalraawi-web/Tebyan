export const consultations = [
  { id: 'C-1048', patient: 'سارة أحمد', age: 29, gender: 'أنثى', topic: 'طفح جلدي وحكة مستمرة', status: 'عاجلة', time: 'منذ 8 دقائق', priority: 'urgent' },
  { id: 'C-1047', patient: 'محمد علي', age: 41, gender: 'ذكر', topic: 'متابعة نتائج التحاليل', status: 'جديدة', time: 'منذ 22 دقيقة', priority: 'new' },
  { id: 'C-1046', patient: 'ريم خالد', age: 35, gender: 'أنثى', topic: 'متابعة العلاج', status: 'قيد المتابعة', time: 'منذ 45 دقيقة', priority: 'follow' },
  { id: 'C-1045', patient: 'خالد حسن', age: 52, gender: 'ذكر', topic: 'صداع متكرر ودوخة', status: 'مكتملة', time: 'أمس', priority: 'done' },
];

export const patients = [
  { id: 'P-201', name: 'سارة أحمد', age: 29, gender: 'أنثى', lastVisit: 'اليوم', condition: 'حساسية جلدية', visits: 3 },
  { id: 'P-202', name: 'محمد علي', age: 41, gender: 'ذكر', lastVisit: 'اليوم', condition: 'ارتفاع ضغط الدم', visits: 5 },
  { id: 'P-203', name: 'ريم خالد', age: 35, gender: 'أنثى', lastVisit: '2 أغسطس', condition: 'متابعة علاج', visits: 2 },
  { id: 'P-204', name: 'خالد حسن', age: 52, gender: 'ذكر', lastVisit: '1 أغسطس', condition: 'صداع نصفي', visits: 7 },
];

export const appointments = [
  { id: 'A-1', time: '10:30 ص', patient: 'أحمد عبدالله', type: 'استشارة فيديو', status: 'مؤكد' },
  { id: 'A-2', time: '12:00 م', patient: 'ليان صالح', type: 'متابعة علاج', status: 'مؤكد' },
  { id: 'A-3', time: '02:30 م', patient: 'خالد حسن', type: 'استشارة نصية', status: 'بانتظار التأكيد' },
  { id: 'A-4', time: '04:00 م', patient: 'نورة محمد', type: 'استشارة فيديو', status: 'مؤكد' },
];

export const diseases = [
  { id: 'D-1', name: 'الأكزيما', category: 'الأمراض الجلدية', symptoms: 'حكة، احمرار، جفاف', status: 'منشور' },
  { id: 'D-2', name: 'حب الشباب', category: 'الأمراض الجلدية', symptoms: 'بثور، رؤوس سوداء، التهاب', status: 'منشور' },
  { id: 'D-3', name: 'الحساسية الجلدية', category: 'الحساسية', symptoms: 'طفح، حكة، تورم', status: 'مسودة' },
];
