
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 px-6 md:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              PORT<span className="text-primary">FOLIO</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Crafting digital experiences with modern technology and creative design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Home</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors duration-200">About</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Projects</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">hello@portfolio.com</li>
              <li className="text-muted-foreground">+1 234 567 890</li>
              <li className="text-muted-foreground">New York, NY</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
