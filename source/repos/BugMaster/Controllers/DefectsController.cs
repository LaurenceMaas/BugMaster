using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BugMaster.Models;
using BugMaster.DTOs;
using AutoMapper;
using BugMaster.Data;
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;
using System.Net.Http.Headers;

namespace BugMaster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DefectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public DefectsController(ApplicationDbContext context, IMapper mapper, IWebHostEnvironment Environment)
        {
            _context = context;
            _mapper = mapper;
            _hostingEnvironment = Environment;
        }

        // GET: api/Defects
        [HttpGet]
        public IEnumerable<DefectDto> GetDefect()
        {

            var res = _context.Defect.ToList();
            return _context.Defect.ToList().Select(_mapper.Map<Defect, DefectDto>);
        }

        // GET: api/Defects/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDefectFromId([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var defect = await _context.Defect.FindAsync(id);

            if (defect == null)
            {
                return NotFound();
            }

            return Ok(defect);
        }

        // GET: api/Defects/ShortDescription
        [HttpGet("ShortDescription/{ShortDescription}")]
        public async Task<IActionResult> GetDefectFromShortDescription([FromRoute] string shortDescription)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var defect = await _context.Defect.Where(x => x.ShortDescription.Contains(shortDescription)).ToListAsync();

            if (defect == null)
            {
                return NotFound();
            }

            return Ok(defect);
        }

        // GET: api/Defects/StepsToRecreate
        [HttpGet("StepsToRecreate/{StepsToRecreate}")]
        public async Task<IActionResult> GetDefectFromStepsToRecreate([FromRoute] string stepsToRecreate)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var defect = await _context.Defect.Where(x => x.StepsToRecreate == stepsToRecreate).ToListAsync();

            if (defect == null)
            {
                return NotFound();
            }

            return Ok(defect);
        }

        // GET: api/Defects/LoggedBy/{usergid}
        [HttpGet("LoggedBy/{LoggedById}")]
        public async Task<IActionResult> GetDefectFromLoggedBy([FromRoute] string loggedById)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var defect = await _context.Defect.Where(x => x.LoggedbyId == loggedById).ToListAsync();

            if (defect == null)
            {
                return NotFound();
            }

            return Ok(defect);
        }

        // GET: api/Defects/AssignedTo/{usergid}
        [HttpGet("AssignedTo/{AssignedToId}")]
        public async Task<IActionResult> GetDefectFromAssignedTo([FromRoute] string assignedToId)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var defect = await _context.Defect.Where(x => x.AssignToId == assignedToId).ToListAsync();

            if (defect == null)
            {
                return NotFound();
            }

            return Ok(defect);
        }

      // GET: api/Defects/status/{usergid}
      [HttpGet("StatusId/{StatusId}")]
      public async Task<IActionResult> GetDefectFromStatusId([FromRoute] int statusId)
      {

        if (!ModelState.IsValid)
        {
          return BadRequest(ModelState);
        }

        var defect = await _context.Defect.Where(x => x.CurrentStatusId  == statusId).ToListAsync();

        if (defect == null)
        {
          return NotFound();
        }

        return Ok(defect);
      }

    // GET: api/Defects/Criteria/{LoggedByGID}/{StatusId}/{AssignedToGID}
    [HttpGet("Criteria/{LoggedByGID}/{StatusId}/{AssignedToGID}")]
        public async Task<IActionResult> GetDefectFromCriteria([FromRoute] string loggedByGID, [FromRoute] int statusId, string assignedToGID)
        {
          if (!ModelState.IsValid)
          {
            return BadRequest(ModelState);
          }

          if (string.Compare(assignedToGID, "null", true) == 0)
          {
            assignedToGID = null;
          }

          var defect = await _context.Defect.Where(x => (x.LoggedbyId == loggedByGID) && (x.AssignToId == assignedToGID) && (x.CurrentStatusId == statusId) ).ToListAsync();
    
          if (defect == null)
          {
            return NotFound();
          }

          return Ok(defect);
        }

        // PUT: api/Defects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDefect([FromRoute] int id, [FromBody] DefectDto defectdto)
          {
              if (!ModelState.IsValid)
              {
                  return BadRequest(ModelState);
              }

              if (id != defectdto.Id)
              {
                  return BadRequest();
              }

              var defecttoModify = _context.Defect.SingleOrDefault(c => c.Id == id);
              _mapper.Map<DefectDto, Defect>(defectdto, defecttoModify);

              _context.Entry(defecttoModify).State = EntityState.Modified;

              try
              {

                  await _context.SaveChangesAsync();
              }
              catch (DbUpdateConcurrencyException)
              {
                  if (!DefectExists(id))
                  {
                      return NotFound();
                  }
                  else
                  {
                      throw;
                  }
              }

              return NoContent();
          }

          // POST: api/Defects
          [HttpPost]
          public async Task<IActionResult> PostDefect([FromForm] DefectDto defectdto)
          {
              string contentRootPath = Path.Combine(_hostingEnvironment.ContentRootPath , "AppData\\Attachments");

              if (!ModelState.IsValid)
              {
                  return BadRequest(ModelState);
              }
            
              var defecttoAdd = _mapper.Map<DefectDto, Defect>(defectdto);

              _context.Defect.Add(defecttoAdd);
              await _context.SaveChangesAsync();


              if (defectdto.files != null)
              {
                  foreach (var file in defectdto.files)
                  {
                      if (file.Length > 0)
                      {
                          Guid uniqueFilename = Guid.NewGuid();
                          var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                          fileName = fileName.Replace(".", uniqueFilename + ".");
                          await file.CopyToAsync(new FileStream(Path.Combine(contentRootPath, fileName), FileMode.Create));

                          var DefectAttachmentToadd = new AttachmentDto
                          {
                              Path = "AppData\\Attachments\\" + fileName,
                              DefectId = defecttoAdd.Id
                          };
                          var attachmentToAdd = _mapper.Map<AttachmentDto, Attachment>(DefectAttachmentToadd);

                          _context.Attachment.Add(attachmentToAdd);
                          await _context.SaveChangesAsync();

                      }
                  }
              }

              return CreatedAtAction("GetDefectFromId", new { id = defecttoAdd.Id }, defecttoAdd);
          }

          // DELETE: api/Defects/5
          [HttpDelete("{id}")]
          public async Task<IActionResult> DeleteDefect([FromRoute] int id)
          {
              if (!ModelState.IsValid)
              {
                  return BadRequest(ModelState);
              }

              var defect = await _context.Defect.FindAsync(id);
              if (defect == null)
              {
                  return NotFound();
              }

              _context.Defect.Remove(defect);
              await _context.SaveChangesAsync();

              return Ok(defect);
          }

          private bool DefectExists(int id)
          {
              return _context.Defect.Any(e => e.Id == id);
          }
      }
}
