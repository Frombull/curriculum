let sideRailAnimated = false;
let resumeAnimated = false;

/** Returns whether the side rail entrance animation has already played in this session. */
export function hasSideRailAnimated(): boolean {
  return sideRailAnimated;
}

/** Marks the side rail entrance animation as completed for subsequent client navigations. */
export function markSideRailAnimated(): void {
  sideRailAnimated = true;
}

/** Returns whether the resume entrance animations have already played in this session. */
export function hasResumeAnimated(): boolean {
  return resumeAnimated;
}

/** Marks the resume entrance animations as completed for subsequent client navigations. */
export function markResumeAnimated(): void {
  resumeAnimated = true;
}
