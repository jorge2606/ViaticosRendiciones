using Microsoft.AspNetCore.Identity;
using System;

namespace VR.Data.Model
{
    public class User : IdentityUser<Guid>
    {

        public int Dni { set; get; }
    }
}