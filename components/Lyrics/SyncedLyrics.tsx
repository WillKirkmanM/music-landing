"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const lyrics = `
[00:01.47] Go
[00:02.00] Go
[00:02.50] Go
[00:03.00] Go
[00:03.50] Go
[00:04.00] Go
[00:04.50] Go, shorty, 
[00:05.50] it's your birthday
[00:06.50] We gon' party
[00:07.00] Like
[00:07.50] it's your birthday
[00:08.50] We gon' sip Bacardi 
[00:09.00] like 
[00:09.50] it's your birthday
`;

interface Lyric {
  time: number;
  text: string;
}

const parseLyrics = (lyrics: string): Lyric[] => {
  const lines = lyrics.trim().split("\n");
  return lines
    .map((line) => {
      const match = line.match(/\[(\d{2}):(\d{2}).(\d{2})\]\s*(.*)/);
      if (!match) {
        return null;
      }
      const [, minutes, seconds, milliseconds, text] = match;
      const time =
        parseInt(minutes) * 60 +
        parseInt(seconds) +
        parseInt(milliseconds) / 100;
      return { time, text };
    })
    .filter(Boolean) as Lyric[];
};

const SyncedLyrics = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const parsedLyrics = parseLyrics(lyrics);
  const isInView = useInView(containerRef);

  useEffect(() => {
    if (!isInView) {
      setCurrentTime(0);
      setActiveLineIndex(-1);
      return;
    }

    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        const newTime = prevTime + 0.1;
        if (newTime > 12) {
          setCurrentTime(0);
          return 0;
        }
        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isInView]);

  useEffect(() => {
    const newIndex = parsedLyrics.findIndex(
      (line, index) =>
        line.time <= currentTime &&
        (index === parsedLyrics.length - 1 ||
          parsedLyrics[index + 1].time > currentTime)
    );
    setActiveLineIndex(newIndex);
  }, [currentTime, parsedLyrics]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center bg-gray-50 px-4 md:px-8 pb-20 md:pb-40"
    >
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-24 max-w-7xl w-full">
        <div className="relative">
          <h2 className="absolute -top-8 md:-top-12 left-1/2 transform -translate-x-1/2 font-bold text-gray-400 text-lg md:text-2xl tracking-wider uppercase">
            In Da Club
          </h2>
          <div className="flex flex-col md:flex-row md:gap-24 items-center">
            <div className="w-[16rem] h-[16rem] md:w-[28rem] md:h-[28rem] flex-shrink-0">
              <Image
                src="/Albums/get_rich_or_die_tryin.jpg"
                alt="Get Rich or Die Tryin' Album Cover"
                width={448}
                height={448}
                className="rounded-3xl object-cover w-full h-full shadow-lg"
                priority
              />
            </div>
            <div ref={lyricsRef} className="flex-1 relative h-[16rem] md:h-[28rem] mt-8 md:mt-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-96 overflow-hidden md:mt-52">
                  {parsedLyrics.map((lyric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{
                        opacity: index === activeLineIndex ? 1 : 0,
                        y: index === activeLineIndex ? 0 : 50,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={`absolute w-full text-center ${
                        index === activeLineIndex
                          ? "text-black font-bold"
                          : "text-gray-300 font-normal"
                      }`}
                    >
                      <span className="text-2xl md:text-8xl">{lyric.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);
};

export default SyncedLyrics;
