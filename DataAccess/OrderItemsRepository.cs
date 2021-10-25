using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using scapegoat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scapegoat.DataAccess
{
    public class OrderItemsRepository
    {
        readonly string _connectionString;
        public OrderItemsRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Scapegoat");
        }

        internal IEnumerable<OrderItem> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select *
                                from OrderItems";

            var orderItems = db.Query<OrderItem>(sqlString);

            return orderItems;
        }

        internal IEnumerable<OrderItem> GetByProductId(Guid productId)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select * from OrderItems where ProductId = @productId";

            var orderItem = db.Query<OrderItem>(sqlString, new { productId = productId });

            if (orderItem == null) return null;

            return orderItem;
        }

        internal IEnumerable<OrderItem> GetByOrderId(Guid orderId)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select * from OrderItems where OrderId = @orderId";

            var orderItem = db.Query<OrderItem>(sqlString, new { OrderId = orderId });

            if (orderItem == null) return null;

            return orderItem;
        }

        internal void Add(OrderItem newOrderItem)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"insert into OrderItems(ProductId, Quantity, OrderId)
                                    output inserted.Id
                                    values(@ProductId, @Quantity, @OrderId)";

            var id = db.ExecuteScalar<Guid>(sql, newOrderItem);
            newOrderItem.Id = id;
        }

        internal void Remove(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"Delete From OrderItems Where Id = @id";

            db.Execute(sql, new { id });
        }

        internal OrderItem Update(Guid id, OrderItem orderItem)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"update OrderItems Set
                                        ProductId = @ProductId, 
                                        Quantity = @Quantity,
                                        OrderId = @OrderId
                                     output inserted.*
                                     Where id = @id";

            orderItem.Id = id;
            var updatedOrderItem = db.QuerySingleOrDefault<OrderItem>(sql, orderItem);
            return updatedOrderItem;

        }

        internal OrderItem GetById(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select * from OrderItems where Id = @id";

            var orderItem = db.Query<OrderItem>(sqlString, new { Id = id });

            if (orderItem == null) return null;

            return orderItem.FirstOrDefault();
        }


    }
}
