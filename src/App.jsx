/**
 * Portfolio Website - DataByte Electric Blue Design
 * Created by Parth Patidar
 * 
 * Features:
 * - Wave particle background (canvas-based)
 * - Water ripple cursor effect
 * - Scroll-reveal animations
 * - Glassmorphic components
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./index.css";
import ShiftTabs from "./components/animata/tabs/shift-tabs";
import StackedSections from "./components/animata/scroll/stacked-sections";

// ===============================================
// TYPEWRITER EFFECT COMPONENT (Real typing + deleting + blinking cursor)
// ===============================================
const TypewriterEffect = ({ texts, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    const currentText = texts[currentIndex];
    
    // If paused (after finishing typing), wait before deleting
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }
    
    // Typing logic
    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        // Type next character
        const typeTimer = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(typeTimer);
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
      }
    } 
    // Deleting logic
    else {
      if (displayText.length > 0) {
        // Delete character
        const deleteTimer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(deleteTimer);
      } else {
        // Finished deleting, move to next text
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayText, currentIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseDuration]);

  // Find longest text to reserve space prevents layout shift
  const longestText = texts.reduce((a, b) => a.length > b.length ? a : b, "");
  
  return (
    <span className="typewriter-container" style={{ display: 'inline-grid', verticalAlign: 'bottom' }}>
      {/* Invisible text to reserve maximum space */}
      <span style={{ visibility: 'hidden', gridArea: '1/1', whiteSpace: 'nowrap' }}>{longestText}|</span>
      
      {/* Visible typing text overlay */}
      <span className="typewriter" style={{ gridArea: '1/1', whiteSpace: 'nowrap' }}>
        {displayText}
        <span className="typewriter-cursor">|</span>
      </span>
    </span>
  );
};

// Keep AnimatedText as alias for compatibility
const AnimatedText = TypewriterEffect;

// ===============================================
// PREMIUM GRID BACKGROUND (Exact Figma Reference)
// ===============================================
const GridBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    
    const setCanvasSize = () => {
      // For position: fixed, use viewport dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial size
    setCanvasSize();
    
    // Debounced resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasSize, 100);
    };
    window.addEventListener('resize', handleResize);
    
    const drawBackground = () => {
      // Deep navy to black gradient (#0A0F1E → #020409)
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, '#0A0F1E');
      bgGradient.addColorStop(0.5, '#060A14');
      bgGradient.addColorStop(1, '#020409');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    const drawGrid = () => {
      const gridSize = 50;
      
      // Draw grid with fade toward bottom
      for (let y = 0; y < canvas.height; y += gridSize) {
        // Fade grid opacity toward bottom of each viewport section
        const viewportY = y % window.innerHeight;
        const fadeProgress = viewportY / window.innerHeight;
        const baseOpacity = 0.15 - (fadeProgress * 0.1); // Fade from 15% to 5%
        
        // Horizontal lines
        ctx.strokeStyle = `rgba(111, 168, 255, ${Math.max(0.03, baseOpacity * 0.8)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines with similar fade
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.strokeStyle = `rgba(111, 168, 255, 0.12)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
    };
    
    const drawLightRays = () => {
      const pulse = 1 + Math.sin(time * 0.002) * 0.05;
      
      // Main radial glow from top-right corner (#9EC9FF)
      const mainGlow = ctx.createRadialGradient(
        canvas.width * 1.1, -canvas.height * 0.1, 0,
        canvas.width * 0.5, canvas.height * 0.3, canvas.width * 0.8
      );
      mainGlow.addColorStop(0, `rgba(158, 201, 255, ${0.25 * pulse})`);
      mainGlow.addColorStop(0.2, `rgba(127, 179, 255, ${0.15 * pulse})`);
      mainGlow.addColorStop(0.5, `rgba(111, 168, 255, ${0.08 * pulse})`);
      mainGlow.addColorStop(1, 'transparent');
      
      ctx.fillStyle = mainGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Secondary soft glow (blue-white bloom)
      const bloomGlow = ctx.createRadialGradient(
        canvas.width, 0, 0,
        canvas.width * 0.6, canvas.height * 0.2, canvas.width * 0.5
      );
      bloomGlow.addColorStop(0, `rgba(200, 220, 255, ${0.2 * pulse})`);
      bloomGlow.addColorStop(0.3, `rgba(158, 201, 255, ${0.1 * pulse})`);
      bloomGlow.addColorStop(0.6, `rgba(111, 168, 255, ${0.04 * pulse})`);
      bloomGlow.addColorStop(1, 'transparent');
      
      ctx.fillStyle = bloomGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    const addNoiseOverlay = () => {
      // Very subtle noise/grain (cinematic feel)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 8; // Very subtle
        data[i] += noise;     // R
        data[i + 1] += noise; // G
        data[i + 2] += noise; // B
      }
      
      ctx.putImageData(imageData, 0, 0);
    };
    
    const render = () => {
      time++;
      
      drawBackground();
      drawGrid();
      drawLightRays();
      
      // Only add noise occasionally for performance
      if (time % 30 === 0) {
        // Skip noise for performance - it's very subtle anyway
      }
      
      animationId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="grid-canvas" />;
};

// ===============================================
// WATER RIPPLE CURSOR EFFECT
// ===============================================
const useWaterRipple = () => {
  useEffect(() => {
    const createRipple = (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 800);
    };
    
    document.addEventListener('click', createRipple);
    return () => document.removeEventListener('click', createRipple);
  }, []);
};

