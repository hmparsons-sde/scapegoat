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

            var order = db.QueryFirstOrDefault<Order>(sqlString, new { id = id } );

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
    }
}
