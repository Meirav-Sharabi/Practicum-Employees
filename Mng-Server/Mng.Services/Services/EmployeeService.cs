﻿using Mng.Core.Entities;
using Mng.Core.IRepositories;
using Mng.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Service.Services
{
    public class EmployeeService: IEmployeeService
    {
        public readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<Employee> GetByIdAsync(int employeeId)
        {
            return await _employeeRepository.GetByIdAsync(employeeId);
        }
        public async Task<IEnumerable<Employee>> GetListAsync()
        {
            return await _employeeRepository.GetListAsync();
        }
        public async Task<Employee> AddAsync(Employee employee)
        {
            var roleIds = employee.Roles.Select(r => r.RoleId).ToList();
            var roleDates = employee.Roles.Select(r => r.StartDate).ToList();
            if (roleIds.Count != roleIds.Distinct().Count())
            {
                throw new InvalidOperationException("Duplicate Roles are not allowed.");
            }
            if(!(roleDates.All(date => date > employee.StartDate|| date == employee.StartDate)))
            {
                throw new InvalidOperationException("Not all job entry dates are before the employee's start date.");
            }
            return await _employeeRepository.AddAsync(employee);
        }

        public async Task DeleteAsync(int employeeId)
        {
            await _employeeRepository.DeleteAsync(employeeId);
        }
        public async Task<Employee> UpdateAsync(Employee employee)
        {
            var roleIds = employee.Roles.Select(r => r.RoleId).ToList();
            var roleDates = employee.Roles.Select(r => r.StartDate).ToList();
            if (roleIds.Count != roleIds.Distinct().Count())
            {
                throw new InvalidOperationException("Duplicate Roles are not allowed.");
            }
            if (!(roleDates.All(date => date > employee.StartDate || date == employee.StartDate)))
            {
                throw new InvalidOperationException("Not all job entry dates are before the employee's start date.");
            }
            return await _employeeRepository.UpdateAsync(employee);
        }
    }
}
