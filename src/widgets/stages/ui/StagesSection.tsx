import React from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { Section, Container, Heading, Text, Grid } from '@/shared/ui';
import { STAGES_LIST, StageCard } from '@/entities/stage';
import styles from './StagesSection.module.css';

export const StagesSection: React.FC = () => {
  const { t } = useI18n();
  const preEditStages = STAGES_LIST.filter((stage) => stage.group === 'before');
  const postProductionStages = STAGES_LIST.filter((stage) => stage.group === 'post');

  return (
    <Section id="stages" theme="milk" sectionIndex={3} className={styles.stagesSection}>
      <Container size="md">
        <div className={styles.header}>
          <Heading level={2} overline={t('stages.overline')}>
            {t('stages.title')}
          </Heading>
          <Text variant="body" className={styles.description}>
            {t('stages.description')}
          </Text>
          <p className={styles.callout}>{t('stages.callout')}</p>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>{t('stages.group.before')}</h3>
          <Grid cols={2} gap="sm" className={styles.grid}>
            {preEditStages.map((stage) => <StageCard key={stage.number} stage={stage} />)}
          </Grid>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>{t('stages.group.post')}</h3>
          <Grid cols={2} gap="sm" className={styles.grid}>
            {postProductionStages.map((stage) => <StageCard key={stage.number} stage={stage} />)}
          </Grid>
        </div>
      </Container>
    </Section>
  );
};
