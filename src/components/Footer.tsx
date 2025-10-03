'use client';

import { FaGithub, FaLinkedin, FaCompass } from 'react-icons/fa';

interface FooterProps {
  githubUrl?: string;
  linkedinUrl?: string;
  codeCompassUrl?: string;
}

export default function Footer({ 
  githubUrl = "https://github.com", 
  linkedinUrl = "https://linkedin.com", 
  codeCompassUrl = "https://codecompass.com" 
}: FooterProps) {
  return (
    <footer className="w-full bg-[var(--card-bg)] border-t border-gray-700 mt-auto">
      <div className="max-w-screen mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Project Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              RSS CSE Setup
            </h3>
            <p className="text-sm text-gray-400 max-w-md">
              A comprehensive tool for managing and organizing RSS feeds for Computer Science and Engineering resources.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <FaGithub className="text-xl" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            
            <a
              href={codeCompassUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-200"
              aria-label="CodeCompass"
            >
              <FaCompass className="text-xl" />
              <span className="hidden sm:inline">CodeCompass</span>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} RSS CSE Setup. Built with ❤️ for the developer community.
          </p>
        </div>
      </div>
    </footer>
  );
}
