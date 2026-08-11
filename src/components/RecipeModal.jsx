import { useState, useEffect } from "react";
import { X, Utensils, Printer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RecipeModal({ recipe, onClose }) {
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [unitMode, setUnitMode] = useState("metric");
  const [isCookMode, setIsCookMode] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (recipe) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [recipe]);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((p) => p - 1), 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!recipe) return null;

  const scaleAmount = (amountStr, multiplier) => {
    if (!amountStr) return "";
    return amountStr.replace(/(\d+(\.\d+)?)/g, (match) => {
      const val = parseFloat(match);
      if (isNaN(val)) return match;
      const scaled = val * multiplier;
      return Number.isInteger(scaled) ? scaled.toString() : scaled.toFixed(1);
    });
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="recipe-modal printable-recipe-modal"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="recipe-modal-header no-print">
            <div className="recipe-badges">
              <span className="badge-seed-oil">100% Seed-Oil Free</span>
              <span className="badge-organic">Organic Wholefoods</span>
            </div>
            <div className="recipe-modal-actions">
              <button
                type="button"
                className={isCookMode ? "btn-accent btn-sm" : "btn-outline btn-sm"}
                onClick={() => setIsCookMode(!isCookMode)}
              >
                <Utensils size={15} /> {isCookMode ? "Exit Cook Mode" : "Cook Mode"}
              </button>
              <button type="button" className="btn-outline btn-sm" onClick={() => window.print()}>
                <Printer size={15} /> Print
              </button>
              <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="recipe-modal-body">
            <img src={recipe.image} alt={recipe.title} className="recipe-modal-hero" />
            <h2>{recipe.title}</h2>
            <p className="recipe-modal-sub">{recipe.subtitle}</p>
            {recipe.story && <p className="recipe-story">{recipe.story}</p>}

            <div className="recipe-tools no-print">
              <div className="recipe-tool-group">
                <span>Adjust Batch:</span>
                <div className="pill-group">
                  {[1, 2, 4, 8].map((mult) => (
                    <button
                      key={mult}
                      type="button"
                      className={`pill ${servingsMultiplier === mult ? "pill--active" : ""}`}
                      onClick={() => setServingsMultiplier(mult)}
                    >
                      {mult === 1 ? "Default" : mult === 8 ? "8× Catering" : `${mult}×`}
                    </button>
                  ))}
                </div>
              </div>
              <div className="recipe-tool-group">
                <span>Units:</span>
                <div className="pill-group">
                  {["metric", "imperial"].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      className={`pill ${unitMode === mode ? "pill--accent" : ""}`}
                      onClick={() => setUnitMode(mode)}
                    >
                      {mode === "metric" ? "Metric" : "Imperial"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isCookMode && (
              <div className="cook-mode-bar no-print">
                <span>⏱ Active Cooking Timer</span>
                <div className="timer-controls">
                  <span className="timer-display">{formatTimer(timerSeconds)}</span>
                  <button
                    type="button"
                    className="btn-accent btn-sm"
                    onClick={() => {
                      setTimerSeconds(15 * 60);
                      setIsTimerRunning(true);
                    }}
                  >
                    +15 Mins
                  </button>
                  <button
                    type="button"
                    className="btn-outline btn-sm"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                  >
                    {isTimerRunning ? "Pause" : "Start"}
                  </button>
                </div>
              </div>
            )}

            <div className="recipe-columns">
              <div>
                <h4>Ingredients</h4>
                <ul className="ingredient-list">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx}>
                      <strong>
                        {scaleAmount(unitMode === "metric" ? ing.metric : ing.imperial, servingsMultiplier)}
                      </strong>{" "}
                      {ing.item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Instructions</h4>
                <ol className="step-list">
                  {recipe.instructions.map((step, idx) => (
                    <li key={idx}>
                      <span className="step-num">{idx + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {recipe.authorNotes && (
              <div className="chef-tip">
                <strong>Chef Tip:</strong> {recipe.authorNotes}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
