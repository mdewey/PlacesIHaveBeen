
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlacesTravelled.DataModel;
using PlacesTravelled.ViewModels;

namespace PlacesTravelled.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {

        private PlacesTravelledContext db {get;set;}

        public SearchController(PlacesTravelledContext _db)
        { 
            this.db = _db;
        }

        [HttpGet]
        public IEnumerable<SearchResults> Get([FromQuery]string q)
        {
            // query the database
            var locationResults = this.db
                .Locations
                .Where(w => w.Place.Contains(q) || w.Note.Contains(q))
                .OrderBy(o => o.TimesVisited)
                .Take(5)
                .Select( s => new SearchResults {
                    Text= s.Place, 
                    Id= s.Id, 
                    Type = "location"
                });
            // returns the results

            // var userResults = this.db
            //     .Users
            //     .Where(w => w.UserName.Contains(q))
            //     .Take(5)
            //     .Select( s => new SearchResults {
            //         Text= s.FullName, 
            //         Id= s.Id, 
            //         Type = "person"
            //     });;

            var results = new List<SearchResults>();
            results.AddRange(locationResults);
            // results.AddRange(userResults);


            return results.OrderBy(o => o.Text);

        }
    }
}