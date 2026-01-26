import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
const SummaryPage = () => {
  const location = useLocation();
  const { summary } = location.state || {};

  const [displayText, setDisplayText] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  

  if (!summary) return <h2>No summary found!</h2>;

  // Typing effect
  useEffect(() => {
    if (!summary) return;
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
    if (!summary || isMuted) return;
    window.speechSynthesis.cancel(); // stop previous voice

    const utter = new SpeechSynthesisUtterance(summary);
    utter.lang = "bn-IN";      // Bengali voice
    utter.rate = 0.9;          // slower for clarity
    utter.pitch = 1;

    
    window.speechSynthesis.speak(utter);

    return () => window.speechSynthesis.cancel();
  }, [summary, isMuted]);
    // Toggle mute/unmute
  const toggleMute = () => {
    if (isMuted) {
      // Unmute → replay speech
      setIsMuted(false);
    } else {
      // Mute → stop speech
      window.speechSynthesis.cancel();
      setIsMuted(true);
    }
  };

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
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => toggleMute()}
          style={{
            padding: "10px",
            background: "transparent",
            // background: isMuted ? "green" : "crimson",
            color: "black",
            borderRadius: "6px",
            border: "none",
            // border: "2px solid #e8a71a",
            cursor: "pointer",
            position: "fixed",
            right: "0px",
            top:"50px",
          }}
        >
          {/* {isMuted ? "🔊 Unmute" : "🔇 Mute"} */}
          {isMuted ? <GoMute /> : <GoUnmute />}
        </button>
      </div>
      <p>{displayText}</p>

      
    </div>
  );
};

export default SummaryPage;
