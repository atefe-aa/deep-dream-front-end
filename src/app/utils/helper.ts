import { UserModel, useAuth } from "../modules/auth";
import { SlideModel } from "../modules/scanning/core/_models";
import { MetaModel } from "../modules/user-management/laboratories/core/_models";
import { FiltersModel } from "./_models";

export function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

export function randomState() {
  const states = ["success", "warning", "danger"];
  return states[Math.floor(Math.random() * states.length)];
}

export const getPageNumbers = (meta: MetaModel) => {
  if(!meta) return;
  
  const pages = [];

  // Determine the range of page numbers to display
  const startPage = Math.max(2, meta.current_page - 1);
  const endPage = Math.min(meta.last_page - 1, meta.current_page + 1);

  //  include the first page if there is more than one page
  if (meta.last_page > 1) {
    pages.push(1);
  }

  // Include ellipsis if there's a gap between the first page and the start page
  if (startPage > 2) {
    pages.push("...");
  }

  // Add the calculated range of pages
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Include ellipsis if there's a gap between the end page and the last page
  if (endPage < meta.last_page - 1) {
    pages.push("...");
  }

  // Always include the last page if it's not already in the range
  if (endPage < meta.last_page) {
    pages.push(meta.last_page);
  }

  return pages;
};

export const hasRole = (
  currentUser: UserModel,
  roles: string | Array<string>
) => {
  // Ensure roles is always an array
  const rolesArray = Array.isArray(roles) ? roles : [roles];

  return rolesArray.some(
    (role) =>
      currentUser &&
      currentUser.data &&
      currentUser.data.roles &&
      currentUser.data?.roles.includes(role)
  );
};

export function getProgressUI(progress: string) {
  let progressPercent = 0;
  let progressBg = "info";

  switch (progress) {
    case "ready":
      progressPercent = 5;
      progressBg = "warning";
      break;
    case "scanning":
      progressPercent = 50;
      progressBg = "primary";
      break;
    case "2x-scanned":
      progressPercent = 50;
      progressBg = "success";
      break;
    case "2x-image-ready":
      progressPercent = 70;
      progressBg = "info";
      break;
    case "scanned":
      progressPercent = 90;
      progressBg = "success";
      break;

    case "image-ready":
      progressPercent = 100;
      progressBg = "primary";
      break;
    default:
      progressPercent = 100;
      progressBg = "danger";
  }

  return { progressPercent, progressBg };
}

export function saveFilters(filters: FiltersModel, storageKey: string) {
  localStorage.setItem(storageKey, JSON.stringify(filters));
}

export function getFilters(storageKey: string) {
  const storedFilters = localStorage.getItem(storageKey);
  return storedFilters ? JSON.parse(storedFilters) : null;
}

export function nextNth(isLoading: boolean, slides: SlideModel[]) {
  if (isLoading || (!isLoading && !slides)) return;

  const sortedSlidesNth = slides
    .map((slide: SlideModel) => slide.nth)
    .sort((a: number, b: number) => a - b);

  const length =
    sortedSlidesNth[sortedSlidesNth.length - 1] - sortedSlidesNth[0] + 1;

  const allNth = Array.from({ length }, (_, index) => {
    return index + 1;
  });

  const missingNth =
    sortedSlidesNth.length > 0 && allNth.length > 0
      ? allNth.filter((nth) => !sortedSlidesNth.includes(nth))
      : [];

  const nextNth =
    missingNth.length > 0 ? missingNth[0] : allNth[allNth.length - 1] + 1;

  return nextNth;
}

export function areArraysEqual(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) {
    return false; // Early exit if lengths differ
  }

  let elemntsIn = 0;
  arr1.forEach((element) => {
    elemntsIn = arr2.includes(element) ? elemntsIn + 1 : elemntsIn;
  });

  return elemntsIn === arr1.length;
}
