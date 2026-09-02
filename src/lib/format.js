export function formatDate(date) {
  // Bug 8: Safely parse Date object or date string into valid Date instance
  const d = date instanceof Date ? date : new Date(date);
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return String(date);
}

export function dateValue(date) {
  // Bug 8: Always return numeric milliseconds timestamp so sorting does not result in NaN
  const d = date instanceof Date ? date : new Date(date);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}
