import { Component, OnInit, Input } from '@angular/core';
import { Media } from 'src/app/models/media';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() vetement:any;
  media!:Media;
  constructor(private mediaService:MediaService) { }

  ngOnInit(): void {
    console.log("frromm child")
    console.log(this.vetement);
    this.getMediaByID();
    
  }
  getMediaByID(){
    console.log(this.vetement.mediaId);
    this.mediaService.getMediaById(this.vetement.mediaId).subscribe(
      (data:Media) => {
        this.media=data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
