import HomePage from "@/components/pages/HomePage";
import Navbar from "@/components/layout/navbar";
import NavbarPopup from "@/components/layout/navbarPopup";
import Footer from "@/components/layout/footer";
import { PopupProvider } from "@/context/navbarPopupContext";

export default function Home() {
  return (
    <>
      <PopupProvider>
        <NavbarPopup />
        <Navbar />
        <HomePage />
        <Footer />
      </PopupProvider>
    </>
  );
}
