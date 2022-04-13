import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const hasFiveCharts = (value) => value.trim().length === 5;

const Checkout = (props) => {
  //! Entered name :
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isNotEmpty);

  //! Entered street :
  const {
    value: enteredStreet,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput(isNotEmpty);

  //! Entered postal code :
  const {
    value: enteredPostalCode,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: postalCodeReset,
  } = useInput(hasFiveCharts);

  //! Entered city :
  const {
    value: enteredCity,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput(isNotEmpty);

  //! Checking form validity :
  let formIsValid = false;

  if (nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid) {
    formIsValid = true;
  }

  //! Submitting form :
  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    console.log(enteredName, enteredStreet, enteredPostalCode, enteredCity);

    //! Clear input fields :
    nameReset();
    streetReset();
    postalCodeReset();
    cityReset();
  };

  //! Setting error classes :
  const nameControlClasses = `${classes.control} ${
    !nameHasError ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    !streetHasError ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    !postalCodeHasError ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    !cityHasError ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.controls}>
        <div className={nameControlClasses}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && (
            <p className={classes.errorMessage}>Please enter a valid name!</p>
          )}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={enteredStreet}
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
          />
          {streetHasError && (
            <p className={classes.errorMessage}>
              Please enter a valid street !
            </p>
          )}
        </div>
        <div className={postalCodeControlClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            id="postal"
            value={enteredPostalCode}
            onChange={postalCodeChangeHandler}
            onBlur={postalCodeBlurHandler}
          />
          {postalCodeHasError && (
            <p className={classes.errorMessage}>
              Please enter a valid postal code (5 characters long)!
            </p>
          )}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={enteredCity}
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
          />
          {cityHasError && (
            <p className={classes.errorMessage}>Please enter a valid city!</p>
          )}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
