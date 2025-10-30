// "use client";

// import VibrantBackground from "@/components/TryOnExperience";
// import React from "react";

// export default function Home() {
//   return (
//     <main className="h-screen w-full">
//       <VibrantBackground />
//       {/* Other page content */}
//     </main>
//   );
// }

"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, Stars } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import Link from "next/link";
import { Button, Container, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useFrame } from "@react-three/fiber";

import Navbar from "@/components/navbar";
import BackgroundPaths from "@/components/BackgroundPath";

const BrainModel = ({
  setShowPopup,
}: {
  setShowPopup: (show: boolean) => void;
}) => {
  const { scene } = useGLTF("/t_shirt_body_male_copy.glb");
  const brainRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (brainRef.current) {
      brainRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      ref={brainRef}
      object={scene}
      scale={0.8}
      onPointerOver={() => setShowPopup(true)}
      onPointerOut={() => setShowPopup(false)}
    />
  );
};

const StarField = () => {
  return (
    <Stars radius={50} depth={50} count={1500} factor={5} saturation={0} fade />
  );
};

export default function GLBScene() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-cyan-600 to-black flex flex-col items-center text-center">
      <BackgroundPaths />
      {/* Navbar covering full width */}
      <Navbar />

      <div className="flex flex-row w-full h-full items-center justify-between p-7 mt-5">
        {/* Left Section - Content */}
        <Container
          maxWidth="md"
          className="relative z-10 w-1/2 text-left -mt-50"
        >
          <motion.h1
            className="text-6xl font-bold  bg-gradient-to-r from-teal-400 via-green-500 to-lime-600 bg-clip-text text-transparent

   leading-tight "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Fashion Revolution
          </motion.h1>
          <br />

          <Typography variant="h6" className="mt-4 text-gray-300 ">
            "Beyond trends, beyond time. A revolution stitched in passion, woven
            with innovation."
          </Typography>
          {/* Floating Drones */}
          <br />
          <br />

          <div className="flex flex-col items-center mt-10 -ml-40">
            <motion.div
              className="-mt-15 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6366f1",
                  padding: "10px 20px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.5)",
                  ":hover": {
                    backgroundColor: "#4f46e5",
                    transform: "scale(1.05)",
                    transition: "transform 0.2s ease-in-out",
                  },
                }}
              >
                Get Started
              </Button> */}

              <Link href="/mainpage">
                <button
                  className="relative px-8 py-3 text-lg font-bold uppercase tracking-wider text-white
  bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full shadow-lg transition-all
  duration-300 ease-in-out hover:from-pink-500 hover:to-yellow-500 hover:shadow-pink-500/50
  active:scale-95 before:absolute before:inset-0 before:rounded-full before:border-2
  before:border-white/30 before:animate-pulse hover:before:border-yellow-400/50
  animate-glow"
                >
                  Get Started
                </button>
              </Link>
            </motion.div>
          </div>
        </Container>

        {/* Right Section - Brain Model */}
        <div className="relative w-3/4 h-full flex items-center justify-center">
          <Canvas
            camera={{ position: [0, 2, 5], fov: 50 }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <StarField />
              <BrainModel setShowPopup={setShowPopup} />
            </Suspense>
            <directionalLight position={[5, 5, 5]} intensity={3} castShadow />
            <ambientLight intensity={0.5} />
            <Environment preset="night" />
            <OrbitControls enableZoom enablePan enableRotate autoRotate />
          </Canvas>
        </div>
      </div>

      {/* Pop-up Box (About Us) */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="absolute ml-7 top-1/2 right-1/4 transform -translate-y-1/2 bg-slate-800 bg-opacity-90 p-6 rounded-lg shadow-lg border border-gray-700 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h3" className="text-cyan-400 font-bold">
              Overview
            </Typography>
            <br />
            <Typography variant="body1" className="text-gray-300 mt-2">
              Welcome to StyleSync, the ultimate AI-powered platform designed
              for fashion enthusiasts and creators.
              <br />
              <br />
              Whether you're a designer, trendsetter, or just someone who loves
              unique fashion, we empower you with cutting-edge AI tools to
              customize, preview, and personalize your clothing like never
              before.
              <br /> <br />
              In a world where fashion meets technology, we bridge the gap by
              offering AI-driven solutions that enhance real-time garment
              customization, 3D previews, material selection, and seamless
              online ordering—all in one place.
              <br /> <br />
              With intelligent automation, interactive design tools, and a
              user-friendly interface, you can focus on what truly
              matters—creating personalized fashion that reflects your style.
              <br /> <br />
              Our mission is simple: Make fashion customizable, accessible, and
              limitless. 🚀
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
