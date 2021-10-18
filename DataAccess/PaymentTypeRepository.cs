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

        public PaymentType GetByMethod(Guid id)
        {
            //create connection 
            using var db = new SqlConnection(_connectionString);
            var sqlString = @"select * from PaymentTypes where PaymentMethod = @PaymentMethod";


            var paymentType = db.Query<PaymentType>(sqlString, new { id = id });

            return (PaymentType)paymentType;
        }
    }
}
