import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SummaryPage = () => {
  const location = useLocation();
  const { summary } = location.state || {};

  const [displayText, setDisplayText] = useState("");

  if (!summary) return <h2>No summary found!</h2>;

  // Typing effect
  useEffect(() => {
    let index = 0;

    const typing = setInterval(() => {
      setDisplayText(summary.slice(0, index));
      index++;

      if (index > summary.length) clearInterval(typing);
    }, 25); // typing speed

    return () => clearInterval(typing);
  }, [summary]);

  // Bengali Text-to-Speech
  useEffect(() => {
    window.speechSynthesis.cancel(); // stop previous voice

    const utter = new SpeechSynthesisUtterance(summary);
    utter.lang = "bn-IN";      // Bengali voice
    utter.rate = 0.9;          // slower for clarity
    utter.pitch = 1;

    window.speechSynthesis.speak(utter);

    return () => window.speechSynthesis.cancel();
  }, [summary]);

  return (
    <div
      style={{
        padding: "30px",
        lineHeight: "1.8",
        fontSize: "20px",
        fontFamily: "Noto Sans Bengali, sans-serif",
        whiteSpace: "pre-wrap",
        background: "#FFF3E0",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center" }}>📘 সারাংশ</h2>
      <p>{displayText}</p>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => window.speechSynthesis.cancel()}
          style={{
            padding: "10px 18px",
            background: "crimson",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          🔇 Stop Voice
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;
