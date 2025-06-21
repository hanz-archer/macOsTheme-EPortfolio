import React, { useState } from 'react';
import { FaFolder, FaCloud, FaGithub, FaDocker, FaFolderOpen, FaPython, FaPhp, FaJs, FaReact } from 'react-icons/fa';
import { SiGooglecloud, SiYaml, SiDjango, SiTypescript, SiNextdotjs, SiFirebase, SiAmazon } from 'react-icons/si';

interface MockFileManagerProps {
  onClose: () => void;
  folderType: 'internship' | 'featured';
}

interface Project {
  name: string;
  description: string;
  deployment: {
    platform: string;
    details: string[];
    technologies: string[];
  };
}

interface FeaturedProject {
  name: string;
  description: string;
  technologies: string[];
  details: string[];
  githubUrl?: string;
}

const projects: Project[] = [
  {
    name: "E-Learning Platform",
    description: "A comprehensive learning management system with real-time collaboration features.",
    deployment: {
      platform: "Google Cloud Run",
      details: [
        "Containerized microservices architecture",
        "Automated CI/CD pipeline with Cloud Build",
        "Secure API gateway integration",
        "Custom domain mapping with SSL"
      ],
      technologies: ["Docker", "YAML", "Cloud Build", "Cloud Run"]
    }
  },
  {
    name: "Open Morty",
    description: "Advanced mortgage processing system with automated workflows and bulk upload capabilities.",
    deployment: {
      platform: "Google Cloud Run",
      details: [
        "Multi-container deployment with Cloud Run",
        "Implemented bulk upload feature for mortgage documents",
        "Automated data validation and processing pipeline",
        "Real-time data synchronization with error handling"
      ],
      technologies: ["Cloud Run", "YAML", "Docker", "Cloud Build"]
    }
  },
  {
    name: "MortDash",
    description: "Multi-tenant mortgage analytics dashboard with dedicated Cloud SQL instances for AmeriTrust and WhiteSands Capital.",
    deployment: {
      platform: "Google Cloud Run",
      details: [
        "Multi-tenant architecture with isolated databases",
        "Dedicated Cloud SQL instances for data security",
        "Automated deployment with version control",
        "Custom domain and SSL configuration per tenant"
      ],
      technologies: ["Cloud Run", "YAML", "Cloud SQL", "Cloud Build"]
    }
  },
  {
    name: "TPO Portal",
    description: "Third-party originator portal with secure CORS implementation for cross-origin resource sharing.",
    deployment: {
      platform: "Google Cloud Run",
      details: [
        "Implemented secure CORS policies for API access",
        "Cross-origin authentication handling",
        "Microservices architecture with Cloud Run",
        "API Gateway with CORS configuration"
      ],
      technologies: ["Cloud Run", "YAML", "GitHub Actions", "API Gateway"]
    }
  },
  {
    name: "MortZilla",
    description: "Advanced mortgage processing and tracking system with automated workflows.",
    deployment: {
      platform: "Google Cloud Run",
      details: [
        "Containerized deployment on Cloud Run",
        "Automated scaling configuration",
        "Continuous deployment pipeline",
        "Monitoring and logging setup"
      ],
      technologies: ["Cloud Run", "YAML", "Docker", "Cloud Build"]
    }
  },
  {
    name: "EdTracts",
    description: "Multi-tenant educational content management platform with isolated environments.",
    deployment: {
      platform: "Google Cloud Run",
      details: [
        "Multi-tenant architecture with data isolation",
        "Content delivery optimization per tenant",
        "Automated backup systems",
        "Load balancing with tenant routing"
      ],
      technologies: ["Cloud Run", "YAML", "Cloud Storage", "Cloud CDN"]
    }
  }
];

