using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Dto;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    public class AspNetUserRolesService : IAspNetUserRolesService
    {
        private readonly DataContext _context;
        private IMapper _mapper;

        public AspNetUserRolesService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public ServiceResult<List<AllUserRolesDto>> GetAllUserRoles()
        {
            return new ServiceResult<List<AllUserRolesDto>>(
                _context.UserRoles.Select(x => _mapper.Map<AllUserRolesDto>(x)).ToList()
                );
        }
    }
}
