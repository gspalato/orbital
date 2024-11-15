type Props = {
  hoveredElement: number | null;
};

export const InfoPanel: React.FC<Props> = (props) => {
  return (
    <div className="flex row-start-1 row-end-4 col-start-3 col-end-13 h-full w-full p-3"></div>
  );
};
