import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 * Included here for completeness — if utils/cn.js already exists
 * in your project, skip this file.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
