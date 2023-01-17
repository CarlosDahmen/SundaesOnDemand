import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import Row from "react-bootstrap/Row";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  //optionType is either 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //TODO: Handle error response
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : null;
  //note: replace null w/ toppingOption once available

  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} name={item.name} itemPath={item.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
}
