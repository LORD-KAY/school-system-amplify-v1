/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      firstname
      lastname
      age
      studentId
      program
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        age
        studentId
        program
        image
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const searchTodos = /* GraphQL */ `
  query SearchTodos(
    $filter: SearchableTodoFilterInput
    $sort: SearchableTodoSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchTodos(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        firstname
        lastname
        age
        studentId
        program
        image
        createdAt
        updatedAt
        owner
      }
      nextToken
      total
    }
  }
`;
