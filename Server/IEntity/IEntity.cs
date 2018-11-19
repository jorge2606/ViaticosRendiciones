using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.IEntity
{
    interface IEntity<TPrimaryKey>
    {
        //
        // Summary:
        //     Unique identifier for this entity.
        TPrimaryKey Id { get; set; }
    }
}
