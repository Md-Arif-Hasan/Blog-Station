const userDB = [
    {
        "id": "2d805d2b-c234-4c3b-b574-291e82f48c5a",
        "username": "arif",
        "email": "arif@gmail.com",
        "password": "12345",
        "updatedAt": "2023-00-00T00:00:00.000Z",
        "createdAt": "2023-00-00T00:00:00.000Z"
    },
    {
        "id": "3ad72706-486f-4039-95b6-554d99efe794",
        "username": "tasmia",
        "email": "tasmia@gmail.com",
        "createdAt": "2023-03-31T08:30:40.000Z",
        "updatedAt": "2023-03-31T08:30:40.000Z"
    },
    {
        "id": "89e05b9e-b07a-41a3-ae2a-543137c0db03",
        "username": "hello",
        "email": "tasmiaq@gmail.com",
        "createdAt": "2023-03-31T08:43:41.000Z",
        "updatedAt": "2023-03-31T08:43:41.000Z"
    },
    {
        "id": "03e7281e-9b49-493c-8a9f-77849163d553",
        "username": "hellwo",
        "email": "tasmwiaq@gmail.com",
        "createdAt": "2023-03-31T09:13:15.000Z",
        "updatedAt": "2023-03-31T09:13:15.000Z"
    }
];

const blogDB = [
    {
        "id": "1063ee36-705e-4901-bd8a-72219a51a756",
        "title": "Blog no .2",
        "description": "This is sohans sec blog",
        "createdAt": "2023-03-31T06:35:15.000Z",
        "updatedAt": "2023-03-31T06:35:15.000Z",
        "authorId": "00bba26d-da0c-4a33-907f-a11e74da3b6f",
        "id": "1"
    },
    {
        "id": "606290d1-431d-496f-a368-cf19e52bdfe6",
        "title": "Blog no .3",
        "description": "This is sohans third blog",
        "createdAt": "2023-03-31T06:35:31.000Z",
        "updatedAt": "2023-03-31T06:35:31.000Z",
        "authorId": "00bba26d-da0c-4a33-907f-a11e74da3b6f",
        "id": "2"
    },
    {
        "id": "1916b7ac-69a8-48bc-8822-16ebd785a096",
        "title": "Blog no .4",
        "description": "This is sohans thirdforth blog",
        "createdAt": "2023-03-31T06:35:42.000Z",
        "updatedAt": "2023-03-31T06:35:42.000Z",
        "authorId": "00bba26d-da0c-4a33-907f-a11e74da3b6f",
        "id": "3"
    },
    {
        "id": "864e00ca-dfb9-41fd-b562-1c8faf478323",
        "title": "Blog no .10",
        "description": "This is sadiqs first blog",
        "createdAt": "2023-03-31T09:37:34.000Z",
        "updatedAt": "2023-03-31T09:37:34.000Z",
        "authorId": "18485899-16d4-4cce-9c32-622eff992b93",
        "id": "4"
    }
]

test("Db connected.", ()=>{
    expect();
})

module.exports = { userDB, blogDB };