/**
 * Utility functions for handling number inputs in calculators
 */

/**
 * Safely parse a number input value, allowing empty strings
 * @param value - The input value from e.target.value
 * @param fallback - Default value when input is empty (default: empty string)
 * @returns The parsed number or empty string
 */
export function parseNumberInput(value: string, fallback: number | string = ''): number | string {
  if (value === '' || value === null || value === undefined) {
    return fallback;
  }
  const parsed = Number(value);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Safely parse a float input value, allowing empty strings
 * @param value - The input value from e.target.value
 * @param fallback - Default value when input is empty (default: empty string)
 * @returns The parsed number or empty string
 */
export function parseFloatInput(value: string, fallback: number | string = ''): number | string {
  if (value === '' || value === null || value === undefined) {
    return fallback;
  }
  const parsed = parseFloat(value);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Safely parse an integer input value, allowing empty strings
 * @param value - The input value from e.target.value
 * @param fallback - Default value when input is empty (default: empty string)
 * @returns The parsed number or empty string
 */
export function parseIntInput(value: string, fallback: number | string = ''): number | string {
  if (value === '' || value === null || value === undefined) {
    return fallback;
  }
  const parsed = parseInt(value);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Format number for display, handling empty values
 * @param value - The value to format
 * @returns Formatted string for display
 */
export function formatNumberDisplay(value: number | string): string {
  if (value === '' || value === null || value === undefined) {
    return '';
  }
  return String(value);
}