// ===============================================
// SCROLL REVEAL HOOK
// ===============================================
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);
};

// ===============================================
// ICON COMPONENTS
// ===============================================
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.52 10.41.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.66-3.71-1.28-3.71-1.28-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.66.08-.66 1.09.08 1.66 1.12 1.66 1.12.98 1.67 2.56 1.19 3.18.91.1-.71.38-1.19.68-1.46-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.12-2.95-.11-.28-.49-1.4.1-2.91 0 0 .93-.3 3.05 1.13.88-.24 1.83-.36 2.77-.36.94 0 1.88.12 2.77.36 2.12-1.43 3.05-1.13 3.05-1.13.59 1.51.21 2.63.1 2.91.69.77 1.12 1.75 1.12 2.95 0 4.22-2.57 5.15-5.02 5.43.39.33.73.98.73 1.98 0 1.43-.01 2.58-.01 2.94 0 .29.2.64.75.53 4.37-1.45 7.52-5.56 7.52-10.41C23.01 5.24 18.27.5 12 .5z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="14" height="14">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="18" height="18">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

const LangChainIcon = ({ className, style }) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} style={{ width: '18px', height: '18px', display: 'inline-block', fill: 'currentColor', ...style }}>
    <desc>Langchain Streamline Icon</desc>
    <title>LangChain</title>
    <path d="M6.0988 5.9175C2.7359 5.9175 0 8.6462 0 12s2.736 6.0825 6.0988 6.0825h11.8024C21.2641 18.0825 24 15.3538 24 12s-2.736 -6.0825 -6.0988 -6.0825ZM5.9774 7.851c0.493 0.0124 1.02 0.2496 1.273 0.6228 0.3673 0.4592 0.4778 1.0668 0.8944 1.4932 0.5604 0.6118 1.199 1.1505 1.7161 1.802 0.4892 0.5954 0.8386 1.2937 1.1436 1.9975 0.1244 0.2335 0.1257 0.5202 0.31 0.7197 0.0908 0.1204 0.5346 0.4483 0.4383 0.5645 0.0555 0.1204 0.4702 0.286 0.3263 0.4027 -0.1944 0.04 -0.4129 0.0476 -0.5616 -0.1074 -0.0549 0.126 -0.183 0.0596 -0.2819 0.0432a4 4 0 0 0 -0.025 0.0736c-0.3288 0.0219 -0.5754 -0.3126 -0.732 -0.565 -0.3111 -0.168 -0.6642 -0.2702 -0.982 -0.446 -0.0182 0.2895 0.0452 0.6485 -0.231 0.8353 -0.014 0.5565 0.8436 0.0656 0.9222 0.4804 -0.061 0.0067 -0.1286 -0.0095 -0.1774 0.0373 -0.2239 0.2172 -0.4805 -0.1645 -0.7385 -0.007 -0.3464 0.174 -0.3808 0.3161 -0.8096 0.352 -0.0237 -0.0359 -0.0143 -0.0592 0.0059 -0.0811 0.1207 -0.1399 0.1295 -0.3046 0.3356 -0.3643 -0.2122 -0.0334 -0.3899 0.0833 -0.5686 0.1757 -0.2323 0.095 -0.2304 -0.2141 -0.5878 0.0164 -0.0396 -0.0322 -0.0208 -0.0615 0.0018 -0.0864 0.0908 -0.1107 0.2102 -0.127 0.345 -0.1208 -0.663 -0.3686 -0.9751 0.4507 -1.2813 0.0432 -0.092 0.0243 -0.1265 0.1068 -0.1845 0.1652 -0.05 -0.0548 -0.0123 -0.1212 -0.0099 -0.1857 -0.0598 -0.028 -0.1356 -0.041 -0.1179 -0.1366 -0.1171 -0.0395 -0.1988 0.0295 -0.286 0.0952 -0.0787 -0.0608 0.0532 -0.1492 0.0776 -0.2125 0.0702 -0.1216 0.23 -0.025 0.3111 -0.1126 0.2306 -0.1308 0.552 0.0814 0.8155 0.0455 0.203 0.0255 0.4544 -0.1825 0.3526 -0.39 -0.2171 -0.2767 -0.179 -0.6386 -0.1839 -0.9695 -0.0268 -0.1929 -0.491 -0.4382 -0.6252 -0.6462 -0.1659 -0.1873 -0.295 -0.4047 -0.4243 -0.6182 -0.4666 -0.9008 -0.3198 -2.0584 -0.9077 -2.8947 -0.266 0.1466 -0.6125 0.0774 -0.8418 -0.119 -0.1238 0.1125 -0.1292 0.2598 -0.139 0.4161 -0.297 -0.2962 -0.2593 -0.8559 -0.022 -1.1855 0.0969 -0.1302 0.2127 -0.2373 0.342 -0.3316 0.0292 -0.0213 0.0391 -0.0419 0.0385 -0.0747 0.1174 -0.5267 0.5764 -0.7391 1.0694 -0.7267m12.4071 0.46c0.5575 0 1.0806 0.2159 1.474 0.6082s0.61 0.9145 0.61 1.4704c0 0.556 -0.2167 1.078 -0.61 1.4698v0.0006l-0.902 0.8995a2.08 2.08 0 0 1 -0.8597 0.5166l-0.0164 0.0047 -0.0058 0.0164a2.05 2.05 0 0 1 -0.474 0.7308l-0.9018 0.8995c-0.3934 0.3924 -0.917 0.6083 -1.4745 0.6083s-1.0806 -0.216 -1.474 -0.6083c-0.813 -0.8107 -0.813 -2.1294 0 -2.9402l0.9019 -0.8995a2.056 2.056 0 0 1 0.858 -0.5143l0.017 -0.0053 0.0058 -0.0158a2.07 2.07 0 0 1 0.4752 -0.7337l0.9018 -0.8995c0.3934 -0.3924 0.9171 -0.6083 1.4745 -0.6083zm0 0.8965a1.18 1.18 0 0 0 -0.8388 0.3462l-0.9018 0.8995a1.181 1.181 0 0 0 -0.3427 0.9252l0.0053 0.0572c0.0323 0.2652 0.149 0.5044 0.3374 0.6917 0.13 0.1296 0.2733 0.2114 0.4471 0.2686a0.9 0.9 0 0 1 0.014 0.1582 0.884 0.884 0 0 1 -0.2609 0.6304l-0.0554 0.0554c-0.3013 -0.1028 -0.5525 -0.253 -0.7794 -0.4792a2.06 2.06 0 0 1 -0.5761 -1.0968l-0.0099 -0.0578 -0.0461 0.0368a1.1 1.1 0 0 0 -0.0876 0.0794l-0.9024 0.8995c-0.4623 0.461 -0.4623 1.212 0 1.673 0.2311 0.2305 0.535 0.346 0.8394 0.3461 0.3043 0 0.6077 -0.1156 0.8388 -0.3462l0.9019 -0.8995c0.4623 -0.461 0.4623 -1.2113 0 -1.673a1.17 1.17 0 0 0 -0.4367 -0.2749 1 1 0 0 1 -0.014 -0.1611c0 -0.2591 0.1023 -0.505 0.2901 -0.6923 0.3019 0.1028 0.57 0.2694 0.7962 0.495 0.3007 0.2999 0.4994 0.679 0.5756 1.0968l0.0105 0.0578 0.0455 -0.0373a1.1 1.1 0 0 0 0.0887 -0.0794l0.902 -0.8996c0.4622 -0.461 0.4628 -1.2124 0 -1.6735a1.18 1.18 0 0 0 -0.8395 -0.3462Zm-9.973 5.1567 -0.0006 0.0006c-0.0793 0.3078 -0.1048 0.8318 -0.506 0.847 -0.033 0.1776 0.1228 0.2445 0.2655 0.1874 0.141 -0.0645 0.2081 0.0508 0.2557 0.1657 0.2177 0.0317 0.5394 -0.0725 0.5516 -0.3298 -0.325 -0.1867 -0.4253 -0.5418 -0.5662 -0.8709" />
  </svg>
);

