
import "./App.css";
import { Header } from "./components/Header/Header";
import { Converter } from "./components/Converter/Converter";
import { History } from "./components/History/History";

const App : React.FC = () => {


  // const [value, setValue] = useState<number>();

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(Number(event.target.value));
  // };
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
