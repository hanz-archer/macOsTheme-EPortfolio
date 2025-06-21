"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaEnvelope, FaGraduationCap, FaTools, FaBuilding, FaFolder, FaGithub, FaLaptopCode, FaLinkedin, FaFacebook } from "react-icons/fa";
import Image from "next/image";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiDjango, SiVuedotjs, SiNuxtdotjs, SiGooglecloud } from "react-icons/si";
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
    title: "zaneCoderInternship",
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

const fileManagerContent = {
  "Major Platforms": [
    {
      name: "E-Learning Platform",
      type: "folder",
      items: [
        { name: "frontend", type: "folder" },
        { name: "backend", type: "folder" },
        { name: "README.md", type: "file" }
      ]
    },
    {
      name: "Open Morty",
      type: "folder",
      items: [
        { name: "api", type: "folder" },
        { name: "client", type: "folder" },
        { name: "docs", type: "folder" }
      ]
    }
  ],
  "Client Portals": [
    {
      name: "MortDash",
      type: "folder",
      items: [
        { name: "ameritrust-capital", type: "folder" },
        { name: "whitesands-capital", type: "folder" },
        { name: "shared-components", type: "folder" }
      ]
    },
    {
      name: "TPO Portal",
      type: "folder",
      items: [
        { name: "frontend", type: "folder" },
        { name: "backend", type: "folder" },
        { name: "deployment", type: "folder" }
      ]
    }
  ],
  "Specialized Tools": [
    {
      name: "MortZilla",
      type: "folder",
      items: [
        { name: "core", type: "folder" },
        { name: "plugins", type: "folder" }
      ]
    },
    {
      name: "EdTracts",
      type: "folder",
      items: [
        { name: "content-manager", type: "folder" },
        { name: "delivery-system", type: "folder" }
      ]
    },
    {
      name: "Allure IMA",
      type: "folder",
      items: [
        { name: "analysis-engine", type: "folder" },
        { name: "dashboard", type: "folder" }
      ]
    },
    {
      name: "EdStack",
      type: "folder",
      items: [
        { name: "platform", type: "folder" },
        { name: "integrations", type: "folder" }
      ]
    }
  ],
  "Deployments": [
    {
      name: "Cloud Run",
      type: "folder",
      items: [
        { name: "configurations", type: "folder" },
        { name: "cloudbuild.yaml", type: "file" }
      ]
    },
    {
      name: "Cloud SQL",
      type: "folder",
      items: [
        { name: "migrations", type: "folder" },
        { name: "backups", type: "folder" }
      ]
    },
    {
      name: "CI-CD",
      type: "folder",
      items: [
        { name: "workflows", type: "folder" },
        { name: "scripts", type: "folder" }
      ]
    }
  ]
};

type SectionKey = 'about' | 'experience' | 'technologies' | 'education' | 'contact';

interface Section {
  icon: React.ReactElement;
  title: string;
  content: React.ReactElement;
}

