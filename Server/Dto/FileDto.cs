using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using Microsoft.AspNetCore.Http;

namespace server.Dto
{
    public class FileCreateDto : FileDeleteDto
    {
        public Guid Id { set; get; }
        public string Path { set; get; }
        public Guid UserId { set; get; }
        public IFormFile File { set; get; }
        public string MimeType { set; get; }
        public DateTime UploadTime { set; get; }
       
        public FileCreateDto()
        {
            UploadTime = DateTime.Now;
            DeleteTime = DateTime.MinValue;
        }

    }

    public class UpdateMyImageDto : FileCreateDto {}

    public class FileDeleteDto
    {
        public DateTime DeleteTime { set; get; }
    }

    public class FileByIdDto
    {
        public string Paths { set; get; }
    }
}
