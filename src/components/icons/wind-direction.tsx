export const WindDirectionIcon = ({ deg }: { deg: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${deg}deg)` }}
      className="inline-block text-black mr-1"
    >
      <path d="M17 7 7 17" />
      <path d="M17 17H7V7" />{" "}
    </svg>
  );
};
