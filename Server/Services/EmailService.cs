using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using server.Identity;
using server.IServices;
using System.Threading.Tasks;

namespace server.Services
{
    public class EmailService : IEmailSender, ISmsSender
    {
        private UserManager _usermanager;

        public EmailService(IOptions<AuthMessageSenderOptions> optionsAccessor, UserManager userManager)
        {
            Options = optionsAccessor.Value;
            _usermanager = userManager;
        }

        public AuthMessageSenderOptions Options { get; } //set only via Secret Manager

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var user = await  _usermanager.FindByEmailAsync(email);
            
            if (user != null)
            {
                var apiKey = "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";
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress("no-reply@devlights.com", "Devlights");
                var to = new EmailAddress(email, string.Empty);
                var htmlContent = message;
                var textPlain = message;
                var msg = MailHelper.CreateSingleEmail(from, to, subject, textPlain, htmlContent);
                var response = await client.SendEmailAsync(msg);
            }
        }

        public Task SendSmsAsync(string number, string message)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }

    }
}
