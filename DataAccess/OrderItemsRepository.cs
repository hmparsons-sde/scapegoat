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

        //internal IEnumerable<OrderItem> GetAll()
        //{
        //    using var db = new SqlConnection(_connectionString);

        //    var sqlString = @"select *
        //                        from OrderItems oi
        //                        left join Orders o
        //                        on o.id = oi.OrderId
        //                        join Products p
        //                        on oi.ProductId = p.ProductId
        //                        join users u
        //                        on o.userId = u.Id
        //                        join users uu
        //                        on uu.Id = p.MerchantId";

        //    var orderItems = db.Query<OrderItem>(sqlString);

        //    return orderItems;
        //}

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

        internal OrderItem GetById(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select * from OrderItems where Id = @id";

            var orderItem = db.QueryFirstOrDefault<OrderItem>(sqlString, new { Id = id });

            if (orderItem == null) return null;

            return orderItem;
        }


    }
}
