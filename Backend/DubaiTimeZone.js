//convert time to a dubai time zone
function GetDubaiDate() {
  const dubaiDate = new Date().toLocaleString("en-CA", { timeZone: "Asia/Dubai" });
  return dubaiDate.split(",")[0]; // returns YYYY-MM-DD
}

module.exports = GetDubaiDate;
