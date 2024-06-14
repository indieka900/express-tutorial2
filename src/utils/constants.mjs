export var mockUsers = [
    {id:1, username: "Joseph11", displayName: "Jose1"},
    {id:2, username: "Mark", displayName: "Mrk"},
    {id:3, username: "Jemo", displayName: "James"},
    {id:4, username: "Felix", displayName: "Ferrouz"}
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