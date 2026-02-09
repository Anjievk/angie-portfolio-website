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
            <span className="projectHeroQuoteMark" aria-hidden>"</span>
            <p className="projectHeroQuoteText">{project.quote}</p>
          </blockquote>

          <div className="projectHeroDetails">
            <div className="projectHeroDetailsHead">
              <div className="projectHeroDetailsTitleBlock">
                <h2 className="projectHeroDetailsTitle">{project.title.toUpperCase()}</h2>
                <p className="projectHeroDetailsSubtitle">{project.subtitle}</p>
                <div className="projectHeroDetailsUnderline" aria-hidden />
              </div>
            </div>

            <div className="projectHeroDetailsBody">
              <div className="projectHeroDetailsImageWrap">
                {project.introductionPhoneImage ? (
                  <Image
                    src={project.introductionPhoneImage}
                    alt="Tandem app schedule screen"
                    width={920}
                    height={1840}
                    className="projectHeroDetailsImage"
                  />
                ) : (
                  <div className="projectHeroDetailsPlaceholder" aria-hidden />
                )}
              </div>
              <div className="projectHeroDetailsContent">
                <p className="projectHeroDetailsIntro">{project.introParagraph}</p>
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
        <div className="projectHeroTabPanel projectHeroTabPanelPlaceholder">
          <p>Key Achievements content coming soon.</p>
        </div>
      )}
    </div>
  );
}
