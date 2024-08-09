import { IconType } from "react-icons";

const TodoCard = ({ todoIcon: TodoIcon, text, handleClick }: TodoCardProps) => {
   return (
      <div
         onClick={handleClick}
         className="calc-width-two h-32 flex flex-col justify-center items-center gap-2 bg-bubbles dark:bg-gray text-richElectricBlue dark:text-white px-3 rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body md:calc-width-four"
      >
         <TodoIcon className="w-6 h-6" />
         <p className="text-center">{text}</p>
      </div>
   );
};

export default TodoCard;

type TodoCardProps = {
   handleClick: () => void;
   todoIcon: IconType;
   text: string;
};
