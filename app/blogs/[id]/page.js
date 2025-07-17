export default async function BlogDetail({ params }) {
  const res = await fetch(
    `https://wahidfoundationadmin.vercel.app/api/blogs/${params.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div className="p-8 text-center">Blog not found.</div>;
  }

  const blog = await res.json();

  // 👉 Helper to render YouTube section
  const renderYoutube = () => {
    if (!blog.youtubeUrl) return null;

    // If it already contains an <iframe>
    if (blog.youtubeUrl.includes("<iframe")) {
      return (
        <div
          className="w-full mt-8"
          dangerouslySetInnerHTML={{ __html: blog.youtubeUrl }}
        />
      );
    }

    // Otherwise, treat it as a normal URL and embed
    let embedUrl = blog.youtubeUrl;

    // Convert YouTube share links to embed
    if (embedUrl.includes("watch?v=")) {
      embedUrl = embedUrl.replace("watch?v=", "embed/");
    } else if (embedUrl.includes("youtu.be/")) {
      embedUrl = embedUrl.replace("youtu.be/", "www.youtube.com/embed/");
    }

    return (
      <iframe
        src={embedUrl}
        title="YouTube Video"
        className="w-full h-64 md:h-96 rounded-lg"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {blog.imageUrl && (
        <div className="w-full h-80 md:h-[500px] overflow-hidden">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {blog.category && (
        <div className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-2 rounded-full inline-block mx-auto mt-6">
          {blog.category}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          {blog.title}
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Published on {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <div
          className="prose max-w-none mx-auto"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 pb-12">{renderYoutube()}</div>
    </div>
  );
}
