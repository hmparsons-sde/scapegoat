using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scapegoat.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal TotalCost { get; set; }
        public Guid PaymentId { get; set; }
    }
}
