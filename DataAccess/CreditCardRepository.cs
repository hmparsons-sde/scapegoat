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
    public class CreditCardRepository
    {
        readonly string _connectionString;
        public CreditCardRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Scapegoat");
        }
        internal IEnumerable<CreditCard> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var payments = db.Query<CreditCard>(@"select * from CreditCard");

            return payments;
        }

        internal CreditCard GetCreditCardById(Guid id)
        { 
            using var db = new SqlConnection(_connectionString);
            var singleCreditCard = @"select * from CreditCard where Id = @id";
            var foundCreditCard = db.QueryFirstOrDefault<CreditCard>(singleCreditCard, new { id = id });
            if (foundCreditCard == null) return null;
            return foundCreditCard;
        }

        //internal IEnumerable<CreditCard> GetPaymentByUserId(Guid userId)
        //{
        //    using var db = new SqlConnection(_connectionString);

        //    var sqlString = @"SELECT CreditCard.*, Users.Id, Users.firstName 
        //            FROM
        //                CreditCard AS CreditCard
        //            INNER JOIN Users as Users
        //                ON CreditCard.UserId = Users.Id where CreditCard.UserId = @UserId";

        //    var userPayments = db.Query<PaymentTypeJoin, User, PaymentTypeJoin>(sqlString, Map, new { userId = userId }, splitOn: "Id");

        //    return userPayments;
        //}


        internal void AddCreditCard(CreditCard newCreditCard)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"insert into CreditCard(CardholderName,CardNumber,CSVCode,ExpirationDate,PaymentId)
                        output inserted.Id
                        values (@CardholderName,@CardNumber,@CSVCode,@ExpirationDate,@PaymentId)";

            var id = db.ExecuteScalar<Guid>(sql, newCreditCard);
            newCreditCard.Id = id;
        }

        //internal CreditCard Update(Guid id, CreditCard paymentType)
        //{
        //    using var db = new SqlConnection(_connectionString);

        //    var sql = @"update CreditCard 
        //                Set PaymentMethod = @paymentMethod,
        //                    AccountNumber = @accountNumber
        //                output inserted.*
        //                Where id = @id";

        //    paymentType.Id = id;
        //    var updatedPayment = db.QuerySingleOrDefault<CreditCard>(sql, paymentType);

        //    return updatedPayment;
        //}

        //internal CreditCard SoftRemovePayment(Guid id, CreditCard paymentType)
        //{
        //    using var db = new SqlConnection(_connectionString);

        //    var sql = @"UPDATE CreditCard
        //                SET
        //                PaymentMethod = 5,
        //                AccountNumber = @AccountNumber
        //                WHERE Id = @Id";
        //    paymentType.Id = id;
        //    var SoftRemovePayment = db.QueryFirstOrDefault(sql, paymentType);

        //    return SoftRemovePayment;
        //}

        //internal void HardRemove(Guid id)
        //{
        //    using var db = new SqlConnection(_connectionString);
        //    var sql = @"Delete 
        //                From CreditCard 
        //                Where Id = @id";

        //    db.Execute(sql, new { id });
        //}
 
        //PaymentTypeJoin Map(PaymentTypeJoin paymentType, User user)
        //{
        //    paymentType.User = user;
        //    return paymentType;
        //}
    }
}
