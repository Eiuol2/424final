let express = require("express")
let mongoose = require("mongoose")
let cors = require("cors")
let bodyParser = require("body-parser")
let dbConfig = require("./database/db")
const dotenv = require("dotenv")
const createError = require("http-errors")
const mongodb = require("mongodb")
const fileUpload = require("express-fileupload")
const fs = require("fs")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const path = require("path")
const crypto = require("crypto")
const multer = require("multer")
const { GridFsStorage } = require("multer-gridfs-storage")
const Grid = require("gridfs-stream")
const methodOverride = require("method-override")

const mongoClient = mongodb.MongoClient
const binary = mongodb.Binary

dotenv.config()

// Express Route
const postRoute = require("../backend/routes/post.route")

const resumeRoute = require("../backend/routes/resume.route")

const userRoute = require("../backend/routes/user.route")

const profileRoute = require("../backend/routes/profile.route")
const { connect } = require("http2")
// const router = require("../backend/routes/post.route");

const router = express.Router()

// Connecting mongoDB Database
mongoose.Promise = global.Promise
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected!")
    },
    (error) => {
      console.log("Could not connect to database : " + error)
    }
  )

const conn = mongoose.createConnection(dbConfig.db)
const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors())
app.use("/posts", postRoute)
app.use("/resume", resumeRoute)
app.use("/users", userRoute)
app.use("/profile", profileRoute)

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// Set EJS as templating engine

app.set("view engine", "ejs")

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },

  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now())
  },
})

var upload = multer({ storage: storage })

var imgModel = require("./Models/model")

app.get("/", (req, res) => {
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err)

      res.status(500).send("An error occurred", err)
    } else {
      res.render("imagesPage", { items: items })
    }
  })
})

app.post("/", upload.single("image"), (req, res, next) => {
  var obj = {
    name: req.body.name,

    desc: req.body.desc,

    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),

      contentType: "image/png",
    },
  }

  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err)
    } else {
      // item.save();

      res.redirect("/")
    }
  })
})

// Middleware
// app.use(methodOverride('_method'))
// app.set('view engine', 'ejs')

// Init gfs

// let gfs;

// conn.once('open', () => {
// gfs = Grid(conn.db, mongoose.mongo);

//   gfs.collection('uploads');
// })

// let gfs, gridfsBucket;
// conn.once('open', () => {
//  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//  bucketName: 'uploads'
// });

//  gfs = Grid(conn.db, mongoose.mongo);
//  gfs.collection('uploads');
// })

// // Create storage engine
// const storage = new GridFsStorage({
//   url: dbConfig.db,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({ storage });

// // @route GET /
// // @desc Loads form
// app.get('/', (req, res) => {
//   res.render('index')
// })

// // @route POST /upload
// // @desc Uploads file to DB
// app.post('/upload', upload.single('file'), (req, res) => {
//   res.json({ file: req.file });
//   res.redirect('/');
// })

// // @route GET /files
// // @desc  Display all files in JSON
// app.get('/files', (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     // Check if files
//     if (!files || files.length === 0) {
//       return res.status(404).json({
//         err: 'No files exist'
//       });
//     }

//     // Files exist
//     return res.json(files);
//   });
// });

// // @route GET /files/:filename
// // @desc  Display single file object
// app.get('/files/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists'
//       });
//     }
//     // File exists
//     return res.json(file);
//   });
// });

// // @route GET /image/:filename
// // @desc Display Image
// app.get('/image/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists'
//       });
//     }

//     // Check if image
//     if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//       // Read output to browser
//       // const readstream = gfs.createReadStream(file.filename);
//       // readstream.pipe(res);
//       const readStream = gridfsBucket.openDownloadStream(file._id);
//       readStream.pipe(res);
//     } else {
//       res.status(404).json({
//         err: 'Not an image'
//       });
//     }
//   });
// });

// // @route DELETE /files/:id
// // @desc  Delete file
// app.delete('/files/:id', (req, res) => {
//   gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
//     if (err) {
//       return res.status(404).json({ err: err });
//     }

//     res.redirect('/');
//   });
// });

//---------------------------------------------JWT RELATED---------------------------------------------------------------

//Generating tokens

//---------------------------------------------JWT RELATED---------------------------------------------------------------

// PORT
const port = 5016

app.listen(process.env.PORT || port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  console.error("This isn't it: " + err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})
