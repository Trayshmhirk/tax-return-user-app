import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardForm from "../../components/payment/CardForm";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "../ui/dialog";

type addCardDialogProps = {
   children: React.ReactNode;
};

const stripePromise = loadStripe(
   `${import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

const AddCardDialog = ({ children }: addCardDialogProps) => {
   return (
      <Dialog>
         <DialogTrigger asChild>{children}</DialogTrigger>
         <DialogContent className="max-w-lg gap-5">
            <DialogHeader className="gap-4">
               <DialogTitle className="font-semibold md:text-xl">
                  Add new card
               </DialogTitle>
            </DialogHeader>
            <div className="w-full h-[1px] bg-eerieBlack dark:bg-white opacity-20" />

            <div className="w-full h-full flex flex-col gap-4 rounded-2xl">
               <Elements stripe={stripePromise}>
                  <CardForm />
               </Elements>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default AddCardDialog;
