import axios from "axios"

const api = axios.create({
  baseURL: "https://cohort-2-0-backend-2-uqnm.onrender.com",
  withCredentials: true,
})

export async function getSong({ mood }) {
  const response = await api.get("/api/songs", {
    params: { mood },
  })
  return response.data
}

export async function getSongs() {
  const response = await api.get("/api/songs")
  return response.data
}

export async function uploadSong({ file, mood }) {
  const formData = new FormData()
  formData.append("song", file)
  formData.append("mood", mood)

  const response = await api.post("/api/songs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response.data
}