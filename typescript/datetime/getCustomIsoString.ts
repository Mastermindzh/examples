/**
 * Given a JS date returns a valid ISO date string with offset
 *
 * const myDate = new Date();
 * console.log(getCustomIsoString(myDate));
 * > 2021-07-07T13:35:18+02:00
 *
 */
const getCustomIsoString = (date: Date) => {
  /**
   * If the month is smaller than 10, add a 0 in front of the string
   */
  const pad = (num: number): string => {
    const norm = Math.floor(Math.abs(num));
    return (norm < 10 ? "0" : "") + norm.toString();
  };

  const timeZoneOffset = -date.getTimezoneOffset();
  const timeZoneDifference = timeZoneOffset >= 0 ? "+" : "-";

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}${timeZoneDifference}${pad(timeZoneOffset / 60)}:${pad(
    timeZoneOffset % 60
  )}`;
};
