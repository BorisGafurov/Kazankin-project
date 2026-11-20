import { Language, TranslationKey } from '@/shared/lib/i18n';

export interface WorkCase {
  id: string;
  imageSrc: string;
  imageSrcByLanguage?: Partial<Record<Language, string>>;
  /** Публичный URL полноценного видео, открываемого по нажатию на карточку. */
  videoSrc?: string;
  /** Публичный URL короткого/предпросмотрового видео карточки. */
  previewVideoSrc?: string;
  /** Известное соотношение сторон основного ролика для правильной геометрии до загрузки metadata. */
  videoAspectRatio?: number;
  titleKey: TranslationKey;
  categoryKey: TranslationKey;
}

const WORK_COVER_BASE = 'https://s3.twcstorage.ru/c8925614-a849-4c93-a31d-76171d3611b7/KPV/works/cover';
const WORK_VIDEO_BASE = 'https://s3.twcstorage.ru/c8925614-a849-4c93-a31d-76171d3611b7/KPV/works/work-videos';

export const getWorkImageSrc = (work: WorkCase, language: Language): string =>
  work.imageSrcByLanguage?.[language] ?? work.imageSrc;

export const WORK_CASES: WorkCase[] = [
  {
    id: 'kate-kravchenko',
    imageSrc: `${WORK_COVER_BASE}/KateKravchenko_RU.png`,
    imageSrcByLanguage: {
      ru: `${WORK_COVER_BASE}/KateKravchenko_RU.png`,
      en: `${WORK_COVER_BASE}/KateKravchenko_EN.png`,
    },
    previewVideoSrc: `${WORK_VIDEO_BASE}/kate-kravchenko-preview.mp4`,
    videoSrc: `${WORK_VIDEO_BASE}/vo-pole-bereza-full.mp4`,
    videoAspectRatio: 9 / 16,
    titleKey: 'works.item1.title',
    categoryKey: 'works.item1.category',
  },
  {
    id: 'choreography',
    imageSrc: `${WORK_COVER_BASE}/horeo%20RU.png`,
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
