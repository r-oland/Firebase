import { useMemo, useState } from "react";

export function useHover() {
  const [hover, setHover] = useState(false);

  const watch = useMemo(() => {
    return {
      onMouseEnter: () => {
        setHover(true);
      },
      onMouseLeave: () => {
        setHover(false);
      },
    };
  }, []);

  return [hover, watch];
}
