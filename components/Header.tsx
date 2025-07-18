
import React from 'react';
import { DocumentMagnifyingGlassIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-7xl mx-auto py-6 px-4 md:px-0">
      <div className="flex items-center justify-center text-center">
        <DocumentMagnifyingGlassIcon className="w-10 h-10 md:w-12 md:h-12 mr-3 text-indigo-400" />
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          ATS Resume Analyzer
        </h1>
      </div>
      <p className="mt-2 text-center text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
        Get an AI-powered analysis of your resume against a job description. Understand your match score and discover key areas for improvement.
      </p>
    </header>
  );
};
