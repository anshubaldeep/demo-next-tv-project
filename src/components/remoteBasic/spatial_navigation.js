import { useEffect, useRef } from "react";

// Configuration constants and utility functions
const GlobalConfig = {
  selector: "",
  straightOnly: false,
  straightOverlapThreshold: 0.5,
  rememberSource: false,
  disabled: false,
  defaultElement: "",
  enterTo: "",
  leaveFor: null,
  restrict: "self-first",
  tabIndexIgnoreList: "a, input, select, textarea, button, iframe, [contentEditable=true]",
  navigableFilter: null,
};

const KEYMAPPING = { 37: "left", 38: "up", 39: "right", 40: "down" };
const REVERSE = { left: "right", up: "down", right: "left", down: "up" };

function useNavigation(config = {}) {
  const finalConfig = { ...GlobalConfig, ...config };
  const sectionRefs = useRef({}); // Store navigable sections and elements

  const getRect = (elem) => {
    const rect = elem.getBoundingClientRect();
    return {
      ...rect,
      center: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      },
    };
  };

  const navigate = (direction, currentElement) => {
    if (!currentElement || !direction) return null;

    const candidates = Object.values(sectionRefs.current).flat();
    const targetRect = getRect(currentElement);

    // Perform partitioning and prioritization based on direction
    const nextElement = candidates.find((candidate) => {
      const rect = getRect(candidate);
      if (direction === "left" && rect.center.x < targetRect.center.x) return true;
      if (direction === "right" && rect.center.x > targetRect.center.x) return true;
      if (direction === "up" && rect.center.y < targetRect.center.y) return true;
      if (direction === "down" && rect.center.y > targetRect.center.y) return true;
      return false;
    });

    if (nextElement) {
      nextElement.focus();
      return nextElement;
    }
    return null;
  };

  const handleKeyDown = (event) => {
    const direction = KEYMAPPING[event.keyCode];
    if (direction) {
      const currentFocusedElement = document.activeElement;
      navigate(direction, currentFocusedElement);
      event.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    registerElement: (sectionId, element) => {
      if (!sectionRefs.current[sectionId]) {
        sectionRefs.current[sectionId] = [];
      }
      sectionRefs.current[sectionId].push(element);
    },
  };
}

export default useNavigation;
