import React from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { Section, Container, Heading, Text, Button } from '@/shared/ui';
import { Footer } from '@/widgets/footer';
import styles from './ContactSection.module.css';

export const ContactSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <Section id="contact" theme="contact" sectionIndex={3} className={styles.contactSection}>
      <Container size="md" className={styles.mainContainer}>
        <div className={styles.box}>
          <Heading
            level={2}
            overline={t('contact.overline')}
            highlight={t('contact.titleLine2')}
            className={styles.title}
          >
            {t('contact.titleLine1')}
          </Heading>

          <Text variant="lead" className={styles.text}>
            {t('contact.text')}
          </Text>

          <div className={styles.actions}>
            <Button
              as="a"
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              variant="contact"
            >
              {t('contact.btn')}
            </Button>
          </div>
        </div>
      </Container>

      <Footer />
    </Section>
  );
};
