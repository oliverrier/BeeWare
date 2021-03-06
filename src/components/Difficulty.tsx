import { IonCol, IonGrid, IonIcon, IonItem, IonList, IonRow } from "@ionic/react"
import React from "react"
import { star, starOutline } from 'ionicons/icons'

const DifficultyComponent: React.FC<{ riddleDifficulty: number }> = (props) => {
    const difficultyStars: JSX.Element[] = []
    for (let i = 0; i < props.riddleDifficulty; i++) {
        difficultyStars.push(

            <IonCol size="2"><IonIcon icon={star} /></IonCol>)
    }
    for (let i = 0; i < 5 - props.riddleDifficulty; i++) {
        difficultyStars.push(<IonCol size="2"><IonIcon icon={starOutline} /></IonCol>)
    }

    return (

        <IonGrid>
            <IonRow className="ion-justify-content-center">
                {difficultyStars}
            </IonRow>
        </IonGrid>

    )
}

export default DifficultyComponent