"use client";
import { useState } from "react";
import styles from "./styles.module.scss";

//Components
import TitleSection from "@/shared/components/TitleSection";
import ButtonAnchor from "@/shared/components/ButtonAnchor";
import MotionController from "@/shared/components/MotionController";

//Icons
import { IoIosMail } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { IoMdRadioButtonOff } from "react-icons/io";
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
// import { FaFacebookSquare } from "react-icons/fa";
// import { FaSquareXTwitter } from "react-icons/fa6";
// import { FaYoutube } from "react-icons/fa";

export default function Contatos() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");

  function handleSetService(target) {
    setService(target);
  }

  const disabled = !name || !email || !message || !service;

  return (
    <section id="contacts-page" className={styles.section}>
      <TitleSection
        title="CONTATOS"
        subtitle="Entre em contato e solicite
um orçamento sem compromisso"
      />

      <div className={styles.content}>
        <MotionController className={styles.formWrapper}>
          <h3 className={styles.textOrcamento}>
            Faça seu orçamento sem compromisso
          </h3>
          <div className={styles.inputWrapper}>
            <label htmlFor="name" className={styles.label}>
              Nome
            </label>
            <input
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="message" className={styles.label}>
              Mensagem
            </label>
            <textarea
              id="message"
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "10px" }} />

          <label className={styles.label}>
            Que tipo de serviço você tem interesse?
          </label>
          <div className={styles.serviceChosen}>
            <div
              id="development"
              className={`${styles.option} ${
                service === "development" ? styles.optionSelected : ""
              } `}
              onClick={(e) => {
                if (e.currentTarget.id === service) {
                  handleSetService("");
                } else {
                  handleSetService(e.currentTarget.id);
                }
              }}
            >
              {service === "development" ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}

              <h4>Desenvolvimento de sistemas</h4>
            </div>

            <div
              id="marketing"
              className={`${styles.option} ${
                service === "marketing" ? styles.optionSelected : ""
              } `}
              onClick={(e) => {
                if (e.currentTarget.id === service) {
                  handleSetService("");
                } else {
                  handleSetService(e.currentTarget.id);
                }
              }}
            >
              {service === "marketing" ? (
                <IoMdRadioButtonOn />
              ) : (
                <IoMdRadioButtonOff />
              )}

              <h4>Marketing digital</h4>
            </div>
          </div>

          <div style={{ marginTop: "20px" }} />
          <ButtonAnchor
            label="Enviar mensagem"
            icon={<IoIosSend />}
            pathUrl={`https://wa.me/5586994665680?text=${encodeURIComponent(
              `Olá, PRÓDOS DIGITAL! tudo bem?\n\nMeu nome é: ${name}\nMeu e-mail é: ${email}\nTive interesse sobre o tipo de serviço: ${
                service === "development"
                  ? "Desenvolvimento"
                  : "Marketing digital"
              }\n\nMensagem: ${message}`
            )}`}
            disabled={disabled}
          />
        </MotionController>

        <div className={styles.cardsWrapper}>
          <MotionController delay={0.2} className={styles.card}>
            <IoIosMail />
            <div className={styles.text}>
              <h3>E-mail</h3>
              <a>agencia.prodosdigital@gmail.com</a>
            </div>
          </MotionController>

          <MotionController delay={0.4} className={styles.card}>
            <FaWhatsapp />
            <div className={styles.text}>
              <h3>Whatsapp</h3>
              <a
                className={styles.link}
                href="https://wa.me/5586994665680"
                target="_blank"
              >
                (86) 99466-5680
              </a>
            </div>
          </MotionController>

          <MotionController delay={0.6} className={styles.card}>
            <IoLocationSharp />
            <div className={styles.text}>
              <h3>Endereço</h3>
              <a
                href="https://maps.app.goo.gl/kSBdUyAjh8a7LPwW9"
                target="_blank"
                className={styles.link}
              >
                R. Mato Grosso, 720 - Sala 101 - Torre 02 - Porenquanto,
                Teresina - PI
              </a>
            </div>
          </MotionController>

          <MotionController delay={0.8} className={styles.card}>
            <HiMiniDevicePhoneMobile />
            <div className={styles.text}>
              <h3>Redes sociais</h3>
              <div className={styles.socialIcons}>
                <a
                  href="https://www.instagram.com/prodos.digital/"
                  target="_blank"
                  className={styles.link}
                >
                  <FaInstagram />
                </a>
                <FaLinkedin />
                {/* <FaFacebookSquare />
                <FaSquareXTwitter />
                <FaYoutube /> */}
              </div>
            </div>
          </MotionController>
        </div>
      </div>
    </section>
  );
}
