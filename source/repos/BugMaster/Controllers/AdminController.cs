using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BugMaster.Data;
using BugMaster.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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

        // GET: api/users
        [HttpGet]
        public List<ApplicationUser> GetUsersAsync()
        {
            return _userManager.Users.ToList();

        }


    }
}