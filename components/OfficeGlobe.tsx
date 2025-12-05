import React, { useRef, useEffect } from 'react';

const OfficeGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let rotation = 0;

    const GLOBE_RADIUS = height * 0.4;
    const DOTS_COUNT = 400;
    
    // Generate dots on a sphere
    const dots: { x: number; y: number; z: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < DOTS_COUNT; i++) {
       const y = 1 - (i / (DOTS_COUNT - 1)) * 2;
       const radius = Math.sqrt(1 - y * y);
       const theta = phi * i;
       const x = Math.cos(theta) * radius;
       const z = Math.sin(theta) * radius;
       dots.push({ x: x * GLOBE_RADIUS, y: y * GLOBE_RADIUS, z: z * GLOBE_RADIUS });
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      rotation += 0.005;

      dots.forEach(dot => {
         // Rotate around Y axis
         const x = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
         const z = dot.z * Math.cos(rotation) + dot.x * Math.sin(rotation);
         const y = dot.y;

         // Project 3D to 2D
         const scale = 200 / (200 + z);
         const x2d = x * scale + cx;
         const y2d = y * scale + cy;
         const alpha = Math.max(0, (z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));

         ctx.beginPath();
         ctx.arc(x2d, y2d, 2 * scale, 0, Math.PI * 2);
         ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
         ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
       if(canvasRef.current) {
          width = canvasRef.current.width = canvasRef.current.offsetWidth;
          height = canvasRef.current.height = canvasRef.current.offsetHeight;
       }
    };
    window.addEventListener('resize', handleResize);

    return () => {
       cancelAnimationFrame(animationId);
       window.removeEventListener('resize', handleResize);
    }
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default OfficeGlobe;