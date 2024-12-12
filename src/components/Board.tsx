import { BoardType, ItemType, getId } from "../types";
import Item from './Item';
import deleteIcon from '../assets/delete.svg';
import '../styles/Board.css';
import React, { useRef } from "react";

type BoardPropType = {
    board: BoardType,
    onBoardDelete: (id: number) => void,
    onItemDelete: (id: number) => void
    onItemCheck: (id: number) => void
    onSaveItem: (newItem: ItemType, id: number) => void
}

const Board = ({ board, onBoardDelete, onItemCheck, onItemDelete, onSaveItem }: BoardPropType) => {
    const newItemRef = useRef<HTMLInputElement>(null)

    function clearInput() {
        if (newItemRef.current)
            newItemRef.current.value = ''
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == 'Enter' && newItemRef.current && newItemRef.current.value.trim() != '') {
            onSaveItem({
                id: getId(),
                text: newItemRef.current.value.trim(),
                checked: false
            }, board.id)
            clearInput()
        }
    }

    function handleBlur(): void {
        if (newItemRef.current && newItemRef.current?.value.trim() != '') {
            onSaveItem({
                id: getId(),
                text: newItemRef.current.value.trim(),
                checked: false
            }, board.id)
            clearInput()
        }
    }

    return (
        <div className="board">
            <div className="board-header">
                <h2>{board.name}</h2>
                <button onClick={() => onBoardDelete(board.id)}>
                    <img src={deleteIcon} alt="" />
                </button>
            </div>
            <div className="board-items" id={`board-${board.id}`}>
                {board.items.map((item) => (
                    <Item
                        key={item.id}
                        item={item}
                        onItemCheck={onItemCheck}
                        onItemDelete={onItemDelete} />
                ))}
            </div>
            <div className="item">
                <label>
                    <input onKeyDown={handleKeyDown} onBlur={handleBlur} className="new-item" type="text" placeholder="New task" ref={newItemRef} />
                </label>
                <button>
                    <img alt='' />
                </button>
            </div>
        </div>
    )
}

export default Board