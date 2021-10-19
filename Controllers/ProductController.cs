using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace scapegoat.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        ProductRepository _repo;

        public ProductController(ProductRepository repo)
        {
            _repo = repo;
        }



        // GET: api/<ProductController>
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            return Ok(_repo.GetAll());
        }
    }
}
