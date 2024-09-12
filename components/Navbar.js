import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.svg'; // Adjust the path as necessary

export default function Navbar() {
  return (
    <nav>
      <div className="nav-container">
        <Link href="/">
          <a className="logo">
            <Image src={logo} alt="Girman Technologies Logo" width={120} height={40} />
          </a>
        </Link>
        <div className="nav-links">
          <Link href="/">
            <a className="nav-link">Website</a>
          </Link>
          <Link href="https://www.linkedin.com/company/girmantech" passHref>
            <a className="nav-link">LinkedIn</a>
          </Link>
          <a href="mailto:contact@girmantech.com" className="nav-link">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
