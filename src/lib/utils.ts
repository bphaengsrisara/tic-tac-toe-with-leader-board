import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ! don't use this to generate id (Using PseudoRandom Number Generators (PRNGs) is security-sensitive)
export function simpleRandom() {
  // eslint-disable-next-line sonarjs/pseudo-random
  return Math.random();
}

export async function fakeDelay() {
  await new Promise((r) => setTimeout(r, 500));
}
