using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BugMaster.Models
{
    public class Note
    {
      [Key]
      public int Id { get; set; }
      public ApplicationUser Addedby { get; set; }
      public string AddedbyId { get; set; }
      public DateTime CreatedDate { get; set; }
      public DateTime UpdatedDate { get; set; }
      public string Text { get; set; }
      public int DefectId { get; set; }
      public Bug Defect { get; set; }
    }
}
