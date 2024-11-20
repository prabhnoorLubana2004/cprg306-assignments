const Item = ({ name, quantity, category, onSelect }) => {
    return (
      <li
        className="flex justify-between items-center p-2 bg-gray-800 rounded-lg shadow-md mb-2 cursor-pointer"
        onClick={() => onSelect(name)}>
        <div className="text-lg font-bold text-gray-50">{name}</div>
        <div className="text-sm text-gray-400">Category: {category}</div>
        <div className="text-sm text-gray-400">Quantity: {quantity}</div>
      </li>
    );
  };
  export default Item;