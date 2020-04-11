import { useEffect, useState } from "react";

export const useMediaQ = (minMax, MinMaxWidth) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (minMax === "min") {
    return width > MinMaxWidth;
  }

  return width < MinMaxWidth;
};
