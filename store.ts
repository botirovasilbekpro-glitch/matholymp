import { useState, useEffect } from 'react';
import { 
  UserProfile, 
  Olympiad, 
  Problem, 
  Submission, 
  AiEvaluationFeedback,
  StudentGroup,
  Grade,
  UserProgress 
} from '../types/index.ts';
import { INITIAL_OLYMPIADS, INITIAL_PROBLEMS } from './sample-data.ts';
import { calculateAccuracy } from './validation.ts';

const STORAGE_KEY_USER = 'matholymp_current_user';
const STORAGE_KEY_REGISTERED_USERS = 'matholymp_registered_users';
const STORAGE_KEY_PROBLEMS = 'matholymp_problems_data';
const STORAGE_KEY_OLYMPIADS = 'matholymp_olympiads_data';
const STORAGE_KEY_SUBMISSIONS = 'matholymp_submissions_data';
const STORAGE_KEY_BOOKMARKS = 'matholymp_bookmarks_data';
const STORAGE_KEY_HINTS = 'matholymp_hints_used';
const STORAGE_KEY_DRAFTS = 'matholymp_drafts_data';

// Platform Owner & Main Administrator: Asilbek Botirov
export const ASILBEK_BOTIROV_ADMIN: UserProfile = {
  id: 'usr-asilbek-botirov-admin',
  email: 'botirovasilbekpro@gmail.com',
  firstName: 'Asilbek',
  lastName: 'Botirov',
  group: 'Senior',
  grade: 9,
  school: 'Mirzo Ulug‘bek nomidagi ixtisoslashtirilgan maktab',
  region: 'Toshkent shahri',
  role: 'admin',
  createdAt: '2024-01-01T08:00:00Z',
};

// Initial registered users: only Platform Owner Asilbek Botirov
export const INITIAL_REGISTERED_USERS: UserProfile[] = [
  ASILBEK_BOTIROV_ADMIN,
];

// Global in-memory cache to sync across components
class StoreManager {
  private user: UserProfile | null = null;
  private registeredUsers: UserProfile[] = [];
  private problems: Problem[] = [];
  private olympiads: Olympiad[] = [];
  private submissions: Submission[] = [];
  private bookmarks: string[] = [];
  private hintsUsed: Record<string, number> = {};
  private drafts: Record<string, string> = {};
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      if (typeof window === 'undefined') return;

