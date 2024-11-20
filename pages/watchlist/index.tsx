import React from "react";
import { options } from "@/helper";
import AppGrid from "@/components/app-grid";

export const getServerSideProps = async () => {
  const watchlist = await fetch(
    "https://api.themoviedb.org/3/account/10474269/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc",
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return {
    props: {
      res: watchlist,
    },
  };
};

const Watchlist = ({ res }) => {
  const { results } = res;

  return (
    <AppGrid
      movies={{
        res: results,
        name: "Watchlist",
      }}
      trayIndex={0}
      //focusOnload={true}
    />
  );
};

export default Watchlist;
