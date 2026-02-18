'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
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

const KEY_ACHIEVEMENT_ICON_MAP = { document: 'description', refresh: 'refresh', 'thumbs-up': 'thumb_up', grid: 'grid_view' };

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
                {project.designRationaleTitle && project.designRationaleParagraph && (
                  <>
                    <h3 className="projectHeroDetailsDesignRationaleTitle">
                      {project.designRationaleTitle}
                    </h3>
                    <div className="projectHeroDetailsDesignRationaleUnderline" aria-hidden />
                    <p className="projectHeroDetailsIntro">{project.designRationaleParagraph}</p>
                  </>
                )}
                {(project.roleBullets?.length || project.roleParagraph) && (
                  <>
                    <h3 className="projectHeroDetailsRoleTitle">My Role</h3>
                    {project.roleBullets?.length ? (
                      <ul className="projectHeroDetailsRoleList">
                        {project.roleBullets.map((item, i) => (
                          <li key={i} className="projectHeroDetailsRoleListItem">
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
    </div>
  );
}
