import { ItemType } from "../types";
import '../styles/Item.css'
import bin from '../assets/bin.svg'

type ItemPropType = {
  item: ItemType
  deleteItem: (itemId: number) => void,
  checkItem: (itemId: number)=>void,
  draggedItem: {current:ItemType|null},
  position: {current: number|null}
}

const Item = ({ item, deleteItem, checkItem, draggedItem, position }: ItemPropType) => {

  return (
    <div
      key={item.id}
      className={`item active ${item.checked && 'checked'}`}
      draggable
      onDragStart={()=>{draggedItem.current=item}}
      onDragEnd={()=>{draggedItem.current=null}}
      onDragEnter={()=>{position.current=item.id}}>
      <input type="checkbox" name={`item-${item.id}`} id={`item-${item.id}`} onChange={() => checkItem(item.id)} checked={item.checked} />
      <label htmlFor={`item-${item.id}`}>{item.text}</label>
      <button onClick={() => deleteItem(item.id)}>
        <img src={bin} alt='delete item' />
      </button>
    </div>
  )
}

export default Item