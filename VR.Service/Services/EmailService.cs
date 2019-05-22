using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using VR.Service.Interfaces;
using VR.Identity.Identities;

namespace VR.Service.Services
{
    public class EmailService : IEmailService, ISmsSender
    {
        private readonly UserManager _usermanager;

        public EmailService(IOptions<AuthMessageSenderOptions> optionsAccessor, UserManager userManager)
        {
            Options = optionsAccessor.Value;
            _usermanager = userManager;
        }

        public AuthMessageSenderOptions Options { get; } //set only via Secret Manager

        public async Task<Response> SendEmail(string email, string subject, string message)
        {
            var user = await _usermanager.Users.FirstOrDefaultAsync(x => x.Email == email);
                var apiKey = "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";
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress("no-reply@devlights.com", "Devlights");
                var to = new EmailAddress(email, string.Empty);
                var htmlContent = message;
                var textPlain = message;
                var msg = MailHelper.CreateSingleEmail(from, to, subject, textPlain, htmlContent);
                return await client.SendEmailAsync(msg);
        }

        public Task SendSmsAsync(string number, string message)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }

    }
}

