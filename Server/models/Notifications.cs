using System;
using server.EntityAudit;

namespace server.models
{
    public class Notification : AuditedEntity<Guid>
    {
        public string TextData { set; get; }
        public string Tittle { set; get; }
        public Guid UserId { set; get; }
        public Guid EntityId { set; get; }
        public NotificationType NotificationType { set; get; }
        public bool Read { set; get; }
    }

    public enum NotificationType
    {
        Default = 1
    }
}
