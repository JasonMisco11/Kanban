"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { ArrowLeftIcon } from "lucide-react";
import { col, input } from "motion/react-client";
import { IoIosArrowRoundForward } from "react-icons/io";
import { TbArrowNarrowLeftDashed } from "react-icons/tb";

type Card = {
  id: string;
  title: string;
};

type Column = {
  id: string;
  title: string;
  cards: Card[];
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    { id: "col-1", title: "Stage 1", cards: [] },
    { id: "col-2", title: "Stage 2", cards: [] },
    { id: "col-3", title: "Stage 3", cards: [] },
  ]);
  const [inputValues, setInputValues] = useState({});


  const addCard = (columnId: string) => {
    console.log("called for columnId>>:", columnId);
    const newCard = {
      id: crypto.randomUUID(),
      // title: <input type="text" name="" id="" />
      title: "",
    };

    console.log("new card>>", newCard);


   const consolidatedItems=  columns.map((col) => {
        if (col.id === columnId) {
          console.log("col id>>",columnId);
          // col.cards.push(newCard);
          console.log("col.cards>>", col.cards);
          return { ...col, cards: [...col.cards, newCard] };
        }
        // setInputValue("");
        console.log("input value>>>>", inputValues, col);
        return col;
      })
    setColumns(consolidatedItems)
   
  };


// filter out the cloumn and get back the remaining columns from the array





  const moveCardRight = (cardId: string, fromColumnId: string) => {
    console.log(
      "moveCardRight called with cardId:",
      cardId,
      "fromColumnId:",
      fromColumnId
    );
    const fromColumnIndex = columns.findIndex((col) => col.id === fromColumnId);
    console.log("fromColumnIndex:", fromColumnIndex);
    if (fromColumnIndex === -1 || fromColumnIndex === columns.length - 1)
      return;
    const toColumnIndex = fromColumnIndex + 1;

    const cardIndex = columns[fromColumnIndex].cards.findIndex(
      (card) => card.id === cardId
    );
    if (cardIndex === -1) return;
    const cardToMove = columns[fromColumnIndex].cards[cardIndex];
    if(!cardToMove.title){
        alert("Please enter a title before moving the card.");
        return;
    }

    const updatedColumns = [...columns];
    updatedColumns[fromColumnIndex].cards.splice(cardIndex, 1);
    updatedColumns[toColumnIndex].cards.push(cardToMove);
    setColumns(updatedColumns);
  };

  const moveCardLeft = (cardId: string, fromColumnId: string) => {
    const fromColumnIndex = columns.findIndex((col) => col.id === fromColumnId);
    if (fromColumnIndex <= 0) return;
    const toColumnIndex = fromColumnIndex - 1;
    const cardIndex = columns[fromColumnIndex].cards.findIndex(
      (card) => card.id === cardId
    );
    if (cardIndex === -1) return;
    const cardToMove = columns[fromColumnIndex].cards[cardIndex];
    if(!cardToMove.title){
        alert("Please enter a title before moving the card.");
        return;
    }
    const updatedColumns = [...columns];
    updatedColumns[fromColumnIndex].cards.splice(cardIndex, 1);
    updatedColumns[toColumnIndex].cards.push(cardToMove);
    setColumns(updatedColumns);
  };

  const handleInputChange = (e, cardId) => {
    const newInputValues = { ...inputValues, [cardId]: e.target.value }; // Update the specific card's value
    setInputValues(newInputValues);

    // columns.forEach((col) => {
    //   col.cards.forEach((card) => {
    //     setInputValue(e.target.value, card.id);
    //     card.title = e.target.value;
    //     console.log("card title>>", card.title, "card id>>", card.id);
    //   })
    // });

    columns.forEach((col) => {
      col.cards.forEach((card) => {
        if (card.id === cardId) {
          card.title = e.target.value;
        }
      });
    });
  };

  return (
    <div className="flex flex-row gap-6 overflow-x-auto p-4 h-full w-full">
      {columns.map((col,colIndex) => (
        <div
          key={col.id}
          className="min-w-[300px] bg-gray-100 dark:bg-gray-900 rounded-lg p-4 flex flex-col gap-4 shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
            <h2 className="font-bold text-gray-700 dark:text-gray-200">
              {col.title}
            </h2>
            <span className="text-xs text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-full">
              {col.cards.length}
            </span>
          </div>

          <div className="flex flex-col gap-3 flex-1 overflow-y-auto min-h-[100px]">
            {col.cards.map((card) => (
              <div
                key={card.id}
                className="bg-white flex items-center justify-between dark:bg-gray-800 py-4 px-2 rounded shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 transition-colors cursor-pointer"
              >
                {col.id != "col-1" && (
                  <button
                    className=" hover:text-blue-500 transition-all text-sm font-medium"
                    // variant="outline"
                    // size="icon"
                    aria-label="Go Back"
                    onClick={() => moveCardLeft(card.id, col.id)}
                  >
                    <TbArrowNarrowLeftDashed size={25} />
                  </button>
                )}

                <input
                  type="text"
                  value={inputValues[card.id] || ""}
                  onChange={(e) => handleInputChange(e, card.id)}
                  className="p-1"
                />

                {col.id != "col-3" && (
                <button
                  className=" hover:text-blue-500 transition-all text-sm font-medium"
                  // variant="outline"
                  // size="icon"
                  aria-label="Go Back"
                  onClick={() => moveCardRight(card.id, col.id)}
                >
                  <IoIosArrowRoundForward size={25} />
                </button>
                )}
              </div>
            ))}
          </div>

         {colIndex == 0 && <button
            onClick={() => addCard(col.id)}
            className="w-80 py-0 absolute z-100 mb-1 mr-8  text-gray-500 rounded-lg hover:text-blue-500 transition-all text-sm font-medium cursor-pointer"
          >
            <span className="text-xl">＋</span>
          </button>} 
          <button
            className=" hover:text-blue-500 transition-all text-sm font-medium"
            // variant="outline"
            // size="icon"
            aria-label="Go Back"
            onClick={() => removeCard(col.id)}
          >
          </button>

        </div>

      ))}

    </div>

  );

}


