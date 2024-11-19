import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { w500BasePath } from "../../pages/helper";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

const AppCard = ({ genre, trayIndex, cardIndex, onFocus }) => {
  const { push } = useRouter();
  const onCardPress = () => {
    push('/programInfo/' + genre.id)
  };
  const { ref, focused, focusKey } = useFocusable({
    focusKey: `Card-${trayIndex}-${cardIndex}`,
    onFocus: () => onFocus(cardIndex),
    onEnterPress: onCardPress,
  });

  return (
    <Card
      key={genre.id}
      className={cn(
        "rounded-xl w-80 h-80",
        focused ? "border-4 border-yellow-200" : "border-none"
      )}
      ref={ref}
    >
      <CardContent className="flex aspect-square items-center w-full h-full justify-center relative p-0">
        <Image
          src={w500BasePath + genre.poster_path}
          width={500}
          height={500}
          className="object-cover w-full h-full brightness-50 rounded-xl"
        />
        <span className="text-3xl font-semibold text-white truncate absolute bottom-50 left-0 right-0 text-center">
          {genre.original_title}
        </span>
      </CardContent>
    </Card>
  );
};

export default AppCard;
