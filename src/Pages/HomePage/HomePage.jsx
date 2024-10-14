import styles from "./HomePage.module.css"

import logo_EE from "../../assets/Images/Logo-EE.jpg"

function HomePage() {
    return (
        <section className={styles.homePage_main_container}>
            <section className={styles.homePage_container}>
                <section className={styles.homePage_title_container}>
                    <h1 className={styles.homePage_title}>Sistemas de Puesta a Tierra</h1>
                </section>
                <section className={styles.homPage_features_main_container}>
                    <ul>
                        <li>
                            <a href="#grounding_resistance_page">Resistencia de Puesta a Tierra
                            </a>
                        </li>
                        <li>
                            <a href="#step_contact_voltage_page">Tensiones de Paso y de Contacto</a>
                        </li>
                    </ul>
                </section>
                <section className={styles.image_main_container}>
                    <a href="https://www.instelecsa.cl/" target="_blank">
                        <img className={styles.ee_image} src={logo_EE} alt="Logo Eficiencia Energetica" />
                    </a>
                </section>
                <footer className={styles.homePage_footer}>
                    <p>Propuestas de mejoras a:</p>
                    <p>b.davila@instelecsa.cl</p>
                    <p>+56 995433938</p>
                </footer>
            </section>
        </section>
    )
}

export default HomePage