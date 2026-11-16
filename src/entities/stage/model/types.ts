import { TranslationKey } from '@/shared/lib/i18n';

export type StageGroup = 'before' | 'post';
export type StageBadgeVariant = 'take' | 'agree' | 'help' | 'none';

export interface StageStep {
  number: string;
  group: StageGroup;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  noteKey?: TranslationKey;
  badgeKey: TranslationKey;
  badgeVariant: StageBadgeVariant;
}

export const STAGES_LIST: StageStep[] = [
  {
    number: '01',
    group: 'before',
    titleKey: 'stages.s1.title',
    descKey: 'stages.s1.desc',
    noteKey: 'stages.s1.note',
    badgeKey: 'stages.badge.agree',
    badgeVariant: 'agree',
  },
  {
    number: '02',
    group: 'before',
    titleKey: 'stages.s2.title',
    descKey: 'stages.s2.desc',
    noteKey: 'stages.s2.note',
    badgeKey: 'stages.badge.agree',
    badgeVariant: 'agree',
  },
  {
    number: '03',
    group: 'before',
    titleKey: 'stages.s3.title',
    descKey: 'stages.s3.desc',
    badgeKey: 'stages.badge.help',
    badgeVariant: 'help',
  },
  {
    number: '04',
    group: 'before',
    titleKey: 'stages.s4.title',
    descKey: 'stages.s4.desc',
    noteKey: 'stages.s4.note',
    badgeKey: 'stages.badge.none',
    badgeVariant: 'none',
  },
  {
    number: '05',
    group: 'post',
    titleKey: 'stages.s5.title',
    descKey: 'stages.s5.desc',
    badgeKey: 'stages.badge.take',
    badgeVariant: 'take',
  },
  {
    number: '06',
    group: 'post',
    titleKey: 'stages.s6.title',
    descKey: 'stages.s6.desc',
    badgeKey: 'stages.badge.take',
    badgeVariant: 'take',
  },
  {
    number: '07',
    group: 'post',
    titleKey: 'stages.s7.title',
    descKey: 'stages.s7.desc',
    badgeKey: 'stages.badge.take',
    badgeVariant: 'take',
  },
  {
    number: '08',
    group: 'post',
    titleKey: 'stages.s8.title',
    descKey: 'stages.s8.desc',
    badgeKey: 'stages.badge.take',
    badgeVariant: 'take',
  },
  {
    number: '09',
    group: 'post',
    titleKey: 'stages.s9.title',
    descKey: 'stages.s9.desc',
    noteKey: 'stages.s9.note',
    badgeKey: 'stages.badge.take',
    badgeVariant: 'take',
  },
];
