using System;
using System.Collections.Generic;
using Intex.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Intex.API.Data;

public partial class MovieDbContext : DbContext
{
    public MovieDbContext()
    {
    }

    public MovieDbContext(DbContextOptions<MovieDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Collaborative> Collaboratives { get; set; }

    public virtual DbSet<Content> Contents { get; set; }

    public virtual DbSet<MoviesRating> MoviesRatings { get; set; }  

    public virtual DbSet<MoviesTitle> Movies { get; set; }

    public virtual DbSet<MoviesUser> MoviesUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlite("Data Source=Movies.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Collaborative>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Collaborative");

            entity.Property(e => e.Collaborative1).HasColumnName("Collaborative 1");
            entity.Property(e => e.Collaborative2).HasColumnName("Collaborative 2");
            entity.Property(e => e.Collaborative3).HasColumnName("Collaborative 3");
            entity.Property(e => e.Collaborative4).HasColumnName("Collaborative 4");
            entity.Property(e => e.Collaborative5).HasColumnName("Collaborative 5");
            entity.Property(e => e.IfYouLiked).HasColumnName("If you liked");
        });

        modelBuilder.Entity<Content>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Content");

            entity.HasIndex(e => e.Index, "ix_Content_index");

            entity.Property(e => e.IfYouLiked).HasColumnName("If you liked");
            entity.Property(e => e.Index)
                .HasColumnType("BIGINT")
                .HasColumnName("index");
            entity.Property(e => e.Recommendation1).HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation2).HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation3).HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation4).HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation5).HasColumnName("Recommendation 5");
        });

        modelBuilder.Entity<MoviesRating>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("movies_ratings");

            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.ShowId).HasColumnName("show_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<MoviesTitle>(entity =>
        {
            entity
                .ToTable("movies_titles")
                .HasKey(m => m.ShowId);

            entity.Property(e => e.AnimeSeriesInternationalTvShows).HasColumnName("Anime Series International TV Shows");
            entity.Property(e => e.BritishTvShowsDocuseriesInternationalTvShows).HasColumnName("British TV Shows Docuseries International TV Shows");
            entity.Property(e => e.Cast).HasColumnName("cast");
            entity.Property(e => e.ComediesDramasInternationalMovies).HasColumnName("Comedies Dramas International Movies");
            entity.Property(e => e.ComediesInternationalMovies).HasColumnName("Comedies International Movies");
            entity.Property(e => e.ComediesRomanticMovies).HasColumnName("Comedies Romantic Movies");
            entity.Property(e => e.Country).HasColumnName("country");
            entity.Property(e => e.CrimeTvShowsDocuseries).HasColumnName("Crime TV Shows Docuseries");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Director).HasColumnName("director");
            entity.Property(e => e.DocumentariesInternationalMovies).HasColumnName("Documentaries International Movies");
            entity.Property(e => e.DramasInternationalMovies).HasColumnName("Dramas International Movies");
            entity.Property(e => e.DramasRomanticMovies).HasColumnName("Dramas Romantic Movies");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.FamilyMovies).HasColumnName("Family Movies");
            entity.Property(e => e.HorrorMovies).HasColumnName("Horror Movies");
            entity.Property(e => e.InternationalMoviesThrillers).HasColumnName("International Movies Thrillers");
            entity.Property(e => e.InternationalTvShowsRomanticTvShowsTvDramas).HasColumnName("International TV Shows Romantic TV Shows TV Dramas");
            entity.Property(e => e.KidsTv).HasColumnName("Kids' TV");
            entity.Property(e => e.LanguageTvShows).HasColumnName("Language TV Shows");
            entity.Property(e => e.NatureTv).HasColumnName("Nature TV");
            entity.Property(e => e.poster_url).HasColumnName("poster_url");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.RealityTv).HasColumnName("Reality TV");
            entity.Property(e => e.ReleaseYear).HasColumnName("release_year");
            entity.Property(e => e.ShowId).HasColumnName("show_id");
            entity.Property(e => e.TalkShowsTvComedies).HasColumnName("Talk Shows TV Comedies");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.TvAction).HasColumnName("TV Action");
            entity.Property(e => e.TvComedies).HasColumnName("TV Comedies");
            entity.Property(e => e.TvDramas).HasColumnName("TV Dramas");
            entity.Property(e => e.Type).HasColumnName("type");
        });

        modelBuilder.Entity<MoviesUser>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("movies_users");

            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.AmazonPrime).HasColumnName("Amazon Prime");
            entity.Property(e => e.AppleTv).HasColumnName("Apple TV+");
            entity.Property(e => e.City).HasColumnName("city");
            entity.Property(e => e.Disney).HasColumnName("Disney+");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Gender).HasColumnName("gender");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Paramount).HasColumnName("Paramount+");
            entity.Property(e => e.Phone).HasColumnName("phone");
            entity.Property(e => e.State).HasColumnName("state");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Zip).HasColumnName("zip");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
