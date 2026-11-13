import { TranslationKey } from '@/shared/lib/i18n';

export interface StageStep {
  number: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  detailKey: TranslationKey;
  badgeKey: TranslationKey;
  badgeVariant: 'take' | 'agree' | 'none';
}

export const STAGES_LIST: StageStep[] = [
  {
    number: '01',
    titleKey: 'stages.s1.title',
    descKey: 'stages.s1.desc',
    detailKey: 'stages.s1.detail',
    badgeKey: 'stages.badge.take',
    badgeVariant: 'take',
  },
  {
    number: '02',
    titleKey: 'stages.s2.title',
    descKey: 'stages.s2.desc',
    detailKey: 'stages.s2.detail',
    badgeKey: 'stages.badge.agree',
    badgeVariant: 'agree',
  },
  {
    number: '03',
    titleKey: 'stages.s3.title',
    descKey: 'stages.s3.desc',
    detailKey: 'stages.s3.detail',
    badgeKey: 'stages.badge.agree',
    badgeVariant: 'agree',
  },
  {
    number: '04',
    titleKey: 'stages.s4.title',
    descKey: 'stages.s4.desc',
    detailKey: 'stages.s4.detail',
    badgeKey: 'stages.badge.none',
    badgeVariant: 'none',
  },
  {
    number: '05',
    titleKey: 'stages.s5.title',
    descKey: 'stages.s5.desc',
    detailKey: 'stages.s5.detail',
    badgeKey: 'stages.badge.take',
    badgeVariant: 'take',
  },
  {
    number: '06',
    titleKey: 'stages.s6.title',
    descKey: 'stages.s6.desc',
    detailKey: 'stages.s6.detail',
    badgeKey: 'stages.badge.take',
    badgeVariant: 'take',
  },
  {
    number: '07',
    titleKey: 'stages.s7.title',
    descKey: 'stages.s7.desc',
    detailKey: 'stages.s7.detail',
    badgeKey: 'stages.badge.take',
    badgeVariant: 'take',
  },
  {
    number: '08',
    titleKey: 'stages.s8.title',
    descKey: 'stages.s8.desc',
    detailKey: 'stages.s8.detail',
    badgeKey: 'stages.badge.take',
    badgeVariant: 'take',
  },
  {
    number: '09',
    titleKey: 'stages.s9.title',
    descKey: 'stages.s9.desc',
    detailKey: 'stages.s9.detail',
    badgeKey: 'stages.badge.take',
    badgeVariant: 'take',
  },
  {
    number: '10',
    titleKey: 'stages.s10.title',
    descKey: 'stages.s10.desc',
    detailKey: 'stages.s10.detail',
    badgeKey: 'stages.badge.take',
    badgeVariant: 'take',
  },
];
