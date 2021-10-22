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

        internal object GetSingleProductById(Guid ProductId)
        {
            using var db = new SqlConnection(_connectionString);
            var singleProduct = @"SELECT * FROM Products where ProductId = @ProductId";
            var product = db.QuerySingleOrDefault<Product>(singleProduct, new { ProductId = ProductId});
            if (product == null) return null;
            return product;
        }

        internal void AddProduct(Product product)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"INSERT INTO Products(ProductType, Description, MerchantId, Price, Size, CreatedAt)
                        output inserted.ProductId
                        values (@ProductType, @Description, @MerchantId, @Price, @Size, @CreatedAt)";

            var id = db.ExecuteScalar<Guid>(sql, product);
            product.ProductId = id;
        }

        internal void RemoveProduct(Guid Id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE FROM Products WHERE ProductId = @Id";

            db.Execute(sql, new { Id });
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
