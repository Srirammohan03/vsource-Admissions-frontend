import React, { useEffect, useMemo, useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";

type Certificate = {
  image: string;
  title: string;
  description: string;
};

type Props = {
  headlinePrefix?: string;
  headlineAccent?: string;
  sub1?: string;
  sub2?: string;
  className?: string;
};

const certificates: Certificate[] = [
  {
    image: "/images/cert/cert9.jpg",
    title: "Certificate of Partnership",
    description:
      "Authorizes VSource as student recruiter for Dai Nam University.",
  },
  {
    image: "/images/cert/cert8.jpg",
    title: "Certificate of Partnership",
    description:
      "Authorizes VSource as recruiting agent for Ken Walker International University.",
  },
  {
    image: "/images/cert/cert7.jpg",
    title: "Certificate of Partnership",
    description:
      "Certifies VSource Educational Services as recruiting agent for University of Georgia.",
  },
  {
    image: "/images/cert/cert1.jpg",
    title: "Extract from Registry of Legal Entities",
    description: "Proof of company registration in Georgia Public Registry.",
  },
  {
    image: "/images/cert/cert6.jpg",
    title: "Certificate of Incorporation",
    description: "Proof of VSource legal incorporation in India.",
  },
  {
    image: "/images/cert/cert5.jpg",
    title: "Certificate of Partnership",
    description:
      "Recognizes VSource as student recruitment agent for Belgorod State National Research University.",
  },
  {
    image: "/images/cert/cert4.jpg",
    title: "Russian Tax Registration Certificate",
    description:
      "Confirms tax registration of VSource-IND in Russia (Belgorod).",
  },
  {
    image: "/images/cert/cert2.jpg",
    title: "Certificate of Authorization",
    description:
      "Authorizes VSource to recruit for Caucasus International University.",
  },
  {
    image: "/images/cert/cert3.jpg",
    title: "Certificate of Partnership",
    description:
      "Authorizes VSource to recruit for University of Georgia programs.",
  },
];

const isNonEmpty = (v?: string) => !!v && v.trim().length > 0;

/* ---------- Custom slick arrows ---------- */
type ArrowProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    type="button"
    aria-label="Previous"
    className="slick-arrow-custom prev"
    onClick={onClick}
  >
    <span className="arrow-circle">
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="12" fill="#e3000f" />
        <path fill="#fff" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
    </span>
  </button>
);

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    type="button"
    aria-label="Next"
    className="slick-arrow-custom next"
    onClick={onClick}
  >
    <span className="arrow-circle">
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="12" fill="#e3000f" />
        <path
          fill="#ffffff"
          d="m8.59 16.59 1.41 1.41 6-6-6-6-1.41 1.41L13.17 12z"
        />
      </svg>
    </span>
  </button>
);

/* ---------- viewport hook: true when <= 1024px ---------- */
const useTabletOrSmaller = () => {
  const [isTabletDown, setIsTabletDown] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1024px)");
    const update = () => setIsTabletDown(mq.matches);
    update();
    mq.addEventListener
      ? mq.addEventListener("change", update)
      : mq.addListener(update);
    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", update)
        : mq.removeListener(update);
    };
  }, []);
  return isTabletDown;
};

