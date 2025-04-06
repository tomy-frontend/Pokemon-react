import React from "react";
import "./Card.css";
import { PokemonDetail, PokemonType } from "../../utils/pokemon";

interface CardProps {
  pokemon: PokemonDetail;
}

/**
 * Component for displaying Pokemon type badges
 */
const TypeBadge: React.FC<{ type: PokemonType }> = ({ type }) => (
  <div key={type.type.name}>
    <span className="typeName">{type.type.name}</span>
  </div>
);

/**
 * Component for displaying a data point in the card
 */
const CardDataItem: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="cardData">
    <p className="title">
      {label}: {value}
    </p>
  </div>
);

/**
 * Card component for displaying Pokemon information
 */
const Card: React.FC<CardProps> = ({ pokemon }) => {
  return (
    <article className="card">
      <div className="cardImg">
        <img
          src={pokemon.sprites.front_default}
          alt={`${pokemon.name} image`}
          width="120px"
          height="120px"
        />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        <p>Type</p>
        {pokemon.types.map((type) => (
          <TypeBadge key={type.type.name} type={type} />
        ))}
      </div>
      <div className="cardInfo">
        <CardDataItem label="weight" value={`${pokemon.weight}kg`} />
        <CardDataItem label="height" value={`${pokemon.height}m`} />
        <CardDataItem
          label="Ability"
          value={pokemon.abilities[0]?.ability.name || "なし"}
        />
      </div>
    </article>
  );
};

export default Card;
