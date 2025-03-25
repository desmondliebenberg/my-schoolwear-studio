
import { useState } from 'react';

interface CustomizationOptions {
  text?: string;
  textColor?: string;
  textFont?: string;
  logo?: string;
  logoPosition?: 'left' | 'right' | 'center';
  designTemplate?: string;
}

export const useCustomization = (initialOptions?: Partial<CustomizationOptions>) => {
  const [options, setOptions] = useState<CustomizationOptions>(initialOptions || {});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const updateText = (text: string) => {
    setOptions(prev => ({ ...prev, text }));
  };

  const updateTextColor = (textColor: string) => {
    setOptions(prev => ({ ...prev, textColor }));
  };

  const updateTextFont = (textFont: string) => {
    setOptions(prev => ({ ...prev, textFont }));
  };

  const updateLogoPosition = (logoPosition: 'left' | 'right' | 'center') => {
    setOptions(prev => ({ ...prev, logoPosition }));
  };

  const updateDesignTemplate = (designTemplate: string) => {
    setOptions(prev => ({ ...prev, designTemplate }));
  };

  const handleLogoUpload = (file: File) => {
    setLogoFile(file);
    
    // Create URL for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = reader.result as string;
      setLogoPreview(preview);
      setOptions(prev => ({ ...prev, logo: preview }));
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const resetCustomization = () => {
    setOptions({});
    setLogoFile(null);
    setLogoPreview(null);
  };

  return {
    options,
    logoFile,
    logoPreview,
    updateText,
    updateTextColor,
    updateTextFont,
    updateLogoPosition,
    updateDesignTemplate,
    handleLogoUpload,
    resetCustomization
  };
};
