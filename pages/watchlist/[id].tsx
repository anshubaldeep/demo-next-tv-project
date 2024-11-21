import { useRouter } from "next/router";
import React, { useState } from "react";
import { getOptions, options } from "../../src/helper";
import AppButton from "@/components/app-button";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import Image from "next/image";

export async function getServerSideProps(context) {
  // Use await directly on the fetch calls
  const movieDetails = await fetch(
    `https://api.themoviedb.org/3/movie/${context.params.id}?language=en-US`,
    options
  ).then((res) => res.json());

  // Return all data as an object to use in your component
  return {
    props: {
      movieDetails,
    },
  };
}

const ProgramInfo = ({ movieDetails }) => {
  const { query, push } = useRouter();

  const {
    title,
    poster_path,
    overview,
    release_date,
    vote_average,
    genres,
    runtime,
    production_companies,
  } = movieDetails;
  const { ref, focusKey } = useFocusable();
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-screen bg-gray-900 text-white" ref={ref}>
      <div className="flex">
        <div className="w-1/2 pb-20">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
            className="w-full h-[86%] py-10 pl-10 object-cover"
            width={1200}
            height={1000}
          />
        </div>
        <div className="w-1/2 p-8">
          <h1 className="text-4xl font-bold my-4">{title}</h1>
          <p className="text-lg mb-6">{overview}</p>

          <div className="flex flex-col md:flex-row mb-6">
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0 md:mr-8">
              <p className="text-gray-400 mr-2">Release Date:</p>
              <p>{release_date}</p>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-4 mr-10 md:mb-0">
              <p className="text-gray-400 mr-2">Rating:</p>
              <p>{vote_average}</p>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
              <p className="text-gray-400 mr-2">Runtime:</p>
              <p>{runtime} minutes</p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold mb-2">Genres:</h2>
            {genres.map((genre) => genre.name).join(", ")}
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold mb-2">Production Companies:</h2>
            {production_companies.map((genre) => genre.name).join(", ")}
          </div>
          <FocusContext.Provider value={focusKey}>
            <AppButton
              title={loading ? "Loading" : "Remove from Watchlist"}
              onClick={async () => {
                setLoading(true);
                await fetch(
                  `https://api.themoviedb.org/3/account/10474269/watchlist`,
                  {
                    ...getOptions("POST"),
                    body: JSON.stringify({
                      media_type: "movie",
                      media_id: Number(query.id),
                      watchlist: false,
                    }),
                  }
                )
                  .then((res) => res.json())
                  .catch((err) => console.error(err));
                setLoading(false);
              }}
              focusedStyle="bg-yellow-500 text-black border-black"
              className="mt-10 border-white border-2"
              focusSelfOnLoad={true}
            />
            <AppButton
              title="Play"
              onClick={() => push('/player')}
              focusedStyle="bg-yellow-500 text-black border-black"
              className="mt-10 border-white border- ml-10"
              focusSelfOnLoad={true}
            />
          </FocusContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default ProgramInfo;
