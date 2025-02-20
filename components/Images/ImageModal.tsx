import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

type ShowcaseImage = {
  src: string;
  alt: string;
  title: string;
  description: string;
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
    </>
  );
}