const featuredProjects: FeaturedProject[] = [
  {
    name: "KwentasKlaras Digital PMIS",
    description: "Digital Project Management Information System for LGU Boljoon, Cebu",
    technologies: ["Django", "Python", "PostgreSQL", "Bootstrap"],
    details: [
      "Developed full-stack PMIS system",
      "Implemented user authentication and role management",
      "Created dynamic reporting system",
      "Integrated with local government workflows"
    ],
    githubUrl: "https://github.com/hanz-archer/KwentasKlaras"
  },
  {
    name: "AWS Cognito to Firebase Migration",
    description: "Python script for automated user migration between auth systems",
    technologies: ["Python", "AWS Cognito", "Firebase", "Cloud Functions"],
    details: [
      "Automated user data migration",
      "Preserved user credentials and profiles",
      "Handled error recovery and logging",
      "Maintained data integrity during transfer"
    ],
    githubUrl: "https://github.com/hanz-archer/aws-cognito-to-firebase-migrate"
  },
  {
    name: "E-Learning Platform",
    description: "Modern e-learning platform with Next.js and real-time features",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind"],
    details: [
      "Real-time collaboration features",
      "Interactive learning modules",
      "Progress tracking system",
      "Responsive design implementation"
    ],
    githubUrl: "https://github.com/hanz-archer/E-Learning"
  },
  {
    name: "GitHub PR Clone",
    description: "PHP-based GitHub PR section clone with API integration",
    technologies: ["PHP", "GitHub API", "MySQL", "JavaScript"],
    details: [
      "Replicated GitHub PR interface",
      "Integrated with GitHub API",
      "Implemented PR review system",
      "Real-time updates handling"
    ],
    githubUrl: "https://github.com/hanz-archer/Github-API"
  },
  {
    name: "Sanguinian Kabataan System",
    description: "Custom PHP-based management system for youth organization",
    technologies: ["PHP", "MySQL", "Bootstrap", "jQuery"],
    details: [
      "Member management system",
      "Event scheduling and tracking",
      "Automated reporting system",
      "User role management"
    ],
    githubUrl: "https://github.com/hanz-archer/Sangunnian-Kabataan-System"
  },
  {
    name: "VS Code Live Collab",
    description: "Real-time collaboration extension for VS Code",
    technologies: ["TypeScript", "VS Code API", "WebSocket", "Node.js"],
    details: [
      "Real-time code synchronization",
      "Cursor position tracking",
      "Conflict resolution system",
      "Extension API integration"
    ],
    githubUrl: "https://github.com/hanz-archer/VSCode-Live-Collab"
  },
  {
    name: "VS Code Workflow Generator",
    description: "TypeScript-based workflow generator extension",
    technologies: ["TypeScript", "VS Code API", "YAML", "GitHub Actions"],
    details: [
      "Custom workflow templates",
      "YAML validation",
      "GitHub Actions integration",
      "Interactive command palette"
    ],
    githubUrl: "https://github.com/hanz-archer/VSCode-Workflow-Generator"
  },
  {
    name: "VS Code Django Setup",
    description: "Automated Django development environment setup in VS Code",
    technologies: ["TypeScript", "VS Code API", "Django", "Python"],
    details: [
      "Project structure generation",
      "Development environment setup",
      "Django configuration automation",
      "Debugging integration"
    ],
    githubUrl: "https://github.com/hanz-archer/VScode-Django-Setup"
  },
  {
    name: "CSV to Charts",
    description: "CSV data visualization tool with interactive charts",
    technologies: ["JavaScript", "D3.js", "Chart.js", "CSV"],
    details: [
      "Dynamic chart generation",
      "CSV parsing and validation",
      "Interactive data filtering",
      "Export functionality"
    ],
    githubUrl: "https://github.com/hanz-archer/CSV-to-Charts"
  },
  {
    name: "LVL Shopping",
    description: "JavaScript-based e-commerce platform",
    technologies: ["JavaScript", "Node.js", "Express", "MongoDB"],
    details: [
      "Product management system",
      "Shopping cart functionality",
      "Payment gateway integration",
      "Order tracking system"
    ],
    githubUrl: "https://github.com/hanz-archer/LVL-Shoppping-Ecommerce"
  }
];

const getTechIcon = (tech: string) => {
  switch (tech) {
    case 'Django':
      return <SiDjango className="text-green-500" />;
    case 'Python':
      return <FaPython className="text-blue-500" />;
    case 'TypeScript':
      return <SiTypescript className="text-blue-400" />;
    case 'Next.js':
      return <SiNextdotjs className="text-white" />;
    case 'Firebase':
      return <SiFirebase className="text-orange-500" />;
    case 'AWS Cognito':
      return <SiAmazon className="text-orange-400" />;
    case 'PHP':
      return <FaPhp className="text-purple-400" />;
    case 'JavaScript':
      return <FaJs className="text-yellow-400" />;
    case 'VS Code API':
      return <FaCloud className="text-blue-500" />;
    case 'React':
      return <FaReact className="text-blue-400" />;
    default:
      return <FaCloud className="text-gray-400" />;
  }
};

