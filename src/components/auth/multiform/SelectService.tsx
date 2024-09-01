import { useState } from "react";
import TextArea from "../../form-components/TextArea";
import RadioCheckInput from "../../form-components/RadioCheckInput";
import { SelectServicePropType } from "../../../types/AllTypes";
import { servicesList } from "../../../mocks/AllMockData";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";

const SelectService = ({ selectedCategory }: SelectServicePropType) => {
   const [isLoading, setIsLoading] = useState(false);
   const [checkedRadio, setCheckedRadio] = useState("");
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
   const [toggleTextArea, setToggleTextArea] = useState(false);
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

   const handleSelectService = (serviceTitle: string) => {
      if (serviceTitle === "Other") {
         setToggleTextArea(true);
      } else {
         setToggleTextArea(false);
         return null;
      }
   };

   const onSubmit = async () => {
      setIsLoading(true);
      // Simulate API call with setTimeout
      setTimeout(() => {
         setIsLoading(false);
         selectedServiceId;
         selectedCategory;
         // setTimeout(() => {
         //    // after mock success
         //    navigate("/");
         // }, 700);
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
            <h2 className="font-medium text-lg md:text-xl">
               Select the services you require
            </h2>

            <div className="flex flex-col gap-4">
               {servicesList.map((service, index) => (
                  <RadioCheckInput
                     key={index}
                     serviceId={service.service_id}
                     value={service.title}
                     isRadio
                     handleClick={() => handleSelectService(service.title)}
                     isChecked={checkedRadio === `${service.title}`}
                     onRadioAndCheckChange={handleRadioChange}
                  />
               ))}
            </div>
            {toggleTextArea && (
               <TextArea
                  label="Brief description of what you want (optional)"
                  placeholder="Describe what you want us to do for you"
               />
            )}
         </div>

         <Button
            type="button"
            onClick={onSubmit}
            disabled={isButtonDisabled || isLoading}
         >
            {isLoading ? (
               <ClipLoader color="#ffffff" size={20} />
            ) : (
               "Chat with an agent"
            )}
         </Button>
      </>
   );
};

export default SelectService;
