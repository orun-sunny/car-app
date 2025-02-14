import "./App.css";
import CalendarBooking from "./components/CalendarBooking";

import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Layout>
        <div className="text-center text-gray-600 text-lg">
          Calendar will be displayed here
          <CalendarBooking />
        </div>
      </Layout>
    </>
  );
}

export default App;
