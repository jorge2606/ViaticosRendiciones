using Service.Common.ServiceResult;
using System;
using VR.Web.EntityAudit;

namespace VR.Data.Model

{
    public class Notification : AuditedEntity<Guid>
    {
        public string TextData { set; get; }
        public string Tittle { set; get; }
        public Guid UserId { set; get; }
        public Guid EntityId { set; get; }
        public int NotificationType { set; get; }
        public bool Read { set; get; }
    }
    
}
