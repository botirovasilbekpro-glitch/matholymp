import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isGradeValidForGroup,
  getDefaultGradeForGroup,
  validateRegistration,
  calculateAccuracy,
  JUNIOR_GRADES,
  SENIOR_GRADES,
} from './validation.ts';

test('Junior group only allows grades 5, 6, 7, 8', () => {
  for (const g of JUNIOR_GRADES) {
    assert.equal(isGradeValidForGroup('Junior', g), true, `Grade ${g} should be valid for Junior`);
  }
  assert.equal(isGradeValidForGroup('Junior', 4), false);
  assert.equal(isGradeValidForGroup('Junior', 9), false);
  assert.equal(isGradeValidForGroup('Junior', 10), false);
  assert.equal(isGradeValidForGroup('Junior', 11), false);
});

test('Senior group only allows grades 9, 10, 11', () => {
  for (const g of SENIOR_GRADES) {
    assert.equal(isGradeValidForGroup('Senior', g), true, `Grade ${g} should be valid for Senior`);
  }
  assert.equal(isGradeValidForGroup('Senior', 5), false);
  assert.equal(isGradeValidForGroup('Senior', 8), false);
  assert.equal(isGradeValidForGroup('Senior', 12), false);
});

test('Default grade assignment switches correctly', () => {
  assert.equal(getDefaultGradeForGroup('Junior'), 5);
  assert.equal(getDefaultGradeForGroup('Senior'), 9);
});

test('Registration validation rejects invalid grade for group', () => {
  const invalidResult = validateRegistration({
    firstName: 'Aziz',
    lastName: 'Karimov',
    group: 'Junior',
    grade: 10, // Invalid for Junior!
    email: 'aziz@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.grade);
});

test('Registration validation accepts valid Junior data', () => {
  const validResult = validateRegistration({
    firstName: 'Aziz',
    lastName: 'Karimov',
    group: 'Junior',
    grade: 7,
    email: 'aziz@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  });
  assert.equal(validResult.isValid, true);
  assert.deepEqual(validResult.errors, {});
});

test('Accuracy calculation handles 0 and normal counts correctly', () => {
  assert.equal(calculateAccuracy(0, 0), 0);
  assert.equal(calculateAccuracy(3, 4), 75);
  assert.equal(calculateAccuracy(1, 3), 33);
});
