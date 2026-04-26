import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function TopBar() {
  const { t } = useTranslation();

  const messages = [
    t("topbar.freeDelivery"),
    t("topbar.premium"),
    t("topbar.authentic"),
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="topbar">
      <div className={`topbar-content ${fade ? "fade-in" : "fade-out"}`}>
        {messages[index]}
      </div>
    </div>
  );
}