export const Ellipses = ({ children }: EllipsesProps) => {
   return (
      <>
         <div className="ellipses top-0 right-[80px] bg-[rgba(0, 201, 141, 0.50)]"></div>
         <div className="ellipses bottom-[60px] left-5 bg-[rgba(0, 201, 141, 0.50)]"></div>

         {children}
      </>
   );
};

type EllipsesProps = {
   children: React.ReactNode;
};