      const savedUsersList = localStorage.getItem(STORAGE_KEY_REGISTERED_USERS);
      if (savedUsersList) {
        const parsed = JSON.parse(savedUsersList);
        const filtered = Array.isArray(parsed) 
          ? parsed.filter((u: UserProfile) => !['usr-stud-2', 'usr-stud-3', 'usr-stud-4', 'usr-stud-5'].includes(u.id))
          : [];
        if (!filtered.some((u: UserProfile) => u.id === ASILBEK_BOTIROV_ADMIN.id)) {
          filtered.unshift(ASILBEK_BOTIROV_ADMIN);
        }
        this.registeredUsers = filtered;
      } else {
        this.registeredUsers = INITIAL_REGISTERED_USERS;
      }

      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      } else {
        // Unauthenticated guest visitor by default
        this.user = null;
      }

      const savedProblems = localStorage.getItem(STORAGE_KEY_PROBLEMS);
      this.problems = savedProblems ? JSON.parse(savedProblems) : INITIAL_PROBLEMS;

      const savedOlympiads = localStorage.getItem(STORAGE_KEY_OLYMPIADS);
      this.olympiads = savedOlympiads ? JSON.parse(savedOlympiads) : INITIAL_OLYMPIADS;

      const savedSubmissions = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
      this.submissions = savedSubmissions ? JSON.parse(savedSubmissions) : [];

      const savedBookmarks = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      this.bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : ['prob-jun-1'];

      const savedHints = localStorage.getItem(STORAGE_KEY_HINTS);
      this.hintsUsed = savedHints ? JSON.parse(savedHints) : {};

      const savedDrafts = localStorage.getItem(STORAGE_KEY_DRAFTS);
      this.drafts = savedDrafts ? JSON.parse(savedDrafts) : {};
    } catch {
      this.user = null;
      this.registeredUsers = INITIAL_REGISTERED_USERS;
      this.problems = INITIAL_PROBLEMS;
      this.olympiads = INITIAL_OLYMPIADS;
    }
  }

  private persist() {
    try {
      if (typeof window === 'undefined') return;
      if (this.user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(this.user));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
      localStorage.setItem(STORAGE_KEY_REGISTERED_USERS, JSON.stringify(this.registeredUsers));
      localStorage.setItem(STORAGE_KEY_PROBLEMS, JSON.stringify(this.problems));
      localStorage.setItem(STORAGE_KEY_OLYMPIADS, JSON.stringify(this.olympiads));
      localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(this.submissions));
      localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(this.bookmarks));
      localStorage.setItem(STORAGE_KEY_HINTS, JSON.stringify(this.hintsUsed));
      localStorage.setItem(STORAGE_KEY_DRAFTS, JSON.stringify(this.drafts));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // --- Auth & Profile ---
  public getUser(): UserProfile | null {
    return this.user;
  }

  public setUser(user: UserProfile | null) {
    this.user = user;
    this.persist();
  }

  public updateUserProfile(updates: Partial<UserProfile>) {
    if (!this.user) return;
    this.user = { ...this.user, ...updates };
    // Also update in registeredUsers list
    this.registeredUsers = this.registeredUsers.map((u) => 
      u.id === this.user?.id ? { ...u, ...updates } : u
    );
    this.persist();
  }

  public logout() {
    this.user = null;
    this.persist();
  }

  public getRegisteredUsers(): UserProfile[] {
    return this.registeredUsers;
  }

  public registerNewUser(newUser: UserProfile) {
    // Check if already registered
    const existingIndex = this.registeredUsers.findIndex(
      (u) => u.email.toLowerCase() === newUser.email.toLowerCase()
    );
    if (existingIndex >= 0) {
      this.registeredUsers[existingIndex] = newUser;
    } else {
      this.registeredUsers.unshift(newUser);
    }
    this.user = newUser;
    this.persist();
  }

  public deleteRegisteredUser(userId: string) {
    // Cannot delete Asilbek Botirov admin
    if (userId === ASILBEK_BOTIROV_ADMIN.id) return;
    this.registeredUsers = this.registeredUsers.filter((u) => u.id !== userId);
    this.persist();
  }

  public updateRegisteredUser(userId: string, data: Partial<UserProfile>) {
    this.registeredUsers = this.registeredUsers.map((u) => 
      u.id === userId ? { ...u, ...data } : u
    );
    if (this.user?.id === userId) {
      this.user = { ...this.user, ...data };
    }
    this.persist();
  }

  public verifyAdminPassword(password: string): boolean {
    // Admin password for Asilbek Botirov
    return password.trim() === 'asilbek2026' || password.trim() === 'admin123';
  }

  public isCurrentUserAdmin(): boolean {
    if (!this.user) return false;
    return (
      this.user.email.toLowerCase() === 'botirovasilbekpro@gmail.com' &&
      this.user.role === 'admin'
    );
  }

  public switchToAsilbekAdmin(password?: string): boolean {
    if (password !== undefined && !this.verifyAdminPassword(password)) {
      return false;
    }
    this.user = ASILBEK_BOTIROV_ADMIN;
    this.persist();
    return true;
  }

  public switchRole(role: 'student' | 'admin') {
    if (role === 'admin') {
      this.user = ASILBEK_BOTIROV_ADMIN;
    } else {
      // Toggle to student view for testing
      if (this.user) {
        this.user = { ...this.user, role: 'student' };
      }
    }
    this.persist();
  }

  // --- Olympiads & Problems ---
  public getOlympiads(): Olympiad[] {
    return this.olympiads;
  }

  public getOlympiadBySlug(slug: string): Olympiad | undefined {
    return this.olympiads.find((o) => o.slug === slug || o.id === slug);
  }

  public addOlympiad(olympiad: Olympiad) {
    this.olympiads.unshift(olympiad);
    this.persist();
  }

  public updateOlympiad(olympiad: Olympiad) {
    this.olympiads = this.olympiads.map((o) => (o.id === olympiad.id ? olympiad : o));
    this.persist();
  }

  public deleteOlympiad(id: string) {
    this.olympiads = this.olympiads.filter((o) => o.id !== id);
    this.persist();
  }

  public getProblems(): Problem[] {
    return this.problems;
  }

  public getProblemById(id: string): Problem | undefined {
    return this.problems.find((p) => p.id === id);
  }

  public addProblem(problem: Problem) {
    this.problems.unshift(problem);
    this.persist();
  }

  public updateProblem(problem: Problem) {
    this.problems = this.problems.map((p) => (p.id === problem.id ? problem : p));
    this.persist();
  }

  public deleteProblem(id: string) {
    this.problems = this.problems.filter((p) => p.id !== id);
    this.persist();
  }

  // --- Bookmarks ---
  public getBookmarks(): string[] {
    return this.bookmarks;
  }

  public isBookmarked(problemId: string): boolean {
    return this.bookmarks.includes(problemId);
  }

  public toggleBookmark(problemId: string) {
    if (this.bookmarks.includes(problemId)) {
      this.bookmarks = this.bookmarks.filter((id) => id !== problemId);
    } else {
      this.bookmarks.push(problemId);
    }
    this.persist();
  }

  // --- Drafts ---
  public getDraft(problemId: string): string {
    return this.drafts[problemId] || '';
  }

  public saveDraft(problemId: string, content: string) {
    this.drafts[problemId] = content;
    this.persist();
  }

  // --- Hints ---
  public getHintsUsedCount(problemId: string): number {
    return this.hintsUsed[problemId] || 0;
  }

  public unlockNextHint(problemId: string): number {
    const current = this.hintsUsed[problemId] || 0;
    this.hintsUsed[problemId] = current + 1;
    this.persist();
    return this.hintsUsed[problemId];
  }

  // --- Submissions & Evaluation ---
  public getSubmissions(): Submission[] {
    return this.submissions;
  }

  public getSubmissionsForProblem(problemId: string): Submission[] {
    return this.submissions.filter((s) => s.problemId === problemId);
  }

  public addSubmission(submission: Submission) {
    this.submissions.unshift(submission);
    this.persist();
  }

  public getUserProgress(userId: string): UserProgress {
    const userSubmissions = this.submissions.filter((s) => s.userId === userId);
    
    // Unique problems attempted
    const attemptedProblemIds = new Set(userSubmissions.map((s) => s.problemId));
    
    // Correctly solved problems
    const solvedProblemIds = new Set(
      userSubmissions
        .filter((s) => s.feedback?.category === 'To‘g‘ri yechim')
        .map((s) => s.problemId)
    );

    const partiallySolvedProblemIds = new Set(
      userSubmissions
        .filter((s) => s.feedback?.category === 'Qisman to‘g‘ri' && !solvedProblemIds.has(s.problemId))
        .map((s) => s.problemId)
    );

    const totalHints = Object.values(this.hintsUsed).reduce((sum, count) => sum + count, 0);

    return {
      totalAttempted: attemptedProblemIds.size,
      solvedCount: solvedProblemIds.size,
      partiallySolvedCount: partiallySolvedProblemIds.size,
      accuracyPercentage: calculateAccuracy(solvedProblemIds.size, attemptedProblemIds.size),
      savedProblemIds: this.bookmarks,
      hintsUsedCount: totalHints,
      submissions: userSubmissions,
    };
  }
}

