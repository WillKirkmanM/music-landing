"use client";

import SyncedLyrics from "@/components/Lyrics/SyncedLyrics";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';

type ShowcaseImage = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

const useWrapArray = (arr: string[], duplicates: number = 2) => {
  return [...Array(duplicates)].flatMap(() => [...arr]);
};

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ImageModal = ({ image, isOpen, onClose }: { 
  image: ShowcaseImage | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  if (!isOpen || !image) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-7xl w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={1920}
          height={1440}
          className="w-full h-auto rounded-2xl shadow-2xl"
          priority
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const albums = [
    "9.jpg",
    "aaliyah.png",
    "gnx.jpg",
    "my_love_is_your_love.png",
    "scorpion.jpg",
    "soldier_of_love.png",
    "the_slim_shady_lp.jpg",
    "touch.png",
    "get_rich_or_die_tryin.jpg",
    "all_i_have.jpg",
    "love_deluxe.jpg",
    "one_in_a_million.jpg",
    "stronger_than_pride.png",
    "promise.png",
    "the_best_of_sade.png",
    "the_ultimate_collection.png",
    "relapse.jpg",
    "the_marshall_mathers_lp.jpg",
    "tha_carter_III.jpg",
    "tha_carter_I.jpg",
    "justified.png",
    "sail_out.png",
    "moodring.png",
    "thriller.png",
    "bad.jpg",
    "chris_brown.jpg",
    "mr_morale_and_the_big_steppers.png",
    "damn.jpg",
    "24k_magic.jpg",
  ];

  const wrappedAlbums = useWrapArray(albums);

  const interviews1 = [
    "50-cent.jpg",
    "amerie.jpg",
    "beyonce.webp",
    "rihanna.jpg",
  ];

  const interviews2 = [
    "eminem.webp",
    "kendrick-lamar.webp",
    "snoop-dogg.webp",
    "sade.jpg",
    "michael-jackson.jpg",
  ];

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current || !videoContainerRef.current) return;

    videoRef.current.playbackRate = 0.5;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(videoContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const [selectedImage, setSelectedImage] = useState<ShowcaseImage | null>(null);

  const showcaseImages: ShowcaseImage[] = [
    {
      src: "/Showcase/artist.png",
      alt: "Artist Showcase",
      title: "Artist View",
      description: "Dive deep into artist collections"
    },
    {
      src: "/Showcase/album.png",
      alt: "Album Showcase",
      title: "Album View",
      description: "Experience your music in detail"
    }
  ];

  return (
    <>
      <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
        <div ref={videoContainerRef} className="absolute inset-0 -z-10">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110 blur-3xl"
          >
            <source src="/Showcase/particles.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br opacity-30 from-purple-900/90 via-purple-800/90 to-purple-600/90"></div>
        </div>

        <motion.main
          className="text-center max-w-4xl mx-auto relative z-10"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
            variants={fadeInUp}
          >
            Take Control
            <br />
            of Your Music
          </motion.h1>
          <motion.p
            className="text-gray-200 px-4 md:px-20 font-bold text-lg md:text-xl mb-8 leading-relaxed"
            variants={fadeInUp}
          >
            Take control of your media, always ad-free. Hear next-level sound
            quality with lossless, uncompressed audio. Take center stage with
            synced lyrics. Access exclusive interviews and music videos. And
            listen across all your devices, online or off. The music app for
            enthusiasts.
          </motion.p>
          <Link href="https://github.com/WillKirkmanM/music#get-started">
            <motion.button
              className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get ParsonLabs Music
            </motion.button>
          </Link>
        </motion.main>
      </div>

      <motion.div
        className="min-h-screen bg-white flex items-center justify-center px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="rounded-3xl p-8 md:p-32 lg:p-48 max-w-[80%] w-full mx-auto text-center my-12 md:my-48 relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/Images/disc.jpg"
            alt="Audio Quality Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-0"></div>
          <h2 className="font-bold text-gray-200 opacity-50 text-xl md:text-2xl mb-8 tracking-wider relative z-10">
            Audio Quality
          </h2>
          <h3 className="font-bold text-white text-4xl md:text-5xl lg:text-7xl tracking-tight relative z-10">
            Enter a New
            <br />
            Dimension of Sound
          </h3>
        </motion.div>
      </motion.div>

      <motion.div
        className="min-h-screen bg-gray-50 flex items-center justify-center px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="rounded-3xl p-8 md:p-32 lg:p-48 max-w-[80%] w-full mx-auto text-center my-12 md:my-48 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4"
              animate={{
                y: ["0%", "-50%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {wrappedAlbums.map((album, index) => (
                <motion.img
                  key={index}
                  src={`/Albums/${album}`}
                  alt=""
                  className="w-64 h-64 object-cover rounded-lg shadow-xl"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    duration: 0.3,
                  }}
                />
              ))}
            </motion.div>
          </div>

          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-96"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 70%)",
            }}
          ></div>

          <div className="relative z-10">
            <h2 className="font-bold text-gray-400 text-xl md:text-2xl mb-8 tracking-wider uppercase">
              Music Discovery
            </h2>
            <h3 className="font-bold text-4xl md:text-5xl lg:text-7xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#c94735] via-[#cd8d6e] to-[#d2b8a3]">
              Where your new
              <br />
              favourites find you.
            </h3>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="min-h-screen bg-gray-50 flex items-center justify-center px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="rounded-3xl p-8 md:p-52 lg:p-72 max-w-[95%] md:max-w-[130%] w-full mx-auto text-center my-12 md:my-48 relative bg-white">
          <h2 className="font-bold text-gray-400 text-xl md:text-2xl mb-8 tracking-wider">
            Exclusive Content
          </h2>
          <h3 className="font-bold text-gray-900 text-4xl md:text-5xl lg:text-7xl tracking-tight mb-16">
            VIP access.
            <br />
            It's here.
          </h3>

          <div className="relative overflow-hidden mb-8">
            <motion.div
              className="flex gap-1"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {useWrapArray(interviews1).map((interview, index) => (
                <motion.div
                  key={index}
                  className="flex-none w-[280px] sm:w-[400px] md:w-[500px]"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <div className="aspect-video overflow-hidden rounded-2xl shadow-lg relative">
                    <img
                      src={`/Interviews/${interview}`}
                      alt={`Interview with ${interview.split(".")[0]}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold text-lg">
                        {interview
                          .split(".")[0]
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-1"
              animate={{
                x: ["-50%", "0%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {useWrapArray(interviews2).map((interview, index) => (
                <motion.div
                  key={index}
                  className="flex-none w-[280px] sm:w-[400px] md:w-[500px]"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <div className="aspect-video overflow-hidden rounded-2xl shadow-lg relative">
                    <img
                      src={`/Interviews/${interview}`}
                      alt={`Interview with ${interview.split(".")[0]}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold text-lg">
                        {interview
                          .split(".")[0]
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>


<motion.div
  className="min-h-screen bg-gray-50 flex items-center justify-center px-8"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <div className="max-w-6xl mx-auto w-full text-center">
    <h2 className="font-bold text-gray-400 text-xl md:text-2xl mb-8 tracking-wider">
      Synced Lyrics
    </h2>
    <h3 className="font-bold text-gray-900 text-4xl md:text-5xl lg:text-7xl tracking-tight mb-8">
      Sing Along
    </h3>
  </div>
</motion.div>

<SyncedLyrics />

<motion.div
  className="min-h-screen bg-gray-50 flex items-center justify-center px-4 md:px-8 py-16"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <div className="max-w-[90rem] mx-auto w-full text-center">
    <h2 className="font-bold text-gray-400 text-xl md:text-2xl mb-8 tracking-wider">
      Looks Phenomenal
    </h2>
    <h3 className="font-bold text-gray-900 text-4xl md:text-5xl lg:text-7xl tracking-tight mb-16">
      Your Collection,
      <br />
      Beautifully Displayed
    </h3>

    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {showcaseImages.map((image, index) => (
        <motion.div
          key={index}
          className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] mx-auto w-full max-w-4xl cursor-pointer"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.2 }}
          onClick={() => setSelectedImage(image)}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={1920}
            height={1440}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
            <p className="text-white text-xl md:text-2xl font-semibold mb-2">{image.title}</p>
            <p className="text-gray-200 text-base md:text-lg">{image.description}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <ImageModal
      image={selectedImage}
      isOpen={!!selectedImage}
      onClose={() => setSelectedImage(null)}
    />
  </div>
</motion.div>

      <motion.div
        className="min-h-screen bg-white flex items-center justify-center px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto w-full text-center">
          <h2 className="font-bold text-gray-400 text-xl md:text-2xl mb-8 tracking-wider">
            Get Started
          </h2>
          <h3 className="font-bold text-gray-900 text-4xl md:text-5xl lg:text-7xl tracking-tight mb-16">
            Own Your
            <br />
            Music
          </h3>

          <motion.div
            className="bg-gray-50 rounded-xl p-4 md:p-8 text-left overflow-hidden max-w-[95%] md:max-w-2xl mx-auto relative shadow-xl"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute top-4 right-4 flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <pre className="text-gray-600 font-mono text-xs md:text-sm lg:text-base overflow-x-auto">
              <code>{`services:
            music-server:
              image: ghcr.io/willkirkmanm/music
              container_name: parsonlabs-music
              ports:
                - "1993:1993"
              volumes:
                - "/path/to/config:/ParsonLabsMusic"
                - "/path/to/music:/music"
              restart: unless-stopped`}</code>
            </pre>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
