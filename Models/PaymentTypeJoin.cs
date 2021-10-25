using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scapegoat.Models
{
    public class PaymentTypeJoin
    {
        public Guid Id { get; set; }

        public PaymentMethod PaymentMethod { get; set; }
        public string AccountNumber { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public IEnumerable<Order> Order { get; set; }
    }

}
