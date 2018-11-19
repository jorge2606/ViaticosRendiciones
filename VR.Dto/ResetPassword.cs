using System;

namespace VR.Dto
{
    public class ResetPassword
    {
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }
        public Guid UserId { get; set; }
        public string PasswordResetToken { get; set; }
    }
}
