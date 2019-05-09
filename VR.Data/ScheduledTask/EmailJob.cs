using Quartz;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Snickler.EFCore;
using VR.Data.Model;
using Microsoft.Extensions.Configuration;

namespace VR.Data.ScheduledTask
{
    public class EmailJob : IJob
    {

        public Task Execute(IJobExecutionContext context)
        {
            
            /**using (var message = new MailMessage("user@gmail.com", "user@live.co.uk"))
            {
                message.Subject = "Test";
                message.Body = "Test at " + DateTime.Now;
                using (SmtpClient client = new SmtpClient
                {
                    EnableSsl = true,
                    Host = "smtp.gmail.com",
                    Port = 587,
                    Credentials = new NetworkCredential("user@gmail.com", "password")
                })
                {
                    client.Send(message);
                }
            }**/
            Console.WriteLine("sdfsdfsdf");
            return Task.CompletedTask;
        }

    }
}
