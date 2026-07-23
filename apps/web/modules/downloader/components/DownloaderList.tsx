import DownloadCard from "./DownloadCard";

import type { DownloadItem } from "../types";

type DownloaderListProps = {
  downloads: DownloadItem[];
  onDelete: (id: string) => void;
  onPrimaryAction: (id: string) => void;
};

export default function DownloaderList({
  downloads,
  onDelete,
  onPrimaryAction,
}: DownloaderListProps) {
  return (
    <div className="list">
      {downloads.map((item) => (
        <DownloadCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onPrimaryAction={onPrimaryAction}
        />
      ))}
    </div>
  );
}