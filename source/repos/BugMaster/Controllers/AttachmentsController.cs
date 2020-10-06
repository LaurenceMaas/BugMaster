using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using BugMaster.Data;
using BugMaster.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using BugMaster.DTOs;
using AutoMapper;
using System.IO;

namespace BugMaster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttachmentsController : ControllerBase
    {
      private readonly ApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly IWebHostEnvironment _hostingEnvironment;

      public AttachmentsController(ApplicationDbContext context, IMapper mapper, IWebHostEnvironment Environment)
        {
            _context = context;
            _mapper = mapper;
            _hostingEnvironment = Environment;
          
      }

      // GET: api/Attachments
      [HttpGet]
      public async Task<ActionResult<IEnumerable<Attachment>>> GetAttachment()
      {
        return await _context.Attachment.ToListAsync();
      }
        
      // GET: api/Attachments/5
      [HttpGet("{id}")]
      public async Task<ActionResult<Attachment>> GetAttachment(int id)
      {
        var attachment = await _context.Attachment.FindAsync(id);

        if (attachment == null)
        {
          return NotFound();
        }

        return attachment;
      }

      // GET: api/Attachments/BugId/5
      [HttpGet("BugId/{BugId}")]
      public async Task<ActionResult<IEnumerable<Attachment>>> GetAttachmentFromBugId(int bugid)
      {
        var defectforattachment = await _context.Attachment.Where(x => x.DefectId == bugid).ToListAsync();

        if (defectforattachment == null)
        {
          return NotFound();
        }

        return defectforattachment;
      }


    // PUT: api/Attachments/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
      [HttpPut("{id}")]
      public async Task<IActionResult> PutAttachment(int id, Attachment attachment)
      {
        if (id != attachment.Id)
        {
          return BadRequest();
        }

        _context.Entry(attachment).State = EntityState.Modified;

        try
        {
          await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
          if (!AttachmentExists(id))
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

      // POST: api/Attachments
      // To protect from overposting attacks, please enable the specific properties you want to bind to, for
      // more details see https://aka.ms/RazorPagesCRUD.
      [HttpPost]
      public async Task<ActionResult<Attachment>> PostAttachment([FromBody] AttachmentDto attachmentDto)
      {

          if (!ModelState.IsValid)
          {
              return BadRequest(ModelState);
          }

          var attachmentToAdd = _mapper.Map<AttachmentDto, Attachment>(attachmentDto);

          _context.Attachment.Add(attachmentToAdd);
          await _context.SaveChangesAsync();

          return CreatedAtAction("GetAttachment", new { id = attachmentToAdd.Id }, attachmentToAdd);
      }

    // DELETE: api/Attachments/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Attachment>> DeleteAttachment(int id)
    {
      var attachment = await _context.Attachment.FindAsync(id);

      if (attachment == null)
      {
        return NotFound();
      }

      try
      {
        System.IO.File.Delete(Path.Combine(_hostingEnvironment.ContentRootPath, attachment.Path));
      }
      catch (IOException)
      {
        return NotFound();
      }

      _context.Attachment.Remove(attachment);
      await _context.SaveChangesAsync();

      return attachment;
    }

      private bool AttachmentExists(int id)
      {
        return _context.Attachment.Any(e => e.Id == id);
      }
    }
}
