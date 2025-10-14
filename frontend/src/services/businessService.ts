// services/businessService.ts

import type {
  Business,
  BusinessDetails,
  BusinessNameInfo,
  BusinessAddress,
  BusinessRepresentative,
  BusinessRequirements
} from '@/types/business';





// Dummy data matching your MySQL structure
const dummyBusinesses: Business[] = [
  {
    businessid_: 'BUS001',
    businessname_: 'ABC Corporation',
    repname_: 'John Smith',
    longlat_: '10.7667,122.5667',
    barangay_: 'Poblacion',
    municipality_: 'Leganes',
    province_: 'Iloilo',
    street_: 'Rizal Street',
    houseno_: '123',
    dtiexpiry_: '2024-12-31',
    secexpiry_: '2024-12-31',
    cdaexpiry_: '2024-12-31'
  },
  {
    businessid_: 'BUS002',
    businessname_: 'XYZ Enterprises',
    repname_: 'Maria Garcia',
    longlat_: '10.7689,122.5689',
    barangay_: 'Napnud',
    municipality_: 'Leganes',
    province_: 'Iloilo',
    street_: 'Luna Street',
    houseno_: '456',
    dtiexpiry_: '2024-01-15',
    secexpiry_: '2024-12-31',
    cdaexpiry_: '2024-12-31'
  },
  {
    businessid_: 'BUS003',
    businessname_: 'Sample Company',
    repname_: 'Robert Johnson',
    longlat_: '10.7700,122.5700',
    barangay_: 'M.V. Hechanova',
    municipality_: 'Leganes',
    province_: 'Iloilo',
    street_: 'Burgos Street',
    houseno_: '789',
    dtiexpiry_: '2023-12-01',
    secexpiry_: '2023-12-01',
    cdaexpiry_: '2023-12-01'
  }
];

const dummyBusinessDetails: { [key: string]: BusinessDetails } = {
  'BUS001': {
    businessInfo: {
      businessid_: 'BUS001',
      ismain_: true,
      isforeign_: false,
      businessname_: 'ABC Corporation',
      dateestablished_: '2010-05-15',
      ownershiptype_: 'Corporation',
      registeredceo_: 'John Smith',
      tradename_: 'ABC Corp',
      isfranchise_: false,
      ismarketstall: false,
      iscommercialbuilding: true,
      marketstall_: '',
      businessbuildingid_: 'BLD001',
      buildingspace_: 'Owned',
      waiveragreement_: false,
      status_: true,
      datetimestamp: '2023-01-01'
    },
    address: {
      province_: 'Iloilo',
      municipality_: 'Leganes',
      barangay_: 'Poblacion',
      subdivision_: '',
      street_: 'Rizal Street',
      buildingname_: 'ABC Building',
      houseno_: '123',
      phaseblock_: '',
      lot_: 'Lot 5',
      landmark_: 'Near Municipal Hall',
      longlat_: '10.7667,122.5667',
      telno_: '033-1234567',
      cellno_: '09171234567',
      faxno_: '033-1234568',
      email_: 'abc@company.com',
      tin_: '123-456-789-000'
    },
    representative: {
      repid: 'REP001',
      repname_: 'John Smith',
      repposition_: 'CEO',
      ownershiptype_: 'Stockholder',
      firstname_: 'John',
      middlename_: 'Michael',
      lastname_: 'Smith',
      suffixname_: '',
      birthdate_: '1980-03-15',
      gender_: 'Male',
      civilstatus_: 'Married',
      nationality_: 'Filipino',
      telno_: '033-1234567',
      cellno_: '09171234567',
      faxno_: '033-1234568',
      email_: 'john.smith@company.com',
      tin_: '123-456-789-001',
      outsidecity_: false,
      province_: 'Iloilo',
      municipality_: 'Leganes',
      barangay_: 'Poblacion',
      subdivision_: '',
      street_: 'Rizal Street',
      buildingname_: '',
      houseno_: '123',
      block_: '',
      lot_: '',
      landmark_: '',
      status_: true
    },
    requirements: {
      dtino_: 'DTI123456',
      dtiissued_: '2023-01-15',
      dtiexpiry_: '2024-12-31',
      secno_: 'SEC789012',
      secissued_: '2023-01-20',
      secexpiry_: '2024-12-31',
      cdano_: 'CDA345678',
      cdaissued_: '2023-01-25',
      cdaexpiry_: '2024-12-31',
      localclearanceno_: 'LCN001',
      localclearancedate_: '2023-02-01',
      cedulano_: 'CED001',
      cedulaplaceissued_: 'Leganes',
      cedulaissued_: '2023-02-01',
      cedulaamount_: '50.00',
      boino_: '',
      boiissued_: '',
      boiexpiry_: '',
      sssno_: 'SSS123456',
      sssdatereg_: '2023-02-01',
      pagibigno_: 'PAG123456',
      pagibigreg_: '2023-02-01',
      phicno_: 'PHIC123456',
      phicreg_: '2023-02-01',
      pezaregistered_: false,
      pezaregno_: '',
      pezaissued_: '',
      pezaexpiry_: ''
    }
  }
};

