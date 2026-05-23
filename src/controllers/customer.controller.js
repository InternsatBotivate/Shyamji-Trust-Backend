import { createCustomer } from '../services/customer.service.js';

export const submitCustomer = async (req, res) => {
  const {
    name,
    phone_no,
    address,
    aadhaar_no,
    illness,
    remarks,
    donation_amount,
    meet_mahant_ji,
    total_amount,
    mahant_meeting_amount,
  } = req.body;

  if (!name?.trim())
    return res.status(400).json({ error: 'Name is required' });
  if (!phone_no || String(phone_no).replace(/\D/g, '').length !== 10)
    return res.status(400).json({ error: 'Valid 10-digit phone number is required' });
  if (!address?.trim())
    return res.status(400).json({ error: 'Address is required' });
  if (donation_amount == null)
    return res.status(400).json({ error: 'Donation amount is required' });
  if (total_amount == null)
    return res.status(400).json({ error: 'Total amount is required' });

  const customer = await createCustomer({
    name: name.trim(),
    phone_no: String(phone_no).replace(/\D/g, ''),
    address: address.trim(),
    aadhaar_no: aadhaar_no?.trim() || null,
    illness: illness?.trim() || null,
    remarks: remarks?.trim() || '',
    donation_amount: parseFloat(donation_amount) || 0,
    meet_mahant_ji: Boolean(meet_mahant_ji),
    total_amount: parseFloat(total_amount) || 0,
    mahant_meeting_amount: parseFloat(mahant_meeting_amount) || 0,
  });

  return res.status(201).json({ success: true, data: customer });
};
