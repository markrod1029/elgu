import React from 'react';
import { Building, User, Map, X } from 'lucide-react';
import { Typography } from '@/components/atoms/typography';
import type { BusinessDetails } from '@/types';

interface BusinessDetailsPanelProps {
  selectedBusiness: BusinessDetails;
  onClose: () => void;
}

export const BusinessDetailsPanel: React.FC<BusinessDetailsPanelProps> = ({
  selectedBusiness,
  onClose
}) => {
  const renderInfoSection = (
    title: string,
    icon: React.ReactNode,
    data: Record<string, any> | null,
    fields: string[]
  ) => {
    if (!data) return null;

    return (
      <div>
        <Typography as="h3" variant="large" weight="semibold" className="flex items-center gap-2 mb-3">
          {icon}
          {title}
        </Typography>
        <div className="space-y-2 text-sm">
          {fields.map((field) => {
            const value = data[field];
            if (!value) return null;
            
            const fieldLabel = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            return (
              <div key={field} className="grid grid-cols-2 gap-2">
                <Typography as="span" weight="medium" className="text-gray-600">
                  {fieldLabel}:
                </Typography>
                <Typography as="span">{value}</Typography>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAddressSection = (address: any) => {
    if (!address) return null;

    return (
      <div>
        <Typography as="h3" variant="large" weight="semibold" className="flex items-center gap-2 mb-3">
          <Map size={16} />
          Address Information
        </Typography>
        <div className="space-y-2 text-sm">
          <Typography as="div">
            <strong>Address:</strong> {address.houseno_} {address.street_}, {address.barangay_}
          </Typography>
          <Typography as="div">
            <strong>Municipality:</strong> {address.municipality_}
          </Typography>
          <Typography as="div">
            <strong>Province:</strong> {address.province_}
          </Typography>
          {address.cellno_ && (
            <Typography as="div">
              <strong>Mobile:</strong> {address.cellno_}
            </Typography>
          )}
          {address.email_ && (
            <Typography as="div">
              <strong>Email:</strong> {address.email_}
            </Typography>
          )}
        </div>
      </div>
    );
  };

  const renderRepresentativeSection = (representative: any) => {
    if (!representative) return null;

    return (
      <div>
        <Typography as="h3" variant="large" weight="semibold" className="flex items-center gap-2 mb-3">
          <User size={16} />
          Representative Information
        </Typography>
        <div className="space-y-2 text-sm">
          <Typography as="div">
            <strong>Name:</strong> {representative.repname_}
          </Typography>
          <Typography as="div">
            <strong>Position:</strong> {representative.repposition_}
          </Typography>
          {representative.cellno_ && (
            <Typography as="div">
              <strong>Contact:</strong> {representative.cellno_}
            </Typography>
          )}
          {representative.email_ && (
            <Typography as="div">
              <strong>Email:</strong> {representative.email_}
            </Typography>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <Typography as="h2" variant="h4" weight="semibold" className="text-gray-800">
            Business Details
          </Typography>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            aria-label="Close panel"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Business Information */}
        {renderInfoSection(
          "Business Information",
          <Building size={16} />,
          selectedBusiness.businessInfo,
          ['businessid_', 'businessname_', 'dateestablished_', 'ownershiptype_', 'tradename_']
        )}

        {/* Address Information */}
        {renderAddressSection(selectedBusiness.address)}

        {/* Representative Information */}
        {renderRepresentativeSection(selectedBusiness.representative)}

        {/* Requirements Information */}
        {renderInfoSection(
          "Business Requirements",
          null,
          selectedBusiness.requirements,
          ['dtino_', 'dtiexpiry_', 'secno_', 'secexpiry_', 'cdano_', 'cdaexpiry_']
        )}
      </div>
    </div>
  );
};