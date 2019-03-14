import { Component, OnInit } from '@angular/core';
// import { MouseEvent } from '@agm/core';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {



  ngOnInit()
  {

  }

    // initial center position for the map
    // lat: number = 30.0341382;
    // lng: number = 31.3012754;
    // zoom: number = 13;
    // markers: marker[] = [
  	//   {
  	// 	  lat: 30.0341382,
  	// 	  lng: 31.3012754,
  	// 	  label: 'Merck Egypt'
  	//   }
    // ]
  }

  // just an interface for type safety.
  interface marker {
  	lat: number;
  	lng: number;
  	label?: string;
  }
