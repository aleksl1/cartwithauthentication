const ErrorPage = (props) => {
  return (
    <div className="error-page">
      <article>
        <div className="error-message">{props.message}</div>
      </article>
    </div>
  );
};

export default ErrorPage;
