import React from 'react';
import axios from 'axios';
import {
  ElementsConsumer,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';

import './ideapage.styles.scss';

import NavBar from '../../components/navbar/navbar.component';
import Button from '../../components/button/button.component';
import Diamond from '../../components/diamondSvg/diamondsvg.component';

import { ReactComponent as LeftLightArrowSvg } from '../../assets/svg/leftlightarrow.svg';
import { ReactComponent as CutSvg } from '../../assets/svg/cut.svg';
import { ReactComponent as LoadingSvg } from '../../assets/svg/loading.svg';
import APIRequest from '../../utils/apirequest';

import ErrorBoundary from '../errorBoundary/errorboundary';

class IdeaPage extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      popupHidden: false,
      fundIdeaAmount: null,
    };

    this.onUpvoteClick = this.onUpvoteClick.bind(this);
    this.onPopupDiamondClick = this.onPopupDiamondClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props);

    const ideaId = this.props.match.params.id;

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/v1/api/idea/${ideaId}`,
    }).then((res) => {
      console.log(res);

      const data = res.data.data.data;
      this.setState({ idea: data, fundIdeaAmount: data.fundTiers[0] });
    });
  }

  onUpvoteClick() {
    const ideaId = this.props.match.params.id;
    const token = localStorage.getItem('USER_TOKEN');
    console.log(token);

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/v1/api/idea/${ideaId}?func=upvote`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log(res);

      if (res.data.result === 'Upvoted') {
        this.setState((prevState) => {
          return {
            idea: { upvotes: prevState.idea.upvotes + 1, ...prevState.idea },
          };
        });
      }
    });
  }

  // Stripe Payment
  onFundSubmit = async (e, stripe, elements) => {
    e.preventDefault();
    console.log(e);

    const ideaId = this.props.match.params.id;

    console.log(stripe, elements);

    const data = await new APIRequest(
      'post',
      `idea/${ideaId}/support?amount=${this.state.fundIdeaAmount}`
    ).request();

    const result = await stripe.confirmCardPayment(
      data.data.data.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: localStorage.getItem('USER_ID'),
          },
        },
      }
    );

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment Successed!');
      }
    }
  };

  onPopupDiamondClick(e, amount) {
    console.log(amount);

    this.setState({ fundIdeaAmount: amount });
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="idea-page --grid-box-3">
          <NavBar />
          <div className="idea-page-content">
            {this.state.idea ? (
              <div className="idea-page-content-description --center-content">
                <LeftLightArrowSvg onClick={this.props.history.goBack} />
                <h3 className="idea-page-content-description__title --maintext">
                  {this.state.idea.title}
                </h3>
                <p className="idea-page-content-description__para --subpara">
                  {this.state.idea.description}
                </p>
              </div>
            ) : (
              <LoadingSvg />
            )}
          </div>
          <div className="idea-page-sidebar --sidebar">
            {this.state.idea ? (
              <>
                <div className="idea-page-sidebar-authorbox">
                  <div className="idea-page-sidebar-author">
                    <h5 className="idea-page-sidebar-author__name --maintext">
                      {this.state.idea.uploadBy.name}
                    </h5>
                    <p className="idea-page-sidebar-author__passion --subpara">
                      {this.state.idea.uploadBy.job}
                      <span className="--light">in </span>
                      {this.state.idea.uploadBy.country}
                      <br />
                      <br />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/images/users/${this.state.idea.uploadBy.imageCover}`}
                    alt="user"
                    className="idea-page-sidebar-authorbox__img"
                  />
                </div>
                <div className="idea-page-sidebar-milestone">
                  <label
                    className="idea-page-sidebar-milestone__label"
                    htmlFor="milestone"
                  >
                    {this.state.idea.fundLimit}$
                    <br />
                    {this.state.idea.fundPercent}% milestone accomplished
                  </label>
                  <progress
                    className="idea-page-sidebar-milestone__progress"
                    id="milestone"
                    value="32"
                    max="100"
                  ></progress>
                </div>
                <Button
                  colorStyle="blue"
                  size="small"
                  content="Support"
                  onClickHandler={() =>
                    this.setState({ popupHidden: !this.state.popupHidden })
                  }
                />
                {this.state.popupHidden ? (
                  <div>
                    <h1 className="idea-page-sidebar__support-popup --mainfont --maintext">
                      <div className="popup-content">
                        <CutSvg
                          onClick={() =>
                            this.setState({
                              popupHidden: !this.state.popupHidden,
                            })
                          }
                        />
                        <div className="popup-content-left">
                          <h3 className="--mainfont --maintext">
                            Fund to Idea :D
                          </h3>
                          <div className="popup-content-left-box">
                            <Diamond
                              color="#00FF75"
                              amount={this.state.idea.fundTiers[0]}
                              onClick={(e) =>
                                this.onPopupDiamondClick(
                                  e,
                                  this.state.idea.fundTiers[0]
                                )
                              }
                            />
                            <Diamond
                              color="#56D6FF"
                              amount={this.state.idea.fundTiers[1]}
                              onClick={(e) =>
                                this.onPopupDiamondClick(
                                  e,
                                  this.state.idea.fundTiers[1]
                                )
                              }
                            />
                            <Diamond
                              color="#E542FF"
                              amount={this.state.idea.fundTiers[2]}
                              onClick={(e) =>
                                this.onPopupDiamondClick(
                                  e,
                                  this.state.idea.fundTiers[2]
                                )
                              }
                            />
                            <Diamond
                              color="#FF0099"
                              amount={this.state.idea.fundTiers[3]}
                              onClick={(e) =>
                                this.onPopupDiamondClick(
                                  e,
                                  this.state.idea.fundTiers[3]
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="popup-content-right">
                          <ElementsConsumer>
                            {({ stripe, elements }) => {
                              return (
                                <form
                                  classname="popup-content-right-form"
                                  onSubmit={(e) =>
                                    this.onFundSubmit(e, stripe, elements)
                                  }
                                >
                                  <label className="popup-content-right-form__label --subpara">
                                    Card Number
                                  </label>
                                  <CardNumberElement
                                    options={{
                                      classes: {
                                        base:
                                          'popup-content-right-form__input --mainfont',
                                      },
                                    }}
                                  />
                                  <label className="popup-content-right-form__label --subpara">
                                    Card Exp Date
                                  </label>
                                  <CardExpiryElement
                                    options={{
                                      classes: {
                                        base:
                                          'popup-content-right-form__input --mainfont',
                                      },
                                    }}
                                  />
                                  <label className="popup-content-right-form__label --subpara">
                                    Card CVV Number
                                  </label>
                                  <CardCvcElement
                                    options={{
                                      classes: {
                                        base:
                                          'popup-content-right-form__input --mainfont',
                                      },
                                    }}
                                  />
                                  <button
                                    className="popup-content-right-form__button --maintext"
                                    type="submit"
                                  >
                                    Fund {this.state.fundIdeaAmount}$ (usd) to
                                    Idea
                                  </button>
                                </form>
                              );
                            }}
                          </ElementsConsumer>
                        </div>
                      </div>
                    </h1>
                  </div>
                ) : null}
                <div className="idea-page-sidebar-diamonds-box">
                  <Diamond
                    color="#00FF75"
                    amount={this.state.idea.fundTiers[0]}
                  />
                  <Diamond
                    color="#56D6FF"
                    amount={this.state.idea.fundTiers[1]}
                  />
                  <Diamond
                    color="#E542FF"
                    amount={this.state.idea.fundTiers[2]}
                  />
                  <Diamond
                    color="#FF0099"
                    amount={this.state.idea.fundTiers[3]}
                  />
                </div>
                <p className="idea-page-sidebar__pleadge --light">
                  or If u can’t, please make a pleadge for him if you like the
                  idea
                </p>
                <Button
                  colorStyle="pink"
                  size="small"
                  content="Upvote"
                  onClickHandler={this.onUpvoteClick}
                />
                <h5 className="idea-page-sidebar__upvotes --maintext">
                  {this.state.idea.upvotes} upvotes
                </h5>
              </>
            ) : (
              <LoadingSvg />
            )}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default IdeaPage;
