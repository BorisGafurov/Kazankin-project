import { TranslationKey } from '@/shared/lib/i18n';

export type ReviewScore = 1 | 2 | 3 | 4 | 5;

export interface ReviewItem {
  id: string;
  avatar: string;
  score: ReviewScore;
  textKey: TranslationKey;
  nameKey: TranslationKey;
  projectKey: TranslationKey;
  isMock?: boolean;
}

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: 'mock-review',
    avatar: 'DEMO',
    score: 5,
    textKey: 'reviews.r1.text',
    nameKey: 'reviews.r1.name',
    projectKey: 'reviews.r1.project',
    isMock: true,
  },
];
