import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
    };
  }
  return initialInputState;
};

const useInput = (validateValue) => {
  const [inputState, inputDispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  //* Deriving states :
  //? Derived states are simple const values that are managed or initialized based on another state or a prop. When the prop or the state changes it affects the value of the derived state.
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    inputDispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    inputDispatch({ type: "BLUR" });
  };

  const reset = () => {
    inputDispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
