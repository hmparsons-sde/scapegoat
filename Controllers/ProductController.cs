using System;
using Microsoft.AspNetCore.Mvc;
using scapegoat.Models;

namespace scapegoat.Controllers
{
    [Route("api/Products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        ProductRepository _repo;

        public ProductController(ProductRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{ProductId}")]
        public IActionResult GetProductById(Guid ProductId)
        {
            var product = _repo.GetSingleProductById(ProductId);
            if (product == null)
            {
                return NotFound($"No product with {ProductId} was found.");
            }

            return Ok(product);
        }

        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
            if (string.IsNullOrEmpty(product.Description))
            {
                return BadRequest("Description is a required field");
            }

            _repo.AddProduct(product);

            return Created($"/api/Products/{product.ProductId}", product);
        }

        [HttpDelete("{Id}")]
        public IActionResult DeleteProduct(Guid Id)
        {
            _repo.RemoveProduct(Id);

            return Ok();
        }
    }
}