using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scapegoat.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserType UserType { get; set; }
        public CustomerTier CustomerTier { get; set; }
    }

    public enum UserType
    {
        Buyer,
        Seller,
        DeletedUser
    }

    public enum CustomerTier
    {
        Individual,
        SmallBusiness,
        MediumBusiness,
        Enterprise,
        DeletedUser
    }
}
