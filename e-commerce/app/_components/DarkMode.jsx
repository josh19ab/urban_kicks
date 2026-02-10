import React, { useEffect, useState } from "react";

function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <label
      htmlFor="AcceptConditions"
      className={`relative inline-block h-6 w-10 cursor-pointer rounded-full ${
        darkMode ? "bg-quaternary" : "bg-gray-300"
      } transition [-webkit-tap-highlight-color:_transparent]`}
      onClick={toggleDarkMode}
    >
      <input
        type="checkbox"
        id="AcceptConditions"
        className="peer sr-only"
        checked={darkMode}
        onChange={toggleDarkMode}
      />

      <span
        className={`absolute inset-y-0 start-0 m-1 size-4 rounded-full ${
          darkMode ? "bg-white" : "bg-gray-500"
        } transition-all peer-checked:start-4`}
      ></span>
    </label>
  );
}

export default DarkMode;
