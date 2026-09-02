import { formatMoney } from "../lib/money.js";

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function BalancesPanel({ members, balances }) {
  return (
    <section className="card">
      <h2>Balances</h2>
      {members.map((m) => {
        const bal = Number(balances[m.id] || 0);
        let label = "settled up";
        let cls = "settled";
                // Bug 3:
        // A positive balance (bal > 0) means the person paid more than their share and is in credit (they are owed money).
        // A negative balance (bal < 0) means they consumed more than they paid into the group (they owe money).
        // The original conditions had "owes" and "is owed" inverted.
        // if (bal > 0.005) {
        //   label = `owes ${formatMoney(bal)}`;
        //   cls = "owe";
        // } else if (bal < -0.005) {
        //   label = `is owed ${formatMoney(-bal)}`;
        //   cls = "owed";
        // }
        if (bal > 0.005) {
          label = `is owed ${formatMoney(bal)}`;
          cls = "owed";
        } else if (bal < -0.005) {
          label = `owes ${formatMoney(-bal)}`;
          cls = "owe";
        }
        
        return (
          <div className="balance-row" key={m.id}>
            <div className="who">
              <span className="avatar" style={{ background: m.color }}>
                {initials(m.name)}
              </span>
              {m.name}
            </div>
            <div className={cls}>{label}</div>
          </div>
        );
      })}
    </section>
  );
}