const ProjectCard: React.FC<{ project: Project; isSelected: boolean; onClick: () => void }> = ({ project, isSelected, onClick }) => {
  return (
    <div 
      className={`transition-all duration-200 ${isSelected ? 'col-span-2' : ''}`}
      onClick={onClick}
    >
      {!isSelected ? (
        <div className="flex flex-col items-center gap-2 p-4 cursor-pointer hover:bg-white/5 rounded-lg transition-colors group">
          <div className="relative">
            <FaFolder className="w-16 h-16 text-yellow-400 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <FaFolderOpen className="w-16 h-16 text-yellow-400" />
            </div>
          </div>
          <span className="text-sm text-gray-300 text-center">{project.name}</span>
        </div>
      ) : (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <FaFolderOpen className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="text-lg font-medium text-white/90">{project.name}</h3>
              <p className="text-sm text-gray-400">{project.description}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <SiGooglecloud className="w-5 h-5" />
              <span className="text-sm font-medium">{project.deployment.platform}</span>
            </div>
            
            <div className="space-y-2">
              {project.deployment.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-gray-300">
                  <div className="w-1 h-1 rounded-full bg-gray-500 mt-2" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {project.deployment.technologies.map((tech, index) => {
                let Icon;
                switch (tech) {
                  case 'Cloud Run':
                    Icon = SiGooglecloud;
                    break;
                  case 'YAML':
                    Icon = SiYaml;
                    break;
                  case 'Docker':
                    Icon = FaDocker;
                    break;
                  case 'GitHub Actions':
                    Icon = FaGithub;
                    break;
                  default:
                    Icon = FaCloud;
                }
                
                return (
                  <div key={index} className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-full text-xs">
                    <Icon className="w-3 h-3" />
                    <span>{tech}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FeaturedProjectCard: React.FC<{ project: FeaturedProject; isSelected: boolean; onClick: () => void }> = ({ project, isSelected, onClick }) => {
  return (
    <div 
      className={`transition-all duration-200 ${isSelected ? 'col-span-2' : ''}`}
      onClick={onClick}
    >
      {!isSelected ? (
        <div className="flex flex-col items-center gap-2 p-4 cursor-pointer hover:bg-white/5 rounded-lg transition-colors group">
          <div className="relative">
            <FaFolder className="w-16 h-16 text-blue-400 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <FaFolderOpen className="w-16 h-16 text-blue-400" />
            </div>
          </div>
          <span className="text-sm text-gray-300 text-center">{project.name}</span>
        </div>
      ) : (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FaFolderOpen className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-lg font-medium text-white/90">{project.name}</h3>
                <p className="text-sm text-gray-400">{project.description}</p>
              </div>
            </div>
            {project.githubUrl ? (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group relative"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub className="w-5 h-5 text-white/70 group-hover:text-white/90" />
                <div className="absolute -top-8 right-0 scale-0 group-hover:scale-100 transition-all duration-200 bg-gray-800/90 text-xs px-2 py-1 rounded-lg whitespace-nowrap backdrop-blur-sm text-white/90 border border-white/10">
                  View on GitHub
                </div>
              </a>
            ) : (
              <div 
                className="p-2 bg-white/5 rounded-lg cursor-not-allowed group relative opacity-50"
                title="Repository is private or coming soon"
              >
                <FaGithub className="w-5 h-5 text-white/70" />
                <div className="absolute -top-8 right-0 scale-0 group-hover:scale-100 transition-all duration-200 bg-gray-800/90 text-xs px-2 py-1 rounded-lg whitespace-nowrap backdrop-blur-sm text-white/90 border border-white/10">
                  Repository Coming Soon
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              {project.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-gray-300">
                  <div className="w-1 h-1 rounded-full bg-gray-500 mt-2" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {project.technologies.map((tech, index) => (
                <div key={index} className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-full text-xs">
                  {getTechIcon(tech)}
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MockFileManager: React.FC<MockFileManagerProps> = ({ onClose, folderType }) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedFeaturedProject, setSelectedFeaturedProject] = useState<string | null>(null);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[800px] h-[80vh] bg-gray-900/95 rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl">
      {/* Window Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button 
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm text-gray-400 ml-2">
            {folderType === 'internship' ? 'ZaneCoder Internship Projects' : 'Featured Projects'}
          </span>
        </div>
      </div>

      {/* Project Grid */}
      <div className="h-[calc(100%-44px)] overflow-y-auto custom-scrollbar p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {folderType === 'internship' ? (
            projects.map((project, index) => (
              <ProjectCard 
                key={index} 
                project={project} 
                isSelected={selectedProject === project.name}
                onClick={() => setSelectedProject(selectedProject === project.name ? null : project.name)}
              />
            ))
          ) : (
            featuredProjects.map((project, index) => (
              <FeaturedProjectCard 
                key={index} 
                project={project} 
                isSelected={selectedFeaturedProject === project.name}
                onClick={() => setSelectedFeaturedProject(selectedFeaturedProject === project.name ? null : project.name)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MockFileManager;