import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Uber-Clone");

  const name = req.query.name;
  const address = req.query.address;

  const response = await db
    .collection("stored_locations")
    .insertOne({ name: name, address: address });
  res.json(response);
}
