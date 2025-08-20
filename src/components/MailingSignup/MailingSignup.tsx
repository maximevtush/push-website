/* eslint-disable no-useless-escape */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import React from 'react';

// External Components
import { useTranslation } from 'react-i18next';
import { BiLoaderAlt } from 'react-icons/bi';
import styled from 'styled-components';

// Internal Configs
import { device } from '@site/src/config/globals';
import useEmailValidationAndSend from '@site/src/hooks/useEmailValidationAndSend';

// Internal Components
import { Span } from '@site/src/css/SharedStyling';
import ArrowRight from '@site/static/assets/website/footer/arrow-right.svg';

export type signupType = {
  showButton?: boolean;
  showArrow?: boolean;
  background?: string;
  borderColor?: string;
  inputWidth?: string;
  textColor?: string;
  placeholderColor?: string;
  buttonBg?: string;
  buttonBorder?: string;
  arrowColor?: string;
  loaderColor?: string;
  fontFamily?: string;
  blendMode?: string;
  boxShadow?: string;
  backdrop?: string;
};

/**
 * MailingSignup component provides a user interface for subscribing to a mailing list.
 * It includes an input field for the email address and optional buttons for submission.
 * The component supports loading states and displays responses or errors based on the email validation process.
 * Includes SEO optimization with proper ARIA labels and semantic HTML structure.
 *
 * @param {signupType} props - The properties object.
 * @param {boolean} [props.showButton] - Determines if the submit button should be displayed.
 * @param {boolean} [props.showArrow] - Determines if the arrow icon button should be displayed.
 * @param {string} [props.background] - Background color for the input field and wrapper.
 * @param {string} [props.borderColor] - Border color for the wrapper.
 * @param {string} [props.inputWidth] - Width of the input field.
 * @param {string} [props.textColor] - Text color for the input field.
 */
export const MailingSignup = (props: signupType) => {
  const [isLoading, apiResponse, emailError, onEmailSubmit] =
    useEmailValidationAndSend(true);

  // Internationalization
  const { t } = useTranslation();

  return (
    <Box>
      <Wrapper
        onSubmit={onEmailSubmit}
        role='form'
        aria-label={t('components.mailing-signup.form-aria-label')}
      >
        <SignupInputField
          type='email'
          name='email'
          placeholder={
            t('components.mailing-signup.email-input-placeholder') ||
            'satoshi@bitcoin.com'
          }
          title={t('components.mailing-signup.email-input-title')}
          aria-label={t('components.mailing-signup.email-input-aria-label')}
          background={props.background}
          inputWidth={props.inputWidth}
          textColor={props.textColor}
          border={props.borderColor}
          blendMode={props.blendMode}
          boxShadow={props.boxShadow}
          backdrop={props.backdrop}
          fontFamily={props.fontFamily}
          tabIndex={0}
          required
          autoComplete='email'
          autoCapitalize='none'
          autoCorrect='off'
          spellCheck='false'
        />
        {props.showButton && (
          <>
            <Button
              tabIndex={0}
              type='submit'
              title={t('components.mailing-signup.submit-button-title')}
              aria-label={t(
                'components.mailing-signup.submit-button-aria-label'
              )}
              buttonBg={props.buttonBg}
              buttonBorder={props.buttonBorder}
              arrowColor={props.arrowColor}
              loaderColor={props.loaderColor}
              disabled={isLoading}
            >
              {!isLoading && <ArrowRight className='arrow' />}
              {isLoading && <BiLoaderAlt size={32} className='loader' />}
            </Button>
            {isLoading ? <MaskInput /> : null}
          </>
        )}
      </Wrapper>

      {apiResponse && (
        <ResponseSpan
          className='msg'
          color='#fff'
          fontFamily={props.fontFamily}
          role='status'
          aria-label={t('components.mailing-signup.success-message-aria-label')}
          aria-live='polite'
        >
          {apiResponse}
        </ResponseSpan>
      )}
      {!apiResponse && emailError && (
        <ResponseSpan
          className='msg'
          color='red'
          fontFamily={props.fontFamily}
          role='alert'
          aria-label={t('components.mailing-signup.error-message-aria-label')}
          aria-live='assertive'
        >
          {emailError}
        </ResponseSpan>
      )}
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;

  @media ${device.tablet} {
    & .msg {
      font-size: 18px;
      margin: 10px auto 0px auto;
    }
  }
`;

const Wrapper = styled.form`
  position: relative;
  display: flex;
  flex: 1;
  gap: 12px;
  align-items: center;
  padding: 5px 0px;
  justify-content: space-between;
  background: transparent !important;

  @media ${device.tablet} {
    gap: 12px;
  }
`;

const Button = styled.button<{
  buttonBg?: string;
  buttonBorder?: string;
  arrowColor?: string;
  loaderColor?: string;
}>`
  cursor: pointer;
  background: ${(props) => props.buttonBg || '#000'};
  border: ${(props) => props.buttonBorder || '0'};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  width: 72px;
  white-space: nowrap;

  @media ${device.tablet} {
    min-width: auto;
    font-size: 12px;
  }

  @media ${device.mobileL} {
    height: 72px;
    width: 72px;
  }

  .arrow {
    height: 100%;
    width: 100%;
    color: ${(props) => props.arrowColor || '#e492ff'};
  }

  .loader {
    height: 1.5rem;
    width: 1.5rem;
    color: ${(props) => props.arrowColor || '#e492ff'};
  }

  @keyframes loadingAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  & .loader {
    animation-name: loadingAnimation;
    animation-duration: 1500ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    color: ${(props) => props.loaderColor || '#FFF'};
  }
`;

const SignupInputField = styled.input`
  all: unset;
  box-sizing: border-box;
  color: ${(props) => props.placeholderColor || '#a3a7ac'};
  font-family: ${(props) => props.fontFamily || 'DM Sans'};
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.48px;
  background: ${(props) => props.background || '#ffffff'};
  width: ${(props) => props.inputWidth || '100%'};
  border: 1px solid ${(props) => props.border || 'transparent'};
  padding: 24px;
  flex: 1;
  border-radius: 16px;
  max-height: 72px;
  min-height: 72px;
  text-align: start;

  background-blend-mode: ${(props) => props.blendMode || 'normal'};
  box-shadow: ${(props) => props.boxShadow || 'none'};
  backdrop-filter: ${(props) => props.backdrop || 'none'};

  &:focus,
  &:active,
  &:not(:placeholder-shown) {
    color: ${(props) => props.textColor || '#ffffff'};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: ${(props) => props.boxShadow || 'none'} !important;
    -webkit-text-fill-color: ${(props) =>
      props.textColor || '#ffffff'} !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  @media ${device.laptop} {
    min-width: auto;
  }

  @media ${device.mobileL} {
    font-size: 16px;
    padding: 16px 24px;
  }

  &::placeholder {
    color: ${(props) => props.placeholderColor || '#a3a7ac'};
    opacity: 1;
  }
`;

const MaskInput = styled.div`
  position: absolute;
  background: transparent;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 21px;
  opacity: 0.4;
  z-index: 10;
`;

const ResponseSpan = styled(Span)<{ fontFamily?: string }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 4px 0 0 0;
  font-family: ${(props) => props.fontFamily || 'DM Sans'};
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
`;
