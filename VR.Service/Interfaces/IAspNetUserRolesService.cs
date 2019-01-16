using Service.Common.ServiceResult;
using System;
using System.Collections.Generic;
using System.Text;
using VR.Dto;

namespace VR.Service.Interfaces
{
    public interface IAspNetUserRolesService
    {
        ServiceResult<List<AllUserRolesDto>> GetAllUserRoles();
    }
}
