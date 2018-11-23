using System;
using System.Collections.Generic;
using System.Text;

namespace VR.Dto
{
    public class ExpenditureBaseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class CreateExpenditureDto : ExpenditureBaseDto { }

    public class UpdateExpenditureDto : ExpenditureBaseDto { }

    public class DeleteExpenditureDto : ExpenditureBaseDto { }

    public class FindByIdExpenditureDto : ExpenditureBaseDto { }



}
