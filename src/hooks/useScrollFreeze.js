import { useLayoutEffect } from "react";

export function useScrollFreeze() {
  useLayoutEffect(() => {
    //   set value to hidden if component has mounted
    const original = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // return value to visible if component is unmounted
    return () => {
      document.body.style.overflow = original;
    };
  }, []);
}
