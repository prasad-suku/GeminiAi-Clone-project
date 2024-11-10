import React, { useEffect, useState } from "react";

const useDarkwhitetheme = (key, defaultcolor) => {
  const [color, setcolor] = useState(localStorage.getItem(key) || defaultcolor);
  useEffect(() => {
    localStorage.setItem(key, color);
  }, [key, color]);

  return { color, setcolor };
};

export default useDarkwhitetheme;
