import ProjectsClient from "../../components/ProjectClient";

export default async function ProjectsPage({ searchParams }) {
  const { title } = await searchParams;
  return <ProjectsClient title={title} />;
}
