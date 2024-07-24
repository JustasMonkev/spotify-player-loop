import type { Meta, StoryObj } from '@storybook/react';
import SpotifyHistoryModal from '../SpotifyHistoryModal.tsx';
import { Song } from '../types/song';
import { SongHistory } from '../types/songHistory';
import ReactModal from 'react-modal';

const meta = {
  title: 'Components/SpotifyHistoryModal',
  component: SpotifyHistoryModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSongSelected: { action: 'songSelected' },
  },
} satisfies Meta<typeof SpotifyHistoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;
ReactModal.setAppElement(document.createElement('div'));

const mockSong: Song = {
  name: "Bohemian Rhapsody",
  artist: "Queen",
  image: "https://example.com/bohemian-rhapsody.jpg",
  uri: "spotify:track:6rqhFgbbKwnb9MLmUQDhG6",
  duration: 354000
};

const mockSongHistory: SongHistory[] = [
  {
    song: mockSong,
    songStartTime: 60000,
    songEndTime: 120000
  },
  {
    song: { ...mockSong, name: "Another One Bites the Dust", uri: "spotify:track:5vdp5UmvTsnMEMESIF2Ym7" },
    songStartTime: 30000,
    songEndTime: 90000
  }
];

export const WithHistory: Story = {
  args: {
    songs: mockSongHistory,
    onSongSelected: (song: Song | null) => console.log('Song selected:', song),
  },
};

export const EmptyHistory: Story = {
  args: {
    songs: [],
    onSongSelected: (song: Song | null) => console.log('Song selected:', song),
  },
};