using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dto
{
    public class ResetPassword
    {
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }
        public Guid UserId { get; set; }
        public string PasswordResetToken { get; set; }
    }
}
