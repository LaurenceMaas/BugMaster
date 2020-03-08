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
            CreateMap<Defect, DefectDto>();
            CreateMap<DefectDto, Defect>();
            CreateMap<Attachment, AttachmentDto>();
            CreateMap<AttachmentDto,Attachment>();
        }
    }
}
