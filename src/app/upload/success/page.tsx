import ConvertButton from "@/components/ConvertButton";
import { supabase } from "@/db/supabase";

export default async function UploadSuccess({
  searchParams,
}: {
  searchParams: { image: string };
}) {
  const { image } = searchParams;
  const { data } = await supabase.storage
    .from("public-bucket")
    .getPublicUrl(image);
  if (!data) return;
  const imageURL = data.publicUrl;
  return (
    <div className="max-w-xl mx-auto p-10 space-y-5">
      <h1 className="font-bold text-xl">Image upload was successful!</h1>
      <img src={image} alt="preview" />
      <ConvertButton />
    </div>
  );
}
