import { useContext } from "react";
import { PopupContext } from "@/context/navbarPopupContext";

export const usePopup = () => useContext(PopupContext);