import React from "react";
import "./Card.css";
import { PokemonDetail } from "../../utils/pokemon";

interface CardProps {
  pokemon: PokemonDetail;
}

const Card: React.FC<CardProps> = ({ pokemon }) => {
  return (
    <>
      <article className="card">
        <div className="cardImg">
          <img
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name}のイメージ画像`}
            width={"100px"}
            height={"100px"}
          />
        </div>
        <h3 className="cardName">{pokemon.name}</h3>
        <div className="cardTypes">
          <p>Type</p>
          {pokemon.types.map((type) => {
            return (
              <div key={type.type.name}>
                <span className="typeName">{type.type.name}</span>
              </div>
            );
          })}
        </div>
        <div className="cardInfo">
          <div className="cardData">
            <p className="title">重さ: {pokemon.weight}kg</p>
          </div>
          <div className="cardData">
            <p className="title">高さ: {pokemon.height}m</p>
          </div>
          <div className="cardData">
            <p className="title">
              アビリティ: {pokemon.abilities[0]?.ability.name || "なし"}
            </p>
          </div>
        </div>
      </article>
    </>
  );
};

export default Card;