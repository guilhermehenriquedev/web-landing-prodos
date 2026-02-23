"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import styles from "./styles.module.scss";

//Components
import TitleSection from "@/shared/components/TitleSection";
import MotionController from "@/shared/components/MotionController";

//Icons
import { FaQuoteLeft } from "react-icons/fa";
import { GoStarFill, GoStar } from "react-icons/go";

//Constants
import { TESTIMONIALS } from "@/shared/constants";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Card({ testimonial }) {
  const { name, text, rating, image } = testimonial;
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <div className={styles.card}>
      <div className={styles.quote}>
        <FaQuoteLeft />
        <p>{text}</p>
      </div>
      <div className={styles.clientInfoWrapper}>
        <div className={styles.userInfo}>
          <div className={styles.image}>
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                quality={100}
                style={{ objectFit: "cover" }}
              />
            ) : (
              <span className={styles.initials}>{getInitials(name)}</span>
            )}
          </div>
          <div className={styles.user}>
            <h4>{name}</h4>
          </div>
        </div>
        <div className={styles.stats}>
          {stars.map((filled, i) =>
            filled ? (
              <GoStarFill key={i} className={styles.starFilled} />
            ) : (
              <GoStar key={i} className={styles.starEmpty} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <>
      <section className={styles.section} id="testimonials-page">
        <TitleSection
          title="AVALIAÇÕES DOS CLIENTES"
          subtitle="O que nossos clientes dizem sobre nossos sistemas e automações"
        />
      </section>
      <MotionController className={styles.containerCarouselClients}>
        <Marquee autoFill loop={0} speed={40} gradient={false}>
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>
      </MotionController>
    </>
  );
}
