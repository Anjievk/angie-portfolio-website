'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProgressTab from './ProgressTab';

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

function KeyAchievementsIcon({ type, className }) {
  const c = className ? `projectKeyAchievementsIcon ${className}` : 'projectKeyAchievementsIcon';
  if (type === 'document') {
    return (
      <span className={c} aria-hidden>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="6" width="20" height="26" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
          <path d="M12 12h12M12 16h12M12 20h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (type === 'refresh') {
    return (
      <span className={c} aria-hidden>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 20a12 12 0 11-2.5-7.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M32 8v8h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M8 20a12 12 0 0119.2-4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M8 32v-8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </span>
    );
  }
  if (type === 'thumbs-up') {
    return (
      <span className={c} aria-hidden>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 34V18M12 18c-2 0-4 1.6-4 4v8c0 2.4 2 4 4 4h14.4c2 0 3.6-1.2 4.4-2.8l4.8-9.6c.8-1.6 0-3.6-1.6-4.4V18c0-2.4-2-4-4-4h-4.8l1.2-4c.4-1.6-.4-3.2-2-3.6l-6-2c-1.6-.4-3.2.8-3.6 2.4L12 18z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
        </svg>
      </span>
    );
  }
  if (type === 'grid') {
    return (
      <span className={c} aria-hidden>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
          <rect x="22" y="8" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
          <rect x="8" y="22" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
          <rect x="22" y="22" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        </svg>
      </span>
    );
  }
  return null;
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

  const roleParts = paragraphWithBold(
    project.roleParagraph ?? '',
    project.roleParagraphBold ?? []
  );

  return (
    <div className="projectHeroTabsSection">
      <div className="projectHeroTabsBar" role="tablist" aria-label="Project sections">
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

      {activeTab === 'introduction' && (
        <>
          <blockquote className="projectHeroQuote">
            {project.projectSlug === 'Tandem' ? (
              <>
                <img src="/Icon/quotation-left.svg" alt="" className="projectHeroQuoteMark projectHeroQuoteMarkLeft" aria-hidden />
                <img src="/Icon/quotation-left.svg" alt="" className="projectHeroQuoteMark projectHeroQuoteMarkRight" aria-hidden />
              </>
            ) : (
              <span className="projectHeroQuoteMark" aria-hidden>"</span>
            )}
            <p className="projectHeroQuoteText">
              {project.projectSlug === 'Tandem' ? (
                <>Bridging the gap between work<br />and childcare</>
              ) : (
                project.quote
              )}
            </p>
          </blockquote>

          <div className="projectHeroDetails">
            <div className="projectHeroDetailsHead">
              <div className="projectHeroDetailsTitleBlock">
                <h2 className="projectHeroDetailsTitle">
                  {project.overviewTitle ? project.overviewTitle : project.title.toUpperCase()}
                </h2>
                {!project.overviewTitle && project.subtitle && (
                  <p className="projectHeroDetailsSubtitle">{project.subtitle}</p>
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
                {project.designRationaleTitle && project.designRationaleParagraph && (
                  <>
                    <h3 className="projectHeroDetailsDesignRationaleTitle">
                      {project.designRationaleTitle}
                    </h3>
                    <div className="projectHeroDetailsDesignRationaleUnderline" aria-hidden />
                    <p className="projectHeroDetailsIntro">{project.designRationaleParagraph}</p>
                  </>
                )}
                {project.roleParagraph && (
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
        project.keyAchievements ? (
          <div className="projectKeyAchievementsSection">
            <div className="projectKeyAchievementsHead">
              <h2 className="projectKeyAchievementsTitle">{project.keyAchievements.title}</h2>
              <p className="projectKeyAchievementsSubtitle">{project.keyAchievements.subtitle}</p>
              <div className="projectKeyAchievementsUnderline" aria-hidden />
            </div>
            <p className="projectKeyAchievementsIntro">{project.keyAchievements.intro}</p>
            <div className="projectKeyAchievementsGrid">
              {project.keyAchievements.achievements.map((achievement) => (
                <article key={achievement.id} className="projectKeyAchievementsCard">
                  <KeyAchievementsIcon type={achievement.icon} className="projectKeyAchievementsCardIcon" />
                  <h3 className="projectKeyAchievementsCardTitle">{achievement.title}</h3>
                  <p className="projectKeyAchievementsCardText">{achievement.text}</p>
                </article>
              ))}
            </div>
            {project.keyAchievements.outcome && (
              <div className="projectKeyAchievementsOutcome">
                <h3 className="projectKeyAchievementsOutcomeTitle">
                  {project.keyAchievements.outcome.title}
                </h3>
                <div className="projectKeyAchievementsOutcomeBox">
                  <p className="projectKeyAchievementsOutcomeText">
                    {project.keyAchievements.outcome.text}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="projectHeroTabPanel projectHeroTabPanelPlaceholder">
            <p>Key Achievements content coming soon.</p>
          </div>
        )
      )}
    </div>
  );
}