// ===============================================
// DATA
// ===============================================
const SOCIAL_LINKS = {
  github: "https://github.com/parthpatidar03",
  linkedin: "https://www.linkedin.com/in/patidar-parth/"
};

const PROJECTS = [
  {
    title: "QuestXP: High-Performance Learning Platform",
    date: "Jun 2026",
    tech: ["React", "Node.js", "Express", "MongoDB", "Valkey", "BullMQ", "Pinecone", "Azure"],
    description: "Gamified Learning Management System that eliminates playlist fatigue by programmatically transforming YouTube videos/playlists into modular structured courses.",
    features: [
      "AI course generation using BullMQ pipeline, YouTube API, and GPT-4o-mini",
      "Lecture-grounded RAG doubt chatbot with Pinecone namespaces and OpenAI embeddings",
      "Adaptive study plans via pure-JS greedy allocation engine with daily recalculation",
      "Gamified streak system, leaderboard, private squads (FriendZones) with hashed OTPs"
    ],
    github: "https://github.com/parthpatidar03/QuestXP",
    live: "https://www.questxp.in/"
  },
  {
    title: "Context-Aware PDF QA System",
    date: "Apr 2026",
    tech: ["FastAPI", "React", "LangChain", "Gemini AI", "Qdrant", "Docker"],
    description: "AI-powered document intelligence system that solves information retrieval from large PDFs using Retrieval-Augmented Generation (RAG).",
    features: [
      "Semantic search, vector embeddings, contextual chunk retrieval, and conversational querying for accurate context-aware responses",
      "Scalable document ingestion and retrieval pipelines with FastAPI, LangChain, and Qdrant Vector Database",
      "Robust containerized development environment fully orchestrated via Docker"
    ],
    github: "https://github.com/parthpatidar03/RAG-Based-Pdf-Chatbot"
  },
  {
    title: "Reel-to-Real: AI Place Discovery Platform",
    date: "Feb 2026",
    tech: ["React", "Express", "MongoDB", "Redis", "OpenAI"],
    description: "AI-powered platform to extract venue data from Instagram Reels for travel discovery.",
    features: [
      "OpenAI Whisper, GPT-4, Tesseract OCR (70-80% accuracy)",
      "BullMQ async queues with <200ms API response",
      "Geospatial 2dsphere indexing in MongoDB",
      "Mapbox GL frontend with Zustand state management"
    ],
    github: "https://github.com/parthpatidar03/Reel2Real"
  },
  {
    title: "Smart Campus E-Gate Entry-Exit System",
    date: "Dec 2025",
    tech: ["React", "EJS", "Node.js", "Express", "MongoDB"],
    description: "Secure campus access management system for NIT Trichy digitizing entry-exit verification.",
    features: [
      "OTP-based auth & time-bound QR code generation",
      "Guard-facing interface for real-time scanning",
      "JWT-based auth with RBAC implementation",
      "Automated audit logs for accountability"
    ],
    github: "https://github.com/parthpatidar03/smart-campus-egate"
  },
  {
    title: "Book Buddy: Personal Library Management",
    date: "Oct 2025",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    description: "Full-stack reading tracker with role-based access control and personalized recommendations.",
    features: [
      "JWT authentication & MongoDB compound indexing",
      "Collaborative filtering with Gutendex API",
      "8+ MVC controllers with real-time progress tracking",
      "Multer file uploads & analytics dashboards"
    ],
    github: "https://github.com/parthpatidar03/Book-Buddy"
  }
];

