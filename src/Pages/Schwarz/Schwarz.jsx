import { useState } from "react"
import styles from "./Schwarz.module.css"

import groundingGrid from "../../assets/Images/malla_puesta_a_tierra.png"

function Schwarz () {

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
        if (resistivity > 0 && large > 0) {
            let area = large*width;
            setResistance(((resistivity)*((1/totalLarge)+1/(Math.sqrt(20*area))*(1+1/(1+depth*Math.sqrt(20/area))))).toFixed(2))
        } else {
            setResistance("Los valores deben ser mayores a cero")
        }
    }

    return (
        <section className={styles.schwarz_main_container}>
            <section className={styles.schwarz_title_image}>
                <h2 className={styles.schwarz_title}>Malla de Puesta a Tierra - Schwarz</h2>
                <img className={styles.schwarz_image} src={groundingGrid} alt="Grounding Rod" />
            </section>
            <section className={styles.schwarz_form_main_container}>
                <section className={styles.schwarz_form_second_container}>
                    <form className={styles.schwarz_form_container} onSubmit={resistanceValue}>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label} htmlFor="resistivity">Resistividad [Ohm*m]</label>
                            <input className={styles.schwarz_form_inp} type="number" id="resistivity" value={resistivity} onChange={handleResistivity} />
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="large">Largo [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="large" value={large} onChange={handleLarge}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="width">Ancho [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="width" value={width} onChange={handleWidth}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="totalLarge">Largo total del conductor [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="totalLarge" value={totalLarge} onChange={handleTotalLarge}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label} htmlFor="depth">Profundidad de malla [m]</label>
                            <input className={styles.schwarz_form_inp} type="number" step="0.01" name="depth" id="depth" value={depth} onChange={handleDepth} />
                        </div>
                    </form>
                        <div>
                            <button  className={styles.schwarz_form_button}  type="submit">Calcular</button>
                        </div>
                </section>
                <section>
                    <form className={styles.schwarz_form_container} onSubmit={resistanceValue}>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label} htmlFor="resistivity">Resistividad [Ohm*m]</label>
                            <input className={styles.schwarz_form_inp} type="number" id="resistivity" value={resistivity} onChange={handleResistivity} />
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="large">Largo [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="large" value={large} onChange={handleLarge}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="width">Ancho [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="width" value={width} onChange={handleWidth}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="totalLarge">Largo total del conductor [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="totalLarge" value={totalLarge} onChange={handleTotalLarge}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label} htmlFor="depth">Profundidad de malla [m]</label>
                            <input className={styles.schwarz_form_inp} type="number" step="0.01" name="depth" id="depth" value={depth} onChange={handleDepth} />
                        </div>
                    </form>
                        <div>
                            <button  className={styles.schwarz_form_button}  type="submit">Calcular</button>
                        </div>
                </section>
                <section>
                    <form className={styles.schwarz_form_container} onSubmit={resistanceValue}>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label} htmlFor="resistivity">Resistividad [Ohm*m]</label>
                            <input className={styles.schwarz_form_inp} type="number" id="resistivity" value={resistivity} onChange={handleResistivity} />
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="large">Largo [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="large" value={large} onChange={handleLarge}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="width">Ancho [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="width" value={width} onChange={handleWidth}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="totalLarge">Largo total del conductor [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="totalLarge" value={totalLarge} onChange={handleTotalLarge}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label} htmlFor="depth">Profundidad de malla [m]</label>
                            <input className={styles.schwarz_form_inp} type="number" step="0.01" name="depth" id="depth" value={depth} onChange={handleDepth} />
                        </div>
                    </form>
                        <div>
                            <button  className={styles.schwarz_form_button}  type="submit">Calcular</button>
                        </div>
                </section>
                <p  className={styles.schwarz_result_paragraph} >La Resistencia de Puesta a Tierra es: {resistance} [Ohmios]</p>
            </section>
        </section>
    )
}

export default Schwarz