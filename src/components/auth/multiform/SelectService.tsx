import { useState } from "react";
import RadioInput from "../../form-components/RadioInput";
import {
   ChatAccessStatus,
   ChatsPropType,
   SelectServicePropType,
   ServicesTypes,
} from "../../../types/Types";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
   useCreateServiceChatMutation,
   useGetServicesQuery,
} from "@/redux/api/apiSlice";
import { v4 as uuidv4 } from "uuid";

const SelectService = ({ selectedCategory, onPrev }: SelectServicePropType) => {
   const navigate = useNavigate();
   const { data: services = [] } = useGetServicesQuery();
   const [createServiceChat, { isLoading: isSubmit }] =
      useCreateServiceChatMutation();

   // const [isSubmitting, setIsSubmitting] = useState(false);
   const [checkedRadio, setCheckedRadio] = useState("");
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
   const [selectedService, setSelectedService] = useState<
      ServicesTypes | undefined
   >();

   const handleRadioChange = (
      value: string,
      service: ServicesTypes | undefined
   ) => {
      setCheckedRadio(value);
      setIsButtonDisabled(!value);
      if (service) {
         setSelectedService(service);
      }
   };

   const onSubmit = async () => {
      // Simulate API call with setTimeout
      if (!selectedService) return;

      const newChat: ChatsPropType = {
         id: uuidv4(),
         title: selectedService.title,
         service_id: selectedService.service_id,
         messages: [],
         chat_access: ChatAccessStatus.ON,
         category: selectedCategory,
      };

      createServiceChat(newChat);

      setTimeout(() => {
         // after mock success
         navigate("/chat");
      }, 700);
   };

   return (
      <>
         <div className="flex flex-col gap-7 mb-auto">
            <div className="flex flex-col gap-4">
               {services.map((service, index) => (
                  <RadioInput
                     key={index}
                     service={service}
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
               disabled={isButtonDisabled || isSubmit}
               className="w-full"
            >
               {isSubmit ? (
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
