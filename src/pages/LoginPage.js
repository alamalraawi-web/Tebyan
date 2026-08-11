import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Apple,
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  Eye,
  EyeOff,
  HelpCircle,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { login, roleHome } from "../auth/authStore.js";
import TibyanBrandLogo from "../components/TibyanBrandLogo.js";
const REMEMBERED_EMAIL_KEY = "tebyan.remembered-email";

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

function Checkbox({
  id,
  checked,
  disabled = false,
  onCheckedChange,
}) {
  return (
    <span className="tebyan-checkbox-container">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) =>
          onCheckedChange(event.target.checked)
        }
      />

      <span
        className={
          checked
            ? "tebyan-checkbox checked"
            : "tebyan-checkbox"
        }
      >
        {checked && (
          <Check size={14} strokeWidth={3} />
        )}
      </span>
    </span>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M21.805 10.023h-9.766v3.955h5.617c-.242 1.274-.969 2.352-2.063 3.079v2.563h3.344c1.957-1.804 3.086-4.461 3.086-7.622 0-.675-.062-1.335-.218-1.975Z"
      />

      <path
        fill="#34A853"
        d="M12.04 22c2.788 0 5.13-.922 6.897-2.38l-3.344-2.563c-.922.618-2.102.985-3.554.985-2.687 0-4.968-1.82-5.785-4.265H2.8v2.648A10.42 10.42 0 0 0 12.04 22Z"
      />

      <path
        fill="#FBBC05"
        d="M6.254 13.777A6.265 6.265 0 0 1 5.93 12c0-.617.11-1.219.324-1.777V7.575H2.8A10.043 10.043 0 0 0 1.961 12c0 1.594.379 3.102.84 4.425l3.453-2.648Z"
      />

      <path
        fill="#EA4335"
        d="M12.04 5.958c1.523 0 2.89.524 3.968 1.555l2.977-2.977C17.18 2.852 14.828 2 12.039 2A10.42 10.42 0 0 0 2.8 7.575l3.454 2.648c.817-2.445 3.098-4.265 5.785-4.265Z"
      />
    </svg>
  );
}

const orbitIcons = [
  {
    Icon: HeartPulseIcon,
    color: "#0876d9",
  },
  {
    Icon: StethoscopeIcon,
    color: "#08a6b9",
  },
  {
    Icon: ClipboardIcon,
    color: "#116dcc",
  },
  {
    Icon: LabIcon,
    color: "#0a8ac8",
  },
  {
    Icon: PharmacyIcon,
    color: "#17aeaa",
  },
  {
    Icon: ConsultationIcon,
    color: "#35bd70",
  },
];

const USERS_STORAGE_KEY = "tebyan-users";
const LEGACY_ACCOUNT_KEYS = ["tebyan-user", "tebyan-profile"];
const RESET_CODE_LENGTH = 6;
const LOCAL_RESET_CODE = "246810";

function readStoredValue(key, fallback = null) {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    return fallback;
  }
}

function readStoredUsers() {
  const users = readStoredValue(USERS_STORAGE_KEY, []);
  return Array.isArray(users) ? users : [];
}

function findStoredAccount(emailValue) {
  const email = emailValue.trim().toLowerCase();
  const account = readStoredUsers().find(
    (user) => user?.email?.trim().toLowerCase() === email
  );

  if (account) return account;

  for (const key of LEGACY_ACCOUNT_KEYS) {
    const legacyAccount = readStoredValue(key, null);
    if (
      legacyAccount?.email?.trim().toLowerCase() === email
    ) {
      return legacyAccount;
    }
  }

  return null;
}

function updateStoredPassword(emailValue, password) {
  const email = emailValue.trim().toLowerCase();
  const updatedAt = new Date().toISOString();
  const users = readStoredUsers();
  let accountFound = false;

  let updatedUsers = users.map((user) => {
    if (user?.email?.trim().toLowerCase() !== email) {
      return user;
    }

    accountFound = true;
    return {
      ...user,
      password,
      updatedAt,
    };
  });

  if (!accountFound) {
    const legacyAccount = LEGACY_ACCOUNT_KEYS
      .map((key) => readStoredValue(key, null))
      .find(
        (account) =>
          account?.email?.trim().toLowerCase() === email
      );

    if (legacyAccount) {
      accountFound = true;
      updatedUsers = [
        ...updatedUsers,
        {
          ...legacyAccount,
          id:
            legacyAccount.id ||
            globalThis.crypto?.randomUUID?.() ||
            `recovered-${Date.now()}`,
          email,
          password,
          updatedAt,
          createdAt:
            legacyAccount.createdAt || updatedAt,
        },
      ];
    }
  }

  if (!accountFound) return false;

  localStorage.setItem(
    USERS_STORAGE_KEY,
    JSON.stringify(updatedUsers)
  );

  for (const key of LEGACY_ACCOUNT_KEYS) {
    const legacyAccount = readStoredValue(key, null);
    if (
      legacyAccount?.email?.trim().toLowerCase() === email
    ) {
      localStorage.setItem(
        key,
        JSON.stringify({
          ...legacyAccount,
          password,
          updatedAt,
        })
      );
    }
  }

  return true;
}

