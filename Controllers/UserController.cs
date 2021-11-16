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
    public class UserController : FirebaseBaseController
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
            return Ok(_repo.GetAll());
        }

        [HttpGet("{Id}")]
        [AllowAnonymous]
        public IActionResult GetUserById(Guid Id)
        {
            var user = _repo.GetSingleUserById(Id);

            if (user == null)
            {
                return NotFound($"No user with the id {Id} was found.");
            }

            return Ok(user);
        }

        [HttpGet("authedUsers/{FirebaseKey}")]
        [AllowAnonymous]
        public IActionResult GetUserByFBKey(string FirebaseKey)
        {
            var user = _repo.GetSingleUserByFBKey(FirebaseKey);

            if (user == null)
            {
                return NotFound($"No user with the id {FirebaseKey} was found.");
            }

            return Ok(user);
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult AddUserToDB(User newUser)
        {
            _repo.AddUser(newUser);

            return Created($"/api/Users/{newUser.Id}", newUser);
        }

        [HttpPut("SoftDeleteUsers/{Id}")]
        [AllowAnonymous]
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

        [HttpPut("UpdateUserInfo/{Id}")]
        [AllowAnonymous]
        public IActionResult UpdateUser(Guid Id, User user)
        {
            var userToEdit = _repo.GetSingleUserById(Id);

            if (userToEdit == null)
            {
                return NotFound($"Could not find user with the id {Id} for updating");
            }

            var editedUser = _repo.UpdateUser(Id, user);

            return Ok(editedUser);
        }

        [HttpDelete("{Id}")]
        [AllowAnonymous]
        public IActionResult HardDelete(Guid Id)
        {
            _repo.HardDeleteUser(Id);

            return Ok();
        }

        [HttpGet("types/{userType}")]
        [AllowAnonymous]
        public List<User> GetUserByType(UserType userType)
        {
            return _repo.GetUserByTypeFromDB(userType);
        }

        [HttpGet("tiers/{customerTier}")]
        [AllowAnonymous]
        public List<User> GetUserByTier(CustomerTier customerTier)
        {
            return _repo.GetUserByTierFromDB(customerTier);
        }
        [HttpGet("search/{FirstName}")]
        [AllowAnonymous]
        public List<User> GetUserByFirstName(string FirstName)
        {
            return _repo.GetUserByNameFromDB(FirstName);
        }
        [HttpGet("orderhistory/{Id}")]
        [AllowAnonymous]
        public List<User> GetUserOrderHistory(Guid userId)
        {
            return _repo.GetOrdersByUserId(userId);
        }

        [HttpGet("AdminUsers")]
        [AllowAnonymous]
        public List<User> GetUserByAdminStatus(bool IsAdmin)
        {
            return _repo.GetAdminUsers(IsAdmin);
        }
    }
}
