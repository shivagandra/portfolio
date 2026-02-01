/**
 * Get the correct image path considering the base URL
 * This is necessary for GitHub Pages deployment where the base URL includes the repo name
 */
export function getImagePath(imageName: string): string {
  return `${import.meta.env.BASE_URL}${imageName}`;
}
