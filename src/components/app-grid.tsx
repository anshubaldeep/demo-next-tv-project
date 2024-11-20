import { useEffect } from "react";
import AppCard from "./app-card";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

export default function AppGrid({ movies, trayIndex }) {
  const { focusSelf, focusKey, ref } = useFocusable();
  useEffect(() => {
    setTimeout(() => {
      focusSelf();
    }, 100);
  }, [focusSelf]);
  const handleFocus = (index,ref) => {
    console.log(ref.current)
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center", // or "start" if you want it at the top
      });
    }
  };
  return (
    <FocusContext.Provider value={focusKey}>
      <div className="container mx-auto px-4 py-8" ref={ref}>
        <h1 className="text-white text-xl mb-10">{movies.name}</h1>
        <div className="grid grid-cols-4 gap-4 gap-y-12">
          {movies.res.map((genre, index) => (
            <AppCard
              genre={genre}
              trayIndex={trayIndex}
              cardIndex={index}
              onFocus={handleFocus}
              key={index}
            />
          ))}
        </div>
      </div>
    </FocusContext.Provider>
  );
}
