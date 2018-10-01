using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlacesTravelled.DataModel;

using Microsoft.AspNetCore.Authorization;


namespace PlacesTravelled.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LocationsController : ControllerBase
    {

        private string _getUserId(System.Security.Claims.ClaimsPrincipal user)
        {
            var userId = user.Claims.First(f => f.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
            return userId;
        }
        
        private PlacesTravelledContext db { get; set; }

        public LocationsController(PlacesTravelledContext _db)
        { 
            this.db = _db;
        }


        [HttpGet]
        public IOrderedQueryable<Locations> Get()
        {
            var _userId = _getUserId(User);
            var locations = this.db.Locations.Where(w => w.UserId == _userId).OrderBy(o => o.Place.ToLower())
            .ThenBy(t => t.Date);
            return locations;

        }//END

        [HttpPost]
        public Locations Post([FromBody] Locations place)
        {
            var _userId = _getUserId(User);
            place.UserId = _userId;
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