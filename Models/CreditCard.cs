using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace scapegoat.Models
{
    public class CreditCard
    {
        public Guid Id { get; set; }
        public string CardholderName { get; set; }
        public string CardNumber { get; set; }
        public int CSVCode { get; set; }
        public int ExpirationDate { get; set; }
        public Guid PaymentId { get; set; }
    }

}
