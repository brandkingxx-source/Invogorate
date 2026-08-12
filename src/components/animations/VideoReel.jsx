import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

/**
 * Reusable cinematic video player with animated play/pause overlays.
 * Used across pages to sprinkle motion-rich video moments.
 */
export default function VideoReel({
  src,
  poster,
  title = "",
  subtitle = "",
  badge = "",
  className = "",
  aspect = "16 / 9",
  autoPlay = true,
  muted = true,
  rounded = true,
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [loaded, setLoaded] = useState(false);

  // Keep internal state in sync with the element
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  return (
    <motion.div
      className={`video-reel-wrap ${className}`}
      role="button"
      tabIndex={0}
      aria-label={playing ? "Pause video" : "Play video"}
      onClick={togglePlay}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePlay();
        }
      }}
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ aspectRatio: aspect, borderRadius: rounded ? "var(--radius-xl)" : 0 }}
    >
      <video
        ref={videoRef}
        preload="metadata"
        autoPlay={autoPlay}
        loop
        playsInline
        muted={muted || autoPlay}
        poster={poster}
        onLoadedData={() => setLoaded(true)}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Soft vignette so overlays always read */}
      <div className="video-reel-vignette" />

      {/* Center play button */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            className="video-play-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="video-play-icon"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.96 }}
              animate={loaded && !playing ? { boxShadow: ["0 0 0 0 rgba(217,119,6,0.35)", "0 0 0 18px rgba(217,119,6,0)"] } : {}}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            >
              <Play size={30} color="white" fill="white" style={{ marginLeft: 3 }} />
            </motion.div>
            {title && <span className="video-play-label">Watch Our Process</span>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner pause control while playing */}
      <AnimatePresence>
        {playing && (
          <motion.button
            type="button"
            className="video-reel-pause"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label="Pause video"
          >
            <Pause size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom info overlay */}
      {(title || badge) && (
        <div className="video-reel-overlay">
          <div className="video-reel-overlay-left">
            {title && <span className="video-reel-title">{title}</span>}
            {subtitle && <span className="video-reel-sub">{subtitle}</span>}
          </div>
          {badge && <span className="badge-seed-oil">{badge}</span>}
        </div>
      )}
    </motion.div>
  );
}
