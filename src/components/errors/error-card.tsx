export const ErrorCard = ({ errorMsg }: { errorMsg: string }) => {
  return <p className="text-red-500 text-sm">{errorMsg}</p>;
};
