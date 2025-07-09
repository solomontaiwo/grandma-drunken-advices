import React, { useState, useEffect } from "react";
import "./App.css";
import { translations, getLanguage } from "./translations";

function App() {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fadeState, setFadeState] = useState("fade-in");

  const currentLanguage = getLanguage();
  const t = translations[currentLanguage];

  const handleClick = () => {
    setFadeState("fade-out");
    setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        const randomPhrase = t.phrases[Math.floor(Math.random() * t.phrases.length)];
        setCurrentPhrase(randomPhrase);
        setShowNextButton(true);
        setFadeState("fade-in");
      }, 300);
    }, 200);
  };

  useEffect(() => {
    if (showNextButton) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentPhrase, showNextButton]);

  return (
    <>
      <div className="app-bg-anim" />
      <div className={"glass-panel-full"}>
        <div className={`glass-panel-content${!showNextButton ? " no-tip" : ""} ${isAnimating ? "animating" : ""}`}>
          <h1>🍸 {t.title}</h1>
          <div className="divider" />
          <h4>
            {t.madeWithLove} {" "}
            <a
              href="https://www.instagram.com/solomon.taiwo/"
              target="_blank"
              rel="noreferrer"
            >
              Solomon
            </a>
          </h4>
          {!showNextButton && (
            <button onClick={handleClick}>{t.getTip}</button>
          )}
          {showNextButton && (
            <>
              <p className={`phrase ${fadeState}`}>{currentPhrase}</p>
              <button onClick={handleClick}>{t.anotherTip}</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
