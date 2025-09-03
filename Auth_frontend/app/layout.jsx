
export const metadata = {
  title: "Tourist App",
  description: "created with the help of a next js",
};
import StoreProvider from "@/app/StoreProvider";
import "./globals.css"
import CheckLoginProvider from "@/Components/CheckLoginProvider";
import NavbarWrapper from "@/Components/NavbarWrapper";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <StoreProvider>
       <CheckLoginProvider/> {/*it will check weateher the user is login or not  */}
       <NavbarWrapper/> {/*inside this the header and MobileHeader is present */}
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
