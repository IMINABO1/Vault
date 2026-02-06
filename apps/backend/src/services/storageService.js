import { createClient } from '@supabase/supabase-js';

// These should be in your .env file
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const uploadToVault = async (file, userId) => {
  // Create a unique file path: e.g., "user123/id_1707180000.png"
  const fileName = `${userId}/${Date.now()}_${file.originalname}`;

  const { data, error } = await supabase.storage
    .from('documents') // The name of your bucket in Supabase
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (error) throw error;

  // Get the public URL to show the ID in the "Traffic Stop Mode" carousel
  const { data: { publicUrl } } = supabase.storage
    .from('documents')
    .getPublicUrl(fileName);

  return publicUrl;
};