using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using VR.Data.Model;

namespace VR.Dto.User
{
    public class UserFilterDto : FilterBaseDto
    {
        public int Dni { get; set; }

        public string Username { get; set; }

        public Guid? DistributionId { get; set; }
    }
}
