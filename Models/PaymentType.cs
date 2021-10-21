using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scapegoat.Models
{
    public class PaymentType
    {
        public Guid Id { get; set; }

        public PaymentMethod PaymentMethod { get; set; }
        public string AccountNumber { get; set; }
        public Guid UserId { get; set; }
    }

    public enum PaymentMethod
    {
        CreditCard,
        DebitCard,
        PayPal,
        BankAccount,
        CryptoCurrency,
    }
}
