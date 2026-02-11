'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProjectHeroTabs from '../ProjectHeroTabs/ProjectHeroTabs';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

function CoreValuesIcon({ type, className }) {
  const base = 'projectCoreValuesIcon';
  const c = className ? `${base} ${className}` : base;
  if (type === 'shield') {
    return (
      <span className={c} aria-hidden>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4L6 10v10c0 8 6 12 14 14 8-2 14-6 14-14V10L20 4z" fill="currentColor" fillOpacity="0.25" />
          <path d="M17 22l5-5 2 2-7 7-4-4 2-2 2 2z" fill="currentColor" />
        </svg>
      </span>
    );
  }
  if (type === 'balance') {
    return (
      <span className={c} aria-hidden>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6v28M8 14h24M8 26h24" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M14 14v12M26 14v12M20 6l-6 8h12L20 6z" fill="currentColor" fillOpacity="0.25" />
          <circle cx="14" cy="28" r="2" fill="currentColor" fillOpacity="0.4" />
          <circle cx="26" cy="28" r="2" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </span>
    );
  }
  if (type === 'handshake') {
    return (
      <span className={c} aria-hidden>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 24l4-6 4 4 4-6 4 4v8H14v-8z" fill="currentColor" fillOpacity="0.25" />
          <path d="M18 18l-2 6 6-4 2-4M22 14l2 4-6 4-2-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
        </svg>
      </span>
    );
  }
  return null;
}

