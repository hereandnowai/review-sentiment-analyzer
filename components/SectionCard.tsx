
import React from 'react';

interface SectionCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  titleClassName?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, icon, children, titleClassName = "text-2xl" }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-2xl border border-slate-700/50">
      <div className="flex items-center mb-4">
        {icon && <span className="mr-3">{icon}</span>}
        <h2 className={`${titleClassName} font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500`}>{title}</h2>
      </div>
      <div className="text-slate-300">
        {children}
      </div>
    </div>
  );
};
