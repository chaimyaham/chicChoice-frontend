export interface VetementResponse {
    id: number;
    note: string;
    date_d_ajout: Date;
    category: string;
    marque: string;
    mediaId: number;
    userId: number;
    favoris: boolean;
    couleurId: string;
    ensembles: any[];   
  }