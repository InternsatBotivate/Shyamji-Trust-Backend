import getSupabase from '../config/db.config.js';

export const createCustomer = async (payload) => {
  const { data, error } = await getSupabase()
    .from('customers')
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
};
