export interface EnsembleResponse{
    id: number;
    nomDeLEnsemble : string;
    utilisateurId : number;
    favoris :boolean; 
    createdAt:Date
    vetements : any[];
}