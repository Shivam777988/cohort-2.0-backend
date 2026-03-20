import { getSong, getSongs, uploadSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
    const context = useContext(SongContext)
    const { loading, setLoading, song, setSong, songList, setSongList } = context

    async function handleGetSong({ mood }) {
        setLoading(true)
        const data = await getSong({ mood })
        if (data?.song) setSong(data.song)
        setLoading(false)
        return data
    }

    async function handleGetAllSongs() {
        setLoading(true)
        const data = await getSongs()
        if (data?.songs) setSongList(data.songs)
        setLoading(false)
        return data
    }

    async function handleUploadSong({ file, mood }) {
        setLoading(true)
        const data = await uploadSong({ file, mood })
        if (data?.song) {
            setSong(data.song)
            setSongList((prev) => [data.song, ...prev])
        }
        setLoading(false)
        return data
    }

    function selectSong(track) {
        if (track) setSong(track)
    }

    return {
        loading,
        song,
        songList,
        handleGetSong,
        handleGetAllSongs,
        handleUploadSong,
        selectSong,
    }
}
