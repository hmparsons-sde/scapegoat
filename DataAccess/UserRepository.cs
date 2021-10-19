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
        readonly string _connectionString;
        public UserRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Scapegoat");
        }
        public IEnumerable<User> GetAll()
        {
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
        public void AddUser(User newUser)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"insert into Users(UserType,CustomerTier,FirstName,LastName,CreatedAt)
                        output inserted.Id
                        values (@Type,@Tier,@FirstName,@LastName,@CreatedAt)";

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
                        FirstName = @FirstName,
                        LastName = @LastName,
                        CreatedAt = @CreatedAt
                        WHERE Id = @Id";
            user.Id = Id;
            var softRemovedUser = db.QueryFirstOrDefault(sql, user);

            return softRemovedUser;
        }

        internal void HardDeleteUser(Guid Id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"Delete
                        From Users 
                        Where Id = @Id";

            db.Execute(sql, new { Id });
        }
            //User MapFromReader(SqlDataReader reader)
            //{
            //    var user = new User();
            //    user.FirstName = reader["FirstName"].ToString();
            //    user.LastName = reader["LastName"].ToString();
            //    user.Type = (UserType)reader["UserType"];
            //    user.Tier = (CustomerTier)reader["CustomerTier"];
            //    user.CreatedAt = (DateTime)reader[name: "CreatedAt"];
            //    user.Id = new Guid();
            //    return user;
            //}
        }
}
