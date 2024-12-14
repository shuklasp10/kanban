import { BoardType, ItemType, getId } from "../types";
import Item from './Item';
import deleteIcon from '../assets/delete.svg';
import '../styles/Board.css';
import { useRef } from "react";

type BoardPropType = {
    board: BoardType,
    deleteBoard: (id: number) => void,
    deleteItem: (itemId: number, boardId: number) => void,
    checkItem: (itemId: number, boardId: number) => void,
    saveItem: (newItem: ItemType, boardId: number) => void,
    moveItem: (movedItem: ItemType, boardId: number) => void,
    draggedItem: { current: ItemType | null },
    position: { current: number | null }
}

const Board = ({ board, deleteBoard, checkItem, deleteItem, saveItem, moveItem, draggedItem, position }: BoardPropType) => {
    const newItemRef = useRef<HTMLInputElement>(null)

    function clearInput() {
        if (newItemRef.current)
            newItemRef.current.value = ''
    }

    function handleSave(): void {
        if (newItemRef.current && newItemRef.current.value.trim() != '') {
            saveItem({
                id: getId(),
                text: newItemRef.current.value.trim(),
                checked: false
            }, board.id)
            clearInput()
        }
    }
    
    function onDrop() {
        if (draggedItem.current) {
            moveItem(draggedItem.current, board.id)
            draggedItem.current = null
        }
        position.current = null
    }

    return (
        <div className="board" onDrop={onDrop} onDragOver={(e)=>e.preventDefault()}>
            <div className="board-header">
                <h2>{board.name}</h2>
                <button onClick={() => deleteBoard(board.id)}>
                    <img src={deleteIcon} alt="" />
                </button>
            </div>
            <div className="board-items" id={`board-${board.id}`}>
                {board.items.map((item) => (
                    <Item
                        key={item.id}
                        item={item}
                        checkItem={(itemId)=>checkItem(itemId, board.id)}
                        deleteItem={(itemId)=>deleteItem(itemId, board.id)}
                        draggedItem={draggedItem}
                        position={position} />
                ))}
            </div>
            <div className="item">
                <label>
                    <input onKeyDown={(e) => { e.key == 'Enter' && handleSave() }} onBlur={handleSave} className="new-item" type="text" placeholder="New task" ref={newItemRef} />
                </label>
                <button>
                    <img alt='' />
                </button>
            </div>
        </div>
    )
}

export default Board