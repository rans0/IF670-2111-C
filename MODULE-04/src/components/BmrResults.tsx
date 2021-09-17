import { IonRow, IonCol, IonCard, IonCardContent } from "@ionic/react";
import React from "react";

type BMR = {
  sendetary: number;
  exercise1: number;
  exercise2: number;
  dailyExrecise: number;
  intenseExercise: number;
};

const BmrResults: React.FC<{
  onCalculatedBMR: number;
  onCalculatedValueBMR: BMR;
}> = (props) => {
  return(
    <IonRow>
        <IonCol>
            <IonCard>
                <IonCardContent className="ion-text-center">
                <h3>BMR = {props.onCalculatedBMR} calories/day</h3>
                <h3>Daily calories need base on activity level</h3>
                <IonRow class="ion-justify-content-between">
                    <IonCol>
                        <p>Activity Level</p>
                    </IonCol>
                    <IonCol>
                        <p>Calorie</p>
                    </IonCol>
                </IonRow>
                <IonRow class="ion-justify-content-between">
                    <IonCol>
                        <p>Sendentary: little or no exercise</p>
                    </IonCol>
                    <IonCol>
                        <p>{props.onCalculatedValueBMR.sendetary}</p>
                    </IonCol>
                </IonRow>
                <IonRow class="ion-justify-content-between">
                    <IonCol>
                        <p>Exercise 1-3 times/week</p>
                    </IonCol>
                    <IonCol>
                        <p>{props.onCalculatedValueBMR.exercise1}</p>
                    </IonCol>
                </IonRow>
                <IonRow class="ion-justify-content-between">
                    <IonCol>
                        <p>Exercise 4-5 times/week</p>
                    </IonCol>
                    <IonCol>
                        <p>{props.onCalculatedValueBMR.exercise2}</p>
                    </IonCol>
                </IonRow>
                <IonRow class="ion-justify-content-between">
                    <IonCol>
                        <p>Daily Exercise</p>
                    </IonCol>
                    <IonCol>
                        <p>{props.onCalculatedValueBMR.dailyExrecise}</p>
                    </IonCol>
                </IonRow>
                <IonRow class="ion-justify-content-between">
                    <IonCol>
                        <p>Intense Exercise</p>
                    </IonCol>
                    <IonCol>
                        <p>{props.onCalculatedValueBMR.intenseExercise}</p>
                    </IonCol>
                </IonRow>
                </IonCardContent>
            </IonCard>
        </IonCol>
    </IonRow>
  );
};

export default BmrResults;
