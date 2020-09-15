import React, { useState, useEffect, useRef } from "react";

const gebruikToestand = useState;

type Props = {
  // event listener 'prop'
  onSelectLocation?: (resultaat: Resultaat) => void;
};

export type Resultaat = {
  description: string;
  place_id: string;
};

const googleApiKey = "AIzaSyB1ao2l2GK1-OUXg6KqyChPe3SeNyrgk-Y";

// Promise <- instance van het Promise class
//    = achtergrondproces / task
//    = functie die in de achtergrond wordt aangeroepen,
//       en nog niet klaar hoeft te zijn

async function fetchData(zoekText: string) {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${zoekText}&key=${googleApiKey}`
  );
  const data = await response.json();
  console.log("data", data);
  if (data.status !== "OK") {
    throw new Error("laters");
  }
  return data.predictions as Resultaat[];
}

export default function Searchbar(props: Props) {
  // state
  const [zoekText, zetZoekText] = gebruikToestand("");
  const [resultaten, zetResultaten] = gebruikToestand<Resultaat[]>([]);

  const id = useRef(0);

  // methods
  const herstel = () => {
    zetZoekText("");
  };

  // effect = actie die wordt getriggerd
  // [] -> "mount" trigger
  useEffect(() => {
    console.log("effect", zoekText);
    const myid = ++id.current;

    async function haalGegevensOp() {
      try {
        const res = await fetchData(zoekText);
        if (myid === id.current) {
          zetResultaten(res);
        }
      } catch {
        console.log("whatever");
      }
    }
    if (zoekText.length >= 3) {
      haalGegevensOp();
    }
  }, [zoekText]);

  // view
  return (
    <div>
      <p>
        <input
          placeholder="Search..."
          value={zoekText}
          onChange={(event) => zetZoekText(event.target.value)}
        />
        <button onClick={herstel}>x</button>
      </p>
      <ul>
        {resultaten.map((resultaat) => {
          return (
            <li key={resultaat.place_id}>
              <button
                onClick={() => {
                  if (props.onSelectLocation) {
                    props.onSelectLocation(resultaat);
                  }
                }}
              >
                {resultaat.description}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
