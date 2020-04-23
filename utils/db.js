const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/matefinder"
);

module.exports.getLocations = () => {
    const q = `
    SELECT * FROM locations
    WHERE approved = true
    ;`;
    return db.query(q);
};

module.exports.addPossibleLoc = (
    address,
    lat,
    lng,
    name,
    marketType,
    mateVar,
    desc
) => {
    const q = `
    INSERT INTO locations (address,
    lat,
    lng,
    name,
    market_type,
    mate_var,
    descr)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ;`;
    const params = [address, lat, lng, name, marketType, mateVar, desc];
    return db.query(q, params);
};

module.exports.getPossibleLocs = () => {
    const q = `
    SELECT * FROM locations
    WHERE approved = false
    LIMIT 20
    ;`;
    return db.query(q);
};

module.exports.approveLoc = (id) => {
    const q = `
    UPDATE locations
    SET approved = true
    WHERE id = $1
    ;`;
    params = [id];
    return db.query(q, params);
};

module.exports.declineLoc = (id) => {
    const q = `
    DELETE FROM locations
    WHERE id = $1
    ;`;
    params = [id];
    return db.query(q, params);
};

module.exports.insertReport = (text, contact) => {
    const q = `
    INSERT INTO reports (text, contact)
    VALUES ($1, $2)
    ;`;
    params = [text, contact];
    return db.query(q, params);
};

module.exports.getReports = () => {
    const q = `
    SELECT * FROM reports
    LIMIT 50
    ;`;
    return db.query(q);
};

module.exports.deleteReports = () => {
    const q = `
    DELETE FROM reports
    ;`;
    return db.query(q);
};
