'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import ProgressTab from './ProgressTab';
import '../MagazineFlipViewer/MagazineFlipViewer.css';

const MagazineFlipViewer = dynamic(() => import('../MagazineFlipViewer/MagazineFlipViewer'), { ssr: false });

function paragraphWithBold(text, boldPhrases = []) {
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

const KEY_ACHIEVEMENT_ICON_MAP = {
  document: 'description',
  refresh: 'refresh',
  'thumbs-up': 'thumb_up',
  grid: 'grid_view',
  palette: 'palette',
  layers: 'layers',
  favorite: 'favorite',
};

function KeyAchievementsIcon({ type, className }) {
  const c = className ? `projectKeyAchievementsIcon ${className}` : 'projectKeyAchievementsIcon';
  const symbol = KEY_ACHIEVEMENT_ICON_MAP[type];
  if (!symbol) return null;
  return (
    <span className={c} aria-hidden>
      <MaterialIcon icon={symbol} size={40} />
    </span>
  );
}

export default function ProjectHeroTabs({ project, activeTab: controlledTab, onTabChange }) {
  const tabs = project.tabs ?? [
    { id: 'introduction', label: 'Introduction' },
    { id: 'progress', label: 'Progress' },
    { id: 'achievements', label: 'Key Achievements' },
  ];
  const [internalTab, setInternalTab] = useState('introduction');
  const isControlled = controlledTab !== undefined && onTabChange != null;
  const activeTab = isControlled ? controlledTab : internalTab;
  const setActiveTab = isControlled ? onTabChange : setInternalTab;

  const [showDesignViewer, setShowDesignViewer] = useState(false);
  const [designViewerIndex, setDesignViewerIndex] = useState(0);
  const viewDesignsImages = project.posterMockupSection?.viewDesignsImages ?? [];
  const goToPrevDesign = () => setDesignViewerIndex((i) => (i <= 0 ? viewDesignsImages.length - 1 : i - 1));
  const goToNextDesign = () => setDesignViewerIndex((i) => (i >= viewDesignsImages.length - 1 ? 0 : i + 1));

  const barRef = useRef(null);
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;
  const [pillStyle, setPillStyle] = useState(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const measure = () => {
      const buttons = bar.querySelectorAll('.projectHeroTab');
      const index = tabs.findIndex((t) => t.id === activeTabRef.current);
      const btn = buttons[index];
      if (!btn) return;
      const barRect = bar.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setPillStyle({
        left: btnRect.left - barRect.left,
        width: btnRect.width,
        top: btnRect.top - barRect.top,
        height: btnRect.height,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(bar);
    return () => ro.disconnect();
  }, [activeTab, tabs]);

  const roleParts = paragraphWithBold(
    project.roleParagraph ?? '',
    project.roleParagraphBold ?? []
  );

  return (
    <div className="projectHeroTabsSection">
      <div ref={barRef} className="projectHeroTabsBar" role="tablist" aria-label="Project sections">
        {pillStyle != null && (
          <div
            className="projectHeroTabPill"
            aria-hidden
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              top: pillStyle.top,
              height: pillStyle.height,
            }}
          />
        )}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`projectHeroTab ${activeTab === tab.id ? 'projectHeroTabActive' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div key={activeTab} className="projectHeroTabPanel">
      {activeTab === 'introduction' && (
        <>
          {project.projectSlug === 'Tandem' && (
            <blockquote className="projectHeroQuote">
              <img src="/Icon/quotation-left.svg" alt="" className="projectHeroQuoteMark projectHeroQuoteMarkLeft" aria-hidden />
              <img src="/Icon/quotation-left.svg" alt="" className="projectHeroQuoteMark projectHeroQuoteMarkRight" aria-hidden />
              <p className="projectHeroQuoteText">
                Bridging the gap between work<br />and childcare
              </p>
            </blockquote>
          )}

          <div className="projectHeroDetails">
            <div className="projectHeroDetailsHead">
              <div className="projectHeroDetailsTitleBlock">
                <h2 className="projectHeroDetailsTitle">
                  {project.overviewTitle ? project.overviewTitle : project.title.toUpperCase()}
                </h2>
                {!project.overviewTitle && (project.overviewSubtitle ?? project.subtitle) && (
                  <p className="projectHeroDetailsSubtitle">{project.overviewSubtitle ?? project.subtitle}</p>
                )}
                <div className="projectHeroDetailsUnderline" aria-hidden />
              </div>
            </div>

            <div
              className={`projectHeroDetailsBody${!project.introductionPhoneImage ? ' projectHeroDetailsBodyNoImage' : ''}`}
            >
              {project.introductionPhoneImage && (
                <div className="projectHeroDetailsImageWrap">
                  <Image
                    src={project.introductionPhoneImage}
                    alt="Project introduction"
                    width={920}
                    height={1840}
                    className="projectHeroDetailsImage"
                  />
                </div>
              )}
              <div className="projectHeroDetailsContent">
                {project.overviewParagraphs && project.overviewParagraphs.length > 0 ? (
                  project.overviewParagraphs.map((para, i) => (
                    <p key={i} className="projectHeroDetailsIntro">
                      {para}
                    </p>
                  ))
                ) : (
                  project.introParagraph && (
                    <p className="projectHeroDetailsIntro">{project.introParagraph}</p>
                  )
                )}
                {project.projectSlug === 'space-animal' && (
                  <div className="projectHeroOverviewImageWrap">
                    <Image
                      src="/Space-animal/figjam.png"
                      alt="Space Animals game"
                      width={1200}
                      height={800}
                      className="projectHeroOverviewImage"
                    />
                  </div>
                )}
                {project.introSketchesBlock && (
                  <div className="projectHeroIntroSketchesBlock">
                    <div className="projectHeroDetailsTitleBlock">
                      <h3 className="projectHeroIntroSketchesTitle">{project.introSketchesBlock.title}</h3>
                      <div className="projectHeroDetailsUnderline" aria-hidden />
                    </div>
                    {project.introSketchesBlock.intro && (
                      <p className="projectHeroIntroSketchesIntro">{project.introSketchesBlock.intro}</p>
                    )}
                    <div className="projectHeroIntroSketchesGrid">
                      {project.introSketchesBlock.images?.map((src, i) => (
                        <div key={i} className="projectHeroIntroSketchesCard">
                          <Image
                            src={src}
                            alt={`First sketch ${i + 1}`}
                            width={400}
                            height={300}
                            className="projectHeroIntroSketchesImage"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {project.posterMockupSection?.images?.length ? (
                  <div className="projectHeroPosterMockupSection">
                    <div className="projectHeroDetailsTitleBlock">
                      <h3 className="projectHeroPosterMockupTitle">{project.posterMockupSection.title}</h3>
                      <div className="projectHeroDetailsUnderline" aria-hidden />
                    </div>
                    {showDesignViewer && viewDesignsImages.length > 0 && createPortal(
                      <div
                        className="projectHeroDesignViewerOverlay"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Design viewer"
                        onClick={(e) => e.target === e.currentTarget && setShowDesignViewer(false)}
                      >
                        <button
                          type="button"
                          className="projectHeroDesignViewerClose"
                          onClick={() => setShowDesignViewer(false)}
                          aria-label="Close"
                        >
                          <MaterialIcon icon="close" size={28} />
                        </button>
                        <button
                          type="button"
                          className="projectHeroDesignViewerArrow projectHeroDesignViewerArrowPrev"
                          onClick={(e) => { e.stopPropagation(); goToPrevDesign(); }}
                          aria-label="Previous design"
                        >
                          <MaterialIcon icon="chevron_left" size={40} />
                        </button>
                        <div className="projectHeroDesignViewerImageWrap" onClick={(e) => e.stopPropagation()}>
                          <Image
                            src={viewDesignsImages[designViewerIndex]}
                            alt={`Design ${designViewerIndex + 1} of ${viewDesignsImages.length}`}
                            width={1200}
                            height={800}
                            className="projectHeroDesignViewerImage"
                          />
                        </div>
                        <button
                          type="button"
                          className="projectHeroDesignViewerArrow projectHeroDesignViewerArrowNext"
                          onClick={(e) => { e.stopPropagation(); goToNextDesign(); }}
                          aria-label="Next design"
                        >
                          <MaterialIcon icon="chevron_right" size={40} />
                        </button>
                      </div>,
                      document.body
                    )}
                    <div className="projectHeroPosterMockupImages">
                      {project.posterMockupSection.images.map((src, i) => (
                        <div key={i} className="projectHeroPosterMockupImageWrap">
                          <Image
                            src={src}
                            alt=""
                            width={1920}
                            height={800}
                            className="projectHeroPosterMockupImage"
                          />
                          {viewDesignsImages.length > 0 && (
                            <button
                              type="button"
                              className="projectHeroPosterMockupExpandBtn"
                              onClick={() => { setDesignViewerIndex(0); setShowDesignViewer(true); }}
                              aria-label="View designs"
                            >
                              <MaterialIcon icon="open_in_full" size={20} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {project.designRationaleBlock ? (
                  <div className="projectHeroDesignRationaleBlock">
                    <div className="projectHeroDetailsTitleBlock">
                      <h3 className="projectHeroDetailsDesignRationaleTitle">
                        {project.designRationaleBlock.title}
                      </h3>
                      <div className="projectHeroDetailsUnderline" aria-hidden />
                    </div>
                    <p className="projectHeroDetailsIntro">{project.designRationaleBlock.intro}</p>
                    <h4 className="projectHeroDesignRationaleSubhead">For the Traveler:</h4>
                    <p className="projectHeroDetailsIntro">{project.designRationaleBlock.forTheTraveler}</p>
                    <h4 className="projectHeroDesignRationaleSubhead">Key Design Choices:</h4>
                    <ol className="projectHeroDesignRationaleChoices">
                      {project.designRationaleBlock.keyDesignChoices.map((choice, i) => (
                        <li key={i} className="projectHeroDesignRationaleChoice">
                          <strong>{choice.title}:</strong> {choice.text}
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}
                {project.magazinePdfUrl && (
                  <div className="projectHeroMagazineFlipWrap">
                    <MagazineFlipViewer
                      pdfUrl={project.magazinePdfUrl}
                      mockupImage={project.magazineMockupImage}
                      className="projectHeroMagazineFlip"
                    />
                  </div>
                )}
                {!project.designRationaleBlock && project.designRationaleTitle && project.designRationaleParagraph ? (
                  <div className="projectHeroDesignRationaleBlock">
                    <div className="projectHeroDetailsTitleBlock">
                      <h3 className="projectHeroDetailsDesignRationaleTitle">
                        {project.designRationaleTitle}
                      </h3>
                      <div className="projectHeroDetailsUnderline" aria-hidden />
                    </div>
                    <p className="projectHeroDetailsIntro">{project.designRationaleParagraph}</p>
                  </div>
                ) : null}
                {project.introBrandBlock && (
                  <div className="projectHeroIntroBrandBlock">
                    <div className="projectHeroIntroBrandContent">
                      <h4 className="projectHeroIntroBrandTitle">{project.introBrandBlock.title}</h4>
                      <p className="projectHeroDetailsIntro">{project.introBrandBlock.text}</p>
                    </div>
                    <div className="projectHeroIntroBrandLogoWrap">
                      <Image
                        src={project.introBrandBlock.logoPath}
                        alt="TeaTiny"
                        width={213}
                        height={89}
                        className="projectHeroIntroBrandLogo"
                      />
                    </div>
                  </div>
                )}
                {project.introMascotsBlock && (
                  <div className="projectHeroIntroMascotsBlock">
                    <div className="projectHeroIntroMascotsCard">
                      {project.introMascotsBlock.images?.map((src, i) => (
                        <Image
                          key={i}
                          src={src}
                          alt="TeaTiny floral mascots"
                          width={400}
                          height={300}
                          className="projectHeroIntroMascotsImage"
                        />
                      ))}
                    </div>
                    <div className="projectHeroIntroMascotsContent">
                      <h4 className="projectHeroIntroMascotsTitle">{project.introMascotsBlock.title}</h4>
                      <p className="projectHeroDetailsIntro">{project.introMascotsBlock.text}</p>
                    </div>
                  </div>
                )}
                {project.introColourBlock && (
                  <div className="projectHeroIntroColourBlock">
                    <h4 className="projectHeroIntroColourTitle">{project.introColourBlock.title}</h4>
                    <p className="projectHeroDetailsIntro">{project.introColourBlock.text}</p>
                    <div className="projectHeroIntroColourPalette">
                      <Image
                        src={project.introColourBlock.paletteImage}
                        alt="TeaTiny colour palette"
                        width={800}
                        height={200}
                        className="projectHeroIntroColourPaletteImage"
                      />
                    </div>
                  </div>
                )}
                {project.keyAchievements?.outcome && project.projectSlug !== 'the-unseen-vietnam' && (
                  <div className="projectHeroIntroOutcome">
                    <fieldset className="projectHeroIntroOutcomeFieldset">
                      <legend className="projectHeroIntroOutcomeLegend">
                        {project.keyAchievements.outcome.title}
                      </legend>
                      <div className="projectHeroIntroOutcomeContent">
                        <p className="projectHeroIntroOutcomeText">{project.keyAchievements.outcome.text}</p>
                      </div>
                    </fieldset>
                  </div>
                )}
                {project.introFooterImages?.length ? (
                  <div className="projectHeroIntroFooterImages">
                    {project.introFooterImages.map((src, i) => (
                      <div key={i} className="projectHeroIntroFooterImageWrap">
                        <Image
                          src={src}
                          alt=""
                          width={1920}
                          height={400}
                          className="projectHeroIntroFooterImage"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
                {(project.roleBullets?.length || project.roleParagraph || project.whatIDidSections?.length) && (
                  <>
                    {!project.whatIDidSections?.length && (
                      <h3 className="projectHeroDetailsRoleTitle">{project.roleSectionTitle ?? 'My Role'}</h3>
                    )}
                    {project.whatIDidSections?.length > 0 ? (
                      <div className="projectHeroWhatIDidSections">
                        {project.whatIDidSections.map((section) => (
                          <section
                            key={section.id}
                            className={`projectHeroWhatIDidSection${section.image ? ' projectHeroWhatIDidSectionHasImage' : ''}`}
                            data-section={section.id}
                          >
                            <div className="projectHeroWhatIDidSectionContent">
                              <h4 className="projectHeroWhatIDidSectionTitle">{section.title}</h4>
                              {section.intro != null && (
                                <p className="projectHeroWhatIDidSectionIntro">{section.intro}</p>
                              )}
                              {section.items?.length > 0 ? (
                                <ul className="projectHeroWhatIDidSectionList">
                                  {section.items.map((item, i) => (
                                    <li key={i} className="projectHeroWhatIDidSectionItem">
                                      <strong>{item.title}:</strong> {item.text}
                                    </li>
                                  ))}
                                </ul>
                              ) : section.text != null ? (
                                <p className="projectHeroWhatIDidSectionText">{section.text}</p>
                              ) : null}
                            </div>
                            {section.image && (
                              <div className="projectHeroWhatIDidSectionImageWrap">
                                <Image
                                  src={section.image}
                                  alt=""
                                  width={1200}
                                  height={800}
                                  className="projectHeroWhatIDidSectionImage"
                                />
                              </div>
                            )}
                          </section>
                        ))}
                      </div>
                    ) : project.roleBullets?.length ? (
                      <ul className="projectHeroDetailsRoleList">
                        {project.roleBullets.map((item, i) => (
                          <li
                            key={i}
                            className={`projectHeroDetailsRoleListItem${item.subItem ? ' projectHeroDetailsRoleListItemSub' : ''}`}
                          >
                            <strong>{item.title}:</strong> {item.text}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="projectHeroDetailsRole">
                        {Array.isArray(roleParts) ? (
                          roleParts.map((part, i) =>
                            part.bold ? (
                              <strong key={i}>{part.text}</strong>
                            ) : (
                              <span key={i}>{part.text}</span>
                            )
                          )
                        ) : (
                          project.roleParagraph
                        )}
                      </p>
                    )}
                  </>
                )}
                {/* Key Features in Introduction (Space Animal only) */}
                {project.projectSlug === 'space-animal' && project.keyAchievements?.achievements?.length > 0 && (
                  <div className="projectHeroIntroKeyFeatures" data-project="space-animal">
                    <h3 className="projectHeroIntroKeyFeaturesTitle">Key Features</h3>
                    <div className="projectHeroIntroKeyFeaturesUnderline" aria-hidden />
                    <ul className="projectHeroIntroKeyFeaturesList">
                      {project.keyAchievements.achievements.map((achievement) => (
                        <li key={achievement.id} className="projectHeroIntroKeyFeaturesItem">
                          <KeyAchievementsIcon type={achievement.icon} className="projectHeroIntroKeyFeaturesIcon" />
                          <div className="projectHeroIntroKeyFeaturesItemContent">
                            <h4 className="projectHeroIntroKeyFeaturesItemTitle">{achievement.title}</h4>
                            <p className="projectHeroIntroKeyFeaturesItemText">{achievement.text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'progress' && (
        project.progressOverview ? (
          <ProgressTab project={project} />
        ) : (
          <div className="projectHeroTabPanel projectHeroTabPanelPlaceholder">
            <p>Progress content coming soon.</p>
          </div>
        )
      )}

      {activeTab === 'achievements' && (
        project.whatILearned?.length > 0 ? (
          <div className="projectKeyAchievementsSection">
            <div className="projectKeyAchievementsHead">
              <h2 className="projectKeyAchievementsTitle">What I Learned</h2>
              <div className="projectKeyAchievementsUnderline" aria-hidden />
            </div>
            <div className="projectKeyAchievementsGrid">
              {project.whatILearned.map((item) => (
                <article key={item.id} className="projectKeyAchievementsCard">
                  <KeyAchievementsIcon type={item.icon} className="projectKeyAchievementsCardIcon" />
                  <h3 className="projectKeyAchievementsCardTitle">{item.title}</h3>
                  <p className="projectKeyAchievementsCardText">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        ) : project.keyAchievements ? (
          <div className="projectKeyAchievementsSection">
            <div className="projectKeyAchievementsHead">
              <h2 className="projectKeyAchievementsTitle">{project.keyAchievements.title}</h2>
              {project.keyAchievements.subtitle ? (
                <p className="projectKeyAchievementsSubtitle">{project.keyAchievements.subtitle}</p>
              ) : null}
              <div className="projectKeyAchievementsUnderline" aria-hidden />
            </div>
            {project.keyAchievements.intro ? (
              <p className="projectKeyAchievementsIntro">{project.keyAchievements.intro}</p>
            ) : null}
            <div className="projectKeyAchievementsGrid">
              {project.keyAchievements.achievements.map((achievement) => (
                <article key={achievement.id} className="projectKeyAchievementsCard">
                  <KeyAchievementsIcon type={achievement.icon} className="projectKeyAchievementsCardIcon" />
                  <h3 className="projectKeyAchievementsCardTitle">{achievement.title}</h3>
                  <p className="projectKeyAchievementsCardText">{achievement.text}</p>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="projectHeroTabPanel projectHeroTabPanelPlaceholder">
            <p>Key Achievements content coming soon.</p>
          </div>
        )
      )}
      </div>
    </div>
  );
}
