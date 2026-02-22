import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center md:gap-4 sm:gap-3 gap-2 bg-secondary text-white md:py-6 sm:py-5 py-4">
      <span className="md:text-base sm:text-sm text-xs">
        Created by <Link href="/">nauffal.code</Link> | &copy;2024 All Rights
        Reserved.
      </span>
      <div className="flex gap-4 text-lg">
        <Link
          href="https://www.instagram.com/2econd.code/"
          className="md:text-base sm:text-sm text-xs"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link
          href="https://www.tiktok.com/@2econd.code"
          className="md:text-base sm:text-sm text-xs"
        >
          <FontAwesomeIcon icon={faTiktok} />
        </Link>
        <Link
          href="https://github.com/nauffal-rizky"
          className="md:text-base sm:text-sm text-xs"
        >
          <FontAwesomeIcon icon={faGithub} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/naufal-nur-rizky-612449364/"
          className="md:text-base sm:text-sm text-xs"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </Link>
      </div>
    </footer>
  );
}
