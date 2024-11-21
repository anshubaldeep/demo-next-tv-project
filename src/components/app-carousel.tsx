import React, { useCallback, useEffect } from "react";
import { Carousel, CarouselContent } from "./ui/carousel";
import AppCard from "./app-card";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

const AppCarousel = ({ val, trayIndex, focusOnload = false }) => {
  const { ref, focusKey, focusSelf } = useFocusable({
    focusKey: `Tray-${trayIndex}`,
  });
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    axis: "x",
  });
  useEffect(() => {
    if (focusOnload) {
      setTimeout(()=> {
        focusSelf();
      }, 500)
    }
  }, [focusOnload, focusSelf]);
  const handleFocus = useCallback(
    (cardIndex) => {
      if (emblaApi) {
        emblaApi.scrollTo(cardIndex, true); // Smoothly scroll to the focused card
      }
      if (ref.current) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center", // or "start" if you want it at the top
        });
      }
    },
    [emblaApi, ref]
  );
  return (
    <FocusContext.Provider value={focusKey}>
      <Carousel
        //@ts-ignore
        carouselRef={emblaRef}
        api={emblaApi}
        className={cn("w-full", trayIndex !== 0 && "mt-12")}
        id={val.name}
        ref={ref}
      >
        <h1 className="text-white text-xl">{val.name}</h1>
        <CarouselContent className="gap-5 ml-1 mt-4">
          {val.res &&
            val.res.map((genre, index) => (
              <AppCard
                genre={genre}
                trayIndex={trayIndex}
                cardIndex={index}
                onFocus={handleFocus}
                key={index}
              />
            ))}
        </CarouselContent>
      </Carousel>
    </FocusContext.Provider>
  );
};

export default AppCarousel;