const SKILLS = [
  {
    category: "Programming Languages",
    items: ["C++", "JavaScript", "Python", "TypeScript"]
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Redux", "Node.js", "Express.js", "FastAPI", "Next.js"]
  },
  {
    category: "AI & GenAI Tools",
    items: ["LangChain", "OpenAI API", "Hugging Face", "Ollama", "MCP"]
  },
  {
    category: "Databases",
    items: ["MongoDB", "PostgreSQL", "SQL", "Qdrant (Vector)"]
  },
  {
    category: "Developer Tools",
    items: ["Git", "GitHub", "Docker", "Postman", "AWS (Basic)"]
  },
  {
    category: "Web Development",
    items: ["HTML/CSS", "TailwindCSS", "REST APIs", "WebSockets"]
  }
];

// ===============================================
// NAVBAR COMPONENT
// ===============================================
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const isClickScrolling = useRef(false);
  const timeoutRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" }
  ];

  // Scrollspy logic: update active tab on scroll
  useEffect(() => {
    const sections = navLinks.map(link => document.querySelector(link.href));
    
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when section occupies the main screen area
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (isClickScrolling.current) return;
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          const index = navLinks.findIndex(link => link.href === id);
          if (index !== -1) {
            setActiveTab(index);
          }
        }
      });
    }, observerOptions);
    
    sections.forEach(section => {
      if (section) observer.observe(section);
    });
    
    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleTabChange = (index) => {
    setActiveTab(index);
    const link = navLinks[index];
    if (link) {
      const element = document.querySelector(link.href);
      if (element) {
        // Temporarily disable scrollspy during smooth scroll
        isClickScrolling.current = true;
        element.scrollIntoView({ behavior: "smooth" });
        
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          isClickScrolling.current = false;
        }, 800); // Wait for smooth scroll to finish
      }
    }
  };
  
  return (
    <nav className="navbar" style={{ background: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0.8)' }}>
      <div className="container navbar-content">
        <div className="navbar-brand">
          Parth Patidar
          <div className="social-dropdown">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
        </div>
        
        <div className="nav-links">
          <ShiftTabs activeIndex={activeTab} onActiveIndexChange={handleTabChange}>
            <ShiftTabs.List aria-label="Navigation">
              {navLinks.map((link, index) => (
                <ShiftTabs.Tab key={link.href} label={link.label}>
                  <ShiftTabs.Label>{link.label}</ShiftTabs.Label>
                </ShiftTabs.Tab>
              ))}
            </ShiftTabs.List>
          </ShiftTabs>
        </div>
        
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <div className={`mobile-nav ${mobileOpen ? 'active' : ''}`}>
        <div className="nav-links">
          {navLinks.map((link, index) => (
            <a 
              key={link.href} 
              href={link.href} 
              className="nav-link" 
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                handleTabChange(index);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

// ===============================================
// HERO SECTION
// ===============================================
const HeroSection = () => (
  <section id="home" className="hero section">
    <div className="container">
      <div className="hero-content">
        <div className="hero-text reveal">
          <h1 className="two-tone-text">
            Hi, I'm <AnimatedText texts={["Parth Patidar", "a Full-Stack Developer", "an AI Agent Builder", "an Open Source Contributor"]} />
          </h1>
          <p className="subtitle">Full-Stack Dev • AI Agents & RAG • Open Source • Building What's Next</p>
          <p className="description">
            Pre-final year B.Tech student at NIT Trichy, building at the intersection of 
            full-stack development and AI — from RAG pipelines to agentic systems. Active 
            open-source contributor, startup-minded builder, and a relentless learner always 
            chasing the next breakthrough in tech.
          </p>
          <div className="hero-buttons">
            <a 
              href="https://drive.google.com/file/d/12AYv-pRTZCvLIgfA4IeyaqQQEqw0Jq5u/view" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Download Resume
            </a>
            <a href="#projects" className="btn btn-secondary">
              View My Work
            </a>
          </div>
          
          {/* Prominent Social Links */}
          <div className="hero-social-links">
            <a 
              href={SOCIAL_LINKS.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-social-link github"
            >
              <GitHubIcon /> GitHub
            </a>
            <a 
              href={SOCIAL_LINKS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-social-link linkedin"
            >
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </div>
        
        <div className="hero-image reveal">
          <img 
            src="https://ik.imagekit.io/qfvuxdt5o/Gemini_Generated_Image_sq6ehusq6ehusq6e.png?updatedAt=1762272137414" 
            alt="Parth Patidar" 
            className="hero-avatar"
          />
          <div className="status-badge">
            <span className="status-dot"></span>
            Open for Internships
          </div>
        </div>
      </div>
      
      <div className="stats-bar reveal">
        <div className="stat-card">
          <div className="stat-number">10+</div>
          <div className="stat-label">Projects Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">2+</div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">300+</div>
          <div className="stat-label">DSA Problems Solved</div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <a href="#skills" style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          Scroll to explore <ArrowDownIcon />
        </a>
      </div>
    </div>
  </section>
);

// ===============================================
// SKILLS SECTION
// ===============================================
const MARQUEE_TRACK_1 = [
  "C++", "JavaScript", "React", "Express.js", "Nodemon", "MongoDB", "Python", "GitHub", "HTML5", "CSS3", "TailwindCSS", "Redux", "Socket.io", "Vite", "FastAPI"
];

const MARQUEE_TRACK_2 = [
  "Postman", "Vercel", "TypeScript", "Next.js", "LangChain", "OpenAI API", "Hugging Face", "Ollama", "MCP", "PostgreSQL", "Qdrant (Vector)", "Docker", "AWS", "WebSockets", "REST APIs", "Git"
];

const TECH_ICONS = {
  "C++": "devicon-cplusplus-plain colored",
  "JavaScript": "devicon-javascript-plain colored",
  "React": "devicon-react-original colored",
  "Express.js": "devicon-express-original",
  "Nodemon": "devicon-nodemon-line colored",
  "MongoDB": "devicon-mongodb-plain colored",
  "Python": "devicon-python-plain colored",
  "GitHub": "devicon-github-original",
  "HTML5": "devicon-html5-plain colored",
  "CSS3": "devicon-css3-plain colored",
  "TailwindCSS": "devicon-tailwindcss-original colored",
  "Redux": "devicon-redux-original colored",
  "Socket.io": "devicon-socketio-original",
  "Vite": "devicon-vite-original colored",
  "FastAPI": "devicon-fastapi-plain colored",
  "Postman": "devicon-postman-plain colored",
  "Vercel": "devicon-vercel-original",
  "TypeScript": "devicon-typescript-plain colored",
  "Next.js": "devicon-nextjs-plain",
  "Docker": "devicon-docker-plain colored",
  "AWS": "devicon-amazonwebservices-plain colored",
  "AWS (Basic)": "devicon-amazonwebservices-plain colored",
  "Git": "devicon-git-plain colored",
  "PostgreSQL": "devicon-postgresql-plain colored",
  "HTML/CSS": "devicon-html5-plain colored",
  "SQL": "devicon-sqldeveloper-plain colored",
  "LangChain": "langchain",
  "OpenAI API": "🧠",
  "Hugging Face": "🤗",
  "Ollama": "🦙",
  "MCP": "🔌",
  "Qdrant (Vector)": "📐",
  "WebSockets": "🔌",
  "REST APIs": "🌐"
};

const SkillsSection = () => {
  // Duplicate array to ensure seamless infinite looping scroll without gaps
  const track1 = [...MARQUEE_TRACK_1, ...MARQUEE_TRACK_1];
  const track2 = [...MARQUEE_TRACK_2, ...MARQUEE_TRACK_2];

  const renderIcon = (name) => {
    const iconClass = TECH_ICONS[name];
    if (!iconClass) return null;
    if (iconClass === "langchain") {
      return <LangChainIcon className="marquee-icon" style={{ fill: '#7FB3FF' }} />;
    }
    if (iconClass.startsWith("devicon")) {
      return <i className={`${iconClass} marquee-icon`} style={{ fontSize: '1.2rem' }}></i>;
    }
    return <span className="marquee-emoji-icon" style={{ fontSize: '1.1rem' }}>{iconClass}</span>;
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-title reveal">
          <h2>Technical <span className="gradient-text">Skills</span></h2>
          <p>A comprehensive overview of my modern development stack and areas of expertise.</p>
        </div>

        {/* Animated Infinite Marquee Banner */}
        <div className="skills-marquee-container reveal">
          <div className="skills-marquee-track">
            {track1.map((item, index) => (
              <span key={`t1-${index}`} className="marquee-tag">
                {renderIcon(item)}
                {item}
              </span>
            ))}
          </div>
          <div className="skills-marquee-track reverse">
            {track2.map((item, index) => (
              <span key={`t2-${index}`} className="marquee-tag">
                {renderIcon(item)}
                {item}
              </span>
            ))}
          </div>
        </div>
        
        <div className="skills-grid reveal-stagger">
          {SKILLS.map((skill, index) => (
            <div key={index} className="glass-card skill-card">
              <h3>{skill.category}</h3>
              <div className="skill-tags">
                {skill.items.map((item, i) => (
                  <span key={i} className="tag">
                    {renderIcon(item)}
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===============================================
// PROJECTS SECTION
// ===============================================
const ProjectsSection = () => (
  <section id="projects" className="section">
    <div className="container">
      <div className="section-title reveal">
        <h2>Featured <span className="gradient-text">Projects</span></h2>
        <p>Showcasing my expertise in full-stack development and AI-powered applications.</p>
      </div>
      
      <div className="projects-grid">
        <StackedSections stackOffset={80} scrollRunway="30vh">
          {PROJECTS.map((project, index) => (
            <article key={index} className="glass-card project-card">
              <div className="project-header">
                <h3>{project.title}</h3>
                <div className="project-links">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <GitHubIcon />
                    </a>
                  )}
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                      aria-label={`View ${project.title} Live Demo`}
                    >
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>
              <div className="project-body">
                <div className="project-date">
                  <CalendarIcon /> {project.date}
                </div>
                <p className="project-description">{project.description}</p>
                <ul className="project-features">
                  {project.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <div className="project-tags">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </StackedSections>
      </div>
    </div>
  </section>
);

// ===============================================
// EDUCATION SECTION
// ===============================================
const EducationSection = () => (
  <section id="education" className="section">
    <div className="container">
      <div className="section-title reveal">
        <h2>Education</h2>
      </div>
      
      <div className="glass-card education-card reveal">
        <a href="https://www.nitt.edu" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://ik.imagekit.io/qfvuxdt5o/clg1.png?updatedAt=1762255352668" 
            alt="NIT Trichy Logo" 
            className="education-logo"
          />
        </a>
        <div className="education-details">
          <h3>National Institute of Technology Tiruchirappalli</h3>
          <p className="education-degree">Bachelor of Technology (B.Tech)</p>
          <p className="education-duration">2024 - 2028</p>
          <p className="education-cgpa">CGPA: <strong>8.87</strong></p>
        </div>
      </div>
    </div>
  </section>
);

// ===============================================
// CONTACT SECTION (Simple - Just Email Link)
// ===============================================
const ContactSection = () => (
  <section id="contact" className="section">
    <div className="container">
      <div className="section-title reveal">
        <h2>Let's <span className="gradient-text">Connect</span></h2>
        <p>Ready to build something amazing? Let's work together.</p>
      </div>
      
      <div className="contact-simple reveal">
        <a 
          href="mailto:parthpatidar202@gmail.com" 
          className="btn btn-primary contact-email-btn"
        >
          <MailIcon /> Email Me
        </a>
        <p className="contact-email-text">parthpatidar202@gmail.com</p>
        
        <div className="contact-socials">
          <a 
            href={SOCIAL_LINKS.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-social-link"
          >
            <GitHubIcon /> GitHub
          </a>
          <a 
            href={SOCIAL_LINKS.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-social-link"
          >
            <LinkedInIcon /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
);

// ===============================================
// FOOTER COMPONENT
// ===============================================
const Footer = () => (
  <footer className="footer">
    <div className="container">
      © {new Date().getFullYear()} Parth Patidar. All rights reserved.
    </div>
  </footer>
);

// ===============================================
// MAIN APP COMPONENT
// ===============================================
function App() {
  // Initialize effects
  useWaterRipple();
  useScrollReveal();
  
  return (
    <>
      <GridBackground />
      <Navbar />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
