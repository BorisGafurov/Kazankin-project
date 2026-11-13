import { TranslationKey } from '@/shared/lib/i18n';

export interface WorkCase {
  id: string;
  posterTitleKey: TranslationKey;
  posterCaptionKey: TranslationKey;
  titleKey: TranslationKey;
  categoryKey: TranslationKey;
  theme: 'redemption' | 'moscow' | 'libido' | 'business' | 'promo';
}

export const WORK_CASES: WorkCase[] = [
  {
    id: 'case-1',
    posterTitleKey: 'works.item1.posterTitle',
    posterCaptionKey: 'works.item1.posterCaption',
    titleKey: 'works.item1.title',
    categoryKey: 'works.item1.category',
    theme: 'redemption',
  },
  {
    id: 'case-2',
    posterTitleKey: 'works.item2.posterTitle',
    posterCaptionKey: 'works.item2.posterCaption',
    titleKey: 'works.item2.title',
    categoryKey: 'works.item2.category',
    theme: 'moscow',
  },
  {
    id: 'case-3',
    posterTitleKey: 'works.item3.posterTitle',
    posterCaptionKey: 'works.item3.posterCaption',
    titleKey: 'works.item3.title',
    categoryKey: 'works.item3.category',
    theme: 'libido',
  },
  {
    id: 'case-4',
    posterTitleKey: 'works.item4.posterTitle',
    posterCaptionKey: 'works.item4.posterCaption',
    titleKey: 'works.item4.title',
    categoryKey: 'works.item4.category',
    theme: 'business',
  },
  {
    id: 'case-5',
    posterTitleKey: 'works.item5.posterTitle',
    posterCaptionKey: 'works.item5.posterCaption',
    titleKey: 'works.item5.title',
    categoryKey: 'works.item5.category',
    theme: 'promo',
  },
];
