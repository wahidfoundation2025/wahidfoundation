import Head from 'next/head';

export default async function BlogDetail({ params }) {
  const res = await fetch(
    `https://wahidfoundationadmin-seven.vercel.app/api/blogs/${params.id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    return <div className="p-8 text-center text-gray-900">Blog not found.</div>;
  }

  const blog = await res.json();

  // Helper to render YouTube section
  const renderYoutube = () => {
    if (!blog.youtubeUrl) return null;

    // If it already contains an <iframe>
    if (blog.youtubeUrl.includes('<iframe')) {
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
    if (embedUrl.includes('watch?v=')) {
      embedUrl = embedUrl.replace('watch?v=', 'embed/');
    } else if (embedUrl.includes('youtu.be/')) {
      embedUrl = embedUrl.replace('youtu.be/', 'www.youtube.com/embed/');
    }

    // Basic validation to ensure it's a valid URL
    try {
      new URL(embedUrl);
    } catch {
      return null; // Skip invalid URLs
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
    <>
      <Head>
        <title>{blog.metaTitle || blog.title}</title>
        <meta
          name="description"
          content={blog.metaDescription || 'Read this blog post on our site.'}
        />
        {blog.ogTitle && <meta property="og:title" content={blog.ogTitle} />}
        {blog.ogDescription && (
          <meta property="og:description" content={blog.ogDescription} />
        )}
        {blog.ogImage && <meta property="og:image" content={blog.ogImage} />}
        {blog.schemaMarkup && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blog.schemaMarkup) }}
          />
        )}
      </Head>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {blog.imageUrl && (
          <div className="w-full h-80 md:h-[500px] overflow-hidden">
            <img
              src={blog.imageUrl}
              alt={blog.imageAlt || blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {blog.categories && blog.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mx-auto mt-6 max-w-4xl px-4">
            {blog.categories.map((category) => (
              <span
                key={category}
                className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-2 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        {blog.targetKeywords && blog.targetKeywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mx-auto mt-4 max-w-4xl px-4">
            {blog.targetKeywords.map((keyword) => (
              <span
                key={keyword}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
            {blog.title}
          </h1>
          <div className="text-sm text-gray-500 text-center mb-8">
            <p>
              Published on {new Date(blog.createdAt).toLocaleDateString()}
              {blog.authorName && ` by ${blog.authorName}`}
            </p>
          </div>
          {renderYoutube()}
          <div
            className="prose max-w-none mx-auto"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </>
  );
}