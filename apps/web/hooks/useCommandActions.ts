import { scrollToSection } from "@/lib/scroll";

type UseCommandActionsProps = {
  closePalette: () => void;

  setShowCreateForm: (value: boolean) => void;

  setFocusWorkspaceSearch: (value: boolean) => void;

  setFocusProjectName: (value: boolean) => void;
};

export function useCommandActions({
  closePalette,
  setShowCreateForm,
  setFocusWorkspaceSearch,
  setFocusProjectName,
}: UseCommandActionsProps) {
  function executeCommand(action: string) {
    closePalette();

    switch (action) {
      case "dashboard":
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        break;

      case "workspace":
        setFocusWorkspaceSearch(true);

        scrollToSection("workspace-section");

        break;

      case "downloader":
       scrollToSection("downloader-section");

        break;

      case "new-project":
        setShowCreateForm(true);

        setFocusProjectName(true);

        scrollToSection("workspace-section");
        break;

      case "new-download":
        alert(
          "Novo Download (será conectado na próxima Sprint)"
        );
        break;

      default:
        console.log(action);
    }
  }

  return {
    executeCommand,
  };
}