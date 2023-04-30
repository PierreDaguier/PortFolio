import React from "react";
import "./stars.scss";
import Typed from "react-typed";
import BackgroundVideo from "./background.webm"
import cvPdf from '../img/Pierre_Daguier_CV.pdf';


class Intro extends React.Component {
  render() {
    return (
      // <div id="home" className="intro route bg-image " style={{backgroundImage: "url("+bigImage+")"}}>
<div id="home" className="intro route bg-image" >
<video id="bg-video" style={{ objectFit: 'cover', width: '100vw', height: '100vh' }} autoPlay loop muted>
  <source src={BackgroundVideo} type="video/webm" />
</video>
        {/* <div id="stars" />
        <div id="stars2" />
        <div id="stars3" /> */}

        <div className="intro-content display-table">
          <div className="table-cell">
            <div className="container">
              <h1 className="intro-title mb-4">Hello, I am Pierre Daguier</h1>
              <p className="intro-subtitle">
                <span className="text-slider-items"></span>
                <strong className="text-slider">
                  <Typed
                    strings={[
                      "Front End Developer",
                      "Back End Developer",
                      "Software Engineer",
                      "Blockchain Developer"
                    ]}
                    typeSpeed={80}
                    backDelay={1100}
                    backSpeed={30}
                    loop
                  />
                </strong>
              </p>
              <p className="pt-3">
              <a
                className="btn btn-primary btn js-scroll px-4"
                href={cvPdf}
                download="Pierre_Daguier_CV.pdf"
                role="button"
              >
              Download My CV
            </a>

              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Intro;
