import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);

  React.useEffect(() => {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/standings?season=2020&league=39';

    fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'API-KEY-HERE',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    })
      .then((res) => res.json())
      .then((json) => {
        setItems(json.response);
        setIsDataLoaded(true);
      });
  }, []);


  if (!isDataLoaded) {
    return (
      <div>
        <h1>Please chill, data is still loading</h1>
      </div>
    );
  }

  const renderStandingsRow = (teamData) => {
    const isGreenRow = teamData.rank >= 1 && teamData.rank <= 4;
    const isRedRow = teamData.rank >= 18 && teamData.rank <= 20;
    const rowClass = isGreenRow ? "green-row" : isRedRow ? "red-row" : "";
  
    return (
      <div key={teamData.team.id} className={`table-row ${rowClass}`}>
        <div className="table-cell">{teamData.rank}</div>
        <div className="table-cell team-cell">
          <img src={teamData.team.logo} alt={teamData.team.name} width="30" />
          {teamData.team.name}
        </div>
      <div className="table-cell">{teamData.points}</div>
      <div className="table-cell">{teamData.all.played}</div>
      <div className="table-cell">{teamData.all.win}</div>
      <div className="table-cell">{teamData.all.draw}</div>
      <div className="table-cell">{teamData.all.lose}</div>
      <div className="table-cell">{teamData.goalsDiff}</div>
      <div className="table-cell">{teamData.form}</div>
    </div>
 );
};

  return (
    <div className="Home">
      <div className="table-container">
        <div className="table-row table-header">
          <div className="table-cell">Rank</div>
          <div className="table-cell">Team</div>
          <div className="table-cell">Points</div>
          <div className="table-cell">Played</div>
          <div className="table-cell">Win</div>
          <div className="table-cell">Draw</div>
          <div className="table-cell">Lose</div>
          <div className="table-cell">Goal Difference</div>
          <div className="table-cell">Form</div>
        </div>
        {items[0].league.standings[0].map(renderStandingsRow)}
      </div>
    </div>
  );
};


// ... (About and App components)


const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <div>
            <h1 style={{ color: "white" }}>Premier League Standings</h1>
          </div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;