"use client";

import { useState } from "react";
import ConvertButton from "./ConvertButton";
import { supabase } from "@/db/supabase";
import { getCaption } from "@/helpers/getCaption";
import { getSound } from "@/helpers/getSound";

export default function SoundPreview({ image }: { image: string }) {
  const [sound, setSound] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const handleConversionToSound = async () => {
    setIsConverting(true);

    // get caption from image url
    const res1 = await getCaption(image);
    const data = await res1.json();
    const caption = String(data.output);

    // get sound from caption
    const res2 = await getSound(caption);
    const { output } = await res2.json();
    setSound(output);

    const audio = new Audio(output);
    await audio.play();

    setIsConverting(false);

    // upload sound to supabase storage
    const res3 = await fetch(output);
    const blob = await res3.blob();
    const audioName = `${Math.random()}.mp3`.replace("/", "");
    const { error: SoundUploadError } = await supabase.storage
      .from("audio")
      .upload(audioName, blob);
    if (SoundUploadError) console.log(SoundUploadError);

    // insert image and audio url to supabase
    const audioPath =
      "https://bmtbohuzvkdifffdwayv.supabase.co/storage/v1/object/public/audio/";
    const { error: CreateImgAudioLinkError } = await supabase
      .from("image_audio")
      .insert([
        { user_id: 1, image_url: image, audio_url: audioPath + audioName },
      ])
      .select();
    if (CreateImgAudioLinkError) console.log(CreateImgAudioLinkError);
  };
  return (
    <div>
      <ConvertButton
        onClick={handleConversionToSound}
        isConverting={isConverting}
      />
      {isConverting && <p>Converting...</p>}
      {!isConverting && sound.length > 0 && (
        <audio controls className="mt-5 mx-auto">
          <source src={sound} />
        </audio>
      )}
    </div>
  );
}
