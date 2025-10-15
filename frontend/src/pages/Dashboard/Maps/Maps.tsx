import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Filter } from 'lucide-react';
import { Typography } from '@/components/atoms/typography';
import { BusinessService } from '@/hooks/businessService';
import type { Business, BusinessDetails } from '@/types/business';
import type { MapMarker } from '@/types/map';
import { useGoogleMapsLoader } from '@/services/useGoogleMapsLoader';
import { flagIcons } from '@/utils/mapConstants';
import { BusinessDetailsPanel } from '@/components/organisms/BusinessDetailsPanel';

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
      center: { lat: 10.7868, lng: 122.5894 },
      zoom: 14,
      mapTypeId: 'roadmap',
      mapTypeControl: false,
      fullscreenControl: true,
      streetViewControl: false
    });

    const streetViewPanorama = map.getStreetView();
    setStreetView(streetViewPanorama);
    setGoogleMap(map);

    (window as any).showFullInfoPopup = showFullInfoPopup;
  };

  const createMarkersOnMap = () => {
    if (!googleMap || !window.google) return;

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
              <span style="color: ${markerData.compliance === 'compliant' ? '#10b981' : markerData.compliance === 'pending' ? '#f59e0b' : '#ef4444'}; font-weight: bold;">
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

      marker.addListener('mouseover', () => infoWindow.open(googleMap, marker));
      marker.addListener('mouseout', () => infoWindow.close());

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
          clickTimer = setTimeout(() => { clickCount = 0; }, 500);
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
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
    <header className="bg-white shadow-sm border-b border-gray-200">
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 gap-3">
    {/* Title */}
    <Typography as="h1" variant="lead" className="text-gray-800 flex items-center gap-2">
      <MapPin size={24} className="text-blue-600" />
      Leganes Business Maps
    </Typography>

    {/* Right Section: Filter + Count */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      {/* Compliance Filter */}
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

      {/* Active Filter Label */}
      {complianceFilter && (
        <Typography
          as="span"
          variant="small"
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
        >
          Filter: {complianceFilter}
        </Typography>
      )}

      {/* Business Count */}
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-1 shadow-sm">
        <Typography as="div" variant="small" weight="medium" className="text-gray-800">
          Total Businesses:{" "}
          <Typography as="span" weight="bold">
            {businesses.length}
          </Typography>
        </Typography>
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
                <Typography as="p" variant="large" className="mt-4 text-gray-600">
                  Loading Maps...
                </Typography>
              </div>
            </div>
          )}

          {/* No Data Message */}
          {isLoaded && businesses.length === 0 && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
              <div className="text-center">
                <Typography as="p" variant="small" className="text-gray-600">
                  No business data available
                </Typography>
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
          <BusinessDetailsPanel 
            selectedBusiness={selectedBusiness} 
            onClose={() => setShowDetails(false)} 
          />
        )}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <Typography as="h4" variant="small" weight="semibold" className="text-gray-800 mb-2">
          Legend
        </Typography>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <Typography as="span">Compliant</Typography>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <Typography as="span">Pending</Typography>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <Typography as="span">Non-Compliant</Typography>
          </div>
        </div>
      </div>


    </div>
          
  );
};

export default Maps;