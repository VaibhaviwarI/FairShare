export function formatMoney(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "$0.00";
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}

export function splitEqual(amount, ids) {
  const n = ids.length || 1;
  const totalCents = Math.round(Number(amount) * 100);
  const baseCents = Math.floor(totalCents / n);
  let remainder = totalCents % n;

  // Bug 7:
  // Distribute remainder cents across members so the sum of shares strictly equals the bill amount.
  // Previously (amount / n).toFixed(2) caused money to be lost (e.g. $100 / 3 = $99.99) or invented.
  const shares = {};
  for (const id of ids) {
    const shareCents = baseCents + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder -= 1;
    shares[id] = Number((shareCents / 100).toFixed(2));
  }
  return shares;
}

export function percentsSumTo100(percents) {
  const values = Object.values(percents).map(Number);
  const sum = values.reduce((a, b) => a + b, 0);
  return Math.abs(sum - 100) < 0.01;
}

export function splitByPercent(amount, percents) {
  const shares = {};
  const entries = Object.entries(percents);
  const totalCents = Math.round(Number(amount) * 100);
  let allocatedCents = 0;

  // Bug 7:
  // In percent splits, allocate the remaining cents to the last member
  // so the shares always strictly sum to the total expense amount.
  entries.forEach(([id, pct], index) => {
    if (index === entries.length - 1) {
      shares[id] = Number(((totalCents - allocatedCents) / 100).toFixed(2));
    } else {
      const shareCents = Math.round((totalCents * Number(pct)) / 100);
      allocatedCents += shareCents;
      shares[id] = Number((shareCents / 100).toFixed(2));
    }
  });

  return shares;
}

export function sharesForExpense(expense) {
  if (expense.splitType === "percent" && expense.percents) {
    return splitByPercent(expense.amount, expense.percents);
  }
  return splitEqual(expense.amount, expense.splitWith);
}
