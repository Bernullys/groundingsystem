import { useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "../StylesToAllResistanceCal.module.css"

import groundingGrid from "../../assets/Images/malla_puesta_a_tierra.png"

function Schwarz () {
    
    const piValue = Math.PI

    // handle positive and digit numbers //

    const getPositiveNumber = (arrayOfValues) => {
        if (arrayOfValues.every(item => typeof item === 'number' && item > 0)) {
            return true
        } else {
            return false
        }
    }
    
    // grid conductors variables //
    const [resistivity, setResistivity] = useState()
    const [largerSide, setLargerSide] = useState()
    const [shorterSide, setShorterSide] = useState()
    const [totalLarge, setTotalLarge] = useState()
    const [depth, setDepth] = useState()
    const [conductorDiameter, setConductorDiameter] = useState()
    const [gridResistance, setGridResistance] = useState()
    
    // rod variables //
    const [numberRods, setNumberRods] = useState()
    const [rodLong, setRodLong] = useState()
    const [rodRadio, setRodRadio] = useState()
    const [rodResistance, setRodResistance] = useState()

    // muatual resistance variables //
    const [mutualResistance, setMutualResistance] = useState()

    // Final Resistance value
    const [resistanceFinalValue, setResistanceFinalValue] = useState()


    // grid conductors functions //
    const handleResistivity = (event) => {
        setResistivity(parseFloat(event.target.value))
    }

    const handleLargerSide = (event) => {
        setLargerSide(parseFloat(event.target.value))
    }

    const handleShorterSide = (event) => {
        setShorterSide(parseFloat(event.target.value))
    }
    
    const handleTotalLarge = (event) => {
        setTotalLarge(parseFloat(event.target.value))
    }
    
    const handleDepth = (event) => {
        setDepth(parseFloat(event.target.value))
    }
    
    const handleConductorDiameter = (event) => {
        setConductorDiameter(parseFloat(event.target.value))
    }
    
    
    // rod functions //
    
    const handleRodNumber = (event) => {
        setNumberRods(parseFloat(event.target.value))
    }
    
    const handleLongRod = (event) => {
        setRodLong(parseFloat(event.target.value))
    }

    const handleRodRadio = (event) => {
        setRodRadio(parseFloat(event.target.value))
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

    
    // Resistance functions //

    const gridResistanceValue = (event) => {
        event.preventDefault()
        if (getPositiveNumber([resistivity, piValue, totalLarge, conductorDiameter, depth, totalLarge, area])) {
            setGridResistance(Number(((resistivity/(piValue*totalLarge)*(Math.log(2*totalLarge/(Math.sqrt(conductorDiameter*depth)))+kOne*(totalLarge/Math.sqrt(area))-kTwo))).toFixed(2)))
        } else {
            alert("Todos los valores deben ser mayor a cero.")
            setGridResistance("")
        }
    }
    
    const rodResistanceValue = (event) => {
        event.preventDefault()
        if (getPositiveNumber([resistivity, piValue, numberRods, rodLong, rodRadio, area])) {
            setRodResistance(Number(((resistivity/(2*piValue*numberRods*rodLong))*(((Math.log(4*rodLong/rodRadio)) - 1 + (2*kOne*rodLong/Math.sqrt(area)) * Math.pow((Math.sqrt(numberRods) - 1), 2)))).toFixed(2)))
        } else {
            alert("Todos los valores deben ser mayor a cero.")
            setRodResistance("")
        }
    }

    const mutualResistanceValue = ()  => {
        if (gridResistance && rodResistance) {
            setMutualResistance(Number(((resistivity/(piValue*totalLarge)) * ((Math.log(2*totalLarge/rodLong)) + (kOne*totalLarge/Math.sqrt(area)) - kTwo + 1)).toFixed(2)))
        } else {
            alert("Calcule la resistencia de los conductores y las barras de la malla.")
            setMutualResistance("")
        }
    }

    const rgValue = () => {
        const gridResistanceFloat = parseFloat(gridResistance)
        const rodResistanceFloat = parseFloat(rodResistance)
        const mutualResistanceFloat = parseFloat(mutualResistance)
        if (gridResistance && rodResistance && mutualResistance) {
            setResistanceFinalValue(Number(((gridResistanceFloat*rodResistanceFloat - Math.pow(mutualResistanceFloat,2))/(gridResistanceFloat+rodResistanceFloat-2*mutualResistanceFloat)).toFixed(2)))
        } else {
            alert("Calcule todos los valores de resistencia anteriores.")
            setResistanceFinalValue("")
        }
    }
    
    return (
        <section className={styles.main_container}>
            <section className={styles.title_image_container}>
                <h2 className={styles.title}>Malla de Puesta a Tierra - Schwarz</h2>
                <img className={styles.image} src={groundingGrid} alt="Grounding Rod" />
            </section>
            <section className={styles.form_main_container}>
                <section className={styles.form_second_container}>
                    <h3 className={styles.subtitle}>Resistencia de los conductores de la malla</h3>
                    <form className={styles.form} onSubmit={gridResistanceValue}>
                        <div className={styles.form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="resistivity">Resistividad [Ohm*m]</label>
                            <input className={styles.form_input} type="number" step="0.01" name="resistivity" id="resistivity" value={resistivity} onChange={handleResistivity} />
                        </div>
                        <div className={styles.form_label_inp_container}>
                            <label className={styles.form_label}  htmlFor="larger_side">Lado mayor [m]</label>
                            <input  className={styles.form_input}type="number" step="0.01" name="larger_side" id="larger_side" value={largerSide} onChange={handleLargerSide}/>
                        </div>
                        <div className={styles.form_label_inp_container}>
                            <label className={styles.form_label}  htmlFor="shorter_side">Lado menor [m]</label>
                            <input  className={styles.form_input}type="number" step="0.01" name="shorter_side" id="shorter_side" value={shorterSide} onChange={handleShorterSide}/>
                        </div>
                        <div className={styles.form_label_inp_container}>
                            <label className={styles.form_label}  htmlFor="totalLarge">Largo total del conductor [m]</label>
                            <input  className={styles.form_input}type="number" step="0.01" name="totalLarge" id="totalLarge" value={totalLarge} onChange={handleTotalLarge}/>
                        </div>
                        <div className={styles.form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="depth">Profundidad de malla [m]</label>
                            <input className={styles.form_input} type="number" step="0.01" name="depth" id="depth" value={depth} onChange={handleDepth} />
                        </div>
                        <div className={styles.form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="conductor_diameter">Diametro del conductor [m]</label>
                            <input className={styles.form_input} type="number" step="0.000001" name="conductor_diameter" id="conductor_diameter" value={conductorDiameter} onChange={handleConductorDiameter} />
                        </div>
                        <div>
                            <button  className={styles.form_button}  type="submit">Calcular</button>
                        </div>
                    </form>
                    <h3>La Resistencia de los conductores de la malla [Ohm]: {gridResistance}</h3>
                </section>
                <section className={styles.form_second_container}>
                    <h3 className={styles.subtitle}>Resistencia de las barras de la malla</h3>
                    <form className={styles.form} onSubmit={rodResistanceValue}>
                        <div className={styles.form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="number_rods">Cantidad de barras</label>
                            <input className={styles.form_input} type="number" step="0.01" id="number_rods" value={numberRods} onChange={handleRodNumber} />
                        </div>
                        <div className={styles.form_label_inp_container}>
                            <label className={styles.form_label}  htmlFor="rod_length">Largo de cada barra[m]</label>
                            <input  className={styles.form_input}type="number" step="0.01"  id="rod_length" value={rodLong} onChange={handleLongRod}/>
                        </div>
                        <div className={styles.form_label_inp_container}>
                            <label className={styles.form_label}  htmlFor="rod_radio">Radio de la barra [m]</label>
                            <input  className={styles.form_input}type="number" step="0.000001"  id="rod_radio" value={rodRadio} onChange={handleRodRadio}/>
                        </div>
                        <div>
                            <button  className={styles.form_button}  type="submit">Calcular</button>
                        </div>
                    </form>
                    <h3>La Resistencia de las barras de la malla [Ohm]: {rodResistance}</h3>
                </section>
            </section>
            <section className={styles.form_main_container}>
                <section className={styles.form_second_container}>
                    <h3 className={styles.subtitle}>Resistencia mutua de la malla</h3>
                        <div>
                            <button className={styles.form_button} onClick={mutualResistanceValue} >Calcular</button>
                        </div>
                    <h3>La Resistencia mutua de la malla [Ohm]: {mutualResistance}</h3>
                </section>
                <section className={styles.form_second_container}>
                    <h3 className={styles.subtitle}>Resistencia de la Malla</h3>
                        <div>
                            <button  className={styles.form_button} onClick={rgValue}>Calcular</button>
                        </div>
                    <h3>La Resistencia total de la malla [Ohm]: {resistanceFinalValue}</h3>
                </section>
            </section>
                <p type="button" className="back_button">
                    <NavLink to="/grounding_resistance_page">
                        Atras
                    </NavLink>
                </p>
        </section>
    )
}

export default Schwarz