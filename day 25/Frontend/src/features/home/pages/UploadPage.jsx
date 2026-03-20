import React, { useState } from 'react'
import { useSong } from '../hooks/useSong'
import './Home.scss'

export default function UploadPage() {
    const { loading, handleUploadSong } = useSong()
    const [file, setFile] = useState(null)
    const [mood, setMood] = useState('happy')
    const [message, setMessage] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        if (!file) return setMessage('please select mp3 to upload')
        setMessage('uploading...')
        const result = await handleUploadSong({ file, mood })
        if (result?.song) {
            setMessage(`uploaded: ${result.song.title}`)
            setFile(null)
        } else {
            setMessage('upload failed')
        }
    }

    return (
        <section className="home-panel fast-card">
            <h3>Upload song</h3>
            <form onSubmit={submit} className="upload-form">
                <label>
                    audio (MP3)
                    <input type="file" accept="audio/mpeg" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </label>
                <label>
                    mood
                    <select value={mood} onChange={(e) => setMood(e.target.value)}>
                        <option value="happy">happy</option>
                        <option value="sad">sad</option>
                        <option value="angry">angry</option>
                        <option value="chill">chill</option>
                        <option value="energetic">energetic</option>
                        <option value="romantic">romantic</option>
                    </select>
                </label>
                <button type="submit" disabled={loading}>
                    UPLOAD
                </button>
            </form>
            <p className="info-text">{message}</p>
        </section>
    )
}
