import { useState } from "react"
import PropTypes from "prop-types"
import styles from "./StepContactVoltage.module.css"

function StepContactVoltage () {

    const [hs, setHs] = useState()
    const [sResistivity, setSResistivity] = useState()
    const [resistivity, setResistivity] = useState()
    const [cs, setCs] = useState()

    const [ts, setTs] = useState()
    const [stepsAndTouchVoltages, setStepsAndTouchVoltages] = useState([])

    const [gridType, setGridType] = useState("squerGrid")
    const [withOrWithoutVerticalRods, setWithOrWithoutVerticalRods] = useState("withVerticalRods")

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

    const [maximumGridCurrent, setMaximumGridCurrent] = useState()
    const [touchVoltage, setTouchVoltage] = useState()

    const [ls, setLs] = useState()
    const [ks, setKs] = useState()
    const [stepVoltage, setStepVoltage] = useState()


    // Functions //

    const handleHs = (event) => {
        setHs(event.target.value)
    }

    // Superficial resistivity
    const handleSResistivity = (event) => {
        setSResistivity(parseFloat(event.target.value))
    }

    // ground resistivity
    const handleResistivity = (event) => {
        const resistivityValue = parseFloat(event.target.value)
        console.log(typeof(resistivityValue))
        setResistivity(resistivityValue)
    }

    const handleTs = (event) => {
        setTs(event.target.value)
    }

    const csValue = (event) => {
        if ( resistivity > 0 && sResistivity > 0 && hs > 0) {
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

    const handleWithVerticalRods = (event) => {     //Look out for an explination
        const { name } = event.target
        setWithOrWithoutVerticalRods(name)
    }

    const handleGridDepth = (event) => {
        setGridDepth(parseFloat(event.target.value))
    }

    const handleSpacingParallelConductors = (event) => {
        setSpacingParallelConductors(parseFloat(event.target.value))
    }

    const handleMaximumDistanceAnyTwoPoints= (event) => {
        setMaximumDistanceAnyTwoPoints(parseFloat(event.target.value))
    }

    const handleConductorDiameter = (event) => {
        setConductorDiameter(parseFloat(event.target.value))
    }

    const handleMaximumLxLength = (event) => {
        setMaximumLxLength(parseFloat(event.target.value))
    }

    const handleMaximumLyLength = (event) => {
        setMaximumLyLength(parseFloat(event.target.value))
    }

    const handleTotalConductorLength= (event) => {
        setTotalConductorLength(parseFloat(event.target.value))
    }

    const handlePerimeterConductorLength= (event) => {
        setPerimeterConductorLength(parseFloat(event.target.value))
    }
    
    const handleRodLength= (event) => {
        setRodLength(parseFloat(event.target.value))
    }
        
    const handleRodTotalLength= (event) => {
        setRodTotalLength(parseFloat(event.target.value))
    }

    const handleGridArea= (event) => {
        setGridArea(parseFloat(event.target.value))
    }
    
    const handleMaximumGridCurrent = (event) => {
        setMaximumGridCurrent(parseFloat(event.target.value))
    }

    // Geometrical factors functions //

    async function handleGeometricalFactors () {
        let na = (2*totalConductorLength/perimeterConductorLength).toFixed(6)
        let nb, nc, nd;
        if (gridType == "squerGrid") {
            nb = nc = nd = 1;
        } else {
            nb = (Math.sqrt(perimeterConductorLength/(4*Math.sqrt(gridArea)))).toFixed(6)
            const suportVariable = ((0.7*gridArea)/(maximumLxLength*maximumLyLength)).toFixed(6)
            nc = ((maximumLxLength*maximumLyLength/gridArea)**suportVariable).toFixed(6)
            nd = gridType == "otherGrid" ? ((maximumDistanceAnyTwoPoints)/(Math.sqrt((maximumLxLength**2)+(maximumLyLength**2)))).toFixed(6) : 1;
        }
        const gFactors = [na, nb, nc, nd]
        setGeometricalFactors(gFactors)
        return gFactors
    }
    
    async function handleGeometricalFactor () {
        let geometricalFactorsResults = await handleGeometricalFactors();
        setGeometricalFactor((geometricalFactorsResults[0]*geometricalFactorsResults[1]*geometricalFactorsResults[2]*geometricalFactorsResults[3]).toFixed(6))
    }

    async function handleCorrectionFactors () {
        let ki, kii, kh;
        if (withOrWithoutVerticalRods == "withVerticalRods") {
            kii = 1;
            setLm(((totalConductorLength) + (1.55 + 1.22 * ((rodLength)/(Math.sqrt((maximumLxLength**2)+(maximumLyLength**2)))))*rodTotalLength).toFixed(6))
        } else {
            const suportExponent = 2/geometricalFactor
            kii = (1/(2*geometricalFactor)**suportExponent).toFixed(6)
            setLm((rodTotalLength+totalConductorLength).toFixed(2))
        }
        ki = (0.644 + 0.148*geometricalFactor).toFixed(6)
        kh = parseFloat((Math.sqrt(1+(gridDepth/1))).toFixed(6))

        let correctionFactorsHere = [ki, kii, kh]
        setCorrectionsFactors(correctionFactorsHere)
        return correctionFactorsHere
    }
    
    async function handleKm () {
        parseFloat(spacingParallelConductors)
        
        let correctionFactors = await handleCorrectionFactors()
        setKm(((1/(2*Math.PI)) * Math.log(((spacingParallelConductors**2)/(16*gridDepth*conductorDiameter)) + (((spacingParallelConductors+2*gridDepth)**2)/(8*spacingParallelConductors*conductorDiameter)) - (gridDepth/(4*conductorDiameter))) + ((correctionFactors[1])/(correctionFactors[2])) * Math.log((8/(Math.PI*(2*geometricalFactor-1))))).toFixed(6))
    }

    const handleTouchVoltage = () => {
        console.log(typeof(resistivity), km, correctionFactors[0], maximumGridCurrent)
        setTouchVoltage(((resistivity*km*correctionFactors[0]*maximumGridCurrent)/(lm)).toFixed(2))
    }

    const handleLsAndKs = () => {
        setLs(((0.75*totalConductorLength)+(0.85*rodTotalLength)).toFixed(2))
        setKs(((1/Math.PI)*((1/(2*gridDepth))+(1/(spacingParallelConductors+gridDepth))+((1/spacingParallelConductors)*(1-(0.5)**(geometricalFactor-2))))).toFixed(6))
    }

    const handleStepVoltage = () => {
        setStepVoltage(((resistivity*ks*correctionFactors[0]*maximumGridCurrent)/(ls)).toFixed(4))
    }

    return (
        <section id="step_contact_voltage_page" className={styles.s_c_v_main_container}>
            <section className={styles.s_c_v_title_container}>
                <h2 className={styles.s_c_v_title}>Calculos y comprobación de voltajes de paso y contacto</h2>
                <p className={styles.s_c_v_paragraph}>Según el Estandar IEEE Std-80-2000 </p>
            </section>
            <section className={styles.s_c_v_section_container} >
                <form onSubmit={csValue}>
                    <h3 className={styles.s_c_v_cs_form_subtitle}>Factor de corección Cs</h3>
                    <p>En caso de que no exista capa superficial protectora, las resistividades son iguales y Cs será igual a 1</p>
                    <div className={styles.s_c_v_cs_form_label_inp_container}>
                        <label htmlFor="hsInput"  className={styles.s_c_v_cs_form_label}>Espesor de la capa de material de alta resistividad colocado sobre el terreno [m]</label>
                        <input className={styles.s_c_v_cs_form_inp} type="number" name="hsInput" id="hsInput" step="0.01" value={hs} onChange={handleHs}/>
                    </div>
                    <div className={styles.s_c_v_cs_form_label_inp_container}>
                        <label htmlFor="RoSInput"  className={styles.s_c_v_cs_form_label}>Resistividad de la capa del material colocado sobre el terreno [Ohm*m]</label>
                        <input  className={styles.s_c_v_cs_form_inp} type="number" name="RoSInput" id="RoSInput" step="0.01" value={sResistivity} onChange={handleSResistivity}/>
                    </div>
                    <div className={styles.s_c_v_cs_form_label_inp_container}>
                        <label htmlFor="RoEquInput" className={styles.s_c_v_cs_form_label}>Resistividad del terreno [Ohm*m]</label>
                        <input  className={styles.s_c_v_cs_form_inp} type="number" name="RoEquInput" id="RoEquInput" step="0.01" value={resistivity} onChange={handleResistivity}/>
                    </div>
                    <div className={styles.s_c_v_cs_form_label_inp_container}>
                        <button type="submit">Calcular Cs</button>
                        <p className={styles.s_c_cs_result}>Valor de Cs {cs} </p>
                    </div>
                </form>
            </section>
            <section className={styles.s_c_v_section_container}>
                <section>
                    <h3 className={styles.s_c_v_cs_form_subtitle}>Voltajes de paso y contacto para personas de 50 kg y 70 kg</h3>
                    <div className={styles.s_c_v_cs_form_label_inp_container}>
                        <label className={styles.s_c_v_cs_form_label} htmlFor="tsInput">Tiempo de falla [s]</label>
                        <input className={styles.s_c_v_cs_form_inp} type="number" name="tsInput" id="tsInput" step="0.01" value={ts} onChange={handleTs}/>
                    </div>
                    <button onClick={stepContactVoltages}>Calcular Vp y Vs</button>
                    <div className={styles.s_c_cs_result}>
                        <p>Voltaje de paso (50 kg) [V]:</p>
                        <p>{stepsAndTouchVoltages[0]}</p>
                    </div>
                    <div className={styles.s_c_cs_result}>
                        <p>Voltaje de paso (70 kg) [V]:</p>
                        <p>{stepsAndTouchVoltages[1]}</p>
                    </div>
                    <div className={styles.s_c_cs_result}>
                        <p>Voltaje de contacto (50 kg) [V]:</p>
                        <p>{stepsAndTouchVoltages[2]}</p>
                    </div>
                    <div className={styles.s_c_cs_result}>
                        <p>Voltaje de contacto (70 kg) [V]:</p>
                        <p>{stepsAndTouchVoltages[3]}</p>
                    </div>
                </section>
            </section>
            <section className={styles.s_c_v_section_container}>
                <section>
                    <h3 className={styles.s_c_v_cs_form_subtitle}>Calculo de Voltajes reales de la malla de puesta a tierra</h3>
                    <section className={styles.s_c_real_selections_container}>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label htmlFor="">Seleccione el tipo de malla</label>
                            <select className={styles.s_c_v_cs_form_inp} name="gridType" id="gridType" value={gridType} onChange={handleGridType}>
                                <option value="squerGrid">Malla cuadrada</option>
                                <option value="rectangularGrid">Malla rectangular o en L</option>
                                <option value="otherGrid">Otras formas</option>
                            </select>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label htmlFor="with_vertical_rods">Malla con barras verticales en la periferia</label>
                            <input className={styles.s_c_v_cs_form_inp} type="checkbox" name="withVerticalRods" id="with_vertical_rods" checked={withOrWithoutVerticalRods === "withVerticalRods"} onChange={handleWithVerticalRods}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label htmlFor="without_vertical_rods">Malla sin barras verticales en la periferia</label>
                            <input className={styles.s_c_v_cs_form_inp} type="checkbox" name="withoutVerticalRods" id="without_vertical_rods" checked={withOrWithoutVerticalRods === "withoutVerticalRods"} onChange={handleWithVerticalRods}/>
                        </div>
                        <div  className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_v_cs_form_label} htmlFor="">h Profundidad de la malla [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={gridDepth} onChange={handleGridDepth}/>
                        </div>
                        <div  className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">D Separación entre conductores en paralelo [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={spacingParallelConductors} onChange={handleSpacingParallelConductors}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">Dm Separación máxima entre dos puntos de la malla [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={maximumDistanceAnyTwoPoints} onChange={handleMaximumDistanceAnyTwoPoints}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">d Diametro del conductor de malla [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.00001" value={conductorDiameter} onChange={handleConductorDiameter}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">Lx Largo máximo de malla en eje "x" [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={maximumLxLength} onChange={handleMaximumLxLength}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">Ly Largo máximo de malla en eje "y" [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={maximumLyLength} onChange={handleMaximumLyLength}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">Lc Largo total del conductor de la malla [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={totalConductorLength} onChange={handleTotalConductorLength}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">Lp Largo total del conductor periferico de la malla [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={perimeterConductorLength} onChange={handlePerimeterConductorLength}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">Lr Largo de las barras verticales [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={rodLength} onChange={handleRodLength}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">LR Largo total de las barras verticales [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={rodTotalLength} onChange={handleRodTotalLength}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">Área de la malla [m2]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={gridArea} onChange={handleGridArea}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">Ig [A]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={maximumGridCurrent} onChange={handleMaximumGridCurrent}/>
                        </div>
                    </section>
                    <section className={styles.s_c_real_geometrical_parameters_container}>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">Calcular Factores de composición geometrica</label>
                            <button type="button" onClick={()=> { handleGeometricalFactors(); handleGeometricalFactor() }}>Calcular n</button>
                        </div>
                        <div className={styles.s_c_cs_result}>
                            <p>Factor de composición geometrico na:</p>
                            <p>{geometricalFactors[0]}</p>
                        </div>
                        <div className={styles.s_c_cs_result}>
                            <p>Factor de composición geometrico nb:</p>
                            <p>{geometricalFactors[1]}</p>
                        </div>
                        <div className={styles.s_c_cs_result}>
                            <p>Factor de composición geometrico nc:</p>
                            <p>{geometricalFactors[2]}</p>
                        </div>
                        <div className={styles.s_c_cs_result}>
                            <p>Factor de composición geometrico nd:</p>
                            <p>{geometricalFactors[3]}</p>
                        </div>
                        <div className={styles.s_c_cs_result}>
                            <p>Factor de composición geometrico n:</p>
                            <p>{geometricalFactor}</p>
                        </div>
                    </section>
                    <section>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">Calcular factores de corrección K</label>
                            <button type="button" onClick={ () => {
                                handleCorrectionFactors();
                                handleKm();
                            }}>Calcular K</button>
                        </div>
                        <div className={styles.s_c_cs_result}>
                            <p>Factor de corrección de geometria de la malla Ki:</p>
                            <p>{correctionFactors[0]} </p>
                        </div>
                        <div className={styles.s_c_cs_result}>
                            <p>Factor de corrección de peso que ajusta los efectos de los conductores internos de la malla Kii:</p>
                            <p>{correctionFactors[1]} </p>
                        </div>
                        <div className={styles.s_c_cs_result}>
                            <p>Factor de corrección de peso que ajusta los efectos de la profuncdidad de la malla Kh:</p>
                            <p>{correctionFactors[2]} </p>
                        </div>
                        <div className={styles.s_c_cs_result}>
                            <p>Factor espaciamiento para el voltaje de contacto a malla Km:</p>
                            <p>{km}</p>
                        </div>
                        <div className={styles.s_c_cs_result}>
                            <p>Largo efectivo de la malla de Lc y LR para voltaje de contacto a malla LM [m]:</p>
                            <p>{lm}</p>
                        </div>
                    </section>
                    <section>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label htmlFor="">Calcular el voltaje de malla real</label>
                            <button onClick={handleTouchVoltage}>Calcular Vc</button>
                        </div>
                        <div className={styles.s_c_cs_result}>
                            <p>Voltaje de contacto real [V]:</p>
                            <p>{touchVoltage}</p>
                        </div>
                    </section>
                    <section className={styles.s_c_real_label_inp_container}>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.s_c_real_label} htmlFor="">Calcular Ks y Ls para Voltaje de paso real</label>
                            <button onClick={handleLsAndKs}>Calcular Ks y Ls</button>
                        </div>
                        <div className={styles.s_c_cs_result}>
                            <p>Largo efectivo Lc y LR para el voltaje de paso Ls [m]:</p>
                            <p>{ls}</p>
                        </div>
                        <div className={styles.s_c_cs_result}>
                            <p>Factor de separación para el voltaje de paso Ks:</p>
                            <p>{ks}</p>
                        </div>
                        <section>
                            <div className={styles.s_c_v_cs_form_label_inp_container}>
                                <label htmlFor="">Calcular el voltaje de paso real</label>
                                <button onClick={handleStepVoltage}>Calcular Vp</button>
                            </div>
                            <div className={styles.s_c_cs_result}>
                                <p>Voltaje de paso real [V]:</p>
                                <p>{stepVoltage}</p>
                            </div>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    )
}

StepContactVoltage.PropTypes = {
    resistivity: PropTypes.number
}

export default StepContactVoltage