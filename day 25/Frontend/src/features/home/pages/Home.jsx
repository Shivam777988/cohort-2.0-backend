import React, { useEffect, useState } from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import './Home.scss'

const MOODS = ['happy', 'sad', 'angry', 'chill', 'energetic', 'romantic']

function Home() {
    const {
        loading,
        song,
        songList,
        handleGetSong,
        handleGetAllSongs,
        handleUploadSong,
        selectSong,
    } = useSong()

    const [detectedMood, setDetectedMood] = useState('')
    const [uploadMood, setUploadMood] = useState('happy')
    const [uploadFile, setUploadFile] = useState(null)
    const [uploadStatus, setUploadStatus] = useState('')

    useEffect(() => {
        handleGetAllSongs()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleMoodChoice = async (mood) => {
        setDetectedMood(mood)
        await handleGetSong({ mood })
    }

    const handleDetectClick = async (expression) => {
        const mood = expression?.toLowerCase?.().trim() || ''
        if (!mood || mood === 'detecting...') {
            setUploadStatus('Expression not recognized yet.')
            return
        }
        setDetectedMood(mood)
        await handleGetSong({ mood })
    }

    const handleUploadSubmit = async (e) => {
        e.preventDefault()

        if (!uploadFile) {
            setUploadStatus('Pick an mp3 file first.')
            return
        }

        setUploadStatus('Uploading...')
        try {
            const result = await handleUploadSong({ file: uploadFile, mood: uploadMood })
            if (result?.song) {
                setUploadStatus(`Uploaded: ${result.song.title}`)
                setUploadFile(null)
            } else {
                setUploadStatus('Upload succeeded, but could not load the song.')
            }
        } catch (error) {
            setUploadStatus('Upload failed. Check network / file format.')
        }
    }

    return (
        <main className="home home--fullview">
            <section className="home__left">
                <div className="home__panel">
                    <h2>Mood detection</h2>
                    <FaceExpression onClick={handleDetectClick} />
                    <p className="home__detected">Detected mood: <strong>{detectedMood || '…'}</strong></p>

                    <div className="home__mood-grid">
                        {MOODS.map((m) => (
                            <button
                                key={m}
                                type="button"
                                className={`home__mood-btn ${m === song?.mood ? 'active' : ''}`}
                                onClick={() => handleMoodChoice(m)}
                            >
                                {m}
                            </button>
                        ))}
                    </div>

                    <div className="home__status">{loading ? 'Loading song…' : 'Ready'}</div>

                    <div className="home__nowplaying">
                        <h3>Now playing</h3>
                        <img className="home__song-image" src={song?.posterUrl} alt={song?.title} />
                        <p>{song?.title || 'No song selected yet'}</p>
                        <p>{song?.mood ? `Mood: ${song.mood}` : ''}</p>
                    </div>
                </div>

                <div className="home__panel">
                    <h2>Upload song</h2>
                    <form className="upload-form" onSubmit={handleUploadSubmit}>
                        <label>
                            Audio file (MP3)
                            <input
                                type="file"
                                accept="audio/mpeg"
                                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                            />
                        </label>

                        <label>
                            Select mood
                            <select value={uploadMood} onChange={(e) => setUploadMood(e.target.value)}>
                                {MOODS.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </label>

                        <button type="submit" disabled={loading}>
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>
                    </form>
                    <p className="home__upload-status">{uploadStatus}</p>
                </div>
            </section>

            <section className="home__right">
                <h2>Uploaded songs</h2>
                <div className="home__song-list">
                    {songList.length === 0 ? (
                        <p className="home__empty">No songs uploaded yet</p>
                    ) : (
                        songList.map((item) => (
                            <article key={item._id || item.url} className="track-card">
                                <img src={item.posterUrl} alt={item.title} className="track-card__image" />
                                <div className="track-card__info">
                                    <h4>{item.title}</h4>
                                    <p>{item.mood}</p>
                                </div>
                                <button onClick={() => selectSong(item)}>Play</button>
                            </article>
                        ))
                    )}
                </div>
            </section>

            <Player />
        </main>
    )
}

export default Home
