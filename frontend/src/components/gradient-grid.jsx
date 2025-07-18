export const GradientGrid = () => {
  const values =  Array.from({ length: 200 }, () => Math.random());

  return (
    <div className="gradient-grid">
      {values.map((t, i) => (
        <div
          key={i}
          className="gradient-cell"
          style={{ backgroundColor: `hsl(${(1 - t) * 120},100%,50%)` }}
        />
      ))}
    </div>
  );
};
