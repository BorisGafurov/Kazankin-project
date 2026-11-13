import React from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { Section, Container, Heading, Text, Button } from '@/shared/ui';
import { Footer } from '@/widgets/footer';
import styles from './ContactSection.module.css';

export const ContactSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <Section id="contact" theme="contact" sectionIndex={4} className={styles.contactSection}>
      <Container size="md" className={styles.mainContainer}>
        <div className={styles.box}>
          <Heading
            level={2}
            overline={t('contact.overline')}
            className={styles.title}
          >
            {t('contact.title').includes('<br>') ? (
              <span dangerouslySetInnerHTML={{ __html: t('contact.title') }} />
            ) : (
              t('contact.title')
            )}
          </Heading>

          <Text variant="lead" className={styles.text}>
            {t('contact.text')}
          </Text>

          <div className={styles.actions}>
            {/* Contact Button with Complete RDR2 Overlap (Screen 1 Fix) */}
            <Button
              as="a"
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              variant="contact"
            >
              {t('contact.btn')}
            </Button>

            <div className={styles.channels}>
              <span className={styles.channelPill}>Telegram</span>
              <span className={styles.channelPill}>WhatsApp</span>
              <span className={styles.channelPill}>Email</span>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </Section>
  );
};
