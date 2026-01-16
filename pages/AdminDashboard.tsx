
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { AnalyticsData } from '../types';
import { ArrowLeft, ShieldCheck, Users, Clock, Globe, Laptop, RefreshCw, Zap, ZapOff, Activity } from 'lucide-react';

const COLORS = ['#d946ef', '#06b6d4', '#8b5cf6', '#3b82f6'];

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const pollingRef = useRef<number | null>(null);
  const simulatorRef = useRef<number | null>(null);

  const fetchData = () => {
    setIsSyncing(true);
    const raw = localStorage.getItem('lumina_analytics');
    if (raw) {
      const parsedData = JSON.parse(raw);
      // Sort by timestamp descending
      const sorted = parsedData.sort((a: any, b: any) => b.timestamp - a.timestamp);
      setData(prev => {
        // Only update if length or last item changed to avoid unnecessary re-renders
        if (prev.length !== sorted.length) {
          setLastSync(new Date());
          return sorted;
        }
        return prev;
      });
    }
    setTimeout(() => setIsSyncing(false), 600);
  };

  // Simulation Logic: Adds a random visitor every few seconds
  const startSimulation = () => {
    simulatorRef.current = window.setInterval(() => {
      const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
      const oss = ['Windows', 'macOS', 'Linux', 'iOS', 'Android'];
      const resolutions = ['1920x1080', '1440x900', '390x844', '2560x1440'];
      
      const newEntry: AnalyticsData = {
        id: Math.random().toString(36).substr(2, 9),
        os: oss[Math.floor(Math.random() * oss.length)],
        browser: browsers[Math.floor(Math.random() * browsers.length)],
        resolution: resolutions[Math.floor(Math.random() * resolutions.length)],
        referrer: Math.random() > 0.5 ? 'google.com' : 'Direct',
        entryTime: Date.now(),
        timestamp: Date.now(),
        duration: Math.random() * 120
      };

      const existing = JSON.parse(localStorage.getItem('lumina_analytics') || '[]');
      existing.push(newEntry);
      localStorage.setItem('lumina_analytics', JSON.stringify(existing));
      
      // Manually trigger fetch to show immediate result in simulation mode
      fetchData();
    }, 3000);
  };

  const stopSimulation = () => {
    if (simulatorRef.current) {
      clearInterval(simulatorRef.current);
      simulatorRef.current = null;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      pollingRef.current = window.setInterval(fetchData, 5000);
      window.addEventListener('storage', fetchData);
    }
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
      window.removeEventListener('storage', fetchData);
      stopSimulation();
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (isSimulating) startSimulation();
    else stopSimulation();
  }, [isSimulating]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Access Denied');
  };

  // Memoized Chart Data
  const dailyVisits = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach(d => {
      const date = new Date(d.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      map[date] = (map[date] || 0) + 1;
    });
    return Object.entries(map)
      .slice(-7) // Last 7 days
      .map(([name, visits]) => ({ name, visits }));
  }, [data]);

  const osData = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach(d => { map[d.os] = (map[d.os] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [data]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 bg-slate-900 border border-white/10 rounded-3xl shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-fuchsia-500/20 text-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold font-display bg-gradient-to-r from-white via-fuchsia-200 to-fuchsia-500 bg-clip-text text-transparent">
              Admin Terminal
            </h1>
            <p className="text-slate-400 text-sm mt-2">Access key required for real-time monitoring.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Credentials"
              className="w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-fuchsia-500 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-fuchsia-600/20"
            >
              Unlock Dashboard
            </button>
          </form>
          <a href="#/" className="mt-8 flex items-center justify-center gap-2 text-slate-500 hover:text-slate-300 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Return to Site
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20 selection:bg-fuchsia-500/30">
      <header className="bg-slate-900/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#/" className="p-2 hover:bg-white/5 rounded-lg transition-colors"><ArrowLeft className="w-5 h-5" /></a>
            <h1 className="text-xl font-bold font-display flex items-center gap-2">
              <Activity className="w-5 h-5 text-fuchsia-500 animate-pulse" />
              <span className="bg-gradient-to-r from-white via-fuchsia-200 to-fuchsia-400 bg-clip-text text-transparent">
                Real-Time Engine
              </span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Simulation Toggle */}
            <button 
              onClick={() => setIsSimulating(!isSimulating)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                isSimulating 
                  ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-400' 
                  : 'bg-slate-800 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isSimulating ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">
                {isSimulating ? 'Simulating' : 'Simulate Traffic'}
              </span>
            </button>

            <div className="h-8 w-px bg-white/5 hidden md:block" />

            <div className="flex items-center gap-3">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={isSyncing ? 'syncing' : 'synced'}
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`w-3 h-3 text-slate-500 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    {isSyncing ? 'Syncing...' : `Synced ${lastSync.toLocaleTimeString()}`}
                  </span>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        <LayoutGroup>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Total Visits', value: data.length, icon: Users, color: 'text-fuchsia-500' },
              { label: 'Active Sessions', value: isSimulating ? 'SIMULATED' : 'LIVE', icon: Activity, color: 'text-emerald-500' },
              { label: 'Cloud Audit', value: 'Healthy', icon: ShieldCheck, color: 'text-purple-500' },
              { label: 'Avg Pulse', value: `${(data.reduce((acc, curr) => acc + (curr.duration || 0), 0) / (data.length || 1)).toFixed(1)}s`, icon: Clock, color: 'text-cyan-500' }
            ].map((stat, i) => (
              <motion.div
                layout
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl relative overflow-hidden group"
              >
                <div className={`absolute top-0 left-0 w-1 h-full bg-current ${stat.color} opacity-20`} />
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-slate-800 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                    <motion.p 
                      key={stat.value}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold font-display"
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual Analytics */}
            <motion.div layout className="lg:col-span-2 bg-slate-900/50 border border-white/5 p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-lg font-bold font-display bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Engagement Velocity
                </h3>
                <div className="flex gap-2">
                   <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Incoming Stream</span>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyVisits}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.5} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px', fontSize: '12px' }}
                      itemStyle={{ color: '#d946ef' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="visits" 
                      stroke="#d946ef" 
                      fillOpacity={1} 
                      fill="url(#colorVisits)" 
                      strokeWidth={3} 
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Platform Mix */}
            <motion.div layout className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl">
              <h3 className="text-lg font-bold font-display mb-8 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Platform Diversification
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={osData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={10}
                      dataKey="value"
                      stroke="none"
                    >
                      {osData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div layout className="lg:col-span-3 bg-slate-900/50 border border-white/5 p-8 rounded-3xl overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold font-display bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Intelligence Feed
                </h3>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Live Event Protocol
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-[10px] uppercase text-slate-500 border-b border-white/5">
                    <tr>
                      <th className="pb-4 font-bold tracking-widest">Event ID</th>
                      <th className="pb-4 font-bold tracking-widest">User Agent</th>
                      <th className="pb-4 font-bold tracking-widest">Referrer</th>
                      <th className="pb-4 font-bold tracking-widest">Display</th>
                      <th className="pb-4 font-bold tracking-widest text-right">Activity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <AnimatePresence initial={false}>
                      {data.slice(0, 8).map((log, idx) => (
                        <motion.tr 
                          layout
                          key={log.id} 
                          initial={{ opacity: 0, x: -20, backgroundColor: 'rgba(217, 70, 239, 0.1)' }}
                          animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(217, 70, 239, 0)' }}
                          transition={{ duration: 0.5 }}
                          className="text-sm hover:bg-white/[0.02] transition-colors group/row"
                        >
                          <td className="py-4">
                            <span className="font-mono text-[10px] text-slate-500 group-hover/row:text-fuchsia-400 transition-colors">
                              {log.id}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-slate-800 rounded text-[9px] font-bold text-slate-300 uppercase tracking-tighter">
                                {log.os}
                              </span>
                              <span className="text-slate-400 text-xs">{log.browser}</span>
                            </div>
                          </td>
                          <td className="py-4 text-slate-400 text-xs truncate max-w-[150px]">{log.referrer}</td>
                          <td className="py-4 text-slate-500 font-mono text-[10px]">{log.resolution}</td>
                          <td className="py-4 text-right">
                            <span className="text-fuchsia-500 font-bold font-mono text-xs">
                              {log.duration ? `${log.duration.toFixed(1)}s` : 'active'}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                {data.length === 0 && (
                  <div className="py-24 text-center">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Activity className="w-6 h-6 text-slate-700" />
                    </div>
                    <p className="text-slate-600 italic text-sm">Listening for incoming visitor data...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </LayoutGroup>
      </main>
    </div>
  );
};

export default AdminDashboard;
