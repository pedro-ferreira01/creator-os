export type DownloadProcessorResult = {
  title: string | null;
  thumbnailUrl: string | null;
  fileName: string | null;
  fileUrl: string | null;

  /**
   * ID do Run do Apify quando o processamento
   * continua de forma assíncrona.
   */
  apifyRunId?: string | null;
};