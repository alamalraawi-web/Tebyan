import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TibyanHeader, { TibyanLogo } from "./TibyanHeader";

const SETTINGS_STORAGE_KEY = "tibyan-app-settings-v1";

const DEFAULT_SETTINGS = {
  language: "ar",
  theme: "system",
  notificationsEnabled: true,
  appointmentReminders: true,
  reportNotifications: true,
  pharmacyNotifications: true,
  lockOnBackground: true,
  hideSensitivePreview: true,
  largeText: false,
  highContrast: false,
  reducedMotion: false,
  dataSaver: false,
  autoSync: true,
};

const LANGUAGES = [
  { code: "ar", name: "العربية", short: "AR", dir: "rtl" },
  { code: "en", name: "English", short: "EN", dir: "ltr" },
  { code: "fr", name: "Français", short: "FR", dir: "ltr" },
  { code: "es", name: "Español", short: "ES", dir: "ltr" },
  { code: "de", name: "Deutsch", short: "DE", dir: "ltr" },
  { code: "tr", name: "Türkçe", short: "TR", dir: "ltr" },
  { code: "zh", name: "中文（简体）", short: "中文", dir: "ltr" },
];

const TEXT = {
  ar: {
    settings: "إعدادات تبيان",
    settingsSubtitle: "تجربة شخصية، آمنة ومريحة",
    language: "اللغة",
    languageSub: "اختر لغة واجهة تبيان",
    appearance: "المظهر",
    appearanceSub: "الوضع النهاري والليلي",
    notifications: "الإشعارات",
    notificationsSub: "تحكم بالتنبيهات المهمة",
    privacy: "الخصوصية والأمان",
    privacySub: "حماية بياناتك ومحتواك",
    accessibility: "إمكانية الوصول",
    accessibilitySub: "تجربة أوضح وأسهل للاستخدام",
    data: "البيانات والتخزين",
    dataSub: "المزامنة واستهلاك البيانات",
    about: "حول تبيان",
    aboutSub: "معلومات التطبيق والإصدار",
    logout: "تسجيل الخروج",
    back: "رجوع",
    selectLanguage: "اختر اللغة",
    themeLight: "نهاري",
    themeDark: "ليلي",
    themeSystem: "تلقائي",
    themeHint: "الوضع التلقائي يتبع إعداد الجهاز.",
    notificationsEnabled: "الإشعارات داخل تبيان",
    appointmentReminders: "تذكير المواعيد والاستشارات",
    reportNotifications: "تنبيهات جاهزية التقارير",
    pharmacyNotifications: "تنبيهات الصيدلية والطلبات",
    lockOnBackground: "حماية التطبيق عند تركه",
    hideSensitivePreview: "إخفاء المعاينات الحساسة",
    privacyHint: "تفضيلات الخصوصية محفوظة محليًا وتتاح لبقية مكونات تبيان.",
    largeText: "تكبير النصوص",
    highContrast: "تباين أوضح",
    reducedMotion: "تقليل الحركة والمؤثرات",
    dataSaver: "توفير استهلاك البيانات",
    autoSync: "المزامنة التلقائية",
    resetSettings: "إعادة الإعدادات الافتراضية",
    dataHint: "إعادة الإعدادات لا تحذف الحساب أو التقارير أو المحادثة الحالية.",
    appName: "تبيان",
    appTagline: "صحتك أوضح",
    version: "الإصدار",
    versionValue: "1.0.0",
    aboutBody: "تبيان تجربة صحية رقمية موحدة تجمع خدماتك في واجهة واضحة وآمنة.",
    saved: "يُحفظ تلقائيًا",
    close: "إغلاق الإعدادات",
    open: "فتح إعدادات تبيان",
  },
  en: {
    settings: "Tibyan Settings", settingsSubtitle: "Personal, secure and comfortable",
    language: "Language", languageSub: "Choose Tibyan interface language",
    appearance: "Appearance", appearanceSub: "Light and dark mode",
    notifications: "Notifications", notificationsSub: "Control important alerts",
    privacy: "Privacy & Security", privacySub: "Protect your data and content",
    accessibility: "Accessibility", accessibilitySub: "A clearer, easier experience",
    data: "Data & Storage", dataSub: "Sync and data usage",
    about: "About Tibyan", aboutSub: "App and version information",
    logout: "Sign out", back: "Back", selectLanguage: "Choose language",
    themeLight: "Light", themeDark: "Dark", themeSystem: "Automatic", themeHint: "Automatic mode follows your device setting.",
    notificationsEnabled: "Tibyan notifications", appointmentReminders: "Appointments & consultations reminders",
    reportNotifications: "Report-ready alerts", pharmacyNotifications: "Pharmacy & order alerts",
    lockOnBackground: "Protect app when inactive", hideSensitivePreview: "Hide sensitive previews",
    privacyHint: "Privacy preferences are saved locally and exposed to Tibyan components.",
    largeText: "Larger text", highContrast: "Higher contrast", reducedMotion: "Reduce motion & effects",
    dataSaver: "Data saver", autoSync: "Automatic sync", resetSettings: "Restore default settings",
    dataHint: "Restoring settings does not delete your account, reports or current conversation.",
    appName: "Tibyan", appTagline: "Your health, clearer", version: "Version", versionValue: "1.0.0",
    aboutBody: "Tibyan is a unified digital health experience that brings your services together in a clear and secure interface.",
    saved: "Saved automatically", close: "Close settings", open: "Open Tibyan settings",
  },
  fr: {
    settings: "Paramètres Tibyan", settingsSubtitle: "Personnel, sûr et confortable",
    language: "Langue", languageSub: "Choisissez la langue de l’interface Tibyan",
    appearance: "Apparence", appearanceSub: "Mode clair et sombre",
    notifications: "Notifications", notificationsSub: "Gérez les alertes importantes",
    privacy: "Confidentialité et sécurité", privacySub: "Protégez vos données et votre contenu",
    accessibility: "Accessibilité", accessibilitySub: "Une expérience plus claire et simple",
    data: "Données et stockage", dataSub: "Synchronisation et consommation",
    about: "À propos de Tibyan", aboutSub: "Informations sur l’application",
    logout: "Se déconnecter", back: "Retour", selectLanguage: "Choisir la langue",
    themeLight: "Clair", themeDark: "Sombre", themeSystem: "Automatique", themeHint: "Le mode automatique suit votre appareil.",
    notificationsEnabled: "Notifications Tibyan", appointmentReminders: "Rappels des rendez-vous",
    reportNotifications: "Alertes de rapports prêts", pharmacyNotifications: "Alertes pharmacie et commandes",
    lockOnBackground: "Protéger l’application en arrière-plan", hideSensitivePreview: "Masquer les aperçus sensibles",
    privacyHint: "Les préférences de confidentialité sont enregistrées localement.",
    largeText: "Texte plus grand", highContrast: "Contraste renforcé", reducedMotion: "Réduire les animations",
    dataSaver: "Économie de données", autoSync: "Synchronisation automatique", resetSettings: "Réinitialiser les paramètres",
    dataHint: "La réinitialisation ne supprime pas votre compte, vos rapports ou la conversation actuelle.",
    appName: "Tibyan", appTagline: "Votre santé, plus claire", version: "Version", versionValue: "1.0.0",
    aboutBody: "Tibyan réunit vos services de santé dans une expérience numérique claire et sécurisée.",
    saved: "Enregistré automatiquement", close: "Fermer les paramètres", open: "Ouvrir les paramètres Tibyan",
  },
  es: {
    settings: "Ajustes de Tibyan", settingsSubtitle: "Personal, seguro y cómodo",
    language: "Idioma", languageSub: "Elige el idioma de la interfaz",
    appearance: "Apariencia", appearanceSub: "Modo claro y oscuro",
    notifications: "Notificaciones", notificationsSub: "Controla las alertas importantes",
    privacy: "Privacidad y seguridad", privacySub: "Protege tus datos y contenido",
    accessibility: "Accesibilidad", accessibilitySub: "Una experiencia más clara y sencilla",
    data: "Datos y almacenamiento", dataSub: "Sincronización y uso de datos",
    about: "Acerca de Tibyan", aboutSub: "Información de la aplicación",
    logout: "Cerrar sesión", back: "Atrás", selectLanguage: "Elegir idioma",
    themeLight: "Claro", themeDark: "Oscuro", themeSystem: "Automático", themeHint: "El modo automático sigue la configuración del dispositivo.",
    notificationsEnabled: "Notificaciones de Tibyan", appointmentReminders: "Recordatorios de citas",
    reportNotifications: "Avisos de informes listos", pharmacyNotifications: "Avisos de farmacia y pedidos",
    lockOnBackground: "Proteger la app al dejarla", hideSensitivePreview: "Ocultar vistas sensibles",
    privacyHint: "Las preferencias de privacidad se guardan localmente.",
    largeText: "Texto más grande", highContrast: "Mayor contraste", reducedMotion: "Reducir movimiento",
    dataSaver: "Ahorro de datos", autoSync: "Sincronización automática", resetSettings: "Restablecer ajustes",
    dataHint: "Restablecer los ajustes no elimina tu cuenta, informes ni la conversación actual.",
    appName: "Tibyan", appTagline: "Tu salud, más clara", version: "Versión", versionValue: "1.0.0",
    aboutBody: "Tibyan reúne tus servicios de salud en una experiencia digital clara y segura.",
    saved: "Guardado automáticamente", close: "Cerrar ajustes", open: "Abrir ajustes de Tibyan",
  },
  de: {
    settings: "Tibyan Einstellungen", settingsSubtitle: "Persönlich, sicher und komfortabel",
    language: "Sprache", languageSub: "Sprache der Tibyan-Oberfläche wählen",
    appearance: "Darstellung", appearanceSub: "Heller und dunkler Modus",
    notifications: "Benachrichtigungen", notificationsSub: "Wichtige Hinweise steuern",
    privacy: "Datenschutz & Sicherheit", privacySub: "Daten und Inhalte schützen",
    accessibility: "Barrierefreiheit", accessibilitySub: "Klarer und einfacher bedienen",
    data: "Daten & Speicher", dataSub: "Synchronisierung und Datenverbrauch",
    about: "Über Tibyan", aboutSub: "App- und Versionsinformationen",
    logout: "Abmelden", back: "Zurück", selectLanguage: "Sprache wählen",
    themeLight: "Hell", themeDark: "Dunkel", themeSystem: "Automatisch", themeHint: "Automatisch folgt den Geräteeinstellungen.",
    notificationsEnabled: "Tibyan-Benachrichtigungen", appointmentReminders: "Termin-Erinnerungen",
    reportNotifications: "Hinweise bei fertigen Berichten", pharmacyNotifications: "Apotheken- und Bestellhinweise",
    lockOnBackground: "App bei Inaktivität schützen", hideSensitivePreview: "Sensible Vorschauen ausblenden",
    privacyHint: "Datenschutzeinstellungen werden lokal gespeichert.",
    largeText: "Größere Schrift", highContrast: "Höherer Kontrast", reducedMotion: "Bewegung reduzieren",
    dataSaver: "Datensparmodus", autoSync: "Automatische Synchronisierung", resetSettings: "Standardeinstellungen wiederherstellen",
    dataHint: "Das Zurücksetzen löscht weder Konto noch Berichte oder die aktuelle Unterhaltung.",
    appName: "Tibyan", appTagline: "Gesundheit klarer", version: "Version", versionValue: "1.0.0",
    aboutBody: "Tibyan bündelt Ihre Gesundheitsdienste in einer klaren und sicheren digitalen Umgebung.",
    saved: "Automatisch gespeichert", close: "Einstellungen schließen", open: "Tibyan Einstellungen öffnen",
  },
  tr: {
    settings: "Tibyan Ayarları", settingsSubtitle: "Kişisel, güvenli ve rahat",
    language: "Dil", languageSub: "Tibyan arayüz dilini seçin",
    appearance: "Görünüm", appearanceSub: "Açık ve koyu mod",
    notifications: "Bildirimler", notificationsSub: "Önemli uyarıları yönetin",
    privacy: "Gizlilik ve Güvenlik", privacySub: "Veri ve içeriğinizi koruyun",
    accessibility: "Erişilebilirlik", accessibilitySub: "Daha net ve kolay kullanım",
    data: "Veri ve Depolama", dataSub: "Senkronizasyon ve veri kullanımı",
    about: "Tibyan Hakkında", aboutSub: "Uygulama ve sürüm bilgileri",
    logout: "Çıkış yap", back: "Geri", selectLanguage: "Dil seçin",
    themeLight: "Açık", themeDark: "Koyu", themeSystem: "Otomatik", themeHint: "Otomatik mod cihaz ayarını izler.",
    notificationsEnabled: "Tibyan bildirimleri", appointmentReminders: "Randevu hatırlatmaları",
    reportNotifications: "Rapor hazır bildirimleri", pharmacyNotifications: "Eczane ve sipariş bildirimleri",
    lockOnBackground: "Uygulamadan ayrılınca koru", hideSensitivePreview: "Hassas önizlemeleri gizle",
    privacyHint: "Gizlilik tercihleri cihazda yerel olarak saklanır.",
    largeText: "Büyük metin", highContrast: "Yüksek kontrast", reducedMotion: "Hareketi azalt",
    dataSaver: "Veri tasarrufu", autoSync: "Otomatik senkronizasyon", resetSettings: "Varsayılan ayarlara dön",
    dataHint: "Ayarları sıfırlamak hesabınızı, raporlarınızı veya mevcut konuşmayı silmez.",
    appName: "Tibyan", appTagline: "Sağlığınız daha net", version: "Sürüm", versionValue: "1.0.0",
    aboutBody: "Tibyan sağlık hizmetlerinizi açık ve güvenli bir dijital deneyimde birleştirir.",
    saved: "Otomatik kaydedilir", close: "Ayarları kapat", open: "Tibyan ayarlarını aç",
  },
  zh: {
    settings: "Tibyan 设置", settingsSubtitle: "个性、安全、舒适",
    language: "语言", languageSub: "选择 Tibyan 界面语言",
    appearance: "外观", appearanceSub: "浅色与深色模式",
    notifications: "通知", notificationsSub: "管理重要提醒",
    privacy: "隐私与安全", privacySub: "保护您的数据和内容",
    accessibility: "辅助功能", accessibilitySub: "更清晰、更易用的体验",
    data: "数据与存储", dataSub: "同步与流量使用",
    about: "关于 Tibyan", aboutSub: "应用与版本信息",
    logout: "退出登录", back: "返回", selectLanguage: "选择语言",
    themeLight: "浅色", themeDark: "深色", themeSystem: "自动", themeHint: "自动模式会跟随设备设置。",
    notificationsEnabled: "Tibyan 通知", appointmentReminders: "预约与咨询提醒",
    reportNotifications: "报告就绪提醒", pharmacyNotifications: "药房与订单提醒",
    lockOnBackground: "离开应用时保护", hideSensitivePreview: "隐藏敏感预览",
    privacyHint: "隐私偏好会保存在本机，并提供给 Tibyan 其他组件使用。",
    largeText: "放大文字", highContrast: "增强对比度", reducedMotion: "减少动画效果",
    dataSaver: "省流模式", autoSync: "自动同步", resetSettings: "恢复默认设置",
    dataHint: "恢复设置不会删除您的账户、报告或当前对话。",
    appName: "Tibyan", appTagline: "健康更清晰", version: "版本", versionValue: "1.0.0",
    aboutBody: "Tibyan 将您的健康服务整合到清晰、安全的数字体验中。",
    saved: "自动保存", close: "关闭设置", open: "打开 Tibyan 设置",
  },
};

