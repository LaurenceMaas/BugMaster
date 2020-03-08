using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BugMaster.Data;
using BugMaster.Models;

namespace BugMaster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeveritiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SeveritiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Severities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Severity>>> GetSeverity()
        {
            return await _context.Severity.ToListAsync();
        }

        // GET: api/Severities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Severity>> GetSeverity(int id)
        {
            var severity = await _context.Severity.FindAsync(id);

            if (severity == null)
            {
                return NotFound();
            }

            return severity;
        }

        // PUT: api/Severities/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSeverity(int id, Severity severity)
        {
            if (id != severity.Id)
            {
                return BadRequest();
            }

            _context.Entry(severity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeverityExists(id))
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

        // POST: api/Severities
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Severity>> PostSeverity(Severity severity)
        {
            _context.Severity.Add(severity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSeverity", new { id = severity.Id }, severity);
        }

        // DELETE: api/Severities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Severity>> DeleteSeverity(int id)
        {
            var severity = await _context.Severity.FindAsync(id);
            if (severity == null)
            {
                return NotFound();
            }

            _context.Severity.Remove(severity);
            await _context.SaveChangesAsync();

            return severity;
        }

        private bool SeverityExists(int id)
        {
            return _context.Severity.Any(e => e.Id == id);
        }
    }
}
