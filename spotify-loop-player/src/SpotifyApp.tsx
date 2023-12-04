import {
    getCurrentSong,
    getSongBarsTime,
    pauseSpotifyTrack,
    playSpotifyTrackOnRepeat,
    searchForSong,
    setToken
} from './services/spotifyService';
import {ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState} from "react";
import {CurrentSongDisplay} from "./CurrentSongDisplay.tsx";
import {Song} from "./types/song";
import {findClosest} from "./utils.ts";
import SearchComponent from "./SearchBar.tsx";
import {SongHistory} from "./types/songHistory"
import SpotifyHistoryModal from "./SpotifyHistoryModal.tsx";
import Cookies from 'js-cookie';
import "./assets/SearchComponent.css";
import "./assets/styles.css";

function SpotifyApp() {
    const startTime = 6000;
    const endTime = 10000;
    const [startTimeInput, setStartTimeInput] = useState(startTime);
    const [endTimeInput, setEndTimeInput] = useState(endTime);
    const [isPlaying, setIsPlayingButton] = useState(false);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isUlOpen, setIsUlOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<Song[] | []>([]);
    const [isSearchBarEnabled, setIsSearchBarEnabled] = useState(true);
    const accessToken: string = Cookies.get('access_token')!;
    const storedSongJsonString = localStorage.getItem("song");
    const [songHistoryArray, setsongHistoryArray] = useState<SongHistory[]>([]);

    setToken(accessToken);

    useEffect(() => {
        if (storedSongJsonString) {
            const storedSong = JSON.parse(storedSongJsonString) as Song;
            setCurrentSong(storedSong);
        }
        setsongHistoryArray(localStorage.getItem("song-history") ? JSON.parse(localStorage.getItem("song-history")!) : [])
    }, [storedSongJsonString]);


    useEffect(() => {
        if (isPlaying) {
            const fetchData = async () => {
                const newCurrentSong = await getCurrentSong(currentSong?.uri);
                setCurrentSong(newCurrentSong);

                if (!currentSong) return;

                const bars = await getSongBarsTime(currentSong.uri!);

                setStartTimeInput(findClosest(startTimeInput, bars))
                setEndTimeInput(findClosest(endTimeInput, bars))

                await playSpotifyTrackOnRepeat(currentSong?.uri, startTimeInput, endTimeInput);
            };

            fetchData();
        }
    }, [isPlaying, startTimeInput, endTimeInput, currentSong?.uri]);


    function numberOnly(event: KeyboardEvent) {
        if (event.key.match(/[^0-9]/) && event.key !== 'Backspace'
            && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight'
            && event.key !== 'Tab') {
            event.preventDefault();
        }
    }

    const handleTimeInputChange = (
        event: ChangeEvent<HTMLInputElement>,
        isStartTime: boolean,
    ) => {
        const inputValue = Number(event.target.value.replace(/\D/g, ''));
        const maxValue = getCurrentSongDuration()

        // Handle the case when the input value is empty or less than or equal to 0
        if (inputValue <= 0 || event.target.value === '') {
            if (isStartTime) {
                setStartTimeInput(startTime)
            } else {
                setEndTimeInput(endTime)
            }
            return
        }

        // Handle the case when the input value is greater than the song's duration
        if (inputValue > maxValue) {
            if (isStartTime) {
                setStartTimeInput(0)
            } else {
                setEndTimeInput(maxValue)
            }
            return
        }

        // Handle the case when updating start time input
        if (isStartTime) {
            // If the input value is greater than or equal to the end time input, adjust both start and end times
            if (inputValue >= endTimeInput) {
                setStartTimeInput(endTimeInput)
                setEndTimeInput(inputValue)
            } else {
                // Otherwise, just update the start time input
                setStartTimeInput(inputValue)
            }
        }
        // Handle the case when updating end time input
        else {
            // If the input value is less than or equal to the start time input, adjust both start and end times
            if (inputValue <= startTimeInput) {
                setEndTimeInput(startTimeInput)
                setStartTimeInput(inputValue)
            } else {
                // Otherwise, just update the end time input
                setEndTimeInput(inputValue)
            }
        }
    }


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the default form submission event
    }

    const handlePlayClick = () => {
        setIsPlayingButton(true);
        setIsSearchBarEnabled(false)
        const songArray: SongHistory[] = [];
        songArray.push(
            {
                song: currentSong, songStartTime: startTimeInput, songEndTime: endTimeInput
            } as SongHistory
        )
        setsongHistoryArray((prevsongHistoryArray) => {
            const newSong = songArray[0];
            const oldSongIndex = prevsongHistoryArray.findIndex(song => song.song.name === newSong.song.name);

            let newsongHistoryArray;
            if (oldSongIndex !== -1) {
                // Replace old song with new song
                newsongHistoryArray = [...prevsongHistoryArray];
                newsongHistoryArray[oldSongIndex] = newSong;
            } else {
                // Add new song to history
                newsongHistoryArray = [...prevsongHistoryArray, newSong];
            }

            localStorage.setItem("song-history", JSON.stringify(newsongHistoryArray));
            return newsongHistoryArray;
        });

        localStorage.removeItem("song");
        localStorage.setItem("song", JSON.stringify(currentSong));
    };


    const handlePauseClick = async () => {
        await pauseSpotifyTrack(accessToken);
        setIsPlayingButton(false);
        setIsSearchBarEnabled(true)
        setSearchTerm("");
    };

    const setSearchInput = async (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const results: Song[] = await searchForSong(searchTerm);
        setSearchResults(results);
    };

    const handleSongSelected = (song: Song) => {
        setSearchTerm(song.name);
    };

    const clearInputClick = () => {
        setSearchTerm("");
    };

    const getCurrentSongDuration = () => {
        if (currentSong) {
            return currentSong.duration
        }
        return 0;
    }

    function clearHistory() {
        localStorage.removeItem("song-history");
        setsongHistoryArray([]);
    }

    return (
        <div className="player-container" id="player">
            {songHistoryArray.length !== 0 && !isPlaying && (
                <div className='clear-history-button-container'>
                    <button className="clear-history-button"
                            data-testid="clear-history-button"
                            onClick={() => clearHistory()}>Clear Spotify History
                    </button>
                </div>
            )}
            <CurrentSongDisplay song={currentSong} isSpinning={isPlaying}/>
            <form className="input-form" onSubmit={handleSubmit}>
                {isSearchBarEnabled &&
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search for a song"
                            onFocus={() => setIsUlOpen(true)}
                            onChange={(e) => setSearchInput(e)}
                            data-testid="search-input"
                            value={searchTerm}
                        />
                        {searchTerm && (
                            <button className="clear-input-button" onClick={() => clearInputClick()} tabIndex={0}
                                    aria-label="clear search button"
                                    data-testid="clear-input-button"
                            />
                        )}
                    </div>
                }
                {isSearchBarEnabled && searchTerm && (
                    <SearchComponent searchResults={searchResults} isUlOpen={isUlOpen} setIsUlOpen={setIsUlOpen}
                                     onSongSelected={handleSongSelected}/>
                )}
                {currentSong && (
                    <div className="input-form">
                        <input type="text" placeholder="start song time"
                               pattern="[0-9]*"
                               onKeyDown={numberOnly}
                               data-testid="start-time-input"
                               onChange={(e => handleTimeInputChange(e, true))}/>
                        <input type="text" placeholder="end song time"
                               pattern="[0-9]*"
                               data-testid="end-time-input"
                               onKeyDown={numberOnly}
                               onChange={(e => handleTimeInputChange(e, false))}/>
                        <div className="player-controls">
                            <button onClick={handlePlayClick} disabled={isPlaying}
                                    data-testid={isPlaying ? "play-button-disabled" : "play-button-enabled"}>Play Song
                            </button>
                            <button onClick={handlePauseClick} data-testid="pause-button">Pause Track</button>
                        </div>
                    </div>
                )}
            </form>
            {currentSong && !isPlaying && (
                <SpotifyHistoryModal songs={songHistoryArray} onSongSelected={setCurrentSong}/>
            )}
        </div>
    );
}

export default SpotifyApp;
