import React from "react";

import { IonButton, IonCol, IonIcon, IonRow, IonGrid } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";

import { calculateBMI, resetInputs } from "../App";

type props = {
  
  setcategoryResultBMI: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setCalculateBMI: React.Dispatch<React.SetStateAction<number | undefined>>;
  heightInputRef: React.RefObject<HTMLIonInputElement>
  weightInputRef: React.RefObject<HTMLIonInputElement>
};

const BmiControls = ({
  setcategoryResultBMI,
  setCalculateBMI,
  heightInputRef,
  weightInputRef
}: props) => {
  return (
    <IonGrid class="ion-text-center ion-margin">
      <IonRow>
        <IonCol className="ion-text-left">
          <IonButton
            onClick={() =>
              calculateBMI(
                heightInputRef,
                weightInputRef,
                setcategoryResultBMI,
                setCalculateBMI
              )
            }
          >
            <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
            Calculate
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-right">
          <IonButton onClick={() => resetInputs(heightInputRef, weightInputRef)}>
            <IonIcon slot="start" icon={refreshOutline}></IonIcon>
            Reset
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default BmiControls;
