// Emblema KOLAB: octágono perimetral + estrella {8/3} con nodos pequeños en anillo.
export default function Emblema({ size = 40, opacidad = 1, className }) {
  const r = 44;
  const p = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 4) * i - Math.PI / 2 + Math.PI / 8;
    return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
  });
  const lineas = (salto) => p.map((a, i) => `M${a[0].toFixed(2)} ${a[1].toFixed(2)}L${p[(i + salto) % 8][0].toFixed(2)} ${p[(i + salto) % 8][1].toFixed(2)}`).join('');
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ opacity: opacidad }}>
      <path d={lineas(1)} stroke="#D1AC36" strokeWidth="1.3" />
      <path d={lineas(3)} stroke="#D1AC36" strokeWidth="1.3" />
      {p.map((a, i) => (
        <circle key={i} cx={a[0]} cy={a[1]} r="2" fill="#0A0F1D" stroke="#D1AC36" strokeWidth="1.2" />
      ))}
    </svg>
  );
}
