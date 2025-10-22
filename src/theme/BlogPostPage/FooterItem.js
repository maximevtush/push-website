import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// Internal Components
import { Span } from '@site/src/css/SharedStyling';
import { BsLinkedin, BsTwitterX, BsYoutube } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';

// Internal Configs
import { device } from '@site/src/config/globals';
import Link from '@docusaurus/Link';
import LikeAndRetweetItem from './LikeAndRetweetItem';

const FooterItem = ({ post }) => {
  const { t } = useTranslation();

  return (
    <div>
      <LikeAndRetweetItem
        twitterId={post?.metadata?.twitterId}
        text='If it’s worth reading, it’s worth sharing. Like and retweet.'
      />

      <AboutSection>
        <AboutTitle>{t('components.blog.footer-item.about-title')}</AboutTitle>
        <AboutSpan
          fontFamily='DM Sans, sans-serif'
          textAlign='center'
          fontSize='19px'
          fontWeight='400'
          lineHeight='32px'
        >
          {t('components.blog.footer-item.about-description')}
        </AboutSpan>
      </AboutSection>

      <KPIBanner>
        <BannerItem
          to={'https://x.com/PushChain'}
          target='_blank'
          gap='18px'
          className='kpiItem'
        >
          <BsTwitterX size={32} />
          <KPIMetric>
            {t('components.blog.footer-item.social-twitter')}
          </KPIMetric>
        </BannerItem>

        <BannerItem
          to={'https://discord.com/invite/pushchain'}
          target='_blank'
          gap='18px'
          className='kpiItem'
        >
          <FaDiscord size={32} />
          <KPIMetric>
            {t('components.blog.footer-item.social-discord')}
          </KPIMetric>
        </BannerItem>

        <BannerItem
          to={'https://www.youtube.com/@pushprotocol'}
          target='_blank'
          gap='18px'
          className='kpiItem'
        >
          <BsYoutube size={32} />
          <KPIMetric>
            {t('components.blog.footer-item.social-youtube')}
          </KPIMetric>
        </BannerItem>

        <BannerItem
          to={'https://www.linkedin.com/company/push-protocol/'}
          target='_blank'
          gap='18px'
          className='kpiItem'
        >
          <BsLinkedin size={32} />
          <KPIMetric>
            {t('components.blog.footer-item.social-linkedin')}
          </KPIMetric>
        </BannerItem>
      </KPIBanner>
    </div>
  );
};

export default FooterItem;

const AboutSection = styled.div`
  margin-top: 99px;
  span {
    font-size: 18px;
    line-height: 37px;
    color: #282a2d;
    letter-spacing: -0.002em;

    @media ${device.mobileL} {
      font-size: 16px;
      line-height: 36px;
    }
  }
`;

const AboutTitle = styled.div`
  font-family:
    DM Sans,
    sans-serif !important;
  font-weight: 700;
  font-size: 28px;
  line-height: 38px;
  color: var(--ifm-color-primary-blog);
  margin-bottom: 10px;
  letter-spacing: -0.02em;
  @media ${device.mobileL} {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
  }
`;

const AboutSpan = styled(Span)`
  color: var(--ifm-color-blog-tag) !important;
`;

const KPIBanner = styled.div`
  background: var(--ifm-color-blog-footer);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 20px 0px;
  font-family:
    DM Sans,
    sans-serif;
  font-style: normal;
  margin-top: 30px;

  & .kpiItem {
    display: flex;
    flex-direction: row;
    align-items: center !important;
  }

  @media ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;

    width: 100%;

    row-gap: 32px;
    column-gap: 8px;
    margin-top: 30px;

    & .kpiItem {
      flex-direction: row;
      row-gap: 8px;

      flex: 0 0 48%;
    }
  }
`;

const BannerItem = styled(Link)`
  color: var(--ifm-color-footer);
  grid-gap: 8px;
  cursor: pointer
  align-items: center !important;
  &:hover {
    color: #d53893;
  }
`;

const KPIMetric = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 110%;
  letter-spacing: -0.03em;
  @media ${device.tablet} {
    font-size: 16px;
    font-weight: 400;
  }
`;
