import { ItemType } from "../types";
import '../styles/Item.css'
import bin from '../assets/bin.svg'

type ItemPropType = {
  item: ItemType
  onItemDelete: (id: number) => void,
  onItemCheck: (id: number)=>void,
}

const Item = ({ item, onItemDelete, onItemCheck }: ItemPropType) => {

  return (
    <div
      key={item.id}
      className={`item active ${item.checked && 'checked'}`}>
      <input type="checkbox" name={`item-${item.id}`} id={`item-${item.id}`} onChange={() => onItemCheck(item.id)} checked={item.checked} />
      <label htmlFor={`item-${item.id}`}>{item.text}</label>
      <button onClick={() => onItemDelete(item.id)}>
        <img src={bin} alt='' />
      </button>
    </div>
  )
}

export default Item