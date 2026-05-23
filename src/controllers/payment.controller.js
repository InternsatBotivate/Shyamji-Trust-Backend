import { createOrderService, verifyPaymentService, scanPaymentService } from "../services/payment.service.js";

export const createOrder = async (req, res) => {
  const { customer_id, total_amount } = req.body;

  if (!customer_id)
    return res.status(400).json({ error: "customer_id is required" });
  if (!total_amount || Number(total_amount) <= 0)
    return res.status(400).json({ error: "Valid total_amount is required" });

  const result = await createOrderService(customer_id, Number(total_amount));
  return res.status(201).json({ success: true, data: result });
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
    return res.status(400).json({ error: "razorpay_order_id, razorpay_payment_id, and razorpay_signature are all required" });

  const payment = await verifyPaymentService({ razorpay_order_id, razorpay_payment_id, razorpay_signature });
  return res.json({ success: true, data: payment });
};

export const scanPayment = async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) return res.status(400).json({ error: "orderId is required" });

  const result = await scanPaymentService(orderId);
  return res.json({ success: true, data: result });
};
