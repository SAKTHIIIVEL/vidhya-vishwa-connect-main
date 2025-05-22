
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const SolarSystem: React.FC = () => {
  // Planet data with relative sizes and orbit speeds - reduced number of planets
  const planets = [
    { name: "Sun", size: 50, color: "#FDB813", orbitRadius: 0, speed: 0, zIndex: 20 },
    { name: "Mercury", size: 10, color: "#AAA9AD", orbitRadius: 80, speed: 4.1, zIndex: 19 },
    { name: "Venus", size: 15, color: "#E7CDCD", orbitRadius: 110, speed: 1.6, zIndex: 18 },
    { name: "Earth", size: 16, color: "#6B93D6", orbitRadius: 150, speed: 1, zIndex: 17 },
    { name: "Mars", size: 14, color: "#C1440E", orbitRadius: 190, speed: 0.5, zIndex: 16 },
    { name: "Jupiter", size: 35, color: "#C88B3A", orbitRadius: 240, speed: 0.08, zIndex: 15 },
  ];

  // Pre-calculate stars data
  const stars = useMemo(() => {
    return Array(60).fill(0).map((_, i) => { // Reduced from 150 to 60 stars
      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.8 + 0.2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 2 + Math.random() * 3;
      const specialStar = i % 5 === 0;
      
      return { size, opacity, posX, posY, delay, duration, specialStar };
    });
  }, []);

  // Rendering the orbit paths with more realistic appearance
  const orbitPaths = useMemo(() => {
    return planets.filter(p => p.orbitRadius > 0).map((planet, index) => (
      <div 
        key={`orbit-${index}`}
        className="absolute border border-gray-200/5 rounded-full"
        style={{
          width: planet.orbitRadius * 2,
          height: planet.orbitRadius * 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    ));
  }, [planets]);

  return (
    <div 
      className="relative h-full w-full overflow-hidden bg-[#030014]"
      style={{ minHeight: 300, maxHeight: 500 }}
    >
      {/* Cosmos background with stars and nebula effect */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 to-transparent"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        {orbitPaths}
        
        {/* Render planets */}
        {planets.map((planet, index) => {
          // Special case for the sun
          if (planet.name === "Sun") {
            return (
              <motion.div
                key={`planet-${index}`}
                className="absolute rounded-full flex items-center justify-center will-change-transform"
                style={{
                  width: planet.size,
                  height: planet.size,
                  background: `radial-gradient(circle at 35% 35%, #FFF7D6, ${planet.color} 50%, #F07F13)`,
                  boxShadow: '0 0 30px rgba(253, 184, 19, 0.8), 0 0 60px rgba(253, 100, 19, 0.4)',
                  zIndex: planet.zIndex
                }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            );
          }
          
          // For all other planets
          return (
            <motion.div
              key={`planet-${index}`}
              className="absolute flex items-center justify-center will-change-transform"
              style={{
                width: 1,
                height: 1,
                zIndex: planet.zIndex
              }}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 60 / planet.speed,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div
                className="rounded-full absolute"
                style={{
                  width: planet.size,
                  height: planet.size,
                  background: getPlanetGradient(planet.name, planet.color),
                  left: planet.orbitRadius,
                  transform: 'translateY(-50%)',
                }}
                whileHover={{
                  scale: 1.5,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Moon for Earth */}
                {planet.name === "Earth" && (
                  <motion.div 
                    className="absolute rounded-full will-change-transform"
                    style={{
                      width: 6,
                      height: 6,
                      background: 'radial-gradient(circle at 30% 30%, #FFFFFF, #AAAAAA)',
                      left: '70%',
                      top: '10%',
                    }}
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                )}
                
                {/* Jupiter's bands - simplified */}
                {planet.name === "Jupiter" && (
                  <>
                    {[1, 2].map((band) => (
                      <div 
                        key={`jupiter-band-${band}`}
                        className="absolute rounded-full"
                        style={{
                          height: 3,
                          width: planet.size - 4,
                          backgroundColor: band % 2 === 0 ? '#E4A668' : '#C88B3A',
                          top: `${35 + (band * 10)}%`,
                          left: '50%',
                          transform: 'translateX(-50%)'
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Add some stars in the background with better twinkling effect - using pre-calculated values */}
      {stars.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white will-change-opacity"
          style={{
            width: star.size,
            height: star.size,
            top: `${star.posY}%`,
            left: `${star.posX}%`
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, star.specialStar ? 1.5 : 1.2, 1]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: star.delay
          }}
        />
      ))}
      
      {/* Add shooting star effect occasionally */}
      <motion.div
        className="absolute h-0.5 bg-white rounded-full will-change-transform"
        initial={{ 
          width: 0, 
          top: '10%', 
          left: '100%', 
          rotate: 15,
          opacity: 0 
        }}
        animate={{
          left: ['-10%', '100%'],
          width: [0, 50, 0],
          opacity: [0, 0, 1, 0.8, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 10, // Increased delay to reduce CPU usage
        }}
        style={{
          boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.6)'
        }}
      />
    </div>
  );
};

// Helper function to generate realistic planet appearances
function getPlanetGradient(name: string, baseColor: string): string {
  switch(name) {
    case "Mercury":
      return `radial-gradient(circle at 30% 30%, #D3D3D3, ${baseColor}, #8A8A8A)`;
    case "Venus":
      return `radial-gradient(circle at 30% 30%, #F9F3E3, ${baseColor}, #D3BB7E)`;
    case "Earth":
      return `radial-gradient(circle at 30% 30%, #98C5DF, ${baseColor}, #315B7D)`;
    case "Mars":
      return `radial-gradient(circle at 30% 30%, #E58F65, ${baseColor}, #892C09)`;
    case "Jupiter":
      return `radial-gradient(circle at 30% 30%, #F0D89D, ${baseColor}, #A67734)`;
    default:
      return baseColor;
  }
}

export default React.memo(SolarSystem);
