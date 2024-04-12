import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Media } from 'src/app/models/media';
import { MediaService } from 'src/app/services/media/media.service';
import { VetementService } from 'src/app/services/vetement/vetement.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() vetement:any;
  @Output() deleteItem = new EventEmitter<void>();
  @Output() vetementUpdated = new EventEmitter<any>();
  media:Media={
    id:0,
    imageUrl:"assets/imgs/shop/product-1-2.jpg"
  };
  constructor(private mediaService:MediaService, private vetementService:VetementService) { }

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

  onDeleteClick(): void {
    this.deleteItem.emit();
  }
  toggleFavoris(): void {
    this.vetementService.marquerVetementCommeFavori(this.vetement.id).subscribe(
      response => { 
        this.vetementUpdated.emit();
      },
      error => {
        console.log(error);
      }
    )
  }
}
