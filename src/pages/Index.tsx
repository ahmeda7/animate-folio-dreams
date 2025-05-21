
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import ProjectCard from "../components/ProjectCard";
import TextReveal from "../components/TextReveal";
import { useTheme } from "../components/ThemeProvider";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Modern E-commerce Platform",
    description: "A fully responsive e-commerce site built with React and Node.js, featuring product filtering, user authentication, and payment processing.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Portfolio Website",
    description: "A creative portfolio website with smooth animations and a modern UI design, showcasing various projects and skills.",
    tags: ["Next.js", "GSAP", "Tailwind CSS", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Mobile Banking App",
    description: "A secure mobile banking application with features like transaction history, fund transfers, and account management.",
    tags: ["React Native", "Redux", "Firebase", "TypeScript"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  },
];

const skills = [
  "React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", 
  "Tailwind CSS", "Node.js", "Express", "MongoDB", "PostgreSQL", 
  "GraphQL", "GSAP", "Framer Motion", "Figma", "Adobe XD"
];

export default function Index() {
  const { theme } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  
  // Custom cursor effect
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const moveMouseCircle = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power3.out"
      });
    };
    
    window.addEventListener("mousemove", moveMouseCircle);
    
    return () => {
      window.removeEventListener("mousemove", moveMouseCircle);
    };
  }, []);
  
  // Hero text animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroText = heroTextRef.current;
      if (!heroText) return;
      
      const tl = gsap.timeline({ defaults: { duration: 1.2, ease: "power3.out" } });
      
      tl.fromTo(
        ".hero-title .line",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2 }
      )
      .fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.8"
      )
      .fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.6"
      );
    });
    
    return () => ctx.revert();
  }, []);
  
  // Parallax scrolling effect
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".parallax").forEach((layer: any) => {
        const depth = layer.dataset.depth || 0.2;
        
        gsap.to(layer, {
          y: () => ScrollTrigger.maxScroll(window) * depth,
          ease: "none",
          scrollTrigger: {
            start: "top top",
            end: "bottom bottom",
            invalidateOnRefresh: true,
            scrub: true
          }
        });
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Custom cursor */}
      <div ref={cursorRef} className="hidden md:block fixed w-8 h-8 rounded-full bg-primary mix-blend-difference pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"></div>
      
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/60"></div>
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/20 blur-[100px] parallax" data-depth="0.3"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-secondary/20 blur-[120px] parallax" data-depth="0.2"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div ref={heroTextRef} className="max-w-3xl">
            <div className="hero-title mb-6">
              <div className="overflow-hidden mb-2">
                <h1 className="line text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
                  <span className="text-white">Creative</span>
                </h1>
              </div>
              <div className="overflow-hidden mb-2">
                <h1 className="line text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
                  <span className="text-primary">Developer</span>
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="line text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
                  <span className="text-white">& Designer</span>
                </h1>
              </div>
            </div>
            
            <p className="hero-subtitle text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
              Creating stunning digital experiences with modern technologies and creative design solutions.
            </p>
            
            <div className="hero-cta flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium transition-all duration-300"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="border border-border hover:border-primary px-6 py-3 rounded-full font-medium transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row gap-12 md:gap-20">
              <div className="md:w-1/2">
                <h2 className="text-sm font-medium text-primary mb-3">ABOUT ME</h2>
                <TextReveal 
                  text="I create meaningful digital experiences" 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                />
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I'm a passionate web developer and designer with over 5 years of experience 
                    in creating modern, responsive websites and applications.
                  </p>
                  <p>
                    My approach combines clean code with stunning design to deliver memorable 
                    digital experiences that not only look great but also perform excellently.
                  </p>
                  <p>
                    I specialize in front-end development with React and Next.js, 
                    creating smooth animations with GSAP and Framer Motion, and 
                    building responsive layouts with Tailwind CSS.
                  </p>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="rounded-2xl overflow-hidden h-[400px] relative">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
                    alt="Developer workspace" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                    <h3 className="text-white text-2xl font-bold mb-2">Creative Problem Solver</h3>
                    <p className="text-white/80">Turning complex challenges into elegant solutions</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm bg-muted rounded-full"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 relative bg-muted/30">
        <div className="container mx-auto px-6 md:px-12">
          <AnimatedSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-sm font-medium text-primary mb-3">MY WORK</h2>
              <TextReveal 
                text="Featured Projects" 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore my recent work showcasing web applications and design projects 
                that demonstrate my technical skills and creative approach.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  index={index}
                />
              ))}
            </div>
            
            <div className="flex justify-center mt-12">
              <button className="group flex items-center gap-2 border-b-2 border-primary pb-1 font-semibold">
                <span>View All Projects</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" 
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
          </AnimatedSection>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-40 left-40 w-72 h-72 rounded-full bg-primary/10 blur-[100px]"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-secondary/10 blur-[120px]"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-sm font-medium text-primary mb-3">GET IN TOUCH</h2>
                <TextReveal 
                  text="Let's work together" 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                />
                <p className="text-muted-foreground mb-8">
                  I'm always open to discussing new projects, creative ideas or 
                  opportunities to be part of your vision.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-muted p-3 rounded-xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">hello@portfolio.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-muted p-3 rounded-xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">+1 234 567 890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-muted p-3 rounded-xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-muted-foreground">New York, NY</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
                <form className="space-y-6">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <input 
                      type="text" 
                      placeholder="Subject" 
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <textarea 
                      placeholder="Your Message" 
                      rows={4}
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
