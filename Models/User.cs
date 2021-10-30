using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace scapegoat.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreatedAt { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserType UserType { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public CustomerTier CustomerTier { get; set; }
    }

    public enum UserType
    {
        [EnumMember(Value = "Buyer")]
        Buyer,
        [EnumMember(Value = "Seller")]
        Seller,
        [EnumMember(Value = "Removed User")]
        DeletedUser
    }

    public enum CustomerTier
    {
        [EnumMember(Value = "Individual")]
        Individual,
        [EnumMember(Value = "Small Business")]
        SmallBusiness,
        [EnumMember(Value = "Mid-sized Business")]
        MediumBusiness,
        [EnumMember(Value = "Enterprise")]
        Enterprise,
        [EnumMember(Value = "Removed User")]
        DeletedUser
    }
}
