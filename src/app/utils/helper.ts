import { UserModel, useAuth } from "../modules/auth";
import { MetaModel } from "../modules/user-management/laboratories/core/_models";

export function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

export function randomState() {
  const states = ["success", "warning", "danger"];
  return states[Math.floor(Math.random() * states.length)];
}

export const getPageNumbers = (meta: MetaModel) => {
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
  }

  return { progressPercent, progressBg };
}
