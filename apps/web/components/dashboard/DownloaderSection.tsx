import { forwardRef } from "react";

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

const DownloaderSection = forwardRef<
  HTMLElement,
  DownloaderSectionProps
>(function DownloaderSection({
  downloads,
  onCreate,
  onDelete,
  onPrimaryAction,
}: DownloaderSectionProps, ref) {
  return (
    <div id="downloader-section">
 <Card
  ref={ref}
  title="Downloader"
>
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
});
export default DownloaderSection;