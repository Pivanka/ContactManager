using BLL.Services.Contracts;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace PL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserContact>>> GetContacts()
        {
            var contacts = await _contactService.GetAllContactsAsync();
            return Ok(contacts);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserContact>> GetContactById(int id)
        {
            var contact = await _contactService.GetContactByIdAsync(id);
            return Ok(contact);
        }

        [HttpPost]
        public async Task<ActionResult<UserContact>> SaveContacts()
        {
            var formCollection = await HttpContext.Request.ReadFormAsync();
            var file = formCollection.Files.First();

            await _contactService.CreateContactsAsync(file);

            return Ok();
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<ActionResult<int>> DeleteContact([FromRoute] int id)
        {
            var contactId = await _contactService.DeleteContactAsync(id);
            return Ok(contactId);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateContact([FromBody] UserContact contact)
        {
            await _contactService.UpdateContactAsync(contact);

            return Ok();
        }
    }
}
