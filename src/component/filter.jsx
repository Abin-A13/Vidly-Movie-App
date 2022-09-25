import React from "react";

const Filters = (props) => {
  const { items,textProperty,valueProperty,onSelectitem,selectedGenre } = props;
  return (
    <ul  className="list-group clickable">
      {items.map((g) => (
        <li key={g[valueProperty]} onClick={()=>onSelectitem(g)} className={g === selectedGenre ? "list-group-item active":"list-group-item"}>
          {g[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Filters.defaultProps={
    textProperty:"name",
    valueProperty:"_id"

}
export default Filters;
