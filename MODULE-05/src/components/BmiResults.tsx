import { IonCard, IonCardContent, IonRow, IonCol } from "@ionic/react";
import React from "react";
import "./BmiResult.css";

const BmiResults: React.FC<{
  onCalculatedBMI: number;
  onCategoryResultBMI: string | undefined;
}> = (props) => {
  return (
    <IonRow>
      <IonCol>
        <IonCard id="result">
          <IonCardContent
            className={
              props.onCategoryResultBMI === "Normal"
                ? "ion-card-success ion-text-center"
                : props.onCategoryResultBMI === "Gemuk" || props.onCategoryResultBMI === "Kurus"
                ? "ion-card-warning ion-text-center"
                : "ion-card-danger ion-text-center"
            }
          >
            <h2>{props.onCalculatedBMI}</h2>
            <h1>{props.onCategoryResultBMI}</h1>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default BmiResults;
