const BurstIcon = ({ fill = "#032FD9", size = 22 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
    <g fill={fill}>
      <rect x="46" y="4" width="8" height="34" rx="4" />
      <rect x="46" y="62" width="8" height="34" rx="4" />
      <rect x="4" y="46" width="34" height="8" rx="4" />
      <rect x="62" y="46" width="34" height="8" rx="4" />
      <rect x="46" y="4" width="8" height="34" rx="4" transform="rotate(45 50 50)" />
      <rect x="46" y="62" width="8" height="34" rx="4" transform="rotate(45 50 50)" />
      <rect x="4" y="46" width="34" height="8" rx="4" transform="rotate(45 50 50)" />
      <rect x="62" y="46" width="34" height="8" rx="4" transform="rotate(45 50 50)" />
    </g>
  </svg>
);

export default BurstIcon;
