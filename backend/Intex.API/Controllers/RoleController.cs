using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Intex.API.Data;

namespace Intex.API.Controllers;

[Route("[controller]")]
[ApiController]
[Authorize(Roles = "Administrator")]
public class RoleController : Controller
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<IdentityUser> _userManager;

    private MovieDbContext _movieContext;

    public RoleController(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager, MovieDbContext temp)
    {
        _roleManager = roleManager;
        _userManager = userManager;
        _movieContext = temp;
    }

    [HttpPost("AddRole")]
    public async Task<IActionResult> AddRole(string roleName)
    {
        if (string.IsNullOrWhiteSpace(roleName))
        {
            return BadRequest("Role name cannot be empty.");
        }

        var roleExists = await _roleManager.RoleExistsAsync(roleName);
        if (roleExists)
        {
            return Conflict("Role already exists.");
        }

        var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
        if (result.Succeeded)
        {
            return Ok($"Role '{roleName}' created successfully.");
        }

        return StatusCode(500, "An error occurred while creating the role.");
    }

    [HttpPost("AssignRoleToUser")]
    public async Task<IActionResult> AssignRoleToUser(string userEmail, string roleName)
    {
        if (string.IsNullOrWhiteSpace(userEmail) || string.IsNullOrWhiteSpace(roleName))
        {
            return BadRequest("User email and role name are required.");
        }

        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var roleExists = await _roleManager.RoleExistsAsync(roleName);
        if (!roleExists)
        {
            return NotFound("Role does not exist.");
        }

        var result = await _userManager.AddToRoleAsync(user, roleName);
        if (result.Succeeded)
        {
            return Ok($"Role '{roleName}' assigned to user '{userEmail}'.");
        }

        return StatusCode(500, "An error occurred while assigning the role.");
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
}