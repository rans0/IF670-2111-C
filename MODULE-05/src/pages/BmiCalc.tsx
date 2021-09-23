import { Redirect, Route } from "react-router-dom";
import {
  IonAlert,
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "../theme/variables.css";

/* User Ref */
import { useRef, useState } from "react";
import BmiControls from "../components/BmiControls";
import InputControl from "../components/InputControl";
import BmiResults from "../components/BmiResults";

const BmiCalc: React.FC = () => {
  const [calculatedBMI, setCalculateBMI] = useState<number>();
  const [categoryResultBMI, setcategoryResultBMI] = useState<string>();
  const [calcUnits, setCalsUnits] = useState<"cmkg" | "ftlbs">("cmkg");
  const [error, setError] = useState<string>();

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredHeight = heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;

    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredHeight <= 0 ||
      +enteredWeight <= 0
    ) {
      setError("Please enter a valid (non-negative) input number");
      return;
    }

    const weightConversion = calcUnits === "ftlbs" ? 2.2 : 1;
    const heightConversion = calcUnits === "ftlbs" ? 0.0328 : 1;

    const weight = +enteredWeight / weightConversion;
    const height = +enteredHeight / heightConversion;

    const bmi = weight / ((height / 100) * (height / 100));

    if (bmi < 18.5) {
      setcategoryResultBMI("Kurus");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setcategoryResultBMI("Normal");
    } else if (bmi >= 25 && bmi <= 29.9) {
      setcategoryResultBMI("Gemuk");
    } else if (bmi >= 30) {
      setcategoryResultBMI("Obesitas");
    } else {
      setcategoryResultBMI("Undifined");
    }

    console.log(bmi);

    setCalculateBMI(Math.round(bmi * 100) / 100);
  };

  const selectCalcUnitHandler = (selectedValue: "cmkg" | "ftlbs") => {
    setCalsUnits(selectedValue);
  };

  const clearError = () => {
    setError("");
  };

  const resetInputs = () => {
    heightInputRef.current!.value = " ";
    weightInputRef.current!.value = " ";
  };

  return (
    <>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: "Okay", handler: clearError }]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>BMI Calculator</IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                <IonGrid className="ion-no-padding">
                  <IonRow>
                    <IonCol>
                      <InputControl
                        selectedValue={calcUnits}
                        onSelectValue={selectCalcUnitHandler}
                      />
                      <IonItem>
                        <IonLabel position="floating">
                          Tinggi Badan ({calcUnits === "cmkg" ? "cm" : "feet"})
                        </IonLabel>
                        <IonInput ref={heightInputRef}></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">
                          Berat Badan ({calcUnits === "ftlbs" ? "lbs" : "kg"})
                        </IonLabel>
                        <IonInput ref={weightInputRef}></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <BmiControls
                    onCalculate={calculateBMI}
                    onReset={resetInputs}
                  />
                  {calculatedBMI && (
                    <BmiResults
                      onCalculatedBMI={calculatedBMI}
                      onCategoryResultBMI={categoryResultBMI}
                    />
                  )}
                </IonGrid>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonApp>
    </>
  );
};

export default BmiCalc;
