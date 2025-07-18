
export interface AnalysisResult {
  matchScore: number; // A numerical score from 0 to 100
  strengths: string[]; // Strengths of the resume
  missingKeywords: string[]; // Keywords/skills missing from resume based on JD
  suggestions: string[]; // Actionable suggestions for improvement
}
