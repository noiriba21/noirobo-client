import Link from "next/link";
import {
  FaRobot,
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer id="contact" className="bg-neutral text-neutral-content">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-content">
              <FaRobot />
            </span>
            <span className="text-xl font-extrabold text-white">
              Noi<span className="text-secondary">ROBO</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-neutral-content/70">
            Rent robotics kits, AI hardware, 3D printers and car workshop tools
            from trusted owners. Build more, buy less.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="mb-4 text-base font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-neutral-content/70">
            <li><Link href="/" className="hover:text-secondary">Home</Link></li>
            <li><Link href="/equipment" className="hover:text-secondary">All Equipment</Link></li>
            <li><Link href="/login" className="hover:text-secondary">Login</Link></li>
            <li><Link href="/register" className="hover:text-secondary">Register</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="mb-4 text-base font-semibold text-white">Categories</h4>
          <ul className="space-y-2 text-sm text-neutral-content/70">
            <li>Robotics &amp; Electronics</li>
            <li>AI &amp; ML Hardware</li>
            <li>Vehicles &amp; Car Tools</li>
            <li>Car Workshop Equipment</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-base font-semibold text-white">Contact</h4>
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-secondary hover:bg-secondary hover:text-neutral"
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