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
    public class AuditTrailsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuditTrailsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/AuditTrails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuditTrail>>> GetAuditTrail()
        {
            return await _context.AuditTrail.ToListAsync();
        }

        // GET: api/AuditTrails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AuditTrail>> GetAuditTrail(int id)
        {
            var auditTrail = await _context.AuditTrail.FindAsync(id);

            if (auditTrail == null)
            {
                return NotFound();
            }

            return auditTrail;
        }

        // PUT: api/AuditTrails/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuditTrail(int id, AuditTrail auditTrail)
        {
            if (id != auditTrail.Id)
            {
                return BadRequest();
            }

            _context.Entry(auditTrail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuditTrailExists(id))
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

        // POST: api/AuditTrails
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<AuditTrail>> PostAuditTrail(AuditTrail auditTrail)
        {
            _context.AuditTrail.Add(auditTrail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAuditTrail", new { id = auditTrail.Id }, auditTrail);
        }

        // DELETE: api/AuditTrails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AuditTrail>> DeleteAuditTrail(int id)
        {
            var auditTrail = await _context.AuditTrail.FindAsync(id);
            if (auditTrail == null)
            {
                return NotFound();
            }

            _context.AuditTrail.Remove(auditTrail);
            await _context.SaveChangesAsync();

            return auditTrail;
        }

        private bool AuditTrailExists(int id)
        {
            return _context.AuditTrail.Any(e => e.Id == id);
        }
    }
}
