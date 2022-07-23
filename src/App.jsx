import { useState } from "react";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isEdit, setEdit] = useState(false);

  const generateUser = async () => {
    setLoading(true);

    let currentPercentage = 0;
    setPercentage(currentPercentage);

    const timeout = setInterval(() => {
      if (currentPercentage < 100) {
        currentPercentage = currentPercentage + 5;
        setPercentage(currentPercentage);
      } else {
        setLoading(false);
        clearInterval(timeout);
      }
    }, 100);

    axios
      .get("https://randomuser.me/api/")
      .then((response) => {
        currentPercentage = 100;
        console.log(response.data.results[0]);
        setData(response.data.results[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editUser = (e) => {
    e.preventDefault();
    setEdit(true);
  }

  const createUser = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(data));
    setData({});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("You Clicked Generate User!");
  };

  const renderOutput = () => {
    return (<>
      <div className="line">
        <div className="output">{data.name?.first || 'Vorname'}</div>
        <div className="output">{data.name?.last || 'Nachname'}</div>
      </div>
      <div className="line">
        <div className="output">{data.email || 'E-Mail-Adresse'}</div>
      </div>
      <div className="line">
        <div className="output">{data.location?.street?.name || 'Straße'}</div>
        <div className="output hsnr">{data.location?.street?.number || 'Hsnr'}</div>
      </div>
      <div className="line">
        <div className="output">{data.location?.postcode || 'PLZ'}</div>
        <div className="output plz">{data.location?.state || 'Ort'}</div>
      </div>
    </>)
  }

  const renderInputFields = () => {
    return (<>
      <div className="line">
        <input value={data.name?.first} type="text" placeholder="Vorname" />
        <input value={data.name?.last} type="text" placeholder="Nachname" />
      </div>
      <div className="line">
        <input
          value={data.email}
          type="email"
          placeholder="E-mail-Adresse"
        />
      </div>
      <div className="line">
        <input
          value={data.location?.street?.name}
          type="text"
          placeholder="Straße"
        />
        <input
          value={data.location?.street?.number}
          className="hsnr"
          type="number"
          placeholder="Hsnr"
        />
      </div>
      <div className="line">
        <input
          value={data.location?.postcode}
          className="plz"
          type="text"
          placeholder="PLZ"
        />
        <input value={data.location?.state} type="text" placeholder="Ort" />
      </div>
    </>
    )
  }

  const renderUserIcon = () => {
    return (<svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="260"
      height="260"
      viewBox="0 0 600 600"
      stroke="black"
      stroke-width="30"
      fill="none">
      <circle cx="300" cy="300" r="265" />
      <circle cx="300" cy="230" r="115" />
      <path d="M106.81863443903,481.4 a205,205 1 0,1 386.36273112194,0" stroke-linecap="butt" />
    </svg>);
  }

  return (
    <div className="container">
      <div className="top-profile">
        {!isLoading ? data.picture?.large ? <img src={data.picture?.large} alt="profile" /> : renderUserIcon() : <><CircularProgressbar
          className="circle"
          value={percentage}
        />
          <div className="percentage-wrapper">{percentage}</div>
        </>
        }
      </div>


      <div className="profile-form">
        <form onSubmit={handleSubmit}>
          {isEdit ? renderInputFields() : renderOutput()}
          <div className="btn">
            {data.name ? <><button style={{ 'width': 'calc(50% - 1rem)' }} onClick={editUser}>Bearbeiten</button><button style={{ 'width': 'calc(50% - 1rem)' }} onClick={createUser}>Erstellen</button></> : <button onClick={generateUser}>Generate User</button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;