function loadSettings() {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const stored = JSON.parse(window.localStorage.getItem(SETTINGS_STORAGE_KEY) || "{}");
    return { ...DEFAULT_SETTINGS, ...stored };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function SettingsIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21h-4v-.08A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.87.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.64 15 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.64 1.7 1.7 0 0 0 10 3.08V3h4v.08A1.7 1.7 0 0 0 15 4.64a1.7 1.7 0 0 0 1.87-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.36 9 1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z"/></svg>;
}
function GlobeIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}><circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17M12 3c2.3 2.4 3.4 5.4 3.4 9S14.3 18.6 12 21M12 3C9.7 5.4 8.6 8.4 8.6 12s1.1 6.6 3.4 9"/></svg>; }
function AppearanceIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z"/><path d="M16.5 3.5v3M15 5h3"/></svg>; }
function BellIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>; }
function ShieldIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}><path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>; }
function AccessibilityIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}><circle cx="12" cy="4" r="2"/><path d="M5 8h14M12 8v5M8 21l4-8 4 8M8 11l-3 5M16 11l3 5"/></svg>; }
function DataIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>; }
function InfoIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/></svg>; }
function LogoutIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" {...props}><path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5"/></svg>; }
function CloseIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="m6 6 12 12M18 6 6 18"/></svg>; }
function ArrowIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>; }
function ChevronIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="m9 18 6-6-6-6"/></svg>; }
function CheckIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...props}><path d="m5 12 4 4L19 6"/></svg>; }
function SunIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>; }
function MoonIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M20.4 14.3A8.4 8.4 0 0 1 9.7 3.6 8.5 8.5 0 1 0 20.4 14.3Z"/></svg>; }
function DeviceIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><rect x="4" y="4" width="16" height="12" rx="2"/><path d="M9 20h6M12 16v4"/></svg>; }

