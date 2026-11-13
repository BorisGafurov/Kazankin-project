import React from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { Section, Container, Heading, Text, Grid } from '@/shared/ui';
import { STAGES_LIST, StageCard } from '@/entities/stage';
import { useStageAccordion } from '@/features/stage-accordion';
import styles from './StagesSection.module.css';

export const StagesSection: React.FC = () => {
  const { t } = useI18n();
  const { expandedId, toggle } = useStageAccordion('08');

  return (
    <Section id="stages" theme="milk" sectionIndex={2} className={styles.stagesSection}>
      <Container size="md">
        <div className={styles.header}>
          <Heading level={2} overline={t('stages.overline')}>
            {t('stages.title')}
          </Heading>
          <Text variant="body" className={styles.description}>
            {t('stages.description')}
          </Text>
        </div>

        <Grid cols={2} gap="sm" className={styles.grid}>
          {STAGES_LIST.map((stage) => (
            <StageCard
              key={stage.number}
              stage={stage}
              isExpanded={expandedId === stage.number}
              onToggle={() => toggle(stage.number)}
            />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};
