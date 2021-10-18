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
            //var date = db.Query<User>(sql, new { })
        }
        public void RemoveUser(Guid Id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"UPDATE Users
                        SET
                        UserType = Null,
                        CustomerTier = Null,
                        FirstName = Null,
                        LastName = Null,
                        CreatedAt = @CreatedAt
                        WHERE Id = @Id";
            var RemovedUser = GetSingleUserById(Id);

            db.Execute(sql, RemovedUser);
        }
        User MapFromReader(SqlDataReader reader)
        {
            var user = new User();
            user.FirstName = reader["FirstName"].ToString();
            user.LastName = reader["LastName"].ToString();
            user.Type = (UserType)reader["UserType"];
            user.Tier = (CustomerTier)reader["CustomerTier"];
            user.CreatedAt = (DateTime)reader[name: "CreatedAt"];
            user.Id = new Guid();
            return user;
        }
    }
}
