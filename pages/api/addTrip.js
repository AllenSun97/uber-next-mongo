import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Uber-Clone");

  const user = req.query.user;
  const from = req.query.from;
  const to = req.query.to;
  const car = req.query.car;
  const price = req.query.price;

  const response = await db
    .collection("trips")
    .insertOne({ user, from, to, car, price });
  res.json(response);
}
