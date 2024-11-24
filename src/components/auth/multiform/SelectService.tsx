import { useState } from "react";
import RadioInput from "../../form-components/RadioInput";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
   useCreateServiceChatMutation,
   useGetServicesQuery,
} from "@/redux/api/apiSlice";
import { v4 as uuidv4 } from "uuid";
import PlaceholderText from "@/components/common/PlaceholderText";

const SelectService = ({ selectedCategory, onPrev }: SelectServicePropType) => {
   const navigate = useNavigate();
   const { data: services = [], isLoading } = useGetServicesQuery();
   const [createServiceChat, { isLoading: isSubmit }] =
      useCreateServiceChatMutation();

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

      const defaultMessage = {
         id: uuidv4(),
         text: "Hello, i would like to request for a service",
         timestamp: new Date().toISOString(),
         type: MessageType.outgoing, // This indicates the message is from the user
         documents: [],
      };

      const newChat: ChatsPropType = {
         id: uuidv4(),
         title: selectedService.title,
         service_id: selectedService.service_id,
         category: selectedCategory,
         chat_access: ChatAccessStatus.ON,
         messages: [defaultMessage],
      };

      createServiceChat(newChat);

      setTimeout(() => {
         // after mock success
         navigate("/chat");
      }, 300);
   };

   return (
      <>
         <div className="h-full flex flex-col gap-4 mb-auto">
            {isLoading ? (
               <div className="w-full h-full flex justify-center items-center">
                  <ClipLoader color="#00A2C9" />
               </div>
            ) : (
               <>
                  {services.length !== 0 ? (
                     services.map((service, index) => (
                        <RadioInput
                           key={index}
                           service={service}
                           value={service.title}
                           isChecked={checkedRadio === `${service.title}`}
                           onRadioChange={handleRadioChange}
                        />
                     ))
                  ) : (
                     <PlaceholderText text="No services found." />
                  )}
               </>
            )}
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
