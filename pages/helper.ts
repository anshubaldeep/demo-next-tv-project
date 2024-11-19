export const imagePathBAsic = "https://image.tmdb.org/t/p";
export const w500BasePath = imagePathBAsic + "/w500";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    'content-type': 'application/json',
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhM2MzYWMwYmQwODZlMzQxY2YyNDRhOWZjMTI2NzQ5ZiIsIm5iZiI6MTczMTg2Nzc1My40MDEyMTksInN1YiI6IjYwOTQxNTZhNTI4YjJlMDA1ODQ5Y2IzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xNEAFPBpV5tATTtNKwWTYbETjg7Pd_rrim_XYMS4fYw",
  },
};

export const getOptions = (method = "GET") => {
  const newOptions = {
    ...options,
  };
  newOptions.method = method;
  return newOptions;
};
