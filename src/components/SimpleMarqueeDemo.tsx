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
      "https://ia800905.us.archive.org/5/items/mbid-9da1a863-f3f2-4618-bdce-f0c88c055ba5/mbid-9da1a863-f3f2-4618-bdce-f0c88c055ba5-8201721911_thumb500.jpg",
    title: "✝",
    artist: "Justice",
  },
  {
    coverArt:
      "https://ia800909.us.archive.org/12/items/mbid-ee618541-23df-4973-afb7-e2d9f02e03d8/mbid-ee618541-23df-4973-afb7-e2d9f02e03d8-8154031977_thumb500.jpg",
    title: "By Your Side",
    artist: "Breakbot",
  },
  {
    coverArt:
      "https://ia800804.us.archive.org/20/items/mbid-3adfe4c6-0fa2-4813-a212-058d9a99b4a8/mbid-3adfe4c6-0fa2-4813-a212-058d9a99b4a8-16639897570_thumb500.jpg",
    title: "Still Waters",
    artist: "Breakbot",
  },
  {
    coverArt:
      "https://ia803403.us.archive.org/14/items/mbid-a7fcead9-ab9d-3d15-bb0d-a2b1945517dd/mbid-a7fcead9-ab9d-3d15-bb0d-a2b1945517dd-8093147470_thumb500.jpg",
    title: "Fancy Footwork",
    artist: "Chromeo",
  },
  {
    coverArt:
      "https://ia801301.us.archive.org/18/items/mbid-8acb4d6d-2cf9-4685-b4e8-5c9937621691/mbid-8acb4d6d-2cf9-4685-b4e8-5c9937621691-5651042668_thumb500.jpg",
    title: "Trax on da Rocks Vol. 2",
    artist: "Thomas Bangalter",
  },
  {
    coverArt:
      "https://ia904509.us.archive.org/32/items/mbid-cb844a4d-c02f-3199-b949-1656b36722da/mbid-cb844a4d-c02f-3199-b949-1656b36722da-8145217760_thumb500.jpg",
    title: "1999",
    artist: "Cassius",
  },
  {
    coverArt:
      "https://ia903201.us.archive.org/6/items/mbid-747ed90c-6479-4cec-a98a-b320a5ef75be/mbid-747ed90c-6479-4cec-a98a-b320a5ef75be-18417637214_thumb500.jpg",
    title: "Woman",
    artist: "Justice",
  },
  {
    coverArt:
      "https://ia800200.us.archive.org/5/items/mbid-9d0a791d-c0ed-4b99-bb31-976fad672408/mbid-9d0a791d-c0ed-4b99-bb31-976fad672408-1959533822_thumb500.jpg",
    title: "Modjo",
    artist: "Modjo",
  },
  {
    coverArt:
      "https://ia903106.us.archive.org/23/items/mbid-bbfc83ad-826f-4957-893d-a808105c828b/mbid-bbfc83ad-826f-4957-893d-a808105c828b-25063975521_thumb500.jpg",
    title: "Random Access Memories",
    artist: "Daft Punk",
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
          <h3 className="text-white text-sm sm:text-base md:text-lg font-medium z-30">
            {album.title}
          </h3>
          <p className="text-neutral-300 text-xs sm:text-sm md:text-base z-30">
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