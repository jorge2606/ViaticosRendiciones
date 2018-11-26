using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace VR.Data.Model
{
    public class Distribution
    {
        public Guid Id { set; get; }
        public string Name { set; get; }
        public string Description { set; get; }
        public ICollection<User> Users { set; get; }

        [ForeignKey("Organism")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid? OrganismId { set; get; }
        public Organism Organism { set; get; }
    }
}
