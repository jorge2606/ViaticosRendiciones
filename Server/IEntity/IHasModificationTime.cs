using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.IEntity
{
    //
    // Summary:
    //     An entity can implement this interface if Abp.Domain.Entities.Auditing.IHasModificationTime.LastModificationTime
    //     of this entity must be stored. Abp.Domain.Entities.Auditing.IHasModificationTime.LastModificationTime
    //     is automatically set when updating Abp.Domain.Entities.Entity.
    public interface IHasModificationTime
    {
        //
        // Summary:
        //     The last modified time for this entity.
        DateTime? LastModificationTime { get; set; }
    }
}
