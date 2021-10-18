using scapegoat.DataAccess;
using scapegoat.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scapegoat.Controllers
{
    [Route("api/paymentTypes")]
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

        [HttpGet("{id}")]
        public IActionResult GetPaymentTypeById(Guid id)
        {
            var paymentType = _repo.GetById(id);

            if (paymentType == null)
            {
                return NotFound($"No paymentType with the id {id} was found.");
            }

            return Ok(paymentType);
        }

        [HttpGet("paymentMethods/{paymentMethods}")]
        public IEnumerable<PaymentType> GetPaymentByMethod(PaymentMethod paymentMethod)
        {
            return _repo.GetByMethod(paymentMethod);
        }
    }
}
