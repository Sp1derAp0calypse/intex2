using Intex.API.Models;
using System.Reflection.Emit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace Intex.API.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {



        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MoviesUser>()
                .HasOne<IdentityUser>() // no inverse nav needed
                .WithMany()
                .HasForeignKey(m => m.Email)
                .HasPrincipalKey(u => u.Email) // this part is key!
                .OnDelete(DeleteBehavior.NoAction); // optional: prevent cascade deletes
        }
    }
}
