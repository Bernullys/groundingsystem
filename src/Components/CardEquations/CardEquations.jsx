import styles from "../../Pages/StylesToAllResistanceCal.module.css"

function CardEquations ( { equImage }) {
    return (
        <article className={styles.card_equation_main_container}>
            <img className={styles.card_equation_img} src={equImage} alt="Ecuation" />
        </article>
    )
}

export default CardEquations