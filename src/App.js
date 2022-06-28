import React, { useEffect, useState } from "react";

import "./App.css";
import Header from "./components/Header";
import CharacterTable from "./components/CharacterTable";
import Search from "./components/Search";

import axios from "axios";

const hash = "d30e6c7f6fdd550f6371a2cf63340545";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetch = async () => {
      if (query === "") {
        const result = await axios(
          `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=adf42d9f9722d0473bbfc033269360e0&hash=${hash}`
        );
        console.log(result.data.data.results);
        setItems(result.data.data.results);
        setLoading(false);
      } else {
        const result = await axios(
          `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=adf42d9f9722d0473bbfc033269360e0&hash=${hash}`
        );
        console.log(result.data.data.results);
        setItems(result.data.data.results);
        setLoading(false);
      }
    };
    fetch();
  }, [query]);

  return (
    <div className="container">
      <Header />
      <Search search={(q) => setQuery(q)} />
      <CharacterTable items={items} isLoading={isLoading} />
    </div>
  );
}

export default App;
