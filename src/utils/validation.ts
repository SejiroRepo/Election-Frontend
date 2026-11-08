/**
 * Validates ABU Matriculation Number
 * Format: UXXYYZZZZ (e.g., U19CS1012) or U/XX/YY/ZZZZ (e.g., U/19/CS/1012)
 */
export const validateMatricNumber = (matric: string): boolean => {
  const normalized = matric.toUpperCase().replace(/\//g, '');
  // Pattern: U followed by 2 digits (year), 2-3 letters (dept), and 3-5 digits (serial)
  const regex = /^U\d{2}[A-Z]{2,3}\d{3,5}$/;
  return regex.test(normalized);
};

/**
 * Validates ABU Student Email
 * Format: name.surname@abu.edu.ng or matric@abu.edu.ng
 */
export const validateAbuEmail = (email: string): boolean => {
  const normalized = email.toLowerCase().trim();
  return normalized.endsWith('@abu.edu.ng') && normalized.length > 11;
};

/**
 * Validates password strength
 * Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character
 */
export const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};
