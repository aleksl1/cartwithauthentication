const ResetPassword = () => {
  return (
    <div className="container">
      <form className="form">
        <label htmlFor="email">Email adress</label>
        <input type="email" id="email" name="email" />
        <button type="submit">Reset password</button>
        <small>Reset your password with a link you recieved</small>
      </form>
    </div>
  );
};

export default ResetPassword;
