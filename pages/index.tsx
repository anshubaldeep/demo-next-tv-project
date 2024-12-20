import AppCarousel from "@/components/app-carousel";
import { options } from "../src/helper";


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
  return (
    <div className="w-full">
      {res.map((val, index) => (
        <AppCarousel
          val={val}
          trayIndex={index}
          key={index}
          {...index === 0 && {
            focusOnload: true
          }}
        />
      ))}
    </div>
  );
}
