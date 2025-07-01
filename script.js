// Import EmailJS library
const emailjs = window.emailjs

// Initialize EmailJS
;(() => {
  emailjs.init("Qqrc2s3cK-FrFvZqF") // Replace with your EmailJS public key
})()

// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const body = document.body
const themeIcon = document.getElementById("themeIcon")

themeToggle.addEventListener("click", () => {
  body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark"
  localStorage.setItem("theme", body.dataset.theme)

  // Update theme icon
  if (body.dataset.theme === "dark") {
    themeIcon.className = "fas fa-moon"
  } else {
    themeIcon.className = "fas fa-sun"
  }
})

// Load saved theme
const savedTheme = localStorage.getItem("theme")
if (savedTheme) {
  body.dataset.theme = savedTheme
  if (savedTheme === "dark") {
    themeIcon.className = "fas fa-moon"
  } else {
    themeIcon.className = "fas fa-sun"
  }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el)
})

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTop")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("show")
  } else {
    scrollTopBtn.classList.remove("show")
  }
})

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Contact form handling with EmailJS
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  const submitBtn = document.getElementById("submitBtn")
  const successMessage = document.getElementById("successMessage")
  const errorMessage = document.getElementById("errorMessage")

  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitBtn.disabled = true

  // Hide previous messages
  successMessage.style.display = "none"
  errorMessage.style.display = "none"

  // Send email using EmailJS
  emailjs
    .sendForm("service_u9a6a6p", "template_a6sypgh", this)
    .then(
      () => {
        // Success
        successMessage.style.display = "block"
        document.getElementById("contactForm").reset()

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.display = "none"
        }, 5000)
      },
      (error) => {
        // Error
        console.error("EmailJS error:", error)
        errorMessage.style.display = "block"

        // Hide error message after 5 seconds
        setTimeout(() => {
          errorMessage.style.display = "none"
        }, 5000)
      },
    )
    .finally(() => {
      // Reset button
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'
      submitBtn.disabled = false
    })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = body.dataset.theme === "dark" ? "rgba(26, 26, 26, 0.98)" : "rgba(245, 241, 235, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = body.dataset.theme === "dark" ? "rgba(26, 26, 26, 0.95)" : "rgba(245, 241, 235, 0.95)"
    navbar.style.boxShadow = "none"
  }
})
