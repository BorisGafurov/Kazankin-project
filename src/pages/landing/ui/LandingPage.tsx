import React from 'react';
import { useDiscreteSwipe, SideDots } from '@/features/swipe-navigator';
import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero';
import { WorksSection } from '@/widgets/works';
import { ReviewsSection } from '@/widgets/reviews';
import { StagesSection } from '@/widgets/stages';
import { ContactSection } from '@/widgets/contact';
import styles from './LandingPage.module.css';

const TOTAL_SECTIONS = 5;

export const LandingPage: React.FC = () => {
  const { currentIndex, goToSection } = useDiscreteSwipe(TOTAL_SECTIONS);

  return (
    <div className={styles.pageWrapper}>
      <Header currentSectionIndex={currentIndex} onNavigate={goToSection} />

      <main
        className={styles.fullpageTrack}
        style={{ transform: `translate3d(0, -${currentIndex * 100}dvh, 0)` }}
      >
        <HeroSection onNavigate={goToSection} isActive={currentIndex === 0} />
        <WorksSection />
        <ReviewsSection />
        <StagesSection />
        <ContactSection />
      </main>

      <SideDots total={TOTAL_SECTIONS} current={currentIndex} onSelect={goToSection} />
    </div>
  );
};