export const store = new StoreManager();

export function useStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setTick((t) => t + 1));
    return () => {
      unsubscribe();
    };
  }, []);

  const user = store.getUser();
  const progress = user ? store.getUserProgress(user.id) : null;

  return {
    user,
    setUser: (u: UserProfile | null) => store.setUser(u),
    updateUserProfile: (p: Partial<UserProfile>) => store.updateUserProfile(p),
    logout: () => store.logout(),
    switchRole: (role: 'student' | 'admin') => store.switchRole(role),
    
    olympiads: store.getOlympiads(),
    getOlympiadBySlug: (slug: string) => store.getOlympiadBySlug(slug),
    addOlympiad: (o: Olympiad) => store.addOlympiad(o),
    updateOlympiad: (o: Olympiad) => store.updateOlympiad(o),
    deleteOlympiad: (id: string) => store.deleteOlympiad(id),
    
    problems: store.getProblems(),
    getProblemById: (id: string) => store.getProblemById(id),
    addProblem: (p: Problem) => store.addProblem(p),
    updateProblem: (p: Problem) => store.updateProblem(p),
    deleteProblem: (id: string) => store.deleteProblem(id),
    
    bookmarks: store.getBookmarks(),
    isBookmarked: (id: string) => store.isBookmarked(id),
    toggleBookmark: (id: string) => store.toggleBookmark(id),

    getDraft: (id: string) => store.getDraft(id),
    saveDraft: (id: string, c: string) => store.saveDraft(id, c),

    getHintsUsedCount: (id: string) => store.getHintsUsedCount(id),
    unlockNextHint: (id: string) => store.unlockNextHint(id),

    submissions: store.getSubmissions(),
    getSubmissionsForProblem: (id: string) => store.getSubmissionsForProblem(id),
    addSubmission: (s: Submission) => store.addSubmission(s),

    progress,
    registeredUsers: store.getRegisteredUsers(),
    registerNewUser: (u: UserProfile) => store.registerNewUser(u),
    updateRegisteredUser: (id: string, d: Partial<UserProfile>) => store.updateRegisteredUser(id, d),
    deleteRegisteredUser: (id: string) => store.deleteRegisteredUser(id),
    isCurrentUserAdmin: store.isCurrentUserAdmin(),
    verifyAdminPassword: (p: string) => store.verifyAdminPassword(p),
    switchToAsilbekAdmin: (p?: string) => store.switchToAsilbekAdmin(p),
  };
}
