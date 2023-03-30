import React from "react";
function Questions() {
  return (
    <div className="absolute w-[1000px] h-full">
      <div className="justify-center w-full flex items-center h-full">
        <div className="h-[200px] bg-neutral-900 w-[600px] rounded-full p-2 text-center">
          <p className="text-style text-2xl flex justify-center items-center h-full">
            {/* QUESTIONS MUST BE 80 CHARS OR LESS */}
            QUESTION PLACEMENT
          </p>
        </div>
      </div>
      <div className="text-style absolute top-0 left-0 text-black p-4 text-2xl font-bold h-[500px] w-[500px] flex justify-center items-center">
        <p className="items-center flex text-center h-[75%]">
          "I have not failed. I've just found 10,000 ways that won't work" -
          Thomas Edison
        </p>
      </div>
      <div className="text-style absolute top-0 right-0 text-black p-4 text-2xl font-bold h-[500px] w-[500px] flex justify-center items-center">
        <p className="items-center flex text-center h-[75%]">
          "I have not failed. I've just found 10,000 ways that won't work" -
          Thomas Edison
        </p>
      </div>
      <div className="text-style absolute bottom-0 left-0 text-black p-4 text-2xl font-bold h-[500px] w-[500px] flex justify-center items-center">
        <p className="items-center flex text-center h-[75%]">
          "I have not failed. I've just found 10,000 ways that won't work" -
          Thomas Edison
        </p>
      </div>
      <div className="text-style absolute bottom-0 right-0 text-black p-4 text-2xl font-bold h-[500px] w-[500px] flex justify-center items-center">
        <p className="items-center flex text-center h-[75%]">
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..." "There is no one who loves pain
          itself, who seeks after it and wants to have it, simply because it is
          pain..."
        </p>
      </div>
    </div>
  );
}

export default Questions;
