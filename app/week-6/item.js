
export default function Item(props) {
    return (
      <div>
        <p>name: {props.name}</p>
        <p>quantity: {props.quantity}</p>
        <p>category: {props.category}</p>
      </div>
    );
  }