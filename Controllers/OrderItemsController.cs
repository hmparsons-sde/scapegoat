using Microsoft.AspNetCore.Mvc;
using scapegoat.DataAccess;
using scapegoat.Models;
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

        [HttpPost]
        public IActionResult CreateOrderItem(OrderItem newOrderItem)
        {
            _repo.Add(newOrderItem);
            return Created($"/api/orderItems/{newOrderItem.Id}", newOrderItem);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOrderItem(Guid id, OrderItem orderItem)
        {
            var orderItemToUpdate = _repo.GetById(id);

            if (orderItemToUpdate == null)
            {
                return NotFound($"Could not find order with id {id} for updating");
            }

            var updatedOrderItem = _repo.Update(id, orderItem);
            return Ok(updatedOrderItem);
        }

        [HttpDelete("/hardDelete/{id}")]
        public IActionResult HardDeleteOrderItem(Guid id)
        {
            _repo.Remove(id);

            return Ok();
        }

    }
}
