using System;
using System.Collections.Generic;
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

        [HttpGet("{Id}")]
        public IActionResult GetProductById(Guid Id)
        {
            var product = _repo.GetSingleProductById(Id);

            if (product == null)
            {
                return NotFound($"No product with {Id} was found.");
            }

            return Ok(product);
        }

        [HttpGet("ProductTypes/{productType}")]
        public List<Product> GetProductsByType(ProductType productType)
        {
            return _repo.GetProductsByType(productType);
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

        [HttpPut("{Id}")]
        public IActionResult UpdateProduct(Guid Id, Product product)
        {
            var productToUpdate = _repo.GetSingleProductById(Id);


            if (productToUpdate == null)
            {
                return NotFound($"Could not find product with the id {Id} for updating");
            }

            var updatedProduct = _repo.UpdateProduct(Id, product);

            return Ok(updatedProduct);
        }
    }
}