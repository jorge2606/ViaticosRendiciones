using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dto
{

    public class LoginValidator : AbstractValidator<LoginDto>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Usuario).NotEmpty().WithMessage("Usuario no debería estar vacío.");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Contraseña no debería estar vacío.");
        }
    }

    public class LoginDto
    {
        public string Usuario { set; get; }
        public string Password { set; get; }
    }
}
