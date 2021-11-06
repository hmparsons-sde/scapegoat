using scapegoat.DataAccess;
using scapegoat.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scapegoat.Controllers
{
    [Route("api/PaymentType")]
    [ApiController]
    public class PaymentTypeController : ControllerBase
    {
        PaymentTypeRepository _repo;
        public PaymentTypeController(PaymentTypeRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllPaymentTypes()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("/singlePayment/{id}")]
        public IActionResult GetSinglePaymentById(Guid id)
        {
            var paymentType = _repo.GetPaymentById(id);

            if (paymentType == null)
            {
                return NotFound($"No paymentType with the id {id} was found.");
            }

            return Ok(paymentType);
        }

        [HttpGet("userPaymentMethods/{UserId}")]
        public IActionResult GetPaymentByUserId(Guid UserId)
        {
            return Ok(_repo.GetPaymentByUserId(UserId));
        }

        [HttpPost]
        public IActionResult AddPaymentToDB(PaymentType newPayment)
        {
            if (string.IsNullOrEmpty(newPayment.AccountNumber) /*|| string.IsNullOrEmpty(newPayment.PaymentMethod)*/)
            {
                return BadRequest("Payment Method and Account Number are required fields");
            }

            _repo.AddPaymentMethod(newPayment);

            return Created($"/api/PaymentType/{newPayment.Id}", newPayment);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePayment(Guid id, PaymentType paymentType)
        {
            var paymentToUpdate = _repo.GetPaymentById(id);

            if (paymentToUpdate == null)
            {
                return NotFound($"Could not find payment with the id {id} for updating");
            }

            var updatedPayment= _repo.Update(id, paymentType);

            return Ok(updatedPayment);

        }

        [HttpPut("/softDelete{id}")]
        public IActionResult SoftDeletePayment(Guid id, PaymentType paymentType)
        {
            var paymentToUpdate = _repo.GetPaymentById(id);
            if (paymentToUpdate == null)
            {
                return NotFound($"Could not find payment with the id {id} for updating");
            }

            var updatedPayment = _repo.SoftRemovePayment(id, paymentType);

            return Ok(updatedPayment);
        }

        [HttpDelete("{id}")]
        public IActionResult HardDeletePayment(Guid id)
        {
            _repo.HardRemove(id);

            return Ok();
        }
    }
}
