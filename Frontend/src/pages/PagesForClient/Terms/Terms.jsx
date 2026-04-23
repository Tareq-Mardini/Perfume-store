import Navbar from "../../../components/ForClient/Navbar";
import Footer from "../../../components/ForClient/Footer";
import { useEffect } from "react";
import "./Terms.css";
import { useTranslation } from "react-i18next";

export default function Terms() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navbar />

      <div className="page-header">
        <div className="section-label">{t("terms.headerLabel")}</div>
        <h1>{t("terms.title")}</h1>
        <p>{t("terms.subtitle")}</p>
      </div>

      <div className="container" style={{ maxWidth: "900px" }}>
        {/* 1 */}
        <div className="legal-card">
          <h2>
            <span className="legal-num">1</span> {t("terms.companyTitle")}
          </h2>
          <p>{t("terms.companyDesc")}</p>
          <ul>
            <li>
              <strong>{t("terms.legalName")}:</strong> Munaryss Trading LLC
            </li>
            <li>
              <strong>{t("terms.emirate")}:</strong> Dubai
            </li>
            <li>
              <strong>{t("terms.license")}:</strong> 1582680
            </li>
          </ul>
        </div>

        {/* 2 */}
        <div className="legal-card">
          <h2>
            <span className="legal-num">2</span> {t("terms.dataCollection")}
          </h2>
          <p>{t("terms.collectDesc")}</p>
          <ul>
            <li>{t("terms.fullName")}</li>
            <li>{t("terms.phone")}</li>
            <li>{t("terms.address")}</li>
            <li>{t("terms.tech")}</li>
          </ul>
        </div>

        {/* 3 */}
        <div className="legal-card">
          <h2>
            <span className="legal-num">3</span> {t("terms.useTitle")}
          </h2>
          <p>{t("terms.useDesc")}</p>
          <ul>
            <li>{t("terms.orderProcessing")}</li>
            <li>{t("terms.communication")}</li>
            <li>{t("terms.improve")}</li>
            <li>{t("terms.fraud")}</li>
          </ul>
        </div>

        {/* 4 */}
        <div className="legal-card">
          <h2>
            <span className="legal-num">4</span> {t("terms.payment")}
          </h2>
          <ul>
            <li>{t("terms.cod")}</li>
            <li>{t("terms.card")}</li>
          </ul>
        </div>

        {/* 5 */}
        <div className="legal-card">
          <h2>
            <span className="legal-num">5</span> {t("terms.shipping")}
          </h2>
          <ul>
            <li>
              <strong>{t("terms.uae")}:</strong> {t("terms.uaeTime")}
            </li>
            <li>
              <strong>{t("terms.gcc")}:</strong> {t("terms.gccTime")}
            </li>
          </ul>
        </div>

        {/* 6 */}
        <div className="legal-card">
          <h2>
            <span className="legal-num">6</span> {t("terms.return")}
          </h2>
          <p>{t("terms.returnCond")}</p>
          <ul>
            <li>{t("terms.unopened")}</li>
            <li>{t("terms.unused")}</li>
            <li>{t("terms.original")}</li>
          </ul>

          <p>
            <strong>{t("terms.refund")}</strong>
          </p>
          <ul>
            <li>{t("terms.refund1")}</li>
            <li>{t("terms.refund2")}</li>
          </ul>

          <p>
            <strong>{t("terms.exchange")}</strong>
          </p>
          <ul>
            <li>{t("terms.exchange1")}</li>
            <li>{t("terms.exchange2")}</li>
            <li>{t("terms.exchange3")}</li>
          </ul>
        </div>

        {/* 7 */}
        <div className="legal-card">
          <h2>
            <span className="legal-num">7</span> {t("terms.sharing")}
          </h2>
          <p>{t("terms.sharingDesc")}</p>
        </div>

        {/* 8 */}
        <div className="legal-card">
          <h2>
            <span className="legal-num">8</span> {t("terms.security")}
          </h2>
          <ul>
            <li>{t("terms.ssl")}</li>
            <li>{t("terms.access")}</li>
            <li>{t("terms.updates")}</li>
          </ul>
        </div>

        {/* 9 */}
        <div className="legal-card">
          <h2>
            <span className="legal-num">9</span> {t("terms.disclaimer")}
          </h2>
          <ul>
            <li>{t("terms.external")}</li>
            <li>{t("terms.eyes")}</li>
            <li>{t("terms.test")}</li>
            <li>{t("terms.children")}</li>
            <li>{t("terms.heat")}</li>
          </ul>
        </div>

        {/* 10 */}
        <div className="legal-card">
          <h2>
            <span className="legal-num">10</span> {t("terms.notes")}
          </h2>
          <ul>
            <li>{t("terms.note1")}</li>
            <li>{t("terms.note2")}</li>
            <li>{t("terms.note3")}</li>
          </ul>
        </div>

        {/* 11 */}
        <div className="legal-card">
          <h2>
            <span className="legal-num">11</span> {t("terms.rights")}
          </h2>
          <ul>
            <li>{t("terms.right1")}</li>
            <li>{t("terms.right2")}</li>
            <li>{t("terms.right3")}</li>
          </ul>
        </div>

        {/* 12 */}
        <div className="legal-card">
          <h2>
            <span className="legal-num">12</span> {t("terms.contact")}
          </h2>
          <ul>
            <li>
              <strong>WhatsApp:</strong> +971507205277
            </li>
            <li>
              <strong>Email:</strong> info@munaryss.com
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}