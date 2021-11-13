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
        public string FirebaseKey { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreatedAt { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserType UserType { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public CustomerTier CustomerTier { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string PostalCode { get; set; }
        public string CityName { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public bool? IsAdmin { get; set; }
    }

    public enum UserType
    {
        [EnumMember(Value = "Customer")]
        Customer,
        [EnumMember(Value = "Merchant")]
        Merchant,
        [EnumMember(Value = "Removed")]
        Removed
    }

    public enum CustomerTier
    {
        [EnumMember(Value = "Individual")]
        Individual,
        [EnumMember(Value = "Small Business")]
        Small,
        [EnumMember(Value = "Mid-sized Business")]
        Medium,
        [EnumMember(Value = "Enterprise")]
        Enterprise,
        [EnumMember(Value = "Removed")]
        Removed
    }
}
