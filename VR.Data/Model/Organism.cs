using System;
using System.Collections;
using System.Collections.Generic;

namespace VR.Data.Model
{
    public class Organism
    {
        public Guid Id { set; get; }
        public string Name { set; get; }
        public string Description { set; get; }

        public ICollection<Distribution> Distributions { set; get; }
    }
}
