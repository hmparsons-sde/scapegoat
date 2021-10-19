using scapegoat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace scapegoat.DataAccess
{
    public class PaymentTypeRepository
    {
        string _connectionString;
        public PaymentTypeRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Scapegoat");
        }
        internal IEnumerable<PaymentType> GetAll()
        {
            using var db = new SqlConnection(_connectionString);
            var sqlString = @"select * from PaymentTypes";

            var paymentTypes = db.Query<PaymentType>(sqlString);

            return paymentTypes;
        }

        internal PaymentType GetById(Guid id)
        { 
            using var db = new SqlConnection(_connectionString);
            var sqlString = @"select * from PaymentTypes where Id = @id";
            var paymentType = db.QueryFirstOrDefault<PaymentType>(sqlString, new { id = id });
            if (paymentType == null) return null;
            return paymentType;
        }

        internal IEnumerable<PaymentType> GetPaymentByUserId(Guid userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select * from PaymentTypes where UserId = @UserId";

            var paymentType = db.Query<PaymentType>(sqlString, new { UserId = userId });

            return paymentType;
        }
    }
}