export default function ProjectHeroTabbedContent({ project }) {
  const [activeTab, setActiveTab] = useState('introduction');

  return (
    <>
      <ProjectHeroTabs
        project={project}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Core Values, Key Features, Final Product, App Interaction – only when Introduction tab is active */}
      {activeTab === 'introduction' && (
        <>
          {project.coreValues && (
            <ScrollReveal animation="fadeUp" delay={0}>
            <div className="projectCoreValuesSection" data-project={project.projectSlug || ''}>
              <h2 className="projectCoreValuesTitle">{project.coreValues.title}</h2>
              <p className="projectCoreValuesSubtitle">{project.coreValues.subtitle}</p>
              <div className="projectCoreValuesUnderline" aria-hidden />
              <div className="projectCoreValuesGrid">
                {project.coreValues.values.map((value) => {
                  const isTandem = project.projectSlug === 'Tandem';
                  const tandemIconPath = isTandem && { trust: '/Icon/Tandem/Trust.svg', balance: '/Icon/Tandem/balance.svg', support: '/Icon/Tandem/support.svg' }[value.id];
                  return (
                    <article
                      key={value.id}
                      data-value={value.id}
                      className={`projectCoreValuesCard projectCoreValuesCard${value.accent === 'green' ? 'Green' : 'Blue'}`}
                    >
                      {isTandem && tandemIconPath ? (
                        <span className="projectCoreValuesCardIcon projectCoreValuesCardIconTandem">
                          <Image src={tandemIconPath} alt="" width={40} height={40} className="projectCoreValuesCardIconImg" />
                        </span>
                      ) : (
                        <CoreValuesIcon type={value.icon} className={`projectCoreValuesCardIcon projectCoreValuesCardIcon${value.accent === 'green' ? 'Green' : 'Blue'}`} />
                      )}
                      <h3 className="projectCoreValuesCardTitle">{value.title}</h3>
                      <p className="projectCoreValuesCardText">{value.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
            </ScrollReveal>
          )}

          {project.keyFeatures && (
            <ScrollReveal animation="fadeUp" delay={80}>
            <div className="projectKeyFeaturesSection">
              <h2 className="projectKeyFeaturesTitle">Key Features</h2>
              <p className="projectKeyFeaturesIntro">{project.keyFeatures.intro}</p>
              <div className="projectKeyFeaturesUnderline" aria-hidden />
              {project.keyFeatures.features.map((feature, index) => (
                <div
                  key={feature.number}
                  className={`projectKeyFeatureBlock projectKeyFeatureBlock${feature.layout === 'phoneLeft' ? 'PhoneLeft' : 'TextLeft'}`}
                >
                  <div className="projectKeyFeatureContent">
                    <div className="projectKeyFeatureTitleGroup">
                      <span className="projectKeyFeatureNumber" aria-hidden>{feature.number}</span>
                      <div className="projectKeyFeatureTitleBlock">
                        <h3 className="projectKeyFeatureHeading">{feature.title}</h3>
                        <p className="projectKeyFeatureSubtitle">{feature.subtitle}</p>
                      </div>
                    </div>
                    <p className="projectKeyFeatureDescription">{feature.description}</p>
                  </div>
                  <div className="projectKeyFeatureMockups">
                    {feature.images ? (
                      feature.images.map((src, i) => (
                        <div key={i} className="projectKeyFeatureImageWrap">
                          {src ? (
                            <Image src={src} alt="" width={500} height={1000} className="projectKeyFeatureImage" />
                          ) : (
                            <div className="projectKeyFeaturePlaceholder" aria-hidden />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="projectKeyFeatureImageWrap">
                        {feature.image ? (
                          <Image src={feature.image} alt="" width={500} height={1000} className="projectKeyFeatureImage" />
                        ) : (
                          <div className="projectKeyFeaturePlaceholder" aria-hidden />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            </ScrollReveal>
          )}

          {project.finalProduct && (
            <ScrollReveal animation="fadeUp" delay={80}>
            <div className="projectFinalProductSection">
              <h2 className="projectFinalProductTitle">{project.finalProduct.title}</h2>
              <div className="projectFinalProductUnderline" aria-hidden />
              <div className="projectFinalProductGrid">
                {project.finalProduct.screens.map((screen) => (
                  <div key={screen.id} className="projectFinalProductItem">
                    {screen.image ? (
                      <Image
                        src={screen.image}
                        alt={screen.label}
                        width={400}
                        height={800}
                        className="projectFinalProductImage"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      />
                    ) : (
                      <div className="projectFinalProductPlaceholder" aria-hidden>
                        <span className="projectFinalProductPlaceholderLabel">{screen.label}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            </ScrollReveal>
          )}

          {project.appInteraction && (
            <ScrollReveal animation="fadeUp" delay={80}>
            <div className="projectAppInteractionSection" data-project={project.projectSlug}>
              <h2 className="projectAppInteractionTitle">{project.appInteraction.title}</h2>
              <p className="projectAppInteractionSubtitle">{project.appInteraction.subtitle}</p>
              <div className="projectAppInteractionUnderline" aria-hidden />
              <div className="projectAppInteractionWrap">
                {project.projectSlug === 'Tandem' && (
                  <>
                    <Image
                      src="/Icon/Tandem/circlely-arrow.svg"
                      alt=""
                      width={206}
                      height={257}
                      className="projectAppInteractionIcon projectAppInteractionIconCircleArrow"
                      aria-hidden
                    />
                    <Image
                      src="/Icon/Tandem/big-star.svg"
                      alt=""
                      width={109}
                      height={102}
                      className="projectAppInteractionIcon projectAppInteractionIconBigStar"
                      aria-hidden
                    />
                    <Image
                      src="/Icon/Tandem/small-star.svg"
                      alt=""
                      width={77}
                      height={85}
                      className="projectAppInteractionIcon projectAppInteractionIconSmallStar"
                      aria-hidden
                    />
                    <Image
                      src="/Icon/Tandem/long-arrow.svg"
                      alt=""
                      width={169}
                      height={188}
                      className="projectAppInteractionIcon projectAppInteractionIconLongArrow"
                      aria-hidden
                    />
                  </>
                )}
                <div className="projectAppInteractionContent">
                  {project.appInteraction.figmaEmbedUrl ? (
                    <iframe
                      title="Figma prototype – tap to interact"
                      src={project.appInteraction.figmaEmbedUrl}
                      className="projectAppInteractionFigma"
                      allowFullScreen
                      allow="fullscreen"
                    />
                  ) : (
                    <div className="projectAppInteractionPlaceholder">
                      <p className="projectAppInteractionPlaceholderTitle">Figma prototype</p>
                      <p className="projectAppInteractionPlaceholderText">
                        Add your Figma embed URL in <code>app/data/projects.js</code> under <code>appInteraction.figmaEmbedUrl</code>.
                      </p>
                      <p className="projectAppInteractionPlaceholderHint">
                        In Figma: Share → Get embed code → copy the iframe <code>src</code> URL.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            </ScrollReveal>
          )}
        </>
      )}
    </>
  );
}
