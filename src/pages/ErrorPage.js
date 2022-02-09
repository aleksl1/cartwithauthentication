import classes from "./ErrorPage.module.css";

const ErrorPage = (props) => {
  return (
    <div className={classes["error-page"]}>
      <article>
        <div className={classes["error-message"]}>{props.message}</div>
      </article>
    </div>
  );
};

export default ErrorPage;
