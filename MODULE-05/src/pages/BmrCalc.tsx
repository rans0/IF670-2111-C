import { Redirect, Route } from "react-router-dom";
import {
  IonAlert,
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonRow,
  IonTitle,
  IonToolbar,
  IonRadio,
  IonListHeader,
  IonList,
  IonRadioGroup,
} from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Home from "../pages/Home";

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
import BmrControls from "../components/BMRControls";
import InputControl from "../components/InputControl";
import BmrResults from "../components/BmrResults";

type BMR = {
  sendetary: number;
  exercise1: number;
  exercise2: number;
  dailyExrecise: number;
  intenseExercise: number;
};

const BmrCalc: React.FC = () => {
  const [calculatedBMR, setCalculateBMR] = useState<number>();
  const [categoryResultBMR, setcategoryResultBMR] = useState<string>();
  const [calcUnits, setCalsUnits] = useState<"cmkg" | "ftlbs">("cmkg");
  const [gender, setGender] = useState<string>("male");
  const [bmrValues, setBMRValues] = useState<BMR>();
  const [error, setError] = useState<string>();

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const ageInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMR = () => {
    const enteredHeight = heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;
    const enteredAge = ageInputRef.current!.value;

    let bmr: number = 0;

    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredHeight <= 0 ||
      +enteredWeight <= 0 ||
      !enteredAge ||
      +enteredAge <= 0
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
      setcategoryResultBMR("Kurus");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setcategoryResultBMR("Normal");
    } else if (bmi >= 25 && bmi <= 29.9) {
      setcategoryResultBMR("Gemuk");
    } else if (bmi >= 30) {
      setcategoryResultBMR("Obesitas");
    } else {
      setcategoryResultBMR("Undifined");
    }

    if (gender === "male") {
      bmr = 66 + 13.7 * +enteredWeight + 5 * +enteredHeight - 6.8 * +enteredAge;
    } else {
      bmr =
        655 + 9.6 * +enteredWeight + 1.8 * +enteredHeight - 4.7 * +enteredAge;
    }

    const bmrValueObject = {
      sendetary: bmr * 1.2,
      exercise1: bmr * 1.375,
      exercise2: bmr * 1.55,
      dailyExrecise: bmr * 1.725,
      intenseExercise: bmr * 1.9,
    };

    setBMRValues(bmrValueObject);
    setCalculateBMR(Math.round(bmi * 100) / 100);
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
                        <IonLabel position="floating">Age</IonLabel>
                        <IonInput ref={ageInputRef}></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonList>
                        <IonRadioGroup
                          value={gender}
                          onIonChange={(e) => setGender(e.detail.value)}
                        >
                          <IonListHeader>
                            <IonLabel>Gender</IonLabel>
                          </IonListHeader>

                          <IonGrid>
                            <IonRow>
                              <IonCol>
                                <IonItem>
                                  <IonLabel>Male</IonLabel>
                                  <IonRadio slot="start" value="male" />
                                </IonItem>
                              </IonCol>
                              <IonCol>
                                <IonItem>
                                  <IonLabel>Female</IonLabel>
                                  <IonRadio slot="start" value="female" />
                                </IonItem>
                              </IonCol>
                            </IonRow>
                          </IonGrid>
                        </IonRadioGroup>
                      </IonList>
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
                  <BmrControls
                    onCalculate={calculateBMR}
                    onReset={resetInputs}
                  />
                  {calculatedBMR && bmrValues && (
                    <BmrResults
                      onCalculatedBMR={calculatedBMR}
                      onCalculatedValueBMR={bmrValues}
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

export default BmrCalc;
