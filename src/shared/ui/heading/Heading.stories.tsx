import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Shared/Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const MainH1: Story = {
  args: {
    level: 1,
    overline: 'МОНТАЖ / ЗВУК / ЦВЕТ / ГРАФИКА',
    children: 'ВАШИ КАДРЫ.',
    highlight: 'ЦЕЛЬНАЯ ИСТОРИЯ.',
  },
};

export const SectionH2: Story = {
  args: {
    level: 2,
    overline: '01 / ВИЗУАЛЬНЫЕ РАБОТЫ',
    children: 'СНАЧАЛА — ВПЕЧАТЛЕНИЕ.',
  },
};
