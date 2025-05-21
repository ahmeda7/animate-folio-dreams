
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 transition-all duration-300 ${
        scrolled
          ? "py-4 bg-background/90 backdrop-blur-lg shadow-md"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold tracking-tight">
            PORT
            <span className="text-primary">FOLIO</span>
          </a>
        </div>
        
        <div className="hidden md:flex items-center space-x-10">
          <a href="#home" className="cursor-highlight text-sm font-medium">HOME</a>
          <a href="#about" className="cursor-highlight text-sm font-medium">ABOUT</a>
          <a href="#projects" className="cursor-highlight text-sm font-medium">PROJECTS</a>
          <a href="#contact" className="cursor-highlight text-sm font-medium">CONTACT</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button className="bg-primary hover:bg-primary/90 py-2 px-4 rounded-full text-sm font-medium transition duration-200 hidden md:block">
            Let's Connect
          </button>
        </div>
      </div>
    </nav>
  );
}
