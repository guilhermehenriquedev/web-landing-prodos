"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import styles from "./styles.module.scss";

//Components
import TitleSection from "@/shared/components/TitleSection";
import MotionController from "@/shared/components/MotionController";

//Icons
import { FaQuoteLeft } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.quote}>
        <FaQuoteLeft />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown
        </p>
      </div>
      <div className={styles.clientInfoWrapper}>
        <div className={styles.userInfo}>
          <div className={styles.image}>
            <Image
              src="/img/user-fake.jpg"
              alt="Imagem do cliente"
              fill
              quality={100}
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className={styles.user}>
            <h4>Nome do cliente</h4>
            <span>Título do cliente</span>
          </div>
        </div>
        <div className={styles.stats}>
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
          <GoStar />
        </div>
      </div>
    </div>
  );
};

export default function Testimonials() {
  return (
    <>
      <section className={styles.section} id="testimonials-page">
        <TitleSection
          title="TESTEMUNHOS"
          subtitle="O que nossos clientes tem a dizer sobre nosso trabalho"
        />
      </section>
      <MotionController className={styles.containerCarouselClients}>
        <Marquee
          autoFill
          loop={0}
          speed={45}
          gradient={false}
          // gradientColor={"#0f0f0f"}
        >
          {[1, 2, 3, 4, 5, 6].map((card, index) => (
            <Card key={index} />
          ))}
        </Marquee>
      </MotionController>
    </>
  );
}
