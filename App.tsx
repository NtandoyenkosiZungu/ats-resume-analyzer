
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TextAreaInput } from './components/TextAreaInput';
import { Button } from './components/Button';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { analyzeResumeAndJD } from './services/geminiService';
import { AnalysisResult } from './types';
import { SparklesIcon, DocumentTextIcon, BriefcaseIcon, ExclamationTriangleIcon } from './components/Icons';


const App: React.FC = () => {
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescriptionText, setJobDescriptionText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!resumeText.trim() || !jobDescriptionText.trim()) {
      setError('Please provide both a resume and a job description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeResumeAndJD(resumeText, jobDescriptionText);
      setAnalysisResult(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error("Analysis error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [resumeText, jobDescriptionText]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 flex flex-col items-center p-4 selection:bg-indigo-500 selection:text-white">
      <Header />
      <main className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mt-8 flex-grow">
        {/* Input Section */}
        <div className="bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-6 lg:p-8 space-y-6 border border-slate-700">
          <h2 className="text-2xl font-semibold text-indigo-400 flex items-center">
            <DocumentTextIcon className="w-7 h-7 mr-3" />
            Your Resume
          </h2>
          <TextAreaInput
            id="resume"
            label=""
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your full resume text here..."
            rows={12}
            className="bg-slate-700/50 border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-slate-200 placeholder-slate-400"
          />
          
          <h2 className="text-2xl font-semibold text-indigo-400 flex items-center mt-6">
            <BriefcaseIcon className="w-7 h-7 mr-3" />
            Job Description
          </h2>
          <TextAreaInput
            id="jobDescription"
            label=""
            value={jobDescriptionText}
            onChange={(e) => setJobDescriptionText(e.target.value)}
            placeholder="Paste the job description here..."
            rows={12}
            className="bg-slate-700/50 border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-slate-200 placeholder-slate-400"
          />
          
          <Button 
            onClick={handleAnalyze} 
            disabled={isLoading || !resumeText.trim() || !jobDescriptionText.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <LoadingSpinner className="w-5 h-5 mr-3 text-white" />
                Analyzing...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5 mr-3" />
                Analyze Resume
              </>
            )}
          </Button>
          {error && !isLoading && (
            <div className="mt-4 p-4 bg-red-700/50 border border-red-500 rounded-lg text-red-300 flex items-start">
              <ExclamationTriangleIcon className="w-6 h-6 mr-3 text-red-400 flex-shrink-0" />
              <ErrorMessage message={error} />
            </div>
           )}

        </div>

        {/* Results Section */}
        <div className="bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-6 lg:p-8 border border-slate-700">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">Analysis Report</h2>
          {isLoading && <div className="flex justify-center items-center h-full min-h-[300px]"><LoadingSpinner className="w-12 h-12 text-indigo-400"/></div>}
          
          {!isLoading && !analysisResult && !error && (
            <div className="text-center text-slate-400 py-10">
              <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-slate-500" />
              <p className="text-xl">Your resume analysis will appear here.</p>
              <p>Fill in your resume and the job description, then click "Analyze Resume".</p>
            </div>
          )}
          {analysisResult && !isLoading && <ResultsDisplay result={analysisResult} />}
        </div>
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        Powered By Gemini - Crafted for clarity By Ntandoyenkosi Zungu
      </footer>
    </div>
  );
};

export default App;
