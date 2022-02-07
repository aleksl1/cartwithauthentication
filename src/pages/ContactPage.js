import classes from "./ContactPage.module.css";
import {
  FaPhoneAlt,
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <article className={classes["contact-page"]}>
      <header className={classes.header}>
        <div className={classes.phone}>
          <span>You can call our customer service:</span>
          <FaPhoneAlt className={classes["phone-icon"]} />
          <span className={classes["phone-number"]}>133 132 123</span>
        </div>
      </header>
      <div className={classes.body}>
        <span className={classes.title}>Write us a message:</span>
        <form
          className={classes.message}
          action="mailto: superstore@superstore.pl"
        >
          <textarea name="" id="" cols="20" rows="5"></textarea>
          <label htmlFor="email">
            Your email address <input type="email" />
          </label>
          <button disabled>Send</button>
        </form>
      </div>
      <footer className={classes.footer}>
        <span>Contact us through social media:</span>
        <div className={classes.socials}>
          <span>
            <FaFacebookSquare />
          </span>
          <span>
            <FaTwitterSquare />
          </span>
          <span>
            <FaInstagramSquare />
          </span>
        </div>
      </footer>
    </article>
  );
};

export default ContactPage;
