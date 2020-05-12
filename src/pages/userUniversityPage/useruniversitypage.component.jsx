import React from 'react';

import './useruniversitypage.styles.scss';

import Navbar from '../../components/navbar/navbar.component';
import UniversityProposalsPreview from '../../components/university-proposals-preview/universityproposals.component';

import Sidebar from '../../components/sidebar/sidebar.component';

class UserUniversityPage extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { getUniversityStartAsync } = this.props;

    if (!this.props.university) {
      getUniversityStartAsync();
    }
  }

  render() {
    const {
      university,
      members,
      proposals,
      isLoading,
      category,
      setUniversitySortCategory
    } = this.props;

    return (
      <div className="proposals-page --grid-box-3-wide">
        <Navbar />
        <div className="proposals-page-content --center-content">
          <h2 className="proposals-page-content__heading --maintext">
            Your University Proposals
          </h2>
          <div className="proposals-page-content-menu">
            {['latest', 'intrested', 'archived'].map(el => (
              <span
                className={`proposals-page-content-menu__text --subpara ${
                  el === category ? '--active-sort' : ''
                }`}
                onClick={() => setUniversitySortCategory(el)}
              >
                {el}
              </span>
            ))}
          </div>
          <UniversityProposalsPreview
            proposals={proposals}
            universityId={university?._id}
            isLoading={isLoading}
          />
        </div>
        <Sidebar
          members={members}
          universityId={university?._id}
          isLoading={isLoading}
          adminId={university?.admin}
        />
      </div>
    );
  }
}

export default UserUniversityPage;
