﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BugMaster.DTOs
{
    public class DefectDto
    {
        public int Id { get; set; }
        [Required]
        public string ShortDescription { get; set; }
        [Required]
        public string StepsToRecreate { get; set; }
        public string LoggedbyId { get; set; }
        public string AssignToId { get; set; }
        public int CurrentStatusId { get; set; }
        public int SeverityId { get; set; }        
        public ICollection<IFormFile> files { get; set; }

    }
}
