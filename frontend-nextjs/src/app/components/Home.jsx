"use client";
import { motion, AnimatePresence } from "framer-motion";
// import Dashboard from "./components/Dashboard";
// import Progress from "./components/Progress";
import TextAnim from "./TextAnim";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Pricing from "./Pricing";

export default function Home() {
  
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  const inViewAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
  };

  

  // Set up the IntersectionObserver to detect when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);  // Update state when the section enters/exits the viewport
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Start observing the section
    }

    // Cleanup the observer when component unmounts
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Stop observing
      }
    };
  }, []);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("File upload failed!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  return (
    <div className="flex flex-col items-center min-h-[80vh] w-full mt-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={inViewAnimation}
        viewport={{ once: true }}
        className="text-white mt-20 max-w-4xl mx-auto text-center"
      >
        <h1 className="text-[100px]  font-bold mb-6">
          <TextAnim text={"hello"}/>
        </h1>
        <p className="text-[20px] mb-8">
         Description
        </p>
      </motion.div>
      <div
        className="flex flex-row justify-center items-center gap-10"
      >
        <button className="hover:scale-120 transition-all duration-200 bg-white border-2 px-4 pb-2 pt-3 rounded-xl shadow-lg text-black hover:border-white hover:bg-transparent hover:text-white transition-1000">
          <Link href={""}>
            <h2 className="text-2xl font-semibold ">Upload</h2>
          </Link>
        </button>
        
      </div>
      <Pricing/>
    </div>
  );
}
