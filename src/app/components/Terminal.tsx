"use client";
import { useState, useEffect, useRef } from 'react';
import { FaUser, FaProjectDiagram, FaEnvelope, FaGraduationCap, FaTools, FaBuilding, FaFolder, FaGithub, FaChevronDown, FaLaptopCode, FaLinkedin, FaFacebook } from "react-icons/fa";
import Image from "next/image";
import React from "react";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiDjango } from "react-icons/si";
import { motion } from 'framer-motion';
import Notification from './Notification';
import MockFileManager from './MockFileManager';

interface DesktopIcon {
  title: string;
  icon: React.ReactNode;
  position: {
    top: number;
    left: number;
  };
}

interface Position {
  top: number;
  left: number;
}

const desktopIcons: DesktopIcon[] = [
  {
    title: "featuredProjects",
    icon: <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl p-2 shadow-lg">
      <FaFolder size={32} className="text-white/90" />
    </div>,
    position: { top: 32, left: 32 }
  },
  {
    title: "zaneCoderinternShip",
    icon: <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl p-2 shadow-lg">
      <FaBuilding size={32} className="text-white/90" />
    </div>,
    position: { top: 128, left: 32 }
  },
  {
    title: "downloadMyResume.bat",
    icon: <div className="bg-gradient-to-br from-red-400 via-red-500 to-red-600 rounded-2xl p-2 shadow-lg">
      <FaFolder size={32} className="text-white/90" />
    </div>,
    position: { top: 224, left: 32 }
  }
];

