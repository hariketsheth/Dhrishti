import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import LocationPage from './LocationPage'
import NavBar from '../components/NavBar';
import ParentPage from '../components/ParentPage';
import ResultPage from './ResultPage'
import SideBar from '../components/SideBar';
import CameraPage from './CameraPage';
import ResultHeader from '../components/ResultHeader';

const MainPageContainer = () => {
  const history = useHistory();
  const [click, setClick] = useState('camera');
  const [data, setData] = useState([]);
  const [emotions, setEmotions] = useState({
    angry: 0,
    neutral: 0,
    happy: 0,
    surprised: 0,
    sad: 0,
    fearful: 0,
    disgusted: 0
  });
  const [recordings, setRecordings] = useState({});

  return (
    <div>
      <SideBar click={click} 
        setClick={(clickInput) => {
          setClick(clickInput);
        }}
      />
      {
        click === 'camera' ?
          <ParentPage>
            <NavBar click={click}
              currentStep='Step Two: Answer Questions while we analyze your video'
              nextStep='Step Three: Gather your results and look at our findings'
              number='2' 
              setBack={() => {
                history.push('/onboarding');
              }}
              setNext={() => {
                setClick('bullet');
              }}
            />
            <CameraPage  setNext={() => {
                setClick('bullet');
              }} data={data} setData={setData} setEmotions={setEmotions} setRecordings={setRecordings}/>
          </ParentPage> 
        : click === 'bullet' ?
          <ParentPage>
            <NavBar click={click}
              currentStep='Step Three: Gather your results and look at our findings'
              nextStep='Step Four: Gather your results and look at our findings'
              number='3' 
              setBack={() => {
                setClick('camera');}}
              setNext={() => {
                setClick('location');
              }}
            />
            <ResultHeader/>
            <ResultPage emotionData={emotions} heartData={data}/>
          </ParentPage> 
        : click === 'location' ?
          <ParentPage>
            <NavBar click={click}
              currentStep='Step Four: Find local doctors and share results'
              nextStep='You are done! Thank your trying out the Swaasthaya demo'
              number='4'
              setBack={() => {
                setClick('bullet');}}
            />
            <LocationPage />
          </ParentPage> :
        <></>
      }
    </div>
  )
}

export default MainPageContainer;