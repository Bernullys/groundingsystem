import { useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "../StylesToAllResistanceCal.module.css"

import groundingGrid from "../../assets/Images/malla_puesta_a_tierra.png"

function Sverak () {

    const[resistivity, setResistivity] = useState()
    const[large, setLarge] = useState()
    const[width, setWidth] = useState()
    const[totalLarge, setTotalLarge] = useState()
    const[depth, setDepth] = useState()
    const[resistance, setResistance] = useState()

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

    const handleDepth = (event) => {
        setDepth(event.target.value)
    }

    const resistanceValue = (event) => {
        event.preventDefault()
        if (resistivity > 0 && large > 0 && width > 0 && totalLarge > 0 && depth > 0) {
            let area = large*width;
            setResistance(Number(((resistivity)*((1/totalLarge)+1/(Math.sqrt(20*area))*(1+1/(1+depth*Math.sqrt(20/area))))).toFixed(2)))
        } else {
            alert("Todos los valores deben ser mayores a cero.")
            setResistance("")
        }
    }

    return (
        <section className={styles.main_container}>
            <section className={styles.title_image_container}>
                <h2 className={styles.title}>Malla de Puesta a Tierra - Sverak</h2>
                <img className={styles.image} src={groundingGrid} alt="Grounding Rod" />
            </section>
            <section className={styles.form_main_container}>
                <form className={styles.form} onSubmit={resistanceValue}>
                    <div className={styles.form_label_inp_container}>
                        <label className={styles.form_label} htmlFor="resistivity">Resistividad [Ohm*m]</label>
                        <input className={styles.form_input} type="number" step="0.01" id="resistivity" value={resistivity} onChange={handleResistivity} />
                    </div>
                    <div className={styles.form_label_inp_container}>
                        <label className={styles.form_label}  htmlFor="large">Largo [m]</label>
                        <input  className={styles.form_input} type="number" step="0.01" id="large" value={large} onChange={handleLarge}/>
                    </div>
                    <div className={styles.form_label_inp_container}>
                        <label className={styles.form_label}  htmlFor="width">Ancho [m]</label>
                        <input  className={styles.form_input} type="number" step="0.01" id="width" value={width} onChange={handleWidth}/>
                    </div>
                    <div className={styles.form_label_inp_container}>
                        <label className={styles.form_label}  htmlFor="totalLarge">Largo total del conductor [m]</label>
                        <input  className={styles.form_input} type="number" step="0.01" id="totalLarge" value={totalLarge} onChange={handleTotalLarge}/>
                    </div>
                    <div className={styles.form_label_inp_container}>
                        <label className={styles.form_label} htmlFor="depth">Profundidad de malla [m]</label>
                        <input className={styles.form_input} type="number" step="0.01" name="depth" id="depth" value={depth} onChange={handleDepth} />
                    </div>
                    <div>
                        <button  className={styles.form_button}  type="submit">Calcular</button>
                    </div>
                </form>
                <h3>La Resistencia de Puesta a Tierra [Ohm]: {resistance}</h3>
                <p type="button" className="back_button">
                    <NavLink to="/grounding_resistance_page">
                        Atras
                    </NavLink>
                </p>
            </section>
        </section>
    )
}

export default Sverak