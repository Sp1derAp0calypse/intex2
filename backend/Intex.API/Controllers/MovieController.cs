using System.Linq.Expressions;
using Intex.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Intex.API.Controllers
{

    [Route("[controller]")]
    [ApiController]
    [Authorize]

    public class MovieController : ControllerBase
    {
        private MovieDbContext _movieContext;
        private RecommenderDbContext _recommenderContext;

        public MovieController(MovieDbContext temp, RecommenderDbContext recommenderContext)
        {
            _movieContext = temp;
            _recommenderContext = recommenderContext;
        }

        [HttpGet("allmovies")]
        public IActionResult GetMovies(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? movieTypes = null, [FromQuery] string? searchTerm = null)
        {
            var query = _movieContext.Movies.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(m => m.Title.Contains(searchTerm));
            }

            // Apply genre filtering using reflection
            if (movieTypes != null && movieTypes.Any())
            {
                // Combine OR conditions dynamically for any genre that has value == 1
                var parameter = Expression.Parameter(typeof(MoviesTitle), "m");
                Expression? combinedExpression = null;

                foreach (var genre in movieTypes)
                {
                    var property = typeof(MoviesTitle).GetProperty(genre);
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

                if (combinedExpression != null)
                {
                    var lambda = Expression.Lambda<Func<MoviesTitle, bool>>(combinedExpression, parameter);
                    query = query.Where(lambda);
                }
            }

            var totalNumMovies = query.Count();

            var list = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var newObject = new
            {
                Movies = list,
                TotalNumMovies = totalNumMovies
            };

            return Ok(newObject);
        }

        [HttpGet("getmovietypes")]
        public IActionResult GetMovieTypes()
        {
            var genreProps = typeof(MoviesTitle).GetProperties()
                .Where(p => p.PropertyType == typeof(int?) && Char.IsUpper(p.Name[0]))
                .Select(p => p.Name)
                .ToList();

            return Ok(genreProps);
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
            var recommendation = _recommenderContext.Collaborative
                .AsEnumerable()
                .FirstOrDefault(x => x.IfYouLiked.Equals(title, StringComparison.OrdinalIgnoreCase));

            // If no match is found, return a NotFound response
            if (recommendation == null)
            {
                return NotFound(new { message = $"No recommendations found for '{title}'" });
            }

            // If a match is found, return the recommendations
            var collabRecommend = new
            {
                IfYouLiked = recommendation.IfYouLiked,
                Recommendations = new string[]
                {
            recommendation.Recommendation1,
            recommendation.Recommendation2,
            recommendation.Recommendation3,
            recommendation.Recommendation4,
            recommendation.Recommendation5
                }
            };

            return Ok(collabRecommend);

        }

        [HttpGet("contentrecommendations")]
        public IActionResult GetContentRecommended(string title)
        {
            // Search for content recommendations where 'If you liked' matches the provided title
            var recommendation = _recommenderContext.Content
                .AsEnumerable()
                .FirstOrDefault(x => x.IfYouLiked.Equals(title, StringComparison.OrdinalIgnoreCase));

            // If no match is found, return a NotFound response
            if (recommendation == null)
            {
                return NotFound(new { message = $"No recommendations found for '{title}'" });
            }

            // If a match is found, return the recommendations
            var contentRecommend = new
            {
                IfYouLiked = recommendation.IfYouLiked,
                Recommendations = new string[]
                {
            recommendation.Recommendation1,
            recommendation.Recommendation2,
            recommendation.Recommendation3,
            recommendation.Recommendation4,
            recommendation.Recommendation5
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

    }
}