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

              var locations = dBConnection.Locations.OrderBy(o => o.Place.ToLower())
              .ThenBy(t => t.Date);
              return locations;

        }//END

        [HttpPost]
        public Locations Post ([FromBody] Locations place){
            var dbConnection = new PlacesTravelledContext();
            dbConnection.Locations.Add(place);
            dbConnection.SaveChanges();
            return place;
             

        }//END 

        [HttpPut("{id}")]
        public Locations Put (int id) {
            //Find the location inside the database with the Id
            var dbConnection = new PlacesTravelledContext();
            var location = dbConnection.Locations.FirstOrDefault(f => f.Id == id);
            //Add 1 to TimesVisited
            location.TimesVisited++;
            //Save it to Database
            dbConnection.SaveChanges();
            //Return new information   
            return location;         
        }//END

    } //END public class LocationsController : ControllerBase
} //END namespace PlacesTravelled.Controllers