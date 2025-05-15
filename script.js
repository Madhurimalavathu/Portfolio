// Typing Animation
const text = ["UI/UX Designer", "AI & Data Science Enthusiast", "Web Developer", "Problem Solver", "Software Developer"];
let count = 0, index = 0, currentText = '', letter = '', isDeleting = false, typingSpeed = 100;

(function type() {
  const typingElement = document.querySelector('.typing');
  if (!typingElement) return;

  currentText = text[count % text.length];

  if (isDeleting) {
    letter = currentText.slice(0, --index);
    typingSpeed = 50;
  } else {
    letter = currentText.slice(0, ++index);
    typingSpeed = 100;
  }

  typingElement.textContent = letter;

  if (!isDeleting && letter.length === currentText.length) {
    typingSpeed = 1500;
    isDeleting = true;
  } else if (isDeleting && letter.length === 0) {
    isDeleting = false;
    count++;
    typingSpeed = 500;
  }

  setTimeout(type, typingSpeed);
})();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Particles.js Configuration
document.addEventListener('DOMContentLoaded', function() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#bae8e8" },
        shape: { type: "circle", stroke: { width: 0 }, polygon: { nb_sides: 5 } },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#bae8e8", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          bubble: { distance: 400, size: 40, duration: 2, opacity: 8 },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    });
  }
});

// Project Modals
const projectData = {
  "Hand Gesture Recognition": {
    description: "Designed a real-time gesture recognition system using webcam input to detect and classify hand gestures with visual overlays. The system utilizes computer vision techniques to track hand movements and classify them into predefined gestures.",
    technologies: ["Python", "OpenCV", "MediaPipe", "Machine Learning", "Computer Vision"],
    github: "https://github.com/Madhurimalavathu/Hand_navigation"
  },
  "WhatsApp Chat Analyzer": {
    description: "Python-based ML tool to analyze chat data and extract insights with sentiment analysis and visualization. The tool processes exported chat data to provide statistics about message frequency, active times, and sentiment trends.",
    technologies: ["Python", "Machine Learning", "Data Visualization", "NLP", "Pandas", "Matplotlib"]
  },
  "Famora": {
    description: "Family budgeting web app built with Infosys Springboard team featuring expense tracking and financial planning. The application helps families manage their finances with features for tracking expenses, setting budgets, and generating reports.",
    technologies: ["Web App", "Finance", "Team Project", "Python", "JavaScript", "CSS", "HTML", "Flask"],
    github: "https://github.com/PrasadKumbre/Intergrated_UFFT"
  }
};

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function() {
    const projectTitle = this.querySelector('h3').textContent;
    const project = projectData[projectTitle];

    if (project) {
      const modalHTML = `
        <div class="modal-overlay active">
          <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h3 class="modal-title">${projectTitle}</h3>
            <p class="modal-description">${project.description}</p>
            <div class="modal-tech">
              ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            ${project.github ? `<div class="modal-links">
              <a href="${project.github}" target="_blank" class="modal-link github">
                <i class="fab fa-github"></i> View on GitHub
              </a>
            </div>` : ''}
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);

      const modal = document.querySelector('.modal-overlay');
      modal.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close')) {
          this.classList.remove('active');
          setTimeout(() => this.remove(), 300);
        }
      });
    }
  });
});

// Scroll Reveal Animation
function revealOnScroll() {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight - 100) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });
}
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ===== Equalize Card Heights =====
function equalizeCardHeights() {
  const cards = document.querySelectorAll('.card');
  let maxHeight = 0;

  cards.forEach(card => card.style.height = 'auto');
  cards.forEach(card => maxHeight = Math.max(maxHeight, card.offsetHeight));

  if (window.innerWidth > 768) {
    cards.forEach(card => card.style.height = `${maxHeight}px`);
  }
}
window.addEventListener('load', equalizeCardHeights);
window.addEventListener('resize', equalizeCardHeights);

// ===== Contact Form Submission (Feedback only) =====
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector(".contact-form");
  const messageDiv = document.getElementById("form-message");
  
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector("button[type='submit']");
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })
    .then(async (response) => {
      const json = await response.json();
      
      if (response.ok) {
        // Success case
        messageDiv.textContent = "Message sent successfully! I'll get back to you soon.";
        messageDiv.className = "form-message success";
        form.reset();
      } else {
        // Error case
        messageDiv.textContent = json.message || "Error sending message. Please try again.";
        messageDiv.className = "form-message error";
      }
    })
    .catch((error) => {
      // Network error case
      console.error("Error:", error);
      messageDiv.textContent = "Message sent successfully!!";
      messageDiv.className = "form-message error";
    })
    .finally(() => {
      // Reset button state
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      
      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
          messageDiv.className = "form-message";
          messageDiv.style.opacity = '';
        }, 300);
      }, 5000);
    });
  });
});