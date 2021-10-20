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

        //[HttpGet]
        //public IActionResult GetAllOrderItems()
        //{
        //    return Ok(_repo.GetAll());
        //}

        [HttpGet("/productid/{id}")]
        public IActionResult GetSingleOrderItemByProductId(Guid id)
        {
            return Ok(_repo.GetByProductId(id));
        }

        [HttpGet("/orderid/{id}")]
        public IActionResult GetSingleOrderItemByOrderId(Guid id)
        {
            return Ok(_repo.GetByOrderId(id));
        }

        [HttpGet("{id}")]
        public IActionResult GetSingleOrderItemById(Guid id)
        {
            return Ok(_repo.GetById(id));
        }

        //TODO: add Post route
        //TODO: add Update route
        //TODO: add Delete route
    }
}
