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
        public dynamic RemoveUser(Guid Id, User user)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"update Users
                        Set FirstName = 'Deleted',
                            LastName = 'Deleted',
                            CustomerTier = Null,
                            UserType = Null,
                            CreatedAt = Null,
                        output inserted.*
                        Where id = @id";

            var removedUser = db.QuerySingleOrDefault(sql, user);

            return removedUser;
        }
        //User MapFromReader(SqlDataReader reader)
        //{
        //    var user = new User();
        //    user.FirstName = reader["FirstName"].ToString();
        //    user.LastName = reader["LastName"].ToString();
        //    user.Type = (UserType)reader["UserType"];
        //    user.Tier = (CustomerTier)reader["CustomerTier"];
        //    user.CreatedDate = (DateTime)reader[name: "CreatedAt"];
        //    user.Id = reader["Id"].ToString();
        //    return user;
        //}
    }
}
