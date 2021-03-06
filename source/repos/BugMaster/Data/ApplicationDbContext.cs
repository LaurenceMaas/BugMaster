﻿using BugMaster.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BugMaster.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        
        //public DbSet<BugMaster.Models.User> User { get; set; }

        public DbSet<BugMaster.Models.Status> Status { get; set; }
        public DbSet<BugMaster.Models.Note> Comment { get; set; }
        public DbSet<BugMaster.Models.Bug> Defect { get; set; }
        public DbSet<BugMaster.Models.AuditTrail> AuditTrail { get; set; }
        public DbSet<BugMaster.Models.Severity> Severity { get; set; }
        public DbSet<BugMaster.Models.Attachment> Attachment { get; set; }
        public DbSet<BugMaster.Models.Note> Note { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Bug>()
            .HasMany(b => b.Notes)
            .WithOne(e => e.Defect);

            modelBuilder.Entity<Bug>()
            .HasMany(b => b.Attachments)
            .WithOne(e => e.Defect);

        }
    }
}