function SettingSwitch({ checked, disabled = false, onChange, label, description }) {
  return (
    <div className={`tibyan-setting-switch-row ${disabled ? "disabled" : ""}`}>
      <div className="tibyan-setting-switch-copy">
        <strong>{label}</strong>
        {description && <small>{description}</small>}
      </div>
      <button
        type="button"
        className={`tibyan-switch ${checked ? "on" : ""}`}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
      >
        <span />
      </button>
    </div>
  );
}

function IconTile({ tone, children }) {
  return <span className={`tibyan-settings-icon3d ${tone}`}>{children}</span>;
}

export default function TibyanSettings({ showHeader = true, homePath = "/home" }) {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState(null);
  const [settings, setSettings] = useState(loadSettings);

  const langMeta = LANGUAGES.find((item) => item.code === settings.language) || LANGUAGES[0];
  const t = TEXT[settings.language] || TEXT.ar;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    const root = document.documentElement;
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");

    const applyPreferences = () => {
      const resolvedTheme = settings.theme === "system"
        ? (media?.matches ? "dark" : "light")
        : settings.theme;

      root.lang = settings.language;
      root.dir = langMeta.dir;
      root.dataset.tibyanTheme = resolvedTheme;
      root.style.colorScheme = resolvedTheme;
      root.classList.toggle("tibyan-text-large", settings.largeText);
      root.classList.toggle("tibyan-high-contrast", settings.highContrast);
      root.classList.toggle("tibyan-reduced-motion", settings.reducedMotion);
      root.classList.toggle("tibyan-data-saver", settings.dataSaver);
      root.classList.toggle("tibyan-hide-sensitive-preview", settings.hideSensitivePreview);
      root.classList.toggle("tibyan-privacy-lock", settings.lockOnBackground);

      window.dispatchEvent(new CustomEvent("tibyan:settings-changed", { detail: settings }));
    };

    applyPreferences();

    if (settings.theme === "system" && media) {
      if (media.addEventListener) media.addEventListener("change", applyPreferences);
      else media.addListener?.(applyPreferences);
    }

    return () => {
      if (media?.removeEventListener) media.removeEventListener("change", applyPreferences);
      else media?.removeListener?.(applyPreferences);
    };
  }, [settings, langMeta.dir]);

  const updateSetting = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const resetSettings = () => {
    setSettings({ ...DEFAULT_SETTINGS });
    setActivePanel(null);
  };

  const logout = () => {
    localStorage.removeItem("tebyan-user");
    localStorage.removeItem("tebyan-profile");
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  const settingItems = [
    { id: "language", label: t.language, sub: t.languageSub, Icon: GlobeIcon, tone: "blue" },
    { id: "appearance", label: t.appearance, sub: t.appearanceSub, Icon: AppearanceIcon, tone: "violet" },
    { id: "notifications", label: t.notifications, sub: t.notificationsSub, Icon: BellIcon, tone: "amber" },
    { id: "privacy", label: t.privacy, sub: t.privacySub, Icon: ShieldIcon, tone: "emerald" },
    { id: "accessibility", label: t.accessibility, sub: t.accessibilitySub, Icon: AccessibilityIcon, tone: "cyan" },
    { id: "data", label: t.data, sub: t.dataSub, Icon: DataIcon, tone: "rose" },
    { id: "about", label: t.about, sub: t.aboutSub, Icon: InfoIcon, tone: "slate" },
  ];

  const renderPanel = () => {
    if (activePanel === "language") {
      return (
        <section className="tibyan-settings-detail-card">
          <PanelHeader title={t.selectLanguage} subtitle={t.languageSub} onBack={() => setActivePanel(null)} backLabel={t.back} />
          <div className="tibyan-language-list">
            {LANGUAGES.map((language) => (
              <button key={language.code} type="button" className={`tibyan-language-option ${settings.language === language.code ? "active" : ""}`} onClick={() => updateSetting("language", language.code)}>
                <span className="tibyan-language-badge">{language.short}</span>
                <strong>{language.name}</strong>
                <span className="tibyan-language-check">{settings.language === language.code && <CheckIcon />}</span>
              </button>
            ))}
          </div>
        </section>
      );
    }

    if (activePanel === "appearance") {
      const themes = [["light", t.themeLight, SunIcon], ["dark", t.themeDark, MoonIcon], ["system", t.themeSystem, DeviceIcon]];
      return (
        <section className="tibyan-settings-detail-card">
          <PanelHeader title={t.appearance} subtitle={t.appearanceSub} onBack={() => setActivePanel(null)} backLabel={t.back} />
          <div className="tibyan-theme-grid">
            {themes.map(([value, label, ThemeIcon]) => (
              <button key={value} type="button" className={`tibyan-theme-card ${settings.theme === value ? "active" : ""}`} onClick={() => updateSetting("theme", value)}>
                <span><ThemeIcon /></span><strong>{label}</strong>{settings.theme === value && <i><CheckIcon /></i>}
              </button>
            ))}
          </div>
          <p className="tibyan-settings-hint">{t.themeHint}</p>
        </section>
      );
    }

    if (activePanel === "notifications") {
      return (
        <section className="tibyan-settings-detail-card">
          <PanelHeader title={t.notifications} subtitle={t.notificationsSub} onBack={() => setActivePanel(null)} backLabel={t.back} />
          <div className="tibyan-settings-switches">
            <SettingSwitch label={t.notificationsEnabled} checked={settings.notificationsEnabled} onChange={(v) => updateSetting("notificationsEnabled", v)} />
            <SettingSwitch label={t.appointmentReminders} checked={settings.appointmentReminders} disabled={!settings.notificationsEnabled} onChange={(v) => updateSetting("appointmentReminders", v)} />
            <SettingSwitch label={t.reportNotifications} checked={settings.reportNotifications} disabled={!settings.notificationsEnabled} onChange={(v) => updateSetting("reportNotifications", v)} />
            <SettingSwitch label={t.pharmacyNotifications} checked={settings.pharmacyNotifications} disabled={!settings.notificationsEnabled} onChange={(v) => updateSetting("pharmacyNotifications", v)} />
          </div>
        </section>
      );
    }

    if (activePanel === "privacy") {
      return (
        <section className="tibyan-settings-detail-card">
          <PanelHeader title={t.privacy} subtitle={t.privacySub} onBack={() => setActivePanel(null)} backLabel={t.back} />
          <div className="tibyan-settings-switches">
            <SettingSwitch label={t.lockOnBackground} checked={settings.lockOnBackground} onChange={(v) => updateSetting("lockOnBackground", v)} />
            <SettingSwitch label={t.hideSensitivePreview} checked={settings.hideSensitivePreview} onChange={(v) => updateSetting("hideSensitivePreview", v)} />
          </div>
          <p className="tibyan-settings-hint">{t.privacyHint}</p>
        </section>
      );
    }

    if (activePanel === "accessibility") {
      return (
        <section className="tibyan-settings-detail-card">
          <PanelHeader title={t.accessibility} subtitle={t.accessibilitySub} onBack={() => setActivePanel(null)} backLabel={t.back} />
          <div className="tibyan-settings-switches">
            <SettingSwitch label={t.largeText} checked={settings.largeText} onChange={(v) => updateSetting("largeText", v)} />
            <SettingSwitch label={t.highContrast} checked={settings.highContrast} onChange={(v) => updateSetting("highContrast", v)} />
            <SettingSwitch label={t.reducedMotion} checked={settings.reducedMotion} onChange={(v) => updateSetting("reducedMotion", v)} />
          </div>
        </section>
      );
    }

    if (activePanel === "data") {
      return (
        <section className="tibyan-settings-detail-card">
          <PanelHeader title={t.data} subtitle={t.dataSub} onBack={() => setActivePanel(null)} backLabel={t.back} />
          <div className="tibyan-settings-switches">
            <SettingSwitch label={t.dataSaver} checked={settings.dataSaver} onChange={(v) => updateSetting("dataSaver", v)} />
            <SettingSwitch label={t.autoSync} checked={settings.autoSync} onChange={(v) => updateSetting("autoSync", v)} />
          </div>
          <button type="button" className="tibyan-reset-settings" onClick={resetSettings}>{t.resetSettings}</button>
          <p className="tibyan-settings-hint">{t.dataHint}</p>
        </section>
      );
    }

    if (activePanel === "about") {
      return (
        <section className="tibyan-settings-detail-card">
          <PanelHeader title={t.about} subtitle={t.aboutSub} onBack={() => setActivePanel(null)} backLabel={t.back} />
          <div className="tibyan-about-card">
            <span className="tibyan-about-logo"><TibyanLogo /></span>
            <div><strong>{t.appName}</strong><small>{t.appTagline}</small></div>
          </div>
          <p className="tibyan-about-copy">{t.aboutBody}</p>
          <div className="tibyan-about-version"><span>{t.version}</span><strong>{t.versionValue}</strong></div>
        </section>
      );
    }

    return (
      <>
        <section className="tibyan-settings-hero">
          <button type="button" className="tibyan-page-back" onClick={() => navigate(homePath)} aria-label={t.back}><ArrowIcon /></button>
          <div className="tibyan-settings-hero-icon"><SettingsIcon /></div>
          <div className="tibyan-settings-hero-copy"><strong>{t.settings}</strong><small>{t.settingsSubtitle}</small></div>
          <span className="tibyan-settings-saved"><i />{t.saved}</span>
        </section>

        <section className="tibyan-settings-grid" aria-label={t.settings}>
          {settingItems.map(({ id, label, sub, Icon, tone }) => (
            <button key={id} type="button" className="tibyan-settings-item" onClick={() => setActivePanel(id)}>
              <IconTile tone={tone}><Icon /></IconTile>
              <span className="tibyan-settings-item-copy"><strong>{label}</strong><small>{sub}</small></span>
              <ChevronIcon className="tibyan-settings-chevron" />
            </button>
          ))}
        </section>

        <button type="button" className="tibyan-settings-logout" onClick={logout}>
          <IconTile tone="danger"><LogoutIcon /></IconTile>
          <span><strong>{t.logout}</strong></span>
          <ChevronIcon />
        </button>
      </>
    );
  };

  return (
    <div className="tibyan-settings-page-shell" dir={langMeta.dir}>
      {showHeader && <TibyanHeader homePath={homePath} settingsPath="/main/settings" />}
      <main className="tibyan-settings-page">
        <div className="tibyan-settings-orb orb-one" aria-hidden="true" />
        <div className="tibyan-settings-orb orb-two" aria-hidden="true" />
        <div className="tibyan-settings-container">{renderPanel()}</div>
      </main>
      <style>{SETTINGS_STYLES}</style>
    </div>
  );
}

