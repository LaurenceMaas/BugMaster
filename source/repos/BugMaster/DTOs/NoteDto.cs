using BugMaster.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BugMaster.DTOs
{
	public class NoteDto
	{
    public int Id { get; set; }
    public string AddedbyId { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public string Text { get; set; }
    public int DefectId { get; set; }
  }
}
