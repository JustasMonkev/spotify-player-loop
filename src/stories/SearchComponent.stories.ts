import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SearchComponent from "../SearchBar.tsx";
import { Song } from "../types/song";
import "../assets/SearchComponent.css"; // Import the CSS file

const meta = {
  title: 'Components/SearchComponent',
  component: SearchComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    searchResults: { control: 'object' },
    isUlOpen: { control: 'boolean' },
    setIsUlOpen: { action: 'setIsUlOpen' },
    onSongSelected: { action: 'onSongSelected' },
  },
} satisfies Meta<typeof SearchComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSongs: Song[] = [
  {
    name: "Song 1",
    image: "https://example.com/image1.jpg",
    artist: "Artist 1",
    uri: "spotify:track:1234567890",
    duration: 180000
  },
  {
    name: "Song 2",
    image: "https://example.com/image2.jpg",
    artist: "Artist 2",
    uri: "spotify:track:0987654321",
    duration: 210000
  },
];

export const Default: Story = {
  args: {
    searchResults: sampleSongs,
    isUlOpen: true,
    setIsUlOpen: fn(),
    onSongSelected: fn(),
  },
};

export const Empty: Story = {
  args: {
    searchResults: [],
    isUlOpen: false,
    setIsUlOpen: fn(),
    onSongSelected: fn(),
  },
};

export const Closed: Story = {
  args: {
    searchResults: sampleSongs,
    isUlOpen: false,
    setIsUlOpen: fn(),
    onSongSelected: fn(),
  },
};