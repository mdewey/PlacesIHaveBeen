using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PlacesTravelled.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase {
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get () {
            return new List<string> {"Hello", "World"};
        }

    } //END public class LocationsController : ControllerBase
} //END namespace PlacesTravelled.Controllers