function CertificateSlider({
  headlinePrefix,
  headlineAccent,
  sub1,
  sub2,
  className,
}: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const isTabletDown = useTabletOrSmaller();

  const titlePrefix = isNonEmpty(headlinePrefix)
    ? headlinePrefix!
    : "World Class";
  const titleAccent = isNonEmpty(headlineAccent)
    ? headlineAccent!
    : "Medical Universities";
  const line1 = isNonEmpty(sub1) ? sub1! : "REGISTRATIONS, INCORPORATIONS";
  const line2 = isNonEmpty(sub2) ? sub2! : "AGREEMENTS, COLLABORATIONS";

  useEffect(() => {
    if (typeof window !== "undefined") Modal.setAppElement("body");
  }, []);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentIndex(null);
  };

  const goNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === null ? 0 : (prev + 1) % certificates.length
    );
  }, []);
  const goPrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === null ? 0 : (prev - 1 + certificates.length) % certificates.length
    );
  }, []);

  useEffect(() => {
    if (!modalIsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalIsOpen, goNext, goPrev]);

  // Build settings based on viewport. Key forces slick to re-init when it changes.
  const settings = useMemo(() => {
    if (isTabletDown) {
      return {
        key: "one-up",
        centerMode: false,
        slidesToShow: 1,
        centerPadding: "0px",
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2600,
        speed: 500,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        dots: false,
        pauseOnHover: true,
        swipeToSlide: true,
        focusOnSelect: false,
        lazyLoad: "ondemand",
      };
    }
    // Desktop (default)
    return {
      key: "three-up",
      centerMode: true,
      slidesToShow: 3,
      centerPadding: "0px",
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2600,
      speed: 500,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      dots: false,
      pauseOnHover: true,
      swipeToSlide: true,
      focusOnSelect: true,
      lazyLoad: "ondemand",
    };
  }, [isTabletDown]);

  const modalImage =
    currentIndex !== null ? certificates[currentIndex].image : "";

  return (
    <>
      <style>{`
        .certificate-slider {
          position: relative;
          padding: 4px 0 8px;
          max-width: 1200px;
          margin: 0 auto;
          overflow-x: hidden;
        }
        .slider-shell {
          position: relative;
        }

        .certificate-slider .slick-list {
          margin: 0 -6px;
        }
        .slide {
          padding: 0 6px;
          outline: none;
        }
        .card {
          position: relative;
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          cursor: zoom-in;
          user-select: none;
        }
        .media {
          position: relative;
          width: 100%;
          padding-top: 62%;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.35s, box-shadow 0.35s, filter 0.35s;
        }
        .meta {
          text-align: center;
          padding-top: 10px;
        }
        .title {
          margin: 6px 0 2px;
          font-size: 1.05rem;
          font-weight: 600;
        }
        .desc {
          margin: 0;
          opacity: 0.9;
          font-size: 0.95rem;
        }

        /* ---- Desktop effects only (keep your existing behaviour) ---- */
        @media (min-width: 1025px) {
          .slick-slide .media {
            transform: scale(0.94);
            filter: blur(1px) grayscale(0.07) brightness(0.96);
          }
          .slick-center .media {
            transform: scale(1.08);
            box-shadow: 0 18px 50px rgba(0, 0, 0, 0.25);
            filter: none;
          }
        }

        /* ---- Mobile/Tablet: remove blur completely (1-up view) ---- */
        @media (max-width: 1024px) {
          .slick-slide .media {
            transform: none !important;
            filter: none !important;
          }
        }

        /* Custom slick arrows */
        .slick-arrow-custom {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 5;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .slick-arrow-custom.prev {
          left: 10px;
        }
        .slick-arrow-custom.next {
          right: 10px;
        }
        .arrow-circle {
          background: #fff;
          border-radius: 9999px;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
        }

        /* -------- Lightbox -------- */
        .lb-wrap {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
        }
        .lb-imageBox {
          width: min(92vw, 1100px);
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lb-img {
          max-width: 100%;
          max-height: 86vh;
          object-fit: contain;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 12px 44px rgba(0, 0, 0, 0.35);
          display: block;
        }

        .lb-x {
          position: absolute;
          top: 24px;
          right: 24px;
          z-index: 120;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .lb-x-circle {
          background: #fff;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lb-side {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 120;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .lb-side.left {
          left: 24px;
        }
        .lb-side.right {
          right: 24px;
        }
        .lb-arrow-circle {
          background: #fff;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Guard: when 1-up mode, ensure each slide takes full width */
        @media (max-width: 1024px) {
          .certificate-slider .slick-track {
            display: flex;
          }
          .certificate-slider .slick-slide {
            width: 100% !important;
          }
          .arrow-circle {
            width: 38px;
            height: 38px;
          }
        }

        @media (max-width: 769px) {
          .certificate-slider {
            max-width: 100vw;
          }
          .lb-x {
            top: 10px;
            right: 10px;
          }
          .lb-side.left {
            left: 10px;
          }
          .lb-side.right {
            right: 10px;
          }
          .lb-imageBox {
            width: 96vw;
            max-height: 74vh;
          }
          .lb-img {
            max-height: 72vh;
          }
          .leading-tight {
            margin-left: 20px !important;
          }
          .tracking-wide {
            margin-left: 20px !important;
          }
        }
      `}</style>
      <section
        className={`certificate-slider mb-12 md:mb-16 overflow-x-hidden ${
          className ?? ""
        }`}
      >
        <div className="mx-auto max-w-7xl pl-6 sm:pl-0 pr-4 sm:pr-6 md:pr-8 mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:ml-8">
            <span className="text-neutral-900">{titlePrefix} </span>
            <span className="text-red-600">{titleAccent}</span>
          </h1>
          <div className="mt-4 grid gap-2 text-sm sm:text-base font-semibold tracking-wide text-neutral-700 sm:ml-8">
            {isNonEmpty(line1) && (
              <div className="flex items-center gap-3">
                <span className="h-5 w-1.5 rounded-full bg-red-600" />
                <p className="uppercase">{line1}</p>
              </div>
            )}
            {isNonEmpty(line2) && (
              <div className="flex items-center gap-3">
                <span className="h-5 w-1.5 rounded-full bg-red-600" />
                <p className="uppercase">{line2}</p>
              </div>
            )}
          </div>
        </div>

        <div className="slider-shell">
          {/* IMPORTANT: use settings.key to force re-init when layout changes */}
          {(() => {
            const { key, ...rest } = settings;
            return (
              <Slider key={key} {...rest}>
                {certificates.map((cert, i) => (
                  <div key={i} className="slide">
                    <figure
                      className="card"
                      onClick={() => openModal(i)}
                      role="button"
                      aria-label="Zoom certificate"
                    >
                      <div className="media">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="object-cover"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                      <div className="meta">
                        <h3 className="title">{cert.title}</h3>
                        <p className="desc">{cert.description}</p>
                      </div>
                    </figure>
                  </div>
                ))}
              </Slider>
            );
          })()}
        </div>

        {/* ---------- Lightbox (zoom) ---------- */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick
          style={{
            content: {
              inset: 0,
              background: "transparent",
              border: "none",
              padding: 0,
              overflow: "hidden",
              zIndex: 100,
              display: "block",
            },
            overlay: {
              backgroundColor: "rgba(0,0,0,0.82)",
              backdropFilter: "blur(2px)",
              zIndex: 100,
            },
          }}
        >
          <div className="lb-wrap" role="dialog" aria-modal="true">
            {/* Close */}
            <button
              aria-label="Close"
              className="lb-x"
              onClick={closeModal}
              type="button"
            >
              <span className="lb-x-circle">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="12" fill="#fff" />
                  <path
                    d="M18.3 5.71 12 12l6.3 6.29-1.41 1.41L10.59 13.41 4.29 19.7 2.88 18.29 9.17 12 2.88 5.71 4.29 4.3l6.3 6.29 6.29-6.3 1.42 1.42z"
                    fill="#E3000F"
                  />
                </svg>
              </span>
            </button>

            {/* Prev */}
            <button
              aria-label="Previous image"
              className="lb-side left"
              onClick={goPrev}
              type="button"
            >
              <span className="lb-arrow-circle">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                >
                  <path
                    fill="#E3000F"
                    d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                  />
                </svg>
              </span>
            </button>

            {/* Image */}
            <div className="lb-imageBox">
              <img
                src={modalImage}
                alt=""
                className="lb-img"
                draggable={false}
              />
            </div>

            {/* Next */}
            <button
              aria-label="Next image"
              className="lb-side right"
              onClick={goNext}
              type="button"
            >
              <span className="lb-arrow-circle">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                >
                  <path
                    fill="#E3000F"
                    d="m8.59 16.59 1.41 1.41 6-6-6-6-1.41 1.41L13.17 12z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </Modal>
      </section>
    </>
  );
}

export default CertificateSlider;
