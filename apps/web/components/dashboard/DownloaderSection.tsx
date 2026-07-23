import Card from "@/components/ui/Card";

import {
  DownloaderForm,
  DownloaderList,
} from "@/modules/downloader";

import type {
  DownloadItem,
  CreateDownloadInput,
} from "@/modules/downloader";

type DownloaderSectionProps = {
  downloads: DownloadItem[];

  onCreate: (input: CreateDownloadInput) => void;

  onDelete: (id: string) => void;

  onPrimaryAction: (id: string) => void;
};

export default function DownloaderSection({
  downloads,
  onCreate,
  onDelete,
  onPrimaryAction,
}: DownloaderSectionProps) {
  return (
    <div id="downloader-section">
  <Card title="Downloader">
      <DownloaderForm
        onCreate={onCreate}
      />

            <DownloaderList
        downloads={downloads}
        onDelete={onDelete}
        onPrimaryAction={onPrimaryAction}
      />
    </Card>
</div>
  );
}