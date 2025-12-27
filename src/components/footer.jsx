import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1220] text-gray-400 py-8 mt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left */}
        <div className="text-center md:text-left">
          <h2 className="text-white font-bold text-lg">Password Manager</h2>
          <p className="text-sm text-gray-400">
            &copy; {currentYear} All Rights Reserved
          </p>
        </div>

        {/* Center - Links */}
        <div className="flex gap-6">
          <a
            href="/privacy"
            className="hover:text-teal-400 transition-colors duration-200"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="hover:text-teal-400 transition-colors duration-200"
          >
            Terms
          </a>
          <a
            href="/support"
            className="hover:text-teal-400 transition-colors duration-200"
          >
            Support
          </a>
        </div>

        {/* Right - Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400 transition-colors duration-200"
          >
            <Github />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400 transition-colors duration-200"
          >
            <Linkedin />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400 transition-colors duration-200"
          >
            <Twitter />
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-600 text-sm">
        Made with ❤️ using React & TailwindCSS
      </div>
    </footer>
  );
};

export default Footer;
