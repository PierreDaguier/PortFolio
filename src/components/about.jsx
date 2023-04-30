import React from "react";
import django from "../img/django.png";
import kali from "../img/kali.png";
import truffle from "../img/truffle.png";
import metasploit from "../img/metasploit.png";
import mongo from "../img/mongo.png";
import postman from "../img/postman.png";
import polkadot from "../img/polkadot.png";
import substrate from "../img/substrate.png";
import rust from "../img/rust.svg";

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      skills: [
        { id: "HTML5_skill", content: "Vue.js", porcentage: "80%", value: "80" },
        { id: "CSS3_skill", content: "Node.js", porcentage: "85%", value: "85" },
        {
          id: "JavaScript_skill",
          content: "Solidity",
          porcentage: "80%",
          value: "80"
        },
        { id: "PHP_skill", content: "GraphQL", porcentage: "70%", value: "70" },
        {
          id: "ReactJS_skill",
          content: "ReactJS",
          porcentage: "80%",
          value: "80"
        },
        {
          id: "Python_skill",
          content: "Python",
          porcentage: "80%",
          value: "80"
        },
        {
          id: "VanillaJS_skill",
          content: "Docker",
          porcentage: "70%",
          value: "70"
        },
        {
          id: "Wordpress_skill",
          content: "Wordpress",
          porcentage: "80%",
          value: "80"
        }
      ],
      about_me: [
        {
          id: "first-p-about",
          content:
            "A capable and driven full-stack web designer with a specialization in blockchain innovations, I bring two a long time of profitable encounter to the table. As of late migrating to Brisbane, Australia, I am presently excitedly seeking after modern work openings."
        },
        {
          id: "second-p-about",
          content:
            "My expertise set envelops a extend of web improvement systems and libraries, counting Vue.js, Vuetify, GraphQL, PostgreSQL, and Node.js. Leveraging these abilities, I can create responsive, adaptable, and easy-to-maintain web applications that cater to the particular necessities of clients and end-users. In addition, I have a strong comprehension of blockchain innovations, having worked on ventures from keen contract sending to decentralized application advancement. "
        },
        {
          id: "third-p-about",
          content:
            "In my past position, I honed my problem-solving and explanatory capacities, empowering me to supply inventive arrangements to complicated challenges. Committed to deep rooted learning and remaining current with cutting-edge advances, I have reliably illustrated my capacity to total ventures reliably and inside budget limitations. "
        },
        {
          id: "fourth-p-about",
          content:
            "As I set out on this modern travel in Brisbane, I am energized to offer my web advancement mastery and excitement for blockchain advances to a dynamic, forward-thinking organization. My involvement, capacities, and assurance make me a compelling candidate for any web advancement or blockchain arranged part. "
        },
      ]
    };
  }

  render() {
    return (
      <section id="about" className="about-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="box-shadow-full">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div
                        className="col-sm-6 col-md-5"
                        style={{ margin: "0 auto" }}
                      >
                        <div
                          className="about-img"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            className="img-fluid rounded b-shadow-a"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="skill-mf">
                      {/* <p className="title-s">Skill</p> */}
                      {this.state.skills.map(skill => {
                        return (
                          <React.Fragment key={skill.id}>
                            <span>{skill.content}</span>{" "}
                            <span className="pull-right">
                              {skill.porcentage}
                            </span>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: skill.porcentage }}
                                aria-valuenow={skill.value}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <div className="image-container">
                      <img src={django} className="framework-image" alt="Django" style={{ marginRight: "10px" }} />
                      <img src={kali} className="framework-image" alt="Kali" style={{ marginRight: "10px" }} />
                      <img src={truffle} className="framework-image" alt="Truffle" style={{ marginRight: "10px" }} />
                      <img src={metasploit} className="framework-image" alt="Metasploit" style={{ marginRight: "10px" }} />
                      <img src={mongo} className="framework-image" alt="Mongo" style={{ marginRight: "10px" }} />
                      <img src={postman} className="framework-image" alt="Postman" style={{ marginRight: "10px" }} />
                      <img src={polkadot} className="framework-image" alt="Polkadot" style={{ marginRight: "10px" }} />
                      <img src={substrate} className="framework-image" alt="Substrate" style={{ marginRight: "10px" }} />
                      <img src={rust} className="framework-image" alt="Rust" style={{ marginRight: "10px" }} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="about-me pt-4 pt-md-0">
                      <div className="title-box-2">
                        <h5 className="title-left">About Me</h5>
                      </div>
                      {this.state.about_me.map(content => {
                        return (
                          <p className="lead" key={content.id}>
                            {content.content}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
