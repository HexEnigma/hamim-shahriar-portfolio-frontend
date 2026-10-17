import ResourcePage from "@/components/dashboard/ResourcePage";
import { categoriesApi, tagsApi } from "@/api/posts";

export default function Taxonomy() {
  return (
    <>
      <h1 className="mb-3">Categories & tags</h1>
      <ResourcePage title="Categories" resourceKey="categories" api={categoriesApi}
        fields={[{ name: "name", label: "Name *", rules: { required: "Name is required." } }, { name: "description", label: "Description" }]}
        columns={[{ key: "name", header: "Name" }, { key: "slug", header: "Slug" }, { key: "posts_count", header: "Published posts" }]} />
      <ResourcePage title="Tags" resourceKey="tags" api={tagsApi}
        fields={[{ name: "name", label: "Name *", rules: { required: "Name is required." } }]}
        columns={[{ key: "name", header: "Name" }, { key: "slug", header: "Slug" }, { key: "posts_count", header: "Published posts" }]} />
    </>
  );
}