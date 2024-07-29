import { useState } from "react"
import styles from "./SuperficalPlate.module.css"

import grounding_plate_image from "../../assets/Images/placa_puesta_a_tierra_2.png"

function SuperficialPlate () {

    const [resistivity, setResistivity] = useState()
    const [large, setLarge] = useState()
    const [width, setWidth] = useState()
    const [resistance, setResistance] = useState()

    const handleResistivity = (event) => {
        setResistivity(event.target.value)
    }

    const handleLarge = (event) => {
        setLarge(event.target.value)
    }

    const handleWidth = (event) => {
        setWidth(event.target.value)
    }

    const resistanceValue = (event) => {
        event.preventDefault()
        setResistance(1.6*resistivity/(large*width))
    }

    return (
        <section className={styles.superficial_plates_main_container}>
            <section className={styles.grounding_plate_title_image}>
                <h2 className={styles.grounding_plate_title}>Placa de Puesta a Tierra Superficial</h2>
                <img className={styles.grounding_plate_image} src={grounding_plate_image} alt="Placa de puesta a tierra" />
            </section>
            <section className={styles.superficial_plates_form_main_container}>
                <form className={styles.superficial_plates_form} onSubmit={resistanceValue}>
                    <div className={styles.superficial_plates_form_label_inp_container}>
                        <label className={styles.superficial_plates_form_label}htmlFor="">Resistividad</label>
                        <input className={styles.superficial_plates_form_inp} id="resistivity_id" type="number" value={resistivity} onChange={handleResistivity}/>
                    </div>
                    <div className={styles.superficial_plates_form_label_inp_container}>
                        <label className={styles.superficial_plates_form_label} htmlFor="">Largo</label>
                        <input className={styles.superficial_plates_form_inp} id="large_id" type="number" value={large} onChange={handleLarge}/>
                    </div>
                    <div className={styles.superficial_plates_form_label_inp_container} className={styles.superficial_plates_form_label_inp_container}>
                        <label className={styles.superficial_plates_form_label} htmlFor="">Ancho</label>
                        <input className={styles.superficial_plates_form_inp} id="width_id" type="number" value={width} onChange={handleWidth}/>
                    </div>                    <div>
                        <button className={styles.superficial_plates_form_button} type="submit">Calcular</button>
                    </div>
                    <p className={styles.superficial_plates_result_paragraph}>Resistencia de Puesta a Tierra: {resistance}</p>
                </form>
            </section>

        </section>
    )
}

export default SuperficialPlate