export type Command = {
  id: string;
  title: string;
  subtitle: string;
  action: string;
};

export const commands: Command[] = [
  {
    id: "new-project",
    title: "Novo Projeto",
    subtitle: "Criar um projeto no Workspace",
    action: "new-project",
  },
  {
    id: "new-download",
    title: "Novo Download",
    subtitle: "Adicionar um download",
    action: "new-download",
  },
  {
    id: "workspace",
    title: "Workspace",
    subtitle: "Ir para a seção Workspace",
    action: "workspace",
  },
  {
    id: "downloader",
    title: "Downloader",
    subtitle: "Ir para a seção Downloader",
    action: "downloader",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    subtitle: "Voltar ao topo da página",
    action: "dashboard",
  },
];