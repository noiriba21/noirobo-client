import Link from "next/link";
import {
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa6";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-neutral text-neutral-content">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" aria-label="NoiROBO home">
            <Logo />
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-neutral-content/70">
            Rent robotics kits, AI hardware, 3D printers and car workshop tools
            from trusted owners. Build more, buy less.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xl text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-neutral-content/70">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/equipment" className="hover:text-primary">All Equipment</Link></li>
            <li><Link href="/login" className="hover:text-primary">Login</Link></li>
            <li><Link href="/register" className="hover:text-primary">Register</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xl text-white">Categories</h4>
          <ul className="space-y-2 text-sm text-neutral-content/70">
            <li>Robotics &amp; Electronics</li>
            <li>AI &amp; ML Hardware</li>
            <li>Vehicles &amp; Car Tools</li>
            <li>Car Workshop Equipment</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xl text-white">Contact</h4>
          <ul className="space-y-2 text-sm text-neutral-content/70">
            <li>Chattogram, Bangladesh</li>
            <li>hello@noirobo.com</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {[FaXTwitter, FaFacebookF, FaLinkedinIn, FaGithub].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-primary hover:bg-primary hover:text-neutral"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-neutral-content/60">
        © 2026 NoiROBO. All rights reserved.
      </div>
    </footer>
  );
}