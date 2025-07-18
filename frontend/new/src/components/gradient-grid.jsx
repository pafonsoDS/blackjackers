// GradientGrid component displays a grid of colored cells for visual effect.
export const GradientGrid = () => {
  // Generate 200 random values for cell colors
  const values =  Array.from({ length: 200 }, () => Math.random());

  return (
    <div className="gradient-grid">
      {values.map((t, i) => (
        <div
          key={i}
          className="gradient-cell"
          // Color is determined by the random value
          style={{ backgroundColor: `hsl(${(1 - t) * 120},100%,50%)` }}
        />
      ))}
    </div>
  );
};
