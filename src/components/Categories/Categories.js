import { memo } from "react";
import { Form } from "react-bootstrap";

const Categories = (props) => {
  console.log("rendu");
  return (
    <Form>
      <Form.Label style={{ fontWeight: "bold" }}>Catégorie : </Form.Label>
      <Form.Select
        className="style_select"
        value={props.activeCategory}
        onChange={(e) => props.selectCategory(e.target.value)}
      >
        <option value=""> --- </option>
        {props.categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Form.Select>
    </Form>
  );
};

export default memo(Categories);
