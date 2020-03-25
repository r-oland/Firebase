// Components==============
import React, { useEffect, useRef } from "react";
// =========================

export default function OutsideListener({
  children,
  modalIsOpen,
  handleChange
}) {
  function useOutsideListener(ref) {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        modalIsOpen === true
      ) {
        handleChange();
        // alert("You clicked outside of me!");
      }
    }

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }

  const wrapperRef = useRef(null);
  useOutsideListener(wrapperRef);

  return <div ref={wrapperRef}>{children}</div>;
}
