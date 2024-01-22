export function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

export function randomState() {
  const states = ["success", "warning", "danger"];
  return states[Math.floor(Math.random() * states.length)];
}
