using System;
using server.IEntity;

namespace server.EntityAudit
{
    //
    // Summary:
    //     This class can be used to simplify implementing Abp.Domain.Entities.Auditing.IAudited.
    //
    // Type parameters:
    //   TPrimaryKey:
    //     Type of the primary key of the entity
    public abstract class AuditedEntity<TPrimaryKey> : CreationAuditedEntity<TPrimaryKey>, IAudited, ICreationAudited, IHasCreationTime, IModificationAudited, IHasModificationTime
    {
        //
        // Summary:
        //     Last modification date of this entity.
        public virtual DateTime? LastModificationTime { get; set; }
        //
        // Summary:
        //     Last modifier user of this entity.
        public virtual Guid LastModifierUserId { get; set; }
    }
}
