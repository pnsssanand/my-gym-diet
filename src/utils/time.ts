/**
 * Utility functions for meal timing and day progress
 */

export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(' ');
  if (parts.length < 2) return 0;

  const [time, period] = parts;
  let [hours, minutes] = time.split(':').map(Number);
  if (isNaN(hours)) hours = 0;
  if (isNaN(minutes)) minutes = 0;

  const upperPeriod = period.toUpperCase();
  if (upperPeriod === 'PM' && hours < 12) hours += 12;
  if (upperPeriod === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

/**
 * Returns true if the meal's scheduled time has already passed today
 * (with a 20-minute eating window grace period)
 */
export function isMealTimePassed(timeStr: string, referenceDate: Date = new Date()): boolean {
  const currentMinutes = referenceDate.getHours() * 60 + referenceDate.getMinutes();
  const mealMinutes = parseTimeToMinutes(timeStr);
  return currentMinutes > mealMinutes + 20;
}

/**
 * Returns true if the meal is in the active current window
 */
export function isMealCurrentWindow(
  timeStr: string,
  nextTimeStr?: string,
  referenceDate: Date = new Date()
): boolean {
  const currentMinutes = referenceDate.getHours() * 60 + referenceDate.getMinutes();
  const mealMinutes = parseTimeToMinutes(timeStr);
  const endMinutes = nextTimeStr ? parseTimeToMinutes(nextTimeStr) : mealMinutes + 90;

  return currentMinutes >= mealMinutes - 20 && currentMinutes <= endMinutes;
}

/**
 * Human readable status string based on meal time vs current time
 */
export function getMealTimeStatus(
  timeStr: string,
  isCompleted: boolean,
  nextTimeStr?: string,
  referenceDate: Date = new Date()
): { status: 'passed' | 'current' | 'upcoming'; label: string } {
  if (isCompleted) {
    return { status: 'passed', label: 'Completed' };
  }

  const currentMinutes = referenceDate.getHours() * 60 + referenceDate.getMinutes();
  const mealMinutes = parseTimeToMinutes(timeStr);

  if (isMealCurrentWindow(timeStr, nextTimeStr, referenceDate)) {
    return { status: 'current', label: 'Active Window (Eat Now)' };
  }

  if (currentMinutes > mealMinutes + 20) {
    const diff = currentMinutes - mealMinutes;
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    const text = hours > 0 ? `${hours}h ago` : `${mins}m ago`;
    return { status: 'passed', label: `Out of time (${text})` };
  }

  const diff = mealMinutes - currentMinutes;
  const hours = Math.floor(diff / 60);
  const mins = diff % 60;
  const text = hours > 0 ? `in ${hours}h ${mins}m` : `in ${mins}m`;
  return { status: 'upcoming', label: `Upcoming (${text})` };
}
