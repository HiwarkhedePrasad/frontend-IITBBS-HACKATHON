

---

# Frontend Application for the IITBBS Hackathon

This repository contains the source code for a frontend application developed for the **IITBBS Hackathon**. The project features a multi-sectional landing page with smooth animations, 3D interactive elements, and a clean, component-based architecture.

---

## ✨ Core Features

* **Dynamic Hero Section**: Engaging hero banner with interactive visuals.
* **3D Interactive Elements**: Immersive scenes powered by Spline.
* **Custom UI Enhancements**: Unique cursor and loading animations for a polished UX.
* **Animated Backgrounds**: Starfields and grid patterns for visual depth.
* **Work Showcase**: Interactive carousel and dedicated project sections.
* **Brand Marquee**: Continuous scrolling of client/brand logos.
* **Testimonials**: Responsive testimonial grid with hover effects.
* **Responsive Design**: Fully adaptable across all devices.
* **Component-Based Architecture**: Modular structure for scalability and maintainability.

---

## 🛠️ Technology Stack

* **Next.js** – React framework for production-ready apps
* **React** – UI library
* **Tailwind CSS** – Utility-first styling
* **GSAP** – High-performance animation platform
* **Framer Motion** – Motion library for React
* **React Icons** – Icon library

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18+
* npm, yarn, or pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/HiwarkhedePrasad/frontend-IITBBS-HACKATHON.git  

# Enter project directory
cd frontend-IITBBS-HACKATHON  

# Install dependencies
npm install  

# Run development server
npm run dev  
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**.

---

## 📁 Project Structure

```
.
├── .gitignore
├── README.md
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── public/                 # Static assets (SVGs, images, etc.)
└── src/
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.js
    │   └── page.js
    └── components/
        ├── BrandMarquee.js
        ├── Cursor.js
        ├── CustomLoader.js
        ├── FooterCTA.js
        ├── GridBackground.js
        ├── Hero.js
        ├── Services.js
        ├── SplineSection.js
        ├── StarfieldBackground.js
        ├── Stats.js
        ├── Testimonials.js
        ├── WorkCarousel.js
        └── WorkShowcase.js
```

---

## 🚢 Deployment

Deployment is recommended on **Vercel**, optimized for Next.js.
For other platforms, refer to the [Next.js deployment guide](https://nextjs.org/docs/deployment).

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch: `git checkout -b feature/NewFeature`
3. Commit changes: `git commit -m "Add NewFeature"`
4. Push to your fork: `git push origin feature/NewFeature`
5. Open a pull request

---

## 📄 License

Distributed under the **MIT License**. See the LICENSE file for details.

---

Do you want me to keep **GSAP and Framer Motion** in the stack list, or remove them since you just asked me to simplify and remove animations from the code?
