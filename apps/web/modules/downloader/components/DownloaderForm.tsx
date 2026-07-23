"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import type {
  CreateDownloadInput,
  DownloadPlatform,
} from "../types";

type DownloaderFormProps = {
  onCreate: (input: CreateDownloadInput) => void;
};

const platforms: DownloadPlatform[] = [
  "YouTube",
  "TikTok",
  "Instagram",
  "Facebook",
];

export default function DownloaderForm({
  onCreate,
}: DownloaderFormProps) {
  const [platform, setPlatform] =
    useState<DownloadPlatform>("YouTube");

  const [url, setUrl] = useState("");

  function handleSubmit() {
    if (!url.trim()) return;

    onCreate({
      platform,
      url,
    });

    setUrl("");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        marginBottom: 20,
      }}
    >
      <select
        value={platform}
        onChange={(e) =>
          setPlatform(
            e.target.value as DownloadPlatform
          )
        }
        className="creator-input"
      >
        {platforms.map((platform) => (
          <option
            key={platform}
            value={platform}
          >
            {platform}
          </option>
        ))}
      </select>

      <Input
        value={url}
        onChange={setUrl}
        placeholder="Cole a URL do vídeo"
      />

      <Button onClick={handleSubmit}>
        Iniciar Download
      </Button>
    </div>
  );
}