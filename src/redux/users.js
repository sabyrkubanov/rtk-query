import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const usersSlice = createApi({
    reducerPath: 'users',
    tagTypes: ['users'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4444/'}),
    endpoints: (build) => ({
        getUsers: build.query({
            query: (filter) =>  `users?${filter.gender !== 'all' ? `gender=${filter.gender}&` : ''}`,
            providesTags: ['users']
        }),
        addUser: build.mutation({
          query: (person) => ({
              url: '/users',
              method: 'POST',
              body: person

          }),
            invalidatesTags: ['users']
        }),
        removeUser: build.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['users']

        })
    })
})

export const {useGetUsersQuery,useAddUserMutation, useRemoveUserMutation} = usersSlice