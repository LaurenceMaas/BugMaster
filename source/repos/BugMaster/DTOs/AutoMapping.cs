using AutoMapper;
using BugMaster.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BugMaster.DTOs
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<Bug, BugDto>();
            CreateMap<BugDto, Bug>();
            CreateMap<Attachment, AttachmentDto>();
            CreateMap<AttachmentDto,Attachment>();
            CreateMap<NoteDto, Note>();
            CreateMap<Note, NoteDto>();
    }
    }
}
