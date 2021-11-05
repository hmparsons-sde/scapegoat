using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using scapegoat.DataAccess;
using scapegoat.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace scapegoat.Controllers
{
    [Route("api/Users")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        UserRepository _repo;
        OrdersRepository _oRepo;
        public UserController(UserRepository repo, OrdersRepository oRepo)
        {
            _repo = repo;
            _oRepo = oRepo;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAllUsers()
        {
            //var fbUserId = User.FindFirst(claim => claim.Type == "user_id").Value;
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

        [HttpPut("{Id}")]
        public IActionResult SoftDeleteUser(Guid Id, User user)
        {
            var userToUpdate = _repo.GetSingleUserById(Id);

            if (userToUpdate == null)
            {
                return NotFound($"Could not find user with the id {Id} for updating");
            }

            var updatedUser = _repo.SoftRemoveUser(Id, user);

            return Ok(updatedUser);

        }

        [HttpDelete("{Id}")]
        public IActionResult HardDelete(Guid Id)
        {
            _repo.HardDeleteUser(Id);

            return Ok();
        }

        [HttpGet("types/{userType}")]
        public List<User> GetUserByType(UserType userType)
        {
            return _repo.GetUserByTypeFromDB(userType);
        }

        [HttpGet("tiers/{customerTier}")]
        public List<User> GetUserByTier(CustomerTier customerTier)
        {
            return _repo.GetUserByTierFromDB(customerTier);
        }
        [HttpGet("search/{FirstName}")]
        public List<User> GetUserByFirstName(string FirstName)
        {
            return _repo.GetUserByNameFromDB(FirstName);
        }
        [HttpGet("orderhistory/{Id}")]
        public List<User> GetUserOrderHistory(Guid userId)
        {
            return _repo.GetOrdersByUserId(userId);
        }
    }
}
