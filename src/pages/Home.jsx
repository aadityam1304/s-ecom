function Home() {
  return (
    <main>
      <section className="band-banner">
        <h1>The Generics</h1>

        <button className="album-button">Get Our Latest Album ▶</button>
      </section>

      <section className="container my-5">
        <h2 className="text-center mb-4">TOURS</h2>
        <p className="text-center">Our tour dates will appear here.</p>
      </section>

      <section className="container my-5">
        <h2 className="text-center mb-4">TOURS</h2>

        <div className="tour-list">
          <div className="tour-row">
            <span>JUL 16</span>
            <span>DETROIT, MI</span>
            <span>DTE ENERGY MUSIC THEATRE</span>
            <button className="btn btn-primary">BUY TICKETS</button>
          </div>

          <div className="tour-row">
            <span>JUL 19</span>
            <span>TORONTO, ON</span>
            <span>BUDWEISER STAGE</span>
            <button className="btn btn-primary">BUY TICKETS</button>
          </div>

          <div className="tour-row">
            <span>JUL 22</span>
            <span>BRISTOW, VA</span>
            <span>JIGGY LUBE LIVE</span>
            <button className="btn btn-primary">BUY TICKETS</button>
          </div>

          <div className="tour-row">
            <span>JUL 29</span>
            <span>PHOENIX, AZ</span>
            <span>AK-CHIN PAVILION</span>
            <button className="btn btn-primary">BUY TICKETS</button>
          </div>

          <div className="tour-row">
            <span>AUG 2</span>
            <span>LAS VEGAS, NV</span>
            <span>T-MOBILE ARENA</span>
            <button className="btn btn-primary">BUY TICKETS</button>
          </div>

          <div className="tour-row">
            <span>AUG 7</span>
            <span>CONCORD, CA</span>
            <span>CONCORD PAVILION</span>
            <button className="btn btn-primary">BUY TICKETS</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
