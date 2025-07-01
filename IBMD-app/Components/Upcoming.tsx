// useEffect(() => {
//     fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", {
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGJlZjk2MGM0ZmZhNDU4MTI0N2JiMzM5OGY1NGM1ZSIsIm5iZiI6MTc1MTM1OTQxNy44ODMwMDAxLCJzdWIiOiI2ODYzOWZiOWQ2ZTg3MGNkM2RjY2Q5NzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jPbmLAK5whMqCoLU9kf2w4VUnGJEs6i8hVmHncGf2rc",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.results) {
//           setMovies(data.results);
//           setLoading(false);
//         } else {
//           console.log("data not found");
//         }
//       })
//       .catch((e) => {
//         console.error(e);
//         setLoading(false);
//       });
//   }, []);