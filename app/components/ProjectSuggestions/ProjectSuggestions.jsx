import Image from 'next/image';
import Link from 'next/link';

export default function ProjectSuggestions({ suggestedProjects }) {
  if (!suggestedProjects?.length) return null;

  return (
    <section className="projectSuggestionsSection" aria-label="More projects">
      <h2 className="projectSuggestionsTitle">You might also like</h2>
      <p className="projectSuggestionsSubtitle">Explore more of my work</p>
      <div className="projectSuggestionsGrid">
        {suggestedProjects.map((project) => {
          const href = `/projects/${project.projectSlug ?? project.id}`;
          const canView = !!project.projectSlug;
          return (
            <article key={project.id} className="projectSuggestionsCard">
              <div className="projectSuggestionsCardImageWrap">
                {canView ? (
                  <Link href={href} className="projectSuggestionsCardImageLink" aria-label={`View project: ${project.title}`}>
                    <div className="projectSuggestionsCardImageInner">
                      <Image
                        src={project.image}
                        alt=""
                        width={400}
                        height={225}
                        className="projectSuggestionsCardImage"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="projectSuggestionsCardImageInner">
                    <Image
                      src={project.image}
                      alt=""
                      width={400}
                      height={225}
                      className="projectSuggestionsCardImage"
                    />
                  </div>
                )}
              </div>
              <div className="projectSuggestionsCardContent">
                <h3 className="projectSuggestionsCardTitle">{project.title}</h3>
                <div className="projectSuggestionsCardTags">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="projectSuggestionsCardTag">
                      {tag}
                    </span>
                  ))}
                </div>
                {canView ? (
                  <Link href={href} className="projectSuggestionsCardButton">
                    View Project
                  </Link>
                ) : (
                  <span className="projectSuggestionsCardButton projectSuggestionsCardButtonDisabled" aria-disabled="true">
                    Coming Soon
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
