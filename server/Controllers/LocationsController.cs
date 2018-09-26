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

        [HttpPatch("{id}")]
        public Locations Patch (int id) {
            //Find the location inside the database with the Id
            var dbConnection = new PlacesTravelledContext();
            var location = dbConnection.Locations.FirstOrDefault(f => f.Id == id);
            //Add 1 to TimesVisited
            location.TimesVisited++;
            //Update Time to Visited Now
            location.Date = DateTime.Now;
            //Save it to Database
            dbConnection.SaveChanges();
            //Return new information   
            return location;         
        }//END

        [HttpDelete("{id}")]
        public ActionResult Delete (int id) {
            var dbConnection = new PlacesTravelledContext();
            var location = dbConnection.Locations.FirstOrDefault(f => f.Id == id);
            dbConnection.Locations.Remove(location);
            dbConnection.SaveChanges();
            return Ok(new {success = true });
        }

    } //END public class LocationsController : ControllerBase
} //END namespace PlacesTravelled.Controllers