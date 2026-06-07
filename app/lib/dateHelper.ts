export default function getTodayDate(): string {
  const dateTimeToday = new Date().toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [month, day, year] = dateTimeToday.split("/");
  return `${month}/${day}/${year}`;
}

