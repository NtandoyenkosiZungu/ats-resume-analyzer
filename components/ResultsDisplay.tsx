
import React from 'react';
import { AnalysisResult } from '../types';
import { CheckCircleIcon, XCircleIcon, LightBulbIcon, StarIcon } from './Icons';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 2 * Math.PI * 45; // r = 45
  const offset = circumference - (score / 100) * circumference;
  
  let strokeColor = "stroke-red-500";
  if (score >= 75) {
    strokeColor = "stroke-green-500";
  } else if (score >= 50) {
    strokeColor = "stroke-yellow-500";
  }

  return (
    <div className="relative w-40 h-40 mx-auto mb-8">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="stroke-current text-slate-700"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
        />
        <circle
          className={`stroke-current ${strokeColor} transform -rotate-90 origin-center transition-all duration-1000 ease-out`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold text-slate-100">{score}%</span>
      </div>
    </div>
  );
};


const ResultSection: React.FC<{ title: string; items: string[]; icon: React.ReactNode; itemIcon?: React.ReactNode; itemIconClass?: string; listType?: 'ul' | 'ol' }> = ({ title, items, icon, itemIcon, itemIconClass, listType = 'ul' }) => {
  if (!items || items.length === 0) {
    return null; 
  }

  const ListComponent = listType;

  return (
    <div className="bg-slate-700/50 p-6 rounded-lg shadow-lg mb-6 border border-slate-600">
      <h3 className="text-xl font-semibold text-indigo-400 mb-4 flex items-center">
        {icon}
        {title}
      </h3>
      {items.length > 0 ? (
        <ListComponent className={`space-y-2 ${listType === 'ol' ? 'list-decimal list-inside' : 'list-none'} text-slate-300`}>
          {items.map((item, index) => (
            <li key={index} className="flex items-start text-sm">
              {itemIcon && <span className={`mr-2 mt-1 flex-shrink-0 ${itemIconClass}`}>{itemIcon}</span>}
              <span>{item}</span>
            </li>
          ))}
        </ListComponent>
      ) : (
        <p className="text-slate-400 italic text-sm">No specific {title.toLowerCase()} identified.</p>
      )}
    </div>
  );
};


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <ScoreCircle score={result.matchScore} />
      
      <ResultSection 
        title="Key Strengths" 
        items={result.strengths}
        icon={<StarIcon className="w-6 h-6 mr-2 text-yellow-400" />}
        itemIcon={<CheckCircleIcon className="w-4 h-4" />}
        itemIconClass="text-green-400"
      />
      <ResultSection 
        title="Missing Keywords & Skills" 
        items={result.missingKeywords}
        icon={<XCircleIcon className="w-6 h-6 mr-2 text-red-400" />}
        itemIcon={<XCircleIcon className="w-4 h-4" />}
        itemIconClass="text-red-400"

      />
      <ResultSection 
        title="Improvement Suggestions" 
        items={result.suggestions}
        icon={<LightBulbIcon className="w-6 h-6 mr-2 text-blue-400" />}
        itemIcon={<LightBulbIcon className="w-4 h-4" />}
        itemIconClass="text-blue-400"
        listType="ol"
      />
    </div>
  );
};
