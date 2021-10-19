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
        readonly string _connectionString;
        public PaymentTypeRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Scapegoat");
        }
        internal IEnumerable<PaymentType> GetAll()
        {
            using var db = new SqlConnection(_connectionString);
            var paymentTypes = db.Query<PaymentType>(@"select * from PaymentType");
            return paymentTypes;
        }

        internal PaymentType GetPaymentById(Guid id)
        { 
            using var db = new SqlConnection(_connectionString);
            var singlePayment = @"select * from PaymentType where Id = @id";
            var foundPayment = db.QueryFirstOrDefault<PaymentType>(singlePayment, new { id = id });
            if (foundPayment == null) return null;
            return foundPayment;
        }

        internal IEnumerable<PaymentType> GetPaymentByUserId(Guid userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select * from PaymentType where UserId = @UserId";

            var userPayments = db.Query<PaymentType>(sqlString, new { UserId = userId });

            return userPayments;
        }
        PaymentType MapFromReader(SqlDataReader reader)
        {
            var paymentType = new PaymentType();
            paymentType.PaymentMethod = (PaymentMethod)reader["LastName"];
            paymentType.AccountNumber = (int)reader["AccountNumber"];
            paymentType.UserId = new Guid();
            return paymentType;
        }
    }
}
