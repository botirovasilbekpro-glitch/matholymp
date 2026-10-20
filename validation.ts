import type { StudentGroup, Grade } from '../types/index.ts';

export const JUNIOR_GRADES: readonly Grade[] = [5, 6, 7, 8];
export const SENIOR_GRADES: readonly Grade[] = [9, 10, 11];

/**
 * Returns whether a given grade is valid for the specified group
 */
export function isGradeValidForGroup(group: StudentGroup, grade: number): boolean {
  if (group === 'Junior') {
    return JUNIOR_GRADES.includes(grade as Grade);
  }
  if (group === 'Senior') {
    return SENIOR_GRADES.includes(grade as Grade);
  }
  return false;
}

/**
 * Returns the default grade for a given group
 */
export function getDefaultGradeForGroup(group: StudentGroup): Grade {
  return group === 'Junior' ? 5 : 9;
}

/**
 * Returns available grades for group
 */
export function getGradesForGroup(group: StudentGroup): readonly Grade[] {
  return group === 'Junior' ? JUNIOR_GRADES : SENIOR_GRADES;
}

export interface RegistrationInput {
  firstName: string;
  lastName: string;
  group: StudentGroup;
  grade: number;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateRegistration(input: RegistrationInput, checkPasswords = true): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.firstName || input.firstName.trim().length < 2) {
    errors.firstName = "Ism kamida 2 ta belgidan iborat bo‘lishi kerak.";
  }

  if (!input.lastName || input.lastName.trim().length < 2) {
    errors.lastName = "Familiya kamida 2 ta belgidan iborat bo‘lishi kerak.";
  }

  if (input.group !== 'Junior' && input.group !== 'Senior') {
    errors.group = "Iltimos, guruhni tanlang (Junior yoki Senior).";
  }

  if (!isGradeValidForGroup(input.group, Number(input.grade))) {
    if (input.group === 'Junior') {
      errors.grade = "Junior guruhi uchun faqat 5, 6, 7 yoki 8-sinflar ruxsat etiladi.";
    } else {
      errors.grade = "Senior guruhi uchun faqat 9, 10 yoki 11-sinflar ruxsat etiladi.";
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = "To‘g‘ri email manzilini kiriting (masalan: oquvchi@mail.uz).";
  }

  if (checkPasswords) {
    if (!input.password || input.password.length < 6) {
      errors.password = "Parol kamida 6 ta belgidan iborat bo‘lishi shart.";
    }

    if (input.password !== input.confirmPassword) {
      errors.confirmPassword = "Parollar bir xil emas. Qaytadan tekshiring.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates accuracy percentage cleanly
 */
export function calculateAccuracy(solvedCount: number, attemptedCount: number): number {
  if (attemptedCount <= 0) return 0;
  return Math.round((solvedCount / attemptedCount) * 100);
}
