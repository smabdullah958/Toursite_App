// function getDubaiDate() {
//   const dubaiTimeString = new Date().toLocaleString("en-US", { timeZone: "Asia/Dubai" });
//   return new Date(dubaiTimeString);
// }

// export function getDubaiDateString() {
//   const dubaiDate = getDubaiDate();
//   return dubaiDate.toISOString().split("T")[0];
// }










// ✅ CORRECT WAY to get Dubai date in YYYY-MM-DD format
export function getDubaiDateString() {
  const dubaiDate = new Date().toLocaleString("en-CA", { 
    timeZone: "Asia/Dubai",
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  // en-CA locale gives YYYY-MM-DD format directly
  return dubaiDate.split(',')[0]; // Returns "2025-10-12"
}

// Alternative method (more reliable)
export function getDubaiDateStringAlt() {
  const options = {
    timeZone: "Asia/Dubai",
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  return formatter.format(new Date()); // Returns "2025-10-12"
}

// For debugging - see both dates
export function compareDates() {
  const localDate = new Date().toISOString().split('T')[0];
  const dubaiDate = getDubaiDateString();
  
  console.log('Local date:', localDate);
  console.log('Dubai date:', dubaiDate);
  
  return dubaiDate;
}