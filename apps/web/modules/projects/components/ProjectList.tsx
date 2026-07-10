import { projects } from "../data";
import ProjectCard from "./ProjectCard";

export default function ProjectList() {
  return (
    <section style={{ display: "grid", gap: 16 }}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}