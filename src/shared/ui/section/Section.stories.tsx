import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './Section';

const meta: Meta<typeof Section> = {
  title: 'Shared/Layout/Section',
  component: Section,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Section>;

export const DarkTheme: Story = {
  args: {
    id: 'hero',
    theme: 'dark',
    children: <div style={{ textAlign: 'center' }}>Dark Section Content</div>,
  },
};

export const MilkTheme: Story = {
  args: {
    id: 'works',
    theme: 'milk',
    children: <div style={{ textAlign: 'center' }}>Milk Background Section</div>,
  },
};
