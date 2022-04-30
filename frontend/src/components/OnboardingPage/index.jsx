import './style.scss';
import OnboardModal from '../../components/OnboardModal';

import background from '../../assets/onboardingbackground.png';
import blueglow2 from '../../assets/blueglow2.png';
import coneglow from '../../assets/coneglow.png';
import logo from '../../assets/logo.svg';

const OnboardingBg = () => {
  return (
    <div className="OnboardingPage">
      <OnboardModal />
      <img src={logo} alt="logo" className="logo" />
      <img src={background} alt="background" className="background" />
      <img src={blueglow2} alt="background" className="blueglow" />
      <img src={coneglow} alt="background" className="coneglow" />
    </div>
  );
};

export default OnboardingBg;
