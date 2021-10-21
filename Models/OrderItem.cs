using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scapegoat.Models
{
    public class OrderItem
    {
        public Guid Id { get; set; }
        public Guid OrderId { get; set; }
        public Guid ProductId { get; set; }
        public int  Quantity { get; set; }

    }
}
