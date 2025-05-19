"use client";
import { createContext, useState, useRef, ReactNode } from "react";

// Define the context structure
interface PopupContextType {
  isPopupOpen: boolean;
  isPopupVisible: boolean;
  togglePopup: () => void;
  isLanguagePopupOpen: boolean;
  setIsLanguagePopupOpen: (isLanguagePopup: boolean) => void;
  isLanguagePopupHidden: boolean;
  setIsLanguagePopupHidden: (isLanguagePopup: boolean) => void;

}

// Create the context
export const PopupContext = createContext<PopupContextType>({
  isPopupOpen: false,
  isPopupVisible: false,
  togglePopup: () => { },
  isLanguagePopupOpen: false,
  setIsLanguagePopupOpen: () => { },
  isLanguagePopupHidden: true,
  setIsLanguagePopupHidden: () => { },
});

// Provider Component
export function PopupProvider({ children }: { children: ReactNode }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLanguagePopupOpen, setIsLanguagePopupOpen] = useState(false);
  const [isLanguagePopupHidden, setIsLanguagePopupHidden] = useState(true);

  const isPopupShown = useRef(false);
  const popupState = useRef(0);

  const handlePopupState = () => {
    switch (popupState.current) {
      case 0:
        if (isPopupShown.current) {
          popupState.current = 2;
        } else {
          popupState.current = 0;
        }
        break;
      case 1:
        if (isPopupShown.current) {
          popupState.current = 1;
        } else {
          popupState.current = 2;
        }
        break;
      case 2:
        if (isPopupShown.current) {
          popupState.current = 1;
        } else {
          popupState.current = 0;
        }
        break;
    }
    switch (popupState.current) {
      case 0:
        setIsPopupOpen(false);
        setIsPopupVisible(false);
        break;
      case 1:
        setIsPopupOpen(true);
        setIsPopupVisible(true);
        break;
      case 2:
        setIsPopupOpen(false);
        setIsPopupVisible(true);
        break;
    }
  }

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
    if (!isPopupShown.current) {
      isPopupShown.current = true;
      handlePopupState();
      setTimeout(() => {
        handlePopupState();
      }, 10);
    } else {
      isPopupShown.current = false;
      handlePopupState();
      setTimeout(() => {
        handlePopupState();
      }, 1000); // longer popup close time
    }
  };

  return (
    <PopupContext.Provider value={{ isPopupOpen, isPopupVisible, togglePopup, isLanguagePopupOpen, setIsLanguagePopupOpen, isLanguagePopupHidden, setIsLanguagePopupHidden }}>
      {children}
    </PopupContext.Provider>
  );
}