import React from "react";
import axios from "axios";
import Card from "./Card";
import "./CardDealer.css";

class CardDealer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.dealCard = this.dealCard.bind(this);
  }

  async componentDidMount() {
    const url = `https://deckofcardsapi.com/api/deck/new/shuffle/`;
    let response = await axios.get(url);
    this.setState({ deck: response.data });
  }

  async dealCard() {
    const cardUrl = `https://deckofcardsapi.com/api/deck/${
      this.state.deck.deck_id
    }/draw/`;
    try {
      let response = await axios.get(cardUrl);
      console.log(response.data);
      if (response.data.success) {
        let card = response.data.cards[0];
        this.setState(st => ({
          drawn: [
            ...st.drawn,
            {
              id: card.code,
              image: card.image,
              name: `${card.suite} ${card.value}`
            }
          ]
        }));
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    let cards = this.state.drawn.map(card => (
      <Card key={card.id} image={card.image} name={card.value} />
    ));
    return (
      <div>
        <h1 className="CardDealer-title">🃏Card Dealer 🃏</h1>
        <p className="CardDealer-author">
          Made by{" "}
          <a href="https://github.com/quangnd/card-dealer-reactjs" target="_blank">
            Mun
          </a>{" "}
          with ❤️
        </p>
        <button className="CardDealer-btn" onClick={this.dealCard}>
          Deal a card
        </button>
        <div className="CardDealer-cards">{cards}</div>
      </div>
    );
  }
}

export default CardDealer;
