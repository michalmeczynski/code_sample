import { useCallback, useEffect } from "react";

type KeyboardPressParams = {
  Enter?: (event: KeyboardEvent) => void;
  Escape?: (event: KeyboardEvent) => void;
  Tab?: (event: KeyboardEvent) => void;
};

const useKeyboardPress = (params: KeyboardPressParams) => {
  const keyboardKeyClickHandler = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          return params.Escape ? params.Escape(event) : undefined;
        case "Enter":
          return params.Enter ? params.Enter(event) : undefined;
        case "Tab":
          return params.Tab ? params.Tab(event) : undefined;
        default:
          break;
      }
    },
    [params]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyboardKeyClickHandler, false);

    return () => {
      document.removeEventListener("keydown", keyboardKeyClickHandler, false);
    };
  }, [keyboardKeyClickHandler]);
};

export default useKeyboardPress;
