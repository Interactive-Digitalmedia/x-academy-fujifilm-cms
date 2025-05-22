import React from 'react';

interface TaskActionButtonProps {}

const TaskActionButton: React.FC<TaskActionButtonProps> = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-between px-10 py-2 w-full bg-zinc-200 max-md:px-5 max-md:max-w-full">
      <button className="flex gap-10 my-auto">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/17f074d25f3f02978d0975718227d351c681135b6e8b1478d7f088ed3ece932c?placeholderIfAbsent=true&apiKey=a84b5e229ec542c4aeb292f79e8429f3" alt="" className="object-contain shrink-0 my-auto aspect-square w-[15px]" />
        <span>Create Task</span>
      </button>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1447fb6d620b43de0f418ea1020d47829903bb6f45bc14864cfc1a9d941f36d?placeholderIfAbsent=true&apiKey=a84b5e229ec542c4aeb292f79e8429f3" alt="" className="object-contain shrink-0 rounded-none aspect-square w-[30px]" />
    </div>
  );
};

export default TaskActionButton;