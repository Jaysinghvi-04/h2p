
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Cpu, Lock, Terminal as TerminalIcon } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "TryDec CTF Environment",
    category: "Cybersecurity",
    description: "A highly isolated Capture The Flag platform designed for offensive security training. Features automated provisioning of vulnerable Linux instances and real-time score tracking.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    tags: ["Linux", "Networking", "Docker", "RedHat"],
    size: 'large'
  },
  {
    id: 2,
    title: "Cyber-Secure Mailer",
    category: "Security Tool",
    description: "An enterprise-grade email automation system built with security-first principles. Includes honeypot detection for mail servers and advanced encryption for payload delivery.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    tags: ["Python", "Flask", "Security", "SMTP"],
    size: 'small'
  },
  {
    id: 3,
    title: "Cloud Misconfig Scanner",
    category: "Cloud Security",
    description: "A specialized tool for auditing cloud infrastructure. It proactively scans AWS S3 buckets and IAM policies for public exposure and permission escalation risks.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    tags: ["AWS", "Python", "Cloud", "Audit"],
    size: 'tall'
  },
  {
    id: 4,
    title: "Network Port Scanner",
    category: "Networking",
    description: "High-performance multi-threaded scanner capable of banner grabbing and service identification. Designed for rapid network topology discovery and vulnerability surfacing.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200",
    tags: ["Socket", "Python", "Networking", "PenTesting"],
    size: 'wide'
  },
  {
    id: 5,
    title: "PROJO - Project Management",
    category: "Web Dev",
    description: "A secure collaborative workspace with military-grade authentication protocols. Implements complex RBAC systems and encrypted document storage.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    tags: ["React", "Auth", "SQL", "RBAC"],
    size: 'small'
  }
];

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loadingText, setLoadingText] = useState('Initializing decryption...');

  useEffect(() => {
    const found = projects.find(p => p.id === Number(id));
    if (found) setProject(found);
    
    const sequence = [
      'Establishing secure handshake...',
      'Bypassing firewall...',
      'Decrypting project assets...',
      'Render sequence initiated.'
    ];
    
    sequence.forEach((text, i) => {
      setTimeout(() => setLoadingText(text), (i + 1) * 400);
    });
  }, [id]);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-slate-950/40 backdrop-blur-md border-b border-white/5">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Grid
        </button>
        <div className="text-fuchsia-500 font-display font-black text-xl tracking-tighter">
          PROJECT.<span className="text-white">DB</span>
        </div>
      </nav>

      <main className="pt-24 px-6 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold uppercase tracking-widest bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30 rounded-full">
              {project.category}
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter">
              {project.title}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              {project.tags.map((tag, i) => (
                <div key={tag} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                  <span className="text-xs font-bold text-slate-300">{tag}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button className="px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-fuchsia-600/20">
                Live Deployment
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all">
                Source Code
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
          </motion.div>
        </div>

        {/* Technical Specs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl">
            <Shield className="w-8 h-8 text-fuchsia-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Security Protocol</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Implemented AES-256 encryption at rest and TLS 1.3 for all data transit operations.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl">
            <Cpu className="w-8 h-8 text-cyan-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Orchestration</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Docker containerization managed through secure YAML configurations and automated CI/CD pipelines.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl">
            <Lock className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Access Control</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Fine-grained RBAC mechanisms ensuring least-privilege principles across the stack.
            </p>
          </div>
        </div>

        {/* Terminal Log Output */}
        <div className="mt-12 bg-slate-950 border border-white/10 rounded-3xl p-6 font-mono text-xs overflow-hidden">
          <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
            <TerminalIcon className="w-4 h-4 text-emerald-500" />
            <span className="text-slate-500 font-bold uppercase tracking-widest">System_Report.log</span>
          </div>
          <div className="space-y-1 text-emerald-500/80">
            <p>[INFO] Project metadata loaded successfully.</p>
            <p>[AUTH] Session verified: Jay Singhvi (UID: 0x4453)</p>
            <p>[SCAN] Vulnerability assessment: 0 critical vulnerabilities found.</p>
            <p className="animate-pulse">{`> ${loadingText}`}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
