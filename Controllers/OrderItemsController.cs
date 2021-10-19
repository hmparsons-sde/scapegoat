using Microsoft.AspNetCore.Mvc;
using scapegoat.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scapegoat.Controllers
{
    [Route("api/orderitems")]
    [ApiController]

    public class OrderItemsController : ControllerBase
    {

        OrderItemsRepository _repo;
        public OrderItemsController(OrderItemsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllOrderItems()
        {
            return Ok(_repo.GetAll());
        }
    }
}
