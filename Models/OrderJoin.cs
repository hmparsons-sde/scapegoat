using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scapegoat.Models
{
    public class OrderJoin
    {
        public Guid Id { get; set; }
        public User User { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal TotalCost { get; set; }
        public PaymentType Payment { get; set; }

        public IEnumerable<OrderItemJoin> LineItems { get; set; }
    }
}
