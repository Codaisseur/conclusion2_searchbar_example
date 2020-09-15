import React from "react";
import Searchbar from "./components/Searchbar";

export default function App() {
  // view
  return (
    <div>
      <Searchbar
        onSelectLocation={(resultaat) => {
          console.log("gevonden:", resultaat);
        }}
      />
      <Searchbar />
      <Searchbar />
    </div>
  );
}
