//defino lo necesario para el login 
const express = require('express')
const { Router } = express
const loginRouter = Router()

const session = require('express-session')
const MongoStore = require('connect-mongo')
 const mongoose = require("mongoose");
const Usuarios = require("../persistencia/modelsMDB/schemaUsuarios");

//const FileStore = require('session-file-store')(session)
const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

//passport 
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
const LocalStrategy = require("passport-local").Strategy;


//bcrypt 
const bcrypt = require("bcrypt");
function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

//fin bcrypt




//importar funcion email
const {MONGOURL} = require("../config")
const URL = MONGOURL
console.log(URL)





//mongo db coneccion

async function connectMongo(){


  const {MONGOURL} = require("../config")
  const URL = MONGOURL
  const db = await mongoose.connect(URL,{ 
    useNewUrlParser: true,
    useUniFiedTopology: true
  })
  
  .then(db => console.log("conectado a " + db.connection.name))
  .catch((e) => console.error(e))
  }



passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    connectMongo()
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      connectMongo()
      Usuarios.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          console.log("User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log(user);
          console.log("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

// termina configuracion passport

loginRouter.use(
  session({
    store: MongoStore.create({
      mongoUrl:
      "mongodb+srv://salo:tako@cluster0.51jwcs4.mongodb.net/test",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    //store: new FileStore({path: "./sesiones", ttl:300, retries:0}),
  
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
    // Cookie por 10 minutos
    maxAge: 600000
  }),
  );



loginRouter.get('/', checkAuthentication ,(req, res) => {
  res.render("pages/index", {});
})

loginRouter.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("pages/profileUser", { user });
  } else {
    res.render("pages/loginForm");
  }
})

loginRouter.get('/faillogin', (req, res) => {
  res.render("pages/login-error", {});
})


loginRouter.post("/login",
  passport.authenticate("login", { successRedirect: '/api/', failureRedirect: "/api/faillogin" }),

);

loginRouter.get('/signup', (req, res) => {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("pages/profileUser", { user });
  } else {
    res.render("pages/signup");
  }
})


loginRouter.get('/failsignup', (req, res) => {
  res.render("pages/signup-error", {});
})


loginRouter.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/api/failsignup" }),
  //routes.postSignup
);


loginRouter.post('/signup', (req, res) => {
  const { username, password, email, phone, address, isAdmin, age  } = req.user;
  const user = { username, password, email, phone, address, isAdmin, age };
  console.log(user)
  res.render("pages/profileUser", { user });
})


loginRouter.get('/logout', (req, res) => {
  req.logout();
  res.render("pages/index");
})


//ruta protegida
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
   return next();
  } else {
    res.redirect("/api/login");
  }
}







//hasta aqui login


module.exports = loginRouter;