using Microsoft.AspNetCore.Mvc;
using scapegoat.DataAccess;
using scapegoat.Models;
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

        [HttpGet("/merchantorders/{UserId}")]
        public IActionResult GetMerchantOrders(Guid UserId)
        {
            return Ok(_repo.GetAllUserCarts(UserId));

        }


        [HttpPost]
        public IActionResult AddOrder(Order newOrder)
        {
            _repo.Add(newOrder);
            return Created($"/api/orders/{newOrder.Id}", newOrder);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOrder(Guid id, Order order)
        {
            var orderToUpdate = _repo.GetById(id);

            if (orderToUpdate == null)
            {
                return NotFound($"Could not find order with id {id} for updating");
            }

            var updatedOrder = _repo.Update(id, order);
            return Ok(updatedOrder);
        }

        [HttpDelete("/hardDeleteOrder/{id}")] 
        public IActionResult HardDeleteOrder(Guid id)
        {
            _repo.Remove(id);

            return Ok();
        }

        [HttpGet("/completedCustomerOrder/{id}")]
        public IActionResult getCompletedCustomerOrder(Guid id)
        {
            return Ok(_repo.GetCustomerShipped(id));
        }

        [HttpGet("/pendingCustomerOrder/{id}")]
        public IActionResult getPendingCustomerOrder(Guid id)
        {
            return Ok(_repo.GetCustomerPending(id));
        }

        [HttpGet("/openOrder/{id}")]
        public IActionResult getFullPendingOrder(Guid id)
        {
            return Ok(_repo.GetFullPendingOrder(id));
        }

        [HttpGet("/thisMonth/{id}")]
        public IActionResult getThisMonthsOrders(Guid id)
        {
            return Ok(_repo.GetMonthlyOrders(id));
        }
    }
}
