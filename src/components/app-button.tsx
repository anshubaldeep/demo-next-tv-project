import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { cn } from "@/lib/utils";

const AppButton = ({
  title,
  onClick,
  focusedStyle,
  focusSelfOnLoad = false,
  className,
  focusOptions = {},
  ...props
}) => {
  const { ref, focused, focusSelf } = useFocusable({
    focusKey: `Button-${title}`,
    onEnterPress: onClick,
    ...focusOptions,
  });
  useEffect(() => {
    if (focusSelfOnLoad) {
      setTimeout(()=> {
        focusSelf();
      }, 100)
    }
  }, [focusSelf, focusSelfOnLoad]);
  return (
    <Button ref={ref} className={cn(className, focused && focusedStyle)} {...props}>
      {title}
    </Button>
  );
};

export default AppButton;
