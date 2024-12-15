"use client";
import Image from "next/image";
import Link from "next/link";

import styles from "@/shared/components/Footer/styles.module.scss";

//Icons
import { IoIosArrowUp } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
// import { FaFacebookSquare } from "react-icons/fa";
// import { FaSquareXTwitter } from "react-icons/fa6";
// import { FaYoutube } from "react-icons/fa";

//Components
import MotionController from "@/shared/components/MotionController";

export default function Footer() {
  function goToTop() {
    const scrollElement =
      document.documentElement.scrollTop > 0
        ? document.documentElement
        : document.body;

    scrollElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className={styles.footerContainer}>
      <div className={styles.containerNavs}>
        <div className={styles.navWrapper}>
          <div className={styles.grid}>
            <MotionController className={styles.nav}>
              <div className={styles.imgWrapper}>
                <Image
                  src="/img/logo.png"
                  alt="Logo da Pródos digital"
                  width={200}
                  height={200}
                  quality={100}
                />

                <div className={styles.prodos}>
                  <h4>PRÓDOS DIGITAL</h4>
                  <span>
                    <strong>CNPJ: 58.240.969.0001/10</strong>
                  </span>
                  <span>agencia.prodosdigital@gmail.com</span>
                  <a
                    href="https://maps.app.goo.gl/kSBdUyAjh8a7LPwW9"
                    target="_blank"
                    className={styles.link}
                  >
                    R. Mato Grosso, 720 - Sala 101 - Torre 02 - Porenquanto,
                    Teresina - PI, 64000-710
                  </a>
                  <a
                    href="https://wa.me/5586994665680"
                    target="_blank"
                    className={styles.link}
                  >
                    (86) 99466-5680
                  </a>

                  <div className={styles.socialIcons}>
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
                  </div>
                </div>
              </div>
            </MotionController>

            <MotionController className={styles.nav}>
              <h4>NAVEGAÇÃO</h4>
              <ul className={styles.navList}>
                <Link href="#home-page">
                  <li className={styles.navItem}>Home</li>
                </Link>
                <Link href="#services-page">
                  <li className={styles.navItem}>Serviços</li>
                </Link>
                <Link href="#about-page">
                  <li className={styles.navItem}>Quem somos</li>
                </Link>
                <Link href="#clients-page">
                  <li className={styles.navItem}>Clientes</li>
                </Link>
                <Link href="#contacts-page">
                  <li className={styles.navItem}>Contatos</li>
                </Link>
                <Link href="#home-page">
                  <li className={styles.navItem}>Home</li>
                </Link>
                {/* <Link href="#portfolio-page">
                  <li className={styles.navItem}>Portfólio</li>
                </Link> */}
                {/* <Link href="#testimonials-page">
                  <li className={styles.navItem}>Testemunhos</li>
                </Link> */}
                <Link href="#faq-page">
                  <li className={styles.navItem}>Perguntas frequentes</li>
                </Link>
              </ul>
            </MotionController>

            <MotionController className={styles.nav}>
              <h4>INSTITUCIONAL</h4>
              <ul className={styles.navList}>
                <Link href="/politicas">
                  <li className={styles.navItem}>Políticas</li>
                </Link>
              </ul>
            </MotionController>
          </div>
        </div>
      </div>

      <div className={styles.divider} />
      <div className={styles.containerCopyright}>
        <span>
          2024. <strong>PRÓDOS DIGITAL</strong>. Todos os direitos reservados.
        </span>
        <button className={styles.upButton} onClick={goToTop}>
          <IoIosArrowUp />
        </button>
      </div>
    </div>
  );
}
