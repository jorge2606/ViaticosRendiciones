using System;

namespace server.Dto
{
    public class NotificationBaseDto
    {
        public Guid Id { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public DateTime? LastModifierUserId { get; set; }
        public string TextData { get; set; }
        public string Tittle { get; set; }
        public Guid UserId { get; set; }
        public int NotificationType { get; set; }
        public Guid EntityId { get; set; }
    }


    public class NotificationDto
    {
        public Guid Id { get; set; }
        public string TextData { get; set; }
        public string Tittle { get; set; }
        public bool Read { get; set; }
    }

}
