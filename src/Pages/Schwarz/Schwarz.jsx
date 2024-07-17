import { useState } from "react"
import styles from "./Schwarz.module.css"

import groundingGrid from "../../assets/Images/malla_puesta_a_tierra.png"

function Schwarz () {

    const piValue = Math.PI
    

    const[resistivity, setResistivity] = useState()
    const[largerSide, setLargerSide] = useState()
    const[shorterSide, setShorterSide] = useState()
    const[totalLarge, setTotalLarge] = useState()
    const[depth, setDepth] = useState()
    const[conductorDiameter, setConductorDiameter] = useState()
    const[gridResistance, setGridResistance] = useState()

    const handleResistivity = (event) => {
        setResistivity(event.target.value)
    }

    const handleLargerSide = (event) => {
        setLargerSide(event.target.value)
    }

    const handleShorterSide = (event) => {
        setShorterSide(event.target.value)
    }

    const handleTotalLarge = (event) => {
        setTotalLarge(event.target.value)
    }

    const handleDepth = (event) => {
        setDepth(event.target.value)
    }

    const handleConductorDiameter = (event) => {
        setConductorDiameter(event.target.value)
    }

    const area = largerSide*shorterSide;
    const sqRootArea = Math.sqrt(area)
    const toCoeficientB = sqRootArea/10
    const toCoeficientC = sqRootArea/6

    let kOne;
    let kTwo;
    
    if (depth == 0) {
        kOne = (-0.04)*(largerSide/shorterSide) + 1.41;
        kTwo = (0.15)*(largerSide/shorterSide) + 5.5;
    } else if (depth == toCoeficientB ) {
        kOne = (-0.05)*(largerSide/shorterSide) + 1.20;
        kTwo = (0.10)*(largerSide/shorterSide) + 4.68;
    } else if (depth == toCoeficientC) {
        kOne = (-0.05)*(largerSide/shorterSide) + 1.13;
        kTwo = (-0.05)*(largerSide/shorterSide) + 4.4;
    } else {
        kOne = (1.43 - (depth/sqRootArea) - 0.044*(largerSide/shorterSide))
        kTwo = (5.5 - (8*depth/sqRootArea) + (0.15 - depth/sqRootArea) * largerSide/shorterSide)
    }

    console.log(kOne, kTwo)
    
    const gridResistanceValue = (event) => {
        event.preventDefault()
        if (resistivity > 0 && largerSide > 0) {
            setGridResistance(((resistivity/(piValue*totalLarge)*(Math.log(2*totalLarge/(Math.sqrt(conductorDiameter*depth)))+kOne*(totalLarge/Math.sqrt(area))-kTwo))).toFixed(2))
        } else {
            setGridResistance("Los valores deben ser mayores a cero")
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
                    <h3 className={styles.cshwarz_subtitle}>Resistencia de los conductores de la malla</h3>
                    <form className={styles.schwarz_form_container} onSubmit={gridResistanceValue}>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label} htmlFor="resistivity">Resistividad [Ohm*m]</label>
                            <input className={styles.schwarz_form_inp} type="number" id="resistivity" value={resistivity} onChange={handleResistivity} />
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="larger_side">Lado mayor [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="larger_side" value={largerSide} onChange={handleLargerSide}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="shorter_side">Lado menor [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="shorter_side" value={shorterSide} onChange={handleShorterSide}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="totalLarge">Largo total del conductor [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="totalLarge" value={totalLarge} onChange={handleTotalLarge}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label} htmlFor="depth">Profundidad de malla [m]</label>
                            <input className={styles.schwarz_form_inp} type="number" step="0.01" name="depth" id="depth" value={depth} onChange={handleDepth} />
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label} htmlFor="conductor_diameter">Diametro del conductor [m]</label>
                            <input className={styles.schwarz_form_inp} type="number" step="0.001" name="conductor_diameter" id="conductor_diameter" value={conductorDiameter} onChange={handleConductorDiameter} />
                        </div>
                        <div>
                            <button  className={styles.schwarz_form_button}  type="submit">Calcular</button>
                        </div>
                    </form>
                    <p className={styles.schwarz_result_paragraph}>La Resistencia de los conductores de la malla es: {gridResistance}  [Ohmios]</p>
                </section>
                {/* <section className={styles.schwarz_form_second_container}>
                    <h3 className={styles.cshwarz_subtitle}>Resistencia de las barras de la malla</h3>
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
                        <div>
                            <button  className={styles.schwarz_form_button}  type="submit">Calcular</button>
                        </div>
                    </form>
                    <p className={styles.schwarz_result_paragraph}>La Resistencia de los conductores de la malla es: {} [Ohmios]</p>
                </section>
                <section className={styles.schwarz_form_second_container}>
                    <h3 className={styles.cshwarz_subtitle}>Resistencia mutua de la malla</h3>
                    <form className={styles.schwarz_form_container} onSubmit={resistanceValue}>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label} htmlFor="resistivity">Resistividad [Ohm*m]</label>
                            <input className={styles.schwarz_form_inp} type="number" id="resistivity" value={resistivity} onChange={handleResistivity} />
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="large">Lado mayor [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="large" value={large} onChange={handleLarge}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="width">Lado menor [m]</label>
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
                        <div>
                            <button  className={styles.schwarz_form_button}  type="submit">Calcular</button>
                        </div>
                    </form>
                    <p className={styles.schwarz_result_paragraph}>La Resistencia de los conductores de la malla es: {} [Ohmios]</p>
                </section> */}
            </section>
        </section>
    )
}

export default Schwarz