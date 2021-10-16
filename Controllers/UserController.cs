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
                return NotFound($"No bird with the id {Id} was found.");
            }

            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(Guid Id, User user)
        {
            var userToUpdate = _repo.GetSingleUserById(Id);

            if (userToUpdate == null)
            {
                return NotFound($"Could not find user with the id {Id} for updating");
            }

            var removedUser = _repo.RemoveUser(Id, user);

            return Ok(removedUser);

        }
    }
}
