/*The Implementation for the middleware*/
let authenticated = true;
// middleware function to log requests
const logger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
}
// middleware function to authenticate users
const authenticate = (req, res, next) => {
    // authenticate user logic here
    if (authenticated) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}
// add middleware functions to the application
app.use(logger);
app.use(authenticate);
// define routes and controllers
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Used  in app.js
var cors = require('cors')
app.use(cors())


//API 
fetchData: (req, res) => {
    /**
     * Body Require:
     * id as end-point
     */
    const id = req.params.id;
    fetchData(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Error fetching data from database",
          data: []
        });
      } else {

        const arr = Object.entries(results).map(([key, value]) => ({ name: key, value }));

        console.log(arr);
        // let userData = Array.from(arr);
        console.log("The object is an array", Array.isArray(arr));
        console.log("There is no error in data fetching", results);

        // THis method is working
        const convertJsonToExcel = () => {

          const workSheet = XLSX.utils.json_to_sheet(arr);
          const workBook = XLSX.utils.book_new();

          XLSX.utils.book_append_sheet(workBook, workSheet, "arr")
          // Generate buffer
          XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })

          // Binary string
          XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

          XLSX.writeFile(workBook, "usersData.xlsx")

        }
        convertJsonToExcel()
        return res.json({
          code: 200,
          status: true,
          message: "The category at a particular Id",
          data: results
        });
      }
    });
  },
