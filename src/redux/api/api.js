import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/` }),
    tagTypes: ["Chat", "User", "Message"],
    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url: "chat/my-chats",
                credentials: "include",
            }),
            providesTags: ["Chat"],
            keepUnusedDataFor: 0
        }),
        searchUser: builder.query({
            query: (name) => ({
                url: `user/search?name=${name}`,
                credentials: "include",
            }),
            providesTags: ["User"]
        }),
        sendFriendRequest: builder.mutation({
            query: (data) => ({
                url: "user/send-friend-request",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        getNotifications: builder.query({
            query: () => ({
                url: "user/notifications",
                credentials: "include"
            }),
            keepUnusedDataFor: 0
        }),
        acceptFriendRequest: builder.mutation({
            query: (data) => ({
                url: "user/accept-friend-request",
                method: "PUT",
                credentials: "include",
                body: data
            }),
            invalidatesTags: ["Chat"]
        }),

        chatDetails: builder.query({
            query: ({ chatId, populate = false }) => {
                let url = `chat/${chatId}`;
                if (populate) url += "?populate=true";

                return {
                    url,
                    credentials: "include"
                };
            },
            providesTags: ["Chat"]
        }),
        getMessages: builder.query({
            query: ({ chatId, page }) => ({
                url: `chat/message/${chatId}?page=${page}`,
                credentials: "include"
            }),
            keepUnusedDataFor: 0
        }),
        sendAttachments: builder.mutation({
            query: (data) => ({
                url: "chat/message",
                method: "POST",
                credentials: "include",
                body: data
            })
        }),
        myGroups: builder.query({
            query: () => ({
                url: "chat/my-group-chats",
                credentials: "include",
            }),
            providesTags: ["Chat"],
        }),
        availableFriends: builder.query({
            query: (chatId) => {
                let url = "user/my-friends";
                if (chatId) url += `?chatId=${chatId}`;
                return {
                    url,
                    credentials: "include"
                };
            },
            providesTags: ["Chat"]
        }),
        newGroup: builder.mutation({
            query: ({ name, members }) => ({
                url: "chat/new-group-chat",
                method: "POST",
                credentials: "include",
                body: { name, members }
            }),
            invalidatesTags: ["Chat"]
        }),
        renameGroup: builder.mutation({
            query: ({ name, chatId }) => ({
                url: `chat/${chatId}`,
                method: "PUT",
                credentials: "include",
                body: { name }
            }),
            invalidatesTags: ["Chat"]
        }),
        removeGroupMember: builder.mutation({
            query: ({ chatId, userId }) => ({
                url: `chat/remove-member`,
                method: "PUT",
                credentials: "include",
                body: { chatId, userId }
            }),
            invalidatesTags: ["Chat"]
        }),
        addGroupMembers: builder.mutation({
            query: ({ chatId, members }) => ({
                url: `chat/add-member`,
                method: "PUT",
                credentials: "include",
                body: { chatId, members }
            }),
            invalidatesTags: ["Chat"]
        }),
        deleteChat: builder.mutation({
            query: (chatId) => ({
                url: `chat/${chatId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Chat"]
        }),
        leaveGroup: builder.mutation({
            query: (chatId) => ({
                url: `chat/leave/${chatId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Chat"],
        }),
    })
});

export default api;
export const {
    useMyChatsQuery,
    useLazySearchUserQuery,
    useSendFriendRequestMutation,
    useGetNotificationsQuery,
    useAcceptFriendRequestMutation,
    useChatDetailsQuery,
    useGetMessagesQuery,
    useSendAttachmentsMutation,
    useMyGroupsQuery,
    useAvailableFriendsQuery,
    useNewGroupMutation,
    useRenameGroupMutation,
    useRemoveGroupMemberMutation,
    useAddGroupMembersMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation
} = api;