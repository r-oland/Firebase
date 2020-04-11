import { useState } from "react";

export function useToggle(initial) {
  const [isToggled, setIsToggled] = useState(initial);
  const toggle = () => setIsToggled((prevState) => !prevState);

  return [isToggled, setIsToggled, toggle];
}
