import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionItem = { name: string; path: string };
type Section = { heading: string; items: SectionItem[] };

const MBBS_SECTIONS: Section[] = [
  {
    heading: "MBBS IN GEORGIA",
    items: [
      {
        name: "The University Of Georgia",
        path: "/mbbs-abroad/georgia/university-of-georgia",
      },
      {
        name: "Ken Walker International University",
        path: "/mbbs-abroad/georgia/ken-walker-international-university",
      },
      {
        name: "Tbilisi State Medical University",
        path: "/mbbs-abroad/georgia/tbilisi-state-medical-university",
      },
      {
        name: "Ilia State University",
        path: "/mbbs-abroad/georgia/ilia-state-university",
      },
      {
        name: "Akaki Tsereteli State University",
        path: "/mbbs-abroad/georgia/akaki-tsereteli-state-university",
      },
    ],
  },
  {
    heading: "MBBS IN RUSSIA",
    items: [
      {
        name: "Belgorod State National Research University",
        path: "/mbbs-abroad/russia/belgorod-state-national-research-university",
      },
    ],
  },
];

type NavNode =
  | { type: "link"; name: string; path: string }
  | { type: "dropdown"; name: string; sections: Section[] };

const NAV_STRUCTURE: NavNode[] = [
  { type: "link", name: "Home", path: "/" },
  { type: "link", name: "About", path: "/about" },
  { type: "dropdown", name: "MBBS-ABROAD", sections: MBBS_SECTIONS },
  { type: "link", name: "360_VIEW", path: "/360-view" },
  { type: "link", name: "GALLERY", path: "/gallery" },
  { type: "link", name: "CONTACT", path: "/contact" },
];

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ddRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const top = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (top / docH) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    setOpenMobileDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      const prev = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isPathActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const isDropdownActive = (sections: Section[]) =>
    sections.some((sec) => sec.items.some((it) => isPathActive(it.path)));

  const getLinkClass = (active: boolean) =>
    cn(
      "font-medium transition-colors px-1",
      active
        ? "text-brand-red"
        : isScrolled
        ? "text-black hover:text-brand-red"
        : "text-white hover:text-brand-red"
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 flex justify-between items-center h-20">
        <Link to="/" className="flex items-center gap-2 relative z-20">
          <img
            alt="Vsource Logo"
            className="h-16 md:h-20 w-auto object-contain rounded-xl"
            src="/images/vsourcess.png"
          />
          <img
            alt="Vsource Logo"
            className="h-16 md:h-20 w-auto object-contain rounded-xl"
            src="/images/20 years logo-01.png"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {NAV_STRUCTURE.map((node) => {
            if (node.type === "link") {
              return (
                <Link
                  key={node.name}
                  to={node.path}
                  className={getLinkClass(isPathActive(node.path))}
                >
                  {node.name}
                </Link>
              );
            }
            const active = isDropdownActive(node.sections);
            return (
              <div
                key={node.name}
                className="relative group"
                ref={ddRef}
                onMouseEnter={() => setOpenDropdown(node.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={cn(
                    "flex items-center space-x-1",
                    getLinkClass(active)
                  )}
                  onClick={() =>
                    setOpenDropdown((v) => (v === node.name ? null : node.name))
                  }
                  type="button"
                >
                  <span>{node.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[720px] max-w-[90vw] grid grid-cols-2 gap-6 p-6 rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-200 z-50",
                    openDropdown === node.name
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  )}
                >
                  {node.sections.map((section) => (
                    <div key={section.heading}>
                      <h4 className="mb-2 text-xs font-semibold uppercase text-gray-500">
                        {section.heading}
                      </h4>
                      <div className="space-y-2">
                        {section.items.map((d) => {
                          return (
                            <Link
                              key={d.name}
                              to={d.path}
                              className={cn(
                                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                                isPathActive(d.path)
                                  ? "text-brand-red"
                                  : "text-black hover:bg-gray-100 hover:text-brand-red"
                              )}
                            >
                              {d.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
        {scrollProgress > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-200 z-30">
            <div
              className="h-[3px] bg-brand-red transition-all duration-75"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}

        <button
          className={cn(isScrolled ? "text-black" : "text-white", "md:hidden")}
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden bg-white flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full border-b">
            <div className="w-full max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 relative z-20">
                <img
                  alt="Vsource Logo"
                  className="h-16 md:h-20 w-auto object-contain rounded-xl"
                  src="/images/vsourcess.png"
                />
                <img
                  alt="Vsource Logo"
                  className="h-16 md:h-20 w-auto object-contain rounded-xl"
                  src="/images/20 years logo-01.png"
                />
              </Link>
              <button
                aria-label="Close menu"
                className="text-gray-800 hover:text-brand-red"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="w-full max-w-[1400px] mx-auto px-4 py-4 space-y-3">
              {NAV_STRUCTURE.map((node) => {
                if (node.type === "link") {
                  return (
                    <Link
                      key={node.name}
                      to={node.path}
                      className={cn(
                        "block py-2 text-lg font-medium",
                        isPathActive(node.path)
                          ? "text-brand-red"
                          : "text-gray-800 hover:text-brand-red"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {node.name}
                    </Link>
                  );
                }
                const open = openMobileDropdown === node.name;
                return (
                  <div
                    key={node.name}
                    className="rounded-2xl border border-gray-200"
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-3 font-semibold text-gray-900"
                      onClick={() =>
                        setOpenMobileDropdown(open ? null : node.name)
                      }
                    >
                      {node.name}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          open && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-in-out",
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 pb-4 space-y-4">
                          {node.sections.map((section) => (
                            <div key={section.heading}>
                              <h4 className="mt-2 mb-1 text-xs font-semibold uppercase text-gray-500">
                                {section.heading}
                              </h4>
                              <div className="space-y-1">
                                {section.items.map((d) => {
                                  return (
                                    <Link
                                      key={d.name}
                                      to={d.path}
                                      className={cn(
                                        "flex items-center gap-2 py-2 text-sm",
                                        isPathActive(d.path)
                                          ? "text-brand-red"
                                          : "text-gray-800 hover:text-brand-red"
                                      )}
                                      onClick={() => {
                                        setIsOpen(false);
                                        setOpenMobileDropdown(null);
                                      }}
                                    >
                                      {d.name}
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="h-10" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
