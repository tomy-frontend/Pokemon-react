import React, { useState, useRef } from 'react';
import { PokemonDetail } from '../../utils/pokemon';
import './Card3DSimple.css';

interface Card3DSimpleProps {
  pokemon: PokemonDetail;
}

/**
 * A simpler 3D card component using CSS transforms instead of Three.js
 */
const Card3DSimple: React.FC<Card3DSimpleProps> = ({ pokemon }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getPokemonTypeColor = (type: string): string => {
    const typeColors: Record<string, string> = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    
    return typeColors[type] || typeColors.normal;
  };

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const primaryColor = getPokemonTypeColor(primaryType);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees
    const rotateX = ((centerY - y) / centerY) * 10; // Max 10 degrees
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div 
      className="card3d-simple-container"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetRotation}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'translateZ(20px)' : ''}`,
        transition: isHovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }}
    >
      <div 
        className="card3d-simple-background"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}88)`,
        }}
      />
      
      <div className="card3d-simple-content">
        <div className="card3d-simple-image-container">
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            className="card3d-simple-image"
          />
          <div className="card3d-simple-shine" style={{ opacity: isHovered ? 0.2 : 0 }} />
        </div>
        
        <h3 className="card3d-simple-name">{pokemon.name}</h3>
        
        <div className="card3d-simple-types">
          <p>Type</p>
          <div className="card3d-simple-type-badges">
            {pokemon.types.map((type) => (
              <span 
                key={type.type.name} 
                className="card3d-simple-type-badge"
                style={{ backgroundColor: getPokemonTypeColor(type.type.name) }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        
        <div className="card3d-simple-info">
          <div className="card3d-simple-stat">
            <span>Weight:</span> {pokemon.weight}kg
          </div>
          <div className="card3d-simple-stat">
            <span>Height:</span> {pokemon.height}m
          </div>
          <div className="card3d-simple-stat">
            <span>Ability:</span> {pokemon.abilities[0]?.ability.name || "なし"}
          </div>
        </div>
      </div>
      
      {/* Floating particles for animation */}
      {isHovered && (
        <>
          <div className="card3d-simple-particle p1" />
          <div className="card3d-simple-particle p2" />
          <div className="card3d-simple-particle p3" />
          <div className="card3d-simple-particle p4" />
          <div className="card3d-simple-particle p5" />
        </>
      )}
    </div>
  );
};

export default Card3DSimple;