export class BusinessService {
  static async getAllBusinesses(): Promise<Business[]> {
    // Simulate API call delay
    return new Promise(resolve => {
      setTimeout(() => resolve(dummyBusinesses), 500);
    });
  }

  static async getBusinessDetails(businessId: string): Promise<BusinessDetails> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const details = dummyBusinessDetails[businessId];
        if (details) {
          resolve(details);
        } else {
          reject(new Error('Business not found'));
        }
      }, 500);
    });
  }

  static async getFilteredBusinesses(complianceFilter: string): Promise<Business[]> {
    const allBusinesses = await this.getAllBusinesses();
    const today = new Date();
    
    switch (complianceFilter.toLowerCase()) {
      case 'compliant':
        return allBusinesses.filter(business => {
          const dtiExpiry = business.dtiexpiry_ ? new Date(business.dtiexpiry_) : today;
          const secExpiry = business.secexpiry_ ? new Date(business.secexpiry_) : today;
          const cdaExpiry = business.cdaexpiry_ ? new Date(business.cdaexpiry_) : today;
          const pendingThreshold = new Date(today);
          pendingThreshold.setDate(pendingThreshold.getDate() + 30);
          
          return dtiExpiry >= pendingThreshold && secExpiry >= pendingThreshold && cdaExpiry >= pendingThreshold;
        });
      
      case 'noncompliant':
        return allBusinesses.filter(business => {
          const dtiExpiry = business.dtiexpiry_ ? new Date(business.dtiexpiry_) : today;
          const secExpiry = business.secexpiry_ ? new Date(business.secexpiry_) : today;
          const cdaExpiry = business.cdaexpiry_ ? new Date(business.cdaexpiry_) : today;
          
          return dtiExpiry < today || secExpiry < today || cdaExpiry < today;
        });
      
      case 'pending':
        return allBusinesses.filter(business => {
          const dtiExpiry = business.dtiexpiry_ ? new Date(business.dtiexpiry_) : today;
          const secExpiry = business.secexpiry_ ? new Date(business.secexpiry_) : today;
          const cdaExpiry = business.cdaexpiry_ ? new Date(business.cdaexpiry_) : today;
          const pendingThreshold = new Date(today);
          pendingThreshold.setDate(pendingThreshold.getDate() + 30);
          
          return !(dtiExpiry >= pendingThreshold && secExpiry >= pendingThreshold && cdaExpiry >= pendingThreshold) &&
                 (dtiExpiry >= today || secExpiry >= today || cdaExpiry >= today);
        });
      
      default:
        return allBusinesses;
    }
  }
}

export default BusinessTypes;