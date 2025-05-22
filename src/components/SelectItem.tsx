
import React from 'react';
import { SelectItem as BaseSelectItem } from '@/components/ui/select';

// This component wraps the base SelectItem to ensure it always has a valid value
const SelectItem = ({ 
  value, 
  children, 
  disabled = false, 
  ...props 
}: React.ComponentPropsWithoutRef<typeof BaseSelectItem> & { value: string }) => {
  // Ensure value is never an empty string
  const safeValue = value || 'placeholder';
  
  return (
    <BaseSelectItem value={safeValue} disabled={disabled || !value} {...props}>
      {children}
    </BaseSelectItem>
  );
};

export default SelectItem;
