import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $first: Int
    $after: String
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
  ) {
    repositories(
      first: $first
      after: $after
      orderDirection: $orderDirection
      orderBy: $orderBy
    ) {
      edges {
        cursor
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
          url
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

export const GET_DETAIL_REPO_REVIEWS = gql`
query ($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_REPOSITORIES_FOR_SEARCH = gql`
  query Repositories($searchKeyword: String) {
    repositories(searchKeyword: $searchKeyword) {
      totalCount
      edges {
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
          url
        }
      }
    }
  }
`;

export const AUTHENTICATE = gql`
  mutation ($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
      expiresAt
      user {
        id
        username
        createdAt
      }
    }
  }
`;

export const GET_LOGGED_IN_USER_INFO = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repository {
              id
              name
              ownerName
            }
          }
        }
      }
    }
  }
`;

export const GET_SINGLE_REPO = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      name
      ownerName
      createdAt
      fullName
      reviewCount
      ratingAverage
      forksCount
      stargazersCount
      description
      language
      ownerAvatarUrl
      url
    }
  }
`;



export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
      text
      rating
      id
      createdAt
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      createdAt
      username
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
