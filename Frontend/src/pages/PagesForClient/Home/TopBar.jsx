import { useEffect, useState } from "react";

export default function TopBar() {
  const messages = [
    "✦ Free Delivery Across UAE | Fast & Secure Shipping ✦",
    "✦ Premium Fragrance Experience ✦",
    "✦ Authentic Perfumes Only ✦",
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