// components/Maps.tsx
import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Filter, Building, User, Map, X } from 'lucide-react';

// Types based on your actual database structure
interface Business {
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

interface BusinessNameInfo {
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

interface BusinessAddress {
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

interface BusinessRepresentative {
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

interface BusinessRequirements {
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

interface BusinessDetails {
  businessInfo?: BusinessNameInfo;
  address?: BusinessAddress;
  representative?: BusinessRepresentative;
  requirements?: BusinessRequirements;
}

interface MapMarker {
  position: { lat: number; lng: number };
  businessId: string;
  businessName: string;
  owner: string;
  address: string;
  compliance: 'compliant' | 'pending' | 'noncompliant';
}

// Realistic dummy data based on your Leganes businesses
const dummyBusinesses: Business[] = [
  {
    businessid_: 'BIZ001',
    businessname_: 'Leganes General Merchandise',
    repname_: 'Rep BIZ001',
    longlat_: '10.7868,122.5894',
    barangay_: 'Poblacion',
    municipality_: 'Leganes',
    province_: 'Iloilo',
    street_: 'Rizal Street',
    houseno_: '123',
    dtiexpiry_: '2024-12-31',
    secexpiry_: '2025-12-31',
    cdaexpiry_: '2024-12-31'
  },
  {
    businessid_: 'BIZ002',
    businessname_: 'Napnud Agricultural Supply',
    repname_: 'Rep BIZ002',
    longlat_: '10.7912,122.5921',
    barangay_: 'Napnud',
    municipality_: 'Leganes',
    province_: 'Iloilo',
    street_: 'Luna Street',
    houseno_: '456',
    dtiexpiry_: '2026-01-15',
    secexpiry_: '2026-12-31',
    cdaexpiry_: '2026-12-31'
  },
  {
    businessid_: 'BIZ003',
    businessname_: 'Cagamutan Sur Hardware',
    repname_: 'Rep BIZ003',
    longlat_: '10.7945,122.5956',
    barangay_: 'Cagamutan Sur',
    municipality_: 'Leganes',
    province_: 'Iloilo',
    street_: 'Burgos Street',
    houseno_: '789',
    dtiexpiry_: '2023-12-01',
    secexpiry_: '2023-12-01',
    cdaexpiry_: '2023-12-01'
  },
  {
    businessid_: 'BIZ101',
    businessname_: 'Cagamutan Norte Sari-Sari Store',
    repname_: 'Ana N. Santos',
    longlat_: '10.7891,122.5912',
    barangay_: 'Cagamutan Norte',
    municipality_: 'Leganes',
    province_: 'Iloilo',
    street_: 'Iloilo East Coast Road',
    houseno_: '10',
    dtiexpiry_: '2024-06-30',
    secexpiry_: '2024-06-30',
    cdaexpiry_: '2024-06-30'
  },
  {
    businessid_: 'BIZ102',
    businessname_: 'Guihaman Rice Trading',
    repname_: 'Pedro Z. Domingo',
    longlat_: '10.7834,122.5876',
    barangay_: 'Guihaman',
    municipality_: 'Leganes',
    province_: 'Iloilo',
    street_: 'Leganes-Zarraga Road',
    houseno_: '455',
    dtiexpiry_: '2024-03-15',
    secexpiry_: '2024-12-31',
    cdaexpiry_: '2024-12-31'
  },
  {
    businessid_: 'BIZ103',
    businessname_: 'Buntatala Furniture Shop',
    repname_: 'Carmen S. Villanueva',
    longlat_: '10.7967,122.5989',
    barangay_: 'Buntatala',
    municipality_: 'Leganes',
    province_: 'Iloilo',
    street_: 'Jaro-Leganes Road',
    houseno_: '207',
    dtiexpiry_: '2023-11-30',
    secexpiry_: '2023-11-30',
    cdaexpiry_: '2023-11-30'
  },
  {
    businessid_: 'BIZ104',
    businessname_: 'M.V. Hechanova Auto Repair',
    repname_: 'Maria N. Rivera',
    longlat_: '10.7992,122.6013',
    barangay_: 'M.V. Hechanova (Balabago)',
    municipality_: 'Leganes',
    province_: 'Iloilo',
    street_: 'Iloilo East Coast Road',
    houseno_: '271',
    dtiexpiry_: '2024-09-30',
    secexpiry_: '2024-09-30',
    cdaexpiry_: '2024-09-30'
  },
  {
    businessid_: 'BIZ105',
    businessname_: 'Calaboa Food Products',
    repname_: 'Pedro H. Rivera',
    longlat_: '10.7819,122.5852',
    barangay_: 'Calaboa',
    municipality_: 'Leganes',
    province_: 'Iloilo',
    street_: 'Leganes-Zarraga Road',
    houseno_: '70',
    dtiexpiry_: '2024-12-31',
    secexpiry_: '2024-12-31',
    cdaexpiry_: '2024-12-31'
  }
];

const dummyBusinessDetails: { [key: string]: BusinessDetails } = {
  'BIZ001': {
    businessInfo: {
      businessid_: 'BIZ001',
      ismain_: true,
      isforeign_: false,
      businessname_: 'Leganes General Merchandise',
      dateestablished_: '2010-05-15',
      ownershiptype_: 'Single Proprietorship',
      registeredceo_: 'Rep BIZ001',
      tradename_: 'LGM Store',
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
      buildingname_: 'LGM Building',
      houseno_: '123',
      phaseblock_: '',
      lot_: 'Lot 5',
      landmark_: 'Near Municipal Hall',
      longlat_: '10.7868,122.5894',
      telno_: '033-3200101',
      cellno_: '09176852708',
      faxno_: '',
      email_: 'lgm@leganesbiz.com',
      tin_: '123-456-789-000'
    },
    representative: {
      repid: 'BIZ001',
      repname_: 'Rep BIZ001',
      repposition_: 'Manager',
      ownershiptype_: 'Single Proprietorship',
      firstname_: 'John',
      middlename_: 'M.',
      lastname_: 'Doe',
      suffixname_: '',
      birthdate_: '1985-06-15',
      gender_: 'Male',
      civilstatus_: 'Single',
      nationality_: 'Filipino',
      telno_: '033-3200101',
      cellno_: '09176852708',
      faxno_: '',
      email_: 'repbiz001@leganesbiz.com',
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
      secno_: '',
      secissued_: '',
      secexpiry_: '',
      cdano_: '',
      cdaissued_: '',
      cdaexpiry_: '',
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
  },
  'BIZ101': {
    businessInfo: {
      businessid_: 'BIZ101',
      ismain_: true,
      isforeign_: false,
      businessname_: 'Cagamutan Norte Sari-Sari Store',
      dateestablished_: '2025-04-29',
      ownershiptype_: 'Single Proprietorship',
      registeredceo_: 'Ana N. Santos',
      tradename_: 'Ana Store',
      isfranchise_: true,
      ismarketstall: true,
      iscommercialbuilding: true,
      marketstall_: '',
      businessbuildingid_: '',
      buildingspace_: 'Rented',
      waiveragreement_: true,
      status_: true,
      datetimestamp: '2023-01-01'
    },
    address: {
      province_: 'Iloilo',
      municipality_: 'Leganes',
      barangay_: 'Cagamutan Norte',
      subdivision_: '',
      street_: 'Iloilo East Coast Road',
      buildingname_: '',
      houseno_: '10',
      phaseblock_: '',
      lot_: '',
      landmark_: 'Near main road',
      longlat_: '10.7891,122.5912',
      telno_: '033-3200101',
      cellno_: '09170000101',
      faxno_: '',
      email_: 'biz101@leganesbiz.com',
      tin_: '987-654-321-000'
    }
  }
};

// Business Service
class BusinessService {
  static async getAllBusinesses(): Promise<Business[]> {
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

// Flag icons as base64 (you can replace these with your actual flag images)
const flagIcons = {
  compliant: `data:image/svg+xml;base64,${btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="#10b981" rx="16"/>
      <path d="M12 16L14 18L20 12" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `)}`,
  pending: `data:image/svg+xml;base64,${btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="#f59e0b" rx="16"/>
      <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">?</text>
    </svg>
  `)}`,
  noncompliant: `data:image/svg+xml;base64,${btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="#ef4444" rx="16"/>
      <path d="M12 12L20 20M20 12L12 20" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>
  `)}`
};

// Google Maps Loader Hook
const useGoogleMapsLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      setError('Google Maps API key is not configured in environment variables');
      return;
    }

    // Check if script is already loading
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`);
    if (existingScript) {
      const checkLoaded = setInterval(() => {
        if (window.google && window.google.maps) {
          setIsLoaded(true);
          clearInterval(checkLoaded);
        }
      }, 100);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,drawing,geometry`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setTimeout(() => {
        if (window.google && window.google.maps) {
          setIsLoaded(true);
        } else {
          setError('Google Maps loaded but not properly initialized');
        }
      }, 100);
    };

    script.onerror = () => {
      setError('Failed to load Google Maps API. Check your API key and network connection.');
    };

    window.gm_authFailure = () => {
      setError('Google Maps API authentication failed. Please check your API key.');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      window.gm_authFailure = () => {};
    };
  }, []);

  return { isLoaded, error };
};

// Main Maps Component
interface MapsProps {
  complianceFilter?: string;
}

const Maps: React.FC<MapsProps> = ({ complianceFilter = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessDetails | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [mapView, setMapView] = useState<'roadmap' | 'satellite' | 'terrain' | 'streetview'>('roadmap');
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const [streetView, setStreetView] = useState<google.maps.StreetViewPanorama | null>(null);
  const [googleMarkers, setGoogleMarkers] = useState<google.maps.Marker[]>([]);
  
  const { isLoaded, error } = useGoogleMapsLoader();

  useEffect(() => {
    if (complianceFilter) {
      loadFilteredBusinesses(complianceFilter);
    } else {
      loadAllBusinesses();
    }
  }, [complianceFilter]);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      initializeMap();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && googleMap && businesses.length > 0) {
      createMarkersOnMap();
    }
  }, [isLoaded, googleMap, businesses]);

  const loadAllBusinesses = async () => {
    try {
      const data = await BusinessService.getAllBusinesses();
      setBusinesses(data);
      createMarkers(data);
    } catch (error) {
      console.error('Error loading businesses:', error);
    }
  };

  const loadFilteredBusinesses = async (filter: string) => {
    try {
      const data = await BusinessService.getFilteredBusinesses(filter);
      setBusinesses(data);
      createMarkers(data);
    } catch (error) {
      console.error('Error loading filtered businesses:', error);
    }
  };

  const createMarkers = (businessData: Business[]) => {
    const today = new Date();
    const pendingThreshold = new Date(today);
    pendingThreshold.setDate(pendingThreshold.getDate() + 30);

    const newMarkers: MapMarker[] = businessData.map(business => {
      const coords = business.longlat_.split(',').map(coord => parseFloat(coord.trim()));
      const lat = coords[0];
      const lng = coords[1];

      const dtiExpiry = business.dtiexpiry_ ? new Date(business.dtiexpiry_) : today;
      const secExpiry = business.secexpiry_ ? new Date(business.secexpiry_) : today;
      const cdaExpiry = business.cdaexpiry_ ? new Date(business.cdaexpiry_) : today;

      const isCompliant = dtiExpiry >= pendingThreshold && secExpiry >= pendingThreshold && cdaExpiry >= pendingThreshold;
      const isPending = !isCompliant && (dtiExpiry >= today || secExpiry >= today || cdaExpiry >= today);

      let compliance: 'compliant' | 'pending' | 'noncompliant' = 'noncompliant';
      if (isCompliant) compliance = 'compliant';
      else if (isPending) compliance = 'pending';

      const address = `${business.houseno_} ${business.street_}, ${business.barangay_}, ${business.municipality_}, ${business.province_}`;

      return {
        position: { lat, lng },
        businessId: business.businessid_,
        businessName: business.businessname_,
        owner: business.repname_,
        address,
        compliance
      };
    });

    setMarkers(newMarkers);
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 10.7868, lng: 122.5894 }, // Leganes center
      zoom: 14,
      mapTypeId: 'roadmap',
      mapTypeControl: false,
      fullscreenControl: true,
      streetViewControl: false
    });

    const streetViewPanorama = map.getStreetView();
    setStreetView(streetViewPanorama);
    setGoogleMap(map);

    // Expose function to window for HTML button
    (window as any).showFullInfoPopup = showFullInfoPopup;
  };

  const createMarkersOnMap = () => {
    if (!googleMap || !window.google) return;

    // Clear existing markers
    googleMarkers.forEach(marker => marker.setMap(null));
    const newGoogleMarkers: google.maps.Marker[] = [];

    markers.forEach(markerData => {
      const marker = new google.maps.Marker({
        position: markerData.position,
        map: googleMap,
        title: `${markerData.businessName} - ${markerData.owner}`,
        icon: {
          url: flagIcons[markerData.compliance],
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16)
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 250px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 14px; font-weight: bold;">${markerData.businessName}</h3>
            <p style="margin: 4px 0; color: #6b7280; font-size: 12px;"><strong>Owner:</strong> ${markerData.owner}</p>
            <p style="margin: 4px 0; color: #6b7280; font-size: 12px;"><strong>Address:</strong> ${markerData.address}</p>
            <p style="margin: 4px 0; color: #6b7280; font-size: 12px;"><strong>Status:</strong> 
              <span style="color: ${
                markerData.compliance === 'compliant' ? '#10b981' : 
                markerData.compliance === 'pending' ? '#f59e0b' : '#ef4444'
              }; font-weight: bold;">
                ${markerData.compliance.toUpperCase()}
              </span>
            </p>
            <div style="margin-top: 8px;">
              <button onclick="window.showFullInfoPopup('${markerData.businessId}')" 
                      style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; width: 100%;">
                View Full Details
              </button>
            </div>
          </div>
        `
      });

