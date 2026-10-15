function Footer() {
  return (
    <footer className="bg-info text-white py-4 mt-5">
      <div className="container d-flex justify-content-between align-items-center flex-wrap gap-3">
        <h2 className="mb-0">The Generics</h2>

        <div className="d-flex align-items-center gap-3">
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            YouTube
          </a>

          <a href="https://spotify.com/" target="_blank" rel="noreferrer">
            Spotify
          </a>

          <a href="https://facebook.com/" target="_blank" rel="noreferrer">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
