import React from "react";
import "./Card.css";

function Card({ pokemon }) {
  return (
    <>
      <article className="card">
        <div className="cardImg">
          <img
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name}のイメージ画像`}
          />
        </div>
        <h3 className="cardName">{pokemon.name}</h3>
        <div className="cardTypes">
          <p>タイプ</p>
          {pokemon.types.map((type) => {
            return (
              <div>
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
            <p className="title">高さ: {pokemon.height}kg</p>
          </div>
          <div className="cardData">
            <p className="title">
              アビリティ: {pokemon.abilities[0].ability.name}kg
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

export default Card;
