import React from 'react'
import { useSong } from '../hooks/useSong'
import './Home.scss'

export default function LibraryPage() {
    const { songList, selectSong } = useSong()

    return (
        <section className="home-panel fast-card">
            <h3>Uploaded song library</h3>
            {songList.length === 0 ? (
                <p>No songs yet</p>
            ) : (
                <div className="song-grid">
                    {songList.map((item) => (
                        <article key={item._id || item.url} className="track-card">
                            <img className="track-card__image" src={item.posterUrl} alt={item.title} />
                            <div className="track-card__info">
                                <h4>{item.title}</h4>
                                <p>{item.mood}</p>
                            </div>
                            <button onClick={() => selectSong(item)}>play</button>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}
