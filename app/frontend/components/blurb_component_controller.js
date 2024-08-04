import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["paragraph"];

  connect() {
    console.log('Blurb controller connected');
    this.startTypingEffect();
  }

  startTypingEffect() {
    let index = 0;
    const paragraphs = this.paragraphTargets;

    const typeParagraph = () => {
      if (index < paragraphs.length) {
        const paragraph = paragraphs[index];
        const text = paragraph.getAttribute('data-text') || paragraph.textContent;
        paragraph.setAttribute('data-text', text);
        paragraph.textContent = "";
        paragraph.style.visibility = "visible";

        const caret = document.createElement('span');
        caret.classList.add('caret');
        paragraph.appendChild(caret);

        let charIndex = 0;

        const typeChar = () => {
          if (charIndex < text.length) {
            caret.remove();
            paragraph.textContent += text[charIndex];
            paragraph.appendChild(caret);
            charIndex++;
            setTimeout(typeChar, 20);
          } else {
            paragraph.classList.remove("typing-active");
            paragraph.classList.add("typing-done");
            caret.remove();
            index++;
            setTimeout(typeParagraph, 500);
          }
        };

        paragraph.classList.add("typing-active");
        typeChar();
      }
    };


    typeParagraph();
  }
}
