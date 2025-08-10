import React, { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Lightbulb, Code, Star, Award, Linkedin, Mail, Github, Link } from 'lucide-react';

// Data for the portfolio
const portfolioData = {
  education: {
    institution: "Thadomal Shahani Engineering College, Mumbai, India",
    degree: "Bachelor of Engineering in Information Technology",
    duration: "2022 - 2026",
    cgpa: "9.28",
  },
  experience: [
    {
      role: "Technology Summer Intern",
      company: "Barclays",
      duration: "June 2025 - July 2025",
      technologies: ["Pandas", "NumPy", "Seaborn", "Matplotlib", "nltk", "scikit-learn", "Sentence Transformers"],
      description: [
        "Developed a globally applicable dashboard that fetches Jira issues via JQL and the Jira REST API, supporting analysis across accessible projects or teams.",
        "Implemented forecasting models (Prophet, Theta Model, XGBRegressor) to project future issue volumes for teams or individuals over the next 2-3 months.",
        "Enabled analysis of backlog hygiene, priority trends over time, and workload projections through interactive visualizations and summaries.",
        "Applied Natural Language Processing (NLP) for semantic clustering of issue summaries using Hugging Face all-mpnet-base-v2 Sentence Transformer, DBSCAN, and TF-IDF, achieving a Semantic Coherence score of 80%.",
      ],
    },
    {
      role: "MERN Stack Intern",
      company: "Procurpal",
      duration: "Dec 2024 - Mar 2025",
      technologies: ["React JS", "TypeScript", "Redux Toolkit", "Tailwind CSS", "shadcn/ui"],
      description: [
        "Built 20+ fully responsive auction pages based on Figma designs, maintaining high fidelity, pixel precision, and seamless performance across all screen sizes.",
        "Resolved 20+ critical bugs in a 20,000+ line procurement system, improving reliability and performance.",
      ],
    },
  ],
  projects: [
    {
      name: "Harmony",
      links: { view: "https://harmony-taupe.vercel.app/", github: "https://github.com/khalidqureshii/Harmony", video: "https://www.youtube.com/watch?v=wQn-Yfl2p-c&t=0s" },
      technologies: ["React JS", "TypeScript", "Redux Toolkit", "Tailwind CSS", "shadcn/ui", "Node JS", "Express JS", "Socket.IO", "MongoDB", "JWT-Token"],
      description: [
        "Built a real-time chat platform using Socket.IO, engineered to support up to 500 concurrent users, which ensures seamless, low-latency instant messaging and dynamic chatroom management.",
        "Implemented comprehensive features for chatroom creation/removal and message editing/deletion (with distinct controls for users and administrators), reducing manual moderation time by as much as 90% compared to traditional database interventions.",
      ],
    },
    {
      name: "Mindful Moments",
      links: { view: "https://journalling-eight.vercel.app/", github: "https://github.com/khalidqureshii/MindfulMoments" },
      technologies: ["React JS", "Tailwind CSS", "Node JS", "Express JS", "MongoDB"],
      description: [
        "Developed a journaling platform that currently supports 100+ daily active users and handles more than 3000 entries each month.",
        "This solution simplifies the journaling process, allowing users to quickly record their daily experiences and review past entries to monitor their personal growth and foster deeper self-reflection.",
      ],
    },
  ],
  skills: [
    { title: "Data Science", skills: ["Pandas", "NumPy", "Seaborn", "Matplotlib", "nltk", "scikit-learn", "NLP", "Sentence Transformers"] },
    { title: "Frontend", skills: ["React.js", "Tailwind CSS", "shadcn/ui", "HTML", "CSS", "Redux Toolkit"] },
    { title: "Backend", skills: ["Node.js", "Express.js", "REST API", "Socket.IO", "Bcrypt", "JWT", "MongoDB", "MySQL"] },
    { title: "Languages", skills: ["Java", "Python", "JavaScript", "TypeScript"] },
    { title: "Tools & Platforms", skills: ["Postman", "Git", "GitHub", "BitBucket", "Jira"] },
  ],
  extraCurriculars: {
    leadership: {
      role: "Vice President, Green Club",
      duration: "Jan 2024 - July 2024",
      achievements: [
        "Organized a seminar to spread awareness about climate change.",
        "Held poster making, reel making competitions on world water day.",
      ],
    },
    codingProfiles: [
      { platform: "LeetCode", rank: "Knight", rating: "1904", contests: 25, problems: 600, link: "https://leetcode.com/u/khalidqureshi/" },
      { platform: "CodeForces", rank: "Specialist", rating: "1402", contests: 18, link: "https://codeforces.com/profile/khalidqureshi" },
      { platform: "CodeChef", rank: "4-Star", rating: "1822", contests: 12, link: "https://www.codechef.com/users/khalidqureshi" },
    ],
  },
  contact: {
    email: "khalidqureshi1198@example.com",
    linkedin: "https://www.linkedin.com/in/khalid-qureshi-4a2b8b282/",
    github: "https://github.com/khalidqureshii",
    leetcode: "https://leetcode.com/u/khalidqureshi/",
    codechef: "https://www.codechef.com/users/khalidqureshi",
    codeforces: "https://codeforces.com/profile/khalidqureshi",
  }
};

