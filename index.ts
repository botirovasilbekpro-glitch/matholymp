export type StudentGroup = 'Junior' | 'Senior';

export type JuniorGrade = 5 | 6 | 7 | 8;
export type SeniorGrade = 9 | 10 | 11;
export type Grade = JuniorGrade | SeniorGrade;

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  group: StudentGroup;
  grade: Grade;
  school?: string;
  region?: string;
  role: 'student' | 'admin';
  createdAt: string;
}

export type DifficultyLevel = 'Oson' | "O'rta" | 'Qiyin' | 'Olimpiada';

export type CompetitionStage = 
  | 'Maktab bosqichi'
  | 'Tuman bosqichi'
  | 'Viloyat bosqichi'
  | 'Respublika bosqichi'
  | 'Xalqaro saralash (TST)'
  | 'Xalqaro olimpiada (IMO/BMO/EGMO)';

export interface Olympiad {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  competitionType: string; // e.g. "Milliy", "Xalqaro", "Xususiy"
  availableYears: number[];
  eligibleGroups: StudentGroup[];
  officialSourceUrl: string;
  logoUrl?: string;
  licensingInfo: string;
  isPublished: boolean;
  problemCount: number;
}

export interface Problem {
  id: string;
  olympiadId: string;
  olympiadName: string;
  year: number;
  stage: CompetitionStage;
  group: StudentGroup;
  eligibleGrades: Grade[];
  problemNumber: number;
  title: string;
  statementUz: string;
  statementOriginal?: string;
  diagramUrl?: string;
  diagramSvg?: string;
  difficulty: DifficultyLevel;
  topic: 'Algebra' | 'Geometriya' | 'Sonlar nazariyasi' | 'Kombinatorika' | 'Mantiq';
  officialAnswer?: string;
  officialSolution?: string;
  markingRubric?: {
    maxScore: number;
    steps: { score: number; description: string }[];
  };
  sourceUrl: string;
  licensingStatus: string;
  isPublished: boolean;
  hints: string[];
}

export type EvaluationCategory = 
  | "To‘g‘ri yechim" 
  | "Qisman to‘g‘ri" 
  | "Xato bor" 
  | "Tekshirish uchun ma’lumot yetarli emas";

export interface AiEvaluationFeedback {
  id: string;
  category: EvaluationCategory;
  scoreEstimate: number; // e.g. 7 out of 7
  maxScore: number;
  overallAssessment: string;
  correctReasoningSteps: string[];
  firstImportantError?: string;
  errorExplanation?: string;
  correctionSuggestion?: string;
  confidence: number; // 0.0 - 1.0
  uncertaintyNotes?: string;
  recommendedNextStep: string;
  evaluatedAt: string;
  modelUsed: string;
  isAiGenerated: boolean;
}

export interface Submission {
  id: string;
  problemId: string;
  userId: string;
  submissionType: 'typed' | 'handwritten' | 'hybrid';
  typedContent: string;
  handwrittenImageUrl?: string;
  submittedAt: string;
  feedback?: AiEvaluationFeedback;
  status: 'pending' | 'evaluated' | 'error';
  earnedScore?: number;
}

export interface UserProgress {
  totalAttempted: number;
  solvedCount: number;
  partiallySolvedCount: number;
  accuracyPercentage: number;
  savedProblemIds: string[];
  hintsUsedCount: number;
  submissions: Submission[];
}
