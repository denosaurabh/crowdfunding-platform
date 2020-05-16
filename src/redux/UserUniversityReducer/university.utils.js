import APIRequest from '../../utils/apirequest';

export const sortUniversityProposals = (
  university,
  allProposals,
  sortCategory
) => {
  // let { allProposals } = university;

  if (sortCategory === 'latest') {
    allProposals = allProposals.sort(
      (elFirst, elSecond) =>
        new Date(elSecond.uploadedOn) - new Date(elFirst.uploadedOn)
    );

    const updatedUniversity = {
      ...university,
      proposals: allProposals,
    };

    return updatedUniversity;
  } else if (sortCategory === 'intrested') {
    console.log('intrested');
    return {
      ...university,
      proposals: allProposals.sort(
        (elFirst, elSecond) => elSecond.upvotes - elFirst.upvotes
      ),
    };
  } else {
    return {
      ...university,
      proposals: allProposals.sort(
        (elFirst, elSecond) => elSecond.uploadedOn - elFirst.uploadedOn
      ),
    };
  }
};

export const updateUniversityProposalAccept = (
  university,
  proposalId,
  func
) => {
  console.log(university, proposalId, func);

  let { proposals } = university;

  // Finding Index of Proposal
  const proposalIndex = university.proposals.findIndex(
    ({ _id }) => _id === proposalId
  );

  if (func === 'accept') {
    proposals[proposalIndex].accepted = true;
  } else if (func === 'decline') {
    delete proposals[proposalIndex];
  }

  return { ...university, proposals };
};

export const removeUniversityMemberUtil = (university, memberId) => {
  let { members } = university;

  const deleteMemberIndex = members.findIndex((el) => el._id === memberId);

  delete members[deleteMemberIndex];

  return { ...university, members };
};

export const archiveProposal = (university, proposalId) => {
  let { proposals } = university;

  const proposalIndex = proposals.findIndex((el) => el._id === proposalId);

  delete proposals[proposalIndex];

  return { ...university, proposals };
};
