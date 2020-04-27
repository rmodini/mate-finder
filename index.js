const express = require("express");
const app = express();
const db = require("./utils/db");
const compression = require("compression");
const basicAuth = require("basic-auth");
const helmet = require("helmet");
const secrets = require("./secrets.json");
const cookieParser = require("cookie-parser");

app.use(helmet.xssFilter());

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

app.use(cookieParser());

app.use(express.json());

app.use(express.static("./public"));

const auth = function (req, res, next) {
    const creds = basicAuth(req);
    if (
        !creds ||
        creds.name != process.env.BASIC_AUTH_USER ||
        creds.pass != process.env.BASIC_AUTH_PASS
    ) {
        res.setHeader(
            "WWW-Authenticate",
            'Basic realm="Enter your credentials to see this stuff."'
        );
        res.sendStatus(401);
    } else {
        next();
    }
};

app.get("/locations", (req, res) => {
    db.getLocations()
        .then((result) => {
            res.json(result.rows);
        })
        .catch((e) => {
            console.log("error getting locs", e);
        });
});

app.get("/get-cookie", (req, res) => {
    if (req.cookies.lang) {
        res.json({ lang: req.cookies.lang });
    }
});

app.post("/change-cookie", (req, res) => {
    if (req.body.currentLang == "es") {
        res.cookie("lang", "en");
    } else {
        res.cookie("lang", "es");
    }
    res.json({});
});

app.post("/add-new-loc", (req, res) => {
    db.addPossibleLoc(
        req.body.address,
        req.body.latLng.lat,
        req.body.latLng.lng,
        req.body.name,
        req.body.marketType,
        req.body.mateVar,
        req.body.desc,
        req.body.uploader
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

app.get("/possible-locs", auth, (req, res, next) => {
    next();
});

app.get("/possible-locs-adm", auth, (req, res) => {
    db.getPossibleLocs()
        .then((result) => {
            res.json(result.rows);
        })
        .catch((e) => {
            console.log("error in get poss locs", e);
        });
});

app.post("/accept", auth, (req, res) => {
    db.approveLoc(req.body.id)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((e) => {
            console.log("error in approve", e);
        });
});

app.post("/decline", auth, (req, res) => {
    db.declineLoc(req.body.id)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((e) => {
            console.log("decline in approve", e);
        });
});

app.post("/report", (req, res) => {
    db.insertReport(req.body.text, req.body.contact)
        .then((result) => {
            result.success = true;
            res.json(result);
        })
        .catch((e) => {
            console.log("error in report", e);
            res.json({ error: true });
        });
});

app.get("/reports", auth, (req, res, next) => {
    next();
});

app.get("/reports-adm", auth, (req, res) => {
    db.getReports()
        .then((result) => {
            res.json(result.rows);
        })
        .catch((e) => {
            console.log("error in get reports", e);
        });
});

app.post("/possible-locs", auth, (req, res, next) => {
    next();
});

app.post("/reports-adm", auth, (req, res) => {
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

app.listen(process.env.PORT || 8080, function () {
    console.log("I'm listening.");
});
