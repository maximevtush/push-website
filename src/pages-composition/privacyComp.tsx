// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// Internal Component
import {
  A,
  B,
  Content,
  H1,
  H2,
  ItemV,
  MultiContent,
  P,
  Section,
  Span,
} from '@site/src/css/SharedStyling';

// Internal Configs

// Interfaces and Props

// Helper Functions

// Helper Component

// Main
const PrivacyComp = () => {
  // Internationalization
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <Section>
        <Content className='skeletonsmall'>
          <MultiContent>
            <H1>{t('pages.privacy.hero-section.title')}</H1>
            <Span>{t('pages.privacy.hero-section.description')}</Span>
            <Span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
              {t('pages.privacy.hero-section.update-text')}
            </Span>
          </MultiContent>

          <MultiContent>
            <ItemV
              alignSelf='stretch'
              alignItems='flex-start'
              justifyContent='flex-start'
              flexDirection='column'
            >
              {/* SUMMARY */}
              <H2>SUMMARY</H2>

              <Span margin='12px 0'>
                We recognise our responsibilities in relation to the collection,
                holding, processing, use and/or transfer of personal data. Your
                privacy is of utmost importance to us.
              </Span>

              <Span margin='12px 0'>
                This policy (the <B>Policy</B>) outlines how we collect, use,
                store and disclose your personal data. Please take a moment to
                read about how we collect, use and/or disclose your personal
                data so that you know and understand the purposes for which we
                may collect, use and/or disclose your personal data. By
                accessing the website at{' '}
                <A
                  href='https://push.org'
                  target='_blank'
                  display=' inline'
                  color='var(--ifm-link-color)'
                  background='transparent'
                  padding='0px'
                  letterSpacing='inherit'
                  textTransform='initial'
                >
                  push.org
                </A>
                ,{' '}
                <A
                  href='https://app.push.org'
                  target='_blank'
                  display=' inline'
                  color='var(--ifm-link-color)'
                  background='transparent'
                  padding='0px'
                  letterSpacing='inherit'
                  textTransform='initial'
                >
                  app.push.org
                </A>{' '}
                or{' '}
                <A
                  href='https://staging.push.org'
                  target='_blank'
                  display=' inline'
                  color='var(--ifm-link-color)'
                  background='transparent'
                  padding='0px'
                  letterSpacing='inherit'
                  textTransform='initial'
                >
                  staging.push.org
                </A>{' '}
                or any other subdomains of <B>push.org</B> (the{' '}
                <B>Website(s)</B>), you agree and consent to Ethereum Push
                Notification Service Foundation (the <B>Company</B>), its
                related corporations, business units and affiliates, as well as
                their respective representatives and/or agents (collectively
                referred to herein as “Push”, “us”, “we” or “our”), collecting,
                using, disclosing and sharing amongst themselves the personal
                data, and to disclosing such personal data to relevant third
                party providers. This Policy supplements but does not supersede
                nor replace any other consent which you may have previously
                provided to us nor does it affect any rights that we may have at
                law in connection with the collection, use and/or disclosure of
                your personal data. We may from time to time update this Policy
                to ensure that this Policy is consistent with our future
                developments, industry trends and/or any changes in legal or
                regulatory requirements. Subject to your rights at law, the
                prevailing terms of this Policy shall apply. For the avoidance
                of doubt, this Policy forms part of the Terms of Service
                governing your relationship with us and should be read in
                conjunction with such{' '}
                <A
                  href={useBaseUrl('./tos')}
                  target='_blank'
                  display=' inline'
                  color='var(--ifm-link-color)'
                  background='transparent'
                  padding='0px'
                  letterSpacing='inherit'
                  textTransform='initial'
                >
                  Terms of Service
                </A>
                . All capitalised terms used but not defined herein shall have
                the meaning ascribed to them in the Terms of Service.
              </Span>

              <Span margin='12px 0'>
                The security of your personal data is important to us. At each
                stage of data collection, use and disclosure, Push has in place
                physical, electronic, administrative and procedural safeguards
                to protect the personal data stored with us. However, do note
                that no transmission of personal data over the internet can be
                guaranteed to be 100% secure – accordingly and despite our
                efforts, Push cannot guarantee or warrant the security of any
                information you transmit to us, or to or from our online
                services. Push shall not have any responsibility or liability
                for the security of information transmitted via the internet.
              </Span>

              <Span margin='12px 0'>
                This Policy describes how Push may collect, use, disclose,
                process and manage your personal data, and applies to any
                individual’s personal data which is in our possession or under
                our control.
              </Span>

              {/* What personal data is collected by Push */}
              <Span
                weight='400'
                spacing='0.2em'
                textTransform='uppercase'
                margin='24px 0 8px'
              >
                1.1 What personal data is collected by Push
              </Span>

              <Span margin='12px 0'>
                &quot;Personal data&rdquo; means data, whether true or not,
                about an individual who can be identified (i) from that data, or
                (ii) from that data and other information to which the
                organisation has or is likely to have access. Some examples of
                personal data that Push may collect are:
              </Span>

              <Span margin='12px 0'>
                <B>(a)</B> personal particulars (e.g. name, contact details,
                residential address, date of birth, identity card/passport
                details, social media handles and other social media profile
                information, and/or education details);
              </Span>

              <Span margin='12px 0'>
                <B>(b)</B> financial details (e.g. income, expenses, credit
                history and/or credit card and bank information);
              </Span>

              <Span margin='12px 0'>
                <B>(c)</B> images and voice recordings of our conversations with
                you, whether from our events or office surveillances or
                otherwise;
              </Span>

              <Span margin='12px 0'>
                <B>(d)</B> work experience and employment details (e.g.
                occupation, directorships and other positions held, employment
                history, salary, and/or benefits);
              </Span>

              <Span margin='12px 0'>
                <B>(e)</B> tax and insurance information;
              </Span>

              <Span margin='12px 0'>
                <B>(f)</B> information about your risk profile, investments,
                investment objectives, knowledge and experience and/or business
                interests and assets;
              </Span>

              <Span margin='12px 0'>
                <B>(g)</B> information about your use of our services and
                Website;
              </Span>

              <Span margin='12px 0'>
                <B>(h)</B> usernames and password, third party account
                credentials (such as your Facebook login credentials, Google
                login credentials) and IP address;
              </Span>

              <Span margin='12px 0'>
                <B>(i)</B> banking information (e.g. account numbers and banking
                transactions);
              </Span>

              <Span margin='12px 0'>
                <B>(j)</B> private or public cryptographic key relating to
                addresses on distributed ledger networks and/or similar
                information; and/or
              </Span>

              <Span margin='12px 0'>
                <B>(k)</B> personal opinions made known to us (e.g. feedback or
                responses to surveys).
              </Span>

              <Span margin='12px 0'>
                Personal data may be collected when you interact with our
                services or use the Website, or may be received by Push from
                third-party databases or service providers that provide business
                information.
              </Span>

              {/* Purposes for collection, use and disclosure */}
              <Span
                weight='400'
                spacing='0.2em'
                textTransform='uppercase'
                margin='24px 0 8px'
              >
                1.2 Purposes for collection, use and disclosure of your personal
                data
              </Span>

              <Span margin='12px 0'>
                Push may collect, use and/or disclose your personal data for its
                business purposes, including operations for these purposes.
                These may include, without limitation, the following:
              </Span>

              <ListGroup>
                <Span margin='6px 0'>
                  <B>(a)</B> developing and providing facilities, products or
                  services (whether made available by us or through us),
                  including but not limited to:
                </Span>

                <Span margin='6px 0'>
                  <B>(i)</B> sale of digital tokens or virtual currencies;
                </Span>

                <Span margin='6px 0'>
                  <B>(ii)</B> acting as intermediaries through any blockchain,
                  network or platform developed or managed by us;
                </Span>

                <Span margin='6px 0'>
                  <B>(iii)</B> recording and/or encryption on any blockchain,
                  network or platform developed or managed by us;
                </Span>

                <Span margin='6px 0'>
                  <B>(iv)</B> promoting advertisements or marketing material,
                  whether from us or third parties;
                </Span>

                <Span margin='6px 0'>
                  <B>(v)</B> various products and/or services (whether digital
                  or not, and whether provided through an external service
                  provider or otherwise), including without limitation the
                  Services as set out in the Terms of Service;
                </Span>

                <Span margin='6px 0'>
                  <B>(vi)</B> providing, managing or accessing digital wallets
                  for holding digital assets;
                </Span>

                <Span margin='6px 0'>
                  <B>(vii)</B> access to smart contracts on and/or interacting
                  with the Push Protocol, the Website or the App;
                </Span>

                <Span margin='6px 0'>
                  <B>(viii)</B> sending and receiving notifications and Content
                  from various channels on the Push Protocol;
                </Span>

                <Span margin='6px 0'>
                  <B>(ix)</B> making payments to you for participation in any
                  blockchain, network or platform developed or managed by us (as
                  applicable);
                </Span>

                <Span margin='6px 0'>
                  <B>(x)</B> various products and/or services related to digital
                  assets;
                </Span>

                <Span margin='6px 0'>
                  <B>(xi)</B> any escrow, courier, anti-counterfeiting or
                  dispute resolution services;
                </Span>

                <Span margin='6px 0'>
                  <B>(xii)</B> transactions and clearing or reporting on these
                  transactions;
                </Span>

                <Span margin='6px 0'>
                  <B>(xiii)</B> carrying out research, planning and statistical
                  analysis; and/or
                </Span>

                <Span margin='6px 0'>
                  <B>(xiv)</B> analytics for the purposes of developing or
                  improving our products, services, security, service quality,
                  staff training, and advertising strategies;
                </Span>

                <Span margin='6px 0'>
                  <B>(b)</B> assessing and processing applications,
                  instructions, transactions, or requests from you or our
                  customers;
                </Span>

                <Span margin='6px 0'>
                  <B>(c)</B> communicating with you, including providing you
                  with updates on changes to products, services and banking
                  facilities (whether made available by us or through us)
                  including any additions, expansions, suspensions and
                  replacements of or to such products, services and banking
                  facilities and their terms and conditions;
                </Span>

                <Span margin='6px 0'>
                  <B>(d)</B> managing our infrastructure and business operations
                  and complying with internal policies and procedures;
                </Span>

                <Span margin='6px 0'>
                  <B>(e)</B> responding to queries or feedback;
                </Span>

                <Span margin='6px 0'>
                  <B>(f)</B> addressing or investigating any complaints, claims
                  or disputes;
                </Span>

                <Span margin='6px 0'>
                  <B>(g)</B> verifying your identity for the purposes of
                  providing facilities, products or services, which would
                  require comparison of your personal information against third
                  party databases and/or provision of such information to third
                  party service providers;
                </Span>

                <Span margin='6px 0'>
                  <B>(h)</B> conducting credit checks, screenings or due
                  diligence checks as may be required under applicable law,
                  regulation or directive;
                </Span>

                <Span margin='6px 0'>
                  <B>(i)</B> complying with all applicable laws, regulations,
                  rules, directives, orders, instructions and requests from any
                  local or foreign authorities, including regulatory,
                  governmental, tax and law enforcement authorities or other
                  authorities;
                </Span>

                <Span margin='6px 0'>
                  <B>(j)</B> enforcing obligations owed to us;
                </Span>

                <Span margin='6px 0'>
                  <B>(k)</B> monitoring products and services provided by or
                  made available through us;
                </Span>

                <Span margin='6px 0'>
                  <B>(l)</B> complying with obligations and requirements imposed
                  by us from time to time by any credit bureau or credit
                  information sharing services of which we are a member or
                  subscriber;
                </Span>

                <Span margin='6px 0'>
                  <B>(m)</B> creating and maintaining credit and risk related
                  models;
                </Span>

                <Span margin='6px 0'>
                  <B>(n)</B> financial reporting, regulatory reporting,
                  management reporting, risk management (including monitoring
                  credit exposures, preventing, detecting and investigating
                  crime, including fraud and any form of financial crime), audit
                  and record keeping purposes;
                </Span>

                <Span margin='6px 0'>
                  <B>(o)</B> enabling any actual or proposed assignee or
                  transferee, participant or sub-participant of Push&apos;s
                  rights or obligations to evaluate any proposed transaction;
                </Span>

                <Span margin='6px 0'>
                  <B>(p)</B> enforcing obligations owed to us; and/or
                </Span>

                <Span margin='6px 0'>
                  <B>(q)</B> seeking professional advice, including legal or tax
                  advice.
                </Span>

                <Span margin='6px 0'>
                  We may also use personal data for purposes set out in the
                  Terms of Service that govern our relationship with you or our
                  customer.
                </Span>
              </ListGroup>

              {/* Use of personal data for marketing purposes */}
              <Span
                weight='400'
                spacing='0.2em'
                textTransform='uppercase'
                margin='24px 0 8px'
              >
                1.3 Use of personal data for marketing purposes
              </Span>

              <Span margin='12px 0'>
                We may use your personal data to offer you products or services,
                including special offers, promotions, contests or entitlements
                that may be of interest to you or for which you may be eligible.
                Such marketing messages may be sent to you in various modes
                including but not limited to electronic mail, direct mailers,
                short message service, telephone calls, facsimile and other
                mobile messaging services. In doing so, we will comply with all
                applicable data protection and privacy laws.
              </Span>

              <Span margin='12px 0'>
                In respect of sending telemarketing messages to your telephone
                number via short message service, telephone calls, facsimile and
                other mobile messaging services, please be assured that we shall
                only do so if we have your clear and unambiguous consent in
                writing or other recorded form to do so or if you have not
                otherwise made the appropriate registration of that number with
                the Do Not Call Registry. If we have an ongoing relationship
                with you and you have not indicated to us that you do not wish
                to receive telemarketing messages sent to your telephone number,
                we may send you telemarketing messages to that number related to
                the subject of our ongoing relationship via short message
                service, facsimile and other mobile messaging services (other
                than a voice or video call).
              </Span>

              <Span margin='12px 0'>
                You may at any time request that we stop contacting you for
                marketing purposes via selected or all modes.
              </Span>

              <Span margin='12px 0'>
                To find out more on how you can change the way we use your
                personal data for marketing purposes, please contact us at{' '}
                <A
                  href='mailto://support@push.org'
                  display=' inline'
                  color='var(--ifm-link-color)'
                  background='transparent'
                  padding='0px'
                  letterSpacing='inherit'
                  textTransform='initial'
                >
                  support@push.org
                </A>
                .
              </Span>

              <Span margin='12px 0'>
                Nothing in this section shall vary or supersede the Terms of
                Service that govern our relationship with you.
              </Span>

              {/* Disclosure and sharing of personal data */}
              <Span
                weight='400'
                spacing='0.2em'
                textTransform='uppercase'
                margin='24px 0 8px'
              >
                1.4 Disclosure and sharing of personal data
              </Span>

              <Span margin='12px 0'>
                We may from time to time and in compliance with all applicable
                laws on data privacy, disclose your personal data to any
                personnel of Push or to third parties (including without
                limitation banks, financial institutions, credit card companies,
                credit bureaus and their respective service providers, companies
                providing services relating to insurance and/or reinsurance to
                us, and associations of insurance companies, agents, contractors
                or third party service providers who provide services to us such
                as telecommunications, information technology, payment, data
                processing, storage and archival, and our professional advisers
                such as our auditors and lawyers, and regulators and
                authorities), whether located in Singapore or elsewhere, in
                order to carry out the purposes set out above. Please be assured
                that when we disclose your personal data to such parties, we
                require them to ensure that any personal data disclosed to them
                are kept confidential and secure.
              </Span>

              <Span margin='12px 0'>
                For more information about the third parties with whom we share
                your personal data, you may, where appropriate, wish to refer to
                the agreement(s) and/or Terms of Service that govern our
                relationship with you or our customer. You may also contact us
                for more information (please see section 1.9 below).
              </Span>

              <Span margin='12px 0'>
                We wish to emphasise that Push does not sell personal data to
                any third parties and we shall remain fully compliant of any
                duty or obligation of confidentiality imposed on us under the
                applicable agreement(s) and/or Terms of Service that govern our
                relationship with you or our customer or any applicable law.
              </Span>

              <Span margin='12px 0'>
                You are responsible for ensuring that the personal data you
                provide to us is accurate, complete, and not misleading and that
                such personal data is kept up to date. You acknowledge that
                failure on your part to do so may result in our inability to
                provide you with the products and services you have requested.
                To update your personal data, please contact us (please see
                section 1.9 below for contact details). Where you provide us
                with personal data concerning individuals other than yourself,
                you are responsible for obtaining all legally required consents
                from the concerned individuals and you shall retain proof of
                such consent(s), such proof to be provided to us upon our
                request.
              </Span>

              <Span margin='12px 0'>
                We may transfer, store, process and/or deal with your personal
                data outside Singapore. In doing so, we will comply with all
                applicable data protection and privacy laws.
              </Span>

              {/* Cookies and related technologies */}
              <Span
                weight='400'
                spacing='0.2em'
                textTransform='uppercase'
                margin='24px 0 8px'
              >
                1.5 Cookies and related technologies
              </Span>

              <Span margin='12px 0'>
                The Website uses cookies. A cookie is a small text file placed
                on your computer or mobile device when you visit a Website or
                use an app. Cookies collect information about users and their
                visit to the Website or use of the app, such as their Internet
                protocol (IP) address, how they arrived at the Website (for
                example, through a search engine or a link from another
                Website), how they navigate within the Website or app, browser
                information, computer or device type, operating system, internet
                service provider, website usage, referring/exit pages, platform
                type, date/time stamp, number of clicks, and ads viewed. We use
                cookies and other technologies to facilitate your internet
                sessions and use of our apps, offer you products and/or services
                according to your preferred settings, track use of our websites
                and apps and to compile statistics about activities carried out
                on our websites.
              </Span>

              <Span margin='12px 0'>
                You may set up your web browser to block cookies from monitoring
                your website visit. You may also remove cookies stored from your
                computer or mobile device. However, if you do block cookies you
                may not be able to use certain features and functions of our web
                sites.
              </Span>

              {/* Other web sites */}
              <Span
                weight='400'
                spacing='0.2em'
                textTransform='uppercase'
                margin='24px 0 8px'
              >
                1.6 Other web sites
              </Span>

              <Span margin='12px 0'>
                Our websites may contain links to other websites which are not
                maintained by Push. This Policy only applies to the websites of
                Push. When visiting these third party websites, you should read
                their privacy policies which will apply to your use of such
                websites.
              </Span>

              {/* Retention of personal data */}
              <Span
                weight='400'
                spacing='0.2em'
                textTransform='uppercase'
                margin='24px 0 8px'
              >
                1.7 Retention of personal data
              </Span>

              <Span margin='12px 0'>
                Your personal data is retained as long as the purpose for which
                it was collected remains and until it is no longer necessary for
                any legal or business purposes.
              </Span>

              {/* Queries, Access/Correction Requests and Withdrawal of Consent */}
              <Span
                weight='400'
                spacing='0.2em'
                textTransform='uppercase'
                margin='24px 0 8px'
              >
                1.8 Queries, Access/Correction Requests and Withdrawal of
                Consent
              </Span>

              <Span margin='8px 0'>If you:</Span>

              <Span margin='12px 0'>
                <B>(a)</B> have queries about our data protection processes and
                practices;
              </Span>

              <Span margin='12px 0'>
                <B>(b)</B> wish to request access to and/or make corrections to
                your personal data in our possession or under our control; or
              </Span>

              <Span margin='12px 0'>
                <B>(c)</B> wish to withdraw your consent to our collection, use
                or disclosure of your personal data,
              </Span>

              <Span margin='20px 0 12px'>
                please submit a written request (with supporting documents, (if
                any) to our Compliance Officer at:{' '}
                <A
                  href='mailto://support@push.org'
                  display=' inline'
                  color='var(--ifm-link-color)'
                  background='transparent'
                  padding='0px'
                  letterSpacing='inherit'
                  textTransform='initial'
                >
                  support@push.org
                </A>
                . Our Compliance Officer shall endeavour to respond to you
                within 30 days of your submission. Please note that if you
                withdraw your consent to any or all use or disclosure of your
                personal data, depending on the nature of your request, we may
                not be in a position to continue to provide our services or
                products to you or administer any contractual relationship in
                place. Such withdrawal may also result in the termination of any
                agreement you may have with us. Our legal rights and remedies
                are expressly reserved in such event.
              </Span>

              <Span margin='12px 0'>
                We may charge you a fee for processing your request for access.
                Such a fee depends on the nature and complexity of your access
                request. Information on the processing fee will be made
                available to you.
              </Span>

              {/* Contact information */}
              <Span
                weight='400'
                spacing='0.2em'
                textTransform='uppercase'
                margin='24px 0 8px'
              >
                1.9 Contact information
              </Span>

              <Span margin='12px 0'>
                To contact us on any aspect of this Policy or your personal data
                or to provide any feedback that you may have, please contact our
                Compliance Officer at{' '}
                <A
                  href='mailto://support@push.org'
                  display=' inline'
                  color='var(--ifm-link-color)'
                  background='transparent'
                  padding='0px'
                  letterSpacing='inherit'
                  textTransform='initial'
                >
                  support@push.org
                </A>
                .
              </Span>

              {/* Governing Law and Jurisdiction */}
              <Span
                weight='400'
                spacing='0.2em'
                textTransform='uppercase'
                margin='24px 0 8px'
              >
                1.10 Governing Law and Jurisdiction
              </Span>

              <Span margin='12px 0'>
                This Policy and your use of the Website shall be governed and
                construed in accordance with the laws of Singapore. You agree to
                submit to the exclusive jurisdiction of the Singapore courts.
              </Span>

              {/* Amendments and updates */}
              <Span
                weight='400'
                spacing='0.2em'
                textTransform='uppercase'
                margin='24px 0 8px'
              >
                1.11 Amendments and updates to Push Privacy Policy
              </Span>

              <Span margin='12px 0'>
                We reserve the right to amend this Policy from time to time to
                ensure that this Policy is consistent with any developments to
                the way Push uses your personal data or any changes to the laws
                and regulations applicable to Push. We will make available the
                updated Policy on the Website. You are encouraged to visit the
                Website from time to time to ensure that you are well informed
                of our latest policies in relation to personal data protection.
                All communications, transactions and dealings with us shall be
                subject to the latest version of this Policy in force at the
                time.
              </Span>

              {/* EU/EEA Residents */}
              <Span
                weight='400'
                spacing='0.2em'
                textTransform='uppercase'
                margin='24px 0 8px'
              >
                1.12 For European Union or European Economic Area Residents
              </Span>

              <Span margin='12px 0'>
                This section applies if you are an individual located in the
                European Union or European Economic Area. Subject to applicable
                law, you have the following additional rights in relation to
                your personal data:
              </Span>

              <Span margin='12px 0'>
                <B>(a)</B> the right to access your personal data (if you ask
                us, we will confirm whether we are processing your personal data
                in a structured, commonly used and machine-readable format and,
                if so, provide you with a copy of that personal data (along with
                certain other details). If you require additional copies, we may
                need to charge a reasonable fee;
              </Span>

              <Span margin='12px 0'>
                <B>(b)</B> the right to ensure the accuracy of your personal
                data;
              </Span>

              <Span margin='12px 0'>
                <B>(c)</B> the right to have us delete your personal data (we
                will do so in some circumstances, such as where we no longer
                need it, but do note that we may not delete your data when other
                interests outweigh your right to deletion);
              </Span>

              <Span margin='12px 0'>
                <B>(d)</B> the right to restrict further processing of your
                personal data (unless we demonstrate compelling legitimate
                grounds for the processing);
              </Span>

              <Span margin='12px 0'>
                <B>(e)</B> rights in relation to automated decision-making and
                profiling (you have the right to be free from decisions based
                solely on automated processing of your personal data, including
                profiling, that affect you, unless such processing is necessary
                for entering into, or the performance of, a contract between you
                and us or you provide your explicit consent to such processing);
              </Span>

              <Span margin='12px 0'>
                <B>(f)</B> the right to withdraw consent (if we rely on your
                consent to process your personal data, you have the right to
                withdraw that consent at any time, but provided always that this
                shall not affect the lawfulness of processing based on your
                prior consent); and
              </Span>

              <Span margin='12px 0'>
                <B>(g)</B> the right to complain to a supervisory authority in
                your country of residence in the event that data is misused.
              </Span>

              <Span margin='12px 0'>
                If you believe that our processing of your personal information
                infringes data protection laws, you have a legal right to lodge
                a complaint with a supervisory authority responsible for data
                protection. You may do so in the EU member state of your
                residence, your place of work or the place of the alleged
                infringement. You may exercise any of your rights in relation to
                your personal data by contacting our Compliance Officer at:{' '}
                <A
                  href='mailto://support@push.org'
                  display=' inline'
                  color='var(--ifm-link-color)'
                  background='transparent'
                  padding='0px'
                  letterSpacing='inherit'
                  textTransform='initial'
                >
                  support@push.org
                </A>
                .
              </Span>

              {/* Your acceptance of these terms */}
              <Span
                weight='400'
                spacing='0.2em'
                textTransform='uppercase'
                margin='24px 0 8px'
              >
                1.13 Contact information
              </Span>

              <Span margin='12px 0'>
                This Policy applies in conjunction with any other notices,
                contractual clauses and consent clauses that apply in relation
                to the collection, use and disclosure of your personal data by
                us. We may revise this Policy from time to time without any
                prior notice. You may determine if any such revision has taken
                place by referring to the date on which this Policy was last
                updated.
              </Span>

              <Span margin='12px 0'>
                By using the Website and/or any services provided by Push, you
                signify your acceptance of this Policy and terms of service. If
                you do not agree to this Policy or terms of service, please do
                not use the Website or any services provided by Push. Your
                continued use of the Website following the posting of changes to
                this Policy will be deemed your acceptance of those changes.
              </Span>
            </ItemV>
          </MultiContent>
        </Content>
      </Section>
    </>
  );
};

const ListGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled(Section)`
  border-radius: 0 0 48px 48px;
`;

export default PrivacyComp;
