import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Compass, ArrowDown } from 'lucide-react';

export default function VideoHero({ onExploreClick }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef(null);

  // High-res static fallback
  const posterUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Required by Chromium autoplay engine
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      video.pause();
      return;
    }

    const startPlayback = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Initial autoplay deferred:", err.message);
        setIsPlaying(false);
      }
    };

    startPlayback();
  }, []);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || videoFailed) return;

    if (video.paused) {
      video.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Play invocation failed:", err);
          setIsPlaying(false);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative w-full h-[92vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-odyssey-dark">
      {/* 1. Base High-Res Poster Image */}
      <img
        src={posterUrl}
        alt="Scenic Coastal Horizon"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 2. Video Player with Multi-Source Fallbacks & Proper MIME types */}
      {!videoFailed ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={() => {
            console.warn("Video stream unsupported or blocked. Falling back to ambient motion canvas.");
            setVideoFailed(true);
          }}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        >
          {/* Primary High-Reliability Stream */}
          <source
            src="https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory/media/cc0-videos/flower.mp4"
            type="video/mp4"
          />
          {/* Secondary Backup WebM Stream */}
          <source
            src="https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory/media/cc0-videos/flower.webm"
            type="video/webm"
          />
        </video>
      ) : (
        /* Dynamic Ambient Motion Canvas (Guaranteed 60fps fallback if ISP/CORS blocks external videos) */
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 1, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${posterUrl})` }}
        />
      )}

      {/* 3. Contrast Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-odyssey-dark/60 via-odyssey-dark/30 to-odyssey-dark pointer-events-none" />

      {/* 4. Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-odyssey-accent text-xs tracking-wider uppercase font-semibold mb-6 border border-odyssey-accent/20"
        >
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Next-Generation Travel Exploration</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
        >
          Journey Beyond the <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400">
            Familiar Horizons
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-10 font-normal leading-relaxed"
        >
          Discover curated global getaways, real-time atmospheric metrics, and personalized multi-day itineraries designed dynamically by artificial intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <button
            onClick={onExploreClick}
            className="px-8 py-3.5 rounded-xl bg-odyssey-accent text-slate-950 font-semibold text-sm hover:bg-sky-300 active:scale-95 transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Exploring</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* 5. Play / Pause Control Button */}
      <div className="absolute bottom-6 right-6 z-40 pointer-events-auto">
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pause background animation" : "Play background animation"}
          className="p-3.5 rounded-full glass-panel text-white hover:border-white/40 active:scale-90 transition-transform cursor-pointer flex items-center justify-center shadow-2xl bg-black/50 backdrop-blur-md border border-white/20"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-sky-400 fill-sky-400" />
          ) : (
            <Play className="w-5 h-5 text-emerald-400 fill-emerald-400 translate-x-0.5" />
          )}
        </button>
      </div>
    </section>
  );
}