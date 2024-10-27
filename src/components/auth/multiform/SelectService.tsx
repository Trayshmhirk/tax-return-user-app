import { useState } from "react";
import RadioCheckInput from "../../form-components/RadioCheckInput";
import { SelectServicePropType } from "../../../types/Types";
import { servicesList } from "../../../mocks/MockData";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SelectService = ({ selectedCategory, onPrev }: SelectServicePropType) => {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      // Simulate API call with setTimeout
      setTimeout(() => {
         setIsLoading(false);
         selectedServiceId;
         selectedCategory;
         setTimeout(() => {
            // after mock success
            navigate("/chat");
         }, 700);
      }, 2000); // Mock API call delay of 2 seconds

      // api call
      // const { email, token } = userProfile;
      // try {
      //    const res = await api.post(
      //       "/request-service",
      //       {
      //          service_id: selectedServiceId,
      //          category: selectedCategory,
      //          user_id: currentUser.ID,
      //       },
      //       {
      //          headers: {
      //             useremail: email,
      //             usertoken: token,
      //          },
      //       }
      //    );
      //    // Handle successful response here
      //    if (res.status === 200) {
      //       // dispatch(setConversation(res.data.chats.conversation))
      //       setConfirmationModal({
      //          show: true,
      //          title: "Your service request has been successful",
      //          content:
      //             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      //       });
      //       setTimeout(() => {
      //          setConfirmationModal({ show: false });
      //          navigate("/live-chat", {
      //             state: { data: res.data.chats.conversation },
      //          });
      //       }, 2000);
      //    }
      // } catch (error) {
      //    console.error("API Error:", error);
      //    // Handle error, log it, or display a user-friendly message
      // }
   };

   return (
      <>
         <div className="flex flex-col gap-7 mb-auto">
            <div className="flex flex-col gap-4">
               {servicesList.map((service, index) => (
                  <RadioCheckInput
                     key={index}
                     serviceId={service.service_id}
                     value={service.title}
                     isRadio
                     isChecked={checkedRadio === `${service.title}`}
                     onRadioAndCheckChange={handleRadioChange}
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
