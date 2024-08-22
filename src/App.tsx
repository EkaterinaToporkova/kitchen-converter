
import "./App.css";
import { Header } from "./components/Header/Header";
import { Converter } from "./components/Converter/Converter";
import { History } from "./components/History/History";

const App : React.FC = () => {
  return (
    <>
    <Header />
      <main className="content">
        <section className="converter">
          <div className="container">
            <div className="wrapper">
              <Converter />
              <History />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
