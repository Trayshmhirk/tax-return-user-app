import { useState } from "react";
import RadioInput from "../../form-components/RadioInput";
import { SelectServicePropType } from "../../../types/Types";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@/redux/api/apiSlice";

const SelectService = ({ selectedCategory, onPrev }: SelectServicePropType) => {
   const navigate = useNavigate();
   const { data: services = [], isLoading } = useGetServicesQuery();

   // const [isLoading, setIsLoading] = useState(false);
   const [checkedRadio, setCheckedRadio] = useState("");
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
   const [selectedServiceId, setSelectedServiceId] = useState<
      string | undefined
   >("");

   const handleRadioChange = (value: string, serviceId: string | undefined) => {
      setCheckedRadio(value);
      setIsButtonDisabled(!value);
      if (serviceId) {
         setSelectedServiceId(serviceId);
      }
   };

   const onSubmit = async () => {
      // setIsLoading(true);
      // Simulate API call with setTimeout
      setTimeout(() => {
         // setIsLoading(false);
         selectedServiceId;
         selectedCategory;

         setTimeout(() => {
            // after mock success
            navigate("/chat");
         }, 700);
      }, 2000); // Mock API call delay of 2 seconds
   };

   return (
      <>
         <div className="flex flex-col gap-7 mb-auto">
            <div className="flex flex-col gap-4">
               {services.map((service, index) => (
                  <RadioInput
                     key={index}
                     serviceId={service.service_id}
                     value={service.title}
                     isChecked={checkedRadio === `${service.title}`}
                     onRadioChange={handleRadioChange}
                  />
               ))}
            </div>
         </div>

         <div className="w-full flex gap-4 text-center">
            <Button
               type="button"
               onClick={() => onPrev()}
               className="w-full bg-transparent text-richElectricBlue border border-richElectricBlue"
            >
               Previous
            </Button>

            <Button
               type="button"
               onClick={onSubmit}
               disabled={isButtonDisabled || isLoading}
               className="w-full"
            >
               {isLoading ? (
                  <ClipLoader color="#ffffff" size={20} />
               ) : (
                  "Chat with an agent"
               )}
            </Button>
         </div>
      </>
   );
};

export default SelectService;
