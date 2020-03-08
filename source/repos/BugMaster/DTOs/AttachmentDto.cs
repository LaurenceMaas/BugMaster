using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace BugMaster.DTOs
{
    public class AttachmentDto
    {

        public int Id { get; set; }

        public string Path { get; set; }

        public int DefectId { get; set; }
    }
}
