# BE Solutions Front-end Test

---

## Description

This test create a site to show a list of users, enable client to filter, create and update those users. There are also a login page and private route to protect "/user-list" route.

## Framework and library

```bash
$ ReactJS
$ Material UI
$ Axios
$ React Query
```

## Running the app

```bash
# development
$ yarn dev
# build
$ yarn build
# preview
$ yarn preview
```

## Login

Any email and password that meet the login requirement should work.
Email and password will be stringtify and save to Local Storage.

## Logout

<p align="center">
  <img src="https://i.imgur.com/B0F3gad.jpg" width="200" alt="logout-image" />
</p>
<p align="center">Click on the email at the top right for logout button to appear. Then logging out.</p>

```bash
# Logout mechanic
$ Authenticated Token is removed from Local Storage. queryClient.resetQueries is called. React Query will try to fetch user data. Private Route will kick in.
```

## Private Route

<p>Private Route is trigger by fetching user information at Header/userNav component, using useQuery hook.</p>
<p>If the fetching failed with response "Unauthorized. Please login to continue" and client is standing at a route protected by Private Route, client will be pushed to "/login" page.</p>
<p>Private Route only cover "/user-list" route. "/" Home route will be able to access without token at Local Storage.</p>
