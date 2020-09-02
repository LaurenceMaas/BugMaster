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
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using FSharp.Data;
using System.Collections.ObjectModel;

namespace BugMaster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BugsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private string contentRootPath;

        public BugsController(ApplicationDbContext context, IMapper mapper, IWebHostEnvironment Environment)
        {
            _context = context;
            _mapper = mapper;
            _hostingEnvironment = Environment;
            contentRootPath = Path.Combine(_hostingEnvironment.ContentRootPath, @"AppData\Attachments");
        }

        private ICollection<Attachment> GetAttachmentsFromBugId(int BugId)
        {
            var BugsClient = new HttpClient();
            ICollection<Attachment> attachments = new Collection<Attachment>();
            BugsClient.BaseAddress = new Uri(@"https://" + HttpContext.Request.Host.ToString());
            BugsClient.DefaultRequestHeaders.Accept.Clear();
            BugsClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(HttpContentTypes.Any));

            // HTTP GET
            var response = BugsClient.GetAsync("/api/Attachments/BugId/" + BugId.ToString()).Result;
            if (response.IsSuccessStatusCode)
            {
              var data = response.Content.ReadAsAsync<IEnumerable<Attachment>>().Result;
              foreach (var attachment in data)
              {
                attachments.Add(attachment);
              }        
            }

            return attachments;

        }

        // GET: api/Defects
        [HttpGet]
        public IEnumerable<BugDto> GetDefect()
        {
          var res = _context.Defect.ToList();
          return _context.Defect.ToList().Select(_mapper.Map<Bug, BugDto>);
        }

        // GET: api/Defects/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDefectFromId([FromRoute] int id)
        {
          var BugsClient = new HttpClient();
          ICollection<Attachment> attachments = new Collection<Attachment>();
          ICollection<Note> notes = new Collection<Note>();
          
          if (!ModelState.IsValid)
          {
            return BadRequest(ModelState);
          }

          var defect = await _context.Defect.FindAsync(id);

          if (defect == null)
          {
            return NotFound();
          }

          BugsClient.BaseAddress = new Uri(@"https://" + HttpContext.Request.Host.ToString());
          BugsClient.DefaultRequestHeaders.Accept.Clear();
          BugsClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(HttpContentTypes.Any));

          // HTTP GET
          var response = BugsClient.GetAsync("/api/Attachments/BugId/" + id.ToString()).Result;

          if (response.IsSuccessStatusCode)
          {
            var data = response.Content.ReadAsAsync<IEnumerable<Attachment>>().Result;
            foreach (var attachment in data)
            {                
                attachments.Add(attachment);
            }

          }

          defect.Attachments = attachments;

          // HTTP GET
          response = BugsClient.GetAsync("/api/Notes/BugId/" + id.ToString()).Result;

          if (response.IsSuccessStatusCode)
          {
            var data = response.Content.ReadAsAsync<IEnumerable<Note>>().Result;
            foreach (var note in data)
            {
              notes.Add(note);
            }

          }

          defect.Notes = notes;

          var defecttoAdd = _mapper.Map<Bug,BugDto>(defect);

          return Ok(defecttoAdd);
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

    //PATCH: api/bugs/5 
    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchBug([FromRoute] int id, [FromForm] BugDto defectdto, 
      [FromForm(Name = "attachmentstoAdd")] ICollection<IFormFile> attachments,
      [FromForm(Name = "notes")] ICollection<string> noteslist,
      [FromForm(Name = "attachmentlist")] ICollection<string> attachmentlist)
    {
      var GetDataClient = new HttpClient();
      ICollection<Attachment> CurrentAttachments = new Collection<Attachment>();
      ICollection<Note> CurrentNotes = new Collection<Note>();

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != defectdto.Id)
      {
        return BadRequest();
      }

      var defecttoModify = _context.Defect.SingleOrDefault(c => c.Id == id);
      _mapper.Map<BugDto, Bug>(defectdto, defecttoModify);

      if (defectdto.AssignToId == "0")
      {
        defecttoModify.AssignToId = null;
      }

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


      GetDataClient.BaseAddress = new Uri(@"https://" + HttpContext.Request.Host.ToString());
      GetDataClient.DefaultRequestHeaders.Accept.Clear();
      GetDataClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(HttpContentTypes.Any));

      // HTTP GET
      var response = GetDataClient.GetAsync("/api/Attachments/BugId/" + id.ToString()).Result;

      if (response.IsSuccessStatusCode)
      {
        var data = response.Content.ReadAsAsync<IEnumerable<Attachment>>().Result;
        foreach (var attachment in data)
        {
          CurrentAttachments.Add(attachment);
        }

      }

      foreach (Attachment attachment in CurrentAttachments)
      {
        var result = attachmentlist.FirstOrDefault(filename => filename == attachment.FileName);
        
        if (result == null)
        {
          response = GetDataClient.DeleteAsync("/api/Attachments/" + attachment.Id.ToString()).Result;
        }

      }

      if (attachments != null)
      {
        foreach (var file in attachments)
        {
          if (file.Length > 0)
          {
            Guid uniqueFilename = Guid.NewGuid();
            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            fileName = fileName.Replace(".", uniqueFilename + ".");
            FileStream fs = new FileStream(Path.Combine(contentRootPath, fileName), FileMode.Create);
            await file.CopyToAsync(fs);
            fs.Close();

            var DefectAttachmentToadd = new AttachmentDto
            {
              Path = "AppData\\Attachments\\" + fileName,
              FileName = file.FileName,
              DefectId = defecttoModify.Id
            };
            var attachmentToAdd = _mapper.Map<AttachmentDto, Attachment>(DefectAttachmentToadd);

            _context.Attachment.Add(attachmentToAdd);
            await _context.SaveChangesAsync();

          }
        }
      }

      // HTTP GET
      response = GetDataClient.GetAsync("/api/notes/BugId/" + id.ToString()).Result;

      if (response.IsSuccessStatusCode)
      {
        var data = response.Content.ReadAsAsync<IEnumerable<Note>>().Result;
        foreach (var note in data)
        {
          CurrentNotes.Add(note);
        }

      }

      foreach (Note note in CurrentNotes)
      {
        var result = noteslist.FirstOrDefault(notesearch => notesearch == note.Text);

        if (result == null)
        {
          response = GetDataClient.DeleteAsync("/api/notes/" + note.Id.ToString()).Result;
        }

      }

      if (noteslist != null)
      {
        foreach (var note in noteslist)
        {
          var NoteToAddDto = new NoteDto
          {
            AddedbyId = defecttoModify.LoggedbyId,
            CreatedDate = DateTime.Now,
            UpdatedDate = DateTime.Now,
            Text = note,
            DefectId = defecttoModify.Id
          };
          var NoteToAdd = _mapper.Map<NoteDto, Note>(NoteToAddDto);
          _context.Note.Add(NoteToAdd);
          await _context.SaveChangesAsync();
        }
      }

      return NoContent();
    }

    // PUT: api/Defects/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutBug([FromRoute] int id, [FromForm] BugDto defectdto)
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
            _mapper.Map<BugDto, Bug>(defectdto, defecttoModify);

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
    public async Task<IActionResult> PostDefect([FromForm] BugDto defectdto, 
        [FromForm(Name = "files")] ICollection<IFormFile> attachments, 
        [FromForm(Name = "notes")] ICollection<string> notes)
      {
        //string contentRootPath = Path.Combine(_hostingEnvironment.ContentRootPath , @"AppData\Attachments");

        if (!ModelState.IsValid)
        {
          return BadRequest(ModelState);
        }
            
        var defecttoAdd = _mapper.Map<BugDto, Bug>(defectdto);

        _context.Defect.Add(defecttoAdd);
        await _context.SaveChangesAsync();

        if (attachments != null)
        {
          foreach (var file in attachments)
          {
            if (file.Length > 0)
            {
              Guid uniqueFilename = Guid.NewGuid();
              var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
              fileName = fileName.Replace(".", uniqueFilename + ".");
              await file.CopyToAsync(new FileStream(Path.Combine(contentRootPath, fileName), FileMode.CreateNew));

              var DefectAttachmentToadd = new AttachmentDto
              {
                Path = "AppData\\Attachments\\" + fileName,
                FileName = file.FileName,
                DefectId = defecttoAdd.Id
              };
              var attachmentToAdd = _mapper.Map<AttachmentDto, Attachment>(DefectAttachmentToadd);

              _context.Attachment.Add(attachmentToAdd);
              await _context.SaveChangesAsync();

            }
          }
        }

        if(notes != null)
        {
          foreach (var note in notes)
          {
            var NoteToAddDto = new NoteDto
            {
              AddedbyId = defecttoAdd.LoggedbyId,
              CreatedDate = DateTime.Now,
              UpdatedDate = DateTime.Now,
              Text = note,
              DefectId = defecttoAdd.Id
            };
            var NoteToAdd = _mapper.Map<NoteDto, Note>(NoteToAddDto);
            _context.Note.Add(NoteToAdd);
            await _context.SaveChangesAsync();
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
