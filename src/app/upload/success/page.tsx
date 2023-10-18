import SoundPreview from "@/components/SoundPreview";

export default async function UploadSuccess({
  searchParams,
}: {
  searchParams: { image: string };
}) {
  const { image } = searchParams;

  return (
    <div className="max-w-xl mx-auto p-10 space-y-5">
      <h1 className="font-bold text-xl">Image upload was successful!</h1>
      <img src={image} alt="preview" />
      <SoundPreview image={image} />
    </div>
  );
}
