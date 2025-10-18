import Image from 'next/image';
import Link from 'next/link';

function SectionHeader({ title, eyebrow, description, id }) {
  return (
    <header className="max-w-3xl">
      {eyebrow && (
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-amber-400">{eyebrow}</p>
      )}
      <h2 id={id} className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-white/70 leading-relaxed">{description}</p>
      )}
    </header>
  );
}

function ProjectsSection({ projects }) {
  if (!projects?.length) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24" aria-labelledby="projects-heading">
      <div className="px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          title="Projects that explore intelligence in the wild"
          id="projects-heading"
          description="A mix of research prototypes and production builds spanning reinforcement learning, security, and developer tooling."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map(project => (
            <article
              key={project._id}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-amber-300/60 hover:bg-white/10"
            >
              {project.imageUrl && (
                <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1280px) 350px, (min-width: 640px) 45vw, 90vw"
                    priority={false}
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                {project.description && (
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{project.description}</p>
                )}
                {project.gitLink && (
                  <Link
                    href={project.gitLink}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-300 hover:text-amber-200"
                  >
                    View source
                    <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceList({ title, entries }) {
  if (!entries?.length) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 border-t border-white/10" aria-labelledby={`${title.toLowerCase()}-heading`}>
      <div className="px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow={title === 'Research' ? 'Inquiry' : 'Impact'}
          title={title === 'Research' ? 'Research that translates ideas into results' : 'Leadership & recognition'}
          id={`${title.toLowerCase()}-heading`}
          description={
            title === 'Research'
              ? 'Rigorous experiments, reproducible pipelines, and practical applications of machine learning.'
              : 'Communities and teams I have supported while growing as an engineer and mentor.'
          }
        />

        <div className="mt-12 space-y-8">
          {entries.map((entry, index) => (
            <article key={`${entry.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{entry.title || entry.role}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">{entry.date}</p>
              </div>
              {entry.company && (
                <p className="mt-1 text-sm font-medium text-amber-300">{entry.company}</p>
              )}
              {entry.description && (
                <p className="mt-4 text-sm leading-relaxed text-white/70">{entry.description}</p>
              )}
              {entry.points && (
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {entry.points.map((point, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-400" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection({ technicalSkills }) {
  if (!technicalSkills?.length) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 border-t border-white/10" aria-labelledby="skills-heading">
      <div className="px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Toolkit"
          title="Skills spanning the ML stack"
          id="skills-heading"
          description="Languages, frameworks, and platforms I rely on when building intelligent products."
        />

        <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technicalSkills.map((group, idx) => (
            <div key={group.category || idx} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">{group.category}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-white/70">
                {Array.isArray(group.skills) ? group.skills.join(', ') : group.skills}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function EducationSection({ education }) {
  if (!education) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 border-t border-white/10" aria-labelledby="education-heading">
      <div className="px-6 sm:px-10 lg:px-16 flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="flex-1">
          <SectionHeader
            eyebrow="Foundation"
            title="Education"
            id="education-heading"
            description="A strong theoretical grounding in computer science paired with self-driven exploration."
          />
        </div>
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{education.university}</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{education.degree}</h3>
          <p className="mt-2 text-sm text-white/70">{education.date}</p>
          {education.courses && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Key coursework</p>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-white/70 sm:grid-cols-2">
                {education.courses.map(course => (
                  <li key={course} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-400" aria-hidden />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function BlogSection({ posts }) {
  if (!posts?.length) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 border-t border-white/10" aria-labelledby="blog-heading">
      <div className="px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Writing"
          title="Sharing what I am learning"
          id="blog-heading"
          description="Short reflections on experiments, research takeaways, and community projects."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map(post => (
            <article key={post._id} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-xl font-semibold text-white">
                <Link href={`/blog/${post.slug?.current ?? ''}`} className="hover:text-amber-300">
                  {post.title}
                </Link>
              </h3>
              {post.shortDescription && (
                <p className="mt-3 text-sm leading-relaxed text-white/70">{post.shortDescription}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-white/40">
                <time dateTime={post.publishedAt}>
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    year: 'numeric'
                  }) : 'Soon'}
                </time>
                {post.topics?.map(topic => (
                  <span key={topic} className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] tracking-[0.2em]">
                    {topic}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ images }) {
  if (!images?.length) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 border-t border-white/10" aria-labelledby="gallery-heading">
      <div className="px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Visuals"
          title="Studio snapshots"
          id="gallery-heading"
          description="Moments from builds-in-progress, events, and late-night experiments."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map(image => (
            <figure key={image._id} className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image
                src={image.imageUrl}
                alt={image.title || 'Portfolio image'}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 90vw"
              />
              {image.title && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-black/60 px-4 py-2 text-xs font-medium text-white">
                  {image.title}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialLinks({ socialLinks }) {
  const entries = Object.entries(socialLinks || {}).filter(([, value]) => Boolean(value));
  if (!entries.length) {
    return null;
  }

  return (
    <section className="border-t border-white/10">
      <div className="px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Let&apos;s stay in touch</p>
          <nav aria-label="Social links" className="flex flex-wrap gap-4 text-sm font-medium text-amber-300">
            {entries.map(([network, url]) => (
              <Link key={network} href={url} className="transition hover:text-amber-200">
                {network}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

export default function SummaryContent({
  projects,
  blogPosts,
  sneakPeekImages,
  education,
  researchExperience,
  leadershipAndAwards,
  technicalSkills,
  socialLinks
}) {
  return (
    <main className="bg-black text-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-black via-black to-[#090909]">
        <div className="px-6 pb-16 pt-24 sm:px-10 sm:pb-24 sm:pt-32 lg:px-16">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Pratham Patel</p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Building machine learning products that feel thoughtfully engineered.
            </h1>
            <p className="mt-6 text-base text-white/70 leading-relaxed sm:text-lg">
              AI/ML engineer and researcher focused on reinforcement learning, language models, and the tooling that makes them
              reliable. Currently studying Computer Science at Gannon University and collaborating with teams who care about
              shipping polished experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
              <Link
                href="/home"
                className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-black transition hover:bg-amber-200"
              >
                Explore portfolio
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-white transition hover:border-amber-300/60"
              >
                View full project index
              </Link>
            </div>
          </div>

          <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Focus areas</dt>
              <dd className="mt-3 text-sm text-white/80">Reinforcement learning, LLM reasoning, security</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Experience</dt>
              <dd className="mt-3 text-sm text-white/80">Research + production builds across academia & startups</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Community</dt>
              <dd className="mt-3 text-sm text-white/80">Founder of Gannon Codex Programming Club</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Location</dt>
              <dd className="mt-3 text-sm text-white/80">Erie, Pennsylvania</dd>
            </div>
          </dl>
        </div>
      </div>

      <ProjectsSection projects={projects} />
      <ExperienceList title="Research" entries={researchExperience} />
      <ExperienceList title="Leadership" entries={leadershipAndAwards} />
      <EducationSection education={education} />
      <SkillsSection technicalSkills={technicalSkills} />
      <BlogSection posts={blogPosts} />
      <GallerySection images={sneakPeekImages} />
      <SocialLinks socialLinks={socialLinks} />
    </main>
  );
}
