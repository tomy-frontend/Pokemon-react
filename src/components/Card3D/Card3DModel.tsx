import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { PokemonDetail } from '../../utils/pokemon';

interface Card3DModelProps {
  pokemon: PokemonDetail;
  hover: boolean;
}

/**
 * 3D model for Pokemon card using Three.js
 */
export const Card3DModel: React.FC<Card3DModelProps> = ({ pokemon, hover }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [elevation, setElevation] = useState(0);
  
  const texture = useTexture(pokemon.sprites.front_default);
  texture.minFilter = THREE.LinearFilter;
  
  const gradientTexture = useRef<THREE.CanvasTexture | null>(null);
  
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const primaryType = pokemon.types[0]?.type.name || 'normal';
      const colors = getTypeColors(primaryType);
      
      const gradient = ctx.createLinearGradient(0, 0, 0, 256);
      gradient.addColorStop(0, colors.primary);
      gradient.addColorStop(1, colors.secondary);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
      
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const radius = Math.random() * 5 + 2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      gradientTexture.current = new THREE.CanvasTexture(canvas);
    }
  }, [pokemon.types]);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    const targetRotationY = hover ? 0.2 : 0;
    const targetRotationX = hover ? -0.1 : 0;
    const targetElevation = hover ? 0.2 : 0;
    
    setRotationY(THREE.MathUtils.lerp(rotationY, targetRotationY, 0.1));
    setRotationX(THREE.MathUtils.lerp(rotationX, targetRotationX, 0.1));
    setElevation(THREE.MathUtils.lerp(elevation, targetElevation, 0.1));
    
    meshRef.current.rotation.y = rotationY;
    meshRef.current.rotation.x = rotationX;
    meshRef.current.position.y = elevation;
  });
  
  return (
    <group>
      {/* Card base with gradient background */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 3.5, 0.1]} />
        <meshStandardMaterial 
          map={gradientTexture.current || undefined} 
          roughness={0.3}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Pokemon sprite */}
      <mesh position={[0, 0.3, 0.06]} rotation={[0, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true} 
          side={THREE.DoubleSide}
          alphaTest={0.5}
        />
      </mesh>
      
      {/* Card name plate */}
      <mesh position={[0, -1.2, 0.06]}>
        <planeGeometry args={[2, 0.5]} />
        <meshStandardMaterial color="#ffffff" opacity={0.8} transparent />
      </mesh>
    </group>
  );
};

/**
 * Get colors based on Pokemon type
 */
const getTypeColors = (type: string): { primary: string; secondary: string } => {
  const typeColors: Record<string, { primary: string; secondary: string }> = {
    normal: { primary: '#A8A878', secondary: '#C6C6A7' },
    fire: { primary: '#F08030', secondary: '#F5AC78' },
    water: { primary: '#6890F0', secondary: '#9DB7F5' },
    electric: { primary: '#F8D030', secondary: '#FAE078' },
    grass: { primary: '#78C850', secondary: '#A7DB8D' },
    ice: { primary: '#98D8D8', secondary: '#BCE6E6' },
    fighting: { primary: '#C03028', secondary: '#D67873' },
    poison: { primary: '#A040A0', secondary: '#C183C1' },
    ground: { primary: '#E0C068', secondary: '#EBD69D' },
    flying: { primary: '#A890F0', secondary: '#C6B7F5' },
    psychic: { primary: '#F85888', secondary: '#FA92B2' },
    bug: { primary: '#A8B820', secondary: '#C6D16E' },
    rock: { primary: '#B8A038', secondary: '#D1C17D' },
    ghost: { primary: '#705898', secondary: '#A292BC' },
    dragon: { primary: '#7038F8', secondary: '#A27DFA' },
    dark: { primary: '#705848', secondary: '#A29288' },
    steel: { primary: '#B8B8D0', secondary: '#D1D1E0' },
    fairy: { primary: '#EE99AC', secondary: '#F4BDC9' },
  };
  
  return typeColors[type] || typeColors.normal;
};
