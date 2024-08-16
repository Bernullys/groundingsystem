import { useState } from "react"
import styles from "./StepContactVoltage.module.css"

function StepContactVoltage () {

    const [hs, setHs] = useState()
    const [sResistivity, setSResistivity] = useState()
    const [resistivity, setResistivity] = useState()
    const [cs, setCs] = useState()

    const [ts, setTs] = useState()
    const [stepsAndTouchVoltages, setStepsAndTouchVoltages] = useState([])


    // Info //

    const realStepTouchVar = {
        D: "Separación entre conductores en paralelo [m].",
        Dm: "Máxima distancia entre dos puntos cualesquiera de la malla [m].",
        d: "Diámetro del conductor de malla [m].",
        h: "Profundidad a la que se encuentra enterrada la cuadrícula [m].",
        Lx: "Longitud de la malla en la dirección x [m].",
        Ly: "Longitud de la malla en la dirección y [m].",
        Lp: "Longitud del perímetro de la malla [m].",
        Lc: "Longitud total de los electrodos que forman la retícula [m].",
        LR: "Longitud total de las barras [m].",
        Lr: "Longitud de una barra [m].",
        A: "Área que ocupa la malla [m2].",
        Ro: "Resistividad de la tierra [Ohm*m].",
        IG: "Corriente máxima asimétrica de la malla [A]."
    }

    const [gridType, setGridType] = useState("")
    const [withOrWithoutVerticalRods, setWithOrWithoutVerticalRods] = useState({
        withVerticalRods: false,
        withoutVerticalRods: false
    })
    const [gridDepth, setGridDepth] = useState()
    const [spacingParallelConductors, setSpacingParallelConductors] = useState()
    const [maximumDistanceAnyTwoPoints, setMaximumDistanceAnyTwoPoints] = useState()
    const [conductorDiameter, setConductorDiameter] = useState()
    const [maximumLxLength, setMaximumLxLength] = useState()
    const [maximumLyLength, setMaximumLyLength] = useState()
    const [totalConductorLength, setTotalConductorLength] = useState()
    const [perimeterConductorLength, setPerimeterConductorLength] = useState()
    const [rodLength, setRodLength] = useState()
    const [rodTotalLength, setRodTotalLength] = useState()
    const [gridArea, setGridArea] = useState()

    const [geometricalFactors, setGeometricalFactors] = useState([])
    const [geometricalFactor, setGeometricalFactor] = useState()

    const [correctionFactors, setCorrectionsFactors] = useState([])
    const [km, setKm] = useState()

    const [lm, setLm] = useState()

    // Functions //

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
        }
    }

    // Real step and tuch voltages functions //

    const handleGridType = (event) => {
        setGridType(event.target.value)
    }

    const handleWithVerticalRods = (event) => {     //Look out for an explanation
        const { name } = event.target
        setWithOrWithoutVerticalRods(name)
    }

    const handleGridDepth = (event) => {
        setGridDepth(event.target.value)
    }

    const handleSpacingParallelConductors = (event) => {
        setSpacingParallelConductors(event.target.value)
    }

    const handleMaximumDistanceAnyTwoPoints= (event) => {
        setMaximumDistanceAnyTwoPoints(event.target.value)
    }

    const handleConductorDiameter = (event) => {
        setConductorDiameter(event.target.value)
    }

    const handleMaximumLxLength = (event) => {
        setMaximumLxLength(event.target.value)
    }

    const handleMaximumLyLength = (event) => {
        setMaximumLyLength(event.target.value)
    }

    const handleTotalConductorLength= (event) => {
        setTotalConductorLength(event.target.value)
    }

    const handlePerimeterConductorLength= (event) => {
        setPerimeterConductorLength(event.target.value)
    }
    
    const handleRodLength= (event) => {
        setRodLength(event.target.value)
    }
        
    const handleRodTotalLength= (event) => {
        setRodTotalLength(event.target.value)
    }

    const handleGridArea= (event) => {
        setGridArea(event.target.value)
    }

    // Geometrical factors functions //


    const handleGeometricalFactors = () => {
        const na = (2*totalConductorLength/totalConductorLength).toFixed(4)
        let nb, nc, nd;
        if (gridType == "squerGrid") {
            nb = nc = nd = 1;
        } else {
            nb = (Math.sqrt(perimeterConductorLength/(4*Math.sqrt(gridArea)))).toFixed(4)
            const suportVariable = ((0.7*gridArea)/(maximumLxLength*maximumLyLength)).toFixed(4)
            nc = ((maximumLxLength*maximumLyLength/gridArea)**suportVariable).toFixed(4)
            nd = gridType == "otherGrid" ? ((maximumDistanceAnyTwoPoints)/(Math.sqrt((maximumLxLength**2)+(maximumLyLength**2)))).toFixed(4) : 1;
        }
        setGeometricalFactors([na, nb, nc, nd]);
        setGeometricalFactor((geometricalFactors[0]*geometricalFactors[1]*geometricalFactors[2]*geometricalFactors[3]).toFixed(4))
    }

    const handleCorrectionFactors = () => {
        let ki, kii, kh;
        if (withOrWithoutVerticalRods == "withVerticalRods") {
            kii = 1;
            setLm(((totalConductorLength) + (1.55 + 1.22 * ((rodLength)/(Math.sqrt((maximumLxLength**2)+(maximumLyLength**2)))))*rodTotalLength).toFixed(4))
        } else {
            const suportExponent = 2/geometricalFactor
            kii = (1/(2*geometricalFactor)**suportExponent).toFixed(4)
            setLm(rodTotalLength+totalConductorLength)
        }
        ki = 0.644 + 0.148*geometricalFactor
        kh = (Math.sqrt(1+(gridDepth/1))).toFixed(4)
        setCorrectionsFactors([ki, kii, kh])

        parseFloat(spacingParallelConductors)

        setKm(((1/(2*Math.PI)) * Math.log(((spacingParallelConductors**2)/(16*gridDepth*conductorDiameter)) + (((spacingParallelConductors+2*gridDepth)**2)/(8*spacingParallelConductors*conductorDiameter)) - (gridDepth/(4*conductorDiameter))) + ((correctionFactors[1])/(correctionFactors[2])) * Math.log((8/(Math.PI*(2*geometricalFactor-1))))).toFixed(4))

        console.log(typeof(parseFloat(rodLength)))
        console.log(1/(2*Math.PI))
        console.log(((spacingParallelConductors**2)/(16*gridDepth*conductorDiameter)))
        console.log(((((spacingParallelConductors+(2*gridDepth))**2))/(8*spacingParallelConductors*conductorDiameter)))
        console.log((gridDepth/(4*conductorDiameter)))
        console.log(((correctionFactors[1])/(correctionFactors[2])))
        console.log((8/(Math.PI*(2*geometricalFactor-1))))
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
            <section className={styles.s_c_real_main_container}>
                <h3>Calculo de Voltajes reales de la malla de puesta a tierra</h3>
                <section className={styles.s_c_real_selections_container}>
                    <label htmlFor="">Seleccione el tipo de malla</label>
                    <select name="gridType" id="gridType" value={gridType} onChange={handleGridType}>
                        <option value="squerGrid">Malla cuadrada</option>
                        <option value="rectangularGrid">Malla rectangular o en L</option>
                        <option value="otherGrid">Otras formas</option>
                    </select>
                    <div>
                        <label htmlFor="with_vertical_rods">Malla con barras verticales en la periferia</label>
                        <input type="checkbox" name="withVerticalRods" id="with_vertical_rods" checked={withOrWithoutVerticalRods === "withVerticalRods"} onChange={handleWithVerticalRods}/>
                    </div>
                    <div>
                        <label htmlFor="without_vertical_rods">Malla sin barras verticales en la periferia</label>
                        <input type="checkbox" name="withoutVerticalRods" id="without_vertical_rods" checked={withOrWithoutVerticalRods === "withoutVerticalRods"} onChange={handleWithVerticalRods}/>
                    </div>
                    <div className={styles.s_c_real_label_inp_container}>
                        <label className={styles.s_c_real_label} htmlFor="">h Profundidad de la malla [m]</label>
                        <input className={styles.s_c_real_inp} id="" type="number" step="0.0001" value={gridDepth} onChange={handleGridDepth}/>
                    </div>
                    <div className={styles.s_c_real_label_inp_container}>
                        <label className={styles.s_c_real_label} htmlFor="">D Separación entre conductores en paralelo [m]</label>
                        <input className={styles.s_c_real_inp} id="" type="number" step="0.0001" value={spacingParallelConductors} onChange={handleSpacingParallelConductors}/>
                    </div>
                    <div className={styles.s_c_real_label_inp_container}>
                        <label className={styles.s_c_real_label} htmlFor="">Dm Separación máxima entre dos puntos de la malla [m]</label>
                        <input className={styles.s_c_real_inp} id="" type="number" step="0.0001" value={maximumDistanceAnyTwoPoints} onChange={handleMaximumDistanceAnyTwoPoints}/>
                    </div>
                    <div className={styles.s_c_real_label_inp_container}>
                        <label className={styles.s_c_real_label} htmlFor="">d Diametro del conductor de malla [m]</label>
                        <input className={styles.s_c_real_inp} id="" type="number" step="0.0001" value={conductorDiameter} onChange={handleConductorDiameter}/>
                    </div>
                    <div className={styles.s_c_real_label_inp_container}>
                        <label className={styles.s_c_real_label} htmlFor="">Lx Largo máximo de malla en eje "x" [m]</label>
                        <input className={styles.s_c_real_inp} id="" type="number" step="0.0001" value={maximumLxLength} onChange={handleMaximumLxLength}/>
                    </div>
                    <div className={styles.s_c_real_label_inp_container}>
                        <label className={styles.s_c_real_label} htmlFor="">Ly Largo máximo de malla en eje "y" [m]</label>
                        <input className={styles.s_c_real_inp} id="" type="number" step="0.0001" value={maximumLyLength} onChange={handleMaximumLyLength}/>
                    </div>
                    <div className={styles.s_c_real_label_inp_container}>
                        <label className={styles.s_c_real_label} htmlFor="">Lc Largo total del conductor de la malla [m]</label>
                        <input className={styles.s_c_real_inp} id="" type="number" step="0.0001" value={totalConductorLength} onChange={handleTotalConductorLength}/>
                    </div>
                    <div className={styles.s_c_real_label_inp_container}>
                        <label className={styles.s_c_real_label} htmlFor="">Lp Largo total del conductor periferico de la malla [m]</label>
                        <input className={styles.s_c_real_inp} id="" type="number" step="0.0001" value={perimeterConductorLength} onChange={handlePerimeterConductorLength}/>
                    </div>
                    <div className={styles.s_c_real_label_inp_container}>
                        <label className={styles.s_c_real_label} htmlFor="">Lr Largo de las barras verticales [m]</label>
                        <input className={styles.s_c_real_inp} id="" type="number" step="0.0001" value={rodLength} onChange={handleRodLength}/>
                    </div>
                    <div className={styles.s_c_real_label_inp_container}>
                        <label className={styles.s_c_real_label} htmlFor="">LR Largo total de las barras verticales [m]</label>
                        <input className={styles.s_c_real_inp} id="" type="number" step="0.0001" value={rodTotalLength} onChange={handleRodTotalLength}/>
                    </div>
                    <div className={styles.s_c_real_label_inp_container}>
                        <label className={styles.s_c_real_label} htmlFor="">Área de la malla [m2]</label>
                        <input className={styles.s_c_real_inp} id="" type="number" step="0.0001" value={gridArea} onChange={handleGridArea}/>
                    </div>
                </section>
                <section className={styles.s_c_real_geometrical_parameters_container}>
                    <label htmlFor="">Calcular Factores de composición geometrica</label>
                    <button type="button" onClick={handleGeometricalFactors}>Calcular n</button>
                    <p>Factor de composición geometrico na = {geometricalFactors[0]}</p>
                    <p>Factor de composición geometrico nb = {geometricalFactors[1]}</p>
                    <p>Factor de composición geometrico nc = {geometricalFactors[2]}</p>
                    <p>Factor de composición geometrico nd = {geometricalFactors[3]}</p>
                    <p>Factor de composición geometrico n = {geometricalFactor}</p>
                </section>
                <section>
                    <label htmlFor="">Calcular factores de corrección K</label>
                    <button type="button" onClick={handleCorrectionFactors}>Calcular K</button>
                    <p>Factor de corrección de geometria de la malla Ki = {correctionFactors[0]} </p>
                    <p>Factor de corrección de peso que ajusta los efectos de los conductores internos de la malla Kii = {correctionFactors[1]} </p>
                    <p>Factor de corrección de peso que ajusta los efectos de la profuncdidad de la malla Kh = {correctionFactors[2]} </p>
                    <p>Factor espaciamiento para el voltaje de contacto a malla Km = {km} </p>
                    <p>Largo efectivo de la malla de Lc y LR para voltaje de contacto a malla LM = {lm} [m]</p>
                </section>
            </section>
        </section>
    )
}

export default StepContactVoltage