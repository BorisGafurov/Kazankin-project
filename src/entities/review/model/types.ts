import { TranslationKey } from '@/shared/lib/i18n';

export interface ReviewItem {
  id: string;
  avatar: string;
  score: number;
  textKey: TranslationKey;
  nameKey: TranslationKey;
  projectKey: TranslationKey;
}

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: 'rev-1',
    avatar: 'AK',
    score: 5,
    textKey: 'reviews.r1.text',
    nameKey: 'reviews.r1.name',
    projectKey: 'reviews.r1.project',
  },
  {
    id: 'rev-2',
    avatar: 'EB',
    score: 5,
    textKey: 'reviews.r2.text',
    nameKey: 'reviews.r2.name',
    projectKey: 'reviews.r2.project',
  },
  {
    id: 'rev-3',
    avatar: 'MP',
    score: 5,
    textKey: 'reviews.r3.text',
    nameKey: 'reviews.r3.name',
    projectKey: 'reviews.r3.project',
  },
];
