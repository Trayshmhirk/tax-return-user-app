import { useState } from "react";
import useWindowWidth from "./useWindowWidth";

export function useMobileChatToggle(initialState: boolean = false) {
   const windowWidth = useWindowWidth();
   const mobileView = windowWidth <= 768;
   const [toggleMobileChat, setToggleMobileChat] = useState(initialState);

   const handleToggleMobileChat = () => setToggleMobileChat(!toggleMobileChat);

   return {
      mobileView,
      toggleMobileChat,
      setToggleMobileChat,
      handleToggleMobileChat,
   };
}
