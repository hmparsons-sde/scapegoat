using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using scapegoat.DataAccess;
using scapegoat.Models;

namespace scapegoat.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserRepository _repo;
        public UserController(UserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{Id}")]
        public IActionResult GetUserById(Guid Id)
        {
            var user = _repo.GetSingleUserById(Id);

            if (user == null)
            {
                return NotFound($"No user with the id {Id} was found.");
            }

            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddUserToDB(User newUser)
        {
            if (string.IsNullOrEmpty(newUser.FirstName) || string.IsNullOrEmpty(newUser.LastName))
            {
                return BadRequest("First and last name are required fields");
            }

            _repo.AddUser(newUser);

            return Created($"/api/Users/{newUser.Id}", newUser);
        }

        // Soft delete user
        [HttpDelete("{Id}")]
        public IActionResult SoftDeleteUser(Guid Id)
        {

            _repo.RemoveUser(Id);

            return Ok();
        }

    }
}
