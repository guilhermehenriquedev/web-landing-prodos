"use client";
import { useState, useEffect, useRef } from "react";
import styles from "@/shared/components/LayoutClientSide/Layout.module.scss";

//Components
import LogoHeader from "@/shared/components/LogoHeader";
import MotionController from "@/shared/components/MotionController";

//Icons
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const SCROLL_TOP_THRESHOLD = 80;
const SCROLL_HIDE_THRESHOLD = 10;

export default function LayoutClientSide({ children }) {
  const [section, setSection] = useState("home-section");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY <= SCROLL_TOP_THRESHOLD) {
        setIsHeaderVisible(true);
        setHasScrolled(scrollY > 45);
      } else {
        const delta = scrollY - lastScrollY.current;
        if (delta > SCROLL_HIDE_THRESHOLD) {
          setIsHeaderVisible(false);
        } else if (delta < -SCROLL_HIDE_THRESHOLD) {
          setIsHeaderVisible(true);
        }
        setHasScrolled(true);
      }
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  function setSectionNavbar(target) {
    setSection(target);
  }

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <main className={styles.containerPage} id="home-page">
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <div
        className={`${styles.headerContainer} ${
          !isHeaderVisible ? styles.headerHidden : ""
        }`}
      >
        <div
          className={`${styles.headerContacts} ${
            hasScrolled ? styles.hidden : ""
          }`}
        >
          <div className={styles.contentContacts}>
            <MotionController className={styles.socialIcons}>
              <a
                href="https://www.instagram.com/prodos.digital/"
                target="_blank"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.linkedin.com/company/prodosdigital/posts/?feedView=all&viewAsMember=true"
                target="_blank"
              >
                <FaLinkedin />
              </a>
            </MotionController>

            <MotionController className={styles.contacts}>
              <div className={styles.phone}>
                <FaPhoneAlt />
                <a href="https://wa.me/5586994665680" target="_blank">
                  (86) 99466-5680
                </a>
              </div>

              <div className={styles.email}>
                <IoMdMail />
                <span>agencia.prodosdigital@gmail.com</span>
              </div>
            </MotionController>
          </div>
        </div>

        <header
          className={`${styles.header} ${hasScrolled ? styles.bgHeader : ""}`}
        >
          <div className={styles.headerContent}>
            <LogoHeader />

            <nav className={styles.nav}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <MotionController delay={0.1}>
                    <a
                      id="home-section"
                      onClick={(e) => setSectionNavbar(e.target.id)}
                      href="#home-page"
                      className={`${styles.navLink} ${
                        section === "home-section" ? styles.active : ""
                      }`}
                    >
                      HOME
                    </a>
                  </MotionController>
                </li>
                <li className={styles.navItem}>
                  <MotionController delay={0.2}>
                    <a
                      href="#services-page"
                      className={`${styles.navLink} ${
                        section === "services-section" ? styles.active : ""
                      }`}
                      id="services-section"
                      onClick={(e) => setSectionNavbar(e.target.id)}
                    >
                      SERVIÇOS
                    </a>{" "}
                  </MotionController>
                </li>
                <li className={styles.navItem}>
                  <MotionController delay={0.3}>
                    <a
                      href="#about-page"
                      className={`${styles.navLink} ${
                        section === "about-section" ? styles.active : ""
                      }`}
                      id="about-section"
                      onClick={(e) => setSectionNavbar(e.target.id)}
                    >
                      QUEM SOMOS
                    </a>
                  </MotionController>
                </li>
                <li className={styles.navItem}>
                  <MotionController delay={0.4}>
                    <a
                      href="#contacts-page"
                      className={`${styles.navLink} ${
                        section === "contacts-section" ? styles.active : ""
                      }`}
                      id="contacts-section"
                      onClick={(e) => setSectionNavbar(e.target.id)}
                    >
                      CONTATO
                    </a>
                  </MotionController>
                </li>

                <li className={styles.navItemButtonContact}>
                  <MotionController delay={0.5}>
                    <a
                      className={styles.linkButton}
                      href="https://cliente.prodosdigital.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ÁREA DO CLIENTE
                    </a>
                  </MotionController>
                </li>
              </ul>
            </nav>

            <MotionController
              className={styles.burguerMenuButton}
              onClick={toggleMenu}
            >
              <IoMenu />
            </MotionController>
          </div>
        </header>

        <div
          className={`${styles.drawer} ${isMenuOpen ? styles.drawerOpen : ""}`}
        >
          <div className={styles.closeButton}>
            <button className={styles.closeButton} onClick={toggleMenu}>
              <IoClose />
            </button>
          </div>

          <nav className={styles.drawerNav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <a
                  id="home-section"
                  onClick={(e) => {
                    setSectionNavbar(e.target.id);
                    toggleMenu();
                  }}
                  href="#home-page"
                  className={styles.navLink}
                >
                  HOME
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="#services-page"
                  className={styles.navLink}
                  id="services-section"
                  onClick={(e) => {
                    setSectionNavbar(e.target.id);
                    toggleMenu();
                  }}
                >
                  SERVIÇOS
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="#about-page"
                  className={styles.navLink}
                  id="about-section"
                  onClick={(e) => {
                    setSectionNavbar(e.target.id);
                    toggleMenu();
                  }}
                >
                  QUEM SOMOS
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="#contacts-page"
                  className={styles.navLink}
                  id="contacts-section"
                  onClick={(e) => {
                    setSectionNavbar(e.target.id);
                    toggleMenu();
                  }}
                >
                  CONTATO
                </a>
              </li>

              <li className={styles.navItemButtonContact}>
                <a
                  href="https://cliente.prodosdigital.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                  onClick={() => toggleMenu()}
                >
                  ÁREA DO CLIENTE
                </a>
              </li>

              {/* <li className={styles.navItem}>
                <a
                  href="#portfolio-page"
                  className={styles.navLink}
                  id="portfolio-section"
                  onClick={(e) => {
                    setSectionNavbar(e.target.id);
                    toggleMenu();
                  }}
                >
                  PORTFÓLIO
                </a>
              </li> */}

              {/* <li className={styles.navItem}>
                <a
                  href="#testimonials-page"
                  className={styles.navLink}
                  id="testimonials-section"
                  onClick={(e) => {
                    setSectionNavbar(e.target.id);
                    toggleMenu();
                  }}
                >
                  TESTEMUNHOS
                </a>
              </li> */}

              <li className={styles.navItem}>
                <a
                  href="#faq-page"
                  className={styles.navLink}
                  id="faq-section"
                  onClick={(e) => {
                    setSectionNavbar(e.target.id);
                    toggleMenu();
                  }}
                >
                  PERGUNTAS FREQUENTES (FAQ)
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {children}
    </main>
  );
}
