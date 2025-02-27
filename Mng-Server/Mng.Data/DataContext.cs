﻿using Microsoft.EntityFrameworkCore;
using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Data
{
    public class DataContext : DbContext
    {

        //public DataContext(DbContextOptions<DataContext> options) : base(options)
        //{

        //}
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<EmployeeRoles> EmployeeRoles { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=DESKTOP-24EQMFH;Initial Catalog=MngEmployeesProject;Integrated Security=true; User ID=meirav;Password=1234; TrustServerCertificate=True; Encrypt=False;");
            optionsBuilder.LogTo((message) => Debug.Write(message));
        }
       
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<EmployeeRoles>()
        //        .HasKey(er => new { er.EmployeeId, er.EmployeeRolesId });

        //}

    }
}
