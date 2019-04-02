using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Identity.Identities;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    public class AspNetUserRolesService : IAspNetUserRolesService
    {
        private readonly DataContext _context;
        private IMapper _mapper;
        private readonly IAspNetRolesService _roleService;
        private readonly RoleManager<Role> _roleManager;

        public AspNetUserRolesService(
            DataContext context,
            IMapper mapper,
            IAspNetRolesService roleService,
            RoleManager<Role> roleManager)
        {
            _context = context;
            _mapper = mapper;
            _roleService = roleService;
            _roleManager = roleManager;
    }

        public ServiceResult<List<AllUserRolesDto>> GetAllUserRoles()
        {
            return new ServiceResult<List<AllUserRolesDto>>(
                _context.UserRoles.Select(x => _mapper.Map<AllUserRolesDto>(x)).ToList()
                );
        }

        public async Task< ServiceResult< IList<ClaimDto>> >  FindByIdRoles(Guid userId)
        {
            var roles = _context.UserRoles
                .Select(x => _mapper.Map<AllUserRolesDto>(x))
                .Where(x => x.UserId == userId)
                .ToList();

            IList<ClaimDto> RolesNameDict = new List<ClaimDto>();
            
            roles.ForEach(rolUser =>
            {
                //primero obtengo el rol
                var Rol = _roleManager.Roles.FirstOrDefault(x => x.Id == rolUser.RoleId);
                //obtengo todos los claims
                RolesNameDict = _mapper.Map<IList<ClaimDto>>(_roleManager.GetClaimsAsync(Rol).Result);
            });
           

            return new ServiceResult<IList<ClaimDto> > (RolesNameDict);
        }


    }
}
