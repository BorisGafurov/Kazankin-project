import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Shared/Layout/Container',
  component: Container,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    size: 'md',
    children: (
      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '24px', textAlign: 'center' }}>
        Centered Container Content
      </div>
    ),
  },
};
