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
    const url = `https://deckofcardsapi.com/api/deck/new/shuffledsfasd/`;
    try {
      let response = await axios.get(url);
      this.setState({ deck: response.data });
    } catch (error) {
      alert('Deck API is not working now!')
    }
  }

  async dealCard() {
    const cardUrl = `https://deckofcardsapi.com/api/deck/${
      this.state.deck.deck_id
    }/draw/`;
    try {
      let response = await axios.get(cardUrl);
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
    let cards = this.state.drawn.map(card => <Card key={card.id} {...card} />);
    return (
      <div>
        <h1 className="CardDealer-title">
          <span role="img" aria-label="card-joker">
            🃏
          </span>
          Card Dealer
          <span role="img" aria-label="card-joker">
            🃏
          </span>
        </h1>
        <p className="CardDealer-author">
          Made by{" "}
          <a
            href="https://github.com/quangnd/card-dealer-reactjs"
            target="_blank"
            rel="noopener noreferrer"
          >
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
