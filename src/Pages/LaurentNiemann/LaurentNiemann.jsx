import { useState } from "react"
import styles from "./LaurentNiemann.module.css"

import groundingGrid from "../../assets/Images/malla_puesta_a_tierra.png"

function LaurentNiemann () {

    const piValue = Math.PI

    const[resistivity, setResistivity] = useState()
    const[large, setLarge] = useState()
    const[width, setWidth] = useState()
    const[resistance, setResistance] = useState()
    const[totalLarge, setTotalLarge] = useState()

    const handleResistivity = (event) => {
        setResistivity(event.target.value)
    }

    const handleLarge = (event) => {
        setLarge(event.target.value)
    }

    const handleWidth = (event) => {
        setWidth(event.target.value)
    }

    const handleTotalLarge = (event) => {
        setTotalLarge(event.target.value)
    }

    const resistanceValue = (event) => {
        event.preventDefault()
        if (resistivity > 0 && large > 0) {
            let area = large*width;
            let equivalentRadio = piValue/area;
            setResistance(((resistivity/4)*(Math.sqrt(equivalentRadio))+(resistivity/totalLarge)).toFixed(2))
        } else {
            setResistance("Los valores deben ser mayores a cero")
        }
    }

    return (
        <section className={styles.lau_nie_main_container}>
            <section className={styles.lau_nie_title_image}>
                <h2 className={styles.lau_nie_title}>Malla de Puesta a Tierra - Laurent y Niemann</h2>
                <img className={styles.lau_nie_image} src={groundingGrid} alt="Grounding Rod" />
            </section>
            <section className={styles.lau_nie_form_main_container}>
                <form className={styles.lau_nie_form_container} onSubmit={resistanceValue}>
                    <div className={styles.lau_nie_form_label_inp_container}>
                        <label className={styles.lau_nie_form_label} htmlFor="resistivity">Resistividad [Ohm*m]</label>
                        <input className={styles.lau_nie_form_inp} type="number" id="resistivity" value={resistivity} onChange={handleResistivity} />
                    </div>
                    <div className={styles.lau_nie_form_label_inp_container}>
                        <label className={styles.lau_nie_form_label}  htmlFor="large">Largo [m]</label>
                        <input  className={styles.lau_nie_form_inp}type="number" id="large" value={large} onChange={handleLarge}/>
                    </div>
                    <div className={styles.lau_nie_form_label_inp_container}>
                        <label className={styles.lau_nie_form_label}  htmlFor="width">Ancho [m]</label>
                        <input  className={styles.lau_nie_form_inp}type="number" id="width" value={width} onChange={handleWidth}/>
                    </div>
                    <div className={styles.lau_nie_form_label_inp_container}>
                        <label className={styles.lau_nie_form_label}  htmlFor="totalLarge">Largo total del conductor [m]</label>
                        <input  className={styles.lau_nie_form_inp}type="number" id="totalLarge" value={totalLarge} onChange={handleTotalLarge}/>
                    </div>
                    <div>
                        <button  className={styles.lau_nie_form_button}  type="submit">Calcular</button>
                    </div>
                </form>
                <p  className={styles.lau_nie_result_paragraph} >La Resistencia de Puesta a Tierra es: {resistance} [Ohmios]</p>
            </section>
        </section>
    )
}

export default LaurentNiemann