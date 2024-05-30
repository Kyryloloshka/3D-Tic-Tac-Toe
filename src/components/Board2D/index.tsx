import Square from "./_components/Square";

const Board2D = ({ boardOrder }: { boardOrder: number }) => {
  return (
    <div className="relative min-h-[140px] min-w-[140px] md:h-[calc((100vh-350px)/3)] max-h-[180px] aspect-square md:max-w-max ">
      <div className="h-[4px] shadow-neon-primary rounded-full w-full bg-primary-500 absolute left-0 top-[33.33%] -translate-y-[2px]"></div>
      <div className="h-[4px] shadow-neon-primary rounded-full w-full bg-primary-500 absolute left-0 top-[66.66%] -translate-y-[2px]"></div>
      <div className="w-[4px] shadow-neon-primary rounded-full h-full bg-primary-500 absolute top-0 left-[33.33%] -translate-x-[2px]"></div>
      <div className="w-[4px] shadow-neon-primary rounded-full h-full bg-primary-500 absolute top-0 left-[66.66%] -translate-x-[2px]"></div>
      <div className="absolute flex flex-col h-[100%] w-full gap-[4px]">
        <div className="flex w-full h-[calc(33.33%-2px)] gap-[4px]">
          {[0, 1, 2].map((index) => (
            <Square key={index} index={index} boardOrder={boardOrder} />
          ))}
        </div>
        <div className="flex h-[calc(33.33%_-4px)] gap-[4px]">
          {[3, 4, 5].map((index) => (
            <Square key={index} index={index} boardOrder={boardOrder} />
          ))}
        </div>
        <div className="flex h-[calc(33.33%-4px)] gap-[4px]">
          {[6, 7, 8].map((index) => (
            <Square key={index} index={index} boardOrder={boardOrder} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board2D;
