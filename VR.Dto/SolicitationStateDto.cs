using System;
using System.Collections.Generic;
using System.Text;

namespace VR.Dto
{
    public class SolicitationStateDto
    {
        public Guid Id { set; get; }
        public DateTime ChangeDate { set; get; }
        
        public Guid StateId { set; get; }
        public Guid SolicitationSubsidyId { set; get; }
    }

    public class AddFielNumberDto : SolicitationStateDto
    {
        public string FileNumber { set; get; }
    }
}
