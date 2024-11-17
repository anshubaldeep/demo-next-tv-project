import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import Head from "next/head";
import Image from "next/image";
import { w500BasePath } from "./helper";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhM2MzYWMwYmQwODZlMzQxY2YyNDRhOWZjMTI2NzQ5ZiIsIm5iZiI6MTczMTg2Nzc1My40MDEyMTksInN1YiI6IjYwOTQxNTZhNTI4YjJlMDA1ODQ5Y2IzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xNEAFPBpV5tATTtNKwWTYbETjg7Pd_rrim_XYMS4fYw",
  },
};

// export async function getServerSideProps() {
//   const res = await fetch(
//     "https://api.themoviedb.org/3/discover/movie",
//     options
//   );
//   const repo = await res.json();
//   // Pass data to the page via props
//   return { props: { repo } };
// }

export async function getServerSideProps() {
  // Use await directly on the fetch calls
  const upcomingMovies = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming`,
    options
  ).then((res) => res.json());

  const popularMovies = await fetch(
    `https://api.themoviedb.org/3/movie/popular`,
    options
  ).then((res) => res.json());

  const topRatedTV = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated`,
    options
  ).then((res) => res.json());

  const nowPlayingMovies = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing`,
    options
  ).then((res) => res.json());

  // Return all data as an object to use in your component
  return {
    props: {
      res: [
        { res: upcomingMovies.results, name: "Upcoming" },
        { res: popularMovies.results, name: "Popular" },
        { res: topRatedTV.results, name: "Top Rated" },
        { res: nowPlayingMovies.results, name: "Now Playing" },
      ],
    },
  };
}

export default function Home(props) {
  const { res } = props;
  console.log(res);
  return (
    <div className="w-full">
      {res.map((val) => {
        console.log(val)
        return (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full mt-10"
        >
          <h1 className="text-white text-xl">{val.name}</h1>
          <CarouselContent className="gap-5">
            {val.res &&
              val.res.map((genre) => (
                
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center w-80 h-80 relative p-0">
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
              ))}
          </CarouselContent>
        </Carousel>
      )})}
    </div>
  );
}
