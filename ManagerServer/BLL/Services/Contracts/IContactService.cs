using DAL.Models;
using Microsoft.AspNetCore.Http;

namespace BLL.Services.Contracts
{
    public interface IContactService
    {
        Task CreateContactsAsync(IFormFile file);
        Task UpdateContactAsync(UserContact contact);
        Task<IEnumerable<UserContact>> GetAllContactsAsync();
        Task<UserContact> GetContactByIdAsync(int id);
        Task<int> DeleteContactAsync(int id);
    }
}
