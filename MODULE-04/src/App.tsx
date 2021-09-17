import { Redirect, Route } from "react-router-dom";
import {
  IonAlert,
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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
import "./theme/variables.css";

/* Import pages */
import Home from "./pages/Home";
import BmiCalc from "./pages/BmiCalc";
import BmrCalc from "./pages/BmrCalc";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Route exact path="/home" component={Home} />
        <Redirect exact path="/" to="home" />
        <Route path="/bmi" component={BmiCalc} />
        <Route path="/bmr" component={BmrCalc} />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
