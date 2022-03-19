import React from "react";
import imgMeal from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h2>ReactMeals</h2>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={imgMeal} alt="meals" />
      </div>
    </>
  );
};

export default Header;
