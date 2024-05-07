import PouchDB from "pouchdb";

const db = new PouchDB("counters");

export async function saveCartItem(name, count) {
  await db.put({ _id: name, count });
}

export async function updateCartItem(doc) {
  await db.put(doc);
}

export async function loadCartItem(name) {
  const counter = await db.get(name);
  return counter;
}

export async function removeCartItem(name) {
  db.remove(name);
}

/**
 * Asynchronously retrieves all counters from the database.
 *
 * @async
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of
 * counter documents.
 * @throws {Error} - Throws an error if there is a problem accessing the
 * database.
 */
export async function loadAllCartItems() {
  const result = await db.allDocs({ include_docs: true });
  return result.rows.map((row) => row.doc);
}
