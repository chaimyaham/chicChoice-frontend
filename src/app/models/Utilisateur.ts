export interface Utilisateur {
    email: string;
    password: string;
    nom: string;
    prenom: string;
    username: string;
    sexe: Sexe;
    role: UtilisateurRole;
    ville: string;
    pays: string;
    preferencesStyle?: string;
  }
  
  export enum Sexe {
    HOMME = 'HOMME',
    FEMME = 'FEMME'
  }
  
  export enum UtilisateurRole {
    USER = 'USER',
    ADMIN = 'ADMIN'
  }
  