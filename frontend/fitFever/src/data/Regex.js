export const validEmail = new RegExp(
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

)

export const validPassword = new RegExp(
   "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[_&@*!..])[a-zA-Z0-9_&@*!..]{8,}$"

)