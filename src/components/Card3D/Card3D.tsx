import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Card3DModel } from './Card3DModel';
import { PokemonDetail } from '../../utils/pokemon';
import './Card3D.css';

interface Card3DProps {
  pokemon: PokemonDetail;
}

/**
 * 3D Card component using Three.js for Pokemon display
 */
const Card3D: React.FC<Card3DProps> = ({ pokemon }) => {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className="card3d-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={containerRef}
    >
      <Canvas shadows dpr={[1, 2]} className="card3d-canvas">
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
        
        <Suspense fallback={null}>
          <Card3DModel pokemon={pokemon} hover={hovered} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
        />
      </Canvas>
      
      <div className="card3d-info">
        <h3 className="card3d-name">{pokemon.name}</h3>
        <div className="card3d-types">
          <p>Type</p>
          {pokemon.types.map((type) => (
            <div key={type.type.name}>
              <span className="card3d-type-name">{type.type.name}</span>
            </div>
          ))}
        </div>
        <div className="card3d-data">
          <div className="card3d-data-item">
            <p className="card3d-title">weight: {pokemon.weight}kg</p>
          </div>
          <div className="card3d-data-item">
            <p className="card3d-title">height: {pokemon.height}m</p>
          </div>
          <div className="card3d-data-item">
            <p className="card3d-title">
              Ability: {pokemon.abilities[0]?.ability.name || "なし"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card3D;
