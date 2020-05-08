export const addCategoryToArray = (allCategories, categoryToAdd) => {
  const isCategoryAlreadyExist = allCategories.includes(categoryToAdd);

  return isCategoryAlreadyExist
    ? allCategories.filter((category) => category != categoryToAdd)
    : [...allCategories, categoryToAdd];
};

export const makingSortQueryFromCategory = (category) => {
  let categoryQuery;

  if (category === 'Popular') {
    categoryQuery = '-upvotes';
  } else if (category === 'Most Funded') {
    categoryQuery = '-fundPercent';
  } else if (category === 'Recent') {
    categoryQuery = 'uploadedOn';
  }

  return `&sort=${categoryQuery}`;
};

export const makeCategoriesQueryStr = (allCategories) => {
  const queryArr = allCategories.map((category) => `field=${category}`);
  console.log(queryArr.join('&'), 'QUERY ARR....');

  return queryArr.join('&');
};
