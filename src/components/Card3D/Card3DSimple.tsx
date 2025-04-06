import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PokemonDetail } from '../../utils/pokemon';
import './Card3DSimple.css';

interface Card3DSimpleProps {
  pokemon: PokemonDetail;
}

/**
 * A simpler 3D card component using CSS transforms instead of Three.js
 * Optimized for performance with debounced mouse events and reduced 3D transformations
 */
const Card3DSimple: React.FC<Card3DSimpleProps> = ({ pokemon }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const lastMoveEvent = useRef<React.MouseEvent<HTMLDivElement> | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      if (!lastMoveEvent.current || !cardRef.current) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const e = lastMoveEvent.current;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const maxRotation = isReducedMotion ? 5 : 10;
      const rotateY = ((x - centerX) / centerX) * maxRotation;
      const rotateX = ((centerY - y) / centerY) * maxRotation;
      
      setRotation({ x: rotateX, y: rotateY });
      lastMoveEvent.current = null;
    }
    
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [isReducedMotion]);

  useEffect(() => {
    if (isHovered && !isReducedMotion) {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [isHovered, animate, isReducedMotion]);

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const primaryColor = getPokemonTypeColor(primaryType);
  const secondaryType = pokemon.types[1]?.type.name;
  const secondaryColor = secondaryType ? getPokemonTypeColor(secondaryType) : `${primaryColor}88`;
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion) return;
    lastMoveEvent.current = e;
  };
  
  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const calculateShinePosition = () => {
    if (!cardRef.current || !isHovered) return { x: '50%', y: '50%' };
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (mousePosition.x / rect.width) * 100;
    const y = (mousePosition.y / rect.height) * 100;
    
    return { x: `${x}%`, y: `${y}%` };
  };

  const shinePosition = calculateShinePosition();

  const shouldShowParticles = isHovered && !isReducedMotion;

  return (
    <div 
      className={`card3d-simple-container ${isLoaded ? 'loaded' : ''} ${isReducedMotion ? 'reduced-motion' : ''}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetRotation}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered && !isReducedMotion ? 'translateZ(20px)' : ''}`,
        transition: isHovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
        willChange: isHovered ? 'transform' : 'auto',
      }}
    >
      <div 
        className="card3d-simple-background"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        }}
      />
      
      <div className="card3d-simple-content">
        <div className="card3d-simple-image-container">
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            className="card3d-simple-image"
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
          {!isReducedMotion && (
            <div 
              className="card3d-simple-shine" 
              style={{ 
                opacity: isHovered ? 0.3 : 0,
                background: `radial-gradient(circle at ${shinePosition.x} ${shinePosition.y}, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)`,
              }} 
            />
          )}
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
      
      {/* Floating particles for animation - only shown on capable devices */}
      {shouldShowParticles && (
        <>
          <div className="card3d-simple-particle p1" />
          <div className="card3d-simple-particle p2" />
          <div className="card3d-simple-particle p3" />
        </>
      )}
    </div>
  );
};

export default Card3DSimple;
