using System;
using System.Collections.Generic;
using System.Text;

namespace VR.Data.Model
{
    public class State
    {
        public static readonly Guid Accepted = Guid.Parse("3535DEC7-3CA2-4930-BE5B-32FDBBA7D02C");
        public static readonly Guid Rejected = Guid.Parse("723CCAD5-5F9A-496C-8F99-D27817F8E3F2");
        public static readonly Guid Pending = Guid.Parse("D4E28CE0-D7F6-46A2-849E-471F7A4EAACE");
        public static readonly Guid Sent = Guid.Parse("A152C5B9-D0B5-4CDA-92E8-F479568CFEF6");

        public Guid Id { set; get; }
        public string Description { set; get; }
    }
}
