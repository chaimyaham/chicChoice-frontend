export interface Planification {
    id?: number;
    dateDebut: Date;
    dateFin: Date;
    description: string;
    utilisateurId: number;
    meteoId: number;
    ensemblesIds: number[];
  }