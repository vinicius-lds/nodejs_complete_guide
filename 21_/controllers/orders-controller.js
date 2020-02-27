const fs = require("fs");
const pathUtils = require("../utils/path-utils");
const PDFDocument = require("pdfkit");
const Order = require("../models/order-model");

module.exports.renderOrdersPage = (req, res, next) => {
  Order.find({ "user.userId": req.session.user._id })
    .then(orders => {
      return res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders: orders
      });
    })
    .catch(err => next(new Error(err)));
};

module.exports.donwloadInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findOne({ "user.userId": req.session.user._id, _id: orderId })
    .then(order => {
      if (!order) {
        return next(new Error("Order not found"));
      } else {
        const fileName = pathUtils.buildFilePath(
          "data",
          "invoices",
          `${orderId}_invoice.pdf`
        );

        const pdfDoc = new PDFDocument();
        pdfDoc.pipe(fs.createWriteStream(fileName));
        pdfDoc.pipe(res);

        res.setHeader(
          "Content-Disposition",
          `inline; filename="${orderId}_invoice.pdf"`
        );

        pdfDoc.fontSize(26).text("Invoice", {
          underline: true
        });

        pdfDoc.text("------------------------");

        let totalPrice = 0;
        order.products.forEach(p => {
          pdfDoc.text(
            `${p.product.title} - ${p.quantity} x $ ${p.product.price}`
          );
          totalPrice += p.quantity * p.product.price;
        });

        pdfDoc.text(`Total price $ ${totalPrice}`);

        pdfDoc.end();

        // const readStream = fs.createReadStream(fileName);
        // // res.setHeader("Content-Type", "application/pdf"); - Does not work with this line, no ideia why
        // res.setHeader(
        //   "Content-Disposition",
        //   `inline; filename="${orderId}_invoice.pdf"`
        // );
        // return readStream.pipe(res);
      }
    })
    .catch(err => next(new Error(err)));
};
