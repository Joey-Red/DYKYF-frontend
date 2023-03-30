import React, { useState, useEffect } from "react";
import axios from "axios";
import bannerTransparent from "./assets/misc/BannerTransparent.png";
function PreGame() {
  let [questions, setQuestions] = useState([]);
  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get-questions")
      .then((res) => {
        setQuestions(res.data);
        setLoaded(true);
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <img src={bannerTransparent} className="h-[200px]" alt="" />
      {!loaded && (
        <div className="flex justify-evenly gap-4 w-full">
          <div className="flex flex-col">
            <p>Loading..</p>
            <ul>
              <li>a) Loading..</li>
              <li>b) Loading.. </li>
              <li>c) Loading..</li>
              <li>d) Loading..</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p>Loading..</p>
            <ul>
              <li>a) Loading..</li>
              <li>b) Loading.. </li>
              <li>c) Loading..</li>
              <li>d) Loading..</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p>Loading..</p>
            <ul>
              <li>a) Loading..</li>
              <li>b) Loading.. </li>
              <li>c) Loading..</li>
              <li>d) Loading..</li>
            </ul>
          </div>
        </div>
      )}
      {/* <div>{loaded && <p>{questions[1].question}</p>}</div> */}
      {loaded && (
        <div className="flex justify-evenly gap-4 w-full">
          <div className="flex flex-col">
            <p>{questions[0].question}</p>
            <ul>
              <li>a) {questions[0].a}</li>
              <li>b) {questions[0].b}</li>
              <li>c) {questions[0].c}</li>
              <li className="flex">
                d){" "}
                <input
                  type="text"
                  placeholder="Answer"
                  className="rounded w-full ml-1"
                />
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p>{questions[1].question}</p>
            <ul>
              <li>a) {questions[1].a}</li>
              <li>b) {questions[1].b}</li>
              <li>c) {questions[1].c}</li>
              <li className="flex">
                d){" "}
                <input
                  type="text"
                  placeholder="Answer"
                  className="rounded w-full ml-1"
                />
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p>{questions[2].question}</p>
            <ul>
              <li>a) {questions[2].a}</li>
              <li>b) {questions[2].b}</li>
              <li>c) {questions[2].c}</li>
              <li className="flex">
                d){" "}
                <input
                  type="text"
                  placeholder="Answer"
                  className="rounded w-full ml-1"
                />
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreGame;
