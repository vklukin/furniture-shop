import { Component } from "react";
import HeartFill from "../assets/images/header/heart-fill";
import Heart from "../assets/images/header/heart";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeart: false,
    };
  }

  render() {
    return (
      <div className="card">
        <button
          className="card-heart"
          onClick={() =>
            this.setState((state) => {
              return { isHeart: !state.isHeart };
            })
          }
        >
          {this.state.isHeart ? <HeartFill /> : <Heart />}
        </button>
        <img src={this.props.item.url.split(" ")[0]} alt="Картинка товара" />
        <div className="card-wrapper">
          <a href="#" className="card-title">
            {this.props.item.title}
          </a>
          <div className="card-items">
            <p className="card-price">{this.props.item.price} &#8381;</p>
            <button className="card-buy-button">Купить</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
