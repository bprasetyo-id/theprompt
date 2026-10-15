'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import CurriculumSection from '@/components/CurriculumSection';
import BonusSection from '@/components/BonusSection';
import TestimonialSection from '@/components/TestimonialSection';
import PricingSection from '@/components/PricingSection';
import GuaranteeSection from '@/components/GuaranteeSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import CheckoutModal from '@/components/CheckoutModal';
import StickyMobileBar from '@/components/StickyMobileBar';
import { ProductTier } from '@/lib/types';

export default function HomePage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<ProductTier>('pro');

  const handleOpenCheckout = (tier?: ProductTier) => {
    if (tier) setSelectedTier(tier);
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar onOpenCheckout={() => handleOpenCheckout()} />

      {/* Hero Section */}
      <Hero onOpenCheckout={() => handleOpenCheckout()} />

      {/* Problem & Agitation Section */}
      <ProblemSection />

      {/* Curriculum & Chapters Preview */}
      <CurriculumSection />

      {/* Bonuses Section */}
      <BonusSection />

      {/* Social Proof & Testimonials */}
      <TestimonialSection />

      {/* Pricing Tiers Table */}
      <PricingSection onSelectTier={(tier) => handleOpenCheckout(tier)} />

      {/* Risk-free Guarantee */}
      <GuaranteeSection />

      {/* FAQ Accordion */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Floating CTA bar on mobile */}
      <StickyMobileBar onOpenCheckout={() => handleOpenCheckout()} />

      {/* 1-Click Frictionless Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        selectedTier={selectedTier}
        onSelectTier={setSelectedTier}
      />
    </main>
  );
}
