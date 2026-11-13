import React from 'react';
import { useDiscreteSwipe, SideDots } from '@/features/swipe-navigator';
import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero';
import { WorksSection } from '@/widgets/works';
import { StagesSection } from '@/widgets/stages';
import { ReviewsSection } from '@/widgets/reviews';
import { ContactSection } from '@/widgets/contact';
import styles from './LandingPage.module.css';

const TOTAL_SECTIONS = 5;

export const LandingPage: React.FC = () => {
  const { currentIndex, goToSection } = useDiscreteSwipe(TOTAL_SECTIONS);

  return (
    <div className={styles.pageWrapper}>
      {/* Fixed Sticky Header */}
      <Header
        currentSectionIndex={currentIndex}
        onNavigate={goToSection}
      />

      {/* Discrete Fullpage Swipe Track (Zero Skipping) */}
      <main
        className={styles.fullpageTrack}
        style={{
          transform: `translateY(-${currentIndex * 100}vh)`,
        }}
      >
        <HeroSection onNavigate={goToSection} />
        <WorksSection />
        <StagesSection />
        <ReviewsSection />
        <ContactSection />
      </main>

      {/* Side Dots Indicator */}
      <SideDots
        total={TOTAL_SECTIONS}
        current={currentIndex}
        onSelect={goToSection}
      />
    </div>
  );
};
