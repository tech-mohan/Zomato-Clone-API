
const Payment = require('../Models/payment'); 

exports.handlePayment= (req, res) => {
  try {
    const { amount, userMail } = req.body;

    const paymentGatewayResponse =  makePaymentRequest(amount, userMail);

    const payment = new Payment({
      amount,
      userMail,
    });

    const savedPayment =  payment.save();

    res.status(200).json({
      message: 'Payment request created successfully',
      paymentGatewayResponse,
      payment: savedPayment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// const stripe = require("stripe")("sk_test_51IpCbmSDFH7JnKZtJgxKEJOKiiwoVkvhSeaszFnLoHMtMyOr51dBDQxyzZfsw2PYGbXD5vIYN4W0HNnslMXu9iDZ00JH0yLuwM");
// const uuid = require("uuid").v4; 

// exports.handlePayment = (req,res) => {
//     const { product, token, subTotal } = req.body;
//   console.log("PRODUCT ", product);
//   console.log("PRICE ", subTotal);
  
//   const idempontencyKey = uuid();

//   return stripe.customers
//     .create({
//       email: token.email,
//       source: token.id
//     })
//     .then(customer => {
//       stripe.charges.create(
//         {
//           amount: subTotal,
//           currency: "inr",
//           customer: customer.id,
//           receipt_email: token.email,
//           description: `purchase of ${product}`,
//           shipping: {
//             name: token.card.name,
//             address: {
//               country: token.card.address_country
//             }
//           }
//         },
//         { idempontencyKey }
//       );
//     })
//     .then(result => res.status(200).json(result))
//     .catch(err => console.log(err));

// }