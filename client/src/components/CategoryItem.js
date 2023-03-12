import { Component } from "react";

import Card from "./Card";

class CategoryItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="item-card__wrapper">
        <p className="item-title">{this.props.category}</p>
        <div className="item-cards">
          {this.props.data.map((items, index) => {
            if (items.category !== this.props.category) return;

            return <Card key={index} item={items} />;
          })}
        </div>
      </div>
    );
  }
}

export default CategoryItem;
