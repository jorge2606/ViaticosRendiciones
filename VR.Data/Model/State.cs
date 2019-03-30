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
        public static readonly Guid Accounted = Guid.Parse("D385AE53-F2DB-48A6-AF68-5E1FBE80F0E0");
        public static readonly Guid Finished = Guid.Parse("2C332F3C-CF16-4BEB-85C4-C4677700CF2C");
        public static readonly Guid AccountForAcepted = Guid.Parse("00CE5670-BC4B-4435-8C67-D754824D0FF2");
        public static readonly Guid AccountForRejected = Guid.Parse("74DFD597-8669-4AF8-8564-350B1E1996E4");

        public Guid Id { set; get; }
        public string Description { set; get; }
    }
}
