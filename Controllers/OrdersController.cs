using Microsoft.AspNetCore.Mvc;
using scapegoat.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scapegoat.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        OrdersRepository _repo;
        public OrdersController(OrdersRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllOrders()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetSingleOrder(Guid id)
        {
            return Ok(_repo.GetById(id));
        }

        [HttpGet("/userorder/{UserId}")]
        public IActionResult GetOrderByUserId(Guid UserId)
        {
            return Ok(_repo.GetByUserId(UserId));
        }
    }
}