      marker.addListener('mouseover', () => {
        infoWindow.open(googleMap, marker);
      });

      marker.addListener('mouseout', () => {
        infoWindow.close();
      });

      // Double click handler
      let clickCount = 0;
      let clickTimer: NodeJS.Timeout;

      marker.addListener('click', () => {
        clickCount++;
        if (clickCount === 2) {
          clickCount = 0;
          clearTimeout(clickTimer);
          googleMap.setZoom(18);
          googleMap.setCenter(marker.getPosition()!);
          infoWindow.open(googleMap, marker);
          showFullInfoPopup(markerData.businessId);
        } else {
          if (clickTimer) clearTimeout(clickTimer);
          clickTimer = setTimeout(() => {
            clickCount = 0;
          }, 500);
        }
      });

      newGoogleMarkers.push(marker);
    });

    setGoogleMarkers(newGoogleMarkers);
  };

  const showFullInfoPopup = async (businessId: string) => {
    try {
      const details = await BusinessService.getBusinessDetails(businessId);
      setSelectedBusiness(details);
      setShowDetails(true);
    } catch (error) {
      console.error('Error loading business details:', error);
      alert('Error loading business details');
    }
  };

  const handleMapViewChange = (view: 'roadmap' | 'satellite' | 'terrain' | 'streetview') => {
    setMapView(view);
    if (googleMap && streetView) {
      if (view === 'streetview') {
        streetView.setPosition(googleMap.getCenter()!);
        streetView.setPov({ heading: 265, pitch: 0 });
        streetView.setVisible(true);
      } else {
        streetView.setVisible(false);
        googleMap.setMapTypeId(view);
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg border border-red-200 p-6">
          <div className="flex items-center gap-3 text-red-600 mb-4">
            <MapPin size={24} />
            <h2 className="text-xl font-semibold">Maps Error</h2>
          </div>
          <p className="text-gray-700">{error}</p>
          <p className="text-sm text-gray-600 mt-2">
            Please check your Google Maps API key in the .env file
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <MapPin size={24} className="text-blue-600" />
            Leganes Business Maps
          </h1>
          <div className="flex items-center gap-4">
            {complianceFilter && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Filter: {complianceFilter}
              </span>
            )}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-600" />
              <select 
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => loadFilteredBusinesses(e.target.value)}
                value={complianceFilter}
              >
                <option value="">All Businesses</option>
                <option value="compliant">Compliant</option>
                <option value="noncompliant">Non-Compliant</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Map Container */}
        <div className="flex-1 relative">
          {/* Map View Controls */}
          <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Map View:</label>
            <select 
              value={mapView}
              onChange={(e) => handleMapViewChange(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="roadmap">Roadmap</option>
              <option value="satellite">Satellite</option>
              <option value="terrain">Terrain</option>
              <option value="streetview">Street View</option>
            </select>
          </div>

          {/* Map */}
          <div ref={mapRef} className="w-full h-full" />

          {/* Loading Overlay */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading Maps...</p>
              </div>
            </div>
          )}

          {/* No Data Message */}
          {isLoaded && businesses.length === 0 && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600">No business data available</p>
                <button
                  onClick={loadAllBusinesses}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Reload Data
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Business Details Panel */}
        {showDetails && selectedBusiness && (
          <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Business Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* Business Information */}
              {selectedBusiness.businessInfo && (
                <div>
                  <h3 className="flex items-center gap-2 text-md font-semibold text-gray-800 mb-3">
                    <Building size={16} />
                    Business Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-gray-600">Business ID:</span>
                      <span className="text-gray-800">{selectedBusiness.businessInfo.businessid_}</span>
                      
                      <span className="font-medium text-gray-600">Business Name:</span>
                      <span className="text-gray-800">{selectedBusiness.businessInfo.businessname_}</span>
                      
                      <span className="font-medium text-gray-600">Main Branch:</span>
                      <span className="text-gray-800">{selectedBusiness.businessInfo.ismain_ ? 'Yes' : 'No'}</span>
                      
                      <span className="font-medium text-gray-600">Foreign Company:</span>
                      <span className="text-gray-800">{selectedBusiness.businessInfo.isforeign_ ? 'Yes' : 'No'}</span>
                      
                      <span className="font-medium text-gray-600">Date Established:</span>
                      <span className="text-gray-800">{selectedBusiness.businessInfo.dateestablished_}</span>

                      <span className="font-medium text-gray-600">Ownership Type:</span>
                      <span className="text-gray-800">{selectedBusiness.businessInfo.ownershiptype_}</span>

                      <span className="font-medium text-gray-600">Trade Name:</span>
                      <span className="text-gray-800">{selectedBusiness.businessInfo.tradename_}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Address Information */}
              {selectedBusiness.address && (
                <div>
                  <h3 className="flex items-center gap-2 text-md font-semibold text-gray-800 mb-3">
                    <Map size={16} />
                    Address Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Address:</strong> {selectedBusiness.address.houseno_} {selectedBusiness.address.street_}, {selectedBusiness.address.barangay_}</div>
                    <div><strong>Municipality:</strong> {selectedBusiness.address.municipality_}</div>
                    <div><strong>Province:</strong> {selectedBusiness.address.province_}</div>
                    <div><strong>Coordinates:</strong> {selectedBusiness.address.longlat_}</div>
                    {selectedBusiness.address.telno_ && <div><strong>Telephone:</strong> {selectedBusiness.address.telno_}</div>}
                    {selectedBusiness.address.cellno_ && <div><strong>Mobile:</strong> {selectedBusiness.address.cellno_}</div>}
                    {selectedBusiness.address.email_ && <div><strong>Email:</strong> {selectedBusiness.address.email_}</div>}
                  </div>
                </div>
              )}

              {/* Representative Information */}
              {selectedBusiness.representative && (
                <div>
                  <h3 className="flex items-center gap-2 text-md font-semibold text-gray-800 mb-3">
                    <User size={16} />
                    Representative Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {selectedBusiness.representative.repname_}</div>
                    <div><strong>Position:</strong> {selectedBusiness.representative.repposition_}</div>
                    <div><strong>Ownership Type:</strong> {selectedBusiness.representative.ownershiptype_}</div>
                    {selectedBusiness.representative.cellno_ && <div><strong>Contact:</strong> {selectedBusiness.representative.cellno_}</div>}
                    {selectedBusiness.representative.email_ && <div><strong>Email:</strong> {selectedBusiness.representative.email_}</div>}
                  </div>
                </div>
              )}

              {/* Requirements Information */}
              {selectedBusiness.requirements && (
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-3">Business Requirements</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      {selectedBusiness.requirements.dtino_ && (
                        <>
                          <span className="font-medium text-gray-600">DTI No:</span>
                          <span className="text-gray-800">{selectedBusiness.requirements.dtino_}</span>
                        </>
                      )}
                      
                      {selectedBusiness.requirements.dtiexpiry_ && (
                        <>
                          <span className="font-medium text-gray-600">DTI Expiry:</span>
                          <span className="text-gray-800">{selectedBusiness.requirements.dtiexpiry_}</span>
                        </>
                      )}
                      
                      {selectedBusiness.requirements.secno_ && (
                        <>
                          <span className="font-medium text-gray-600">SEC No:</span>
                          <span className="text-gray-800">{selectedBusiness.requirements.secno_}</span>
                        </>
                      )}
                      
                      {selectedBusiness.requirements.secexpiry_ && (
                        <>
                          <span className="font-medium text-gray-600">SEC Expiry:</span>
                          <span className="text-gray-800">{selectedBusiness.requirements.secexpiry_}</span>
                        </>
                      )}
                      
                      {selectedBusiness.requirements.cdano_ && (
                        <>
                          <span className="font-medium text-gray-600">CDA No:</span>
                          <span className="text-gray-800">{selectedBusiness.requirements.cdano_}</span>
                        </>
                      )}
                      
                      {selectedBusiness.requirements.cdaexpiry_ && (
                        <>
                          <span className="font-medium text-gray-600">CDA Expiry:</span>
                          <span className="text-gray-800">{selectedBusiness.requirements.cdaexpiry_}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Non-Compliant</span>
          </div>
        </div>
      </div>

      {/* Business Count */}
      <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <div className="text-sm font-medium text-gray-800">
          Total Businesses: <span className="font-bold">{businesses.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Maps;