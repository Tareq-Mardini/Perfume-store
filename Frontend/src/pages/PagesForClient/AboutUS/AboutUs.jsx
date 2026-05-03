import Navbar from "../../../components/ForClient/Navbar";
import Footer from "../../../components/ForClient/Footer";
import { useEffect } from "react";
import "./AboutUs.css";
import { useTranslation } from "react-i18next";
import { Target, Eye, ShieldCheck, Gem, Truck, CreditCard } from "lucide-react";
import logo from "../../../assets/images/IMG-20260427-WA0037.png";
import { Helmet } from "react-helmet-async";

export default function AboutUs() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Munaryss | About Us</title>
      </Helmet>
      <Navbar />

      <section className="page-section" id="page-about">
        {/* HEADER */}
        <div className="page-header">
          <div className="section-label">{t("about.headerLabel")}</div>
          <h1>{t("about.title")}</h1>
          <p>{t("about.subtitle")}</p>
        </div>

        <div className="container-About" style={{ marginTop: "-60px" }}>
          {/* STORY */}
          <div className="about-story">
            <div className="about-story-visual">
              <div className="perfume-art">
                <div className="perfume-svg">
                  {/* <rect
                    x="35"
                    y="20"
                    width="50"
                    height="8"
                    rx="2"
                    fill="#C6A25A"
                    opacity="0.6"
                  />
                  <rect
                    x="50"
                    y="4"
                    width="20"
                    height="20"
                    rx="3"
                    fill="#C6A25A"
                    opacity="0.4"
                  />
                  <rect
                    x="56"
                    y="0"
                    width="8"
                    height="8"
                    rx="2"
                    fill="#C6A25A"
                    opacity="0.7"
                  />

                  <path
                    d="M30 28H90V40C90 40 85 50 85 70V160C85 172 75 180 60 180C45 180 35 172 35 160V70C35 50 30 40 30 40V28Z"
                    fill="#1C1F1E"
                    stroke="#C6A25A"
                  />

                  <image href={logo} x="30" y="40" width="60" height="100" /> */}
                  <img
                    src="/src/assets/images/IMG-20260427-WA0037.png"
                    alt=""
                  />
                </div>

                <div className="shadow-real"></div>

                {/* هون بس الترجمة */}
                <p style={{ marginTop: "20px" }}>{t("about.signature")}</p>
              </div>
            </div>

            <div className="about-story-text">
              <div className="section-label">{t("about.storyLabel")}</div>

              <h2>
                {t("about.storyTitle")} <span>{t("about.storyHighlight")}</span>
              </h2>

              <div className="gold-divider"></div>

              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
          </div>

          {/* MISSION & VISION */}
          <div className="mission-vision">
            <div className="mv-card">
              <div className="icon-wrap">
                <Target size={28} />
              </div>
              <h3>{t("about.missionTitle")}</h3>
              <p>{t("about.missionDesc")}</p>
            </div>

            <div className="mv-card">
              <div className="icon-wrap">
                <Eye size={28} />
              </div>
              <h3>{t("about.visionTitle")}</h3>
              <p>{t("about.visionDesc")}</p>
            </div>
          </div>

          {/* WHY CHOOSE */}
          <div className="why-choose">
            <h2>
              {t("about.whyTitle")} <span>{t("about.brand")}</span>
            </h2>

            <div className="why-grid">
              <div className="why-card">
                <div className="icon-circle">
                  <ShieldCheck size={26} />
                </div>
                <h4>{t("about.authTitle")}</h4>
                <p>{t("about.authDesc")}</p>
              </div>

              <div className="why-card">
                <div className="icon-circle">
                  <Gem size={26} />
                </div>
                <h4>{t("about.qualityTitle")}</h4>
                <p>{t("about.qualityDesc")}</p>
              </div>

              <div className="why-card">
                <div className="icon-circle">
                  <Truck size={26} />
                </div>
                <h4>{t("about.deliveryTitle")}</h4>
                <p>{t("about.deliveryDesc")}</p>
              </div>

              <div className="why-card">
                <div className="icon-circle">
                  <CreditCard size={26} />
                </div>
                <h4>{t("about.paymentTitle")}</h4>
                <p>{t("about.paymentDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}