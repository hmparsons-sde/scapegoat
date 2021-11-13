using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using scapegoat.Models;
using Microsoft.Extensions.Configuration;

namespace scapegoat.DataAccess
{
    public class UserRepository
    {
        static List<User> _users = new List<User>();
        readonly string _connectionString;
        public UserRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Scapegoat");
        }
        internal IEnumerable<User> GetAll()
        {
            //var uid = FirebaseUid();
            using var db = new SqlConnection(_connectionString);
            var users = db.Query<User>(@"select * from Users");
            return users;
        }
        public User GetSingleUserById(Guid Id)
        {
            using var db = new SqlConnection(_connectionString);
            var singleUser = @"Select * from Users where id = @Id";
            var user = db.QuerySingleOrDefault<User>(singleUser, new { id = Id });
            if (user == null) return null;
            return user;
        }

        public User GetSingleUserByFBKey(string FirebaseKey)
        {
            using var db = new SqlConnection(_connectionString);
            var singleUser = @"Select * from Users where firebaseKey = @FirebaseKey";
            var user = db.QuerySingleOrDefault<User>(singleUser, new { firebaseKey = FirebaseKey });
            if (user == null) return null;
            return user;
        }
        public void AddUser(User newUser)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"insert into Users(UserType,CustomerTier,FirstName,LastName,AddressLine1,AddressLine2,PostalCode,CityName,State,Country,FirebaseKey,IsAdmin)
                        output inserted.Id
                        values (@UserType,@CustomerTier,@FirstName,@LastName,@AddressLine1,@AddressLine2,@PostalCode,@CityName,@State,@Country,@FirebaseKey,@IsAdmin)";

            var id = db.ExecuteScalar<Guid>(sql, newUser);
            newUser.Id = id;
        }
        internal User SoftRemoveUser(Guid Id, User user)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE Users
                        SET
                        UserType = 2,
                        CustomerTier = 4,
                        IsAdmin = False,
                        FirstName = @FirstName,
                        LastName = @LastName,
                        CreatedAt = @CreatedAt
                        WHERE Id = @Id";
            user.Id = Id;
            var softRemovedUser = db.QueryFirstOrDefault(sql, user);

            return softRemovedUser;
        }
        internal User UpdateUser(Guid Id, User user)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE Users
                        SET
                        UserType = @UserType,
                        CustomerTier = @CustomerTier,
                        FirstName = @FirstName,
                        LastName = @LastName,
                        AddressLine1 = @AddressLine1,
                        AddressLine2 = @AddressLine2,
                        PostalCode = @PostalCode,
                        CityName = @CityName,
                        State = @State,
                        Country = @Country
                        WHERE Id = @Id";

            user.Id = Id;
            var updatedUser = db.QueryFirstOrDefault(sql, user);

            return updatedUser;
        }
        internal void HardDeleteUser(Guid Id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"Delete
                        From Users 
                        Where Id = @Id";

            db.Execute(sql, new { Id });
        }

        // TO DO:
        // Get Users by Type
        internal List<User> GetUserByTypeFromDB(UserType userType)
        {
            using var db = new SqlConnection(_connectionString);
            var uSql = db.Query<User>("Select * from Users where UserType = @userType", new { userType }).ToList();
            return uSql;
        }
        // Get Users by Tier
        internal List<User> GetUserByTierFromDB(CustomerTier customerTier)
        {
            using var db = new SqlConnection(_connectionString);
            var tSql = db.Query<User>("Select * from Users where CustomerTier = @customerTier", new { customerTier }).ToList();
            return tSql;
        }
        //Get Users by Name
        internal List<User> GetUserByNameFromDB(string FirstName)
        {
            using var db = new SqlConnection(_connectionString);
            var unSql = db.Query<User>("Select * from Users where FirstName = @FirstName", new { FirstName }).ToList();
            return unSql;
        }

        internal List<User> GetAdminUsers(bool IsAdmin)
        {
            using var db = new SqlConnection(_connectionString);
            var adminSql = db.Query<User>("Select * from Users where IsAdmin = @IsAdmin", new { IsAdmin }).ToList();
            return adminSql;
        }
        // Get User order history
        public List<User> GetOrdersByUserId(Guid userId)
        {
            var uoSql = @"Select *
                        From Users u
                         Join Orders o
                         ON o.Id = u.id
                         Where UserId = @userId ";

            using var db = new SqlConnection(_connectionString);

            var uOrder = db.Query<User>(uoSql, new { UserId = @userId }).ToList();

            return uOrder;
        }
    }
}
