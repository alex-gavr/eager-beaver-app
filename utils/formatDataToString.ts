export function formatDateToString(date: Date, durationLongerThanDay: boolean): string {
  const isoString = date.toISOString();
  if (durationLongerThanDay) {
    const formattedDate = isoString.slice(0, 10); 
    return formattedDate;
  } else {
    const formattedDate = isoString.slice(0, 16); // Extract the "yyyy-mm-ddThh:mm" part
    return formattedDate;
  }
}
