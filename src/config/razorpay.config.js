import Razorpay from "razorpay";

let _client = null;

export const getRazorpay = () => {
  if (!_client) {
    _client = new Razorpay({
      key_id: process.env.LIVE_API_KEY,
      key_secret: process.env.LIVE_KEY_SECRET,
    });
  }
  return _client;
};