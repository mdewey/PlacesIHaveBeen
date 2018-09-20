using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlacesTravelled.DataModel;

namespace PlacesTravelled.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase {
        [HttpGet]
        public IOrderedQueryable<Locations> Get () {
              var dBConnection = new PlacesTravelledContext();

              var locations = dBConnection.Locations.OrderByDescending(o => o.Date);
              return locations;

        }//END

        [HttpPost]
        public string Post ([FromBody] string place){


            return "Successful Post "+place;

        }




    } //END public class LocationsController : ControllerBase
} //END namespace PlacesTravelled.Controllers