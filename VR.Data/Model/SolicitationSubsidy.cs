using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace VR.Data.Model
{
    public class SolicitationSubsidy
    {
        public Guid Id { set; get; }
        public double CostMobility { set; get; }
        public double CostFuel { set; get; }
        public double CostCommunication { set; get; }
        public double UnexpectedCircumstance { set; get; }

        [ForeignKey("User")]
        public Guid UserId { set; get; }
        [ForeignKey("Place")]
        public Guid PlaceId { set; get; }
        [ForeignKey("Destinity")]
        public Guid DestinityId { set; get; }
        [ForeignKey("Transport")]
        public Guid TransportId { set; get; }
        [ForeignKey("Motive")]
        public Guid MotiveId { set; get; }

        public User User { set; get; }
        public Transport Transport { set; get; }
        public Place Place { set; get; }
        public Destinity Destinity { set; get; }
        public Motive Motive { set; get; }

    }
}
