using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scapegoat.Controllers
{
    public class FirebaseBaseController : Controller
    {
        public string GetFirebaseUid()
        {
            return User.FindFirst(claim => claim.Type == "user_id").Value;
        }
    }
}
