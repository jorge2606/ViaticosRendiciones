using Audit.Dto;
using server.ServiceResult;
using System;
using System.Collections.Generic;

namespace Audit.Service.Interfaces
{
    public interface IUserService
    {
        ServiceResult<List<AuditDto<UserAuditDto>>> GetUserAudit(Guid userId);
    }
}
