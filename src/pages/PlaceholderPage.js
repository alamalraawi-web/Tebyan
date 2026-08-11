import { useNavigate } from "react-router-dom";
import TibyanHeader from "../components/TibyanHeader";

function PlaceholderPage({ title, description }) {
  const navigate = useNavigate();

  return (
    <>
      <TibyanHeader />

      <main dir="rtl" className="placeholder-page">
        <div className="placeholder-bg" aria-hidden="true">
          <span className="placeholder-glow glow-one" />
          <span className="placeholder-glow glow-two" />
        </div>

        <section className="placeholder-card">
          <div className="placeholder-brand">
            <span className="placeholder-mark">✚</span>
            <div>
              <small>منصة تبيان</small>
              <strong>رعاية صحية ذكية</strong>
            </div>
          </div>

          <div className="placeholder-status">
            <span />
            القسم جاهز للعرض
          </div>

          <h1>{title}</h1>
          <p>{description}</p>

          <div className="placeholder-note">
            <span className="placeholder-note-icon">i</span>
            <div>
              <strong>هذه صفحة مؤقتة لهذا القسم</strong>
              <small>
                سيتم عرض الخدمات والتفاصيل الخاصة بهذا القسم هنا عند اكتمال تطويره.
              </small>
            </div>
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate(-1)}
          >
            <span aria-hidden="true">‹</span>
            العودة إلى الصفحة السابقة
          </button>
        </section>

        <style>{`
          .placeholder-page,
          .placeholder-page * {
            box-sizing: border-box;
          }

          .placeholder-page {
            position: relative;
            min-height: calc(100vh - 72px);
            overflow: hidden;
            display: grid;
            place-items: center;
            padding: 32px 18px 48px;
            background:
              radial-gradient(circle at 85% 8%, rgba(14, 165, 164, .10), transparent 28%),
              radial-gradient(circle at 10% 85%, rgba(8, 104, 196, .09), transparent 32%),
              linear-gradient(180deg, #f8fcff 0%, #eef6fb 100%);
            color: #123f61;
            font-family: "IBM Plex Sans Arabic", "Noto Kufi Arabic", Tahoma, Arial, sans-serif;
          }

          .placeholder-bg {
            position: absolute;
            inset: 0;
            pointer-events: none;
            overflow: hidden;
          }

          .placeholder-glow {
            position: absolute;
            width: 320px;
            height: 320px;
            border-radius: 50%;
            filter: blur(70px);
            opacity: .22;
          }

          .glow-one {
            top: -120px;
            right: -120px;
            background: #0b9fa7;
          }

          .glow-two {
            left: -120px;
            bottom: -130px;
            background: #0868c4;
          }

          .placeholder-card {
            position: relative;
            z-index: 1;
            width: min(100%, 640px);
            padding: 34px;
            border: 1px solid rgba(7, 91, 145, .10);
            border-radius: 30px;
            background: rgba(255, 255, 255, .96);
            box-shadow: 0 28px 80px rgba(4, 70, 127, .11);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
          }

          .placeholder-brand {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .placeholder-mark {
            width: 56px;
            height: 56px;
            flex: 0 0 56px;
            display: grid;
            place-items: center;
            border-radius: 18px;
            background: linear-gradient(145deg, #0868c4, #0b9fa7);
            color: #fff;
            font-size: 28px;
            font-weight: 900;
            box-shadow: 0 14px 28px rgba(8, 104, 196, .20);
          }

          .placeholder-brand small,
          .placeholder-brand strong {
            display: block;
          }

          .placeholder-brand small {
            color: #0b9fa7;
            font-size: 11px;
            font-weight: 900;
          }

          .placeholder-brand strong {
            margin-top: 3px;
            color: #064b8d;
            font-size: 17px;
            font-weight: 950;
          }

          .placeholder-status {
            width: fit-content;
            margin-top: 22px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 7px 11px;
            border-radius: 999px;
            background: #effbf4;
            color: #1d8050;
            font-size: 10px;
            font-weight: 900;
          }

          .placeholder-status > span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #27b96f;
            box-shadow: 0 0 0 5px rgba(39, 185, 111, .12);
          }

          .placeholder-card h1 {
            margin: 18px 0 0;
            color: #064b8d;
            font-size: clamp(32px, 5vw, 48px);
            line-height: 1.25;
            font-weight: 950;
          }

          .placeholder-card > p {
            margin: 13px 0 0;
            color: #5e8197;
            font-size: 14px;
            line-height: 1.9;
            font-weight: 650;
          }

          .placeholder-note {
            margin-top: 22px;
            display: flex;
            align-items: flex-start;
            gap: 11px;
            padding: 14px;
            border: 1px solid rgba(11, 159, 167, .12);
            border-radius: 17px;
            background: #eefcfb;
          }

          .placeholder-note-icon {
            width: 34px;
            height: 34px;
            flex: 0 0 34px;
            display: grid;
            place-items: center;
            border-radius: 11px;
            background: #0b9fa7;
            color: #fff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            font-weight: 900;
          }

          .placeholder-note strong,
          .placeholder-note small {
            display: block;
          }

          .placeholder-note strong {
            color: #0a6275;
            font-size: 12px;
            font-weight: 900;
          }

          .placeholder-note small {
            margin-top: 4px;
            color: #638696;
            font-size: 10px;
            line-height: 1.7;
            font-weight: 650;
          }

          .primary-button {
            width: 100%;
            min-height: 52px;
            margin-top: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
            padding: 0 18px;
            border: 0;
            border-radius: 16px;
            background: linear-gradient(135deg, #0868c4, #0b9fa7);
            color: #fff;
            font: inherit;
            font-size: 13px;
            font-weight: 900;
            cursor: pointer;
            box-shadow: 0 14px 30px rgba(8, 104, 196, .18);
            transition: transform .2s ease, box-shadow .2s ease;
          }

          .primary-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 38px rgba(8, 104, 196, .23);
          }

          .primary-button span {
            font-size: 24px;
            line-height: 1;
          }

          @media (max-width: 640px) {
            .placeholder-page {
              padding: 18px 10px 34px;
            }

            .placeholder-card {
              padding: 24px 18px;
              border-radius: 24px;
            }

            .placeholder-mark {
              width: 50px;
              height: 50px;
              flex-basis: 50px;
              border-radius: 16px;
              font-size: 24px;
            }

            .placeholder-card h1 {
              font-size: 31px;
            }

            .placeholder-card > p {
              font-size: 12px;
            }

            .placeholder-note {
              padding: 12px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .placeholder-page *,
            .placeholder-page *::before,
            .placeholder-page *::after {
              transition: none !important;
              animation: none !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}

export default PlaceholderPage;
