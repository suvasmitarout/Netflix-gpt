export function checkValidData(email,password) {
   const isEmailvalid=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
   const isPasswordValid=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|:;'<>,.?/~`]).{8,}$/.test(password);

   if(!isEmailvalid) return "Email ID is not valid";
   if(!isPasswordValid) return "Password is not valid";

   return null;
};