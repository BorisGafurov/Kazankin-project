import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Controls/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryRDR2: Story = {
  args: {
    variant: 'primary',
    children: 'Смотреть работы ↗',
  },
};

export const ContactButtonFixed: Story = {
  args: {
    variant: 'contact',
    children: 'Связаться со мной ↗',
  },
};

export const SliderArrowCircular: Story = {
  args: {
    variant: 'circular',
    children: '←',
  },
};
