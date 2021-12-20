// const functions = require("firebase-functions");

// const stripe = require("stripe")(
//   "sk_test_51K80kYDZj1XnOtW36hkANtlpEP8A5kQbbxVwUkVzOVByBuFu7Qme1rusEu12aKp5KOuTmdFCxjsi2y6n6137gPmn00PMug3dVn"
// );

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

// const session = await stripe.checkout.sessions.create({
//   success_url: "https://example.com/success",
//   cancel_url: "https://example.com/cancel",
//   line_items: [{ price: "price_H5ggYwtDq4fbrJ", quantity: 2 }],
//   mode: "payment",
// });
