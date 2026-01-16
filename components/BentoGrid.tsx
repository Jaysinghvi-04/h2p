
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';
import GlassCard from './GlassCard';
import { ExternalLink, Github, Share, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const projects: Project[] = [
  {
    id: 1,
    title: "TryDec CTF Environment",
    category: "Cybersecurity",
    description: "Custom Linux environment to host cybersecurity challenges with isolated participant sessions.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    tags: ["Linux", "Networking", "Docker"],
    size: 'large'
  },
  {
    id: 2,
    title: "Cyber-Secure Mailer",
    category: "Security Tool",
    description: "Python/Flask app for bulk email automation with honeypot intrusion detection and brute-force protection.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "Flask", "Security"],
    size: 'small'
  },
  {
    id: 3,
    title: "Cloud Misconfig Scanner",
    category: "Cloud Security",
    description: "Automated tool for detecting security misconfigurations in S3 buckets and IAM policies.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    tags: ["AWS", "Python", "Cloud"],
    size: 'tall'
  },
  {
    id: 4,
    title: "Network Port Scanner",
    category: "Networking",
    description: "Multi-threaded port scanner with banner grabbing for OS detection and service identification.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800",
    tags: ["Socket", "Python", "Networking"],
    size: 'wide'
  },
  {
    id: 5,
    title: "PROJO - Project Management",
    category: "Web Dev",
    description: "Collaborative platform with secure user authentication and Role-Based Access Control (RBAC).",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Auth", "SQL"],
    size: 'small'
  }
];

const ShareButton: React.FC<{ projectId: number; projectTitle: string }> = ({ projectId, projectTitle }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/#/project/${projectId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Project: ${projectTitle}`,
          text: `Check out ${projectTitle} by Jay Singhvi`,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') console.error('Error sharing:', err);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button 
      onClick={handleShare}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleShare(e as any); }}
      className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all group/btn"
      aria-label={`Share project: ${projectTitle}`}
      title={`Share ${projectTitle}`}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          </motion.div>
        ) : (
          <motion.div
            key="share"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <Share className="w-4 h-4 text-white/40 group-hover/btn:text-white" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-[10px] text-white rounded whitespace-nowrap border border-white/10 shadow-lg z-50">
          Link Copied!
        </span>
      )}
    </button>
  );
};

const BentoGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="portfolio-section" className="py-24 px-6 max-w-7xl mx-auto" aria-labelledby="portfolio-heading">
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-[10px] font-bold uppercase tracking-widest bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 rounded-full"
          role="status"
          aria-label={`${projects.length} total projects showcased`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" aria-hidden="true" />
          {projects.length} Total Projects
        </motion.div>
        <h2 id="portfolio-heading" className="font-display text-4xl font-bold mb-4">Selected Portfolio</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
        {projects.map((project, idx) => (
          <article 
            key={project.id} 
            className={`h-full cursor-pointer group/item ${
              project.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
            } ${
              project.size === 'wide' ? 'md:col-span-2 md:row-span-1' : ''
            } ${
              project.size === 'tall' ? 'md:col-span-1 md:row-span-2' : ''
            } ${
              project.size === 'small' ? 'md:col-span-1 md:row-span-1' : ''
            }`}
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <GlassCard
              delay={idx * 0.1}
              className="h-full"
            >
              <div className="relative group h-full flex flex-col p-6">
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={`Preview of ${project.title}`}
                    className="w-full h-full object-cover opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30 rounded-full">
                      {project.category}
                    </span>
                    <div className="flex gap-2 items-center">
                      <ShareButton projectId={project.id} projectTitle={project.title} />
                      <div className="flex gap-2 ml-1">
                        <a 
                          href="https://github.com/Jaysinghvi-04" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1 hover:text-white text-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-md"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`View ${project.title} source on GitHub`}
                        >
                          <Github className="w-5 h-5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-display text-2xl font-bold mb-2 group-hover/item:text-fuchsia-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Project technologies">
                      {project.tags.map(tag => (
                        <span key={tag} role="listitem" className="text-[10px] text-white/40 border border-white/10 px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
