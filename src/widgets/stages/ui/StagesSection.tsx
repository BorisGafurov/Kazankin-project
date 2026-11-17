import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useI18n } from '@/shared/lib/i18n';
import { useStageAccordion } from '@/features/stage-accordion';
import { Section, Container, Heading, Text, Grid } from '@/shared/ui';
import { STAGES_LIST, StageCard, StageStep } from '@/entities/stage';
import styles from './StagesSection.module.css';

export const StagesSection: React.FC = () => {
  const { t } = useI18n();
  const { expandedId, toggle } = useStageAccordion();
  const preEditStages = STAGES_LIST.filter((stage) => stage.group === 'before');
  const postProductionStages = STAGES_LIST.filter((stage) => stage.group === 'post');
  const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!expandedId) return;

    const target = event.target;
    const clickedInsideDialog = target instanceof Element
      && target.closest(`[data-stage-dialog="${expandedId}"]`);

    if (!clickedInsideDialog) toggle(expandedId);
  };

  useEffect(() => {
    if (!expandedId) return undefined;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      const mobileMenuOpen = document.querySelector(
        '[aria-controls="mobile-navigation"][aria-expanded="true"]'
      );
      if (mobileMenuOpen) return;

      event.preventDefault();
      toggle(expandedId);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [expandedId, toggle]);

  const renderStages = (stages: StageStep[]) => stages.map((stage) => (
    <StageCard
      key={stage.number}
      stage={stage}
      expanded={expandedId === stage.number}
      onToggle={() => toggle(stage.number)}
    />
  ));

  return (
    <Section
      id="stages"
      theme="milk"
      sectionIndex={3}
      className={clsx(styles.stagesSection, expandedId && styles.hasExpandedStage)}
      aria-labelledby="stages-title"
      onClickCapture={handleBackdropClick}
    >
      <Container size="md">
        <div className={styles.header}>
          <Heading level={2} overline={t('stages.overline')} id="stages-title">
            {t('stages.title')}
          </Heading>
          <Text variant="body" className={styles.description}>
            {t('stages.description')}
          </Text>
          <p className={styles.callout}>{t('stages.callout')}</p>
        </div>

        <div className={styles.group} role="group" aria-labelledby="stages-before-title">
          <h3 id="stages-before-title" className={styles.groupTitle}>
            {t('stages.group.before')}
          </h3>
          <Grid cols={2} gap="sm" className={styles.grid}>
            {renderStages(preEditStages)}
          </Grid>
        </div>

        <div className={styles.group} role="group" aria-labelledby="stages-post-title">
          <h3 id="stages-post-title" className={styles.groupTitle}>
            {t('stages.group.post')}
          </h3>
          <Grid cols={2} gap="sm" className={styles.grid}>
            {renderStages(postProductionStages)}
          </Grid>
        </div>
      </Container>
    </Section>
  );
};
