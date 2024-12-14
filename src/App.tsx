import { useState, useRef } from "react";
import { BoardType, ItemType, board } from "./types";
import "./styles/App.css";
import Board from "./components/Board";

function App() {
  const [boards, setBoards] = useState<BoardType[]>(board);
  const draggedItem = useRef<ItemType | null>(null)
  const position = useRef<number | null>(null)

  function deleteBoard(boardId: number): void {
    const newBoards = boards.filter((board) => board.id != boardId)
    setBoards(newBoards);
  }

  function deleteItem(itemId: number, boardId: number) {
    const newBoards = boards.map((board) => {
      return board.id == boardId ? { ...board, items: board.items.filter((item) => item.id != itemId) } : board
    })

    setBoards(newBoards)
  }

  function saveItem(newItem: ItemType, boardId: number): void {
    const newBoards = boards.map((board) => {
      return board.id == boardId ? {
        ...board,
        items: [...board.items, newItem]
      } : board
    })
    setBoards(newBoards)
  }

  function checkItem(itemId: number, boardId: number) {
    const newBoards = boards.map((board) => {
      return board.id == boardId ? {
        ...board,
        items: board.items.map((item) => (item.id == itemId) ? { ...item, checked: !item.checked } : item)
      } : board
    })
    setBoards(newBoards)
  }

  function insertItem(movedItem: ItemType, items: ItemType[], pos: number): ItemType[] {
    const newItems = [...items]
    const index = items.findIndex((item)=>item.id==pos)
    if(index<0){
      return [...newItems, movedItem]
    }
    newItems.splice(index, 0, movedItem)
    return newItems
  }

  function moveItem(movedItem: ItemType, boardId: number,) {
    const newBoards = boards.map((board) => {
      const newItems = [...board.items.filter((item) => item.id != movedItem.id)]
      return board.id == boardId ?
        { ...board, items: position.current ? insertItem(movedItem, newItems, position.current) : [...newItems, movedItem] } :
        { ...board, items: newItems }
    })
    setBoards(newBoards)
  }

  return (
    <>
      <h1>Kanban</h1>
      <div className="app">
        {boards.map((board) => (
          <Board
            key={board.id}
            board={board}
            deleteBoard={deleteBoard}
            deleteItem={deleteItem}
            checkItem={checkItem}
            saveItem={saveItem}
            moveItem={moveItem}
            draggedItem={draggedItem}
            position={position} />
        ))}
      </div>
    </>
  )
}

export default App;
