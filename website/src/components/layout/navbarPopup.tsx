"use client";
import { useState, useRef } from "react";
import { usePopup } from "@/hooks/usePopup";
import { HiMiniXMark, HiArrowLeft } from "react-icons/hi2";

export default function NavbarPopup() {
  const { isPopupOpen, isPopupVisible, togglePopup } = usePopup(); // Access toggle from the provider
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);
  const [isSolutionsDropdownVisible, setIsSolutionsDropdownVisible] = useState(false);

  const isSolutionsDropdownShown = useRef(false);
  const solutionsDropdownState = useRef(0);

  const handleSolutionsDropdownState = () => {
    switch (solutionsDropdownState.current) {
      case 0:
        if (isSolutionsDropdownShown.current) {
          solutionsDropdownState.current = 2;
        } else {
          solutionsDropdownState.current = 0;
        }
        break;
      case 1:
        if (isSolutionsDropdownShown.current) {
          solutionsDropdownState.current = 1;
        } else {
          solutionsDropdownState.current = 2;
        }
        break;
      case 2:
        if (isSolutionsDropdownShown.current) {
          solutionsDropdownState.current = 1;
        } else {
          solutionsDropdownState.current = 0;
        }
        break;
    }
    switch (solutionsDropdownState.current) {
      case 0:
        setIsSolutionsDropdownOpen(false);
        setIsSolutionsDropdownVisible(false);
        break;
      case 1:
        setIsSolutionsDropdownOpen(true);
        setIsSolutionsDropdownVisible(true);
        break;
      case 2:
        setIsSolutionsDropdownOpen(false);
        setIsSolutionsDropdownVisible(true);
        break;
    }
  }

  const enableSolutionsDropdown = () => {
    isSolutionsDropdownShown.current = true;
    handleSolutionsDropdownState();
    setTimeout(() => {
      handleSolutionsDropdownState();
    }, 200);
  };

  const disableSolutionsDropdown = () => {
    isSolutionsDropdownShown.current = false;
    handleSolutionsDropdownState();
    setTimeout(() => {
      handleSolutionsDropdownState();
    }, 200);
  };

  if (!isPopupVisible) {
    if (isSolutionsDropdownShown.current) {
      disableSolutionsDropdown();
    }
    return <></>;
  }

  return (
    <div className={`fixed inset-0 z-50 `}>
      <div className={`transition-all duration-500 ${isPopupOpen ? "opacity-100" : "opacity-0"}`}>
      </div>
      <nav className={`h-full bg-opacity-50 flex items-center justify-center font-[family-name:var(--font-jakarta-sans)]  transition-all ease-in-out ${isPopupOpen ? "backdrop-blur-lg bg-background/50 duration-200" : "backdrop-blur-none bg-white/0 duration-1000"}`}>
        <a
          href={"/"}
          className={`absolute top-3 left-6 w-48 transition-all duration-500 ${isPopupOpen ? "opacity-100" : "opacity-0"}`}
        >
          <img
            className="block  w-24 h-8"
            src="/assets/schols-logo.png"
            alt="trusted by"
          />
          <img
            className="hidden w-24 h-8"
            src="/assets/schols-logo-darkmode.png"
            alt="trusted by"
          />
        </a>
        <button
          className={`text-gray-500 hover:text-gray-700 absolute top-3 right-5 transition-all duration-500 ${isPopupOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => togglePopup()}
        >
          <HiMiniXMark className="w-8 h-8 text-foreground" />
        </button>

        {/* Default nav page */}
        {(!isSolutionsDropdownOpen) &&
          <div className={`absolute flex flex-col transition-all ease-in-out duration-500 ${(isPopupOpen && !(isSolutionsDropdownVisible)) ? "opacity-100 delay-[100ms] translate-x-0 blur-none" : "-translate-x-10 opacity-0 blur-md"}`}>
            {/*<NavbarPopupButton src={"/products"}>{t.navbar_products}</NavbarPopupButton>*/}
            <NavbarPopupButtonClickable onClick={() => enableSolutionsDropdown()}>Solutions</NavbarPopupButtonClickable>
            <NavbarPopupButtonHref src={"/pricing"}>Pricing</NavbarPopupButtonHref>
            <NavbarPopupButtonHref src={"/contact"}>Company</NavbarPopupButtonHref>

            <div className={`transition-all ease-in-out duration-500 mt-16 ${isPopupOpen ? "opacity-100" : "opacity-0"}`}>
            </div>
          </div>
        }

        {/* Solutions dropdown */}
        {isSolutionsDropdownVisible &&
          <div className={`absolute flex flex-col text-2xl font-medium transition-all ease-in-out duration-500 ${(isPopupOpen && isSolutionsDropdownOpen) ? "opacity-100 delay-[100ms] translate-x-0 blur-none" : "-translate-x-10 opacity-0 blur-md"}`}>
            {/*<NavbarPopupButton src={"/products"}>{t.navbar_products}</NavbarPopupButton>*/}
            <a href={"/solutions/lms"} className="flex px-4 rounded-lg items-center justify-center w-100 h-16"
            >
              E-Learning
            </a>
            <a href={"/solutions/ehs"} className="flex px-4 rounded-lg items-center justify-center w-100 h-16">
            Auditing
            </a>
            <NavbarPopupButtonClickable onClick={() => disableSolutionsDropdown()} className="mt-16 ml-[-2rem]" ><HiArrowLeft className="inline mr-2"/>Go back</NavbarPopupButtonClickable>
          </div>
        }
      </nav>
    </div>
  );
}

const navbarPopupButtonDefaultClassnames = "flex h-16 text-2xl font-medium justify-center text-center text-foreground hover:text-neutral-500";
function NavbarPopupButtonHref({ className, src, children }: { className?: string, style?: number, src: string, children: string }) {
  return <a
    className={`${navbarPopupButtonDefaultClassnames} ${className}`}
    href={src}
  >
    {children}
  </a>;
}

function NavbarPopupButtonClickable({ className, onClick, children }: { className?: string, style?: number, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void, children: React.ReactNode }) {
  return <button
    type="button"
    className={`${navbarPopupButtonDefaultClassnames} ${className}`}
    onClick={onClick}
  >
    {children}
  </button>;
}