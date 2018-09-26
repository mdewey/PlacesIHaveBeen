using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlacesTravelled.DataModel;

namespace PlacesTravelled.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {


        private PlacesTravelledContext db { get; set; }

        public LocationsController(PlacesTravelledContext _db)
        { 
            this.db = _db;
        }


        [HttpGet]
        public IOrderedQueryable<Locations> Get()
        {
            var locations = this.db.Locations.OrderBy(o => o.Place.ToLower())
            .ThenBy(t => t.Date);
            return locations;

        }//END

        [HttpPost]
        public Locations Post([FromBody] Locations place)
        {
            this.db.Locations.Add(place);
            this.db.SaveChanges();
            return place;


        }//END 

        [HttpPatch("{id}")]
        public Locations Patch(int id)
        {
            //Find the location inside the database with the Id
            var location = this.db.Locations.FirstOrDefault(f => f.Id == id);
            //Add 1 to TimesVisited
            location.TimesVisited++;
            //Update Time to Visited Now
            location.Date = DateTime.Now;
            //Save it to Database
            this.db.SaveChanges();
            //Return new information   
            return location;
        }//END

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var location = this.db.Locations.FirstOrDefault(f => f.Id == id);
            this.db.Locations.Remove(location);
            this.db.SaveChanges();
            return Ok(new { success = true });
        }

    } //END public class LocationsController : ControllerBase
} //END namespace PlacesTravelled.Controllers