const sections: Record<SectionKey, Section> = {
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
              Junior Software Developer with solid back-end and front-end skills. Proficient in Git/GitHub, CI/CD using YAML, and deploying applications through GCP Cloud Run and Cloud SQL. Experienced in mapping custom domains and dedicated to creating effective, user-centric solutions while learning DevOps continuously.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-medium text-gray-300 text-lg border-b border-white/10 pb-2">Awards & Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 p-4 rounded-xl border border-yellow-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <FaGraduationCap className="text-yellow-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-yellow-400">Academic Excellence</h3>
                    <p className="text-sm text-gray-400">2021 - Present</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-gray-300">
                    <div className="w-1 h-1 rounded-full bg-yellow-500 mt-2" />
                    <span>Dean's Lister - First Year</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-300">
                    <div className="w-1 h-1 rounded-full bg-yellow-500 mt-2" />
                    <span>Programmer of the Year</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <FaLaptopCode className="text-blue-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-400">Technical Achievements</h3>
                    <p className="text-sm text-gray-400">Notable Projects</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-gray-300">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mt-2" />
                    <span>Best in Capstone Research Category</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-300">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mt-2" />
                    <span>Excellence Award for Transparent Governance</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-300">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mt-2" />
                    <span>Lead Developer - KwentasKlaras PMIS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          {/* Full-time Position */}
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 p-4 rounded-xl border border-orange-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <FaBuilding className="text-orange-400 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-orange-400">Junior Software Engineer</h3>
                <p className="text-sm text-gray-400">zaneCoder • March 2025 - Present</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                Full-time software engineer specializing in DevOps and infrastructure, focusing on CI/CD pipelines, cloud infrastructure management, and deployment automation on Google Cloud Platform. Responsible for implementing and maintaining scalable cloud solutions using Cloud Run, Cloud SQL, and automated workflows.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-orange-400">Key Infrastructure & DevOps Projects:</h4>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 p-3 rounded-lg border border-orange-500/10">
                    <h5 className="text-sm font-medium text-orange-300 mb-2">CI/CD & Infrastructure</h5>
                    <div className="grid gap-2">
                      <div>
                        <span className="text-sm text-gray-300">Cloud Infrastructure</span>
                        <ul className="text-xs text-gray-400 list-disc list-inside mt-1">
                          <li>Implemented CI/CD pipelines for multiple applications</li>
                          <li>Managed Cloud Run deployments and configurations</li>
                          <li>Handled Cloud SQL database infrastructure</li>
                          <li>Automated deployment workflows using YAML</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 p-3 rounded-lg border border-blue-500/10">
                    <h5 className="text-sm font-medium text-blue-300 mb-2">Application Infrastructure</h5>
                    <div className="grid gap-2">
                      <div>
                        <span className="text-sm text-gray-300">DevOps Support for Key Applications</span>
                        <ul className="text-xs text-gray-400 list-disc list-inside mt-1">
                          <li>MortZilla - Deployment automation and monitoring</li>
                          <li>OpenMorty - Infrastructure setup and maintenance</li>
                          <li>TPO Portal - CI/CD pipeline implementation</li>
                          <li>MortDash - Cloud infrastructure management</li>
                          <li>Allure CRM - Deployment workflow optimization</li>
                          <li>EdStack CRM - Cloud resource configuration</li>
                          <li>EdStack College Contracts - Infrastructure automation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/5 to-green-600/5 p-3 rounded-lg border border-green-500/10">
                    <h5 className="text-sm font-medium text-green-300 mb-2">Infrastructure Achievements</h5>
                    <div className="grid gap-2">
                      <div>
                        <ul className="text-xs text-gray-400 list-disc list-inside mt-1">
                          <li>Reduced deployment time by 40% through pipeline optimization</li>
                          <li>Implemented automated testing in CI/CD workflows</li>
                          <li>Established monitoring and alerting systems</li>
                          <li>Standardized deployment processes across projects</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-300">Cloud Run</span>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">Cloud SQL</span>
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">CI/CD</span>
                <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300">Docker</span>
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-300">YAML</span>
                <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-300">Terraform</span>
              </div>
            </div>
          </div>

          {/* Internship */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FaLaptopCode className="text-blue-400 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-blue-400">DevOps Engineering Intern</h3>
                <p className="text-sm text-gray-400">zaneCoder • January 2025 - March 2025</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                Assisted in DevOps and infrastructure tasks, learning and implementing cloud technologies and CI/CD practices. Gained hands-on experience with Google Cloud Platform services and deployment automation.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-blue-400">Internship Contributions:</h4>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 p-3 rounded-lg border border-blue-500/10">
                    <h5 className="text-sm font-medium text-blue-300 mb-2">DevOps & Infrastructure Tasks</h5>
                    <div className="grid gap-2">
                      <div>
                        <span className="text-sm text-gray-300">Cloud Infrastructure</span>
                        <ul className="text-xs text-gray-400 list-disc list-inside mt-1">
                          <li>Assisted in maintaining CI/CD pipelines</li>
                          <li>Helped configure Cloud Run services</li>
                          <li>Supported database infrastructure management</li>
                          <li>Learned deployment automation practices</li>
                        </ul>
                      </div>
                      <div>
                        <span className="text-sm text-gray-300">Project Support</span>
                        <ul className="text-xs text-gray-400 list-disc list-inside mt-1">
                          <li>Assisted with MortZilla deployment processes</li>
                          <li>Helped maintain OpenMorty infrastructure</li>
                          <li>Supported TPO Portal CI/CD pipeline</li>
                          <li>Contributed to monitoring setup for various applications</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-300">Cloud Run</span>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">Cloud SQL</span>
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">CI/CD</span>
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-300">YAML</span>
              </div>
            </div>
          </div>

          {/* Previous Experience */}
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
                  <div className="flex gap-2">
                    <FaReact className="text-blue-400 w-6 h-6" />
                    <SiNextdotjs className="text-white w-6 h-6" />
                  </div>
                  <h4 className="font-medium text-blue-400">React & Next.js</h4>
                </div>
                <p className="text-sm text-gray-400 mb-2">Used in:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">Resume Builder</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">E-Learning Platform</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-4 rounded-xl border border-green-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex gap-2">
                    <SiVuedotjs className="text-green-400 w-6 h-6" />
                    <SiNuxtdotjs className="text-green-500 w-6 h-6" />
                  </div>
                  <h4 className="font-medium text-green-400">Vue.js & Nuxt.js</h4>
                </div>
                <p className="text-sm text-gray-400 mb-2">Used in:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">Admin Dashboard</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">Client Portal</span>
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

              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <SiTypescript className="text-blue-500 w-6 h-6" />
                  <h4 className="font-medium text-blue-400">TypeScript</h4>
                </div>
                <p className="text-sm text-gray-400 mb-2">Used in:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">All Frontend Projects</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">Type Safety</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-gray-300 text-lg border-b border-white/10 pb-2">Backend & DevOps</h3>
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

              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <SiGooglecloud className="text-blue-500 w-6 h-6" />
                  <h4 className="font-medium text-blue-400">GCP & Cloud Run</h4>
                </div>
                <p className="text-sm text-gray-400 mb-2">Used in:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">Microservices</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">Cloud Deployment</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-500/10 to-gray-600/10 p-4 rounded-xl border border-gray-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <FaGithub className="text-white w-6 h-6" />
                  <h4 className="font-medium text-gray-300">Git & CI/CD</h4>
                </div>
                <p className="text-sm text-gray-400 mb-2">Used in:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-300">Version Control</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-300">Automated Deployment</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-500/10 to-gray-600/10 p-4 rounded-xl border border-gray-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" className="text-gray-300" />
                  </svg>
                  <h4 className="font-medium text-gray-300">YAML Configuration</h4>
                </div>
                <p className="text-sm text-gray-400 mb-2">Used in:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-300">Infrastructure as Code</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-300">CI/CD Pipelines</span>
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
        <div className="space-y-6">
          {/* College */}
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

          {/* Senior High School */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <FaGraduationCap className="text-blue-400 w-8 h-8" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-blue-400">Senior High School - TVL ICT Strand</h3>
                  <p className="text-gray-400">Argao National High School</p>
                  <p className="text-sm text-gray-500">2019 - 2021</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-300">Achievements</h4>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Graduated with Honors</li>
                    <li>ICT Track Excellence Award</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* High School */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <FaGraduationCap className="text-purple-400 w-8 h-8" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-purple-400">High School</h3>
                  <p className="text-gray-400">Saint Michael School of Argao</p>
                  <p className="text-sm text-gray-500">2014 - 2019</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-300">Activities</h4>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Active participation in academic competitions</li>
                    <li>Member of Student Council</li>
                  </ul>
                </div>
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
                  <a href="mailto:dalubatanhans@gmail.com" 
                     className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
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
                  <a href="https://www.linkedin.com/in/hansarcher" target="_blank" rel="noopener noreferrer" 
                     className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                    /in/hansarcher
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
                  <a href="https://github.com/hanz-archer" target="_blank" rel="noopener noreferrer" 
                     className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                    /hanz-archer
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
                     className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                    /hans.dalubatan
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/5 to-purple-600/5 p-6 rounded-xl border border-purple-500/20 flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-purple-500/20 rounded-full mb-4">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-purple-400 mb-2">Contact Form Coming Soon!</h3>
            <p className="text-gray-400 mb-4">The contact form is currently under development.</p>
            <a href="mailto:dalubatanhans@gmail.com" 
               className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 py-2 px-6 rounded-lg transition-colors inline-flex items-center gap-2">
              <FaEnvelope className="w-4 h-4" />
              Send me an email instead
            </a>
          </div>
        </div>
      </div>
    )
  }
};

