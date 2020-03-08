using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BugMaster.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        public string Text { get; set; }
        public Defect Defect { get; set; }
    }
}
