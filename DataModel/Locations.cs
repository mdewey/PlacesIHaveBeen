using System;

namespace PlacesTravelled.DataModel {
    public class Locations {
        public int Id { get; set; }
        public string Place { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;

        public string Note { get; set; }

        public bool WillIGoBack { get; set; }

    }
}