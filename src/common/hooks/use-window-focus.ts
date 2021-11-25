import { useEffect, useState } from "react";

const useWindowFocus = () => {
  const [isWindowFocused, setIsWindowFocused] = useState(false);
  const onFocus = () => {
    setIsWindowFocused(true);
  };

  const onBlur = () => {
    setIsWindowFocused(false);
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return {
    isWindowFocused,
  };
};

export default useWindowFocus;
