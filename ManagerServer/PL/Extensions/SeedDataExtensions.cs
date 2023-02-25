using DAL.Context;
using DAL.Models;

namespace PL.Extensions
{
    public static class SeedDataExtensions
    {
        public static void SeedData(this WebApplication app)
        {
            var scoped = app.Services.CreateScope();
            var db = scoped.ServiceProvider.GetService<ContactManagerDbContext>();

            UserContact[] contacts = new UserContact[]
            {
                new UserContact{ Id = 1, Name = "Ivanka", Married = false, DateOfBirth = new DateOnly(2003, 01, 20), Phone="091224875", Salary = 20000},
                new UserContact{ Id = 2, Name = "Olya", Married = false, DateOfBirth = new DateOnly(2003, 06, 18), Phone="097224875", Salary = 25000},
                new UserContact{ Id = 3, Name = "Sergiy", Married = true, DateOfBirth = new DateOnly(2000, 01, 03), Phone="091247875", Salary = 10000},
                new UserContact{ Id = 4, Name = "Lesya", Married = false, DateOfBirth = new DateOnly(2003, 01, 08), Phone="096524875", Salary = 9000}
            };

            db.Contacts.AddRange(contacts);

            db.SaveChanges();
        }
    }
}
