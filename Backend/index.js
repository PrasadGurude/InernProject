const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const insertDataModel = require('./models/insertDatamodel');
const PORT = 3000

const app = express();
app.use(cors())

mongoose.connect("mongodb://0.0.0.0:27017/amazonaws")
    .then(() => {
        console.log("connected to mongodb server");
    })
    .catch((err) => {
        console.log(err);
    })


app.get("/extract", (req, res) => {

    fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json", {
        method: "GET",

    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            insertDataModel.insertMany(data);
        })
        .catch((err) => {
            console.log(err);
        })
    res.json({ message: "data from the url is moved to the database" });
})

// app.get("/data", async (req, res) => {
//     let { page, limit, serPar } = req.query
//     page = Number(page) || 1;
//     limit = Number(limit) || 6;
//     serPar = serPar || "";
//     let skip = (page - 1) * limit;
//     let pageData;
//     if(serPar==""){
//         pageData = await insertDataModel.find().skip(skip).limit(limit);

//     }
//     else{
//         pageData = await insertDataModel.find({
//             $or: [
//               ({ title: { $regex: serPar, $options: 'i' } },
//               { price: { $regex:parseInt (serPar), $options: 'i' } },
//               { description: { $regex: serPar, $options: 'i' } })
//             ]
//           }).skip(skip).limit(limit);
//     }
//     res.json(pageData);

// })

app.get("/data", async (req, res) => {
    let { page, limit } = req.query
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    let skip = (page - 1) * limit;
    let pageData = await insertDataModel.find().skip(skip).limit(limit);

    res.send(pageData);

})

// app.get('/statistics/:month',async (req,res)=>{
// let month=req.params.month;
// let data = await insertDataModel.find()
// const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];
// let monthData = [];
// data.forEach(e => {
//     let date = e.dateOfSales 
//     const dateObject = new Date(date);
//     const monthName = monthNames[dateObject.getMonth()];
//     if(month===monthName){
//         monthData.push(e)
//     }
// });
// res.send(monthData)

const { ObjectId } = require('mongoose').Types;
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

app.get('/monthData/:month/:page', async (req, res) => {
    const monthName = req.params.month;
    let page =Number( req.params.page) || 1
    limit = 10;
    let skip = (page - 1) * limit;

    try {
        const data = await insertDataModel.aggregate([
            {
                $addFields: {
                    dateOfSaleDate: {
                        $toDate: "$dateOfSale" // Convert string to Date object
                    }
                }
            },
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSaleDate" }, monthNames.indexOf(monthName) + 1]
                    }
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ]);

        let totalAmount = 0
        let totalSoldItems = 0
        let totalNotSoldItems = 0

        let p0 = 0;
        let p1 = 0;
        let p2 = 0;
        let p3 = 0;
        let p4 = 0;
        let p5 = 0;
        let p6 = 0;
        let p7 = 0;
        let p8 = 0;
        let p9 = 0;

        let mans_clothing = 0;
        let jewelery = 0;
        let electronics = 0;
        let womens_clothing = 0;


        data.forEach(element => {
            if (0 <= element.price && element.price <= 100) {
                p0 = p0 + 1;
            }
            else if (101 <= element.price && element.price <= 200) {
                p1++;
            }
            else if (201 <= element.price && element.price <= 300) {
                p2++;
            }
            else if (301 <= element.price && element.price <= 400) {
                p3++;
            }
            else if (401 <= element.price && element.price <= 500) {
                p4++;
            }
            else if (501 <= element.price && element.price <= 600) {
                p5++;
            }
            else if (601 <= element.price && element.price <= 700) {
                p6++;
            }
            else if (701 <= element.price && element.price <= 800) {
                p7++;
            }
            else if (801 <= element.price && element.price <= 900) {
                p8++;
            }
            else if (901 <= element.price) {
                p9++;
            }


            if (element.category == "men's clothing") {
                mans_clothing++;
            } else if (element.category == "women's clothing") {
                womens_clothing++;
            } else if (element.category == "jewelery") {
                jewelery++;
            } else if (element.category == "electronics") {
                electronics++;
            }


            if (element.sold) {
                totalAmount = totalAmount + element.price;
                totalSoldItems = totalSoldItems + 1;
            }
            else {
                totalNotSoldItems = totalNotSoldItems + 1;
            }
        });


        let prodRange = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9]

        let numItems = [
            {mans_clothing_count:mans_clothing},
            {womens_clothing_count:womens_clothing},
            {jewelery_count:jewelery},
            {electronics_count:electronics}
        ]

        monthData = [{
            "Total sale amount of selected month": totalAmount,
            "Total number of sold items of selected month": totalSoldItems,
            "Total number of not sold items of selected month": totalNotSoldItems
        },
            data,
            prodRange,
            numItems
        ]

        res.send(monthData)

    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





app.listen(PORT, () => {
    console.log("server is up and running");
})