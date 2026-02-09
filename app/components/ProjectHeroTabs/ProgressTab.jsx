'use client';

import { useState } from 'react';
import Image from 'next/image';

function bulletWithBold(text, boldPhrases = []) {
  if (!boldPhrases.length) return text;
  const parts = [];
  let remaining = text;
  for (const phrase of boldPhrases) {
    const i = remaining.indexOf(phrase);
    if (i === -1) continue;
    parts.push({ text: remaining.slice(0, i), bold: false });
    parts.push({ text: phrase, bold: true });
    remaining = remaining.slice(i + phrase.length);
  }
  parts.push({ text: remaining, bold: false });
  return parts;
}

function BulletList({ items, boldPhrases = [] }) {
  return (
    <ul className="progressCardList">
      {items.map((text, i) => {
        const parts = bulletWithBold(text, boldPhrases);
        return (
          <li key={i}>
            {Array.isArray(parts) ? (
              parts.map((part, j) =>
                part.bold ? <strong key={j}>{part.text}</strong> : <span key={j}>{part.text}</span>
              )
            ) : (
              text
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function ProgressTab({ project }) {
  const progress = project.progressOverview;
  if (!progress) return null;

  const [activeCategory, setActiveCategory] = useState('all');
  const categories = progress.categories ?? [];
  const show = (id) => activeCategory === 'all' || activeCategory === id;

  return (
    <div className="progressTab">
      <h2 className="progressTabTitle">{progress.title}</h2>
      <p className="progressTabSubtitle">{progress.subtitle}</p>
      <div className="progressTabUnderline" aria-hidden />

      <div className="progressSubNav" role="tablist" aria-label="Progress categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat.id}
            className={`progressSubNavBtn ${activeCategory === cat.id ? 'progressSubNavBtnActive' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="progressContent">
        {/* Background Research */}
        {progress.background && show('background') && (
          <section className="progressSection">
            <h3 className="progressSectionHeading">{progress.background.heading}</h3>
            <div className="progressCard">
              {progress.background.coreProblem && (
                <>
                  <h4 className="progressCardTitle">{progress.background.coreProblem.title}</h4>
                  <BulletList
                    items={progress.background.coreProblem.bullets}
                    boldPhrases={progress.background.coreProblem.boldPhrases}
                  />
                </>
              )}
              {progress.background.targetMarket && (
                <>
                  <h4 className="progressCardTitle">{progress.background.targetMarket.title}</h4>
                  <BulletList
                    items={progress.background.targetMarket.bullets}
                    boldPhrases={progress.background.targetMarket.boldPhrases}
                  />
                </>
              )}
              {progress.background.userPersonas && (
                <>
                  <h4 className="progressCardTitle">{progress.background.userPersonas.title}</h4>
                  <p className="progressCardText">{progress.background.userPersonas.intro}</p>
                  <div className="progressPersonas">
                    {progress.background.userPersonas.personas?.map((p) => (
                      <article key={p.id} className="progressPersonaCard">
                        <div className="progressPersonaImageWrap">
                          {p.image ? (
                            <Image src={p.image} alt={p.name} width={120} height={120} className="progressPersonaImage" />
                          ) : (
                            <div className="progressPlaceholder progressPlaceholderCircle" aria-hidden />
                          )}
                        </div>
                        <h5 className="progressPersonaName">{p.name}</h5>
                        <dl className="progressPersonaMeta">
                          {p.age != null && (
                            <>
                              <dt>AGE</dt>
                              <dd>{p.age}</dd>
                            </>
                          )}
                          {p.occupation && (
                            <>
                              <dt>OCCUPATION</dt>
                              <dd>{p.occupation}</dd>
                            </>
                          )}
                          {p.workHours && (
                            <>
                              <dt>WORK HOURS</dt>
                              <dd>{p.workHours}</dd>
                            </>
                          )}
                          {p.location && (
                            <>
                              <dt>LOCATION</dt>
                              <dd>{p.location}</dd>
                            </>
                          )}
                          {p.maritalStatus && (
                            <>
                              <dt>MARITAL STATUS</dt>
                              <dd>{p.maritalStatus}</dd>
                            </>
                          )}
                          {p.income && (
                            <>
                              <dt>INCOME</dt>
                              <dd>{p.income}</dd>
                            </>
                          )}
                        </dl>
                        {p.bio && (
                          <>
                            <h6 className="progressPersonaSub">BIO AND BACKGROUND</h6>
                            <p className="progressCardText">{p.bio}</p>
                          </>
                        )}
                        {p.behaviours && (
                          <>
                            <h6 className="progressPersonaSub">KEY BEHAVIOURS</h6>
                            <p className="progressCardText">{p.behaviours}</p>
                          </>
                        )}
                        {p.needs && (
                          <>
                            <h6 className="progressPersonaSub">KEY TASK (User needs and wants)</h6>
                            <p className="progressCardText">{p.needs}</p>
                          </>
                        )}
                        {p.mustHaves && (
                          <>
                            <h6 className="progressPersonaSub">MUST-HAVES</h6>
                            <p className="progressCardText">{p.mustHaves}</p>
                          </>
                        )}
                        {p.neverDos && (
                          <>
                            <h6 className="progressPersonaSub">NEVER DO&apos;S</h6>
                            <p className="progressCardText">{p.neverDos}</p>
                          </>
                        )}
                        {p.goals && (
                          <>
                            <h6 className="progressPersonaSub">GOALS AND MOTIVATIONS</h6>
                            <p className="progressCardText">{p.goals}</p>
                          </>
                        )}
                        {p.painPoints && (
                          <>
                            <h6 className="progressPersonaSub">PAIN POINTS AND FRUSTRATIONS</h6>
                            <p className="progressCardText">{p.painPoints}</p>
                          </>
                        )}
                        {p.scenario && (
                          <>
                            <h6 className="progressPersonaSub">SCENARIOS</h6>
                            <p className="progressCardText">{p.scenario}</p>
                          </>
                        )}
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* App Ideation & Workflow */}
        {progress.ideation && show('ideation') && (
          <section className="progressSection">
            <h3 className="progressSectionHeading">{progress.ideation.heading}</h3>
            <div className="progressCard">
              {progress.ideation.ourIdeation && (
                <>
                  <h4 className="progressCardTitle">{progress.ideation.ourIdeation.title}</h4>
                  <p className="progressCardText">{progress.ideation.ourIdeation.paragraph}</p>
                  <ul className="progressCardList">
                    {progress.ideation.ourIdeation.bullets?.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </>
              )}
              {progress.ideation.appWorkflow && (
                <>
                  <h4 className="progressCardTitle">{progress.ideation.appWorkflow.title}</h4>
                  <p className="progressCardText">{progress.ideation.appWorkflow.paragraph}</p>
                </>
              )}
              <div className="progressWorkflowGrid">
                {(progress.ideation.workflowLabels ?? []).map((label, i) => (
                  <div key={i} className="progressPlaceholder progressPlaceholderWorkflow">
                    <span className="progressPlaceholderLabel">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Design Progress */}
        {progress.design && show('design') && (
          <section className="progressSection">
            <h3 className="progressSectionHeading">{progress.design.heading}</h3>
            <div className="progressCard">
              <div className="progressDesignWorkflowWrap">
                <div className="progressPlaceholder progressPlaceholderWide" aria-hidden />
                {progress.design.viewWorkflowUrl ? (
                  <a href={progress.design.viewWorkflowUrl} target="_blank" rel="noopener noreferrer" className="progressCta">
                    View App Workflow
                  </a>
                ) : (
                  <button type="button" className="progressCta" disabled>View App Workflow</button>
                )}
              </div>
              {progress.design.colors && (
                <>
                  <h4 className="progressCardTitle">{progress.design.colors.title}</h4>
                  <p className="progressCardText">{progress.design.colors.paragraph}</p>
                  <div className="progressSwatches">
                    {(progress.design.colors.swatches ?? []).map((s, i) => (
                      <div key={i} className="progressSwatch" title={s.name}>
                        <div className="progressSwatchColor" style={{ background: s.hex }} aria-hidden />
                        <span className="progressSwatchHex">{s.hex}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {progress.design.typography && (
                <>
                  <h4 className="progressCardTitle">{progress.design.typography.title}</h4>
                  <p className="progressCardText">{progress.design.typography.paragraph}</p>
                  <div className="progressTypographySamples">
                    <div className="progressTypographyCol">
                      <strong>{progress.design.typography.headingFont}</strong>
                      {(progress.design.typography.samples ?? []).map((s, i) => (
                        <p key={i} className="progressTypographySample">{s}</p>
                      ))}
                    </div>
                    <div className="progressTypographyCol">
                      <strong>{progress.design.typography.bodyFont}</strong>
                      {(progress.design.typography.samples ?? []).map((s, i) => (
                        <p key={i} className="progressTypographySample">{s}</p>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {progress.design.appDesign && (
                <>
                  <h4 className="progressCardTitle">{progress.design.appDesign.title}</h4>
                  {(progress.design.appDesign.paragraphs ?? []).map((para, i) => (
                    <p key={i} className="progressCardText">{para}</p>
                  ))}
                  <div className="progressAppDesignCtas">
                    {progress.design.appDesign.lofiUrl ? (
                      <a href={progress.design.appDesign.lofiUrl} target="_blank" rel="noopener noreferrer" className="progressCta progressCtaPrimary">View Lofi App</a>
                    ) : (
                      <button type="button" className="progressCta progressCtaPrimary" disabled>View Lofi App</button>
                    )}
                    {progress.design.appDesign.hifiUrl ? (
                      <a href={progress.design.appDesign.hifiUrl} target="_blank" rel="noopener noreferrer" className="progressCta progressCtaSecondary">View Hifi App</a>
                    ) : (
                      <button type="button" className="progressCta progressCtaSecondary" disabled>View Hifi App</button>
                    )}
                  </div>
                  <div className="progressMockupGrid">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="progressPlaceholder progressPlaceholderMockup" aria-hidden />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* Printed Material & Commercial Ads */}
        {progress.printed && show('printed') && (
          <section className="progressSection">
            <h3 className="progressSectionHeading">{progress.printed.heading}</h3>
            <div className="progressCard">
              {progress.printed.logo && (
                <>
                  <h4 className="progressCardTitle">{progress.printed.logo.title}</h4>
                  <p className="progressCardText">{progress.printed.logo.paragraph}</p>
                  <div className="progressLogoRow">
                    {(progress.printed.logo.images ?? []).length > 0
                      ? progress.printed.logo.images.map((src, i) => (
                          <Image key={i} src={src} alt="" width={80} height={80} className="progressLogoImage" />
                        ))
                      : Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="progressPlaceholder progressPlaceholderLogo" aria-hidden />
                        ))}
                  </div>
                </>
              )}
              {progress.printed.stickers && (
                <>
                  <h4 className="progressCardTitle">{progress.printed.stickers.title}</h4>
                  <p className="progressCardText">{progress.printed.stickers.paragraph}</p>
                  {(progress.printed.stickers.images ?? []).length > 0 ? (
                    <div className="progressStickersRow">
                      {progress.printed.stickers.images.map((src, i) => (
                        <Image key={i} src={src} alt="" width={120} height={120} className="progressStickerImage" />
                      ))}
                    </div>
                  ) : (
                    <div className="progressPlaceholder progressPlaceholderWide" style={{ minHeight: 120 }} aria-hidden />
                  )}
                </>
              )}
              {progress.printed.businessCard && (
                <>
                  <h4 className="progressCardTitle">{progress.printed.businessCard.title}</h4>
                  <p className="progressCardText">{progress.printed.businessCard.paragraph}</p>
                  <div className="progressPlaceholder progressPlaceholderCard" aria-hidden />
                </>
              )}
              {progress.printed.brochure && (
                <>
                  <h4 className="progressCardTitle">{progress.printed.brochure.title}</h4>
                  <p className="progressCardText">{progress.printed.brochure.paragraph}</p>
                  <div className="progressPlaceholder progressPlaceholderWide" style={{ minHeight: 200 }} aria-hidden />
                </>
              )}
              {progress.printed.marketing && (
                <>
                  <h4 className="progressCardTitle progressCardTitleLarge">{progress.printed.marketing.title}</h4>
                  {progress.printed.marketing.promotionVideo && (
                    <>
                      <h5 className="progressCardSubtitle">{progress.printed.marketing.promotionVideo.title}</h5>
                      <p className="progressCardText">{progress.printed.marketing.promotionVideo.paragraph}</p>
                      <div className="progressPlaceholder progressPlaceholderVideo" aria-hidden />
                    </>
                  )}
                  {progress.printed.marketing.tandemBlog && (
                    <>
                      <h5 className="progressCardSubtitle">{progress.printed.marketing.tandemBlog.title}</h5>
                      <p className="progressCardText">{progress.printed.marketing.tandemBlog.paragraph}</p>
                      {progress.printed.marketing.tandemBlog.blogUrl ? (
                        <a href={progress.printed.marketing.tandemBlog.blogUrl} target="_blank" rel="noopener noreferrer" className="progressCta progressCtaPrimary">View Blog</a>
                      ) : (
                        <button type="button" className="progressCta progressCtaPrimary" disabled>View Blog</button>
                      )}
                    </>
                  )}
                  {progress.printed.marketing.socialMedia && (
                    <>
                      <h5 className="progressCardSubtitle">{progress.printed.marketing.socialMedia.title}</h5>
                      <p className="progressCardText">{progress.printed.marketing.socialMedia.paragraph}</p>
                      <div className="progressSocialCtas">
                        {progress.printed.marketing.socialMedia.facebookUrl ? (
                          <a href={progress.printed.marketing.socialMedia.facebookUrl} target="_blank" rel="noopener noreferrer" className="progressCta progressCtaSecondary">View Facebook Page</a>
                        ) : (
                          <button type="button" className="progressCta progressCtaSecondary" disabled>View Facebook Page</button>
                        )}
                        {progress.printed.marketing.socialMedia.instagramUrl ? (
                          <a href={progress.printed.marketing.socialMedia.instagramUrl} target="_blank" rel="noopener noreferrer" className="progressCta progressCtaPrimary">View Instagram Page</a>
                        ) : (
                          <button type="button" className="progressCta progressCtaPrimary" disabled>View Instagram Page</button>
                        )}
                      </div>
                      <div className="progressPlaceholder progressPlaceholderWide" style={{ minHeight: 160 }} aria-hidden />
                    </>
                  )}
                </>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
