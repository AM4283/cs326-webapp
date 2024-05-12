/**
 * @fileoverview Configuration and setup of the PouchDB database.
 */

import PouchDB from 'pouchdb';

/**
 * Creates and configures an instance of PouchDB to interact with the local database.
 * @type {PouchDB}
 */
const db = new PouchDB('database');

export default db;