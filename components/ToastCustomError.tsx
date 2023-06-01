import { ZodError } from "zod";

const ToastCustomError = ({error}: {error: ZodError} ) => {
    
  return (
      <p className='text-lg text-white'>{error.issues[0].message}</p>
  );
};

export default ToastCustomError;