using System;
using System.Linq.Expressions;
using Intex.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Intex.API.Models;
using System.Security.Claims;


namespace Intex.API.Controllers
{

    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class MovieController : ControllerBase
    {
        private MovieDbContext _movieContext;

        public MovieController(MovieDbContext temp)
        {
            _movieContext = temp;
        }


        // The route for fetching movies with optional search and genre filtering
        [HttpGet("allmovies")]
        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? movieTypes = null, [FromQuery] string? searchTerm = null)
        {
            string? favMovies = Request.Cookies["FavMovies"];
            Console.WriteLine("----COOKIE----\n" + favMovies);
            HttpContext.Response.Cookies.Append("FavMovies", searchTerm ?? "", new CookieOptions()
            {
                HttpOnly = true,
                //Secure = true,
                //SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.Now.AddMinutes(1),
            });

            var query = _movieContext.Movies.AsQueryable();

            // Apply search term filtering
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(m => m.Title.Contains(searchTerm));
            }

            // Apply genre filtering using manual genre mapping
            if (movieTypes != null && movieTypes.Any())
            {
                // Combine OR conditions dynamically for any genre that has value == 1
                var parameter = Expression.Parameter(typeof(MoviesTitle), "m");
                Expression? combinedExpression = null;

                // Manual genre mapping to columns
                var genreColumnMappings = new Dictionary<string, string>
        {
            { "Anime Series International TV Shows", "AnimeSeriesInternationalTvShows" },
            { "British TV Shows Docuseries International TV Shows", "BritishTvShowsDocuseriesInternationalTvShows" },
            { "Children", "Children" },
            { "Comedies", "Comedies" },
            { "Comedies Dramas International Movies", "ComediesDramasInternationalMovies" },
            { "Comedies International Movies", "ComediesInternationalMovies" },
            { "Comedies Romantic Movies", "ComediesRomanticMovies" },
            { "Crime TV Shows Docuseries", "CrimeTvShowsDocuseries" },
            { "Documentaries", "Documentaries" },
            { "Documentaries International Movies", "DocumentariesInternationalMovies" },
            { "Docuseries", "Docuseries" },
            { "Dramas", "Dramas" },
            { "Dramas International Movies", "DramasInternationalMovies" },
            { "Dramas Romantic Movies", "DramasRomanticMovies" },
            { "Family Movies", "FamilyMovies" },
            { "Fantasy", "Fantasy" },
            { "Horror Movies", "HorrorMovies" },
            { "International Movies Thrillers", "InternationalMoviesThrillers" },
            { "International TV Shows Romantic TV Shows TV Dramas", "InternationalTvShowsRomanticTvShowsTvDramas" },
            { "Kids TV", "KidsTv" },
            { "Language TV Shows", "LanguageTvShows" },
            { "Musicals", "Musicals" },
            { "Nature TV", "NatureTv" },
            { "Reality TV", "RealityTv" },
            { "Spirituality", "Spirituality" },
            { "TV Action", "TvAction" },
            { "TV Comedies", "TvComedies" },
            { "TV Dramas", "TvDramas" },
            { "Talk Shows TV Comedies", "TalkShowsTvComedies" },
            { "Thrillers", "Thrillers" }
        };

                // Apply filtering for each genre that has been selected
                foreach (var genre in movieTypes)
                {
                    if (genreColumnMappings.ContainsKey(genre))
                    {
                        var columnName = genreColumnMappings[genre];
                        var property = typeof(MoviesTitle).GetProperty(columnName);
                        if (property != null && property.PropertyType == typeof(int?))
                        {
                            var propertyAccess = Expression.Property(parameter, property);
                            var genreValue = Expression.Constant(1, typeof(int?));
                            var equality = Expression.Equal(propertyAccess, genreValue);

                            combinedExpression = combinedExpression == null
                                ? equality
                                : Expression.OrElse(combinedExpression, equality);
                        }
                    }
                }

                if (combinedExpression != null)
                {
                    var lambda = Expression.Lambda<Func<MoviesTitle, bool>>(combinedExpression, parameter);
                    query = query.Where(lambda);
                }
            }

