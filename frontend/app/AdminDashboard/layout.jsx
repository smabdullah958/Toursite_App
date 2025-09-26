import CheckAdminLoginChecker from "@/app/AdminDashboard/CheckAdminLoginChecker"  

export default function RootLayout({ children }) {
  return (
<div>
       <CheckAdminLoginChecker> {/*it will check weateher the user is login or not  */}
        {children}
        </CheckAdminLoginChecker>
  </div>
  );
}
