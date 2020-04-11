import { useEffect } from "react";

export const useLog = (value) => {
  useEffect(() => {
    console.log(value);
  }, [value]);
};
