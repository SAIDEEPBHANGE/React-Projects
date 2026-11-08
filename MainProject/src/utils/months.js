const names = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export function currentMonthKey(date = new Date()) {
  return `${date.getMonth()} - ${date.getFullYear()}`;
}

export function financialMonths(date = new Date()) {
  const start = date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1;
  return Array.from({ length: 12 }, (_, index) => {
    const month = (index + 3) % 12;
    const year = index < 9 ? start : start + 1;
    return { value: `${month} - ${year}`, label: `${names[month]} - ${year}` };
  });
}

export function todayString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