export default function DesktopUI() {
  const [selectedSection, setSelectedSection] = useState<SectionKey | null>(null);
  const [time, setTime] = useState<string>("");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [iconPositions, setIconPositions] = useState<{ [key: string]: Position }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [showNotification, setShowNotification] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const [currentFolder, setCurrentFolder] = useState<'internship' | 'featured' | null>(null);

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

      const newTop = prev[index]?.top || desktopIcons[index].position.top;
      const newLeft = prev[index]?.left || desktopIcons[index].position.left;

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
    window.open('/Hans Archer Dalubatan.docx', '_blank'); 
  };

  const handleCancelDownload = () => {
    setShowNotification(false);
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
    if (title === "zaneCoderInternship") {
      setShowFileManager(true);
      setCurrentFolder('internship');
    } else if (title === "downloadMyResume.bat") {
      handleDownloadClick();
    } else if (title === "featuredProjects") {
      setShowFileManager(true);
      setCurrentFolder('featured');
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
                onClick={() => setSelectedSection(key as SectionKey)}
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
                    onClick={() => setSelectedSection(key as SectionKey)}
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

      {showFileManager && <MockFileManager onClose={() => {
        setShowFileManager(false);
        setCurrentFolder(null);
      }} folderType={currentFolder!} />}
    </div>
  );
}