
import gsap from "gsap";

// This is a simplified version of GSAP's SplitText for demo purposes
// In a real project, you would use the official GSAP SplitText plugin

class SplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  element: HTMLElement;

  constructor(element: HTMLElement, config: { type: string }) {
    this.element = element;
    
    if (config.type.includes("chars")) {
      this.splitChars();
    }
    
    if (config.type.includes("words")) {
      this.splitWords();
    }
    
    if (config.type.includes("lines")) {
      this.splitLines();
    }
  }

  splitChars() {
    const text = this.element.textContent || "";
    this.element.textContent = "";
    
    text.split("").forEach((char) => {
      if (char === " ") {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        this.element.appendChild(space);
        return;
      }
      
      const charSpan = document.createElement("span");
      charSpan.className = "split-char";
      charSpan.textContent = char;
      this.element.appendChild(charSpan);
      this.chars.push(charSpan);
    });
  }

  splitWords() {
    const text = this.element.textContent || "";
    this.element.textContent = "";
    
    text.split(/\s+/).forEach((word, index, array) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "split-word";
      wordSpan.textContent = word;
      this.element.appendChild(wordSpan);
      this.words.push(wordSpan);
      
      if (index < array.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        this.element.appendChild(space);
      }
    });
  }

  splitLines() {
    // This is a simplified version
    // In a real implementation, you would need to calculate line breaks
    const words = this.element.querySelectorAll(".split-word") as NodeListOf<HTMLElement>;
    let currentLine: HTMLElement[] = [];
    let currentTop: number | null = null;
    
    words.forEach((word) => {
      const { top } = word.getBoundingClientRect();
      
      if (currentTop === null) {
        currentTop = top;
        currentLine.push(word);
      } else if (top === currentTop) {
        currentLine.push(word);
      } else {
        const lineSpan = document.createElement("span");
        lineSpan.className = "split-line";
        this.lines.push(lineSpan);
        
        currentLine = [word];
        currentTop = top;
      }
    });
  }

  revert() {
    // Revert to original text
    const originalText = this.chars
      .map((char) => char.textContent)
      .join("");
      
    this.element.textContent = originalText;
  }
}

// Register the SplitText plugin with GSAP
gsap.registerPlugin({
  name: "SplitText",
  init: function(target, value) {
    this.splitText = new SplitText(target, value);
    return this.splitText;
  }
});

export { SplitText };
