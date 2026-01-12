'use client';

import { ReactNode } from 'react';
import { useEstimatePopup } from '@/components/EstimatePopup';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  children?: ReactNode;
  className?: string;
  showArrow?: boolean;
}

export function CTAButton({ children, className = '', showArrow = true }: CTAButtonProps) {
  const { openPopup } = useEstimatePopup();

  return (
    <button
      onClick={openPopup}
      className={className}
    >
      {children || 'Get Your Free Estimate'}
      {showArrow && <ArrowRight className="w-5 h-5" />}
    </button>
  );
}
