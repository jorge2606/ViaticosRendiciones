﻿using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using VR.Data.Model;

namespace VR.Dto.User
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

    public class UserCreateValidator : AbstractValidator<CreateUserDto>
    {
        public UserCreateValidator()
        {
            RuleFor(x => x.Dni.ToString()).NotEmpty().MaximumLength(8).WithName("Dni");
            RuleFor(x => x.UserName).NotEmpty().WithName("Usuario");
            RuleFor(x => x.Password).NotEmpty().WithName("Contraseña");
            RuleFor(x => x.PhoneNumber).NotEmpty().MinimumLength(8).WithName("Telefóno");
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
        public Guid DistributionId { set; get; }
        public Distribution Distribution { set; get; }
    }


    public class ModifyUserDto
    {
        public Guid Id { get; set; }
        public int Dni { set; get; }
        public string UserName { set; get; }
        public string Password { get; set; }
        public string PhoneNumber { set; get; }
        public List<RoleWhenModifyUser> RolesUser { set; get; }
        public Guid DistributionId { set; get; }
        public Distribution Distribution { set; get; }
    }

    //admin and common user can use this Dto, because they update its own the same way 
    public class UpdateMyProfile : ModifyUserDto{}

    public class UpdateProfileAsAdmin : ModifyUserDto {}

    public class CreateUserDto : ModifyUserDto{}

    public class AllUserDto
    {
        public Guid Id { get; set; }
        public int Dni { set; get; }
        public string UserName { set; get; }
        public string PhoneNumber { set; get; }
        public Guid DistributionId { set; get; }
        public Distribution Distribution { set; get; }
    }

    public class UserAuthenticationDto
    {
        public string Token { get; set; }
    }
}