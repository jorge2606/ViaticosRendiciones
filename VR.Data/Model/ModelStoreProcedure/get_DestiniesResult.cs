using System;
using System.Collections.Generic;
using System.Text;

namespace VR.Data.Model.ModelStoreProcedure
{
    public class Get_DestiniesResult
    {
        public int Days { set; get; }
        public string DaysLetters { set; get; }
        public Decimal AdvanceCategory { set; get; }
        public string SolicitationTotalLetter { set; get; }
        public Decimal PercentageCodeLiquidation { set; get; }
        public string TextPercentage { set; get; }
        public Decimal CategoryAndCodeLiquidation { set; get; }
    }
}
