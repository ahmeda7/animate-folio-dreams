
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useTheme } from "./ThemeProvider";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  index: number;
}

export default function ProjectCard({ title, description, tags, image, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // Animation on hover
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const image = card.querySelector(".project-image");
    const content = card.querySelector(".project-content");
    
    const tl = gsap.timeline({ paused: true });
    
    tl.to(image, {
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
    });
    
    tl.to(
      content,
      {
        y: -10,
        duration: 0.4,
        ease: "power2.out",
      },
      0
    );
    
    card.addEventListener("mouseenter", () => tl.play());
    card.addEventListener("mouseleave", () => tl.reverse());
    
    return () => {
      card.removeEventListener("mouseenter", () => tl.play());
      card.removeEventListener("mouseleave", () => tl.reverse());
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className="group relative rounded-lg overflow-hidden bg-card shadow-lg h-[400px] cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div 
        className="project-image absolute inset-0 w-full h-full bg-cover bg-center transform transition-transform duration-700"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-40 transition-opacity duration-500"></div>
      </div>
      
      <div className="project-content absolute inset-0 flex flex-col justify-end p-6 transform transition-all duration-500">
        <p className="text-xs font-medium text-primary mb-2">Featured Project</p>
        <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-200 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <button className="text-sm font-medium flex items-center text-white">
          <span>View Project</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