export default function DesktopUI() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [time, setTime] = useState<string>("");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [iconPositions, setIconPositions] = useState<{ [key: string]: Position }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [showNotification, setShowNotification] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Initialize icon positions from desktopIcons
    const initialPositions: { [key: string]: Position } = {};
    desktopIcons.forEach((icon, index) => {
      initialPositions[index] = {
        top: icon.position.top,
        left: icon.position.left,
      };
    });
    setIconPositions(initialPositions);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Initialize on client-side
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragEnd = (index: number, info: any) => {
    setIsDragging(false);
    setIconPositions(prev => {
      const iconHeight = 100;
      const iconWidth = 100;
      const dockHeight = 150;
      const viewportHeight = windowDimensions.height - dockHeight - iconHeight;
      const viewportWidth = windowDimensions.width - iconWidth;
      const minTop = 40;

      const newTop = prev[index].top + info.offset.y;
      const newLeft = prev[index].left + info.offset.x;

      if (newTop < minTop || newTop > viewportHeight || newLeft < 0 || newLeft > viewportWidth) {
        return {
          ...prev,
          [index]: {
            top: desktopIcons[index].position.top,
            left: desktopIcons[index].position.left
          }
        };
      }

      return {
        ...prev,
        [index]: {
          top: Math.min(newTop, viewportHeight),
          left: newLeft,
        }
      };
    });
  };

  const handleDownloadClick = () => {
    setShowNotification(true);
  };

  const handleConfirmDownload = () => {
    setShowNotification(false);
    window.open('/resume.pdf', '_blank'); 
  };

  const handleCancelDownload = () => {
    setShowNotification(false);
  };

  const sections = {
    about: { 
      icon: <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl p-2 shadow-lg">
        <FaUser size={32} className="text-white/90" />
      </div>,
      title: "About Me",
      content: (
        <div className="flex flex-col gap-6 p-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto md:mx-0 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/me.jpg"
                width={256}
                height={256}
                alt="Profile"
                className="object-cover"
              />
            </div>
            <div className="space-y-4 flex-1 text-center md:text-left">
              <div>
                <h2 className="text-2xl font-semibold">Hans Dalubatan</h2>
                <p className="text-gray-300">DevOps & Web Developer Intern at zaneCoder</p>
              </div>
              <p className="text-gray-200 leading-relaxed">
                I'm passionate about building innovative web solutions and automating development workflows. 
                Currently pursuing Bachelor of Science in Information Technology at Cebu Technological University, 
                where we've successfully deployed KwentasKlaras Digital PMIS at LGU Boljoon, Cebu.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-300 text-lg border-b border-white/10 pb-2">Recent Projects</h3>
              <div className="grid gap-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <FaProjectDiagram className="text-blue-400 w-5 h-5" />
                    </div>
                    <h4 className="text-blue-400 font-medium">E-Learning Platform</h4>
                  </div>
                  <p className="text-sm text-gray-400">Real-time collaboration system for interactive learning</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-4 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <FaUser className="text-green-400 w-5 h-5" />
                    </div>
                    <h4 className="text-green-400 font-medium">Biometrics Integration</h4>
                  </div>
                  <p className="text-sm text-gray-400">Secure authentication system with biometric verification</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <FaTools className="text-purple-400 w-5 h-5" />
                    </div>
                    <h4 className="text-purple-400 font-medium">VS Code Extensions</h4>
                  </div>
                  <p className="text-sm text-gray-400">Real-time collaboration & Django automation tools</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-300 text-lg border-b border-white/10 pb-2">Core Technologies</h3>
              <div className="grid gap-4">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <SiNextdotjs className="text-white w-6 h-6" />
                    <span className="font-medium">Next.js</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <FaReact className="text-blue-400 w-6 h-6" />
                    <span className="font-medium">React</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <SiTypescript className="text-blue-500 w-6 h-6" />
                    <span className="font-medium">TypeScript</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <SiDjango className="text-green-500 w-6 h-6" />
                    <span className="font-medium">Django</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <SiTailwindcss className="text-cyan-400 w-6 h-6" />
                    <span className="font-medium">Tailwind CSS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    projects: { 
      icon: <div className="bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-2xl p-2 shadow-lg">
        <FaProjectDiagram size={32} className="text-white/90" />
      </div>,
      title: "Projects",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white/90">Featured Projects</h2>
          <div className="grid gap-4">
            <div className="bg-gray-800/50 rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <FaReact className="text-blue-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white/90">Resume Builder</h3>
                    <p className="text-sm text-gray-400">Modern resume creation platform</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://github.com/yourusername/resume-builder" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <FaGithub className="w-5 h-5 text-white/70" />
                  </a>
                  <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <FaChevronDown className="w-4 h-4 text-white/70" />
                  </button>
                </div>
              </div>
              <div className="p-4 border-t border-white/10 bg-white/5">
                <div className="space-y-3">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    A modern resume builder with real-time preview, custom templates, and PDF export functionality.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">React</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">TypeScript</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300">Vite</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Add more project cards with the same structure */}
          </div>
        </div>
      )
    },
    experience: { 
      icon: <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl p-2 shadow-lg">
        <FaBuilding size={32} className="text-white/90" />
      </div>,
      title: "Experience",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white/90">Professional Experience</h2>
          <div className="grid gap-4">
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 p-4 rounded-xl border border-orange-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <FaBuilding className="text-orange-400 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-orange-400">Web Developer Intern</h3>
                  <p className="text-sm text-gray-400">zaneCoder • 2025 - Present</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Working on full-stack web development projects using modern technologies and best practices.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">Next.js</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">Laravel</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300">Typescript</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 p-4 rounded-xl border border-yellow-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <FaLaptopCode className="text-yellow-400 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-yellow-400">2024 POPCEN-CBMS Enumerator</h3>
                  <p className="text-sm text-gray-400">Philippine Statistics Authority • 2024</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Developing custom web solutions and applications for various clients, focusing on performance and user experience.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">React</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300">Tailwind</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-300">Firebase</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 p-4 rounded-xl border border-yellow-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <FaLaptopCode className="text-yellow-400 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-yellow-400">Computer System Servicing Intern</h3>
                  <p className="text-sm text-gray-400">FJR IT Solutions • 2019</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Developing custom web solutions and applications for various clients, focusing on performance and user experience.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">React</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300">Tailwind</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-300">Firebase</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    technologies: { 
      icon: <div className="bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 rounded-2xl p-2 shadow-lg">
        <FaTools size={32} className="text-white/90" />
      </div>,
      title: "Technologies",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white/90">Tech Stack & Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-300 text-lg border-b border-white/10 pb-2">Frontend</h3>
              <div className="grid gap-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <FaReact className="text-blue-400 w-6 h-6" />
                    <h4 className="font-medium text-blue-400">React & Next.js</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Used in:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">Resume Builder</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">E-Learning Platform</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 p-4 rounded-xl border border-cyan-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <SiTailwindcss className="text-cyan-400 w-6 h-6" />
                    <h4 className="font-medium text-cyan-400">Tailwind CSS</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Used in:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300">Portfolio</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300">Dashboard UI</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-300 text-lg border-b border-white/10 pb-2">Backend</h3>
              <div className="grid gap-4">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-4 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <SiDjango className="text-green-400 w-6 h-6" />
                    <h4 className="font-medium text-green-400">Django</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Used in:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">KwentasKlaras PMIS</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">E-Learning API</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    education: { 
      icon: <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-2xl p-2 shadow-lg">
        <FaGraduationCap size={32} className="text-white/90" />
      </div>,
      title: "Education",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white/90">Education Journey</h2>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <FaGraduationCap className="text-green-400 w-8 h-8" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-green-400">Bachelor of Science in Information Technology</h3>
                  <p className="text-gray-400">Cebu Technological University - Argao Campus</p>
                  <p className="text-sm text-gray-500">2021 - Present</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-300">Achievements</h4>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Dean's Lister</li>
                    <li>Lead Developer for KwentasKlaras PMIS</li>
                    <li>Active member of CTU-IT Society</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    contact: { 
      icon: <div className="bg-gradient-to-br from-red-400 via-red-500 to-red-600 rounded-2xl p-2 shadow-lg">
        <FaEnvelope size={32} className="text-white/90" />
      </div>,
      title: "Contact",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white/90">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-4 rounded-xl border border-red-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <FaEnvelope className="text-red-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-red-400">Email</h3>
                    <a href="mailto:dalubatanhans@gmail.com" className="text-sm text-gray-400 hover:text-gray-300">
                      dalubatanhans@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <FaLinkedin className="text-blue-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-400">LinkedIn</h3>
                    <a href="https://linkedin.com/in/hans-dalubatan" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-gray-400 hover:text-gray-300">
                      /in/hans-dalubatan
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-500/10 to-gray-600/10 p-4 rounded-xl border border-gray-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-500/20 rounded-lg">
                    <FaGithub className="text-gray-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-400">GitHub</h3>
                    <a href="https://github.com/HanzArcher" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-gray-400 hover:text-gray-300">
                      /HanzArcher
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600/10 to-blue-700/10 p-4 rounded-xl border border-blue-600/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <FaFacebook className="text-blue-500 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-500">Facebook</h3>
                    <a href="https://facebook.com/hans.dalubatan" target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-gray-400 hover:text-gray-300">
                      /hans.dalubatan
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input 
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input 
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
                ></textarea>
              </div>
              <button className="w-full bg-blue-500/80 hover:bg-blue-500/90 text-white py-2 rounded-lg transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )
    }
  };

  const MenuBar = () => (
    <div className="absolute top-0 left-0 w-full h-8 bg-gray-900/80 backdrop-blur-xl flex items-center px-4 justify-between border-b border-white/10">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z" fill="#007AFF"/>
            <path d="M12 6.75c-2.9 0-5.25 2.35-5.25 5.25s2.35 5.25 5.25 5.25 5.25-2.35 5.25-5.25S14.9 6.75 12 6.75z" fill="#007AFF"/>
          </svg>
          <span className="font-medium text-white">HanzArcher</span>
        </div>
        <div className="flex space-x-4 text-sm text-gray-300/80">
          <span className="hover:text-white transition-colors">File</span>
          <span className="hover:text-white transition-colors">Go</span>
          <span className="hover:text-white transition-colors">Help</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3 text-sm text-gray-300/80">
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4zm-6 4h-4v-4h4v4z" fill="currentColor"/>
            </svg>
            <span>100%</span>
          </span>
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
              <path d="M12 6.75c-2.9 0-5.25 2.35-5.25 5.25s2.35 5.25 5.25 5.25 5.25-2.35 5.25-5.25S14.9 6.75 12 6.75z" fill="currentColor"/>
            </svg>
          </span>
          <span>{time}</span>
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M17 6H3a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2zm0 10H3V8h14v8zm3-6h1a1 1 0 011 1v2a1 1 0 01-1 1h-1V10z" 
                fill="currentColor"/>
            </svg>
            <span>100%</span>
          </span>
        </div>
      </div>
    </div>
  )

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const handleIconClick = (title: string) => {
    if (title === "zaneCoderinternShip") {
      setShowFileManager(true);
    } else if (title === "downloadMyResume.bat") {
      handleDownloadClick();
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900">
      <Image
        src="/wallpaper.jpg"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="opacity-90"
        alt="Desktop Wallpaper"
      />
      <div className="absolute inset-0 bg-black/10" />
      
      {desktopIcons.map((item, index) => (
        <motion.div
          key={index}
          drag
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={{
            top: 40,
            left: 0,
            right: windowDimensions.width - 100,
            bottom: windowDimensions.height - 250
          }}
          dragTransition={{ 
            bounceStiffness: 800,
            bounceDamping: 35,
            power: 0.1
          }}
          whileDrag={{ scale: 1.05 }}
          animate={{
            top: iconPositions[index]?.top || item.position.top,
            left: iconPositions[index]?.left || item.position.left,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => handleDragEnd(index, info)}
          className="flex flex-col items-center cursor-move touch-none select-none absolute"
          onClick={(e) => {
            if (!isDragging) {
              handleIconClick(item.title);
            }
          }}
        >
          <div className="p-2 rounded-lg dock-hover">
            {item.icon}
          </div>
          <span className="mt-1 text-xs md:text-sm text-white bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 whitespace-nowrap">
            {item.title}
          </span>
        </motion.div>
      ))}

      {/* Menu Bar */}
      <MenuBar />

      {/* Dock Bar */}
      <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center w-[95%] md:w-auto">
        <div className="flex items-center justify-center gap-2 md:gap-4 h-16 md:h-20 bg-white/10 backdrop-blur-3xl px-3 md:px-6 py-2 rounded-2xl border border-white/20 w-full md:w-auto">
          {Object.entries(sections).map(([key, { icon, title }]) => (
            <div
              key={key}
              className="relative flex-shrink-0 flex flex-col items-center group"
            >
              <div 
                className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center cursor-pointer dock-hover"
                onClick={() => setSelectedSection(key)}
              >
                {icon}
              </div>
              {/* Tooltip */}
              <div className="absolute -top-8 scale-0 group-hover:scale-100 transition-all duration-200 bg-gray-800/90 text-xs px-2 py-1 rounded-lg whitespace-nowrap backdrop-blur-sm text-white/90 border border-white/10">
                {title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Browser Window */}
      {selectedSection && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[900px] h-[80vh] md:h-[500px] bg-gray-900/95 rounded-xl border border-white/10 shadow-2xl window-transition backdrop-blur-xl">
          {/* Window Header */}
          <div className="flex items-center justify-between p-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <button 
                  onClick={() => setSelectedSection(null)}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm text-gray-400 ml-2">{sections[selectedSection].title}</span>
            </div>
          </div>
          
          {/* Window Content */}
          <div className="flex flex-col md:flex-row h-[calc(100%-44px)]">
            {/* Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">Quick Links</div>
              <div className="flex md:block overflow-x-auto md:overflow-x-hidden md:h-[calc(100%-2rem)] overflow-y-auto custom-scrollbar pr-2 space-x-2 md:space-x-0 md:space-y-1">
                {Object.entries(sections).map(([key, { title, icon }]) => (
                  <div
                    key={key}
                    onClick={() => setSelectedSection(key)}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedSection === key ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    {icon}
                    <span className="text-sm">{title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-3 md:p-6 overflow-y-auto custom-scrollbar">
              {sections[selectedSection].content}
            </div>
          </div>
        </div>
      )}

      {/* Show notification if needed */}
      {showNotification && (
        <Notification
          onConfirm={handleConfirmDownload}
          onCancel={handleCancelDownload}
        />
      )}

      {showFileManager && <MockFileManager onClose={() => setShowFileManager(false)} />}
    </div>
  );
}