            // Get the total number of movies after applying filters
            var totalNumMovies = query.Count();

            // Get the paginated list of movies
            var list = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // Return the response with the movies and the total number of movies
            var newObject = new
            {
                Movies = list,
                TotalNumMovies = totalNumMovies
            };

            return Ok(newObject);
        }

        // The route to get a list of available movie types (genres)
        [HttpGet("getmovietypes")]
        public IActionResult GetMovieTypes()
        {
            // Manual genre column mappings to return
            var genreColumnMappings = new Dictionary<string, string>
    {
        { "Anime Series International TV Shows", "AnimeSeriesInternationalTvShows" },
        { "British TV Shows Docuseries International TV Shows", "BritishTvShowsDocuseriesInternationalTvShows" },
        { "Children", "Children" },
        { "Comedies", "Comedies" },
        { "Comedies Dramas International Movies", "ComediesDramasInternationalMovies" },
        { "Comedies International Movies", "ComediesInternationalMovies" },
        { "Comedies Romantic Movies", "ComediesRomanticMovies" },
        { "Crime TV Shows Docuseries", "CrimeTvShowsDocuseries" },
        { "Documentaries", "Documentaries" },
        { "Documentaries International Movies", "DocumentariesInternationalMovies" },
        { "Docuseries", "Docuseries" },
        { "Dramas", "Dramas" },
        { "Dramas International Movies", "DramasInternationalMovies" },
        { "Dramas Romantic Movies", "DramasRomanticMovies" },
        { "Family Movies", "FamilyMovies" },
        { "Fantasy", "Fantasy" },
        { "Horror Movies", "HorrorMovies" },
        { "International Movies Thrillers", "InternationalMoviesThrillers" },
        { "International TV Shows Romantic TV Shows TV Dramas", "InternationalTvShowsRomanticTvShowsTvDramas" },
        { "Kids TV", "KidsTv" },
        { "Language TV Shows", "LanguageTvShows" },
        { "Musicals", "Musicals" },
        { "Nature TV", "NatureTv" },
        { "Reality TV", "RealityTv" },
        { "Spirituality", "Spirituality" },
        { "TV Action", "TvAction" },
        { "TV Comedies", "TvComedies" },
        { "TV Dramas", "TvDramas" },
        { "Talk Shows TV Comedies", "TalkShowsTvComedies" },
        { "Thrillers", "Thrillers" }
    };

            // Return the genre names as the list
            return Ok(genreColumnMappings.Keys.ToList());
        }



        [HttpPost("addmovie")]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            // Safely get max numeric ID from existing show_id values
            var allIds = _movieContext.Movies
                .Where(m => m.ShowId.StartsWith("s"))
                .Select(m => m.ShowId)
                .ToList();
            var maxId = allIds
                .Select(id => int.TryParse(id.Substring(1), out var num) ? num : 0)
                .DefaultIfEmpty(0)
                .Max();
            // Generate new show_id
            var newId = $"s{maxId + 1}";
            newMovie.ShowId = newId;
            // Save to DB
            _movieContext.Movies.Add(newMovie);
            _movieContext.SaveChanges();
            return Ok(newMovie);
        }



        [HttpPut("updatemovie/{showId}")]
        public IActionResult UpdateMovie(string showId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _movieContext.Movies.Find(showId);

            if (existingMovie == null)
            {
                return NotFound($"Project with ID {showId} not found.");
            }

            // Update the book fields
            existingMovie.Title = updatedMovie.Title;
            existingMovie.Director = updatedMovie.Director;
            existingMovie.Type = updatedMovie.Type;
            existingMovie.Cast = updatedMovie.Cast;
            existingMovie.Country = updatedMovie.Country;
            existingMovie.ReleaseYear = updatedMovie.ReleaseYear;
            existingMovie.Rating = updatedMovie.Rating;
            existingMovie.Duration = updatedMovie.Duration;
            existingMovie.Description = updatedMovie.Description;
            existingMovie.poster_url = updatedMovie.poster_url;

            existingMovie.Action = updatedMovie.Action;
            existingMovie.Adventure = updatedMovie.Adventure;
            existingMovie.AnimeSeriesInternationalTvShows = updatedMovie.AnimeSeriesInternationalTvShows;
            existingMovie.BritishTvShowsDocuseriesInternationalTvShows = updatedMovie.BritishTvShowsDocuseriesInternationalTvShows;
            existingMovie.Children = updatedMovie.Children;
            existingMovie.Comedies = updatedMovie.Comedies;
            existingMovie.ComediesDramasInternationalMovies = updatedMovie.ComediesDramasInternationalMovies;
            existingMovie.ComediesInternationalMovies = updatedMovie.ComediesInternationalMovies;
            existingMovie.ComediesRomanticMovies = updatedMovie.ComediesRomanticMovies;
            existingMovie.CrimeTvShowsDocuseries = updatedMovie.CrimeTvShowsDocuseries;
            existingMovie.Documentaries = updatedMovie.Documentaries;
            existingMovie.DocumentariesInternationalMovies = updatedMovie.DocumentariesInternationalMovies;
            existingMovie.Docuseries = updatedMovie.Docuseries;
            existingMovie.Dramas = updatedMovie.Dramas;
            existingMovie.DramasInternationalMovies = updatedMovie.DramasInternationalMovies;
            existingMovie.DramasRomanticMovies = updatedMovie.DramasRomanticMovies;
            existingMovie.FamilyMovies = updatedMovie.FamilyMovies;
            existingMovie.Fantasy = updatedMovie.Fantasy;
            existingMovie.HorrorMovies = updatedMovie.HorrorMovies;
            existingMovie.InternationalMoviesThrillers = updatedMovie.InternationalMoviesThrillers;
            existingMovie.InternationalTvShowsRomanticTvShowsTvDramas = updatedMovie.InternationalTvShowsRomanticTvShowsTvDramas;
            existingMovie.KidsTv = updatedMovie.KidsTv;
            existingMovie.LanguageTvShows = updatedMovie.LanguageTvShows;
            existingMovie.Musicals = updatedMovie.Musicals;
            existingMovie.NatureTv = updatedMovie.NatureTv;
            existingMovie.RealityTv = updatedMovie.RealityTv;
            existingMovie.Spirituality = updatedMovie.Spirituality;
            existingMovie.TvAction = updatedMovie.TvAction;
            existingMovie.TvComedies = updatedMovie.TvComedies;
            existingMovie.TvDramas = updatedMovie.TvDramas;
            existingMovie.TalkShowsTvComedies = updatedMovie.TalkShowsTvComedies;
            existingMovie.Thrillers = updatedMovie.Thrillers;



            // Save the changes to the database
            _movieContext.SaveChanges();

            // Return a success response
            return Ok(existingMovie);
        }


        [HttpDelete("deletemovie/{showId}")]
        public IActionResult DeleteBook(string showId)
        {
            var movie = _movieContext.Movies.Find(showId);

            if (movie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }
            _movieContext.Movies.Remove(movie);
            _movieContext.SaveChanges();

            return NoContent();
        }

        [HttpGet("collabrecommendations")]
        public IActionResult GetCollabRecommended(string title)
        {
            // Search for content recommendations where 'If you liked' matches the provided title
            var recommendation = _movieContext.Collaboratives
                .AsEnumerable()
                .FirstOrDefault(x => x.IfYouLiked.Equals(title, StringComparison.OrdinalIgnoreCase));

            var movie = _movieContext.Movies
                .FirstOrDefault(m => m.Title.ToLower() == title.ToLower()); // Use ToLower for case-insensitive comparison

            var moviePoster = movie?.poster_url; // Get the poster_url of the movie

            // If no match is found, return a NotFound response
            if (recommendation == null)
            {
                return NotFound(new { message = $"No recommendations found for '{title}'" });
            }

            // Prepare the list of recommended movies
            var recommendedMovies = new List<object>();

            foreach (var recommendedTitle in new string[]
            {
        recommendation.Collaborative1,
        recommendation.Collaborative2,
        recommendation.Collaborative3,
        recommendation.Collaborative4,
        recommendation.Collaborative5
            })
            {
                if (!string.IsNullOrWhiteSpace(recommendedTitle)) // Ensure that the title is not null or empty
                {
                    var recommendedMovie = _movieContext.Movies
                        .FirstOrDefault(m => m.Title.ToLower() == recommendedTitle.ToLower()); // Use ToLower for case-insensitive comparison

                    if (recommendedMovie != null) // Check if the recommended movie is found
                    {
                        recommendedMovies.Add(new
                        {
                            Title = recommendedMovie.Title,
                            PosterUrl = recommendedMovie.poster_url ?? "/placeholder.png" // Provide a fallback if poster URL is missing
                        });
                    }
                }
            }

            // If no recommendations found, return a NotFound response
            if (recommendedMovies.Count == 0)
            {
                return NotFound(new { message = "No collaborative recommendations found" });
            }

            // Construct the response object with the content recommendations and the associated posters
            var collabRecommend = new
            {
                IfYouLiked = recommendation.IfYouLiked,
                Recommendations = recommendedMovies
            };

            return Ok(collabRecommend);
        }


        [HttpGet("contentrecommendations")]
        public IActionResult GetContentRecommended(string title)
        {
            // Search for content recommendations where 'If you liked' matches the provided title
            var recommendation = _movieContext.Contents
                .AsEnumerable()
                .FirstOrDefault(x => x.IfYouLiked.Equals(title, StringComparison.OrdinalIgnoreCase));

            // Search for the movie to get its poster_url using ToLower for case-insensitive comparison
            var movie = _movieContext.Movies
                .FirstOrDefault(m => m.Title.ToLower() == title.ToLower()); // Use ToLower for case-insensitive comparison

            var moviePoster = movie?.poster_url; // Get the poster_url of the movie

            // If no match is found for the content recommendations, return a NotFound response
            if (recommendation == null)
            {
                return NotFound(new { message = $"No recommendations found for '{title}'" });
            }

            // Fetch the posters for each recommended movie
            var recommendedPosters = new List<string>();
            foreach (var recommendedTitle in new string[]
            {
        recommendation.Recommendation1,
        recommendation.Recommendation2,
        recommendation.Recommendation3,
        recommendation.Recommendation4,
        recommendation.Recommendation5
            })
            {
                var recommendedMovie = _movieContext.Movies
                    .FirstOrDefault(m => m.Title.ToLower() == recommendedTitle.ToLower()); // Use ToLower for case-insensitive comparison

                // If movie is found, get the poster URL; otherwise, use a placeholder
                recommendedPosters.Add(recommendedMovie?.poster_url ?? "/placeholder.png");
            }

            // Construct the response object with the content recommendations and the associated posters
            var contentRecommend = new
            {
                IfYouLiked = recommendation.IfYouLiked,
                Recommendations = new[]
                {
            new { Title = recommendation.Recommendation1, PosterUrl = recommendedPosters[0] },
            new { Title = recommendation.Recommendation2, PosterUrl = recommendedPosters[1] },
            new { Title = recommendation.Recommendation3, PosterUrl = recommendedPosters[2] },
            new { Title = recommendation.Recommendation4, PosterUrl = recommendedPosters[3] },
            new { Title = recommendation.Recommendation5, PosterUrl = recommendedPosters[4] }
        }
            };

            return Ok(contentRecommend);
        }


        [HttpGet("getdetails/{title}")]
        public IActionResult GetMovieDetails(string title)
        {
            // Search for the movie by title in the Movies table with case-insensitive comparison using LOWER
            var movie = _movieContext.Movies
                .FirstOrDefault(m => m.Title.ToLower() == title.ToLower());

            // If no movie is found, return a 404 Not Found response
            if (movie == null)
            {
                return NotFound(new { message = $"Movie with title '{title}' not found" });
            }

            // If the movie is found, return the movie details as JSON
            Response.ContentType = "application/json";
            return Ok(movie);
        }

        [HttpGet("genre")]
        public IActionResult GetByGenre(string genre, int count = 5)
        {
            var prop = typeof(MoviesTitle).GetProperty(genre);
            if (prop == null || prop.PropertyType != typeof(int?))
            {
                return BadRequest("Invalid genre property.");
            }

            // Evaluate the value of the property before the query
            var propertyValue = 1; // You can dynamically set this based on your genre logic

            // Use the evaluated property value in the LINQ query
            var query = _movieContext.Movies
                .Where(m => EF.Property<int?>(m, genre) == propertyValue)
                .Where(m => m.poster_url != null)
                .Take(count)
                .Select(m => new
                {
                    Title = m.Title,
                    PosterUrl = m.poster_url
                })
                .ToList();

            return Ok(query);
        }

        [HttpGet("recommended-titles")]
        public async Task<IActionResult> GetRecommendedTitles()
        {
            // Get the logged-in user's email (this might come from session, cookie, or headers)
            var email = User.FindFirstValue(ClaimTypes.Email);

            // Step 1: Validate the user and get the user_id from the SQLite auth database
            var user = await _movieContext.MoviesUsers
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return NotFound("User not found.");

            var userId = user.UserId;

            // Step 2: Find all show_ids where rating > 3 for this user in the Movies database
            var showIds = await _movieContext.MoviesRatings
                .Where(r => r.UserId == userId && r.Rating > 3)
                .Select(r => r.ShowId)
                .Distinct()
                .ToListAsync();

            if (!showIds.Any())
                return NotFound("No highly-rated movies found for this user.");

            // Step 3: Retrieve movie details from the movies_title table based on show_ids
            var movieTitles = _movieContext.Movies
                .Where(t => showIds.Contains(t.ShowId));

            // Step 4: Return the movie titles as a response
            Response.ContentType = "application/json";
            return Ok(movieTitles);
        }

        [HttpPost("rate")]
        public async Task<IActionResult> RateMovie(string showId, int rating)
        {
            Console.WriteLine($"Received rating request: showId = {showId}, rating = {rating}");

            // Get the logged-in user's email (this might come from session, cookie, or headers)
            var email = User.FindFirstValue(ClaimTypes.Email);
            Console.WriteLine($"User email: {email}");

            // Step 1: Validate the user and get the user_id from the MoviesUsers table
            var user = await _movieContext.MoviesUsers
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return NotFound("User not found.");

            var userId = user.UserId; // Get user_id from MoviesUsers table
            Console.WriteLine($"Found user: {userId}");

            // Step 2: Check if the user has already rated this movie
            var existingRating = await _movieContext.MoviesRatings
                .FirstOrDefaultAsync(r => r.UserId == userId && r.ShowId == showId);

            if (existingRating != null)
            {
                // Update the existing rating
                existingRating.Rating = rating;
                _movieContext.MoviesRatings.Update(existingRating);
            }
            else
            {
                // Add a new rating entry
                var newRating = new MoviesRating
                {
                    UserId = userId,
                    ShowId = showId,
                    Rating = rating,
                };
                await _movieContext.MoviesRatings.AddAsync(newRating);
            }

            await _movieContext.SaveChangesAsync(); // Save changes to the database

            return Ok();
        }

        [HttpGet("genrerecommendations")]
        public async Task<IActionResult> GetGenreRecommendations([FromQuery] string genre)
        {
            try
            {
                // Normalize the genre input (remove spaces and convert to lowercase)
                var genreColumnName = genre.Replace(" ", string.Empty).ToLower(); // Remove spaces and match property names

                // Define the valid genres and their corresponding column names
                var genreColumnMappings = new Dictionary<string, string>
        {
            { "animeseriesinternationaltvshows", "AnimeSeriesInternationalTvShows" },
            { "britishtvshowsdocuseriesinternationaltvshows", "BritishTvShowsDocuseriesInternationalTvShows" },
            { "children", "Children" },
            { "comedies", "Comedies" },
            { "comediesdramasinternationalmovies", "ComediesDramasInternationalMovies" },
            { "comediesinternationalmovies", "ComediesInternationalMovies" },
            { "comediesromanticmovies", "ComediesRomanticMovies" },
            { "crimetvshowsdocuseries", "CrimeTvShowsDocuseries" },
            { "documentaries", "Documentaries" },
            { "documentariesinternationalmovies", "DocumentariesInternationalMovies" },
            { "docuseries", "Docuseries" },
            { "dramas", "Dramas" },
            { "dramasinternationalmovies", "DramasInternationalMovies" },
            { "dramasromanticmovies", "DramasRomanticMovies" },
            { "familymovies", "FamilyMovies" },
            { "fantasy", "Fantasy" },
            { "horrormovies", "HorrorMovies" },
            { "internationalmoviesthrillers", "InternationalMoviesThrillers" },
            { "internationaltvshowsromantictvshowstvdramas", "InternationalTvShowsRomanticTvShowsTvDramas" },
            { "kidstv", "KidsTv" },
            { "languagetvshows", "LanguageTvShows" },
            { "musicals", "Musicals" },
            { "naturetv", "NatureTv" },
            { "realitytv", "RealityTv" },
            { "spirituality", "Spirituality" },
            { "tvaction", "TvAction" },
            { "tvcomedies", "TvComedies" },
            { "tvdramas", "TvDramas" },
            { "talkshowstvcomedies", "TalkShowsTvComedies" },
            { "thrillers", "Thrillers" }
        };

                // Check if the genre is valid and exists in the column mappings
                if (!genreColumnMappings.ContainsKey(genreColumnName))
                {
                    return BadRequest("Invalid genre");
                }

                // Get the correct database column name based on the genre
                var genreDbColumnName = genreColumnMappings[genreColumnName];

                // Query to get movies where the genre column is set to 1 (true) and order randomly
                var movies = await _movieContext.Movies
                    .Where(m => EF.Property<int>(m, genreDbColumnName) == 1)
                    .OrderBy(m => Guid.NewGuid()) // Randomize the results
                    .Select(m => new
                    {
                        m.Title,
                        m.poster_url
                    })
                    .Take(6) // Limit the results to 6
                    .ToListAsync();

                // Return the matched movies
                return Ok(new { movies });
            }
            catch (Exception ex)
            {
                // Log and return the error
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("getaveragerating/{title}")]
        public IActionResult GetAverageRating(string title)
        {
            // Search for the movie by title in the Movies table
            var movie = _movieContext.Movies
                .FirstOrDefault(m => m.Title.ToLower() == title.ToLower());

            // If no movie is found, return a 404 Not Found response
            if (movie == null)
            {
                return NotFound(new { message = $"Movie with title '{title}' not found" });
            }

            // Use the showId to fetch ratings from the MoviesRating table
            var ratings = _movieContext.MoviesRatings
                .Where(mr => mr.ShowId == movie.ShowId)
                .ToList(); // Get all ratings for the given showId

            // If there are no ratings, return 0 as the average
            if (ratings.Count == 0)
            {
                return Ok(new { AverageRating = 0 });
            }

            // Calculate the average rating (considering Rating is nullable)
            var averageRating = ratings.Average(mr => mr.Rating ?? 0);

            // Return the average rating as JSON
            return Ok(new { AverageRating = averageRating });
        }


    }
}
