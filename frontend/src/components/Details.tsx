
// function Details() {

//   return (
//     <div className="container mt-4">
//       <div className="mb-3">
//         <label className="form-label me-2">Sort by Title:</label>
//         <select
//           className="form-select d-inline-block w-auto"
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//         >
//           <option value="asc">A-Z</option>
//           <option value="desc">Z-A</option>
//         </select>
//       </div>

//       {sortedMovies.map((m) => {
//         const genreMap: { [key: string]: string } = {
//           action: "Action",
//           adventure: "Adventure",
//           animeSeriesInternationalTvShows: "Anime Series / Intl. TV Shows",
//           britishTvShowsDocuseriesInternationalTvShows:
//             "British / Docuseries / Intl. TV",
//           children: "Children",
//           comedies: "Comedies",
//           comediesDramasInternationalMovies: "Comedies / Dramas / Intl. Movies",
//           comediesInternationalMovies: "Comedies / Intl. Movies",
//           comediesRomanticMovies: "Comedies / Romantic Movies",
//           crimeTvShowsDocuseries: "Crime TV / Docuseries",
//           documentaries: "Documentaries",
//           documentariesInternationalMovies: "Documentaries / Intl. Movies",
//           docuseries: "Docuseries",
//           dramas: "Dramas",
//           dramasInternationalMovies: "Dramas / Intl. Movies",
//           dramasRomanticMovies: "Dramas / Romantic Movies",
//           familyMovies: "Family Movies",
//           fantasy: "Fantasy",
//           horrorMovies: "Horror Movies",
//           internationalMoviesThrillers: "Intl. Movies / Thrillers",
//           internationalTvShowsRomanticTvShowsTvDramas:
//             "Intl. TV / Romantic / Dramas",
//           kidsTv: "Kids TV",
//           languageTvShows: "Language TV Shows",
//           musicals: "Musicals",
//           natureTv: "Nature TV",
//           realityTv: "Reality TV",
//           spirituality: "Spirituality",
//           tvAction: "TV Action",
//           tvComedies: "TV Comedies",
//           tvDramas: "TV Dramas",
//           talkShowsTvComedies: "Talk Shows / TV Comedies",
//           thrillers: "Thrillers",
//         };

//         const genres = Object.entries(genreMap)
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           .filter(([key]) => (m as any)[key] === 1)
//           // eslint-disable-next-line @typescript-eslint/no-unused-vars
//           .map(([_, label]) => label);

//         return (
//           <div className="card mb-3" id="movieCard" key={m.showId}>
//             <div className="card-header bg-dark text-white">
//               <h3 className="card-title">{m.title}</h3>
//             </div>
//             <div className="card-body">
//               <ul className="list-group list-group-flush">
//                 <li className="list-group-item">
//                   <strong>Director: </strong>
//                   {m.director}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Cast: </strong>
//                   {m.cast}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Country: </strong>
//                   {m.country}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Release Year: </strong>
//                   {m.releaseYear}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Rating: </strong>
//                   {m.rating}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Duration: </strong>
//                   {m.duration}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Description: </strong>
//                   {m.description}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Genres: </strong>
//                   {genres.length ? genres.join(", ") : "N/A"}
//                 </li>
//               </ul>

//               <div className="mb-3 text-center">
//                 <LazyLoadImage
//                   src={m.poster_url}
//                   alt={m.title}
//                   effect="blur" // or "opacity" or none
//                   className="img-fluid rounded"
//                   style={{ maxHeight: "400px", objectFit: "contain" }}
//                   onError={(e) => {
//                     e.currentTarget.onerror = null; // prevent looping
//                     e.currentTarget.src = "/placeholder.png";
//                   }}
//                 />
//               </div>
//               <button
//                 className="btn btn-primary mt-3"
//                 onClick={() =>
//                   navigate(`/Movie/details/${m.title}`, {
//                     state: { movie: m },
//                   })
//                 }
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         );
//       })}

//       <Pagination
//         currentPage={pageNum}
//         totalPages={totalPages}
//         pageSize={pageSize}
//         onPageChange={setPageNum}
//         onPageSizeChange={(newSize) => {
//           setPageSize(newSize);
//           setPageNum(1);
//         }}
//       />
//     </div>
//   );
// }

// export default Details;