import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer-bottom">
      <button
        className="up-arrow"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="12"
          viewBox="0 0 20 12"
        >
          <path d="M16.964 11.454 10 4.364l-6.964 7.09a1.608 1.608 0 0 1-1.25.546 1.608 1.608 0 0 1-1.25-.545 1.779 1.779 0 0 1 0-2.545L8.75.545a1.705 1.705 0 0 1 2.5 0l8.214 8.364a1.78 1.78 0 0 1 0 2.545 1.7 1.7 0 0 1-2.5 0Z" />
        </svg>
      </button>
      <div className="footer-container">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <a href="#">about us</a>
              </li>
              <li>
                <a href="#">our services</a>
              </li>
              <li>
                <a href="#">privacy policy</a>
              </li>
              <li>
                <a href="#">affiliate program</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>get help</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">shipping</a>
              </li>
              <li>
                <a href="#">returns</a>
              </li>
              <li>
                <a href="#">hotline</a>
              </li>
              <li>
                <a href="#">payment options</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>menu</h4>
            <ul>
              <li>
                <a href="#">VIN check</a>
              </li>
              <li>
                <a href="#">car services</a>
              </li>
              <li>
                <a href="#">disassembled cars</a>
              </li>
              <li>
                <a href="#">tbilisi parking</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow me</h4>
            <div className="social-links">
              <a href="#">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  height="24px"
                  width="24px"
                />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faGithub} height="24px" width="24px" />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faInstagram}
                  height="24px"
                  width="24px"
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  height="24px"
                  width="24px"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
