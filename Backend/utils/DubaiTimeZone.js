// DubaiTimeZone.js
function GetDubaiDate() {
  const dubaiDate = new Date().toLocaleString("en-CA", {
    timeZone: "Asia/Dubai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return dubaiDate; // ✅ Always 'YYYY-MM-DD'
}

module.exports = GetDubaiDate;
