// import { useState, useEffect } from "react";

const useRandomWord = () => {
  // const [randomAdj, setRandomAdj] = useState(null);
  // const [randomThing, setRandomThing] = useState(null);
  // const [randomWord, setRandomWord] = useState("");
  const adj = [
    "alive",
    "awake",
    "basic",
    "big",
    "bland",
    "blond",
    "bold",
    "brave",
    "brief",
    "bright",
    "calm",
    "cheap",
    "clean",
    "clear",
    "close",
    "cool",
    "crazy",
    "cute",
    "dark",
    "dear",
    "deep",
    "dizzy",
    "dull",
    "early",
    "empty",
    "faint",
    "false",
    "fast",
    "fierce",
    "fiery",
    "fine",
    "fresh",
    "frail",
    "free",
    "full",
    "good",
    "grand",
    "great",
    "happy",
    "hard",
    "heavy",
    "high",
    "hot",
    "jolly",
    "kind",
    "light",
    "lone",
    "loose",
    "loud",
    "mad",
  ];
  const things = [
    "apple",
    "book",
    "car",
    "dog",
    "echo",
    "fire",
    "glass",
    "house",
    "ink",
    "jazz",
    "kite",
    "lamp",
    "moon",
    "nest",
    "ocean",
    "piano",
    "queen",
    "river",
    "star",
    "tree",
    "umbra",
    "violet",
    "water",
    "xylo",
    "yacht",
    "zebra",
    "bike",
    "candy",
    "duck",
    "eggs",
    "fairy",
    "globe",
    "hat",
    "idea",
    "joker",
    "key",
    "lion",
    "maze",
    "ninja",
    "oasis",
    "puppy",
    "quiet",
    "robot",
    "snake",
    "tiger",
    "unicorn",
    "virus",
    "wings",
    "xenon",
    "yodel",
    "zesty",
  ];

  // useEffect(() => {
  const randomIndex1 = Math.floor(Math.random() * adj.length);
  const randomIndex2 = Math.floor(Math.random() * things.length);
  // setRandomWord(`${adj[randomIndex1]} ${things[randomIndex2]}`);
  // }, [adj, things]);
  const randomWord = `${adj[randomIndex1]} ${things[randomIndex2]}`;
  return randomWord;
};
//   useEffect(() => {
//     const randomIndex = Math.floor(Math.random() * adj.length);
//     setRandomAdj(adj[randomIndex]);
//     const randomIndex2 = Math.floor(Math.random() * things.length);
//     setRandomThing(things[randomIndex2]);
//   }, []);

//   return [`${randomAdj} ${randomThing}`];
// };

export default useRandomWord;
