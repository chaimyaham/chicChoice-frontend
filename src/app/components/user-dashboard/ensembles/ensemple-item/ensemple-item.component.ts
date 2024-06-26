import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Media } from 'src/app/models/media';
import { EnsembleService } from 'src/app/services/ensembles/ensemble.service';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-ensemple-item',
  templateUrl: './ensemple-item.component.html',
  styleUrls: ['./ensemple-item.component.css']
})
export class EnsempleItemComponent implements OnInit {
  @Input() ensemble:any;
  @Output() deleteItem = new EventEmitter<void>();
  @Output() ensembleUpdated = new EventEmitter<any>();
  
  mediaDetailsList: Media[] = [];
  isFavoris: boolean = false;
  isHovered: boolean = false;
  
  
  constructor(private mediaService : MediaService,private ensembleService:EnsembleService,private router:Router) { }

  ngOnInit(): void {
   
    this.isFavoris = this.ensemble.favoris ;
    this.ensemble.vetements.forEach((vetement: any) => {
      const mediaId = vetement.mediaId;
      this.mediaService.getMediaById(mediaId).subscribe(
        (mediaDetails: any) => {
          this.mediaDetailsList.push(mediaDetails);
        },
        error => {
          console.error("Erreur lors de la récupération du media:", error);
        }
      );
    });

  }
  toggleFavoris(): void {
    this.ensembleService.marquerEnsembleCommeFavori(this.ensemble.id).subscribe(
      response => { 
        this.isFavoris =!this.isFavoris;
        this.ensembleUpdated.emit();
      },
      error => {
        console.log(error);
      }
    )
  }  
  onDeleteClick(): void {
    this.deleteItem.emit();
  }
  updateItem(id:number){
    this.router.navigate(['/dashboard/ensembles/' + id]);
  }
  

}