function createEmptyResetCode() {
  return Array.from(
    { length: RESET_CODE_LENGTH },
    () => ""
  );
}

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberEmail, setRememberEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null);
  const [notice, setNotice] = useState(null);

  const [authView, setAuthView] = useState("login");
  const [resetStep, setResetStep] = useState(1);
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState(
    createEmptyResetCode
  );
  const [issuedResetCode, setIssuedResetCode] =
    useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] =
    useState("");
  const [showNewPassword, setShowNewPassword] =
    useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    useState(false);
  const resetCodeRefs = useRef([]);

  const isBusy = loadingAction !== null;
  const isRecovery = authView === "recovery";
  const enteredResetCode = resetCode.join("");
  const passwordStrength = [
    newPassword.length >= 6,
    /[A-Za-z\u0600-\u06FF]/.test(newPassword),
    /\d/.test(newPassword),
  ].filter(Boolean).length;

  const recoveryCopy = {
    1: {
      title: "استعادة كلمة المرور",
      description:
        "أدخل بريد الحساب وسنجهّز لك رمز التحقق بأمان.",
    },
    2: {
      title: "تحقق من الرمز",
      description: `أدخل الرمز المكوّن من 6 أرقام لحساب ${resetEmail}.`,
    },
    3: {
      title: "أنشئ كلمة مرور جديدة",
      description:
        "اختر كلمة مرور واضحة وآمنة ثم أكّدها.",
    },
    4: {
      title: "تمت استعادة الحساب",
      description:
        "تم حفظ كلمة المرور الجديدة ويمكنك الدخول الآن.",
    },
  };

  useEffect(() => {
    document.title = isRecovery
      ? "تبيان - استعادة كلمة المرور"
      : "تبيان - تسجيل الدخول";
  }, [isRecovery]);

  useEffect(() => {
    try {
      const rememberedEmail = localStorage.getItem(
        REMEMBERED_EMAIL_KEY
      );

      if (rememberedEmail) {
        setFormData((current) => ({
          ...current,
          email: rememberedEmail,
        }));
        setRememberEmail(true);
      }
    } catch (error) {
      console.warn("تعذر قراءة البريد المحفوظ:", error);
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setNotice(null);
  }

  function resetRecoveryState({ keepEmail = false } = {}) {
    if (!keepEmail) setResetEmail("");
    setResetStep(1);
    setResetCode(createEmptyResetCode());
    setIssuedResetCode("");
    setNewPassword("");
    setConfirmNewPassword("");
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
  }

  function openRecovery() {
    resetRecoveryState();
    setResetEmail(formData.email.trim().toLowerCase());
    setAuthView("recovery");
    setNotice(null);
  }

  function closeRecovery() {
    setAuthView("login");
    resetRecoveryState();
    setLoadingAction(null);
    setNotice(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setNotice({
        type: "error",
        text: "أدخل البريد الإلكتروني وكلمة المرور.",
      });
      return;
    }

    if (!email.includes("@")) {
      setNotice({
        type: "error",
        text: "أدخل بريدًا إلكترونيًا صحيحًا.",
      });
      return;
    }

    setLoadingAction("password");
    setNotice(null);

    try {
      await new Promise((resolve) =>
        window.setTimeout(resolve, 450)
      );

      if (rememberEmail) {
        localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
      } else {
        localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }

      const user = login(email, password);
      setNotice({
        type: "success",
        text: "تم تسجيل الدخول بنجاح.",
      });

      window.setTimeout(() => {
        navigate(roleHome(user.role), { replace: true });
      }, 350);
    } catch (error) {
      setNotice({
        type: "error",
        text:
          error?.message === "INVALID_CREDENTIALS"
            ? "البريد الإلكتروني أو كلمة المرور غير صحيحة."
            : "تعذر تسجيل الدخول حاليًا.",
      });
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleSocialLogin(provider) {
    setLoadingAction(provider);
    setNotice(null);

    try {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 800);
      });

      const providerName =
        provider === "google" ? "Google" : "Apple";

      localStorage.setItem(
        "tebyan-user",
        JSON.stringify({
          email: `${provider}@example.com`,
          provider,
          loggedIn: true,
          emailConfirmed: true,
        })
      );

      setNotice({
        type: "success",
        text: `تم تسجيل الدخول بواسطة ${providerName}.`,
      });

      window.setTimeout(() => {
        navigate("/home", { replace: true });
      }, 500);
    } catch {
      setNotice({
        type: "error",
        text: "تعذر تسجيل الدخول بهذه الطريقة.",
      });
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleRecoveryEmailSubmit(event) {
    event.preventDefault();
    const email = resetEmail.trim().toLowerCase();

    if (!email || !email.includes("@")) {
      setNotice({
        type: "error",
        text: "أدخل بريدًا إلكترونيًا صحيحًا.",
      });
      return;
    }

    if (!findStoredAccount(email)) {
      setNotice({
        type: "error",
        text: "لا يوجد حساب مسجل بهذا البريد الإلكتروني.",
      });
      return;
    }

    setLoadingAction("recovery-email");
    setNotice(null);

    try {
      await new Promise((resolve) =>
        window.setTimeout(resolve, 500)
      );
      setResetEmail(email);
      setIssuedResetCode(LOCAL_RESET_CODE);
      setResetCode(createEmptyResetCode());
      setResetStep(2);
      setNotice({
        type: "success",
        text: "تم تجهيز رمز التحقق بنجاح.",
      });
      window.setTimeout(() => {
        resetCodeRefs.current[0]?.focus();
      }, 80);
    } finally {
      setLoadingAction(null);
    }
  }

  function handleResetCodeChange(index, value) {
    const cleanValue = value.replace(/\D/g, "").slice(-1);
    const nextCode = [...resetCode];
    nextCode[index] = cleanValue;
    setResetCode(nextCode);
    setNotice(null);

    if (cleanValue && index < RESET_CODE_LENGTH - 1) {
      resetCodeRefs.current[index + 1]?.focus();
    }
  }

  function handleResetCodeKeyDown(index, event) {
    if (
      event.key === "Backspace" &&
      !resetCode[index] &&
      index > 0
    ) {
      resetCodeRefs.current[index - 1]?.focus();
    }
  }

  function handleResetCodePaste(event) {
    const pastedCode = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, RESET_CODE_LENGTH);

    if (!pastedCode) return;

    event.preventDefault();
    const nextCode = createEmptyResetCode();
    pastedCode.split("").forEach((digit, index) => {
      nextCode[index] = digit;
    });
    setResetCode(nextCode);
    resetCodeRefs.current[
      Math.min(pastedCode.length, RESET_CODE_LENGTH) - 1
    ]?.focus();
  }

  function handleVerifyResetCode(event) {
    event.preventDefault();

    if (enteredResetCode.length !== RESET_CODE_LENGTH) {
      setNotice({
        type: "error",
        text: "أدخل رمز التحقق كاملًا.",
      });
      return;
    }

    if (enteredResetCode !== issuedResetCode) {
      setNotice({
        type: "error",
        text: "رمز التحقق غير صحيح. حاول مرة أخرى.",
      });
      return;
    }

    setNotice(null);
    setResetStep(3);
  }

  async function resendResetCode() {
    setLoadingAction("resend-code");
    setNotice(null);

    try {
      await new Promise((resolve) =>
        window.setTimeout(resolve, 420)
      );
      setIssuedResetCode(LOCAL_RESET_CODE);
      setResetCode(createEmptyResetCode());
      setNotice({
        type: "success",
        text: "تم تجهيز رمز تحقق جديد.",
      });
      window.setTimeout(() => {
        resetCodeRefs.current[0]?.focus();
      }, 80);
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleNewPasswordSubmit(event) {
    event.preventDefault();

    if (newPassword.length < 6) {
      setNotice({
        type: "error",
        text: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setNotice({
        type: "error",
        text: "كلمتا المرور غير متطابقتين.",
      });
      return;
    }

    setLoadingAction("save-password");
    setNotice(null);

    try {
      await new Promise((resolve) =>
        window.setTimeout(resolve, 480)
      );

      if (!updateStoredPassword(resetEmail, newPassword)) {
        setNotice({
          type: "error",
          text: "تعذر العثور على الحساب. أعد المحاولة من البداية.",
        });
        setResetStep(1);
        return;
      }

      setResetStep(4);
    } finally {
      setLoadingAction(null);
    }
  }

  function completeRecovery() {
    setFormData((current) => ({
      ...current,
      email: resetEmail,
      password: "",
    }));
    setAuthView("login");
    resetRecoveryState();
    setNotice({
      type: "success",
      text: "تم تحديث كلمة المرور. سجّل دخولك بالكلمة الجديدة.",
    });
  }

  return (
    <div dir="rtl" className="tebyan-login-root">
      <main className="tebyan-login-main">
        <div
          className="tebyan-login-background"
          aria-hidden="true"
        >
          <div className="tebyan-login-grid" />
          <div className="tebyan-login-blob tebyan-login-blob-one" />
          <div className="tebyan-login-blob tebyan-login-blob-two" />
        </div>

        <div className="tebyan-login-wrapper">
          <section
            className={
              isRecovery
                ? "tebyan-login-card recovery-mode"
                : "tebyan-login-card"
            }
          >
            {isRecovery && (
              <button
                type="button"
                className="tebyan-recovery-back"
                onClick={closeRecovery}
                disabled={isBusy}
              >
                <ArrowRight size={15} />
                العودة للدخول
              </button>
            )}

            <div className="tebyan-logo-stage">
              <div
                className="tebyan-orbit-canvas"
                aria-hidden="true"
              >
                <div className="tebyan-engineering-ring" />
                <div className="tebyan-engineering-ring reverse" />
                <div className="tebyan-energy-ring" />

                {orbitIcons.map(({ Icon, color }, index) => {
                  const angle = index * 60;

                  return (
                    <div
                      key={index}
                      className="tebyan-orbit-slot"
                      style={{
                        transform: `rotate(${angle}deg)`,
                      }}
                    >
                      <div className="tebyan-orbit-runner">
                        <div className="tebyan-orbit-anchor">
                          <div
                            style={{
                              transform: `rotate(${-angle}deg)`,
                            }}
                          >
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

            <div className="tebyan-login-brand">
              <h2>تبيان</h2>
              <div className="tebyan-brand-chip">
                <Sparkles size={15} />
                النظام الصحي الذكي المتكامل
              </div>
            </div>

            <div className="tebyan-login-heading">
              <h1>
                {isRecovery
                  ? recoveryCopy[resetStep].title
                  : "تسجيل الدخول"}
              </h1>
              <p>
                {isRecovery
                  ? recoveryCopy[resetStep].description
                  : "سجّل الدخول للوصول إلى حسابك ومتابعة رحلتك الصحية."}
              </p>
            </div>

            {isRecovery && resetStep < 4 && (
              <div
                className="tebyan-recovery-progress"
                aria-label={`الخطوة ${resetStep} من 3`}
              >
                {[1, 2, 3].map((step) => (
                  <span
                    key={step}
                    className={
                      step < resetStep
                        ? "done"
                        : step === resetStep
                          ? "active"
                          : ""
                    }
                  />
                ))}
              </div>
            )}

            <div
              className="tebyan-notice-area"
              aria-live="polite"
            >
              {notice && (
                <div
                  role={
                    notice.type === "error"
                      ? "alert"
                      : "status"
                  }
                  className={
                    notice.type === "error"
                      ? "tebyan-notice error"
                      : "tebyan-notice success"
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
            </div>

            {!isRecovery ? (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="tebyan-login-form"
                >
                  <label className="tebyan-field">
                    <span>البريد الإلكتروني</span>
                    <div className="tebyan-input-wrapper">
                      <Mail
                        className="tebyan-input-icon"
                        size={20}
                      />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        dir="ltr"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isBusy}
                        required
                      />
                    </div>
                  </label>

                  <label className="tebyan-field">
                    <span>كلمة المرور</span>
                    <div className="tebyan-input-wrapper">
                      <LockKeyhole
                        className="tebyan-input-icon"
                        size={20}
                      />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        dir="ltr"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isBusy}
                        required
                      />
                      <button
                        type="button"
                        className="tebyan-password-toggle"
                        onClick={() =>
                          setShowPassword((current) => !current)
                        }
                        disabled={isBusy}
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

                    <button
                      type="button"
                      className="tebyan-forgot-password"
                      onClick={openRecovery}
                      disabled={isBusy}
                    >
                      <HelpCircle size={14} />
                      نسيت كلمة المرور؟
                    </button>
                  </label>

                  <label
                    htmlFor="remember-email"
                    className={
                      isBusy
                        ? "tebyan-remember disabled"
                        : "tebyan-remember"
                    }
                  >
                    <Checkbox
                      id="remember-email"
                      checked={rememberEmail}
                      disabled={isBusy}
                      onCheckedChange={setRememberEmail}
                    />
                    تذكر بريدي الإلكتروني
                  </label>

                  <button
                    type="submit"
                    className="tebyan-submit-button"
                    disabled={isBusy}
                  >
                    {loadingAction === "password" ? (
                      <>
                        <Loader2
                          className="tebyan-spinner"
                          size={20}
                        />
                        جارٍ تسجيل الدخول...
                      </>
                    ) : (
                      <>
                        تسجيل الدخول
                        <ArrowLeft size={20} />
                      </>
                    )}
                  </button>

                  <div className="tebyan-login-separator">
                    <span>أو المتابعة بواسطة</span>
                  </div>

                  <div className="tebyan-social-grid">
                    <button
                      type="button"
                      className="tebyan-social-button"
                      onClick={() => handleSocialLogin("google")}
                      disabled={isBusy}
                    >
                      {loadingAction === "google" ? (
                        <Loader2
                          className="tebyan-spinner"
                          size={20}
                        />
                      ) : (
                        <GoogleIcon />
                      )}
                      Google
                    </button>

                    <button
                      type="button"
                      className="tebyan-social-button"
                      onClick={() => handleSocialLogin("apple")}
                      disabled={isBusy}
                    >
                      {loadingAction === "apple" ? (
                        <Loader2
                          className="tebyan-spinner"
                          size={20}
                        />
                      ) : (
                        <Apple size={21} />
                      )}
                      Apple
                    </button>
                  </div>
                </form>

                <p className="tebyan-signup-link">
                  ليس لديك حساب؟{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                  >
                    إنشاء حساب جديد
                  </button>
                </p>
              </>
            ) : (
              <div className="tebyan-recovery-shell">
                {resetStep === 1 && (
                  <form
                    className="tebyan-login-form"
                    onSubmit={handleRecoveryEmailSubmit}
                  >
                    <label className="tebyan-field">
                      <span>البريد الإلكتروني المسجل</span>
                      <div className="tebyan-input-wrapper">
                        <Mail
                          className="tebyan-input-icon"
                          size={20}
                        />
                        <input
                          type="email"
                          dir="ltr"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="name@example.com"
                          value={resetEmail}
                          onChange={(event) => {
                            setResetEmail(event.target.value);
                            setNotice(null);
                          }}
                          disabled={isBusy}
                          autoFocus
                          required
                        />
                      </div>
                    </label>

                    <div className="tebyan-recovery-note">
                      <ShieldCheck size={18} />
                      <span>
                        سنطابق البريد مع الحسابات المحفوظة في
                        النسخة الحالية قبل السماح بتغيير كلمة
                        المرور.
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="tebyan-submit-button"
                      disabled={isBusy}
                    >
                      {loadingAction === "recovery-email" ? (
                        <>
                          <Loader2
                            className="tebyan-spinner"
                            size={20}
                          />
                          جارٍ التحقق...
                        </>
                      ) : (
                        <>
                          إرسال رمز التحقق
                          <Send size={19} />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {resetStep === 2 && (
                  <form
                    className="tebyan-login-form"
                    onSubmit={handleVerifyResetCode}
                  >
                    <div className="tebyan-demo-code">
                      <div>
                        <span>
                          رمز التحقق في النسخة المحلية
                        </span>
                        <strong>{issuedResetCode}</strong>
                      </div>
                      <ShieldCheck size={23} />
                    </div>

                    <div
                      className="tebyan-code-grid"
                      onPaste={handleResetCodePaste}
                    >
                      {resetCode.map((digit, index) => (
                        <input
                          key={index}
                          ref={(element) => {
                            resetCodeRefs.current[index] = element;
                          }}
                          type="text"
                          inputMode="numeric"
                          autoComplete={
                            index === 0 ? "one-time-code" : "off"
                          }
                          maxLength={1}
                          value={digit}
                          onChange={(event) =>
                            handleResetCodeChange(
                              index,
                              event.target.value
                            )
                          }
                          onKeyDown={(event) =>
                            handleResetCodeKeyDown(index, event)
                          }
                          aria-label={`الرقم ${index + 1} من رمز التحقق`}
                          disabled={isBusy}
                        />
                      ))}
                    </div>

                    <div className="tebyan-recovery-actions">
                      <button
                        type="submit"
                        className="tebyan-submit-button"
                        disabled={isBusy}
                      >
                        تأكيد الرمز
                        <KeyRound size={19} />
                      </button>

                      <button
                        type="button"
                        className="tebyan-recovery-secondary"
                        onClick={resendResetCode}
                        disabled={isBusy}
                      >
                        {loadingAction === "resend-code" ? (
                          <Loader2
                            className="tebyan-spinner"
                            size={17}
                          />
                        ) : (
                          <RefreshCw size={16} />
                        )}
                        إعادة الإرسال
                      </button>
                    </div>
                  </form>
                )}

                {resetStep === 3 && (
                  <form
                    className="tebyan-login-form"
                    onSubmit={handleNewPasswordSubmit}
                  >
                    <label className="tebyan-field">
                      <span>كلمة المرور الجديدة</span>
                      <div className="tebyan-input-wrapper">
                        <LockKeyhole
                          className="tebyan-input-icon"
                          size={20}
                        />
                        <input
                          type={
                            showNewPassword ? "text" : "password"
                          }
                          dir="ltr"
                          autoComplete="new-password"
                          placeholder="6 أحرف على الأقل"
                          value={newPassword}
                          onChange={(event) => {
                            setNewPassword(event.target.value);
                            setNotice(null);
                          }}
                          disabled={isBusy}
                          minLength={6}
                          required
                        />
                        <button
                          type="button"
                          className="tebyan-password-toggle"
                          onClick={() =>
                            setShowNewPassword(
                              (current) => !current
                            )
                          }
                          disabled={isBusy}
                          aria-label={
                            showNewPassword
                              ? "إخفاء كلمة المرور الجديدة"
                              : "إظهار كلمة المرور الجديدة"
                          }
                        >
                          {showNewPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </label>

                    <div className="tebyan-password-strength">
                      <div className="tebyan-password-strength-bars">
                        {[1, 2, 3].map((level) => (
                          <span
                            key={level}
                            className={
                              passwordStrength >= level ? "on" : ""
                            }
                          />
                        ))}
                      </div>
                      <small>
                        استخدم 6 أحرف على الأقل، ويفضل الجمع بين
                        الحروف والأرقام.
                      </small>
                    </div>

                    <label className="tebyan-field">
                      <span>تأكيد كلمة المرور</span>
                      <div className="tebyan-input-wrapper">
                        <KeyRound
                          className="tebyan-input-icon"
                          size={20}
                        />
                        <input
                          type={
                            showConfirmNewPassword
                              ? "text"
                              : "password"
                          }
                          dir="ltr"
                          autoComplete="new-password"
                          placeholder="أعد كتابة كلمة المرور"
                          value={confirmNewPassword}
                          onChange={(event) => {
                            setConfirmNewPassword(
                              event.target.value
                            );
                            setNotice(null);
                          }}
                          disabled={isBusy}
                          required
                        />
                        <button
                          type="button"
                          className="tebyan-password-toggle"
                          onClick={() =>
                            setShowConfirmNewPassword(
                              (current) => !current
                            )
                          }
                          disabled={isBusy}
                          aria-label={
                            showConfirmNewPassword
                              ? "إخفاء تأكيد كلمة المرور"
                              : "إظهار تأكيد كلمة المرور"
                          }
                        >
                          {showConfirmNewPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </label>

                    <button
                      type="submit"
                      className="tebyan-submit-button"
                      disabled={isBusy}
                    >
                      {loadingAction === "save-password" ? (
                        <>
                          <Loader2
                            className="tebyan-spinner"
                            size={20}
                          />
                          جارٍ الحفظ...
                        </>
                      ) : (
                        <>
                          حفظ كلمة المرور
                          <ArrowLeft size={20} />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {resetStep === 4 && (
                  <div className="tebyan-recovery-success">
                    <div className="tebyan-recovery-success-icon">
                      <CircleCheck size={34} />
                    </div>
                    <h3>كلمة المرور جاهزة</h3>
                    <p>
                      تم تحديث بيانات حسابك بنجاح. استخدم كلمة
                      المرور الجديدة عند تسجيل الدخول.
                    </p>
                    <button
                      type="button"
                      className="tebyan-submit-button"
                      onClick={completeRecovery}
                    >
                      تسجيل الدخول الآن
                      <ArrowLeft size={20} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>

          <p className="tebyan-login-footer">
            © {new Date().getFullYear()} تبيان — جميع الحقوق
            محفوظة
          </p>
        </div>
      </main>

      <style>{`
        .tebyan-login-root,
        .tebyan-login-root *,
        .tebyan-login-root *::before,
        .tebyan-login-root *::after {
          box-sizing: border-box;
        }

        html,
        body {
          max-width: 100%;
          overflow-x: hidden;
        }

        .tebyan-login-root button,
        .tebyan-login-root input {
          max-width: 100%;
          font: inherit;
        }

        .tebyan-login-root {
          width: 100%;
          min-width: 0;
          min-height: 100vh;
          min-height: 100dvh;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 85% 8%, rgba(18,183,189,.12), transparent 28%),
            radial-gradient(circle at 8% 92%, rgba(56,201,111,.10), transparent 26%),
            #f7fcff;
          color: #073b72;
          font-family: "IBM Plex Sans Arabic", Tahoma, Arial, sans-serif;
        }

        .tebyan-login-main {
          position: relative;
          width: 100%;
          min-width: 0;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          overflow: hidden;
        }

        .tebyan-login-background {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .tebyan-login-grid {
          position: absolute;
          inset: 0;
          opacity: .42;
          background-image:
            linear-gradient(rgba(8,118,217,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,118,217,.035) 1px, transparent 1px);
          background-size: 36px 36px;
          animation: elegantGrid 22s linear infinite;
        }

        .tebyan-login-blob {
          display: none;
        }

        .tebyan-login-wrapper {
          position: relative;
          z-index: 1;
          width: min(100%, 390px);
          min-width: 0;
          margin-inline: auto;
        }

        .tebyan-login-card {
          width: 100%;
          min-width: 0;
          padding: 18px 18px 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.82);
          border-radius: 26px;
          background: rgba(255,255,255,.92);
          box-shadow:
            0 24px 65px rgba(4,70,127,.12),
            inset 0 1px 0 rgba(255,255,255,.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
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

        .tebyan-engineering-ring {
          position: absolute;
          inset: 0;
          border: 1px dashed rgba(10,134,199,.20);
          border-radius: 50%;
          animation: elegantSpin 22s linear infinite;
        }

        .tebyan-engineering-ring.reverse {
          inset: 14px;
          border-style: solid;
          border-color: rgba(18,183,189,.15);
          animation-direction: reverse;
          animation-duration: 16s;
        }

        .tebyan-energy-ring {
          position: absolute;
          inset: 29px;
          border: 1px solid rgba(53,200,111,.12);
          border-radius: 50%;
          animation: elegantPulse 4.5s ease-in-out infinite;
        }

        .tebyan-orbit-slot,
        .tebyan-orbit-runner {
          position: absolute;
          inset: 0;
        }

        .tebyan-orbit-runner {
          transform-origin: 50% 50%;
          animation: elegantOrbit 26s linear infinite;
        }

        .tebyan-orbit-anchor {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translateX(var(--orbit-radius));
        }

        .tebyan-orbit-counter {
          animation: elegantCounter 26s linear infinite;
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
          animation: elegantAura 5s ease-in-out infinite;
        }

        .tebyan-logo-core {
          position: relative;
          z-index: 2;
          width: 72px;
          height: 72px;
          filter: drop-shadow(0 10px 14px rgba(3,82,143,.18));
          animation: elegantFloat 4.8s ease-in-out infinite;
        }

        .tebyan-logo-core svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .tibyan-heartbeat {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: elegantHeartbeat 4.2s ease-in-out infinite;
        }

        .tibyan-leaf {
          transform-box: fill-box;
          transform-origin: 50% 80%;
          animation: elegantLeaf 4.8s ease-in-out infinite;
        }

        .tebyan-login-brand {
          text-align: center;
        }

        .tebyan-login-brand h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 700;
          line-height: 1.1;
          background: linear-gradient(270deg,#0876d9,#0eabb8,#36c96f);
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }

        .tebyan-brand-chip {
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

        .tebyan-login-heading {
          margin-top: 14px;
          text-align: center;
        }

        .tebyan-login-heading h1 {
          margin: 0;
          color: #064c91;
          font-size: 20px;
          font-weight: 700;
        }

        .tebyan-login-heading p {
          margin: 4px auto 0;
          max-width: 270px;
          color: #64879d;
          font-size: 10.5px;
          line-height: 1.65;
        }

        .tebyan-notice-area {
          min-height: 1px;
          margin-top: 10px;
        }

        .tebyan-notice {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 10px;
          border-radius: 12px;
          font-size: 10.5px;
          font-weight: 600;
        }

        .tebyan-notice.error {
          border: 1px solid #fecaca;
          background: #fff5f5;
          color: #991b1b;
        }

        .tebyan-notice.success {
          border: 1px solid #a7f3d0;
          background: #f0fdf7;
          color: #065f46;
        }

        .tebyan-login-form {
          width: 100%;
          min-width: 0;
          display: grid;
          gap: 11px;
          margin-top: 12px;
        }

        .tebyan-field {
          width: 100%;
          min-width: 0;
          display: grid;
          gap: 6px;
        }

        .tebyan-field > span {
          color: #064c91;
          font-size: 11px;
          font-weight: 700;
        }

        .tebyan-input-wrapper {
          position: relative;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          overflow: hidden;
          border-radius: 13px;
        }

        .tebyan-input-wrapper input {
          display: block;
          width: 100% !important;
          min-width: 0 !important;
          max-width: 100% !important;
          height: 43px;
          margin: 0 !important;
          padding: 0 42px !important;
          border: 1px solid rgba(10,134,199,.16);
          border-radius: 13px;
          outline: none;
          background: #fff;
          color: #315f7a;
          font-family: inherit;
          font-size: 16px;
          line-height: 1;
          box-shadow: 0 4px 12px rgba(4,77,132,.04);
          direction: ltr;
          text-align: left;
          -webkit-appearance: none;
          appearance: none;
          transition: .2s ease;
        }

        .tebyan-input-wrapper input:focus {
          border-color: rgba(8,118,217,.58);
          box-shadow: 0 0 0 3px rgba(8,118,217,.08);
        }

        .tebyan-input-icon {
          position: absolute;
          z-index: 2;
          top: 50%;
          right: 13px;
          width: 17px;
          height: 17px;
          transform: translateY(-50%);
          color: #7a9bad;
          pointer-events: none;
        }

        .tebyan-password-toggle {
          position: absolute;
          z-index: 3;
          top: 50%;
          left: 7px;
          width: 31px;
          height: 31px;
          display: grid;
          place-items: center;
          transform: translateY(-50%);
          border: 0;
          border-radius: 9px;
          background: transparent;
          color: #7a9bad;
        }

        .tebyan-forgot-password {
          width: fit-content;
          margin-right: auto;
          display: inline-flex;
          align-items: center;
          gap: 3px;
          border: 0;
          background: transparent;
          color: #0876d9;
          font-family: inherit;
          font-size: 9px;
          font-weight: 700;
        }

        .tebyan-remember {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #466b82;
          font-size: 10.5px;
        }

        .tebyan-checkbox-container {
          position: relative;
          display: inline-flex;
        }

        .tebyan-checkbox-container input {
          position: absolute;
          opacity: 0;
        }

        .tebyan-checkbox {
          width: 17px;
          height: 17px;
          display: grid;
          place-items: center;
          border: 1px solid #cbd5e1;
          border-radius: 5px;
          background: #fff;
          color: #fff;
        }

        .tebyan-checkbox.checked {
          border-color: transparent;
          background: linear-gradient(135deg,#0876d9,#12c7c4);
        }

        .tebyan-submit-button {
          width: 100%;
          height: 43px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 0;
          border-radius: 13px;
          background: linear-gradient(270deg,#0876d9,#0caab8);
          color: #fff;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 12px 26px rgba(8,118,217,.22);
          transition: .2s ease;
        }

        .tebyan-submit-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 16px 34px rgba(8,118,217,.28);
        }

        .tebyan-spinner {
          animation: elegantSpinner .7s linear infinite;
        }

        .tebyan-login-separator {
          position: relative;
          height: 23px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tebyan-login-separator::before {
          content: "";
          position: absolute;
          right: 0;
          left: 0;
          height: 1px;
          background: rgba(10,134,199,.10);
        }

        .tebyan-login-separator span {
          position: relative;
          padding: 0 9px;
          background: rgba(255,255,255,.96);
          color: #7998aa;
          font-size: 8.5px;
        }

        .tebyan-social-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .tebyan-social-button {
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: 1px solid rgba(10,134,199,.13);
          border-radius: 12px;
          background: #fff;
          color: #064c91;
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
        }

        .tebyan-social-button svg {
          width: 17px;
          height: 17px;
        }

        .tebyan-signup-link {
          margin: 14px 0 0;
          text-align: center;
          color: #6a8fa7;
          font-size: 10.5px;
        }

        .tebyan-signup-link button {
          border: 0;
          background: transparent;
          color: #0876d9;
          font-family: inherit;
          font-size: inherit;
          font-weight: 700;
        }

        .tebyan-login-footer {
          margin: 10px 0 0;
          text-align: center;
          color: #91acbd;
          font-size: 8.5px;
        }

        @keyframes elegantGrid { to { background-position: 36px 36px; } }
        @keyframes elegantSpin { to { transform: rotate(360deg); } }
        @keyframes elegantOrbit { to { transform: rotate(360deg); } }
        @keyframes elegantCounter { to { transform: rotate(-360deg); } }
        @keyframes elegantPulse {
          0%,100% { opacity:.45; transform:scale(.96); }
          50% { opacity:1; transform:scale(1.04); }
        }
        @keyframes elegantAura {
          0%,100% { opacity:.5; transform:scale(.92); }
          50% { opacity:1; transform:scale(1.05); }
        }
        @keyframes elegantFloat {
          0%,100% { transform:translateY(0) rotate(0); }
          50% { transform:translateY(-4px) rotate(.8deg); }
        }
        @keyframes elegantHeartbeat {
          0%,14% { stroke-dashoffset:260; opacity:.35; }
          44%,78% { stroke-dashoffset:0; opacity:1; }
          100% { stroke-dashoffset:-260; opacity:.35; }
        }
        @keyframes elegantLeaf {
          0%,100% { transform:rotate(0) scale(1); }
          50% { transform:rotate(1deg) scale(1.012); }
        }
        @keyframes elegantSpinner { to { transform:rotate(360deg); } }

        @media (max-width: 360px) {
          .tebyan-login-main {
            padding: 8px;
          }

          .tebyan-login-wrapper {
            width: 100%;
          }

          .tebyan-login-card {
            padding: 14px 13px 16px;
            border-radius: 21px;
          }

          .tebyan-logo-stage {
            width: 112px;
            height: 112px;
            --orbit-radius: 44px;
          }

          .tebyan-orbit-canvas {
            width: 112px;
            height: 112px;
          }

          .tebyan-logo-core {
            width: 64px;
            height: 64px;
          }

          .tebyan-logo-aura {
            width: 78px;
            height: 78px;
          }

          .tebyan-login-brand h2 {
            font-size: 23px;
          }

          .tebyan-login-heading h1 {
            font-size: 18px;
          }

          .tebyan-login-heading p {
            font-size: 9.5px;
          }

          .tebyan-input-wrapper input,
          .tebyan-submit-button {
            height: 41px;
          }
        }

        @media (max-height: 690px) {
          .tebyan-login-main {
            align-items: flex-start;
            padding-top: 8px;
          }

          .tebyan-logo-stage {
            transform: scale(.88);
            margin-top: -8px;
            margin-bottom: -8px;
          }

          .tebyan-login-heading {
            margin-top: 10px;
          }

          .tebyan-login-form {
            gap: 9px;
          }

          .tebyan-signup-link {
            margin-top: 10px;
          }
        }


        @media (min-width: 768px) {
          .tebyan-login-main {
            padding: 32px 20px;
          }

          .tebyan-login-wrapper {
            width: min(100%, 420px);
          }

          .tebyan-login-card {
            padding: 24px 26px 26px;
            border-radius: 30px;
          }

          .tebyan-logo-stage {
            width: 138px;
            height: 138px;
            --orbit-radius: 55px;
          }

          .tebyan-orbit-canvas {
            width: 138px;
            height: 138px;
          }

          .tebyan-logo-core {
            width: 78px;
            height: 78px;
          }

          .tebyan-input-wrapper input,
          .tebyan-submit-button {
            height: 48px;
          }
        }

        @media (max-width: 767px) {
          .tebyan-login-main {
            align-items: flex-start;
            justify-content: center;
            padding:
              max(10px, env(safe-area-inset-top))
              max(10px, env(safe-area-inset-right))
              max(18px, env(safe-area-inset-bottom))
              max(10px, env(safe-area-inset-left));
            overflow-y: auto;
          }

          .tebyan-login-wrapper {
            width: 100%;
            max-width: 430px;
          }

          .tebyan-login-card {
            width: 100%;
            padding: 16px 14px 18px;
            border-radius: 22px;
          }

          .tebyan-login-form,
          .tebyan-field,
          .tebyan-input-wrapper,
          .tebyan-input-wrapper input {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
          }

          .tebyan-input-wrapper input {
            height: 48px;
            padding-right: 43px !important;
            padding-left: 43px !important;
            border-radius: 14px;
            font-size: 16px;
          }

          .tebyan-field > span {
            font-size: 12px;
          }

          .tebyan-submit-button {
            height: 48px;
            border-radius: 14px;
            font-size: 14px;
          }

          .tebyan-social-button {
            min-width: 0;
            height: 44px;
          }
        }

        @media (max-width: 390px) {
          .tebyan-login-card {
            padding-inline: 12px;
          }

          .tebyan-logo-stage {
            transform: scale(.92);
            margin-top: -4px;
            margin-bottom: -5px;
          }

          .tebyan-social-grid {
            gap: 7px;
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

          .tebyan-logo-stage,
          .signup-logo-stage {
            min-height: 172px !important;
            height: 172px !important;
            margin: -4px auto 2px !important;
            transform: scale(.88);
            transform-origin: center center;
          }

          .tebyan-logo-core,
          .signup-logo-core {
            width: 124px !important;
            height: 124px !important;
          }

          .tebyan-orbit-canvas,
          .signup-orbit-canvas {
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

          .tebyan-logo-stage,
          .signup-logo-stage {
            transform: scale(.78);
            margin-block: -14px -8px !important;
          }

          .tebyan-login-heading h1,
          .signup-heading h1 {
            font-size: 22px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tebyan-login-grid,
          .tebyan-engineering-ring,
          .tebyan-energy-ring,
          .tebyan-orbit-runner,
          .tebyan-orbit-counter,
          .tebyan-logo-aura,
          .tebyan-logo-core,
          .tibyan-heartbeat,
          .tibyan-leaf,
          .tebyan-spinner {
            animation: none !important;
          }
        }
      
        @media (max-width: 520px) {
          .tebyan-login-main, .tibyan-signup-main { min-height: 100dvh; align-items: flex-start; padding: 10px 8px 22px; }
          .tebyan-login-wrapper, .tibyan-signup-wrapper { width: 100%; }
          .tebyan-login-card, .tibyan-signup-card { width: 100%; border-radius: 24px; padding-left: 14px; padding-right: 14px; box-shadow: 0 20px 55px rgba(5,78,133,.14); }
          .tebyan-input-wrapper input, .tibyan-input-wrapper input, .tibyan-input-wrapper select, .tibyan-input-wrapper textarea { font-size: 16px !important; min-height: 52px; }
          .tebyan-submit-button, .tibyan-submit-button { min-height: 54px; font-size: 15px; }
          .tebyan-logo-stage, .signup-logo-stage { max-height: 190px; }
        }


        /* استعادة كلمة المرور داخل صفحة تسجيل الدخول نفسها */
        .tebyan-login-card {
          position: relative;
        }

        .tebyan-recovery-back {
          position: absolute;
          z-index: 8;
          top: 14px;
          right: 14px;
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0 9px;
          border: 1px solid rgba(8,118,217,.12);
          border-radius: 10px;
          background: rgba(247,252,255,.88);
          color: #0876d9;
          font-size: 9.5px;
          font-weight: 800;
          cursor: pointer;
          transition: transform .2s ease, background .2s ease, border-color .2s ease;
        }

        .tebyan-recovery-back:hover {
          transform: translateY(-1px);
          border-color: rgba(8,118,217,.24);
          background: #fff;
        }

        .tebyan-recovery-progress {
          width: min(100%, 250px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 7px;
          margin: 12px auto 0;
        }

        .tebyan-recovery-progress span {
          height: 5px;
          overflow: hidden;
          border-radius: 999px;
          background: #e5f0f5;
          box-shadow: inset 0 1px 2px rgba(4,70,127,.05);
          transition: background .25s ease, transform .25s ease;
        }

        .tebyan-recovery-progress span.active,
        .tebyan-recovery-progress span.done {
          background: linear-gradient(90deg,#35c66f,#0caab8,#0876d9);
        }

        .tebyan-recovery-progress span.active {
          transform: scaleY(1.35);
        }

        .tebyan-recovery-shell {
          width: 100%;
          min-width: 0;
          margin-top: 12px;
        }

        .tebyan-recovery-note {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 10px 11px;
          border: 1px solid rgba(18,183,189,.14);
          border-radius: 13px;
          background: linear-gradient(135deg,rgba(239,251,251,.95),rgba(245,251,255,.98));
          color: #4f778e;
          font-size: 9.5px;
          line-height: 1.7;
        }

        .tebyan-recovery-note svg {
          flex: 0 0 auto;
          margin-top: 1px;
          color: #0aa5aa;
        }

        .tebyan-demo-code {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 12px;
          border: 1px solid rgba(8,118,217,.13);
          border-radius: 14px;
          background: linear-gradient(135deg,#f3fbff,#f0fdf8);
          color: #547a91;
        }

        .tebyan-demo-code div {
          min-width: 0;
          display: grid;
          gap: 2px;
        }

        .tebyan-demo-code span {
          font-size: 8.5px;
          font-weight: 700;
        }

        .tebyan-demo-code strong {
          color: #075dac;
          font-size: 16px;
          letter-spacing: 4px;
          direction: ltr;
        }

        .tebyan-demo-code svg {
          flex: 0 0 auto;
          color: #13a883;
        }

        .tebyan-code-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 7px;
          direction: ltr;
        }

        .tebyan-code-grid input {
          width: 100%;
          min-width: 0;
          height: 48px;
          padding: 0;
          border: 1px solid rgba(10,134,199,.18);
          border-radius: 12px;
          outline: none;
          background: #fff;
          color: #075dac;
          font-family: inherit;
          font-size: 20px;
          font-weight: 900;
          text-align: center;
          box-shadow: 0 5px 14px rgba(4,77,132,.04);
          transition: .2s ease;
          -moz-appearance: textfield;
        }

        .tebyan-code-grid input::-webkit-outer-spin-button,
        .tebyan-code-grid input::-webkit-inner-spin-button {
          margin: 0;
          -webkit-appearance: none;
        }

        .tebyan-code-grid input:focus {
          border-color: rgba(8,118,217,.62);
          box-shadow: 0 0 0 3px rgba(8,118,217,.09);
          transform: translateY(-1px);
        }

        .tebyan-recovery-actions {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
          align-items: center;
        }

        .tebyan-recovery-secondary {
          min-height: 43px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 0 11px;
          border: 1px solid rgba(8,118,217,.14);
          border-radius: 13px;
          background: #fff;
          color: #0876d9;
          font-family: inherit;
          font-size: 9.5px;
          font-weight: 800;
          cursor: pointer;
        }

        .tebyan-recovery-secondary:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .tebyan-password-strength {
          display: grid;
          gap: 5px;
          margin-top: -2px;
        }

        .tebyan-password-strength-bars {
          display: grid;
          grid-template-columns: repeat(3, minmax(0,1fr));
          gap: 5px;
        }

        .tebyan-password-strength-bars span {
          height: 4px;
          border-radius: 999px;
          background: #e5eef3;
          transition: background .2s ease;
        }

        .tebyan-password-strength-bars span.on {
          background: linear-gradient(90deg,#35c66f,#0caab8,#0876d9);
        }

        .tebyan-password-strength small {
          color: #7898aa;
          font-size: 8.5px;
          line-height: 1.6;
        }

        .tebyan-recovery-success {
          display: grid;
          justify-items: center;
          gap: 9px;
          padding: 18px 10px 4px;
          text-align: center;
        }

        .tebyan-recovery-success-icon {
          width: 62px;
          height: 62px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(53,198,111,.18);
          border-radius: 20px;
          background: linear-gradient(145deg,#ecfdf5,#f1fbff);
          color: #17a96d;
          box-shadow: 0 14px 30px rgba(20,169,109,.12);
          animation: recoverySuccessIn .45s ease both;
        }

        .tebyan-recovery-success h3 {
          margin: 2px 0 0;
          color: #075dac;
          font-size: 17px;
        }

        .tebyan-recovery-success p {
          max-width: 260px;
          margin: 0;
          color: #6a8ca0;
          font-size: 10.5px;
          line-height: 1.75;
        }

        @keyframes recoverySuccessIn {
          from { opacity: 0; transform: scale(.82) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* آخر طبقة استجابة للهاتف: تحافظ على الشكل وتمنع القص والتكبير الخاطئ */
        @media (max-width: 767px) {
          .tebyan-login-main {
            min-height: 100dvh;
            align-items: flex-start;
            overflow-x: hidden;
            overflow-y: auto;
            padding:
              max(10px, env(safe-area-inset-top))
              max(10px, env(safe-area-inset-right))
              max(18px, env(safe-area-inset-bottom))
              max(10px, env(safe-area-inset-left)) !important;
          }

          .tebyan-login-wrapper {
            width: 100% !important;
            max-width: 430px !important;
          }

          .tebyan-login-card {
            width: 100% !important;
            min-width: 0 !important;
            padding: 17px 15px 19px !important;
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

          .tebyan-login-brand h2 {
            font-size: 26px !important;
          }

          .tebyan-login-heading {
            margin-top: 13px;
          }

          .tebyan-login-heading h1 {
            font-size: 23px !important;
          }

          .tebyan-login-heading p {
            max-width: 310px;
            font-size: 13px !important;
            line-height: 1.75 !important;
          }

          .tebyan-field > span {
            font-size: 12.5px !important;
          }

          .tebyan-input-wrapper,
          .tebyan-input-wrapper input {
            min-height: 52px !important;
          }

          .tebyan-input-wrapper input {
            font-size: 16px !important;
          }

          .tebyan-submit-button {
            min-height: 52px !important;
            font-size: 15px !important;
          }

          .tebyan-social-button,
          .tebyan-recovery-secondary {
            min-height: 46px;
          }

          .tebyan-forgot-password,
          .tebyan-signup-link,
          .tebyan-remember,
          .tebyan-recovery-note,
          .tebyan-recovery-secondary {
            font-size: 12px;
          }

          .tebyan-recovery-back {
            top: 12px;
            right: 12px;
            min-height: 38px;
            font-size: 11px;
          }

          .tebyan-code-grid {
            gap: 6px;
          }

          .tebyan-code-grid input {
            height: 50px;
            border-radius: 13px;
            font-size: 20px !important;
          }

          .tebyan-demo-code span,
          .tebyan-password-strength small {
            font-size: 10.5px;
          }

          .tebyan-recovery-success h3 {
            font-size: 19px;
          }

          .tebyan-recovery-success p {
            font-size: 12.5px;
          }
        }

        @media (max-width: 370px) {
          .tebyan-login-card {
            padding-inline: 12px !important;
          }

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

          .tebyan-code-grid {
            gap: 4px;
          }

          .tebyan-code-grid input {
            height: 46px;
            border-radius: 11px;
          }

          .tebyan-recovery-actions {
            grid-template-columns: 1fr;
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
`}</style>
    </div>
  );
}

export default LoginPage;
