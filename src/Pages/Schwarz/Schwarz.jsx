import { useState } from "react"
import styles from "./Schwarz.module.css"

import groundingGrid from "../../assets/Images/malla_puesta_a_tierra.png"

function Schwarz () {
    
    const piValue = Math.PI
    
    // grid conductors variables //
    const [resistivity, setResistivity] = useState(0)
    const [largerSide, setLargerSide] = useState(0)
    const [shorterSide, setShorterSide] = useState(0)
    const [totalLarge, setTotalLarge] = useState(0)
    const [depth, setDepth] = useState(0)
    const [conductorDiameter, setConductorDiameter] = useState(0)
    const [gridResistance, setGridResistance] = useState(0)
    
    // rod variables //
    const [numberRods, setNumberRods] = useState(0)
    const [rodLong, setRodLong] = useState(0)
    const [rodRadio, setRodRadio] = useState(0)
    const [rodResistance, setRodResistance] = useState(0)

    // muatual resistance variables //
    const [mutualResistance, setMutualResistance] = useState(0)

    // Final Resistance value
    const [resistanceFinalValue, setResistanceFinalValue] = useState(0)


    // grid conductors functions //
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
    
    
    // rod functions //
    
    const handleRodNumber = (event) => {
        setNumberRods(event.target.value)
    }
    
    const handleLongRod = (event) => {
        setRodLong(event.target.value)
    }

    const handleRodRadio = (event) => {
        setRodRadio(event.target.value)
    }
    
    // Genral variables //
    
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
    
    // Resistance functions //

    const gridResistanceValue = (event) => {
        event.preventDefault()
        if (resistivity > 0 && largerSide > 0) {
            setGridResistance(((resistivity/(piValue*totalLarge)*(Math.log(2*totalLarge/(Math.sqrt(conductorDiameter*depth)))+kOne*(totalLarge/Math.sqrt(area))-kTwo))).toFixed(2))
        } else {
            setGridResistance("Los valores deben ser mayores a cero")
        }
    }
    
    const rodResistanceValue = (event) => {
        event.preventDefault()
        setRodResistance(((resistivity/(2*piValue*numberRods*rodLong))*(((Math.log(4*rodLong/rodRadio)) - 1 + (2*kOne*rodLong/Math.sqrt(area)) * Math.pow((Math.sqrt(numberRods) - 1), 2)))).toFixed(2))
    }

    const mutualResistanceValue = ()  => {
        setMutualResistance(((resistivity/(piValue*totalLarge)) * ((Math.log(2*totalLarge/rodLong)) + (kOne*totalLarge/Math.sqrt(area)) - kTwo + 1)).toFixed(2))
    }

    const rgValue = () => {
        const gridResistanceFloat = parseFloat(gridResistance)
        const rodResistanceFloat = parseFloat(rodResistance)
        const mutualResistanceFloat = parseFloat(mutualResistance)
        console.log(typeof gridResistance)
        console.log(typeof rodResistance)
        console.log(typeof mutualResistance)
        setResistanceFinalValue(((gridResistanceFloat*rodResistanceFloat - Math.pow(mutualResistanceFloat,2))/(gridResistanceFloat+rodResistanceFloat-2*mutualResistanceFloat)).toFixed(2))
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
                <section className={styles.schwarz_form_second_container}>
                    <h3 className={styles.cshwarz_subtitle}>Resistencia de las barras de la malla</h3>
                    <form className={styles.schwarz_form_container} onSubmit={rodResistanceValue}>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label} htmlFor="number_rods">Cantidad de barras</label>
                            <input className={styles.schwarz_form_inp} type="number" id="number_rods" value={numberRods} onChange={handleRodNumber} />
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="rod_length">Largo de cada barra[m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="rod_length" step="0.1" value={rodLong} onChange={handleLongRod}/>
                        </div>
                        <div className={styles.schwarz_form_label_inp_container}>
                            <label className={styles.schwarz_form_label}  htmlFor="rod_radio">Radio de la barra [m]</label>
                            <input  className={styles.schwarz_form_inp}type="number" id="rod_radio" step="0.001" value={rodRadio} onChange={handleRodRadio}/>
                        </div>
                        <div>
                            <button  className={styles.schwarz_form_button}  type="submit">Calcular</button>
                        </div>
                    </form>
                    <p className={styles.schwarz_result_paragraph}>La Resistencia de las barras de la malla es: {rodResistance} [Ohmios]</p>
                </section>
            </section>
            <section className={styles.schwarz_form_main_container}>
                <section className={styles.schwarz_form_second_container}>
                    <h3 className={styles.cshwarz_subtitle}>Resistencia mutua de la malla</h3>
                        <div>
                            <button className={styles.schwarz_form_button} onClick={mutualResistanceValue} >Calcular</button>
                        </div>
                    <p className={styles.schwarz_result_paragraph}>La Resistencia mutua de la malla es: {mutualResistance} [Ohmios]</p>
                </section>
                <section className={styles.schwarz_form_second_container}>
                    <h3 className={styles.cshwarz_subtitle}>Resistencia de la Malla</h3>
                        <div>
                            <button  className={styles.schwarz_form_button} onClick={rgValue}>Calcular</button>
                        </div>
                    <p className={styles.schwarz_result_paragraph}>La Resistencia mutua de la malla es: {resistanceFinalValue} [Ohmios]</p>
                </section>
            </section>
        </section>
    )
}

export default Schwarz