import type { Meta, StoryObj } from '@storybook/react';
import { CurrentSongDisplay } from '../CurrentSongDisplay.tsx';
import { Song } from "../types/song";

const meta = {
  title: 'Components/CurrentSongDisplay',
  component: CurrentSongDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    song: {
      control: 'object',
    },
    isSpinning: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof CurrentSongDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSong: Song = {
  name: "Bohemian Rhapsody",
  artist: "Queen",
  image: "https://example.com/bohemian-rhapsody.jpg",
  uri: "spotify:track:6rqhFgbbKwnb9MLmUQDhG6",
  duration: 354000
};

export const Playing: Story = {
  args: {
    song: sampleSong,
    isSpinning: true,
  },
};

export const Paused: Story = {
  args: {
    song: sampleSong,
    isSpinning: false,
  },
};

export const NoSong: Story = {
  args: {
    song: null,
    isSpinning: false,
  },
};

export const LongTitles: Story = {
  args: {
    song: {
      ...sampleSong,
      name: "This is an Extremely Long Song Title That Might Cause Wrapping Issues",
      artist: "The Band with an Incredibly Long Name That Goes on Forever",
    },
    isSpinning: true,
  },
};