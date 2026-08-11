import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Calendar,
  CircleCheck,
  ClipboardList,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  PillBottle,
  Sparkles,
  Stethoscope,
  User,
  Users,
} from "lucide-react";
import { createAccount, roleHome } from "../auth/authStore.js";
import TibyanBrandLogo from "../components/TibyanBrandLogo.js";

const SPECIALTIES = [
  "باطنية",
  "قلبية",
  "أطفال",
  "جلدية",
  "عظام",
  "مخ وأعصاب",
  "نساء وتوليد",
  "أنف وأذن وحنجرة",
  "مختبر (تشخيص مخبري)",
  "أخرى",
];

function HeartPulseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />
      <path d="M3 12h4l1.4-3 3.2 7 2.1-4H21" />
    </svg>
  );
}

function StethoscopeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="M6 3v5a6 6 0 0 0 12 0V3" />
      <path d="M6 3H4M18 3h2M12 14v2a5 5 0 0 0 10 0v-1" />
      <circle cx="21" cy="12" r="2" />
    </svg>
  );
}

function ClipboardIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="M9 5H6a2 2 0 0 0-2 2v13h16V7a2 2 0 0 0-2-2h-3" />
      <path d="M9 3h6v4H9zM8 12l1.5 1.5L12 11M14 12h3M8 17l1.5 1.5L12 16M14 17h3" />
    </svg>
  );
}

function LabIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="M9 3h6M10 3v6l-5.3 8.8A2 2 0 0 0 6.4 21h11.2a2 2 0 0 0 1.7-3.2L14 9V3" />
      <path d="M7.5 16h9M10 13h4" />
    </svg>
  );
}

function PharmacyIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="m8.5 4.5 11 11a4.24 4.24 0 0 1-6 6l-11-11a4.24 4.24 0 1 1 6-6Z" />
      <path d="m7 15 8-8" />
    </svg>
  );
}

function ConsultationIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 13h3v3H8zM14 13h2M14 16h2" />
    </svg>
  );
}

const orbitIcons = [
  { Icon: HeartPulseIcon, color: "#0876d9" },
  { Icon: StethoscopeIcon, color: "#08a6b9" },
  { Icon: ClipboardIcon, color: "#116dcc" },
  { Icon: LabIcon, color: "#0a8ac8" },
  { Icon: PharmacyIcon, color: "#17aeaa" },
  { Icon: ConsultationIcon, color: "#35bd70" },
];

const roleOptions = [
  {
    value: "patient",
    label: "مريض",
    icon: User,
    description: "متابعة صحتك وفحوصاتك",
    className: "patient",
  },
  {
    value: "doctor",
    label: "طبيب",
    icon: Stethoscope,
    description: "تقديم الاستشارات والخدمات",
    className: "doctor",
  },
  {
    value: "pharmacist",
    label: "صيدلي",
    icon: PillBottle,
    description: "إدارة الصيدلية والطلبات",
    className: "pharmacist",
  },
];

