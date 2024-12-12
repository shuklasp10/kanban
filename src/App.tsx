import { useState } from "react";
import { BoardType, ItemType, board } from "./types";
import "./styles/App.css";
import Board from "./components/Board";

function App() {
  const [boards, setBoards] = useState<BoardType[]>(board);

  function onBoardDelete(id: number): void {
    const newBoards = boards.filter((board) => board.id != id)
    setBoards(newBoards);
  }

  function onItemDelete(id: number) {
    const newBoards = boards.map((board) => {
      let newItems = board.items.filter((item) => item.id != id)
      return { ...board, items: newItems }
    })
    setBoards(newBoards)
  }

  function onSaveItem(newItem: ItemType, boardId: number): void {
    const newBoards = boards.map((board) => {
      if (board.id == boardId) {
        board.items.push(newItem)
      }
      return board;
    })
    setBoards(newBoards)
  }

  function onItemCheck(id: number) {
    const newBoards = boards.map((board) => {
      let newItems = board.items.map((item) => {
        if (item.id == id) {
          return { ...item, checked: !item.checked }
        }
        return item
      })
      return { ...board, items: newItems }
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
            onBoardDelete={onBoardDelete}
            onItemCheck={onItemCheck}
            onItemDelete={onItemDelete}
            onSaveItem={onSaveItem} />
        ))}
      </div>
    </>
  )
}

export default App;
