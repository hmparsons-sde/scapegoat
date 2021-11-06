using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace scapegoat.Controllers
{
    public class FirebaseBaseController : ControllerBase
    {
        //public string GetFirebaseUid()
        //{
        //    return User.FindFirst(claim => claim.Type == "user_id").Value;
        //}

        public string FirebaseUid => User.FindFirst(claim => claim.Type == "user_id").Value;
    }
}
