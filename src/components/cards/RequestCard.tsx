import { RequestsPropTypes } from "@/types/Types";
import { formatDate } from "date-fns";

type RequestCardPropTypes = {
   request: RequestsPropTypes;
   handleRequestCardClick: () => void;
};

const RequestCard = ({
   request,
   handleRequestCardClick,
}: RequestCardPropTypes) => {
   return (
      <div
         onClick={handleRequestCardClick}
         className="relative w-full flex flex-col justify-center gap-2 bg-white dark:bg-gray px-4 py-3 rounded-lg shadow-md dark:shadow-md-dark hover-shadow-body"
      >
         <div
            className={`
               absolute right-4 top-4 py-[2px] px-[6px] text-xs rounded
               ${request.status.toLowerCase() === "pending" ? "warning" : ""}
               ${request.status.toLowerCase() === "paid" ? "success" : ""}
               ${request.status.toLowerCase() === "completed" ? "completed" : ""}
            `}
         >
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
         </div>

         <div className="text-sm">{request.service_id}</div>

         <div className="text-sm">
            <span className="text-richElectricBlue">
               {request.service_title}
            </span>
         </div>

         <div className="text-xs">
            <span className="">
               {formatDate(request.requestDate, "dd.MM.yyyy")}
            </span>
         </div>
      </div>
   );
};

export default RequestCard;
