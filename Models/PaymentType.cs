using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace scapegoat.Models
{
    public class PaymentType
    {
        public Guid Id { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public PaymentMethod PaymentMethod { get; set; }
        public string AccountNumber { get; set; }
        public Guid UserId { get; set; }
        public CreditCard CreditCard { get; set; }
    }

    public enum PaymentMethod
    {
        [EnumMember(Value = "CreditCard")]
        CreditCard,
        [EnumMember(Value = "DebitCard")]
        DebitCard,
        [EnumMember(Value = "PayPal")]
        PayPal,
        [EnumMember(Value = "BankAccount")]
        BankAccount,
        [EnumMember(Value = "CryptoCurrency")]
        CryptoCurrency,
        [EnumMember(Value = "RemovedPayment")]
        RemovedPayment,
    }
}
