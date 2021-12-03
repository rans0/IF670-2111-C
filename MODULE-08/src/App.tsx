import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { calendar, happy, sad } from "ionicons/icons";

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
import GoodMemories from "./pages/GoodMemories";
import BadMemories from "./pages/BadMemories";
import NewMemories from "./pages/NewMemories";
import MemoriesContextProvider from "./data/MemoriesContextProvider";

const App: React.FC = () => (
  <MemoriesContextProvider>
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/goodmemories" component={GoodMemories} />
            <Route exact path="/badmemories" component={BadMemories} />
            <Route exact path="/newmemories" component={NewMemories} />
            <Redirect exact from="/" to="/goodmemories" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="goodmemories" href="/goodmemories">
              <IonIcon icon={happy} />
              <IonLabel>Good Memories</IonLabel>
            </IonTabButton>
            <IonTabButton tab="badmemories" href="/badmemories">
              <IonIcon icon={sad} />
              <IonLabel>Bad Memories</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </MemoriesContextProvider>
);

export default App;
