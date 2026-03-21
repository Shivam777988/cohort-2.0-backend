import React from "react";
import "./About.scss";

const AboutPage = () => {
  return (
    <main className="about-page">
      <section className="about-panel">
        <div className="about-header">
          <h1>🎧 Moodify</h1>
          <p className="tagline">
            Music that understands your mood
          </p>
        </div>

        <div className="about-content">
          <p>
            Moodify is an AI-powered music player that helps you discover songs
            based on your emotions. Whether you're feeling happy, chill,
            romantic, or energetic — Moodify adapts to you.
          </p>

          <p>
            Upload your favorite tracks, organize them with mood tags, and enjoy
            a personalized listening experience. Your music, your vibe, your
            control.
          </p>
        </div>

        <div className="features">
          <div className="feature-card">
            <h3>🎭 Mood Detection</h3>
            <p>Detects emotions and suggests matching songs instantly.</p>
          </div>

          <div className="feature-card">
            <h3>📂 Personal Library</h3>
            <p>Upload and manage your own MP3 collection.</p>
          </div>

          <div className="feature-card">
            <h3>⚡ Smart Playback</h3>
            <p>Dynamic UI with real-time track info and mood context.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;