function SignupLogoSection() {
  return (
    <div className="tebyan-logo-stage">
      <div className="tebyan-orbit-canvas" aria-hidden="true">
        <div className="tebyan-engineering-ring" />
        <div className="tebyan-engineering-ring reverse" />
        <div className="tebyan-energy-ring" />

        {orbitIcons.map(({ Icon, color }, index) => {
          const angle = index * 60;

          return (
            <div
              key={index}
              className="tebyan-orbit-slot"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div className="tebyan-orbit-runner">
                <div className="tebyan-orbit-anchor">
                  <div style={{ transform: `rotate(${-angle}deg)` }}>
                    <div className="tebyan-orbit-counter">
                      <div
                        className="tebyan-orbit-badge"
                        style={{ color }}
                      >
                        <Icon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="tebyan-logo-aura" />

      <div className="tebyan-logo-core">
        <TibyanBrandLogo />
      </div>
    </div>
  );
}

function SignupPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "تبيان - إنشاء حساب";
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    fullName: "",
    phone: "",
    specialty: "",
    labName: "",
    labAddress: "",
    birthDate: "",
    gender: "",
    bio: "",
    documentFile: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setNotice(null);
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0] || null;

    setFormData((current) => ({
      ...current,
      documentFile: file,
    }));

    setNotice(null);
  }

  function selectRole(role) {
    setFormData((current) => ({
      ...current,
      role,
      specialty: "",
      labName: "",
      labAddress: "",
      birthDate: "",
      gender: "",
      bio: "",
      documentFile: null,
    }));

    setNotice(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setNotice(null);

    const email = formData.email.trim().toLowerCase();
    if (!email || !formData.password || !formData.confirmPassword || !formData.fullName.trim() || !formData.phone.trim()) {
      setNotice({ type: "error", text: "أكمل جميع الحقول المطلوبة." });
      return;
    }
    if (!email.includes("@")) {
      setNotice({ type: "error", text: "أدخل بريدًا إلكترونيًا صحيحًا." });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setNotice({ type: "error", text: "كلمتا المرور غير متطابقتين." });
      return;
    }
    if (formData.password.length < 6) {
      setNotice({ type: "error", text: "كلمة المرور يجب أن تكون 6 أحرف على الأقل." });
      return;
    }
    if (formData.role === "doctor" && !formData.specialty) {
      setNotice({ type: "error", text: "اختر التخصص الطبي." });
      return;
    }
    if (formData.role === "pharmacist" && (!formData.labName.trim() || !formData.labAddress.trim())) {
      setNotice({ type: "error", text: "أدخل اسم الصيدلية وعنوانها." });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 500));
      const user = createAccount({
        email,
        password: formData.password,
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        role: formData.role,
        birthDate: formData.birthDate || null,
        gender: formData.gender || null,
        specialty: formData.specialty || null,
        labName: formData.labName.trim() || null,
        labAddress: formData.labAddress.trim() || null,
        bio: formData.bio.trim() || null,
        documentName: formData.documentFile?.name || null,
        emailConfirmed: true,
      });

      setNotice({ type: "success", text: "تم إنشاء الحساب بنجاح." });
      window.setTimeout(() => navigate(roleHome(user.role), { replace: true }), 450);
    } catch (error) {
      setNotice({
        type: "error",
        text: error?.message === "EMAIL_EXISTS" ? "هذا البريد مسجل مسبقًا. استخدم تسجيل الدخول أو بريدًا آخر." : "حدث خطأ أثناء إنشاء الحساب.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const needsDocument =
    formData.role === "doctor" ||
    formData.role === "pharmacist";

  return (
    <div dir="rtl" className="tibyan-signup-root">
      <main className="tibyan-signup-main">
        <div
          className="tibyan-signup-background"
          aria-hidden="true"
        >
          <div className="tibyan-signup-grid" />
          <div className="tibyan-signup-blob blob-one" />
          <div className="tibyan-signup-blob blob-two" />
        </div>

        <div className="tibyan-signup-wrapper">
          <section className="tibyan-signup-card">
            <SignupLogoSection />

            <div className="tibyan-signup-brand">
              <h2>تبيان</h2>

              <div className="tibyan-signup-brand-chip">
                <Sparkles size={15} />
                النظام الصحي الذكي المتكامل
              </div>
            </div>

            <div className="tibyan-signup-heading">
              <h1>إنشاء حساب جديد</h1>
              <p>
                انضم إلى منصة تبيان وابدأ رحلتك الصحية
              </p>
            </div>

            {notice && (
              <div
                role={
                  notice.type === "error"
                    ? "alert"
                    : "status"
                }
                className={
                  notice.type === "error"
                    ? "tibyan-signup-notice error"
                    : "tibyan-signup-notice success"
                }
              >
                {notice.type === "error" ? (
                  <AlertCircle size={20} />
                ) : (
                  <CircleCheck size={20} />
                )}

                <span>{notice.text}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="tibyan-signup-form"
            >
              <div className="signup-field-group">
                <label className="signup-main-label">
                  اختر دورك
                </label>

                <div className="signup-role-grid">
                  {roleOptions.map(
                    ({
                      value,
                      label,
                      icon: Icon,
                      description,
                      className,
                    }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => selectRole(value)}
                        className={
                          formData.role === value
                            ? `signup-role-card selected ${className}`
                            : `signup-role-card ${className}`
                        }
                      >
                        <span className="signup-role-icon">
                          <Icon size={21} />
                        </span>

                        <strong>{label}</strong>
                        <small>{description}</small>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="signup-field-group">
                <label
                  htmlFor="email"
                  className="signup-main-label"
                >
                  البريد الإلكتروني
                </label>

                <div className="signup-input-wrapper">
                  <Mail className="signup-input-icon" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="signup-field-group">
                <label
                  htmlFor="password"
                  className="signup-main-label"
                >
                  كلمة المرور
                </label>

                <div className="signup-input-wrapper">
                  <LockKeyhole className="signup-input-icon" />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    dir="ltr"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />

                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword
                        ? "إخفاء كلمة المرور"
                        : "إظهار كلمة المرور"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="signup-field-group">
                <label
                  htmlFor="confirmPassword"
                  className="signup-main-label"
                >
                  تأكيد كلمة المرور
                </label>

                <div className="signup-input-wrapper">
                  <LockKeyhole className="signup-input-icon" />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    dir="ltr"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "إخفاء تأكيد كلمة المرور"
                        : "إظهار تأكيد كلمة المرور"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="signup-field-group">
                <label
                  htmlFor="fullName"
                  className="signup-main-label"
                >
                  الاسم الكامل
                </label>

                <div className="signup-input-wrapper">
                  <User className="signup-input-icon" />

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="signup-field-group">
                <label
                  htmlFor="phone"
                  className="signup-main-label"
                >
                  رقم الهاتف
                </label>

                <div className="signup-input-wrapper">
                  <Phone className="signup-input-icon" />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    inputMode="tel"
                    placeholder="05xxxxxxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {formData.role === "patient" && (
                <>
                  <div className="signup-field-group">
                    <label
                      htmlFor="birthDate"
                      className="signup-main-label"
                    >
                      تاريخ الميلاد
                    </label>

                    <div className="signup-input-wrapper">
                      <Calendar className="signup-input-icon" />

                      <input
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="signup-field-group">
                    <label
                      htmlFor="gender"
                      className="signup-main-label"
                    >
                      الجنس
                    </label>

                    <div className="signup-input-wrapper">
                      <Users className="signup-input-icon" />

                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">اختر</option>
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {formData.role === "doctor" && (
                <>
                  <div className="signup-field-group">
                    <label
                      htmlFor="specialty"
                      className="signup-main-label"
                    >
                      التخصص الطبي
                    </label>

                    <div className="signup-input-wrapper">
                      <Briefcase className="signup-input-icon" />

                      <select
                        id="specialty"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          اختر تخصصك
                        </option>

                        {SPECIALTIES.map((specialty) => (
                          <option
                            key={specialty}
                            value={specialty}
                          >
                            {specialty}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {formData.specialty ===
                    "مختبر (تشخيص مخبري)" && (
                    <>
                      <div className="signup-field-group">
                        <label
                          htmlFor="labName"
                          className="signup-main-label"
                        >
                          اسم المختبر
                        </label>

                        <div className="signup-input-wrapper">
                          <ClipboardList className="signup-input-icon" />

                          <input
                            id="labName"
                            name="labName"
                            type="text"
                            placeholder="اسم المختبر"
                            value={formData.labName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="signup-field-group">
                        <label
                          htmlFor="labAddress"
                          className="signup-main-label"
                        >
                          عنوان المختبر
                        </label>

                        <div className="signup-input-wrapper">
                          <MapPin className="signup-input-icon" />

                          <input
                            id="labAddress"
                            name="labAddress"
                            type="text"
                            placeholder="عنوان المختبر"
                            value={formData.labAddress}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="signup-field-group">
                    <label
                      htmlFor="bio"
                      className="signup-main-label"
                    >
                      نبذة عنك
                    </label>

                    <textarea
                      id="bio"
                      name="bio"
                      placeholder="اكتب نبذة عن خبراتك الطبية"
                      value={formData.bio}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {formData.role === "pharmacist" && (
                <>
                  <div className="signup-field-group">
                    <label
                      htmlFor="labName"
                      className="signup-main-label"
                    >
                      اسم الصيدلية
                    </label>

                    <div className="signup-input-wrapper">
                      <ClipboardList className="signup-input-icon" />

                      <input
                        id="labName"
                        name="labName"
                        type="text"
                        placeholder="اسم الصيدلية"
                        value={formData.labName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="signup-field-group">
                    <label
                      htmlFor="labAddress"
                      className="signup-main-label"
                    >
                      عنوان الصيدلية
                    </label>

                    <div className="signup-input-wrapper">
                      <MapPin className="signup-input-icon" />

                      <input
                        id="labAddress"
                        name="labAddress"
                        type="text"
                        placeholder="عنوان الصيدلية"
                        value={formData.labAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {needsDocument && (
                <div className="signup-field-group">
                  <label
                    htmlFor="document"
                    className="signup-main-label"
                  >
                    رفع الوثيقة المهنية
                  </label>

                  <div className="signup-file-wrapper">
                    <FileText size={21} />

                    <input
                      id="document"
                      name="document"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </div>

                  <small className="signup-file-hint">
                    يسمح بملفات PDF أو صور JPG وPNG
                  </small>

                  {formData.documentFile && (
                    <small className="signup-selected-file">
                      الملف المختار:{" "}
                      {formData.documentFile.name}
                    </small>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="signup-submit-button"
              >
                {isLoading ? (
                  <>
                    <Loader2
                      className="signup-spinner"
                      size={20}
                    />
                    جاري إنشاء الحساب...
                  </>
                ) : (
                  <>
                    إنشاء حساب
                    <ArrowLeft size={20} />
                  </>
                )}
              </button>

              <p className="signup-login-link">
                لديك حساب بالفعل؟{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  سجل دخولك
                </button>
              </p>
            </form>
          </section>

          <p className="tibyan-signup-footer">
            © {new Date().getFullYear()} تبيان — جميع
            الحقوق محفوظة
          </p>
        </div>
      </main>

      <style>{`
        .tibyan-signup-root,
        .tibyan-signup-root * {
          box-sizing: border-box;
        }

        .tibyan-signup-root {
          position: fixed;
          inset: 0;
          z-index: 1;
          width: 100%;
          min-width: 0;
          height: 100vh;
          height: 100dvh;
          min-height: 100vh;
          min-height: 100dvh;
          overflow-x: hidden;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-y: contain;
          touch-action: pan-y;
          scroll-padding-bottom: max(24px, env(safe-area-inset-bottom));
          background:
            radial-gradient(circle at 88% 6%, rgba(18,183,189,.10), transparent 28%),
            radial-gradient(circle at 8% 94%, rgba(56,201,111,.09), transparent 26%),
            #f7fcff;
          color: #073b72;
          font-family: "IBM Plex Sans Arabic", Tahoma, Arial, sans-serif;
        }

        .tibyan-signup-main {
          position: relative;
          width: 100%;
          min-width: 0;
          min-height: 100%;
          height: auto;
          padding: 10px;
          overflow: visible;
        }

        .tibyan-signup-background {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .tibyan-signup-grid {
          position: absolute;
          inset: 0;
          opacity: .35;
          background-image:
            linear-gradient(rgba(8,118,217,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,118,217,.035) 1px, transparent 1px);
          background-size: 34px 34px;
        }

        .tibyan-signup-blob {
          display: none;
        }

        .tibyan-signup-wrapper {
          position: relative;
          z-index: 1;
          width: min(100%, 390px);
          margin: 0 auto;
        }

        .tibyan-signup-card {
          padding: 14px 14px 17px;
          border: 1px solid rgba(255,255,255,.9);
          border-radius: 24px;
          background: rgba(255,255,255,.94);
          box-shadow: 0 22px 60px rgba(4,70,127,.11);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .tebyan-logo-stage {
          --orbit-radius: 50px;
          position: relative;
          width: 126px;
          height: 126px;
          display: grid;
          place-items: center;
          margin: 0 auto 2px;
          isolation: isolate;
        }

        .tebyan-orbit-canvas {
          position: absolute;
          width: 126px;
          height: 126px;
          pointer-events: none;
        }

        .tebyan-engineering-ring,
        .tebyan-energy-ring {
          position: absolute;
          border-radius: 50%;
        }

        .tebyan-engineering-ring {
          inset: 0;
          border: 1px dashed rgba(10,134,199,.20);
          animation: signupSpin 22s linear infinite;
        }

        .tebyan-engineering-ring.reverse {
          inset: 14px;
          border-style: solid;
          border-color: rgba(18,183,189,.15);
          animation-direction: reverse;
          animation-duration: 16s;
        }

        .tebyan-energy-ring {
          inset: 29px;
          border: 1px solid rgba(53,200,111,.12);
          animation: signupPulse 4.5s ease-in-out infinite;
        }

        .tebyan-orbit-slot,
        .tebyan-orbit-runner {
          position: absolute;
          inset: 0;
        }

        .tebyan-orbit-runner {
          transform-origin: 50% 50%;
          animation: signupOrbit 26s linear infinite;
        }

        .tebyan-orbit-anchor {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translateX(var(--orbit-radius));
        }

        .tebyan-orbit-counter {
          animation: signupCounter 26s linear infinite;
        }

        .tebyan-orbit-badge {
          width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.92);
          border-radius: 8px;
          background: rgba(255,255,255,.98);
          box-shadow: 0 5px 12px rgba(4,77,132,.10);
        }

        .tebyan-orbit-badge svg {
          width: 13px;
          height: 13px;
        }

        .tebyan-logo-aura {
          position: absolute;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(18,183,189,.16), rgba(8,118,217,.06) 52%, transparent 72%);
          filter: blur(12px);
          animation: signupAura 5s ease-in-out infinite;
        }

        .tebyan-logo-core {
          position: relative;
          z-index: 2;
          width: 72px;
          height: 72px;
          filter: drop-shadow(0 10px 14px rgba(3,82,143,.18));
          animation: signupFloat 4.8s ease-in-out infinite;
        }

        .tebyan-logo-core svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .tibyan-signup-brand {
          text-align: center;
        }

        .tibyan-signup-brand h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 700;
          line-height: 1.1;
          background: linear-gradient(270deg,#0876d9,#0eabb8,#36c96f);
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }

        .tibyan-signup-brand-chip {
          width: fit-content;
          margin: 5px auto 0;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 9px;
          border: 1px solid rgba(18,183,189,.16);
          border-radius: 999px;
          background: #effbfb;
          color: #078c96;
          font-size: 9px;
          font-weight: 700;
        }

        .tibyan-signup-brand-chip svg {
          width: 15px;
          height: 15px;
        }

        .tibyan-signup-heading {
          margin-top: 11px;
          text-align: center;
        }

        .tibyan-signup-heading h1 {
          margin: 0;
          color: #064c91;
          font-size: 18px;
          font-weight: 800;
        }

        .tibyan-signup-heading p {
          margin: 3px 0 0;
          color: #6a8fa7;
          font-size: 9.5px;
        }

        .tibyan-signup-notice {
          margin-top: 9px;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 9px;
          border-radius: 11px;
          font-size: 9.5px;
          font-weight: 700;
        }

        .tibyan-signup-notice.error {
          border: 1px solid #fecaca;
          background: #fff5f5;
          color: #991b1b;
        }

        .tibyan-signup-notice.success {
          border: 1px solid #a7f3d0;
          background: #f0fdf7;
          color: #065f46;
        }

        .tibyan-signup-notice svg {
          width: 16px;
          height: 16px;
          flex: 0 0 16px;
        }

        .tibyan-signup-form {
          display: grid;
          gap: 9px;
          margin-top: 12px;
        }

        .signup-field-group {
          display: grid;
          gap: 5px;
        }

        .signup-main-label {
          color: #064c91;
          font-size: 10px;
          font-weight: 800;
        }

        .signup-role-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px;
        }

        .signup-role-card {
          min-width: 0;
          min-height: 76px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding: 7px 4px;
          border: 1px solid rgba(8,118,217,.12);
          border-radius: 13px;
          background: #fff;
          color: #567c94;
          font-family: inherit;
          text-align: center;
          box-shadow: 0 6px 15px rgba(3,77,132,.05);
          transition: .2s ease;
        }

        .signup-role-card.selected {
          border-color: rgba(8,118,217,.40);
          background: linear-gradient(145deg,#eff8ff,#edfffb);
          color: #0876d9;
          box-shadow: 0 8px 18px rgba(8,118,217,.11);
        }

        .signup-role-icon {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          background: #eef8ff;
          color: #0876d9;
        }

        .signup-role-card.selected .signup-role-icon {
          color: #fff;
          background: linear-gradient(145deg,#0876d9,#10b5b5);
        }

        .signup-role-icon svg {
          width: 15px;
          height: 15px;
        }

        .signup-role-card strong {
          font-size: 10px;
          font-weight: 800;
        }

        .signup-role-card small {
          display: none;
        }

        .signup-input-wrapper {
          position: relative;
        }

        .signup-input-wrapper input,
        .signup-input-wrapper select,
        .signup-field-group textarea {
          width: 100%;
          min-height: 40px;
          border: 1px solid rgba(10,134,199,.15);
          border-radius: 12px;
          outline: none;
          background: #fff;
          color: #315f7a;
          font-family: inherit;
          font-size: 11px;
          box-shadow: 0 4px 11px rgba(4,77,132,.035);
          transition: .2s ease;
        }

        .signup-input-wrapper input,
        .signup-input-wrapper select {
          height: 40px;
          padding: 0 37px;
        }

        .signup-input-wrapper select {
          appearance: none;
        }

        .signup-field-group textarea {
          min-height: 72px;
          padding: 10px 11px;
          resize: vertical;
        }

        .signup-input-wrapper input:focus,
        .signup-input-wrapper select:focus,
        .signup-field-group textarea:focus {
          border-color: rgba(8,118,217,.55);
          box-shadow: 0 0 0 3px rgba(8,118,217,.07);
        }

        .signup-input-icon {
          position: absolute;
          top: 50%;
          right: 12px;
          width: 16px;
          height: 16px;
          transform: translateY(-50%);
          color: #7a9bad;
          pointer-events: none;
        }

        .signup-password-toggle {
          position: absolute;
          top: 50%;
          left: 5px;
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          transform: translateY(-50%);
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #7a9bad;
        }

        .signup-password-toggle svg {
          width: 16px;
          height: 16px;
        }

        .signup-file-wrapper {
          position: relative;
          min-height: 45px;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 10px;
          border: 1px dashed rgba(8,118,217,.25);
          border-radius: 12px;
          background: #f8fdff;
          color: #0876d9;
        }

        .signup-file-wrapper svg {
          width: 17px;
          height: 17px;
          flex: 0 0 17px;
        }

        .signup-file-wrapper input {
          min-width: 0;
          width: 100%;
          font-family: inherit;
          font-size: 9px;
          color: #567c94;
        }

        .signup-file-hint,
        .signup-selected-file {
          color: #7b9bad;
          font-size: 8px;
          line-height: 1.5;
        }

        .signup-selected-file {
          color: #079267;
          font-weight: 700;
        }

        .signup-submit-button {
          width: 100%;
          height: 41px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 2px;
          border: 0;
          border-radius: 12px;
          background: linear-gradient(270deg,#0876d9,#0caab8);
          color: #fff;
          font-family: inherit;
          font-size: 12px;
          font-weight: 800;
          box-shadow: 0 11px 24px rgba(8,118,217,.20);
        }

        .signup-submit-button:disabled {
          opacity: .7;
          cursor: wait;
        }

        .signup-submit-button svg {
          width: 17px;
          height: 17px;
        }

        .signup-spinner {
          animation: signupSpin .75s linear infinite;
        }

        .signup-login-link {
          margin: 2px 0 0;
          text-align: center;
          color: #7394a8;
          font-size: 9.5px;
        }

        .signup-login-link button {
          border: 0;
          background: transparent;
          color: #0876d9;
          font-family: inherit;
          font-size: inherit;
          font-weight: 800;
        }

        .tibyan-signup-footer {
          margin: 8px 0 0;
          text-align: center;
          color: #93adbd;
          font-size: 8px;
        }

        .tibyan-heartbeat {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: signupHeartbeat 4.2s ease-in-out infinite;
        }

        .tibyan-leaf {
          transform-box: fill-box;
          transform-origin: 50% 80%;
          animation: signupLeaf 4.8s ease-in-out infinite;
        }

        @keyframes signupSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes signupOrbit {
          to { transform: rotate(360deg); }
        }

        @keyframes signupCounter {
          to { transform: rotate(-360deg); }
        }

        @keyframes signupPulse {
          0%,100% { opacity:.45; transform:scale(.96); }
          50% { opacity:1; transform:scale(1.04); }
        }

        @keyframes signupAura {
          0%,100% { opacity:.5; transform:scale(.92); }
          50% { opacity:1; transform:scale(1.05); }
        }

        @keyframes signupFloat {
          0%,100% { transform:translateY(0) rotate(0); }
          50% { transform:translateY(-4px) rotate(.8deg); }
        }

        @keyframes signupHeartbeat {
          0%,14% { stroke-dashoffset:260; opacity:.35; }
          44%,78% { stroke-dashoffset:0; opacity:1; }
          100% { stroke-dashoffset:-260; opacity:.35; }
        }

        @keyframes signupLeaf {
          0%,100% { transform:rotate(0) scale(1); }
          50% { transform:rotate(1deg) scale(1.012); }
        }

        @media (min-width: 700px) {
          .tibyan-signup-wrapper {
            width: min(100%, 470px);
          }

          .tibyan-signup-card {
            padding: 18px 22px 21px;
          }

          .tebyan-logo-stage {
            --orbit-radius: 55px;
            width: 138px;
            height: 138px;
          }

          .tebyan-orbit-canvas {
            width: 138px;
            height: 138px;
          }

          .tebyan-logo-core {
            width: 78px;
            height: 78px;
          }
        }

        @media (max-width: 360px) {
          .tibyan-signup-main {
            padding: 6px;
          }

          .tibyan-signup-card {
            padding: 11px 10px 14px;
            border-radius: 20px;
          }

          .tebyan-logo-stage {
            --orbit-radius: 36px;
            width: 92px;
            height: 92px;
          }

          .tebyan-logo-core {
            width: 51px;
            height: 51px;
          }

          .tebyan-orbit-badge {
            width: 19px;
            height: 19px;
          }

          .tebyan-orbit-badge svg {
            width: 10px;
            height: 10px;
          }

          .signup-role-grid {
            gap: 4px;
          }

          .signup-role-card {
            min-height: 69px;
            padding-inline: 2px;
          }

          .signup-role-card strong {
            font-size: 9px;
          }
        }


        /* Mobile-first polish: keeps the original visual identity */
        @media (max-width: 767px) {
          .tebyan-login-main,
          .signup-main {
            align-items: flex-start !important;
            padding: max(12px, env(safe-area-inset-top)) 12px max(20px, env(safe-area-inset-bottom)) !important;
          }

          .tebyan-login-wrapper,
          .signup-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
          }

          .tebyan-login-card,
          .signup-card {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 24px !important;
            padding: 18px 16px 20px !important;
            overflow: hidden !important;
          }

          .tebyan-logo-stage {
            min-height: 172px !important;
            height: 172px !important;
            margin: -4px auto 2px !important;
            transform: scale(.88);
            transform-origin: center center;
          }

          .tebyan-logo-core,
          .tebyan-logo-core {
            width: 124px !important;
            height: 124px !important;
          }

          .tebyan-orbit-canvas {
            width: 170px !important;
            height: 170px !important;
          }

          .tebyan-login-brand h2,
          .signup-brand h2 {
            font-size: 28px !important;
          }

          .tebyan-login-heading h1,
          .signup-heading h1 {
            font-size: 25px !important;
            line-height: 1.3 !important;
          }

          .tebyan-login-heading p,
          .signup-heading p {
            font-size: 14px !important;
            line-height: 1.8 !important;
          }

          .tebyan-login-form,
          .signup-form {
            gap: 14px !important;
          }

          .tebyan-input-wrapper,
          .signup-input-wrapper {
            min-height: 54px !important;
            border-radius: 16px !important;
          }

          .tebyan-input-wrapper input,
          .signup-input-wrapper input,
          .signup-input-wrapper select,
          .signup-input-wrapper textarea {
            min-height: 52px !important;
            font-size: 16px !important;
          }

          .tebyan-submit-button,
          .signup-submit-button {
            min-height: 54px !important;
            border-radius: 17px !important;
            font-size: 16px !important;
          }

          .signup-role-grid,
          .role-options-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }

          .tebyan-login-options {
            align-items: center !important;
            gap: 10px !important;
          }
        }

        @media (max-width: 380px) {
          .tebyan-login-card,
          .signup-card {
            padding-inline: 12px !important;
            border-radius: 20px !important;
          }

          .tebyan-logo-stage {
            transform: scale(.78);
            margin-block: -14px -8px !important;
          }

          .tebyan-login-heading h1,
          .signup-heading h1 {
            font-size: 22px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tebyan-engineering-ring,
          .tebyan-energy-ring,
          .tebyan-orbit-runner,
          .tebyan-orbit-counter,
          .tebyan-logo-aura,
          .tebyan-logo-core,
          .tibyan-heartbeat,
          .tibyan-leaf,
          .signup-spinner {
            animation: none !important;
          }
        }
      
        @media (max-width: 520px) {
          .tebyan-login-main, .tibyan-signup-main { min-height: 100dvh; align-items: flex-start; padding: 10px 8px 22px; }
          .tebyan-login-wrapper, .tibyan-signup-wrapper { width: 100%; }
          .tebyan-login-card, .tibyan-signup-card { width: 100%; border-radius: 24px; padding-left: 14px; padding-right: 14px; box-shadow: 0 20px 55px rgba(5,78,133,.14); }
          .tebyan-input-wrapper input, .tibyan-input-wrapper input, .tibyan-input-wrapper select, .tibyan-input-wrapper textarea { font-size: 16px !important; min-height: 52px; }
          .tebyan-submit-button, .tibyan-submit-button { min-height: 54px; font-size: 15px; }
          .tebyan-logo-stage { max-height: 190px; }
        }


        /* طبقة الاستجابة النهائية للهاتف مع الحفاظ على التصميم الأصلي */
        .tibyan-signup-root {
          position: fixed;
          inset: 0;
          width: 100%;
          min-width: 0;
          height: 100vh;
          height: 100dvh;
          min-height: 100dvh;
          overflow-x: hidden;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-y: contain;
          touch-action: pan-y;
        }

        .tibyan-signup-main,
        .tibyan-signup-wrapper,
        .tibyan-signup-card,
        .tibyan-signup-form,
        .signup-field-group,
        .signup-input-wrapper {
          min-width: 0;
          max-width: 100%;
        }

        .tibyan-signup-main {
          width: 100%;
          min-height: 100%;
          height: auto;
          overflow: visible;
        }

        .tibyan-signup-card {
          width: 100%;
          overflow: hidden;
        }

        .signup-input-wrapper input,
        .signup-input-wrapper select,
        .signup-field-group textarea,
        .signup-file-wrapper input {
          min-width: 0;
          max-width: 100%;
        }

        @media (max-width: 767px) {
          .tibyan-signup-main {
            padding:
              max(10px, env(safe-area-inset-top))
              max(10px, env(safe-area-inset-right))
              max(20px, env(safe-area-inset-bottom))
              max(10px, env(safe-area-inset-left)) !important;
          }

          .tibyan-signup-wrapper {
            width: 100% !important;
            max-width: 440px !important;
            margin-inline: auto !important;
            padding-bottom: max(10px, env(safe-area-inset-bottom));
          }

          .tibyan-signup-card {
            width: 100% !important;
            padding: 17px 15px 20px !important;
            border-radius: 23px !important;
          }

          .tebyan-logo-stage {
            --orbit-radius: 51px;
            width: 132px !important;
            height: 132px !important;
            min-height: 132px !important;
            max-height: none !important;
            margin: -2px auto 1px !important;
            transform: none !important;
          }

          .tebyan-orbit-canvas {
            width: 132px !important;
            height: 132px !important;
          }

          .tebyan-logo-core {
            width: 76px !important;
            height: 76px !important;
          }

          .tebyan-logo-aura {
            width: 91px !important;
            height: 91px !important;
          }

          .tebyan-orbit-badge {
            width: 24px;
            height: 24px;
            border-radius: 8px;
          }

          .tebyan-orbit-badge svg {
            width: 13px;
            height: 13px;
          }

          .tibyan-signup-brand h2 {
            font-size: 26px !important;
          }

          .tibyan-signup-heading {
            margin-top: 13px;
          }

          .tibyan-signup-heading h1 {
            font-size: 23px !important;
            line-height: 1.35 !important;
          }

          .tibyan-signup-heading p {
            max-width: 320px;
            font-size: 13px !important;
            line-height: 1.75 !important;
          }

          .tibyan-signup-notice {
            font-size: 12px;
            line-height: 1.65;
          }

          .tibyan-signup-form {
            gap: 13px !important;
            margin-top: 14px;
          }

          .signup-field-group {
            gap: 7px;
          }

          .signup-main-label {
            font-size: 12.5px;
          }

          .signup-role-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 8px !important;
          }

          .signup-role-card {
            min-height: 88px;
            padding: 9px 5px;
            border-radius: 15px;
          }

          .signup-role-icon {
            width: 34px;
            height: 34px;
            border-radius: 10px;
          }

          .signup-role-icon svg {
            width: 18px;
            height: 18px;
          }

          .signup-role-card strong {
            font-size: 12px;
          }

          .signup-input-wrapper {
            min-height: 52px !important;
            border-radius: 15px !important;
          }

          .signup-input-wrapper input,
          .signup-input-wrapper select {
            width: 100% !important;
            min-height: 52px !important;
            height: 52px !important;
            padding-right: 43px;
            padding-left: 43px;
            border-radius: 15px;
            font-size: 16px !important;
          }

          .signup-field-group textarea {
            min-height: 96px !important;
            border-radius: 15px;
            padding: 13px;
            font-size: 16px !important;
          }

          .signup-input-icon {
            right: 14px;
            width: 18px;
            height: 18px;
          }

          .signup-password-toggle {
            left: 7px;
            width: 38px;
            height: 38px;
            border-radius: 11px;
          }

          .signup-file-wrapper {
            min-height: 56px;
            padding: 10px 12px;
            border-radius: 15px;
          }

          .signup-file-wrapper input {
            font-size: 12px;
          }

          .signup-file-hint,
          .signup-selected-file {
            font-size: 10.5px;
          }

          .signup-submit-button {
            min-height: 54px !important;
            height: 54px !important;
            border-radius: 16px !important;
            font-size: 15px !important;
          }

          .signup-login-link {
            font-size: 12px;
            line-height: 1.7;
          }

          .tibyan-signup-footer {
            margin-top: 10px;
            font-size: 10px;
          }
        }

        @media (max-width: 420px) {
          .tibyan-signup-card {
            padding-inline: 13px !important;
          }

          .signup-role-grid {
            grid-template-columns: 1fr !important;
          }

          .signup-role-card {
            min-height: 68px;
            display: grid;
            grid-template-columns: 42px minmax(0,1fr);
            grid-template-rows: auto auto;
            column-gap: 10px;
            row-gap: 1px;
            justify-items: start;
            align-content: center;
            text-align: right;
            padding: 9px 12px;
          }

          .signup-role-icon {
            grid-row: 1 / 3;
            align-self: center;
          }

          .signup-role-card small {
            display: block;
            color: #7898aa;
            font-size: 10px;
            line-height: 1.4;
          }

          .signup-role-card.selected small {
            color: #4e83a6;
          }
        }

        @media (max-width: 370px) {
          .tebyan-logo-stage {
            --orbit-radius: 45px;
            width: 116px !important;
            height: 116px !important;
            min-height: 116px !important;
          }

          .tebyan-orbit-canvas {
            width: 116px !important;
            height: 116px !important;
          }

          .tebyan-logo-core {
            width: 68px !important;
            height: 68px !important;
          }
        }

        @media (max-width: 767px) and (max-height: 680px) {
          .tebyan-logo-stage {
            --orbit-radius: 43px;
            width: 112px !important;
            height: 112px !important;
            min-height: 112px !important;
          }

          .tebyan-orbit-canvas {
            width: 112px !important;
            height: 112px !important;
          }

          .tebyan-logo-core {
            width: 65px !important;
            height: 65px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tibyan-signup-grid,
          .tebyan-engineering-ring,
          .tebyan-energy-ring,
          .tebyan-orbit-runner,
          .tebyan-orbit-counter,
          .tebyan-logo-aura,
          .tebyan-logo-core,
          .tibyan-heartbeat,
          .tibyan-leaf,
          .signup-spinner {
            animation: none !important;
          }
        }


        /* إصلاح نهائي لتمرير صفحة إنشاء الحساب على الكمبيوتر والهاتف */
        html,
        body,
        #root {
          min-height: 100% !important;
          height: auto !important;
          max-height: none !important;
          overflow-x: hidden !important;
          overflow-y: auto !important;
        }

        body {
          margin: 0 !important;
        }

        .tibyan-signup-root {
          position: relative !important;
          inset: auto !important;
          width: 100% !important;
          min-height: 100vh !important;
          min-height: 100dvh !important;
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
          overscroll-behavior-y: auto !important;
          touch-action: auto !important;
        }

        .tibyan-signup-main {
          position: relative !important;
          display: block !important;
          width: 100% !important;
          min-height: 100vh !important;
          min-height: 100dvh !important;
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
          padding-bottom: max(28px, env(safe-area-inset-bottom)) !important;
        }

        .tibyan-signup-wrapper,
        .tibyan-signup-form {
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
        }

        .tibyan-signup-wrapper {
          padding-bottom: max(12px, env(safe-area-inset-bottom));
        }

        .tibyan-signup-card {
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
        }

`}</style>

    </div>
  );
}

export default SignupPage;