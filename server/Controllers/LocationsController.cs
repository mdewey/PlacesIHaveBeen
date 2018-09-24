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
        public Locations Post ([FromBody] Locations place){
            var dbConnection = new PlacesTravelledContext();
            dbConnection.Locations.Add(place);
            dbConnection.SaveChanges();
            return place;
             

        }//END 




    } //END public class LocationsController : ControllerBase
} //END namespace PlacesTravelled.Controllers