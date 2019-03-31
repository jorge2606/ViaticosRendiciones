﻿using Service.Common.ServiceResult;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using VR.Dto;

namespace VR.Service.Interfaces
{
    public interface IAspNetUserRolesService
    {
        ServiceResult<List<AllUserRolesDto>> GetAllUserRoles();
        Task<ServiceResult<IDictionary<string, IList<ClaimDto>>>> FindByIdRoles(Guid userId);
    }
}
