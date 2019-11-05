export const getStringFromDate = dateString => {
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
  const date = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
  const hours = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
  const minutes = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
  return `${date}.${month}.${year} ${hours}:${minutes}`;
};
