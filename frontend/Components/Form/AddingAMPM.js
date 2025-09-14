//this is used to add a AM and PM in a post, update destination and also fora  packages 
const to12Hour = (time) => {
  if (!time) return "";
  let [hours, minutes] = time.split(":").map(Number);
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 → 12
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};
export default to12Hour