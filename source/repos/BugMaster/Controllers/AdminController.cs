using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BugMaster.Data;
using BugMaster.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BugMaster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AdminController(ApplicationDbContext context,UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/admin
        [HttpGet]
        public List<ApplicationUser> GetUsersAsync()
        {
            return _userManager.Users.ToList();

        }

        // GET: api/admin/{usergid}
        [HttpGet("usergid/{usergid}")]
        public async Task<IActionResult> GetUserAsync([FromRoute] string userGid)
        {
          if (!ModelState.IsValid)
          {
            return BadRequest(ModelState);
          }

          var user = await _userManager.Users.Where(x => x.Id == userGid).ToListAsync();

          if (user == null)
          {
            return NotFound();
          }

          return Ok(user);

        }


  }
}