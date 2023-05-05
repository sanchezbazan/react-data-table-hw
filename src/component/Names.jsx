/* Components are independent and reusable bits of code. 
They serve the same purpose as JavaScript functions, 
but work in isolation and return HTML */
const Names = () => {
  const names = ["Eddie", "Ciara", "Sierra", "Daniel", "Hose", "Joseph"];

  return (
    <ul>
      {names.map((name) => (
        <li>{name}</li>
      ))}
    </ul>
  );
};

export default Names;
