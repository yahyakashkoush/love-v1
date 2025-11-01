"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";
import Image from "next/image";

interface AudioPlayerProps {
  songUrl: string;
  songTitle: string;
  coverUrl: string | null;
}

export const AudioPlayer = ({
  songUrl,
  songTitle,
  coverUrl,
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Handle audio events
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setError("Unable to load audio. Please check the file format.");
      setIsPlaying(false);
      setIsLoading(false);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Ensure the audio element has loaded
        if (audioRef.current.readyState < 2) {
          setIsLoading(true);
          audioRef.current.load();
        }

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.error("Audio playback error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to play audio"
      );
      setIsPlaying(false);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="py-24 px-4 bg-gradient-to-b from-red-50 via-rose-50 to-pink-50 dark:from-slate-950 dark:via-red-950 dark:to-rose-950 relative overflow-hidden"
    >
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-300 to-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15 animate-pulse" />
      <div className="absolute -bottom-32 left-0 w-96 h-96 bg-gradient-to-tr from-rose-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15 animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-700 via-rose-600 to-red-700 dark:from-red-300 dark:via-rose-300 dark:to-red-300 bg-clip-text text-transparent">
            Our Song
          </h2>
          
          <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 via-rose-500 to-red-500 mx-auto rounded-full shadow-lg shadow-red-400/50" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-2xl border-2 border-red-200/50 dark:border-red-900/50"
        >
          {/* Album Cover */}
          {coverUrl && (
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mb-8 mx-auto w-48 h-48 rounded-xl overflow-hidden shadow-xl border-4 border-red-300/50"
            >
              <Image
                src={coverUrl}
                alt={songTitle}
                width={192}
                height={192}
                className="w-full h-full object-cover"
                unoptimized
              />
            </motion.div>
          )}

          {/* Song Title */}
          <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent mb-8">
            {songTitle}
          </h3>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Waveform Visualization */}
          <div className="mb-8 flex items-center justify-center gap-1.5 h-12">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: isPlaying
                    ? [Math.random() * 100, Math.random() * 100]
                    : 24,
                }}
                transition={{
                  duration: 0.3,
                  repeat: isPlaying ? Infinity : 0,
                  repeatType: "reverse",
                }}
                className="w-1.5 bg-gradient-to-t from-red-600 to-rose-500 dark:from-red-400 dark:to-rose-400 rounded-full shadow-lg shadow-red-400/50"
                style={{ minHeight: "4px" }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full h-2 bg-red-200 dark:bg-red-900/50 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
          </div>

          {/* Time Display */}
          <div className="flex justify-between text-sm font-semibold text-red-600 dark:text-red-400 mb-8">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mb-8">
            {/* Play/Pause Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              disabled={isLoading || error !== null}
              className="p-4 bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-500 dark:to-rose-500 text-white rounded-full hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full" />
              ) : isPlaying ? (
                <Pause size={32} />
              ) : (
                <Play size={32} className="ml-1" />
              )}
            </motion.button>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <Volume2 size={24} className="text-red-600 dark:text-red-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-2 bg-red-200 dark:bg-red-900/50 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
            </div>
          </div>

          <audio
            ref={audioRef}
            src={`/api/audio?url=${encodeURIComponent(songUrl)}`}
            crossOrigin="anonymous"
            preload="metadata"
            onEnded={() => setIsPlaying(false)}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};
