using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using VR.Data;
using VR.Data.Model;

namespace VR.Identity.Identities
{
    public class RoleStore : RoleStore<Role, DataContext, Guid>
    {
        public RoleStore(DataContext context) : base(context)
        {
        }
    }
}
