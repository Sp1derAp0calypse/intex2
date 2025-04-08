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
        private RecommenderDbContext _recommenderContext;

        public MovieController(MovieDbContext temp, RecommenderDbContext recommenderContext)
        {
            _movieContext = temp;
            _recommenderContext = recommenderContext;
        }

        [HttpGet("allmovies")]
        public IActionResult GetMovies(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? movieTypes = null)
        {
            var query = _movieContext.Movies.AsQueryable();

            // Apply category filtering if projectTypes are provided
            if (movieTypes != null && movieTypes.Any())
            {
                //query = query.Where(b => movieTypes.Contains(b.Genre));
            }

            var totalNumMovies = query.Count(); // Count AFTER filtering

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


        //[HttpGet("getmoviestypes")]
        //public IActionResult GetProjectTypes()
        //{
        //    //var movieTypes = _movieContext.Movies
        //    //    .Select(p => p.Genre)
        //    //    .Distinct()
        //    //    .ToList();

        //    return Ok(movieTypes);
        //}

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

        [HttpGet("contentrecommendations/{title}")]
        public IActionResult GetContentRecommended(string title)
        {
            var recommendation = _recommenderContext.ContentRecommendations
                .FirstOrDefault(r => r.IfYouLiked.Equals(title, StringComparison.OrdinalIgnoreCase));

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
