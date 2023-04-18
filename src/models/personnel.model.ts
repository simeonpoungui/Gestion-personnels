import { Table_retenue } from "./tableRetenue.model";
import { Table_gain } from './table_gain.model';

export class Personnel{

    nIDPERSONNEL!: string;
    Nom!: string;
    Prenom!: string;
    Civilite!: string;
    DateNaissance!: string;
    LieuNaissance!: string;
    IDNATIONALITE!: string;
    Ville!: string;
    Mobile1!: string;
    Mobile2!: string;
    Courriel!: string;
    IDSERVICE!:string;
    Photo!: string;
    NombreEnfants!: string;
    SituationFamiliale!: string;
    NombrePartsImpots!: string;
    NumCNI!: string;
    ModeRemuneration!: string
    Login!: string;
    Password!: string;
    MontantsRetenuesDefaut!: string;
    RemunerationBase!: string;
    ModifPasswordNecessaire!: string;
    ChampsLibre1!: string;
    ChampsLibre2!: string;
    Signature!: string;
    DateCreation!: string;
    DateModification!: string;
    bAdmin!: string;
    bDroit_GestionAgents!: boolean;
    bDroit_EncaisserDroitsPaiement!: string;
    bDroitSupprimerEcriture!: string;
    bDroitAjouteProduit!: string;
    bActif!: string;
    EtatCompte!: string;
    tab_Retenues!:Array<Table_retenue>;
    tab_Gains!:Array<Table_gain>
    IdentifiantBadge!: string
    NumSecuriteSociale!: string
    NumCompteBancaire!: string;
    bDroit_EncaisserPaiement!: string;
    Nationalite!: string
  static DateNaissance: string;

  }
