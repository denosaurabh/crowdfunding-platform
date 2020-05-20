import React from 'react';

import APIRequest from '../../utils/apirequest';

import './proposalpage.styles.scss';

import { ReactComponent as LeftLightArrow } from '../../assets/svg/leftlightarrow.svg';
import { ReactComponent as TopArrowBlueBorder } from '../../assets/svg/toparrowblueborder.svg';
import { ReactComponent as SendSvg } from '../../assets/svg/send.svg';
import { ReactComponent as LoadingSvg } from '../../assets/svg/loading.svg';

import Navbar from '../../components/navbar/navbar.component';
import InputField from '../../components/fieldInput/fieldinput.component';
import Comment from '../../components/comment/comment.component';

class ProposalPage extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.onUpvoteClick = this.onUpvoteClick.bind(this);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
  }

  async componentDidMount() {
    const proposalId = this.props.match.params.id;

    new APIRequest('get', `proposal/${proposalId}`)
      .request()
      .then((res) => {
        console.log('IN THIS!');
        this.setState({ proposal: res.data.data.data });
      })
      .catch((_) => {});
  }

  async onMessageSubmit(e) {
    e.preventDefault();

    const proposalId = this.props.match.params.id;

    this.setState({ comment: '' });

    const newComment = await new APIRequest(
      'post',
      `proposal/${proposalId}/comment`,
      {
        description: this.state.comment,
      }
    ).request();

    console.log(newComment, 'PROPOSAL PAGE!!!!!');

    let updatedAllComments = this.state.proposal.comments;
    updatedAllComments.unshift(newComment.data.data);

    this.setState({
      proposal: {
        ...this.state.proposal,
        comments: updatedAllComments,
      },
    });
  }

  async onUpvoteClick() {
    const proposalId = this.props.match.params.id;

    new APIRequest('post', `proposal/${proposalId}/upvote`)
      .request()
      .then((res) => {
        if (res.data.message !== 'Already Upvoted!') {
          this.setState({
            proposal: {
              ...this.state.proposal,
              upvotes: this.state.proposal.upvotes + 1,
            },
          });
        }
      })
      .catch((_) => {});
  }

  render() {
    return (
      <div className="proposal-page --grid-box-2">
        <Navbar />
        {this.state.proposal ? (
          <div className="proposal-page-content --rightcontent">
            <LeftLightArrow onClick={() => this.props.history.goBack()} />
            <div className="proposal-page-content-head">
              <div className="proposal-page-content-head-left">
                <h3 className="proposal-page-content-head-left__title --maintext">
                  {this.state.proposal.title}
                </h3>
                <span className="proposal-page-content-head-left__date --subpara --light">
                  {new Date(this.state.proposal.uploadedOn).toLocaleString()}
                </span>
              </div>
              <div className="proposal-page-content-head-right">
                <img
                  src={`${process.env.REACT_APP_API_URL}/images/users/${this.state.proposal.uploadBy.imageCover}`}
                  alt="user"
                  className="proposal-page-content-head-right__avatar"
                />
                <div className="proposal-page-content-head-right-des">
                  <h6 className="proposal-page-content-head-right-des__name --maintext">
                    {this.state.proposal.uploadBy.name}
                  </h6>
                  <p className="proposal-page-content-head-right-des__work --subpara --light">
                    {this.state.proposal.uploadBy.job} in
                    {this.state.proposal.uploadBy.country}
                  </p>
                </div>
              </div>
            </div>
            <p className="proposal-page-content__description --subpara">
              {this.state.proposal.description}
            </p>
            <div className="proposal-page-content-upvotes">
              <TopArrowBlueBorder onClick={this.onUpvoteClick} />
              <span className="proposal-page-content-upvotes__amount --maintext">
                {this.state.proposal.upvotes} upvotes
              </span>
            </div>
            <div className="proposal-page-content-comments">
              <div className="proposal-page-content-comments-head">
                <h4 className="proposal-page-content-comments-head__title --maintext">
                  Comments
                </h4>
                <span className="proposal-page-content-comments-head__span --subpara">
                  {this.state.proposal.comments.length}
                </span>
              </div>
              <form onSubmit={this.onMessageSubmit}>
                <InputField
                  type="text"
                  style={{ maxWidth: '100%' }}
                  value={this.state.comment}
                  onChangeHandler={(e) =>
                    this.setState({ comment: e.target.value })
                  }
                  placeHolder="Type your Comment"
                />
                <SendSvg onClick={this.onMessageSubmit} />
              </form>
              <div className="proposal-page-content-comments-content">
                {this.state.proposal.comments.length > 0 ? (
                  this.state.proposal.comments.map((el, i) => (
                    <Comment key={i} {...el} />
                  ))
                ) : (
                  <span className="--subpara --smallfont">No Comments</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <LoadingSvg />
        )}
      </div>
    );
  }
}

export default ProposalPage;
