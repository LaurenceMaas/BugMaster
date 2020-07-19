using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BugMaster.Models
{
    public class Bug
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string ShortDescription { get; set; }
        [Required]
        public string StepsToRecreate { get; set; }
        [Required]
        public string ExpectedResult { get; set; }
        [Required]
        public string ActualResult { get; set; }
        public ApplicationUser Loggedby { get; set; }
        public string LoggedbyId { get; set; }
        public ApplicationUser AssignTo { get; set; }
        public string AssignToId { get; set; }
        public Status CurrentStatus { get; set; }
        public int CurrentStatusId { get; set; }
        public ICollection<Note> Notes { get; set; }
        public Severity Severity { get; set; }
        public int SeverityId { get; set; }
        public ICollection<Attachment> Attachments { get; set; }
    }
}
