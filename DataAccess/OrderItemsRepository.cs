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

            var sqlString = @"select * from OrderItems";

            var orderItems = db.Query<OrderItem>(sqlString);

            return orderItems;
        }
    }
}
