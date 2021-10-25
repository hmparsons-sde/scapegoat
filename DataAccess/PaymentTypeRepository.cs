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
        internal IEnumerable<PaymentTypeJoin> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select *
                                from orders o
                                join users u
                                on o.UserId = u.Id
                                join paymentType pt
                                on pt.Id = o.PaymentId";

            var payments = db.Query<PaymentTypeJoin, Order, User, PaymentTypeJoin>(sqlString, Map, splitOn: "id");
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

        internal IEnumerable<PaymentType> GetPaymentByUserId(Guid userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select * from PaymentType where UserId = @UserId";

            var userPayments = db.Query<PaymentType>(sqlString, new { UserId = userId });

            return userPayments;
        }

        //internal PaymentType Get(Guid id)
        //{
        //    //create a connection
        //    using var db = new SqlConnection(_connectionString);

        //    var sql = @"select *
        //                from PaymentType p
	       //                 join Users u 
		      //                  on u.Id = p.UserId
        //                where p.id = @id";

        //    //multi-mapping doesn't work for any other kind of dapper call,
        //    //so we take the collection and turn it into one item ourselves
        //    var payments = db.QueryAsync<PaymentType, User>(sql, MapFromReader, new { id }, splitOn: "Id");

        //    return payments.FirstOrDefault();
        //}

        internal void AddPaymentMethod(PaymentType newPayment)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"insert into PaymentType(PaymentMethod,AccountNumber,UserId)
                        output inserted.Id
                        values (@PaymentMethod,@AccountNumber,@UserId)";

            //var sql = @"insert into [dbo].[PaymentType]
            //                ([PaymentMethod]
            //                ,[AccountNumber]
            //                ,[UserId])
            //            Output inserted.Id
            //            values 
            //                (@PaymentMethod
            //                ,@AccountNumber
            //                ,@UserId)";

            //var parameters = new
            //{
            //    PaymentMethod = paymentType.PaymentMethod,
            //    AccountNumber = paymentType.AccountNumber,
            //    UserId = paymentType.UserId
            //};

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

        internal void Remove(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"Delete 
                        From PaymentType 
                        Where Id = @id";

            db.Execute(sql, new { id });
        }
        //PaymentType MapFromReader(SqlDataReader reader)
        //{
        //    var paymentType = new PaymentType();
        //    paymentType.PaymentMethod = (PaymentMethod)reader["LastName"];
        //    paymentType.AccountNumber = reader["AccountNumber"].ToString();
        //    paymentType.UserId = new Guid();
        //    return paymentType;
        //}

        PaymentTypeJoin Map(PaymentTypeJoin paymentType, User user, Order order)
        {
            paymentType.User = user;
            paymentType.Order = (IEnumerable<Order>)order;
            return paymentType;
        }
    }
}
