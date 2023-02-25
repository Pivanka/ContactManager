using BLL.Reader;
using BLL.Services.Contracts;
using DAL.Models;
using DAL.Repository;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using System.Globalization;

namespace BLL.Services
{
    public class ContactService : IContactService
    {
        private readonly IRepository<UserContact> _contactRepository;
        private readonly IValidator<UserContact> _validator;

        public ContactService(IRepository<UserContact> contactRepository, IValidator<UserContact> validator)
        {
            _contactRepository = contactRepository;
            _validator = validator;
        }
        public async Task CreateContactsAsync(IFormFile file)
        {
            var list = FileReader.ReadAsList(file);
            var converetedContacts = await ConvertToContact(list);
            
            await _contactRepository.AddRangeAsync(converetedContacts);
            await _contactRepository.SaveChangesAsync();
        }

        private async Task<List<UserContact>> ConvertToContact(List<string> contacts)
        {
            var result = new List<UserContact>();
            foreach (var contact in contacts)
            {
                var lines = contact.Split(',', StringSplitOptions.TrimEntries);
                var tempContact = new UserContact
                {
                    Name = lines[0],
                    DateOfBirth = DateOnly.ParseExact(lines[1], "dd.MM.yyyy", CultureInfo.InvariantCulture),
                    Married = Convert.ToBoolean(lines[2]),
                    Phone = lines[3],
                    Salary = Convert.ToDecimal(lines[4])
                };

                await _validator.ValidateAndThrowAsync(tempContact);

                result.Add(tempContact);
            }

            return result;
        }

        public async Task<int> DeleteContactAsync(int id)
        {
            var conactToDelete = await _contactRepository.GetByIdAsync(id);

            if (conactToDelete == null) throw new ArgumentException("Book for delete not found.");

            var deletedContact = await _contactRepository.RemoveAsync(conactToDelete);
            await _contactRepository.SaveChangesAsync();

            return deletedContact.Id;
        }

        public async Task<IEnumerable<UserContact>> GetAllContactsAsync()
        {
            return await _contactRepository.GetAllAsync();
        }

        public async Task<UserContact> GetContactByIdAsync(int id)
        {
            var contact = await _contactRepository.GetByIdAsync(id);

            if (contact == null) throw new ArgumentException("Contact not found.");

            return contact;
        }

        public async Task UpdateContactAsync(UserContact contact)
        {
            if (contact == null) throw new ArgumentNullException("Contact is null!");

            await _validator.ValidateAndThrowAsync(contact);

            await _contactRepository.UpdateAsync(contact);
            await _contactRepository.SaveChangesAsync();
        }
    }
}
