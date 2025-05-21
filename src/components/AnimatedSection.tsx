
import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  direction?: "up" | "down" | "left" | "right";
}

export default function AnimatedSection({
  children,
  delay = 0,
  className = "",
  id,
  direction = "up",
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    let x = 0;
    let y = 0;
    
    if (direction === "up") y = 100;
    if (direction === "down") y = -100;
    if (direction === "left") x = 100;
    if (direction === "right") x = -100;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          x,
          y,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            end: "bottom top",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);
    
    return () => ctx.revert();
  }, [delay, direction]);
  
  return (
    <div ref={sectionRef} className={`opacity-0 ${className}`} id={id}>
      {children}
    </div>
  );
}
