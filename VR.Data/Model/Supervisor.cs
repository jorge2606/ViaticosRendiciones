using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace VR.Data.Model
{
    public class SupervisorUserAgent
    {
        [Key]
        public Guid Id { get; set; }
        public Guid SupervisorId { set; get; }
        public Guid AgentId { set; get; }

        [ForeignKey("SupervisorId")]
        public User Supervisors { set; get; }
        [ForeignKey("AgentId")]
        public User Agents { set; get; }

    }
}
