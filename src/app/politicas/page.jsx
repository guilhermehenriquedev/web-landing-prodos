"use client";
import Link from "next/link";

import styles from "./styles.module.scss";

//Components
import TitleSection from "@/shared/components/TitleSection";
import MotionController from "@/shared/components/MotionController";

//Icons
import { TiArrowBack } from "react-icons/ti";

export default function Politicas() {
  return (
    <div className={styles.section}>
      <TitleSection
        title="POLÍTICAS"
        subtitle="Entenda como protegemos seus dados e garantimos a sua segurança"
      />

      <MotionController className={styles.containerButton}>
        <Link href="/" className={styles.buttonBack}>
          VOLTAR <TiArrowBack />
        </Link>
      </MotionController>

      <MotionController className={styles.content}>
        <h3>Política de Privacidade - PRÓDOS DIGITAL</h3>
        <p>
          Na PRÓDOS DIGITAL, levamos a privacidade dos nossos usuários a sério.
          Este documento descreve como coletamos, usamos, armazenamos e
          protegemos suas informações pessoais, garantindo a transparência e a
          segurança em todas as interações.
        </p>

        <p className={styles.bold}>1. Informações Coletadas</p>

        <p>
          Coletamos informações fornecidas voluntariamente pelos usuários, como:
        </p>

        <ul>
          <li>
            <p>
              Nome, e-mail, telefone e outras informações inseridas em
              formulários de contato.
            </p>
          </li>
          <li>
            <p>
              Dados de navegação, como endereço IP, tipo de navegador e páginas
              acessadas, para fins de melhoria contínua do site.
            </p>
          </li>
        </ul>

        <p className={styles.bold}>2. Uso das Informações</p>
        <ul>
          <li>
            <p>Responder a solicitações de contato e dúvidas.</p>
          </li>
          <li>
            <p>Personalizar a experiência do usuário no site.</p>
          </li>
          <li>
            <p>
              Enviar comunicações sobre nossos serviços, caso você tenha
              autorizado
            </p>
          </li>
          <li>
            <p>Melhorar nossos serviços e oferecer conteúdos mais relevantes</p>
          </li>
        </ul>

        <p className={styles.bold}>3. Compartilhamento de Informações</p>

        <p>
          Não compartilhamos suas informações pessoais com terceiros, exceto:
        </p>
        <ul>
          <li>
            <p>Quando exigido por lei ou por autoridades competentes.</p>
          </li>
          <li>
            <p>
              Para fornecedores confiáveis que auxiliam na operação do site e de
              nossos serviços, sob rigorosos termos de confidencialidade.
            </p>
          </li>
        </ul>

        <p className={styles.bold}>4. Segurança dos Dados</p>

        <p>
          Adotamos medidas técnicas e organizacionais para proteger suas
          informações contra acesso não autorizado, uso indevido ou divulgação.
          No entanto, nenhum sistema é completamente seguro, e incentivamos o
          uso responsável da internet.
        </p>

        <p className={styles.bold}>5. Cookies</p>
        <p>
          Utilizamos cookies para melhorar a funcionalidade do site e analisar o
          comportamento dos usuários. Você pode configurar seu navegador para
          bloquear cookies, mas algumas funcionalidades podem ser afetadas.|
        </p>

        <p className={styles.bold}>6. Direitos dos Usuários</p>
        <p>Você tem o direito de:</p>
        <ul>
          <li>
            <p>Acessar suas informações pessoais armazenadas por nós.</p>
          </li>
          <li>
            <p>Solicitar a correção ou exclusão de seus dados.</p>
          </li>
          <li>
            <p>
              Retirar o consentimento para o uso de informações pessoais, quando
              aplicável.
            </p>
          </li>
        </ul>

        <p className={styles.bold}>7. Alterações na Política</p>
        <p>
          Esta Política de Privacidade pode ser atualizada periodicamente.
          Recomendamos que você a consulte regularmente para estar ciente de
          eventuais mudanças.
        </p>

        <p className={styles.bold}>8. Contatos</p>
        <p>
          Se tiver dúvidas ou solicitações relacionadas à privacidade dos seus
          dados, entre em contato conosco:
        </p>
        <ul>
          <li>
            <p>E-mail: agencia.prodosdigital@gmail.com</p>
          </li>
          <li>
            <p>Telefone: (86) 99466-5680</p>
          </li>
        </ul>
      </MotionController>
    </div>
  );
}
