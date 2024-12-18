import { useEffect, Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { analytics } from "./db";
import { logEvent } from "firebase/analytics";
import ProgressLoader from "./components/ProgressLoader";

const Home = lazy(() => import("./screens/Home"));

function App() {
 
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'User Visit');
    }
  }, []);
  return (
    <Suspense fallback={<ProgressLoader />}>
      <Home />
      <Toaster />
    </Suspense>
  );
}
export default App;



