export var mockUsers = [
    {id:1, username: "Joseph11", displayName: "Jose1", password: "jose123"},
    {id:2, username: "Mark", displayName: "Mrk", password: "mark123"},
    {id:3, username: "Jemo", displayName: "James", password: "jemo123"},
    {id:4, username: "Felix", displayName: "Ferrouz", password: "felix123"}
]

export const resolveUserId = (req, res, next) => {
    const {params:{id}} = req
    var parseId;
    if (id) {
       parseId = parseInt(id) 
    }
    if (isNaN(parseId)){
        return res.status(400).send({message: "Invalid Id"})
    }
    const findUserIndex = mockUsers.findIndex(
        (user) => user.id === parseId
    );
    req.findUserIndex = findUserIndex;
    next();
}

export const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
}