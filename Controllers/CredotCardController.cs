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
    [Route("api/CreditCard")]
    [ApiController]
    public class CreditCardController : ControllerBase
    {
        CreditCardRepository _repo;
        public CreditCardController(CreditCardRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllCreditCards()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("/singlePayment/{id}")]
        public IActionResult GetSingleCreditCardById(Guid id)
        {
            var paymentType = _repo.GetCreditCardById(id);

            if (paymentType == null)
            {
                return NotFound($"No paymentType with the id {id} was found.");
            }

            return Ok(paymentType);
        }

        //[HttpGet("userPaymentMethods/{UserId}")]
        //public IActionResult GetPaymentByUserId(Guid UserId)
        //{
        //    return Ok(_repo.GetPaymentByUserId(UserId));
        //}

        [HttpPost]
        public IActionResult AddCreditCardToDB(CreditCard newCreditCard)
        {
            if (string.IsNullOrEmpty(newCreditCard.CardNumber) /*|| string.IsNullOrEmpty(newPayment.PaymentMethod)*/)
            {
                return BadRequest("Payment Method and Account Number are required fields");
            }

            _repo.AddCreditCard(newCreditCard);

            return Created($"/api/CreditCard/{newCreditCard.Id}", newCreditCard);
        }

        //[HttpPut("{id}")]
        //public IActionResult UpdatePayment(Guid id, CreditCard paymentType)
        //{
        //    var paymentToUpdate = _repo.GetPaymentById(id);

        //    if (paymentToUpdate == null)
        //    {
        //        return NotFound($"Could not find payment with the id {id} for updating");
        //    }

        //    var updatedPayment= _repo.Update(id, paymentType);

        //    return Ok(updatedPayment);

        //}

        //[HttpPut("/softDelete{id}")]
        //public IActionResult SoftDeletePayment(Guid id, CreditCard paymentType)
        //{
        //    var paymentToUpdate = _repo.GetPaymentById(id);
        //    if (paymentToUpdate == null)
        //    {
        //        return NotFound($"Could not find payment with the id {id} for updating");
        //    }

        //    var updatedPayment = _repo.SoftRemovePayment(id, paymentType);

        //    return Ok(updatedPayment);
        //}

        //[HttpDelete("{id}")]
        //public IActionResult HardDeletePayment(Guid id)
        //{
        //    _repo.HardRemove(id);

        //    return Ok();
        //}
    }
}