function PanelHeader({ title, subtitle, onBack, backLabel }) {
  return (
    <div className="tibyan-settings-subhead">
      <button type="button" className="tibyan-settings-back" onClick={onBack} aria-label={backLabel}><ArrowIcon /></button>
      <div><strong>{title}</strong><small>{subtitle}</small></div>
    </div>
  );
}

const SETTINGS_STYLES = `
  .tibyan-settings-page-shell,.tibyan-settings-page-shell *{box-sizing:border-box}
  .tibyan-settings-page-shell{min-height:100vh;font-family:var(--font-tibyan,"IBM Plex Sans Arabic"),Tahoma,Arial,sans-serif}
  .tibyan-settings-page{position:relative;min-height:calc(100vh - 76px);overflow:hidden;padding:30px 18px 56px;background:linear-gradient(180deg,#f7fbfe 0%,#eef5f9 100%);color:#315f7a}
  .tibyan-settings-container{position:relative;z-index:2;width:min(900px,100%);margin:0 auto;display:grid;gap:16px}
  .tibyan-settings-orb{position:absolute;border-radius:50%;filter:blur(1px);pointer-events:none;opacity:.42}
  .tibyan-settings-orb.orb-one{width:330px;height:330px;top:-110px;right:-90px;background:radial-gradient(circle at 35% 35%,rgba(48,207,205,.32),rgba(8,118,217,.05) 62%,transparent 70%)}
  .tibyan-settings-orb.orb-two{width:420px;height:420px;bottom:-210px;left:-170px;background:radial-gradient(circle at 45% 45%,rgba(8,118,217,.17),rgba(53,200,111,.04) 60%,transparent 72%)}

  .tibyan-settings-hero{position:relative;display:grid;grid-template-columns:46px 64px minmax(0,1fr) auto;align-items:center;gap:14px;padding:18px;border:1px solid rgba(8,118,217,.10);border-radius:26px;background:rgba(255,255,255,.90);box-shadow:0 20px 55px rgba(3,77,132,.10);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}
  .tibyan-page-back{width:44px;height:44px;display:grid;place-items:center;border:1px solid rgba(8,118,217,.10);border-radius:14px;background:#f7fcff;color:#0876d9;box-shadow:0 8px 20px rgba(3,77,132,.07)}
  .tibyan-page-back svg{width:19px;height:19px}
  [dir="ltr"] .tibyan-page-back svg{transform:scaleX(-1)}
  .tibyan-settings-hero-icon{width:64px;height:64px;display:grid;place-items:center;border-radius:21px;color:#fff;background:linear-gradient(145deg,#0876d9,#0bb8bb 58%,#35c86f);box-shadow:0 15px 34px rgba(8,118,217,.25),inset 0 1px 0 rgba(255,255,255,.45);transform:perspective(180px) rotateX(5deg) rotateY(-5deg)}
  .tibyan-settings-hero-icon svg{width:31px;height:31px;filter:drop-shadow(0 2px 2px rgba(0,50,90,.2))}
  .tibyan-settings-hero-copy strong,.tibyan-settings-hero-copy small{display:block}.tibyan-settings-hero-copy strong{color:#075b96;font-size:24px;font-weight:950}.tibyan-settings-hero-copy small{margin-top:5px;color:#7191a2;font-size:11px;font-weight:750}
  .tibyan-settings-saved{display:inline-flex;align-items:center;gap:6px;padding:7px 11px;border-radius:999px;background:#effbf4;color:#2f8b59;font-size:9px;font-weight:900;white-space:nowrap}.tibyan-settings-saved i{width:7px;height:7px;border-radius:50%;background:#35c86f;box-shadow:0 0 0 3px rgba(53,200,111,.13)}

  .tibyan-settings-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
  .tibyan-settings-item,.tibyan-settings-logout{width:100%;display:grid;grid-template-columns:56px minmax(0,1fr) 20px;align-items:center;gap:12px;padding:12px;border:1px solid rgba(7,92,145,.08);border-radius:20px;background:rgba(255,255,255,.88);color:#315f7a;text-align:start;box-shadow:0 11px 26px rgba(3,77,132,.055);transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease,background .18s ease}
  .tibyan-settings-item:hover{transform:translateY(-2px);border-color:rgba(8,118,217,.16);background:#fff;box-shadow:0 16px 34px rgba(3,77,132,.09)}
  .tibyan-settings-item-copy{min-width:0}.tibyan-settings-item-copy strong,.tibyan-settings-item-copy small{display:block}.tibyan-settings-item-copy strong{font-size:13px;font-weight:900;color:#244f69}.tibyan-settings-item-copy small{margin-top:3px;color:#8aa0ad;font-size:9.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .tibyan-settings-chevron{width:16px;height:16px;color:#a0b3be;transform:scaleX(-1)}[dir="ltr"] .tibyan-settings-chevron{transform:none}

  .tibyan-settings-icon3d{position:relative;width:54px;height:54px;display:grid;place-items:center;border-radius:18px;color:#fff;box-shadow:0 10px 20px rgba(3,77,132,.17),inset 0 1px 0 rgba(255,255,255,.54),inset 0 -9px 18px rgba(0,25,66,.12);transform:perspective(170px) rotateX(7deg) rotateY(-7deg);overflow:hidden}
  .tibyan-settings-icon3d::before{content:"";position:absolute;inset:2px 4px auto;height:45%;border-radius:14px;background:linear-gradient(180deg,rgba(255,255,255,.46),rgba(255,255,255,0));pointer-events:none}.tibyan-settings-icon3d::after{content:"";position:absolute;left:9px;right:9px;bottom:4px;height:6px;border-radius:50%;background:rgba(0,0,0,.12);filter:blur(3px)}.tibyan-settings-icon3d svg{position:relative;z-index:2;width:25px;height:25px;filter:drop-shadow(0 2px 2px rgba(0,30,60,.18))}
  .tibyan-settings-icon3d.blue{background:linear-gradient(145deg,#0a92ed,#0864d7)}.tibyan-settings-icon3d.violet{background:linear-gradient(145deg,#9b73ff,#6550d9)}.tibyan-settings-icon3d.amber{background:linear-gradient(145deg,#ffbf48,#e88a18)}.tibyan-settings-icon3d.emerald{background:linear-gradient(145deg,#45d78a,#08a888)}.tibyan-settings-icon3d.cyan{background:linear-gradient(145deg,#2bd4d4,#0798bf)}.tibyan-settings-icon3d.rose{background:linear-gradient(145deg,#ff7f9b,#df4d79)}.tibyan-settings-icon3d.slate{background:linear-gradient(145deg,#7e9db0,#47697e)}.tibyan-settings-icon3d.danger{background:linear-gradient(145deg,#ff7a7a,#d93645)}

  .tibyan-settings-logout{grid-template-columns:56px minmax(0,1fr) 20px;border-color:rgba(217,54,69,.10);background:rgba(255,248,248,.92);color:#d93645}.tibyan-settings-logout strong{font-size:13px;font-weight:900}.tibyan-settings-logout>svg{width:16px;height:16px;opacity:.55;transform:scaleX(-1)}[dir="ltr"] .tibyan-settings-logout>svg{transform:none}

  .tibyan-settings-detail-card{display:grid;gap:14px;padding:16px;border:1px solid rgba(8,118,217,.09);border-radius:26px;background:rgba(255,255,255,.90);box-shadow:0 20px 55px rgba(3,77,132,.09);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}
  .tibyan-settings-subhead{display:grid;grid-template-columns:46px minmax(0,1fr);align-items:center;gap:11px;padding:2px 2px 12px;border-bottom:1px solid rgba(7,92,145,.08)}.tibyan-settings-back{width:44px;height:44px;display:grid;place-items:center;padding:0;border:1px solid rgba(8,118,217,.10);border-radius:14px;background:#f7fcff;color:#0876d9;box-shadow:0 8px 18px rgba(3,77,132,.06)}.tibyan-settings-back svg{width:19px;height:19px}[dir="ltr"] .tibyan-settings-back svg{transform:scaleX(-1)}.tibyan-settings-subhead strong,.tibyan-settings-subhead small{display:block}.tibyan-settings-subhead strong{color:#24526d;font-size:17px;font-weight:950}.tibyan-settings-subhead small{margin-top:3px;color:#8aa2af;font-size:10px;font-weight:700}

  .tibyan-language-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.tibyan-language-option{width:100%;min-height:62px;display:grid;grid-template-columns:46px minmax(0,1fr) 26px;align-items:center;gap:10px;padding:8px 10px;border:1px solid rgba(7,92,145,.08);border-radius:17px;background:#fff;color:#315f7a;text-align:start;transition:.18s ease}.tibyan-language-option:hover{transform:translateY(-1px);box-shadow:0 9px 20px rgba(3,77,132,.06)}.tibyan-language-option.active{border-color:rgba(8,118,217,.25);background:linear-gradient(145deg,#f3fbff,#effffd);box-shadow:0 0 0 3px rgba(8,118,217,.06)}.tibyan-language-badge{width:44px;height:40px;display:grid;place-items:center;border-radius:12px;background:linear-gradient(145deg,#eef8ff,#eafffa);color:#0876d9;font-size:10px;font-weight:950}.tibyan-language-option strong{font-size:12px;font-weight:900}.tibyan-language-check{width:24px;height:24px;display:grid;place-items:center;border-radius:50%;background:#edf9f3;color:#25a05e}.tibyan-language-check:empty{background:transparent}.tibyan-language-check svg{width:14px;height:14px}

  .tibyan-theme-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.tibyan-theme-card{position:relative;min-height:112px;display:grid;place-items:center;align-content:center;gap:8px;padding:10px;border:1px solid rgba(7,92,145,.09);border-radius:19px;background:#fff;color:#497084;transition:.18s ease}.tibyan-theme-card>span{width:48px;height:48px;display:grid;place-items:center;border-radius:16px;background:linear-gradient(145deg,#edf8ff,#effff9);color:#0876d9}.tibyan-theme-card>span svg{width:24px;height:24px}.tibyan-theme-card strong{font-size:11px;font-weight:900}.tibyan-theme-card i{position:absolute;top:8px;inset-inline-end:8px;width:20px;height:20px;display:grid;place-items:center;border-radius:50%;background:#35c86f;color:#fff}.tibyan-theme-card i svg{width:12px;height:12px}.tibyan-theme-card.active{border-color:rgba(8,118,217,.28);box-shadow:0 0 0 3px rgba(8,118,217,.06),0 10px 25px rgba(3,77,132,.06)}
  .tibyan-settings-hint{margin:0;padding:11px 12px;border-radius:14px;background:rgba(8,118,217,.05);color:#7895a5;font-size:9.5px;font-weight:700;line-height:1.8}
  .tibyan-settings-switches{display:grid;gap:8px}.tibyan-setting-switch-row{min-height:66px;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:10px 12px;border:1px solid rgba(7,92,145,.08);border-radius:17px;background:#fff}.tibyan-setting-switch-row.disabled{opacity:.45}.tibyan-setting-switch-copy{min-width:0}.tibyan-setting-switch-copy strong,.tibyan-setting-switch-copy small{display:block}.tibyan-setting-switch-copy strong{color:#315f7a;font-size:12px;font-weight:900}.tibyan-setting-switch-copy small{margin-top:2px;color:#8aa2af;font-size:9px;font-weight:700}
  .tibyan-switch{position:relative;width:48px;height:28px;flex:0 0 48px;padding:0;border:0;border-radius:999px;background:#dbe7ed;box-shadow:inset 0 2px 5px rgba(44,82,105,.11);transition:.2s ease}.tibyan-switch span{position:absolute;top:3px;inset-inline-start:3px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(37,75,98,.2);transition:.2s ease}.tibyan-switch.on{background:linear-gradient(90deg,#0876d9,#0bb4ad)}.tibyan-switch.on span{inset-inline-start:23px}.tibyan-switch:disabled{cursor:not-allowed}
  .tibyan-reset-settings{width:100%;min-height:46px;padding:9px 12px;border:1px solid rgba(217,54,69,.11);border-radius:14px;background:#fff7f7;color:#c84150;font-size:11px;font-weight:900}.tibyan-reset-settings:hover{background:#fff0f0}
  .tibyan-about-card{display:flex;align-items:center;gap:14px;padding:14px;border:1px solid rgba(8,118,217,.09);border-radius:20px;background:linear-gradient(145deg,#fff,#f0fbff)}.tibyan-about-logo{width:78px;height:78px;flex:0 0 78px;display:block}.tibyan-about-logo svg{width:100%;height:100%;overflow:visible}.tibyan-about-card strong,.tibyan-about-card small{display:block}.tibyan-about-card strong{color:#075dab;font-size:20px;font-weight:950}.tibyan-about-card small{margin-top:3px;color:#59a0ae;font-size:10px;font-weight:800}.tibyan-about-copy{margin:0;padding:4px 6px;color:#648696;font-size:10.5px;font-weight:700;line-height:1.9}.tibyan-about-version{display:flex;align-items:center;justify-content:space-between;padding:12px 13px;border-radius:14px;background:#fff;color:#7593a2;font-size:10px;font-weight:800}.tibyan-about-version strong{color:#315f7a}

  html[data-tibyan-theme="dark"] body{background-color:#071521;color:#e8f3f7}html[data-tibyan-theme="dark"] .tibyan-settings-page{background:linear-gradient(180deg,#071521,#0a1d2b);color:#d7eef7}html[data-tibyan-theme="dark"] .tibyan-settings-hero,html[data-tibyan-theme="dark"] .tibyan-settings-item,html[data-tibyan-theme="dark"] .tibyan-settings-logout,html[data-tibyan-theme="dark"] .tibyan-settings-detail-card,html[data-tibyan-theme="dark"] .tibyan-language-option,html[data-tibyan-theme="dark"] .tibyan-theme-card,html[data-tibyan-theme="dark"] .tibyan-setting-switch-row,html[data-tibyan-theme="dark"] .tibyan-about-card,html[data-tibyan-theme="dark"] .tibyan-about-version,html[data-tibyan-theme="dark"] .tibyan-settings-back,html[data-tibyan-theme="dark"] .tibyan-page-back{background:#102b3c;border-color:rgba(129,216,236,.09)}html[data-tibyan-theme="dark"] .tibyan-settings-hero-copy strong,html[data-tibyan-theme="dark"] .tibyan-settings-item-copy strong,html[data-tibyan-theme="dark"] .tibyan-setting-switch-copy strong,html[data-tibyan-theme="dark"] .tibyan-settings-subhead strong,html[data-tibyan-theme="dark"] .tibyan-about-version strong{color:#d7eef7}html[data-tibyan-theme="dark"] .tibyan-settings-hero-copy small,html[data-tibyan-theme="dark"] .tibyan-settings-item-copy small,html[data-tibyan-theme="dark"] .tibyan-setting-switch-copy small,html[data-tibyan-theme="dark"] .tibyan-settings-subhead small,html[data-tibyan-theme="dark"] .tibyan-settings-hint,html[data-tibyan-theme="dark"] .tibyan-about-copy,html[data-tibyan-theme="dark"] .tibyan-about-version{color:#84a9b8}html[data-tibyan-theme="dark"] .tibyan-language-option,html[data-tibyan-theme="dark"] .tibyan-theme-card{color:#c8e1ea}
  html.tibyan-text-large body{font-size:112%}html.tibyan-high-contrast body{filter:contrast(1.08) saturate(1.04)}html.tibyan-reduced-motion *,html.tibyan-reduced-motion *::before,html.tibyan-reduced-motion *::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}

  @media(max-width:760px){.tibyan-settings-page{min-height:calc(100vh - 70px);padding:18px 10px 34px}.tibyan-settings-container{gap:10px}.tibyan-settings-hero{grid-template-columns:42px 52px minmax(0,1fr);gap:10px;padding:12px;border-radius:21px}.tibyan-settings-hero-icon{width:52px;height:52px;border-radius:18px}.tibyan-settings-hero-icon svg{width:26px;height:26px}.tibyan-settings-hero-copy strong{font-size:18px}.tibyan-settings-hero-copy small{font-size:9px}.tibyan-settings-saved{grid-column:2/-1;justify-self:start}.tibyan-settings-grid{grid-template-columns:1fr;gap:8px}.tibyan-settings-item,.tibyan-settings-logout{grid-template-columns:50px minmax(0,1fr) 18px;gap:10px;padding:9px;border-radius:17px}.tibyan-settings-icon3d{width:48px;height:48px;border-radius:16px}.tibyan-settings-icon3d svg{width:23px;height:23px}.tibyan-settings-detail-card{padding:11px;border-radius:21px}.tibyan-language-list{grid-template-columns:1fr}.tibyan-theme-grid{gap:7px}.tibyan-theme-card{min-height:96px}.tibyan-settings-subhead strong{font-size:14px}}
  @media(max-width:390px){.tibyan-settings-hero{grid-template-columns:40px 48px minmax(0,1fr);gap:8px}.tibyan-page-back{width:40px;height:40px}.tibyan-settings-hero-icon{width:48px;height:48px}.tibyan-settings-hero-copy strong{font-size:16px}.tibyan-theme-grid{grid-template-columns:1fr}.tibyan-theme-card{min-height:76px;grid-template-columns:42px 1fr auto;justify-items:start;align-content:center}.tibyan-theme-card>span{width:42px;height:42px}.tibyan-settings-item-copy small{font-size:8.5px}}
`;
