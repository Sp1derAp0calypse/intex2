﻿using Microsoft.EntityFrameworkCore;
using Intex.API.Models; // Use the correct namespace where your models are defined

namespace Intex.API.Controllers
{
    public class RecommenderDbContext : DbContext
    {
        public DbSet<ContentRecommend> ContentRecommendations { get; set; }
        public DbSet<CollabRecommend> CollaborativeRecommendations { get; set; }

        public RecommenderDbContext(DbContextOptions<RecommenderDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // This specifies the second database
            optionsBuilder.UseSqlite("Data Source=Recommendations.db");
        }
    }
}
