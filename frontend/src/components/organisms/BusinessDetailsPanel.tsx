import React from 'react';
import { Building, User, Map, X } from 'lucide-react';
import { Typography } from '@/components/atoms/typography';
import type { BusinessDetails } from '@/types/business';

interface BusinessDetailsPanelProps {
  selectedBusiness: BusinessDetails;
  onClose: () => void;
}

export const BusinessDetailsPanel: React.FC<BusinessDetailsPanelProps> = ({
  selectedBusiness,
  onClose
}) => {
  return (
    <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Typography as="h2" variant="large" className="text-gray-800">
            Business Details
          </Typography>
          <button
            onClick={onClose}
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
            <Typography as="h3" variant="large" weight="semibold" className="flex items-center gap-2 mb-3">
              <Building size={16} />
              Business Information
            </Typography>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <Typography as="span" weight="medium" className="text-gray-600">Business ID:</Typography>
                <Typography as="span">{selectedBusiness.businessInfo.businessid_}</Typography>
                
                <Typography as="span" weight="medium" className="text-gray-600">Business Name:</Typography>
                <Typography as="span">{selectedBusiness.businessInfo.businessname_}</Typography>
                
                <Typography as="span" weight="medium" className="text-gray-600">Date Established:</Typography>
                <Typography as="span">{selectedBusiness.businessInfo.dateestablished_}</Typography>
                
                <Typography as="span" weight="medium" className="text-gray-600">Ownership Type:</Typography>
                <Typography as="span">{selectedBusiness.businessInfo.ownershiptype_}</Typography>
                
                <Typography as="span" weight="medium" className="text-gray-600">Trade Name:</Typography>
                <Typography as="span">{selectedBusiness.businessInfo.tradename_}</Typography>
              </div>
            </div>
          </div>
        )}

        {/* Address Information */}
        {selectedBusiness.address && (
          <div>
            <Typography as="h3" variant="large" weight="semibold" className="flex items-center gap-2 mb-3">
              <Map size={16} />
              Address Information
            </Typography>
            <div className="space-y-2 text-sm">
              <Typography as="div">
                <strong>Address:</strong> {selectedBusiness.address.houseno_} {selectedBusiness.address.street_}, {selectedBusiness.address.barangay_}
              </Typography>
              <Typography as="div">
                <strong>Municipality:</strong> {selectedBusiness.address.municipality_}
              </Typography>
              <Typography as="div">
                <strong>Province:</strong> {selectedBusiness.address.province_}
              </Typography>
              {selectedBusiness.address.cellno_ && (
                <Typography as="div">
                  <strong>Mobile:</strong> {selectedBusiness.address.cellno_}
                </Typography>
              )}
              {selectedBusiness.address.email_ && (
                <Typography as="div">
                  <strong>Email:</strong> {selectedBusiness.address.email_}
                </Typography>
              )}
            </div>
          </div>
        )}

        {/* Representative Information */}
        {selectedBusiness.representative && (
          <div>
            <Typography as="h3" variant="large" weight="semibold" className="flex items-center gap-2 mb-3">
              <User size={16} />
              Representative Information
            </Typography>
            <div className="space-y-2 text-sm">
              <Typography as="div">
                <strong>Name:</strong> {selectedBusiness.representative.repname_}
              </Typography>
              <Typography as="div">
                <strong>Position:</strong> {selectedBusiness.representative.repposition_}
              </Typography>
              {selectedBusiness.representative.cellno_ && (
                <Typography as="div">
                  <strong>Contact:</strong> {selectedBusiness.representative.cellno_}
                </Typography>
              )}
              {selectedBusiness.representative.email_ && (
                <Typography as="div">
                  <strong>Email:</strong> {selectedBusiness.representative.email_}
                </Typography>
              )}
            </div>
          </div>
        )}

        {/* Requirements Information */}
        {selectedBusiness.requirements && (
          <div>
            <Typography as="h3" variant="large" weight="semibold" className="mb-3">
              Business Requirements
            </Typography>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                {selectedBusiness.requirements.dtino_ && (
                  <>
                    <Typography as="span" weight="medium" className="text-gray-600">DTI No:</Typography>
                    <Typography as="span">{selectedBusiness.requirements.dtino_}</Typography>
                  </>
                )}
                {selectedBusiness.requirements.dtiexpiry_ && (
                  <>
                    <Typography as="span" weight="medium" className="text-gray-600">DTI Expiry:</Typography>
                    <Typography as="span">{selectedBusiness.requirements.dtiexpiry_}</Typography>
                  </>
                )}
                {selectedBusiness.requirements.secno_ && (
                  <>
                    <Typography as="span" weight="medium" className="text-gray-600">SEC No:</Typography>
                    <Typography as="span">{selectedBusiness.requirements.secno_}</Typography>
                  </>
                )}
                {selectedBusiness.requirements.secexpiry_ && (
                  <>
                    <Typography as="span" weight="medium" className="text-gray-600">SEC Expiry:</Typography>
                    <Typography as="span">{selectedBusiness.requirements.secexpiry_}</Typography>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};