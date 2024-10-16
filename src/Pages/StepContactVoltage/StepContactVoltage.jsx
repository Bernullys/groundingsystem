import { useState } from "react"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import styles from "./StepContactVoltage.module.css"

function StepContactVoltage () {

    // Function to check if all inputs are number //
    const checkForNumber = (arrayOfVariables) => {
        if (arrayOfVariables.every(item => typeof item === 'number' && item > 0)) {
            return true
        }
        else {
            return false
        }
    }

    // Custon Hook to validate inputs > 0 //
    const usePositiveInput = () => {
        let [value, setValue] = useState()

        const handleChange = (event) => {
            const newValue = parseFloat(event.target.value)
            setValue(newValue)
        }
        return [Number(value), handleChange]
    }

    // Variables to stimate cs (correction factor) //
    const [hs, setHs] = useState()
    const [sResistivity, setSResistivity] = useState()
    const [resistivity, setResistivity] = useState()

    // Variable to store cs value //
    const [cs, setCs] = useState()

    // Variables to calculate tolerable touch and step voltages //
    const [ts, setTs] = useState()

    // Variable to store tolerables step and touch voltages //
    const [stepsAndTouchVoltages, setStepsAndTouchVoltages] = useState([])

    // Variables to calculate geometrical factors and after that calculate corrections factors//
    const [gridType, setGridType] = useState("squerGrid")
    const [withOrWithoutVerticalRods, setWithOrWithoutVerticalRods] = useState("withVerticalRods")
    // Variables to calculate geometrical factor using usePositiviInput Hook //
    const [gridDepth, setGridDepth] = usePositiveInput()
    const [spacingParallelConductors, setSpacingParallelConductors] = usePositiveInput()
    const [maximumDistanceAnyTwoPoints, setMaximumDistanceAnyTwoPoints] = usePositiveInput()
    const [conductorDiameter, setConductorDiameter] = usePositiveInput()
    const [maximumLxLength, setMaximumLxLength] = usePositiveInput()
    const [maximumLyLength, setMaximumLyLength] = usePositiveInput()
    const [totalConductorLength, setTotalConductorLength] = usePositiveInput()
    const [perimeterConductorLength, setPerimeterConductorLength] = usePositiveInput()
    const [rodLength, setRodLength] = usePositiveInput()
    const [rodTotalLength, setRodTotalLength] = usePositiveInput()
    const [gridArea, setGridArea] = usePositiveInput()
    const [maximumGridCurrent, setMaximumGridCurrent] = usePositiveInput()

    // Variables to store geometrical factors //
    const [geometricalFactors, setGeometricalFactors] = useState([])
    const [geometricalFactor, setGeometricalFactor] = useState()

    // Variables to store correction factors //
    const [correctionFactors, setCorrectionsFactors] = useState([])
    const [km, setKm] = useState()
    const [lm, setLm] = useState()

    // Variable to store real mesh or touch voltage //
    const [touchVoltage, setTouchVoltage] = useState()

    // Variables to store step voltage factors //
    const [ls, setLs] = useState()
    const [ks, setKs] = useState()

    // Variable to store real step voltage //
    const [stepVoltage, setStepVoltage] = useState()

    ///////////////// Functions //////////////////////

    // Handle hs input //
    const handleHs = (event) => {
        setHs(parseFloat(event.target.value))
    }

    // Handle superficial resistivity input //
    const handleSResistivity = (event) => {
        setSResistivity(parseFloat(event.target.value))
    }

    // Handle ground resistivity input //
    const handleResistivity = (event) => {
        const resistivityValue = parseFloat(event.target.value)
        setResistivity(resistivityValue)
    }

    // Handle ts input //
    const handleTs = (event) => {
        setTs(parseFloat(event.target.value))
    }

    // Calculating cs using a form //
    const csValue = (event) => {
        event.preventDefault(event)
        let checking = checkForNumber([resistivity, sResistivity, hs])
        if (checking) {
            const csValue = Number((1 - ((0.09 * (1 - resistivity/sResistivity))/(2 * hs + (0.09)))).toFixed(4))
            setCs(csValue)
        } else {
            alert("Todos los valores deben ser mayores a cero.")
            setCs("")
        }
    }

    // Calculating tolerables step and touch voltages // 
    const stepContactVoltages = () => {
        let checking = checkForNumber([cs, ts, sResistivity])
        if (checking) {
            const step50 = Number(((1000 + 6 * cs * sResistivity) * 0.116/Math.sqrt(ts)).toFixed(4))
            const step70 = Number(((1000 + 6 * cs * sResistivity) * 0.157/Math.sqrt(ts)).toFixed(4))
            const touch50 = Number(((1000 + 1.5 * cs * sResistivity) * 0.116/Math.sqrt(ts)).toFixed(4))
            const touch70 = Number(((1000 + 1.5 * cs * sResistivity) * 0.157/Math.sqrt(ts)).toFixed(4))
            setStepsAndTouchVoltages([step50, step70, touch50, touch70])
        } else {
            alert("Debes calcular Cs e ingresar ts. Todos los valores deben ser > 0.");
            setStepsAndTouchVoltages([])
        }
    }

    // Handle grid type select input //
    const handleGridType = (event) => {
        setGridType(event.target.value)
    }

    // Handle with or without vertical rods check input //
    const handleVerticalRods = (event) => {
        const { name } = event.target
        setWithOrWithoutVerticalRods(name)
    }

    /////////////// These handle input functions where deactivate because I changed the useState to usePositiveInput Hook /////////////////////////// 
    // const handleGridDepth = (event) => {
    //     setGridDepth(parseFloat(event.target.value))
    // }
    // const handleSpacingParallelConductors = (event) => {
    //     setSpacingParallelConductors(parseFloat(event.target.value))
    // }
    // const handleMaximumDistanceAnyTwoPoints= (event) => {
    //     setMaximumDistanceAnyTwoPoints(parseFloat(event.target.value))
    // }
    // const handleConductorDiameter = (event) => {
    //     setConductorDiameter(parseFloat(event.target.value))
    // }
    // const handleMaximumLxLength = (event) => {
    //     setMaximumLxLength(parseFloat(event.target.value))
    // }
    // const handleMaximumLyLength = (event) => {
    //     setMaximumLyLength(parseFloat(event.target.value))
    // }
    // const handleTotalConductorLength= (event) => {
    //     setTotalConductorLength(parseFloat(event.target.value))
    // }
    // const handlePerimeterConductorLength= (event) => {
    //     setPerimeterConductorLength(parseFloat(event.target.value))
    // }
    // const handleRodLength= (event) => {
    //     setRodLength(parseFloat(event.target.value))
    // }
    // const handleRodTotalLength= (event) => {
    //     setRodTotalLength(parseFloat(event.target.value))
    // }
    // const handleGridArea= (event) => {
    //     setGridArea(parseFloat(event.target.value))
    // }
    // const handleMaximumGridCurrent = (event) => {
    //     setMaximumGridCurrent(parseFloat(event.target.value))
    // }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Handle Geometrical factors //
    async function handleGeometricalFactors () {
        let checkingVariables = checkForNumber([gridDepth, spacingParallelConductors, conductorDiameter, totalConductorLength, perimeterConductorLength, gridArea, maximumLxLength, maximumLyLength, maximumDistanceAnyTwoPoints])
        if (checkingVariables) {
            let na = Number((2*totalConductorLength/perimeterConductorLength).toFixed(6))
            let nb, nc, nd;
            if (gridType == "squerGrid") {
                nb = nc = nd = 1;
            } else {
                nb = Number((Math.sqrt(perimeterConductorLength/(4*Math.sqrt(gridArea)))).toFixed(6))
                const suportVariable = Number(((0.7*gridArea)/(maximumLxLength*maximumLyLength)).toFixed(6))
                nc = gridType == "rectangularGrid" ? 1 : Number(((maximumLxLength*maximumLyLength/gridArea)**suportVariable).toFixed(6))
                nd = gridType == "otherGrid" ? Number(((maximumDistanceAnyTwoPoints)/(Math.sqrt((maximumLxLength**2)+(maximumLyLength**2)))).toFixed(6)) : 1;
            }
            const gFactors = [na, nb, nc, nd]
            setGeometricalFactors(gFactors)
            return gFactors
        } else {
            alert("Debes ingresar todos los datos anteriores para realizar el calculo de n. Todos los datos deben ser > 0.")
            setGeometricalFactors([])
            setGeometricalFactor()
        }
    }
    
    // Handle geometrical factor n //
    async function handleGeometricalFactor () {
        let geometricalFactorsResults = await handleGeometricalFactors();
        let geometricalFactorHere = Number((geometricalFactorsResults[0]*geometricalFactorsResults[1]*geometricalFactorsResults[2]*geometricalFactorsResults[3]).toFixed(6))
        setGeometricalFactor(geometricalFactorHere)
    }

    // Handle correction factors //
    async function handleCorrectionFactors (withWhithSomeWithout) {

        if (geometricalFactors.length == 4) {
            let checkingTheseInputs = checkForNumber([rodLength, rodTotalLength]);
            
            if (withWhithSomeWithout === "withVerticalRods") {
                if (checkingTheseInputs) {
                    let ki = Number((0.644 + (0.148 * geometricalFactor)).toFixed(6));
                    let kii = 1;
                    let kh = Number((Math.sqrt(1+gridDepth)).toFixed(6));
                    setLm(Number(((totalConductorLength) + (1.55 + 1.22 * ((rodLength)/(Math.sqrt((maximumLxLength**2)+(maximumLyLength**2)))))*rodTotalLength).toFixed(6)))
                    let correctionFactorsHere = [ki, kii, kh];
                    setCorrectionsFactors(correctionFactorsHere);
                    return correctionFactorsHere
                } else {
                    alert("Ingrese Lr y LR. Deben ser > 0.");
                    setCorrectionsFactors();
                }
            } else if (withWhithSomeWithout === "withSomeVerticalRods") {
                if (checkingTheseInputs) {
                    const suportExponent = 2/geometricalFactor
                    let ki = Number((0.644 + (0.148 * geometricalFactor)).toFixed(6));
                    let kii = Number((1/(2*geometricalFactor)**suportExponent).toFixed(6));
                    let kh = Number((Math.sqrt(1+gridDepth)).toFixed(6));
                    setLm(Number((rodTotalLength+totalConductorLength).toFixed(2)));
                    let correctionFactorsHere = [ki, kii, kh];
                    setCorrectionsFactors(correctionFactorsHere);
                    return correctionFactorsHere
                } else {
                    alert("Ingrese Lr y LR. Deben ser > 0.");
                    setCorrectionsFactors();
                }
            } else if (withWhithSomeWithout === "withoutVerticalRods") {
                const suportExponent = 2/geometricalFactor
                let ki = Number((0.644 + (0.148 * geometricalFactor)).toFixed(6));
                let kii = Number((1/(2*geometricalFactor)**suportExponent).toFixed(6));
                let kh = Number((Math.sqrt(1+gridDepth)).toFixed(6));
                setLm(Number((totalConductorLength).toFixed(2)));
                let correctionFactorsHere = [ki, kii, kh];
                setCorrectionsFactors(correctionFactorsHere);
                return correctionFactorsHere
            }
        } else {
            alert("Antes calcule los factores de composición geometrica.");
            setCorrectionsFactors([]);

        }
    }
        
    async function handleKm () {

        let checkingCorrectInputss = checkForNumber([spacingParallelConductors, gridDepth, conductorDiameter, geometricalFactor, rodLength, rodTotalLength])
        if (checkingCorrectInputss) {
            let correctionFactors = await handleCorrectionFactors(withOrWithoutVerticalRods)
            setKm(Number(((1/(2*Math.PI)) * Math.log(((spacingParallelConductors**2)/(16*gridDepth*conductorDiameter)) + (((spacingParallelConductors+2*gridDepth)**2)/(8*spacingParallelConductors*conductorDiameter)) - (gridDepth/(4*conductorDiameter))) + ((correctionFactors[1])/(correctionFactors[2])) * Math.log((8/(Math.PI*(2*geometricalFactor-1))))).toFixed(6)))
        } else {
            alert("No es posible calcular Km")
            setKm("")
            setCorrectionsFactors([])
            setLm("")
        }
    }

    const handleTouchVoltage = () => {
        let checkingInputsIg = checkForNumber([resistivity, km, correctionFactors[0], maximumGridCurrent, lm])
        if (checkingInputsIg) {
            setTouchVoltage(Number(((resistivity*km*correctionFactors[0]*maximumGridCurrent)/(lm)).toFixed(2)))
        } else {
            alert("Chequear los valores de: resistividad, Km, Ki, Ig y LM. No se pudo calcular el Real Voltaje de Malla.")
        }
    }

    const handleLsAndKs = () => {
        let checkingInputLsKs = checkForNumber([totalConductorLength, rodTotalLength, gridDepth, spacingParallelConductors, geometricalFactor])
        if (checkingInputLsKs) {
            setLs(Number(((0.75*totalConductorLength)+(0.85*rodTotalLength)).toFixed(2)))
            setKs(Number((1/Math.PI)*((1/(2*gridDepth))+(1/(spacingParallelConductors+gridDepth))+((1/spacingParallelConductors)*(1-(0.5)**(geometricalFactor-2))))).toFixed(6))
        } else {
            alert("Chequear los valores de: largo total de conductores y barras de malla, profundidad de la malla, separación entre conductores, n, entre otros.")
            setLs("")
            setKs("")
        }
    }

    const handleStepVoltage = () => {
        if (ls && ks) {
            setStepVoltage(Number((resistivity*ks*correctionFactors[0]*maximumGridCurrent)/(ls)).toFixed(4))
        } else {
            alert("Antes calcule Ls y Ks.")
            setStepVoltage("")
        }
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
                    <p className={styles.s_c_v_paragraph}>En caso de que no exista capa superficial protectora, las resistividades son iguales y Cs será igual a 1</p>
                    <div className={styles.s_c_v_cs_form_label_inp_container}>
                        <label htmlFor="hsInput"  className={styles.form_label}>Espesor de la capa de material de alta resistividad colocado sobre el terreno [m]</label>
                        <input className={styles.s_c_v_cs_form_inp} type="number" name="hsInput" id="hsInput" step="0.01" value={hs} onChange={handleHs}/>
                    </div>
                    <div className={styles.s_c_v_cs_form_label_inp_container}>
                        <label htmlFor="RoSInput"  className={styles.form_label}>Resistividad de la capa del material colocado sobre el terreno [Ohm*m]</label>
                        <input  className={styles.s_c_v_cs_form_inp} type="number" name="RoSInput" id="RoSInput" step="0.01" value={sResistivity} onChange={handleSResistivity}/>
                    </div>
                    <div className={styles.s_c_v_cs_form_label_inp_container}>
                        <label htmlFor="RoEquInput" className={styles.form_label}>Resistividad del terreno [Ohm*m]</label>
                        <input  className={styles.s_c_v_cs_form_inp} type="number" name="RoEquInput" id="RoEquInput" step="0.01" value={resistivity} onChange={handleResistivity}/>
                    </div>
                    <div className={styles.s_c_v_cs_form_label_inp_container}>
                        <button type="submit">Calcular Cs</button>
                        <p className={styles.s_c_cs_result}>Valor de Cs {cs} </p>
                    </div>
                </form>
            </section>
            <section className={styles.s_c_v_section_container}>
                <section className={styles.s_c_v_section_sub_container}>
                    <h3 className={styles.s_c_v_cs_form_subtitle}>Voltajes de paso y contacto para personas de 50 kg y 70 kg</h3>
                    <div className={styles.s_c_v_cs_form_label_inp_container}>
                        <label className={styles.form_label} htmlFor="tsInput">Tiempo de falla [s]</label>
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
                <section className={styles.s_c_v_section_sub_container}>
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
                        <div  className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="">h Profundidad de la malla [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={gridDepth} onChange={setGridDepth}/>
                        </div>
                        <div  className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="">D Separación entre conductores en paralelo [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={spacingParallelConductors} onChange={setSpacingParallelConductors}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="">Dm Separación máxima entre dos puntos de la malla [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={maximumDistanceAnyTwoPoints} onChange={setMaximumDistanceAnyTwoPoints}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="">d Diametro del conductor de malla [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.00001" value={conductorDiameter} onChange={setConductorDiameter}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="">Lx Largo máximo de malla en eje "x" [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={maximumLxLength} onChange={setMaximumLxLength}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="">Ly Largo máximo de malla en eje "y" [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={maximumLyLength} onChange={setMaximumLyLength}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="">Lc Largo total del conductor de la malla [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={totalConductorLength} onChange={setTotalConductorLength}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="">Lp Largo total del conductor periferico de la malla [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={perimeterConductorLength} onChange={setPerimeterConductorLength}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="">Área de la malla [m2]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={gridArea} onChange={setGridArea}/>
                        </div>
                    </section>
                    <section className={styles.s_c_real_geometrical_parameters_container}>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="">Calcular Factores de composición geometrica</label>
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
                            <label htmlFor="with_vertical_rods">Malla con barras verticales en la periferia</label>
                            <input className={styles.s_c_v_cs_form_inp} type="checkbox" name="withVerticalRods" id="with_vertical_rods" checked={withOrWithoutVerticalRods === "withVerticalRods"} onChange={handleVerticalRods}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label htmlFor="without_vertical_rods">Malla sin barras verticales en la periferia</label>
                            <input className={styles.s_c_v_cs_form_inp} type="checkbox" name="withSomeVerticalRods" id="without_vertical_rods" checked={withOrWithoutVerticalRods === "withSomeVerticalRods"} onChange={handleVerticalRods}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label htmlFor="without_vertical_rods">Malla sin barras verticales</label>
                            <input className={styles.s_c_v_cs_form_inp} type="checkbox" name="withoutVerticalRods" id="without_vertical_rods" checked={withOrWithoutVerticalRods === "withoutVerticalRods"} onChange={handleVerticalRods}/>
                        </div>
                        <div className={withOrWithoutVerticalRods === "withoutVerticalRods" ? styles.deactive : styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="">Lr Largo de las barras verticales [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={rodLength} onChange={setRodLength}/>
                        </div>
                        <div className={withOrWithoutVerticalRods === "withoutVerticalRods" ? styles.deactive : styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="">LR Largo total de las barras verticales [m]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={rodTotalLength} onChange={setRodTotalLength}/>
                        </div>
                        <div className={styles.s_c_v_cs_form_label_inp_container}>
                            <label className={styles.form_label} htmlFor="">Calcular factores de corrección K</label>
                            <button type="button" onClick={ () => {
                                handleCorrectionFactors(withOrWithoutVerticalRods);
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
                            <label className={styles.form_label} htmlFor="">Ig [A]</label>
                            <input className={styles.s_c_v_cs_form_inp} id="" type="number" step="0.01" value={maximumGridCurrent} onChange={setMaximumGridCurrent}/>
                        </div>
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
                            <label className={styles.form_label} htmlFor="">Calcular Ks y Ls para Voltaje de paso real</label>
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
                    <p className="back_button">
                            <NavLink to="/">
                                Atras
                            </NavLink>
                        </p>
            </section>
        </section>
    )
}

StepContactVoltage.PropTypes = {
    resistivity: PropTypes.number
}

export default StepContactVoltage