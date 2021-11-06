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

            var payments = db.Query<PaymentType>(@"select * from PaymentType");

            return payments;
        }

        internal PaymentType GetPaymentById(Guid id)
        { 
            using var db = new SqlConnection(_connectionString);
            var singlePayment = @"select * from PaymentType where Id = @id";
            var foundPayment = db.QueryFirstOrDefault<PaymentType>(singlePayment, new { id = id });
            if (foundPayment == null) return null;
            return foundPayment;
        }

        internal IEnumerable<PaymentTypeJoin> GetPaymentByUserId(Guid userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"SELECT PaymentType.*, Users.* 
                    FROM
                        PaymentType AS PaymentType
                    INNER JOIN Users as Users
                        ON PaymentType.UserId = Users.Id where PaymentType.UserId = @UserId";

            var userPayments = db.Query<PaymentTypeJoin, User, PaymentTypeJoin>(sqlString, Map, new { userId = userId }, splitOn: "Id");

            return userPayments;
        }


        internal void AddPaymentMethod(PaymentType newPayment)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"insert into PaymentType(PaymentMethod,AccountNumber,UserId)
                        output inserted.Id
                        values (@PaymentMethod,@AccountNumber,@UserId)";

            var id = db.ExecuteScalar<Guid>(sql, newPayment);
            newPayment.Id = id;
        }

        internal PaymentType Update(Guid id, PaymentType paymentType)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"update PaymentType 
                        Set PaymentMethod = @paymentMethod,
                            AccountNumber = @accountNumber
                        output inserted.*
                        Where id = @id";

            paymentType.Id = id;
            var updatedPayment = db.QuerySingleOrDefault<PaymentType>(sql, paymentType);

            return updatedPayment;
        }

        internal PaymentType SoftRemovePayment(Guid id, PaymentType paymentType)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE PaymentType
                        SET
                        PaymentMethod = 5,
                        AccountNumber = @AccountNumber
                        WHERE Id = @Id";
            paymentType.Id = id;
            var SoftRemovePayment = db.QueryFirstOrDefault(sql, paymentType);

            return SoftRemovePayment;
        }

        internal void HardRemove(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"Delete 
                        From PaymentType 
                        Where Id = @id";

            db.Execute(sql, new { id });
        }
 
        PaymentTypeJoin Map(PaymentTypeJoin paymentType, User user)
        {
            paymentType.User = user;
            return paymentType;
        }
    }
}
