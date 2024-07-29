import { useState } from "react"
import styles from "./StepContactVoltage.module.css"

function StepContactVoltage () {

    const [hs, setHs] = useState()
    const [sResistivity, setSResistivity] = useState()
    const [resistivity, setResistivity] = useState()
    const [cs, setCs] = useState()

    const [ts, setTs] = useState()
    const [stepsAndTouchVoltages, setStepsAndTouchVoltages] = useState([])

    const handleHs = (event) => {
        setHs(event.target.value)
    }

    const handleSResistivity = (event) => {
        setSResistivity(event.target.value)
    }

    const handleResistivity = (event) => {
        setResistivity(event.target.value)
    }

    const handleTs = (event) => {
        setTs(event.target.value)
    }

    const csValue = (event) => {
        if ( resistivity > 0 && sResistivity > 0 && hs > 0){
            event.preventDefault(event)
            setCs((1 - ((0.09 * (1 - resistivity/sResistivity))/(2 * hs + (0.09)))).toFixed(4))
        } else {
            alert("Debes ingresar todos los valores mayores a 0")
        }
    }

    const stepContactVoltages = () => {
        if (cs > 0 && ts > 0 && sResistivity > 0) {
            const step50 = ((1000 + 6 * cs * sResistivity) * 0.116/Math.sqrt(ts)).toFixed(4)
            const step70 = ((1000 + 6 * cs * sResistivity) * 0.157/Math.sqrt(ts)).toFixed(4)
            const touch50 = ((1000 + 1.5 * cs * sResistivity) * 0.116/Math.sqrt(ts)).toFixed(4)
            const touch70 = ((1000 + 1.5 * cs * sResistivity) * 0.157/Math.sqrt(ts)).toFixed(4)
            setStepsAndTouchVoltages([step50, step70, touch50, touch70])
        } else {
            alert("Debes calcular Cs e ingresar ts. Todos los valores deben ser > 0")
        }0
    }


    return (
        <section id="step_contact_voltage_page" className={styles.s_c_v_main_container}>
            <section className={styles.s_c_v_title_container} >
                <h2 className={styles.s_c_v_title}>Calculos y comprobación de voltajes de paso y contacto</h2>
                <section className={styles.s_c_v_cs_form_container}>
                    <form onSubmit={csValue} className={styles.s_c_v_cs_form}>
                        <h3 className={styles.s_c_v_cs_form_subtitle}>Factor de corección Cs</h3>
                        <p>En caso de que no exista capa superficial protectora, las resistividades son iguales y Cs será igual a 1</p>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label htmlFor="hsInput"  className={styles.s_c_v_cs_form_label}>Espesor de la capa de material de alta resistividad colocado sobre el terreno [m]</label>
                            <input  className={styles.s_c_v_cs_form_inp} type="number" name="hsInput" id="hsInput" step="0.0001" value={hs} onChange={handleHs}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label htmlFor="RoSInput"  className={styles.s_c_v_cs_form_label}>Resistividad de la capa del material colocado sobre el terreno [Ohm*m]</label>
                            <input  className={styles.s_c_v_cs_form_inp} type="number" name="RoSInput" id="RoSInput" step="0.0001" value={sResistivity} onChange={handleSResistivity}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label htmlFor="RoEquInput"  className={styles.s_c_v_cs_form_label}>Resistividad del terreno</label>
                            <input  className={styles.s_c_v_cs_form_inp} type="number" name="RoEquInput" id="RoEquInput" step="0.0001" value={resistivity} onChange={handleResistivity}/>
                        </div>
                        <button type="submit">Calcular Cs</button>
                    </form>
                    <p>Valor de Cs: {cs} </p>
                </section>
            </section>
            <section>
                <h3>Voltajes de paso y contacto para personas de 50 kg y 70 kg</h3>
                <label htmlFor="tsInput">Tiempo de falla [s]</label>
                <input type="number" name="tsInput" id="tsInput" step="0.0001" value={ts} onChange={handleTs}/>
                <button onClick={stepContactVoltages}>Calcular Vp y Vs</button>
                <p>Voltaje de paso (50 kg): {stepsAndTouchVoltages[0]} [V]</p>
                <p>Voltaje de paso (70 kg): {stepsAndTouchVoltages[1]} [V]</p>
                <p>Voltaje de contacto (50 kg): {stepsAndTouchVoltages[2]} [V]</p>
                <p>Voltaje de contacto (70 kg): {stepsAndTouchVoltages[3]} [V]</p>
            </section>
        </section>
    )
}

export default StepContactVoltage