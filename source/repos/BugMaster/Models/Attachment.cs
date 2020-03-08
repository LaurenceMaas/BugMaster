﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BugMaster.Models
{
    public class Attachment
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }

        public string Path { get; set; }

        public Defect Defect { get; set; }

        public int DefectId { get; set; }
    }
}
