using System;
using System.Collections.Generic;
using System.Text;

namespace VR.Data.Model
{
    public class Transport
    {
        public Guid Id { set; get; }
        public string Type { set; get; }
        public string Brand { set; get; }
        public string Model { set; get; }
        public string CarPlate { set; get; }
    }
}
