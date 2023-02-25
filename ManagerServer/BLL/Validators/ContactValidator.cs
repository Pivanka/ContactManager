using DAL.Models;
using FluentValidation;

namespace BLL.Validators
{
    public class ContactValidator : AbstractValidator<UserContact>
    {
        public ContactValidator()
        {
            RuleFor(b => b.Name).NotEmpty();
            RuleFor(b => b.Salary).NotEmpty();
            RuleFor(b => b.DateOfBirth).NotEmpty();
            RuleFor(b => b.Phone).NotEmpty();

            RuleFor(b => b.Phone).Must(BeAValidPhone).WithMessage("Please specify a valid phone number");
        }

        private bool BeAValidPhone(string phone)
        {
            return phone.All(char.IsDigit);
        }
    }
}
