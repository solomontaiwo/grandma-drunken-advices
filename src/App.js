import React, { useState, useEffect } from "react";
import "./App.css";
import { translations, getLanguage } from "./translations";

function App() {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const currentLanguage = getLanguage();
  const t = translations[currentLanguage];

  const handleClick = () => {
    setShowSkeleton(true);
    setTimeout(() => {
      const randomPhrase = t.phrases[Math.floor(Math.random() * t.phrases.length)];
      setCurrentPhrase(randomPhrase);
      setShowNextButton(true);
      setTimeout(() => setShowSkeleton(false), 400);
    }, 300);
  };

  useEffect(() => {
  }, [currentPhrase, showNextButton]);

  return (
    <>
      <div className="app-bg-anim" />
      <div className={"glass-panel-full"}>
        <div className={`glass-panel-content${!showNextButton ? " no-tip" : ""} ${showSkeleton ? "animating" : ""}`}>
          <h1>🍸 {t.title}</h1>
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
          <div className="divider" />
          {!showNextButton && (
            <button onClick={handleClick}>{t.getTip}</button>
          )}
          {showNextButton && (
            <>
              {showSkeleton ? (
                <div className="skeleton" />
              ) : (
                <p className="phrase">{currentPhrase}</p>
              )}
              <button onClick={handleClick}>{t.anotherTip}</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
