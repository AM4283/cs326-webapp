import PouchDB from "pouchdb";
/**
 * Creates a PouchDB database instance.
 * @type {PouchDB.Database}
 */
const db = new PouchDB("database");

export default db;