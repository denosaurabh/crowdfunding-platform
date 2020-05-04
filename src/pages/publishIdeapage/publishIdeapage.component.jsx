import React from "react";

import "./publishideapage.styles.scss";

import { ReactComponent as LeftLightArrowSvg } from "../../assets/svg/leftlightarrow.svg";

import Button from "../../components/button/button.component";

const PublishIdea = ({ history }) => {
  return (
    <div className="publish-idea">
      <div className="publish-idea-content">
        <header className="publish-idea-content-header">
          <LeftLightArrowSvg onClick={() => history.goBack()} />
          <h3 className="--maintext">Publish your Idea</h3>
        </header>
        <div className="publish-idea-content-mid">
          <div className="publish-idea-content-box">
            <h5 className="publish-idea-content-box__title --maintext">
              Direct Way
            </h5>
            <p className="publish-idea-content-box__summary --subpara --light">
              Publish your Idea directly to Globe and get funds on your Idea
              from anyone
            </p>
            <Button
              colorStyle="blue"
              addClass="publish-idea-content-box__button"
              onClickHandler={() => history.push("/submit/idea")}
              content="Publish Idea"
              size="wide"
            />
          </div>
          <h2 className="publish-idea-content__OR_h2 --maintext">OR</h2>
          <div className="publish-idea-content-box --pinkcolor">
            <h5 className="publish-idea-content-box__title --maintext">
              Institution Way
            </h5>
            <p className="publish-idea-content-box__summary --subpara --light">
              Show your Idea to a related Institution, get help from more
              intested peoples and get funds from peoples.
            </p>
            <Button
              colorStyle="pink"
              addClass="publish-idea-content-box__button"
              content="Publish Idea"
              onClickHandler={() => history.push("/home")}
              size="wide"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishIdea;
