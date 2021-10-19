using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using scapegoat.Models;

namespace scapegoat
{
    public class ProductRepository
    {
        string _connectionString;

        public ProductRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Scapegoat");
        }

        internal IEnumerable<Product> GetAll()
        {
            using var db = new SqlConnection(_connectionString);
            var products = db.Query<Product>(@"SELECT * FROM Products");

            return products;
        }
        
        Product MapFromReader(SqlDataReader reader)
        {
            var product = new Product();
            product.ProductId = reader.GetGuid(0);
            product.ProductType = (ProductType)reader["ProductType"];
            product.MerchantId = reader.GetGuid(0);
            product.Price = (decimal)reader["Price"];
            product.Size = reader["Size"].ToString();
            product.CreatedAt = (DateTime)reader["CreatedAt"];

            return product;
        }
    }
}
