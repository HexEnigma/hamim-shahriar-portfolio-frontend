const full = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });
const monthYear = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" });

export const formatDate = (v) => (v ? full.format(new Date(v)) : "");
export const formatMonthYear = (v) => (v ? monthYear.format(new Date(v)) : "");
export const formatRange = (start, end, current) =>
  `${formatMonthYear(start)} – ${current || !end ? "Present" : formatMonthYear(end)}`;