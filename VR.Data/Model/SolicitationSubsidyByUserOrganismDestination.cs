using System;
using System.Collections.Generic;
using System.Text;

namespace VR.Data.Model
{
    public class SolicitationSubsidyByUser
    {
        public string FullName { set; get; }
        public string Dni { set; get; }
        public string PhoneNumber { set; get; }
        public string Email { set; get; }
        public DateTime CreateDate { set; get; }
        public string State { set; get; }
        public DateTime BeginDate { set; get; }
        public DateTime EndDate { set; get; }
        public string Motive { set; get; }
        public decimal Total { set; get; }
        public string Localities { set; get; }
        public Decimal TotalExpenditure { set; get; }
        public Decimal TotalDetination { set; get; }
    }

    public class SolicitationSubsidyByOrganism
    {
        public string FullName { set; get; }
        public string Dni { set; get; }
        public string PhoneNumber { set; get; }
        public string Email { set; get; }
        public DateTime CreateDate { set; get; }
        public string State { set; get; }
        public DateTime BeginDate { set; get; }
        public DateTime EndDate { set; get; }
        public string Motive { set; get; }
        public decimal Total { set; get; }
        public string Localities { set; get; }
        public Decimal TotalExpenditure { set; get; }
        public Decimal TotalDetination { set; get; }
    }
}
