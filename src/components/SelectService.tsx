import { useState } from "react";
import CustomButton from "./CustomButton";
import TextArea from "./TextArea";
import RadioCheckInput from "./RadioCheckInput";
import { SelectServicePropType } from "../types/AllTypes";
import { servicesList } from "../mocks/AllMockData";

const SelectService = ({ selectedCategory }: SelectServicePropType) => {
   const [checkedRadio, setCheckedRadio] = useState("");
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
   const [toggleTextArea, setToggleTextArea] = useState(false);
   const [selectedServiceId, setSelectedServiceId] = useState<
      string | undefined
   >("");
   const [selectedFile, setSelectedFile] = useState<File | undefined>(
      undefined
   );

   const handleRadioChange = (value: string, serviceId: string | undefined) => {
      setCheckedRadio(value);
      setIsButtonDisabled(!value);
      if (serviceId) {
         setSelectedServiceId(serviceId);
      }
   };

   const handleSelectService = (serviceTitle: string) => {
      if (serviceTitle === "Tax notice") {
         // setModalData({
         //    show: true,
         //    title: "Upload pdf or image",
         //    onClose: () => {
         //       setModalData({ show: false });
         //    },
         //    onSelectedFile: (file) => {
         //       setSelectedFile(file);
         //    },
         // });
         setToggleTextArea(false);
      } else if (serviceTitle === "Other") {
         setToggleTextArea(true);
      } else {
         setToggleTextArea(false);
         return null;
      }
   };

   function getBase64(file: File): Promise<string | ArrayBuffer | null> {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => resolve(reader.result);
         reader.onerror = (error) => reject(error);
      });
   }

   const handleRequestTaxNotice = async () => {
      if (selectedFile) {
         const base64File = await getBase64(selectedFile);

         console.log(base64File);
         console.log(selectedCategory);

         // in megabytes
         const fileSizeInBytes = selectedFile.size;
         console.log(fileSizeInBytes);

         // const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
         // const { email, token } = userProfile;
         //    try {
         //       const uploadResponse = await api.post(
         //          "/request-tax-notice",
         //          {
         //             category: selectedCategory,
         //             documents: [
         //                {
         //                   name: selectedFile.name,
         //                   size: fileSizeInMB,
         //                   type: selectedFile.type,
         //                   image: base64File,
         //                },
         //             ],
         //          },
         //          {
         //             headers: {
         //                useremail: email,
         //                usertoken: token,
         //             },
         //          }
         //       );

         //       // If upload is successful, add the new document to the Redux state
         //       if (uploadResponse.status === 200) {
         //          // Optionally fetch the updated list of documents from the server
         //          const updatedDocuments = await getTaxNotice(email, token);
         //          dispatch(setTaxNoticeDoc(updatedDocuments.data.taxnotices));

         //          setConfirmationModal({
         //             show: true,
         //             title: "Your tax notice request has been successful",
         //             content:
         //                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
         //          });

         //          setTimeout(() => {
         //             setConfirmationModal({ show: false });
         //             navigate(-1);
         //          }, 2000);
         //       }

         //       // Handle successful response here
         //    } catch (error) {
         //       console.error("API Error:", error);
         //       // Handle error, log it, or display a user-friendly message
         //    }
      }
   };

   const onSubmit = async () => {
      console.log(selectedServiceId);

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
      <div className="h-full flex flex-col gap-7">
         <div className="flex flex-col gap-7">
            <h2 className="font-medium text-xl">
               Select the services you require
            </h2>

            <div className="flex flex-col gap-4">
               {servicesList.map((service, index) => (
                  <RadioCheckInput
                     key={index}
                     serviceId={service.service_id}
                     value={service.title}
                     isRadio
                     // isUploaded={}
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

         <CustomButton
            handleClick={
               checkedRadio === "Tax notice" ? handleRequestTaxNotice : onSubmit
            }
            isDisabled={isButtonDisabled}
         >
            {checkedRadio === "Tax notice"
               ? "Request tax notice"
               : "Chat with an agent"}
         </CustomButton>

         {/* <UploadModal
            show={modalData.show}
            title={modalData.title}
            onClose={modalData.onClose}
            onSelectedFile={modalData.onSelectedFile}
            isSelectService
         />
         <SelectorModal
            isConfirmationModal
            show={confirmationModal.show}
            title={confirmationModal.title}
            content={confirmationModal.content}
            onCancel={handleCloseConfirmationModal}
         /> */}
      </div>
   );
};

export default SelectService;
