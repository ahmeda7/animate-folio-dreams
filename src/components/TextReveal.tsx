
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  stagger?: number;
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  as: Component = "h2",
  stagger = 0.05,
}: TextRevealProps) {
  const textRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const element = textRef.current;
      if (!element) return;
      
      const split = new SplitText(element, { type: "chars,words" });
      
      gsap.fromTo(
        split.chars,
        {
          opacity: 0.1,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: stagger,
          duration: 0.8,
          ease: "power2.out",
          delay,
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            end: "bottom top",
            toggleActions: "play none none none",
          },
        }
      );
    });
    
    return () => ctx.revert();
  }, [text, stagger, delay]);
  
  return (
    <Component ref={textRef} className={className}>
      {text}
    </Component>
  );
}