// Reusable Section Component
const Section: React.FC<{ id: string; title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ id, title, icon, children }) => (
  <section id={id} className="mb-16 md:mb-24 scroll-mt-20">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-8 flex items-center">
      <span className="text-purple-400 mr-4">{icon}</span>
      {title}
    </h2>
    {children}
  </section>
);

// Reusable Pill Component for technologies/skills
const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-slate-700 text-purple-300 text-xs font-medium mr-2 mb-2 px-3 py-1 rounded-full">
    {children}
  </span>
);

// Main App Component
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="bg-slate-900 text-slate-300 font-sans leading-relaxed">
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold text-white hover:text-purple-400 transition-colors">Khalid Qureshi</a>
          <div className="hidden md:flex space-x-6">
            {navLinks.map(link => (
              <a key={link.id} href={`#${link.id}`} className="text-slate-300 hover:text-purple-400 transition-colors">{link.label}</a>
            ))}
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto px-6 py-12 md:py-20">

        {/* Education Section */}
        <Section id="education" title="Education" icon={<GraduationCap />}>
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-semibold text-white">{portfolioData.education.institution}</h3>
            <p className="text-purple-400 mb-1">{portfolioData.education.degree}</p>
            <p className="text-slate-400 text-sm mb-2">{portfolioData.education.duration}</p>
            <p className="text-slate-300">CGPA: <span className="font-bold text-white">{portfolioData.education.cgpa}</span></p>
          </div>
        </Section>

        {/* Experience Section */}
        <Section id="experience" title="Experience" icon={<Briefcase />}>
          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 transform hover:shadow-purple-500/10 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-white">{exp.role} at <span className="text-purple-400">{exp.company}</span></h3>
                <p className="text-slate-400 text-sm mb-4">{exp.duration}</p>
                <div className="mb-4">
                  {exp.technologies.map(tech => <Pill key={tech}>{tech}</Pill>)}
                </div>
                <ul className="list-disc list-inside space-y-2 text-slate-300">
                  {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Projects" icon={<Lightbulb />}>
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 flex flex-col h-full transform hover:shadow-purple-500/10 hover:shadow-xl transition-shadow">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                      <div className="flex space-x-3">
                          {project.links.view && <a href={project.links.view} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400"><Link size={20} /></a>}
                          {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400"><Github size={20} /></a>}
                          {project.links.video && <a href={project.links.video} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400">Video</a>}
                      </div>
                  </div>
                  <div className="mb-4">
                    {project.technologies.map(tech => <Pill key={tech}>{tech}</Pill>)}
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-slate-300">
                    {project.description.map((desc, i) => <li key={i}>{desc}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" title="Skills" icon={<Code />}>
          <div className="space-y-6">
            {portfolioData.skills.map(category => (
              <div key={category.title}>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">{category.title}</h3>
                <div className="flex flex-wrap">
                  {category.skills.map(skill => (
                    <div key={skill} className="bg-slate-800 text-slate-200 text-sm font-medium mr-3 mb-3 px-4 py-2 rounded-md border border-slate-700">{skill}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
        
        {/* Extra Curriculars Section */}
        <Section id="extracurriculars" title="Extra Curriculars" icon={<Star />}>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Leadership */}
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-xl font-semibold text-white mb-2">{portfolioData.extraCurriculars.leadership.role}</h3>
                    <p className="text-slate-400 text-sm mb-4">{portfolioData.extraCurriculars.leadership.duration}</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-300">
                        {portfolioData.extraCurriculars.leadership.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                    </ul>
                </div>
                {/* Competitive Coding */}
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-xl font-semibold text-white mb-4">Competitive Coding</h3>
                    <div className="space-y-3">
                        {portfolioData.extraCurriculars.codingProfiles.map(profile => (
                            <a href={profile.link} key={profile.platform} target="_blank" rel="noopener noreferrer" className="block p-3 bg-slate-900/50 rounded-md border border-slate-700 hover:border-purple-500 transition-colors">
                                <p className="font-semibold text-purple-300">{profile.platform}: <span className="text-white">{profile.rank}</span></p>
                                <p className="text-sm text-slate-400">Peak Rating: {profile.rating} | Contests: {profile.contests} {profile.problems && `| Problems Solved: ${profile.problems}`}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Get In Touch" icon={<Award />}>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-lg text-slate-400 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out!
            </p>
            <div className="flex justify-center items-center space-x-6">
              <a href={`mailto:${portfolioData.contact.email}`} className="text-slate-400 hover:text-purple-400 transition-transform transform hover:scale-110"><Mail size={32} /></a>
              <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400 transition-transform transform hover:scale-110"><Linkedin size={32} /></a>
              <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400 transition-transform transform hover:scale-110"><Github size={32} /></a>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-slate-800">
        <p className="text-slate-500">Designed & Built by Khalid Qureshi</p>
      </footer>
    </div>
  );
}
