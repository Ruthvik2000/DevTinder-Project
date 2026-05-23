
import logo from "../assests/logo.jpg";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10">
      {/* Main footer */}
      <div className="footer bg-base-200 text-base-content px-6 py-10 md:px-12">
        {/* Brand */}
        <aside className="max-w-md space-y-3">
          <div className="flex items-center gap-3">
            <div className="btn btn-ghost btn-circle">
              <img
              src={logo}
              alt="DevTinder logo"
              className="w-6 h-6 object-contain"
              />
            </div>

            <div>
              <p className="text-xl font-bold">DevTinder</p>
              <p className="text-sm opacity-70">
                Connect developers. Build together.
              </p>
            </div>
          </div>

          <p className="text-sm opacity-80 leading-relaxed">
            A developer networking platform to connect, collaborate, and grow
            your professional circle.
          </p>
        </aside>

        {/* Social */}
        <nav>
          <h6 className="footer-title">Follow</h6>

          <div className="flex items-center gap-3">
            <a
              className="btn btn-ghost btn-circle"
              href="https://www.linkedin.com/in/setty-ruthvik-571a231b4/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                className="fill-current"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.336-.026-3.06-1.865-3.06-1.865 0-2.152 1.458-2.152 2.965v5.699h-3v-10h2.879v1.365h.042c.401-.759 1.379-1.56 2.839-1.56 3.038 0 3.597 2 3.597 4.604v5.591z" />
              </svg>
            </a>

            <a
              className="btn btn-ghost btn-circle"
              href="https://www.youtube.com/@settyruthvik6236"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>

            <a
              className="btn btn-ghost btn-circle"
              href="https://github.com/Ruthvik2000/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                className="fill-current"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.304 3.438 9.8 8.207 11.385.6.111.793-.261.793-.577 0-.285-.011-1.04-.016-2.04-3.338.724-4.042-1.609-4.042-1.609-.546-1.387-1.333-1.757-1.333-1.757-1.091-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.42-1.305.763-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.38 1.235-3.221-.123-.304-.535-1.527.117-3.182 0 0 1.007-.322 3.3 1.23.957-.267 1.983-.4 3.003-.404 1.02.004 2.047.137 3.003.404 2.293-1.552 3.298-1.23 3.298-1.23.653 1.655.241 2.878.118 3.182.767.841 1.234 1.911 1.234 3.221 0 4.608-2.805 5.625-5.476 5.922.432.372.816 1.102.816 2.222 0 1.606-.014 2.896-.014 3.293 0 .319.191.694.799.576 4.766-1.588 8.202-6.081 8.202-11.382 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>

          <p className="text-xs opacity-70 mt-2">
            Get updates & releases on social.
          </p>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-base-300 bg-base-200 px-6 py-4 md:px-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-sm opacity-75">© {year} DevTinder. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <a className="link link-hover opacity-80">Privacy</a>
            <a className="link link-hover opacity-80">Terms</a>
            <a className="link link-hover opacity-80">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
