using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Context
{
    public class ContactManagerDbContext : DbContext
    {
        public DbSet<UserContact> Contacts { get; set; }

        public ContactManagerDbContext(DbContextOptions<ContactManagerDbContext> options) : base(options)
        { }
    }
}
