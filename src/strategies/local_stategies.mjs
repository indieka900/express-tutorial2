import passport from 'passport';
import {Strategy} from 'passport-local';
import { mockUsers } from '../utils/constants.mjs';

passport.serializeUser((user, done)=>{
    console.log("In serializer");
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    console.log("In the deserializer");
   try {
    const findUser = mockUsers.find((user) => user.id === id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
   } catch (error) {
    done(error, null);
   } 
})

export default passport.use(
    new Strategy({usernamField: "username"},(username, password, done)=>{
        console.log(`Username: ${username}, Password ${password}`);
        try {
            const findUser = mockUsers.find((user)=> user.username === username);
            if (!findUser) throw new Error("User not found");
            if (findUser.password !== password) throw new Error("Incorect password");
            done(null, findUser);
        } catch (err) {
            done(err, null);
        }
    })
)