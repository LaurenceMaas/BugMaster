﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BugMaster.DTOs
{
    public class BugDto
    {
        public int Id { get; set; }
        [Required]
        public string ShortDescription { get; set; }
        [Required]
        public string StepsToRecreate { get; set; }
        [Required]
        public string ExpectedResult { get; set; }
        [Required]
        public string ActualResult { get; set; }
        public string LoggedbyId { get; set; }
        public string AssignToId { get; set; }
        public int CurrentStatusId { get; set; }
        public int SeverityId { get; set; }        
        public ICollection<AttachmentDto> Attachments { get; set; }
        public ICollection<NoteDto> Notes { get; set; }

  }
}
