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

        private PlacesTravelledContext db = null;

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
    } //END public class LocationsController : ControllerBase
} //END namespace PlacesTravelled.Controllers