import React, { useState } from "react";
import './App.css'
import NUser from './NoUser.webp'

const App = () => {
  const [search, setSearch] = useState("");
  const [mdata, setMdata] = useState(null); // Initialize as null

  const handler = (e) => {
    setSearch(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${search}`)
      .then((res) => res.json())
      .then((data) => setMdata(data));
  };

  return (
    <div>
      <center>
        <h3>Search Github User</h3>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter Username"
            value={search}
            onChange={handler}
          />{" "}
          <br />
          <input className="btn btn-primary mt-2" type="submit" name="search" />
        </form>

        {/* Display data only if mdata exists */}
        {mdata && !mdata.message ? (
          <div>
            <div className="container">
              <div className="profile">
                <img src={mdata.avatar_url} alt="Avatar" className="avatar" />
                <div className="user-info">
                  <h4>{mdata.name}</h4>
                  <p>Public Repos: {mdata.public_repos} <br/>
                   Followers: {mdata.followers} <br/>
                   Following: {mdata.following}
                  </p>
                  
                </div>
              </div>
            </div> 
          </div>
        ) : (
          mdata?.message && 
          (
            <div className="no-user">
              <img src={NUser} alt="User Not Found" className="not-found-img" />
              <p className="no-user">User not found. Try again!</p>
            </div>
          )
        )}
      </center>
    </div>
  );
};

export default App;

// https://github-user-search-snowy-nine.vercel.app/ -- Deployment Link
