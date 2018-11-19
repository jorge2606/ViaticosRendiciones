using FluentValidation;
using Microsoft.AspNetCore.Http;
using server.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server.Dto
{

    public class UserValidator : AbstractValidator<SaveUserDto>
    {
        public UserValidator()
        {
            RuleFor(x => x.Dni.ToString()).NotEmpty().MaximumLength(8);
            RuleFor(x => x.Dni.ToString()).NotEmpty().MinimumLength(8);
            RuleFor(x => x.UserName).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
            RuleFor(x => x.Email)
                .EmailAddress()
                .MaximumLength(256);
            RuleFor(x => x.PhoneNumber).NotEmpty().MinimumLength(8);
            RuleFor(x => x.PhoneNumber).NotEmpty().MaximumLength(8);
        }
    }

    public class SaveUserDto : UserDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "PASSWORD_MIN_LENGTH", MinimumLength = 6)]
        public string Password { get; set; }
    }

    public class UserDto
    {
        public Guid Id { set; get; }
        public int Dni { set; get; }
        public string UserName { set; get; }
        public string PhoneNumber { set; get; }
        public string Token { get; set; }
        public string Path { get; set; }
    }


    public class ModifyUserDto
    {
        public Guid Id { get; set; }
        public int Dni { set; get; }
        public string UserName { set; get; }
        public string Password { get; set; }
        public string PhoneNumber { set; get; }
        public List<RoleWhenModifyUser> RolesUser { set; get; }
    }

    //admin and common user can use this Dto, because they update its own the same way 
    public class UpdateMyProfile : ModifyUserDto{}

    public class UpdateProfileAsAdmin : ModifyUserDto {}

    public class CreateUserDto : ModifyUserDto{}

    public class UserAuthenticationDto
    {
        public string Token { get; set; }
    }
}
