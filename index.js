const express = require("express");
const app = express();
const db = require("./utils/db");
const compression = require("compression");

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.json());

app.use(express.static("./public"));

app.get("/locations", (req, res) => {
    db.getLocations()
        .then((result) => {
            res.json(result.rows);
        })
        .catch((e) => {
            console.log("error getting locs", e);
        });
});

app.post("/add-new-loc", (req, res) => {
    console.log("req", req.body);
    db.addPossibleLoc(
        req.body.address,
        req.body.latLng.lat,
        req.body.latLng.lng,
        req.body.name,
        req.body.marketType,
        req.body.mateVar,
        req.body.desc
    )
        .then((result) => {
            result.success = true;
            res.json(result);
        })
        .catch((e) => {
            console.log("error adding new loc", e);
            res.json({ error: true });
        });
});

app.get("/possible-locs-adm", (req, res) => {
    db.getPossibleLocs()
        .then((result) => {
            console.log("res from get poss locs", result.rows);
            res.json(result.rows);
        })
        .catch((e) => {
            console.log("error in get poss locs", e);
        });
});

app.post("/accept", (req, res) => {
    console.log("req.body.id", req.body.id);
    db.approveLoc(req.body.id)
        .then((result) => {
            console.log("res from approve", result.rows);
            res.json(result.rows);
        })
        .catch((e) => {
            console.log("error in approve", e);
        });
});

app.post("/decline", (req, res) => {
    console.log("req.body.id", req.body.id);
    db.declineLoc(req.body.id)
        .then((result) => {
            console.log("res from decline", result.rows);
            res.json(result.rows);
        })
        .catch((e) => {
            console.log("decline in approve", e);
        });
});

app.post("/report", (req, res) => {
    console.log(req.body);
    db.insertReport(req.body.text, req.body.contact)
        .then((result) => {
            result.success = true;
            res.json(result);
        })
        .catch((e) => {
            console.log("error in report", e);
        });
});

app.get("/reports-adm", (req, res) => {
    db.getReports()
        .then((result) => {
            res.json(result.rows);
        })
        .catch((e) => {
            console.log("error in get reports", e);
        });
});

app.post("/reports-adm", (req, res) => {
    db.deleteReports()
        .then((result) => {
            res.json(result.rows);
        })
        .catch((e) => {
            console.log("error in get reports", e);
        });
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
