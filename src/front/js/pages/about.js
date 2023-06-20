import React, { useState, useEffect, useContext } from "react";

export const About = props => {

	return (
		<div className="jumbotron">
			<div className="container">
  <div className="row">
    <div className="col-md-12 pt-5 pb-2 ourTeam-hedding text-center">
      <h1>Equipo APPATITAS</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        <strong> sed do eiusmod tempor incididunt </strong>ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  </div>
  <div className="row">
    <div className="col-md-4 col-sm-4 col-xs-12">
      <div className="row section-success ourTeam-box text-center">
        <div className="col-md-12 section1">
          <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t2.jpg" />
        </div>
        <div className="col-md-12 section2 pb-3">
          <p>ANNA FLOWERS</p>
          <span>
            Lorem ipsum dolor sit amet, <br />
            consectetur.
          </span>
        </div>
      </div>
    </div>
    <div className="col-md-4 col-sm-4 col-xs-12">
      <div className="row section-info ourTeam-box text-center">
        <div className="col-md-12 section1">
          <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t1.jpg" />
        </div>
        <div className="col-md-12 section2 pb-3">
          <p>NOEL FLANTIER</p>
          <span>
            Lorem ipsum dolor sit amet, <br />
            consectetur.
          </span>
        </div>
      </div>
    </div>
    <div className="col-md-4 col-sm-4 col-xs-12">
      <div className="row section-info ourTeam-box text-center">
        <div className="col-md-12 section1">
          <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t1.jpg" />
        </div>
        <div className="col-md-12 section2 pb-3">
          <p>NOEL FLANTIER</p>
          <span>
            Lorem ipsum dolor sit amet, <br />
            consectetur.
          </span>
        </div>
      </div>
    </div>
    <div className="col-md-4 col-sm-4 col-xs-12 mx-auto">
      <div className="row section-danger ourTeam-box text-center">
        <div className="col-md-12 section1">
          <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t3.jpg" />
        </div>
        <div className="col-md-12 section2 pb-3">
          <p>JIM JONES</p>
          <span>
            Lorem ipsum dolor sit amet, <br />
            consectetur.
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
);
};