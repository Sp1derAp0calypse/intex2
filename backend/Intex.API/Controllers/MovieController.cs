using System.Linq.Expressions;
using Intex.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("allmovies")]
        public IActionResult GetMovies(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? movieTypes = null)
        {
            var query = _movieContext.Movies.AsQueryable();

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

        [HttpGet("getmoviestypes")]
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
            _movieContext.Movies.Add(newMovie);
            _movieContext.SaveChanges();
            return Ok(newMovie);
        }


        [HttpPut("updatemovie/{movieId}")]
        public IActionResult UpdateMovie(int movieId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _movieContext.Movies.Find(movieId);

            if (existingMovie == null)
            {
                return NotFound($"Project with ID {movieId} not found.");
            }

            // Update the book fields
            //existingMovie.Title = updatedMovie.Title;
            //existingMovie.Director = updatedMovie.Director;
            //existingMovie.Type = updatedMovie.Type;
            //existingMovie.TheCast = updatedMovie.TheCast;
            //existingMovie.Country = updatedMovie.Country;
            //existingMovie.Release_year = updatedMovie.Release_year;
            //existingMovie.Rating = updatedMovie.Rating;
            //existingMovie.Duration = updatedMovie.Duration;
            //existingMovie.Description = updatedMovie.Description;
            //existingMovie.Genre = updatedMovie.Genre;



            // Save the changes to the database
            _movieContext.SaveChanges();

            // Return a success response
            return Ok(existingMovie);
        }


        [HttpDelete("deletemovie/{movieId}")]
        public IActionResult DeleteBook(int movieId)
        {
            var movie = _movieContext.Movies.Find(movieId);

            if (movie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }
            _movieContext.Movies.Remove(movie);
            _movieContext.SaveChanges();

            return NoContent();
        }

        [HttpGet("collaborativerecommendations")]
        public IActionResult GetCollabRecommended([FromQuery] string title)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                return BadRequest(new { message = "Title cannot be empty" });
            }

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
            var recommendedMovies = new
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

            return Ok(recommendedMovies);

        }

        [HttpGet("contentrecommendations")]
        public IActionResult GetContentRecommended([FromQuery] string title)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                return BadRequest(new { message = "Title cannot be empty" });
            }

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
            var recommendedMovies = new
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

            return Ok(recommendedMovies);

        }
    }
}