
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { AnalyticsData } from '../types';

// Mock Analytics Service (Simulating Firestore/Firebase)
const analyticsService = {
  logEntry: (data: Omit<AnalyticsData, 'id' | 'exitTime' | 'duration'>): string => {
    const id = Math.random().toString(36).substr(2, 9);
    const existing = JSON.parse(localStorage.getItem('lumina_analytics') || '[]');
    const newEntry = { ...data, id };
    existing.push(newEntry);
    localStorage.setItem('lumina_analytics', JSON.stringify(existing));
    return id;
  },
  logExit: (id: string, exitTime: number) => {
    const existing = JSON.parse(localStorage.getItem('lumina_analytics') || '[]');
    const entry = existing.find((e: AnalyticsData) => e.id === id);
    if (entry) {
      entry.exitTime = exitTime;
      entry.duration = (exitTime - entry.entryTime) / 1000; // duration in seconds
      localStorage.setItem('lumina_analytics', JSON.stringify(existing));
    }
  }
};

const AnalyticsContext = createContext<{ isActive: boolean }>({ isActive: false });

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sessionId = useRef<string | null>(null);

  useEffect(() => {
    const getOS = () => {
      const userAgent = window.navigator.userAgent;
      if (userAgent.indexOf("Win") !== -1) return "Windows";
      if (userAgent.indexOf("Mac") !== -1) return "macOS";
      if (userAgent.indexOf("Linux") !== -1) return "Linux";
      if (userAgent.indexOf("Android") !== -1) return "Android";
      if (userAgent.indexOf("like Mac") !== -1) return "iOS";
      return "Unknown";
    };

    const getBrowser = () => {
      const userAgent = window.navigator.userAgent;
      if (userAgent.indexOf("Chrome") !== -1) return "Chrome";
      if (userAgent.indexOf("Firefox") !== -1) return "Firefox";
      if (userAgent.indexOf("Safari") !== -1) return "Safari";
      if (userAgent.indexOf("Edge") !== -1) return "Edge";
      return "Unknown";
    };

    const entryData = {
      os: getOS(),
      browser: getBrowser(),
      resolution: `${window.screen.width}x${window.screen.height}`,
      referrer: document.referrer || 'Direct',
      entryTime: Date.now(),
      timestamp: Date.now(),
    };

    sessionId.current = analyticsService.logEntry(entryData);

    const handleExit = () => {
      if (sessionId.current) {
        analyticsService.logExit(sessionId.current, Date.now());
      }
    };

    window.addEventListener('beforeunload', handleExit);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') handleExit();
    });

    return () => {
      window.removeEventListener('beforeunload', handleExit);
      handleExit();
    };
  }, []);

  return (
    <AnalyticsContext.Provider value={{ isActive: true }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);
