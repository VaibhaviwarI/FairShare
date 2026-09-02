# Bugs found

Add one section per issue. Bug 1 is filled in to show the format — fix it, then write what you changed. Copy the blank template for the rest.

Keep this file in the repo and **commit it** with your fixes.

---

## Bug 1

**How to reproduce:** Open the app. The expense list says “Newest first”. The first row is Wine (7 Mar). Board game (15 Mar) is further down.

**What is wrong:** The list is showing oldest expenses first. Newest should be at the top.

**What I changed:** => 
 // const sorted = [...expenses].sort((a, b) => dateValue(a.date) - dateValue(b.date)); (Bug line)
  const sorted = [...expenses].sort((a, b) => dateValue(b.date) - dateValue(a.date));


---

## Bug 2

**How to reproduce:**Check an expense where the payer is not included in the split (e.g., initial expense "Uber to airport" where Diya paid $60 split only between Aisha and Ben). Check the calculated balances

**What is wrong:** In `src/lib/balances.js`, if the payer is not in the split (`!(exp.paidBy in shares)`), the function penalizes the payer by subtracting `amount / n` from their balance. The payer is unfairly charged for an expense they did not share, and group net balances fail to sum to zero.

**What I changed:**In `src/lib/balances.js`, if the payer is not in the split (`!(exp.paidBy in shares)`), the function penalizes the payer by subtracting `amount / n` from their balance. The payer is unfairly charged for an expense they did not share, and group net balances fail to sum to zero.

---


## Bug 3

**How to reproduce:** Look at the "Balances" card. Aisha Khan paid $148 but consumed $268.33 (net negative balance), yet the card displays "is owed $120.33". Carlos Mendes paid more than his share (net positive), yet the card displays "owes $11.67".

**What is wrong:** In `src/components/BalancesPanel.jsx`, the conditions for `bal > 0.005` and `bal < -0.005` were inverted. A positive balance indicates credit (is owed), while a negative balance indicates debt (owes).

**What I changed:** Swapped the labels and CSS classes in `src/components/BalancesPanel.jsx` so that positive balances display "is owed" (with class `owed`) and negative balances display "owes" (with class `owe`).

---

## Bug 4

**How to reproduce:** In the "Filter" section, select any member from the "Paid by" dropdown (e.g., Aisha Khan). The list shows "No expenses match these filters." even though there are expenses paid by that member.

**What is wrong:** In `src/App.jsx`, the filter condition `e.paidBy !== paidBy` uses strict inequality between `e.paidBy` (a Number, e.g. `1`) and `paidBy` from the select input (a String, e.g. `"1"`). Because of the type mismatch, `1 !== "1"` is always true and filters out all expenses.

**What I changed:** Updated the condition in `src/App.jsx` to `Number(e.paidBy) !== Number(paidBy)` to ensure consistent numeric comparison between the selected payer ID and expense `paidBy`.


<!--  How to reproduce
Open the app.

In the Filter card, click the Paid by dropdown.

Select any person, for example "Aisha Khan" or "Carlos Mendes".

Result: The expense list immediately says:

"No expenses match these filters."

Even though Aisha paid for "Groceries" and "Museum tickets", selecting her (or anyone else) completely empties the list.
--- -->