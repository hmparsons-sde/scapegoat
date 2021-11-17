using System;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace scapegoat.Models
{
    public class Product
    {
        public Guid ProductId { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ProductType ProductType { get; set; }
        public string Description { get; set; }
        public Guid MerchantId { get; set; }
        public decimal Price { get; set; }
        public string Size { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string ProductImage { get; set; }
    }

    public enum ProductType
    {
        [EnumMember(Value = "Single Goat")]
        Single,
        [EnumMember(Value = "Small Herd")]
        SmallHerd,
        [EnumMember(Value = "Large Herd")]
        LargeHerd
    }
}
