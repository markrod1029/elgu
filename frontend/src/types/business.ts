// types/business.ts
export interface Business {
  businessid_: string;
  businessname_: string;
  repname_: string;
  longlat_: string;
  barangay_: string;
  municipality_: string;
  province_: string;
  street_: string;
  houseno_: string;
  dtiexpiry_: string | null;
  secexpiry_: string | null;
  cdaexpiry_: string | null;
}

export interface BusinessNameInfo {
  businessid_: string;
  ismain_: boolean;
  isforeign_: boolean;
  businessname_: string;
  dateestablished_: string;
  ownershiptype_: string;
  registeredceo_: string;
  tradename_: string;
  isfranchise_: boolean;
  ismarketstall: boolean;
  iscommercialbuilding: boolean;
  marketstall_: string;
  businessbuildingid_: string;
  buildingspace_: string;
  waiveragreement_: boolean;
  status_: boolean;
  datetimestamp: string;
}

export interface BusinessAddress {
  province_: string;
  municipality_: string;
  barangay_: string;
  subdivision_: string;
  street_: string;
  buildingname_: string;
  houseno_: string;
  phaseblock_: string;
  lot_: string;
  landmark_: string;
  longlat_: string;
  telno_: string;
  cellno_: string;
  faxno_: string;
  email_: string;
  tin_: string;
}

export interface BusinessRepresentative {
  repid: string;
  repname_: string;
  repposition_: string;
  ownershiptype_: string;
  firstname_: string;
  middlename_: string;
  lastname_: string;
  suffixname_: string;
  birthdate_: string;
  gender_: string;
  civilstatus_: string;
  nationality_: string;
  telno_: string;
  cellno_: string;
  faxno_: string;
  email_: string;
  tin_: string;
  outsidecity_: boolean;
  province_: string;
  municipality_: string;
  barangay_: string;
  subdivision_: string;
  street_: string;
  buildingname_: string;
  houseno_: string;
  block_: string;
  lot_: string;
  landmark_: string;
  status_: boolean;
}

export interface BusinessRequirements {
  dtino_: string;
  dtiissued_: string;
  dtiexpiry_: string;
  secno_: string;
  secissued_: string;
  secexpiry_: string;
  cdano_: string;
  cdaissued_: string;
  cdaexpiry_: string;
  localclearanceno_: string;
  localclearancedate_: string;
  cedulano_: string;
  cedulaplaceissued_: string;
  cedulaissued_: string;
  cedulaamount_: string;
  boino_: string;
  boiissued_: string;
  boiexpiry_: string;
  sssno_: string;
  sssdatereg_: string;
  pagibigno_: string;
  pagibigreg_: string;
  phicno_: string;
  phicreg_: string;
  pezaregistered_: boolean;
  pezaregno_: string;
  pezaissued_: string;
  pezaexpiry_: string;
}

export interface BusinessDetails {
  businessInfo?: BusinessNameInfo;
  address?: BusinessAddress;
  representative?: BusinessRepresentative;
  requirements?: BusinessRequirements;
}

export interface MapMarker {
  position: { lat: number; lng: number };
  businessId: string;
  businessName: string;
  owner: string;
  address: string;
  compliance: 'compliant' | 'pending' | 'noncompliant';
}

// Export all types as a namespace if needed
export * from './business';