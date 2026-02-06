'use client';

import { useEffect } from 'react';

interface AdSenseUnitProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  responsive?: boolean;
  position?: 'top' | 'middle' | 'bottom';
}

/**
 * AdSense Ad Unit Component
 * Renders Google AdSense ads with proper configuration
 * 
 * Usage:
 * <AdSenseUnit slot="1234567890" format="auto" responsive />
 */
export default function AdSenseUnit({ 
  slot, 
  format = 'auto', 
  responsive = true,
  position = 'middle'
}: AdSenseUnitProps) {
  useEffect(() => {
    // Load AdSense script once per page
    if (window && !(window as any).adsbygoogle) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Push ad when component mounts
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.log('AdSense not ready yet');
    }
  }, []);

  /**
   * Ad dimensions by format and position
   * Optimize for different placements
   */
  const getAdDimensions = () => {
    switch (format) {
      case 'horizontal':
        return 'w-full max-w-4xl h-24 sm:h-20'; // 728x90 or 970x90
      case 'vertical':
        return 'w-full sm:w-80 h-96'; // 300x600 or 160x600
      case 'rectangle':
        return 'w-full sm:w-96 h-80'; // 300x250
      case 'auto':
      default:
        // Auto format adapts to container
        return position === 'middle' ? 'w-full h-96' : 'w-full h-24 sm:h-20';
    }
  };

  /**
   * Get container classes based on position
   */
  const getContainerClasses = () => {
    const baseClasses = 'flex justify-center items-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden';
    
    switch (position) {
      case 'top':
        return `${baseClasses} mb-6`;
      case 'bottom':
        return `${baseClasses} mt-6`;
      case 'middle':
      default:
        return `${baseClasses} my-6`;
    }
  };

  return (
    <div className={getContainerClasses()}>
      <div className={getAdDimensions()}>
        {/* Google AdSense Ad Unit */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        ></ins>
      </div>
    </div>
  );
}
