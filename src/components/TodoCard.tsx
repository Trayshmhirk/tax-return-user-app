import { IconType } from "react-icons";

type TodoCardProps = {
   handleClick: () => void;
   todoIcon: IconType;
   text: string;
};

const TodoCard = ({ todoIcon: TodoIcon, text, handleClick }: TodoCardProps) => {
   return (
      <div
         onClick={handleClick}
         className="todo-card h-32 flex flex-col justify-center items-center gap-2 bg-bubbles dark:bg-gray text-richElectricBlue dark:text-white rounded-lg cursor-pointer shadow-md hover-shadow-body"
      >
         <TodoIcon className="w-6 h-6" />
         <p className="">{text}</p>
      </div>
   );
};

export default TodoCard;
