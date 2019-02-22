﻿using System;
using System.Collections.Generic;
using System.Text;
using VR.Dto.User;

namespace VR.Dto
{
    public class SupervisorUserAgentBaseDto
    {
        public Guid Id { get; set; }
        public Guid SupervisorId { set; get; }
        public Guid AgentId { set; get; }
        public UserDto Supervisors { set; get; }
        public UserDto Agents { set; get; }
    }

    public class CreateSupervisorAgentDto : SupervisorUserAgentBaseDto { }
    public class AllSupervisorAgentDto : SupervisorUserAgentBaseDto { }
    public class DeleteSupervisorAgentDto : SupervisorUserAgentBaseDto { }
}
