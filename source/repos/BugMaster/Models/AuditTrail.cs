using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BugMaster.Models
{
    public class AuditTrail
    {
        [Key]
        public int Id { get; set; }
        public int DefectId { get; set; }
        public int FromStatusId { get; set; }
        public int ToStatusId { get; set; }
        public DateTime CreatedDate { get; set; }
        public ApplicationUser CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public ApplicationUser UpdateBy { get; set; }
    }
}
