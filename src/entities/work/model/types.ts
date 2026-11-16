import { TranslationKey } from '@/shared/lib/i18n';

export interface WorkCase {
  id: string;
  imageSrc: string;
  titleKey: TranslationKey;
  categoryKey: TranslationKey;
}

export const WORK_CASES: WorkCase[] = [
  {
    id: 'redemption',
    imageSrc: '/images/works/redemption.jpg',
    titleKey: 'works.item1.title',
    categoryKey: 'works.item1.category',
  },
  {
    id: 'moscow',
    imageSrc: '/images/works/moscow.jpg',
    titleKey: 'works.item2.title',
    categoryKey: 'works.item2.category',
  },
  {
    id: 'libido',
    imageSrc: '/images/works/libido.jpg',
    titleKey: 'works.item3.title',
    categoryKey: 'works.item3.category',
  },
  {
    id: 'power',
    imageSrc: '/images/works/power.jpg',
    titleKey: 'works.item4.title',
    categoryKey: 'works.item4.category',
  },
  {
    id: 'childhood',
    imageSrc: '/images/works/childhood.jpg',
    titleKey: 'works.item5.title',
    categoryKey: 'works.item5.category',
  },
  {
    id: 'transformation',
    imageSrc: '/images/works/transformation.jpg',
    titleKey: 'works.item6.title',
    categoryKey: 'works.item6.category',
  },
  {
    id: 'redemption-variant',
    imageSrc: '/images/works/redemption-variant.jpg',
    titleKey: 'works.item7.title',
    categoryKey: 'works.item7.category',
  },
];
