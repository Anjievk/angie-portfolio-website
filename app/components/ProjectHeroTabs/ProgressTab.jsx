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

function BulletList({ items = [], boldPhrases = [], listClass = '' }) {
  return (
    <ul className={`progressCardList ${listClass}`.trim()}>
      {(items ?? []).map((text, i) => {
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

function ReadMore({ children, defaultExpanded = false }) {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <div className="progressReadMore">
      {open ? children : null}
      <button
        type="button"
        className="progressReadMoreBtn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Show less' : 'Read more'}
      >
        <span className="progressReadMoreArrow" aria-hidden>{open ? '▲' : '▼'}</span>
      </button>
    </div>
  );
}

function ExpandableDetail({ summary, detail, defaultExpanded = false }) {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <div className="progressExpandable">
      {summary}
      {open && <div className="progressExpandableDetail">{detail}</div>}
      <button
        type="button"
        className="progressReadMoreBtn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Show less' : 'Read more'}
      >
        <span className="progressReadMoreArrow" aria-hidden>{open ? '▲' : '▼'}</span>
      </button>
    </div>
  );
}

export default function ProgressTab({ project }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPersonaImages, setShowPersonaImages] = useState(false);
  const [appDesignView, setAppDesignView] = useState('lofi');
  const progress = project?.progressOverview;
  const categories = progress?.categories ?? [];
  const show = (id) => activeCategory === 'all' || activeCategory === id;

  if (!progress) return null;

  return (
    <div className="progressTab">
      <h2 className="progressTabTitle">{progress.title}</h2>
      <p className="progressTabSubtitle">{progress.subtitle}</p>
      <div className="progressTabUnderline" aria-hidden />

      <div className="progressTabFrame">
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
      </div>

      <div className="progressTabFrame progressTabFrameContent">
      <div className="progressContent">
        {/* Background Research */}
        {progress.background && show('background') && (
          <section className="progressSection progressSectionAligned">
            <h3 className="progressSectionHeading">{progress.background.heading}</h3>
            <div className="progressCard progressCardAligned">
              <div className="progressSectionContent">
                {progress.background.coreProblem && (
                  <div className="progressContentBlock">
                    <h4 className="progressContentBlockTitle">{progress.background.coreProblem.title}</h4>
                    <div className="progressCoreProblemRow">
                      <div className="progressStatCallout">
                        {progress.background.coreProblem.stat && (
                          <span className="progressStatNumber">{progress.background.coreProblem.stat}</span>
                        )}
                        {progress.background.coreProblem.statLabel && (
                          <span className="progressStatLabel">{progress.background.coreProblem.statLabel}</span>
                        )}
                      </div>
                      <div className="progressCoreProblemContent">
                        <BulletList
                          items={progress.background.coreProblem.bullets}
                          boldPhrases={progress.background.coreProblem.boldPhrases}
                          listClass="progressCardListStars"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {progress.background.targetMarket && (
                  <div className="progressContentBlock">
                    <h4 className="progressContentBlockTitle">{progress.background.targetMarket.title}</h4>
                    {progress.background.targetMarket.intro && (
                      <p className="progressTargetMarketIntro">{progress.background.targetMarket.intro}</p>
                    )}
                    {progress.background.targetMarket.cards ? (
                      <div className="progressKeyCards progressKeyCardsBackground">
                        {progress.background.targetMarket.cards.map((card, i) => (
                          <div key={i} className="progressKeyCard">
                            <span className="progressKeyCardLabel">{card.label}</span>
                            <p className="progressKeyCardText">{card.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <BulletList
                        items={progress.background.targetMarket.bullets}
                        boldPhrases={progress.background.targetMarket.boldPhrases}
                      />
                    )}
                  </div>
                )}
                {progress.background.userPersonas && (
                  <div className="progressContentBlock progressBackgroundBlockPersonas">
                    <h4 className="progressContentBlockTitle">{progress.background.userPersonas.title}</h4>
                    <p className="progressBackgroundPersonasIntro">{progress.background.userPersonas.intro}</p>
                    <button
                      type="button"
                      className="progressCta progressCtaPrimary progressPersonaViewBtn"
                      onClick={() => setShowPersonaImages(!showPersonaImages)}
                      aria-expanded={showPersonaImages}
                    >
                      {showPersonaImages ? 'Hide persona details' : 'View persona details'}
                    </button>
                    {showPersonaImages && (
                      <div className="progressPersonas progressPersonasImagesOnly">
                        {progress.background.userPersonas.personas?.map((p, i) => (
                          <article key={p.id ?? `persona-${i}`} className="progressPersonaCard progressPersonaCardImageOnly">
                            <div className="progressPersonaImageWrap">
                              {p.image ? (
                                <Image src={p.image} alt={p.name || 'Persona'} width={832} height={832} className="progressPersonaImage" />
                              ) : (
                                <div className="progressPlaceholder progressPlaceholderCircle" aria-hidden />
                              )}
                            </div>
                            {p.name && <h5 className="progressPersonaName">{p.name}</h5>}
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* App Ideation & Workflow */}
        {progress.ideation && show('ideation') && (
          <section className="progressSection progressSectionAligned">
            <h3 className="progressSectionHeading">{progress.ideation.heading}</h3>
            <div className="progressCard progressCardAligned">
              <div className="progressSectionContent">
                {progress.ideation.ourIdeation && (
                  <div className="progressContentBlock">
                    <h4 className="progressContentBlockTitle">{progress.ideation.ourIdeation.title}</h4>
                    {progress.ideation.ourIdeation.paragraph && (
                      <p className="progressCardText progressIdeationIntro">{progress.ideation.ourIdeation.paragraph}</p>
                    )}
                    {progress.ideation.ourIdeation.cards ? (
                      <div className="progressKeyCards progressKeyCardsIdeation">
                        {progress.ideation.ourIdeation.cards.map((card, i) => (
                          <div key={i} className="progressKeyCard">
                            <span className="progressKeyCardLabel">{card.label}</span>
                            <p className="progressKeyCardText">{card.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      progress.ideation.ourIdeation.bullets?.length > 0 && (
                        <BulletList
                          items={progress.ideation.ourIdeation.bullets}
                          boldPhrases={progress.ideation.ourIdeation.boldPhrases ?? []}
                        />
                      )
                    )}
                  </div>
                )}
                {progress.ideation.appWorkflow && (
                  <div className="progressContentBlock progressContentBlockNoDivider">
                    <h4 className="progressContentBlockTitle">{progress.ideation.appWorkflow.title}</h4>
                    {progress.ideation.appWorkflow.paragraph && (
                      <p className="progressCardText">{progress.ideation.appWorkflow.paragraph}</p>
                    )}
                  </div>
                )}
                <div className="progressContentBlock progressContentBlockFigma">
                  <div className="progressFigmaEmbedWrap">
                    {progress.ideation.appWorkflow?.figmaEmbedUrl ? (
                      <div className="progressFigmaEmbed">
                        <iframe
                          title="Tandem App Workflow"
                          src={progress.ideation.appWorkflow.figmaEmbedUrl}
                          allowFullScreen
                          className="progressFigmaIframe"
                        />
                      </div>
                    ) : (
                      <div className="progressWorkflowGrid">
                        {(progress.ideation.workflowLabels ?? []).map((label, i) => (
                          <div key={i} className="progressPlaceholder progressPlaceholderWorkflow">
                            <span className="progressPlaceholderLabel">{label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Design Progress */}
        {progress.design && show('design') && (
          <section className="progressSection progressSectionAligned">
            <h3 className="progressSectionHeading">{progress.design.heading}</h3>
            <div className="progressCard progressCardAligned">
              <div className="progressSectionContent">
                {progress.design.colors && (
                  <div className="progressContentBlock">
                    <h4 className="progressContentBlockTitle">{progress.design.colors.title}</h4>
                    {progress.design.colors.intro && (
                      <p className="progressColorsIntro">{progress.design.colors.intro}</p>
                    )}
                    {progress.design.colors.items?.length > 0 ? (
                      <div className="progressColorsItems">
                        {progress.design.colors.items.map((item, i) => (
                          <div key={i} className="progressColorsItem">
                            <div className="progressColorsItemHead">
                              <span className="progressColorsItemSwatch" style={{ background: item.hex }} aria-hidden />
                              <span className="progressColorsItemName">{item.name}</span>
                              <span className="progressColorsItemHex">{item.hex}</span>
                            </div>
                            <p className="progressColorsItemLine">{item.line}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="progressSwatches">
                        {(progress.design.colors.swatches ?? []).map((s, i) => (
                          <div key={i} className="progressSwatch" title={s.name}>
                            <div className="progressSwatchColor" style={{ background: s.hex }} aria-hidden />
                            <span className="progressSwatchHex">{s.hex}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {progress.design.colors.closing && (
                      <p className="progressColorsClosing">{progress.design.colors.closing}</p>
                    )}
                  </div>
                )}
                {progress.design.typography && (
                  <div className="progressContentBlock">
                    <h4 className="progressContentBlockTitle">{progress.design.typography.title}</h4>
                    {progress.design.typography.paragraph && (
                      <p className="progressTypographyIntro">{progress.design.typography.paragraph}</p>
                    )}
                    {progress.design.typography.image && (
                      <div className="progressTypographyImageWrap">
                        <Image
                          src={progress.design.typography.image}
                          alt="Typography style guide — Alan Sans and Omnes"
                          width={800}
                          height={500}
                          className="progressTypographyImage"
                        />
                      </div>
                    )}
                  </div>
                )}
                {progress.design.appDesign && (
                  <div className="progressContentBlock">
                    <h4 className="progressContentBlockTitle">{progress.design.appDesign.title}</h4>
                    {(progress.design.appDesign.paragraphs ?? []).map((para, i) => (
                      <p key={i} className="progressCardText progressAppDesignIntro">{para}</p>
                    ))}
                    <div className="progressAppDesignToggle" role="tablist" aria-label="Lofi or Hifi view">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={appDesignView === 'lofi'}
                        className={`progressCta progressCtaPrimary progressAppDesignToggleBtn ${appDesignView === 'lofi' ? 'progressAppDesignToggleBtnActive' : ''}`}
                        onClick={() => setAppDesignView('lofi')}
                      >
                        View Lofi App
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={appDesignView === 'hifi'}
                        className={`progressCta progressCtaSecondary progressAppDesignToggleBtn ${appDesignView === 'hifi' ? 'progressAppDesignToggleBtnActive' : ''}`}
                        onClick={() => setAppDesignView('hifi')}
                      >
                        View Hifi App
                      </button>
                    </div>
                    {(progress.design.appDesign.lofiEmbedUrl || progress.design.appDesign.hifiEmbedUrl) && (
                      <div className="progressAppDesignEmbedWrap">
                        <div className="progressAppDesignEmbed">
                          {appDesignView === 'lofi' && progress.design.appDesign.lofiEmbedUrl && (
                            <iframe
                              title="Tandem Lofi App"
                              src={progress.design.appDesign.lofiEmbedUrl}
                              allowFullScreen
                              className="progressAppDesignIframe"
                            />
                          )}
                          {appDesignView === 'hifi' && progress.design.appDesign.hifiEmbedUrl && (
                            <iframe
                              title="Tandem Hifi App"
                              src={progress.design.appDesign.hifiEmbedUrl}
                              allowFullScreen
                              className="progressAppDesignIframe"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Printed Media Materials: Logo, Stickers, Business Card, Brochure */}
        {progress.printed && show('printed') && (
          <section className="progressSection progressSectionAligned">
            <h3 className="progressSectionHeading">{progress.printed.heading}</h3>
            <div className="progressCard progressCardAligned">
              <div className="progressSectionContent">
                {progress.printed.logo && (
                  <div className="progressContentBlock progressLogoBlock">
                    <h4 className="progressLogoTitle">{progress.printed.logo.title}</h4>
                    <p className="progressLogoParagraph">{progress.printed.logo.paragraph}</p>
                    {(progress.printed.logo.image || (progress.printed.logo.images ?? []).length > 0) && (
                      <div className="progressLogoRow">
                        {progress.printed.logo.image ? (
                          <Image
                            src={progress.printed.logo.image}
                            alt="Tandem logo — hammer with connecting handle in brand colors"
                            width={800}
                            height={400}
                            className="progressLogoImage"
                          />
                        ) : (
                          (progress.printed.logo.images ?? []).map((src, i) => (
                            <Image key={i} src={src} alt="" width={200} height={200} className="progressLogoImage" />
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}
                {progress.printed.stickers && (
                  <div className="progressContentBlock progressPrintedTextBlock">
                    <h4 className="progressPrintedSectionTitle">{progress.printed.stickers.title}</h4>
                    <p className="progressPrintedSectionParagraph">{progress.printed.stickers.paragraph}</p>
                  </div>
                )}
                {progress.printed.businessCard && (
                  <div className="progressContentBlock progressPrintedTextBlock">
                    <h4 className="progressPrintedSectionTitle">{progress.printed.businessCard.title}</h4>
                    <p className="progressPrintedSectionParagraph">{progress.printed.businessCard.paragraph}</p>
                  </div>
                )}
                {progress.printed.stickersShowcaseImage && (
                  <div className="progressContentBlock progressPrintedShowcaseBlock">
                    <div className="progressPrintedShowcase">
                      <Image
                        src={progress.printed.stickersShowcaseImage}
                        alt="Tandem stickers and business cards on display"
                        width={1200}
                        height={700}
                        className="progressPrintedShowcaseImage"
                      />
                    </div>
                  </div>
                )}
                {progress.printed.brochure && (
                  <div className="progressContentBlock progressBrochureBlock">
                    <h4 className="progressPrintedSectionTitle">{progress.printed.brochure.title}</h4>
                    <p className="progressPrintedSectionParagraph">{progress.printed.brochure.paragraph}</p>
                    {progress.printed.brochure.image && (
                      <div className="progressBrochureShowcase">
                        <Image
                          src={progress.printed.brochure.image}
                          alt="Tandem brochure — app stories, benefits and features"
                          width={1200}
                          height={700}
                          className="progressBrochureShowcaseImage"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Marketing & Business Strategy: Promotion Video, Blog, Social Media */}
        {progress.marketing && show('marketing') && (
          <section className="progressSection progressSectionAligned">
            <h3 className="progressSectionHeading">{progress.marketing.heading}</h3>
            <div className="progressCard progressCardAligned">
              <div className="progressSectionContent">
                {progress.marketing.promotionVideo && (
                  <div className="progressContentBlock">
                    <div className="progressPrintItem progressPromotionVideoBlock">
                      <h4 className="progressPrintedSectionTitle">{progress.marketing.promotionVideo.title}</h4>
                      <p className="progressCardText">{progress.marketing.promotionVideo.paragraph}</p>
                      {progress.marketing.promotionVideo.videoUrl ? (
                        <div className="progressVideoWrap">
                          <video
                            className="progressVideo"
                            src={progress.marketing.promotionVideo.videoUrl}
                            controls
                            playsInline
                            preload="metadata"
                            aria-label="Tandem promotion video"
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ) : (
                        <div className="progressPlaceholder progressPlaceholderVideo" aria-hidden />
                      )}
                    </div>
                  </div>
                )}
                {progress.marketing.tandemBlog && (
                  <div className="progressContentBlock progressTandemBlogBlock">
                    <div className="progressTandemBlogLayout">
                      <div className="progressTandemBlogImageCol">
                        {progress.marketing.tandemBlog.image && (
                          <div className="progressTandemBlogImageWrap">
                            <Image
                              src={progress.marketing.tandemBlog.image}
                              alt="Tandem blog — companion to the app"
                              width={600}
                              height={400}
                              className="progressTandemBlogImage"
                            />
                          </div>
                        )}
                      </div>
                      <div className="progressTandemBlogTextCol">
                        <h4 className="progressPrintedSectionTitle progressTandemBlogTitle">{progress.marketing.tandemBlog.title}</h4>
                        <p className="progressTandemBlogParagraph">{progress.marketing.tandemBlog.paragraph}</p>
                        {progress.marketing.tandemBlog.blogUrl ? (
                          <a href={progress.marketing.tandemBlog.blogUrl} target="_blank" rel="noopener noreferrer" className="progressCta progressCtaPrimary progressTandemBlogCta">View Blog</a>
                        ) : (
                          <button type="button" className="progressCta progressCtaPrimary progressTandemBlogCta" disabled>View Blog</button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {progress.marketing.socialMedia && (
                  <div className="progressContentBlock progressSocialMediaBlock">
                    <div className="progressSocialMediaLayout">
                      <div className="progressSocialMediaTextCol">
                        <h4 className="progressPrintedSectionTitle progressSocialMediaTitle">{progress.marketing.socialMedia.title}</h4>
                        <p className="progressSocialMediaParagraph">{progress.marketing.socialMedia.paragraph}</p>
                        <div className="progressSocialCtas progressSocialCtasStacked">
                          {progress.marketing.socialMedia.facebookUrl ? (
                            <a href={progress.marketing.socialMedia.facebookUrl} target="_blank" rel="noopener noreferrer" className="progressCta progressCtaSecondary">View Facebook Page</a>
                          ) : (
                            <button type="button" className="progressCta progressCtaSecondary" disabled>View Facebook Page</button>
                          )}
                          {progress.marketing.socialMedia.instagramUrl ? (
                            <a href={progress.marketing.socialMedia.instagramUrl} target="_blank" rel="noopener noreferrer" className="progressCta progressCtaPrimary">View Instagram Page</a>
                          ) : (
                            <button type="button" className="progressCta progressCtaPrimary" disabled>View Instagram Page</button>
                          )}
                        </div>
                      </div>
                      {progress.marketing.socialMedia.image && (
                        <div className="progressSocialMediaImageCol">
                          <div className="progressSocialMediaImageWrap">
                            <Image
                              src={progress.marketing.socialMedia.image}
                              alt="Tandem social media — Facebook and Instagram"
                              width={600}
                              height={400}
                              className="progressSocialMediaImage"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
      </div>
    </div>
  );
}
