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

        internal Product GetSingleProductById(Guid Id)
        {
            using var db = new SqlConnection(_connectionString);
            var singleProduct = @"SELECT * FROM Products WHERE ProductId = @Id";
            var product = db.QuerySingleOrDefault<Product>(singleProduct, new { id = Id});
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


        internal Product UpdateProduct(Guid Id, Product product)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE Products 
                        SET
                        ProductType = @ProductType,
                        Description = @Description, 
                        MerchantId = @MerchantId,
                        Price = @Price,
                        Size = @Size,
                        CreatedAt = @CreatedAt
                        OUTPUT INSERTED.*
                        WHERE ProductId = @ProductId";

            product.ProductId = Id;

            var updatedProduct = db.QuerySingleOrDefault<Product>(sql, product);

            return updatedProduct;
        }

        internal IEnumerable<Product> GetProductsByMerchantId(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var singleProduct = @"SELECT * FROM Products WHERE MerchantId = @Id";
            var product = db.Query<Product>(singleProduct, new { id = id });
            if (product == null) return null;
            return product;
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
