using System;

namespace server.models
{
    public class File
    {
        public Guid Id { set; get; }
        public string Path { set; get; }
        public  Guid UserId { set; get; }
        public DateTime UploadTime { set; get; }
        public DateTime DeleteTime { set; get; }
        public string MimeType { set; get; }
    }
}
