import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar/Navbar';
import ProjectHeroScrollEffect from '../../components/ProjectHeroScrollEffect/ProjectHeroScrollEffect';
import ProjectHeroTabbedContent from '../../components/ProjectHeroTabbedContent/ProjectHeroTabbedContent';
import ProjectSlugSetter from '../../components/ProjectSlugSetter/ProjectSlugSetter';
import { getProjectById, getCategoryLabel, getSuggestedProjects } from '../../data/projects';
import ProjectSuggestions from '../../components/ProjectSuggestions/ProjectSuggestions';
import '../../styles/page.css';
import '../../styles/projects.css';

export const dynamic = 'force-dynamic';

function HeroLayout({ project, suggestedProjects }) {
  const metaRow1 = [project.role, project.team, project.timeline].filter(Boolean);
  const metaRow2 = [project.industry, project.tools].filter(Boolean);
  const featuresLeft = project.features?.filter((f) => f.side === 'left') ?? [];
  const featuresRight = project.features?.filter((f) => f.side === 'right') ?? [];

  return (
    <section
      className="projectDetailSection projectHeroSection"
      data-project={project.projectSlug ?? project.id}
    >
      <div className="projectHeroContainer">
        <div className="projectHeroSectionReveal">
          <Link href="/projects" className="projectDetailBack">
            ← Back to Projects
          </Link>

          {/* Hero: title, tagline, underline, CTA */}
          <div className="projectHeroBlock">
          <div className="projectHeroText">
            <h1 className="projectHeroTitle">{project.title}</h1>
            <p className="projectHeroTagline">{project.subtitle ?? project.description}</p>
            <div className="projectHeroUnderline" aria-hidden />
          </div>
          {project.prototypeUrl && (
            <a
              href={project.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="projectHeroCta"
            >
              <span className="projectHeroCtaText">View Hifi Prototype</span>
            </a>
          )}
          {project.playGameUrl && (
            <a
              href={project.playGameUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="projectHeroCta projectHeroCtaPlayGame"
            >
              <span className="projectHeroCtaPlayGameText">Play Game</span>
            </a>
          )}
        </div>

        {/* Metadata pills – two rows */}
        <div className="projectHeroMeta">
          <div className="projectHeroMetaRow">
            {metaRow1.map((text) => (
              <span key={text} className="projectHeroPill">
                {text}
              </span>
            ))}
          </div>
          <div className="projectHeroMetaRow">
            {metaRow2.map((text) => (
              <span key={text} className="projectHeroPill">
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Feature showcase – banner image or legacy two-slot layout */}
        {project.featureBannerImage ? (
          <div className="projectHeroFeatureBannerWrap">
            <Image
              src={project.featureBannerImage}
              alt={project.projectSlug === 'teatiny' ? 'TeaTiny can design' : project.projectSlug === 'the-unseen-vietnam' ? 'The Unseen Vietnam magazine mock up' : project.projectSlug === 'crimson-gold' ? 'Crimson & Gold poster series' : project.projectSlug === 'space-animal' ? 'Space Animals game' : 'Project overview'}
              width={1200}
              height={600}
              className="projectHeroFeatureBanner"
            />
          </div>
        ) : (
          project.featureHeading && (
            <div className="projectHeroFeatureBlock">
              <h2 className="projectHeroFeatureHeading">{project.featureHeading}</h2>
              <div className="projectHeroFeatureImages">
                <div className="projectHeroFeatureImageWrap projectHeroFeatureImageLeft">
                  {project.featureImageLeft ? (
                    <Image src={project.featureImageLeft} alt="" width={260} height={520} className="projectHeroFeatureImage" />
                  ) : (
                    <div className="projectHeroFeaturePlaceholder" aria-hidden />
                  )}
                  <ul className="projectHeroFeatureLabels projectHeroFeatureLabelsLeft" aria-hidden>
                    {featuresLeft.map((f) => (
                      <li key={f.label}>
                        <span className="projectHeroFeatureCheck" aria-hidden>✓</span>
                        {f.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="projectHeroFeatureImageWrap projectHeroFeatureImageRight">
                  {project.featureImageRight ? (
                    <Image src={project.featureImageRight} alt="" width={260} height={520} className="projectHeroFeatureImage" />
                  ) : (
                    <div className="projectHeroFeaturePlaceholder" aria-hidden />
                  )}
                  <ul className="projectHeroFeatureLabels projectHeroFeatureLabelsRight" aria-hidden>
                    {featuresRight.map((f) => (
                      <li key={f.label}>
                        <span className="projectHeroFeatureCheck" aria-hidden>✓</span>
                        {f.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        )}

        </div>

        {/* Post-hero: tabs (Introduction / Progress / Key Achievements). Core Values, Key Features, Final Product, App Interaction only when Introduction tab is active. */}
        {project.tabs && (
          <ProjectHeroTabbedContent project={project} />
        )}

        <ProjectSuggestions suggestedProjects={suggestedProjects} />
      </div>
    </section>
  );
}

function DefaultLayout({ project, categoryLabel, suggestedProjects }) {
  return (
    <section className="projectDetailSection">
      <div className="projectDetailContainer">
        <Link href="/projects" className="projectDetailBack">
          ← Back to Projects
        </Link>
        <div className="projectDetailImageWrap">
          <Image
            src={project.image}
            alt=""
            width={900}
            height={506}
            className="projectDetailImage"
            priority
          />
        </div>
        <div className="projectDetailMeta">
          <span className="projectDetailCategory">{categoryLabel}</span>
          <h1 className="projectDetailTitle">{project.title}</h1>
          <div className="projectDetailTags">
            {project.tags.map((tag) => (
              <span key={tag} className="projectDetailTag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="projectDetailDescription">
          <p>{project.description}</p>
        </div>
        <ProjectSuggestions suggestedProjects={suggestedProjects} />
      </div>
    </section>
  );
}

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = typeof params.then === 'function' ? await params : params;
  const project = getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  const categoryLabel = getCategoryLabel(project.category);
  const suggestedProjects = getSuggestedProjects(project);
  const useHeroLayout = project.layout === 'hero';

  return (
    <main className="relative min-h-screen" data-project-slug={project.projectSlug ?? ''}>
      <ProjectSlugSetter projectSlug={project.projectSlug} />
      <div className="fixed inset-0 -z-10 mainBackground" />
      <Navbar />
      {useHeroLayout && <ProjectHeroScrollEffect />}
      {useHeroLayout ? (
        <HeroLayout project={project} suggestedProjects={suggestedProjects} />
      ) : (
        <DefaultLayout project={project} categoryLabel={categoryLabel} suggestedProjects={suggestedProjects} />
      )}
    </main>
  );
}
