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
    public class OrdersRepository
    {
        readonly string _connectionString;
        public OrdersRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Scapegoat");
        }

        internal IEnumerable<Order> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select * from Orders";

            var orders = db.Query<Order>(sqlString);

            return orders;
        }

        internal Order GetById(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select * from Orders where Id = @id";

            var order = db.QueryFirstOrDefault<Order>(sqlString, new { id = id });

            if (order == null) return null;

            return order;
        }

        internal IEnumerable<Order> GetByUserId(Guid userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select * from Orders where UserId = @UserId";

            var orders = db.Query<Order>(sqlString, new { UserId = userId });

            return orders;
        }

        internal void Add(Order newOrder)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"insert into Orders(UserId, Status, CreatedAt, TotalCost, PaymentId)
                                    output inserted.Id
                                    values(@UserId, @Status, @CreatedAt, @TotalCost, @PaymentId)";

            var id = db.ExecuteScalar<Guid>(sql, newOrder);
            newOrder.Id = id;
        }

        internal Order Update(Guid id, Order order)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"update Orders Set
                                        UserId = @UserId, 
                                        Status = @Status,
                                        CreatedAt = @CreatedAt,
                                        TotalCost = @TotalCost,
                                        PaymentId = @PaymentId
                                     output inserted.*
                                     Where id = @id";

            order.Id = id;
            var updatedOrder = db.QuerySingleOrDefault<Order>(sql, order);
            return updatedOrder;

        }

        //TODO: update all methods to get any needed data off other tables
        //TODO: add delete method

    }
}
