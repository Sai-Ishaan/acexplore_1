import React, { useState, useEffect, useRef, useCallback } from 'react';
import './PongBackground.css';

const PongBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const [balls, setBalls] = useState([]);

  // Create Ball class as a stable reference
  const BallClass = useCallback(class Ball {
    constructor(canvasWidth, canvasHeight) {
      this.radius = Math.random() * 15 + 10;
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.dx = (Math.random() - 0.5) * 3;
      this.dy = (Math.random() - 0.5) * 6;
      this.color = this.getRandomColor(isDarkMode);
      this.opacity = Math.random() * 0.5 + 0.3;
    }

    getRandomColor(isDarkMode) {
      const darkColors = [
        'rgba(52, 152, 219, 0.7)', 
        'rgba(46, 204, 113, 0.7)', 
        'rgba(231, 76, 60, 0.7)'
      ];
      const lightColors = [
        'rgba(52, 152, 219, 0.5)', 
        'rgba(46, 204, 113, 0.5)', 
        'rgba(231, 76, 60, 0.5)'
      ];
      const colors = isDarkMode ? darkColors : lightColors;
      return colors[Math.floor(Math.random() * colors.length)];
    }

    update(canvasWidth, canvasHeight) {
      if (this.x + this.dx > canvasWidth - this.radius || this.x + this.dx < this.radius) {
        this.dx = -this.dx;
      }
      if (this.y + this.dy > canvasHeight - this.radius || this.y + this.dy < this.radius) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }, [isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const initialBalls = Array.from({ length: 40 }, () => 
      new BallClass(canvas.width, canvas.height)
    );
    setBalls(initialBalls);

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      initialBalls.forEach(ball => {
        ball.update(canvas.width, canvas.height);
        ball.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [BallClass]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`pong-background ${isDarkMode ? 'dark' : 'light'}`}
    />
  );
};

export default PongBackground;