using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using VR.Web.Helpers;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Query.Expressions;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Dto.User;
using VR.Service.Interfaces;

namespace VR.Web.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public UserController(DataContext context, IUserService userService, IConfiguration configuration,
            IMapper mapper)
        {
            _context = context;
            _userService = userService;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpPost("SaveRolUser")]
        [AllowAnonymous]
        public async Task<ActionResult> SaveRolUser([FromBody]RoleUserDto rolUser)
        {
            await _userService.UpdateUserRole(rolUser.UserId, rolUser.RolId);
            return Ok(rolUser);
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody]CreateUserDto createUser)
        {
            var newUser = await _userService.CreateAsync(createUser);

            if (!newUser.IsSuccess)
            {
                return BadRequest(newUser);
            }
            return Ok(newUser);
        }

        [HttpPost("Auth")]
        [AllowAnonymous]
        public async Task<IActionResult> Authentication([FromBody]LoginDto p_LoginDto)
        {
            var result = await _userService.Authenticate(p_LoginDto);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }


        [AllowAnonymous]
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody]ForgotPasswordDto forgotPassword)
        {
            var result = await _userService.ForgotPassword(forgotPassword);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(forgotPassword);
        }

        [AllowAnonymous]
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPassword resetPassword)
        {
            var result = await _userService.ResetPassword(resetPassword);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(resetPassword);
        }

        [HttpGet("getall")]
        public ActionResult<List<User>> GetAll()
        {
            return _context.Users.ToList();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]SaveUserDto userDto)
        {
            var result = await _userService.Register(userDto);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            /* UserAuthenticationDto ObjToken = new UserAuthenticationDto
             {
                 Token = result.Response
             };
             */
            return Ok(result.Response);
        }

        [HttpGet("getbyid/{id}")]
        public ActionResult<ModifyUserDto> GetById(Guid id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return null;
            }
            ModifyUserDto modifyUserDto = new ModifyUserDto
            {
                Dni = user.Dni,
                UserName = user.UserName,
                PhoneNumber = user.PhoneNumber,
            };

            var RolesUser = _context.UserRoles.ToList();
            var AllRoles = _context.Roles.ToList();

            List<RoleWhenModifyUser> ListRolesBelongsToUser = new List<RoleWhenModifyUser>();
            foreach (var role in AllRoles)
            {
                if (RolesUser.Exists(x => x.UserId == user.Id && x.RoleId == role.Id))
                {
                    RoleWhenModifyUser roleWhenModifyUser = new RoleWhenModifyUser
                    {
                        Id = role.Id,
                        Name = role.Name,
                        RolBelongUser = true
                    };

                    ListRolesBelongsToUser.Add(roleWhenModifyUser);
                }
                else
                {
                    RoleWhenModifyUser roleWhenModifyUser = new RoleWhenModifyUser
                    {
                        Id = role.Id,
                        Name = role.Name,
                        RolBelongUser = false
                    };

                    ListRolesBelongsToUser.Add(roleWhenModifyUser);

                }
            }
            modifyUserDto.RolesUser = ListRolesBelongsToUser;
            return modifyUserDto;
        }

        [HttpPut("UpdateProfileAsAdmin")]
        public async Task<IActionResult> UpdateProfileAsAdmin([FromBody]UpdateProfileAsAdmin userDto)
        {
            await _userService.UpdateProfileAsAdmin(userDto);
            return Ok();
        }

        [HttpPut("UpdateMyProfile")]
        public async Task<IActionResult> UpdateMyProfile([FromBody]UpdateMyProfile userDto)
        {
            await _userService.UpdateMyProfile(userDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            _userService.Delete(id);
            return Ok();
        }

        public IQueryable<AllUserDto> queryableUser()
        {
            var usersPaginator = _context.Users.Select(x => _mapper.Map<AllUserDto>(x)).OrderBy(x => x.UserName);
            return usersPaginator;
        }
        
        [HttpGet("page")]
        public IActionResult GetPageUser([FromQuery] UserFilterDto filters)
        {
            var result = _userService.GetPageUser(filters);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }
    }

}