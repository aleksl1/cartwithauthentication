import classes from "./DeliveryData.module.css";

const DeliveryData = (props) => {
  return (
    <>
      {props.userName ? (
        <p>
          <span className={classes["load-data-btn"]}>
            Use Your profile data
          </span>{" "}
          or enter new address below:{" "}
        </p>
      ) : (
        <p>Please, provide us with information, required for delivery: </p>
      )}
      <div>
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="house" placeholder="St.number" />
        <input type="text" name="city" placeholder="City" />
        <input type="text" name="zip-code" placeholder="Zip Code" />
        <input type="text" name="email" placeholder="email@adress.com" />
        <div className={classes.checkbox}>
          <div className={classes["box-label"]}>
            <label htmlFor="">Delivery option: </label>
          </div>
          <div className={classes["checkbox-option"]}>
            <label>By post</label>
            <input type="checkbox" name="postOffice" checked />
          </div>
          <div className={classes["checkbox-option"]}>
            <label>UPS Delivery</label>
            <input type="checkbox" name="ups" />
          </div>
          <div className={classes["checkbox-option"]}>
            <label>Pick up order</label>
            <input type="checkbox" name="pickup" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryData;
