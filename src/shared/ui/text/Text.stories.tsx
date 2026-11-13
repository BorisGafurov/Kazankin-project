import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Shared/Typography/Text',
  component: Text,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const LeadText: Story = {
  args: {
    variant: 'lead',
    children: 'От отснятого материала до готового видео. Помогу подготовиться к съёмке, соберу монтаж и доведу детали.',
  },
};
