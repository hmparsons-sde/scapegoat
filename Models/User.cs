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
        public DateTime CreatedDate { get; set; }
        public UserType Type { get; set; }
        public CustomerTier Tier { get; set; }
    }

    public enum UserType
    {
        Buyer,
        Seller
    }

    public enum CustomerTier
    {
        Individual,
        SmallBusiness,
        MediumBusiness,
        Enterprise
    }
}
