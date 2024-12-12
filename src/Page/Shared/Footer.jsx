import { SiHashicorp } from "react-icons/si";
import icon from "./../../assets/icon.png";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <footer className="footer bg-base-200 text-base-content p-10">
        <nav>
          <h2>EduManage</h2>
          <img className="w-24" src={icon} alt="" />
          <div className="mt-4">
            <h2 className="ml-3 font-medium text-gray-500 -mb-2">Find Us On</h2>
            <img
              className="w-56"
              src="https://i.ibb.co.com/YQkyP0G/Screenshot-2024-12-12-183939-removebg-preview.png"
              alt=""
            />
          </div>
        </nav>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>

        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>
      <footer className="footer bg-neutral text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <SiHashicorp className="text-4xl"></SiHashicorp>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>

        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-2xl">
          <FaYoutube></FaYoutube>
          <FaTwitter></FaTwitter>
          <FaFacebook></FaFacebook>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
