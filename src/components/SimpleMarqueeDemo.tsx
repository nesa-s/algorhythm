"use client"

import type React from "react"
import { useState } from "react"
import SimpleMarquee from "@/components/SimpleMarquee"
import { motion } from "framer-motion"

interface Album {
  coverArt: string
  title: string
  artist: string
}

const albums: Album[] = [
  {
    coverArt:
    "https://i.pinimg.com/736x/8f/b9/21/8fb9214742fa17aec09e064087799b49.jpg",
    title: "SOS",
    artist: "SZA",
  },
  {
    coverArt:
    "https://archive.org/download/TameImpalaTheSlowRush/The%20Slow%20Rush.png",
    title: "The Slow Rush",
    artist: "Tame Impala",
  },
  {
    coverArt:
    "https://archive.org/download/nirvana-nevermind_202504/1-booklet%2001.jpg",
    title: "Nevermind",
    artist: "Nirvana",
  },
  {
    coverArt:
    "https://archive.org/download/the-marias-submarine/1200x1200bf-60.jpg",
    title: "Submarine",
    artist: "The Marias",
  },
  {
    coverArt:
    "https://archive.org/download/New_Division-_The_Eyes_2015/cover.jpg",
    title: "The Eyes",
    artist: "New Division",
  },
  {
    coverArt:
      "https://archive.org/download/FrankOceanchannelORANGE/channel%20ORANGE.png",
    title: "Channel Orange",
    artist: "Frank Ocean",
  },
  {
    coverArt:
    "https://archive.org/download/BROCKHAMPTONSATURATIONIII/SATURATION%20III.png",
    title: "Saturation III",
    artist: "BROCKHAMPTON",
  },
  {
    coverArt:
    "https://archive.org/download/the-weeknd-after-hours_20251004/0x1900-000000-80-0-0.jpg",
    title: "After Hours",
    artist: "The Weeknd",
  },
  {
    coverArt:
    "https://archive.org/download/kendrick-lamar-damn_202411/1-booklet%2001.jpg",
    title: "Damn",
    artist: "Kendrick Lamar",
  },
  
  {
    coverArt:
    "https://archive.org/download/LanaDelReyBorntoDie/%21Born%20to%20Die.png",
    title: "Born to Die",
    artist: "Lana Del Rey",
  },
]


const MarqueeItem = ({ album }: { album: Album }) => {
    const containerClasses = "relative mx-3 w-[160px] h-[160px] rounded-md overflow-hidden group cursor-pointer flex shadow-white/20 shadow-md bg-black transform-gpu"
    const imageClasses = "object-cover w-full h-full shadow-2xl absolute"
    const textContainerClasses =
      "absolute inset-0 flex flex-col items-center justify-center text-center px-2 leading-tight z-30"
  
    const variants = {
      initial: { scale: 1 },
      hover: { scale: 1.05, transition: { duration: 0.15, ease: "easeOut" } },
    }
    const textVariants = {
      initial: { opacity: 0 },
      hover: { opacity: 1, transition: { duration: 0.15, ease: "easeOut" } },
    }
    const imageVariants = {
      initial: { opacity: 1 },
      hover: { opacity: 0.45, transition: { duration: 0.15, ease: "easeOut" } },
    }
  
    return (
      <motion.div
        className={containerClasses}
        initial="initial"
        whileHover="hover"
        variants={variants}
      >
        <motion.div className={textContainerClasses} variants={textVariants}>
          <h3 className="marquee-text text-white text-sm sm:text-base md:text-lg font-medium z-30">
            {album.title}
          </h3>
          <p className="marquee-text text-neutral-300 text-xs sm:text-sm md:text-base z-30">
            {album.artist}
          </p>
        </motion.div>
        <motion.img
          src={album.coverArt}
          alt={`${album.title} by ${album.artist}`}
          draggable={false}
          className={imageClasses}
          variants={imageVariants}
        />
      </motion.div>
    )
  }

export default function SimpleMarqueeDemo() {
  const third = Math.floor(albums.length / 3)
  const firstThird = albums.slice(0, third)
  const secondThird = albums.slice(third, 2 * third)
  const lastThird = albums.slice(2 * third)

  const [container, setContainer] = useState<HTMLElement | null>(null)

  return (
    <div className="relative bg-white py-12 px-6 space-y-8" ref={(node) => setContainer(node)}>
      <div className="max-w-6xl mx-auto space-y-8">
        {[firstThird, secondThird, lastThird].map((row, i) => (
          <SimpleMarquee
            key={i}
            className="w-full"
            baseVelocity={8}
            repeat={4}
            draggable={false}
            scrollSpringConfig={{ damping: 50, stiffness: 400 }}
            slowDownFactor={0.1}
            slowdownOnHover
            slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
            scrollAwareDirection
            scrollContainer={container}
            useScrollVelocity
            direction={i % 2 === 0 ? "left" : "right"}
          >
            {row.map((album, j) => (
              <MarqueeItem key={j} album={album} />
            ))}
          </SimpleMarquee>
        ))}
      </div>
    </div>
  )
}