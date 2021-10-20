using System;

namespace scapegoat.Models
{
    public class Product
    {
        public Guid ProductId { get; set; }
        public ProductType ProductType { get; set; }
        public string Description { get; set; }
        public Guid MerchantId { get; set; }
        public decimal Price { get; set; }
        public string Size { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    public enum ProductType
    {
        Single,
        SmallHerd,
        LargeHerd,
        Bloodthirsty
    }
}
