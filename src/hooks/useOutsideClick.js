import { useEffect } from "react";

const useOutsideClick = (ref, cb) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        if (cb !== undefined) cb();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, cb]);
};

export default useOutsideClick;
