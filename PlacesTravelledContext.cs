using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using PlacesTravelled.DataModel;

namespace PlacesTravelled
{
    public partial class PlacesTravelledContext : DbContext
    {
        public PlacesTravelledContext()
        {
        }

        public PlacesTravelledContext(DbContextOptions<PlacesTravelledContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("server=localhost; Database=PlacesTravelled");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {}

        public DbSet<Locations> Locations{get; set;}
    }
}
