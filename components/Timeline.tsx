
import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../types';

const experiences: Experience[] = [
  {
    id: 1,
    role: "Event Organizer, TryDec CTF",
    company: "Capture The Flag Competition",
    period: "2025",
    description: "Organized a college-level CTF focused on Web Exploitation and Cryptography. Designed custom challenges and managed event logistics."
  },
  {
    id: 2,
    role: "B.Tech in Computer Science & Engineering",
    company: "Techno India NJR Institute of Technology",
    period: "2023 - 2027",
    description: "Focusing on cybersecurity, networking, and software engineering in Udaipur, Rajasthan."
  },
  {
    id: 3,
    role: "Red Hat Certified System Administrator",
    company: "RHCSA Certification",
    period: "2025",
    description: "Certified expertise in orchestrating secure Linux environments and managing complex server infrastructures."
  },
  {
    id: 4,
    role: "Senior Secondary Schooling",
    company: "St. Paul’s Sr. Sec. School",
    period: "2021 - 2023",
    description: "Completed secondary education with a strong foundation in science and mathematics."
  }
];

const Timeline: React.FC = () => {
  return (
    <section id="experience-section" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="font-display text-4xl font-bold mb-4">My Professional Journey</h2>
        <p className="text-slate-400">A timeline of certifications, education, and leadership.</p>
      </div>

      <div className="space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-8 md:pl-0"
          >
            <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
              <div className="md:col-span-1 mb-2 md:mb-0">
                <span className="text-sm font-bold text-fuchsia-500 uppercase tracking-widest">{exp.period}</span>
              </div>

              <div className="md:col-span-4 relative pl-8 border-l border-white/10">
                <div className="absolute top-1 -left-1.5 w-3 h-3 rounded-full bg-slate-900 border-2 border-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]" />
                <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                <p className="text-lg text-white/60 mb-3">{exp.company}</p>
                <p className="text-slate-400 leading-relaxed max-w-2xl">{exp.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
