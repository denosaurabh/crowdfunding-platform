import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import { selectUser } from './redux/userReducer/user.selector';
import { selectError } from './redux/errorReducer/error.selectors';

import { setCurrentUserMeAsync } from './redux/userReducer/user.actions';

import ErrorHandler from './components/errorHandler/errorhandler.component';

import UserVerifiedBanner from './components/verifyBanner/verifybanner.component';

import LandingPage from './pages/landingpage/landingpage.component';
import LoginPage from './pages/loginPage/loginpage.component';
import ProjectsPage from './pages/projectsPage/projectspage.container';
import IdeaPage from './pages/ideaPage/ideapage.component';
import UniversityPage from './pages/universitypage/universitypage.component';
import UserUniversityContainerPage from './pages/userUniversityPage/useruniversity.container';
import ProposalPage from './pages/proposalpage/proposalpage.component';
import PublishIdeaPage from './pages/publishIdeapage/publishIdeapage.component';
import ProposalFormPage from './pages/proposalformpage/proposalformpage.component';
import IdeaFormPage from './pages/Ideaformpage/Ideaformpage.component';
import SettingsPage from './pages/settingspage/settingspage.component';
import BusinessAccountPage from './pages/businessAccountPage/businessaccountpage.component';
import AccountVerify from './pages/accountVerify/accountverify.component';
import UserVerifyPage from './pages/userVerifyPage/userverify.component';
import UserIdeasPage from './pages/userIdeasPage/userIdeasPage.component.jsx';
import UserProposalsPage from './pages/userProposalsPage/userProposalsPage.component';
import UserIdeaStats from './pages/userIdeaStats/userIdeaStats.component';

class App extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    console.log('Application has started successfully! 👍');

    if (localStorage.getItem('USER_TOKEN') && this.props.currentUser) {
      console.log('REFRESHING USER!');
      const { setCurrentUserMeAsync } = this.props;
      setCurrentUserMeAsync();
    }
  }

  // Error Handling
  componentDidCatch() {
    // Component has Catch

    this.setState({ hasError: true });
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="App">
        {this.props.currentError ? <ErrorHandler /> : null}
        {!this.state.hasError ? (
          <>
            <UserVerifiedBanner currentUser={currentUser} />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                exact
                path="/auth"
                render={() =>
                  this.props.currentUser ? (
                    <Redirect to="/home" />
                  ) : (
                    <LoginPage />
                  )
                }
              />
              <Route exact path="/home" component={ProjectsPage} />

              <Route exact path="/yourIdeas" component={UserIdeasPage} />
              <Route
                exact
                path="/yourIdeas/:ideaId"
                component={UserIdeaStats}
              />

              <Route
                exact
                path="/yourProposals"
                component={UserProposalsPage}
              />
              <Route
                exact
                path="/yourProposals/:id"
                component={ProposalPage}
              />

              <Route exact path="/idea/:id" component={IdeaPage} />
              <Route exact path="/university/:id" component={UniversityPage} />
              <Route
                exact
                path="/myuniversity"
                component={UserUniversityContainerPage}
              />
              <Route
                exact
                path="/account/business"
                component={BusinessAccountPage}
              />
              <Route exact path="/account/verify" component={AccountVerify} />
              <Route
                exact
                path="/user/verify/:token"
                component={UserVerifyPage}
              />

              <Route
                exact
                path="/myuniversity/proposal/:id"
                component={ProposalPage}
              />
              <Route exact path="/publish" component={PublishIdeaPage} />
              <Route
                exact
                path="/submit/proposal/:universityid"
                component={ProposalFormPage}
              />
              <Route exact path="/submit/idea" component={IdeaFormPage} />
              <Route exact path="/settings" component={SettingsPage} />
            </Switch>
          </>
        ) : (
          <h1>Something Went Wrong :(</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentError: selectError,
  currentUser: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserMeAsync: () => dispatch(setCurrentUserMeAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
