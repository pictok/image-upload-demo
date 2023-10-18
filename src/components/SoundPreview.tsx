"use client";

import { useState } from "react";
import ConvertButton from "./ConvertButton";
import { supabase } from "@/db/supabase";

export default function SoundPreview({ image }: { image: string }) {
  const [sound, setSound] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const handleConversionToSound = async () => {
    setIsConverting(true);
    const res1 = await fetch("/api/generate/classification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });

    const data = await res1.json();

    const caption = String(data.output);

    const res2 = await fetch("/api/generate/sound", {
      method: "POST",
      body: JSON.stringify({ caption }),
    });
    const { output } = await res2.json();
    setSound(output);
    const audio = new Audio(output);
    await audio.play();
    setIsConverting(false);
    const res3 = await fetch(output);
    const blob = await res3.blob();
    const audioName = `${Math.random()}.mp3`.replace("/", "");

    const { error: SoundUploadError } = await supabase.storage
      .from("audio")
      .upload(audioName, blob);
    if (SoundUploadError) console.log(SoundUploadError);

    const audioPath =
      "https://bmtbohuzvkdifffdwayv.supabase.co/storage/v1/object/public/audio/";

    const { error: CreateImgAudioLinkError } = await supabase
      .from("image_audio")
      .insert([
        { user_id: 1, image_url: image, audio_url: audioPath + audioName },
      ])
      .select();
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
