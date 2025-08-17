import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import styled, { keyframes } from 'styled-components';

import { device } from '@site/src/config/globals';
import { contactFormTopics } from './Support.constants';
import { useSendSupportMessage } from './useSendSupportMessage';
import { supportValidationSchema } from './Support.utils';

interface FormData {
  name: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
}

const SUPPORT_CATEGORIES = [
  { id: 'technical', label: '🔧 Technical Support', description: 'Bug reports, integration help' },
  { id: 'partnership', label: '🤝 Partnership', description: 'Business partnerships, collaborations' },
  { id: 'grants', label: '💰 Grants & Funding', description: 'Grant applications, funding inquiries' },
  { id: 'media', label: '📰 Media & Press', description: 'Press inquiries, media requests' },
  { id: 'security', label: '🛡️ Security', description: 'Security disclosures, vulnerabilities' },
  { id: 'general', label: '💬 General Inquiry', description: 'Questions, feedback, other topics' },
];

const Support: FC = () => {
  const [status, setStatus] = useState(0);
  const [contactFormAlertMsg, setContactFormAlertMsg] = useState('');
  const [validateOnReset, setValidateOnReset] = useState(true);

  const { mutate: sendMessage, isPending: isSendingMessage } =
    useSendSupportMessage();

  const supportFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      topic: contactFormTopics[0].value,
      subject: '',
      message: '',
    },
    validationSchema: validateOnReset ? supportValidationSchema : null,
    onSubmit: () => {
      handleContactFormSubmit();
    },
  });

  const handleContactFormSubmit = () => {
    setValidateOnReset(false);
    const { name, email, topic, subject, message } = supportFormik.values;
    sendMessage(
      {
        from: email,
        name,
        topic,
        sub: subject,
        msg: message,
      },
      {
        onSuccess: () => {
          setStatus(1);
          setContactFormAlertMsg('Message Sent! We will be in Touch :)');
          supportFormik.resetForm();
          setValidateOnReset(true);
        },
        onError: (error: Error) => {
          console.log('Error sending code', error);
          setContactFormAlertMsg(
            'Error in sending mail, please try again later...'
          );
          setStatus(2);
        },
      }
    );
  };

  return (
    <Container>
      <FormWrapper>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        
        <StepCounter>
          {currentStep + 1} of {steps.length}
        </StepCounter>

        <StepContent>
          <StepTitle>{currentStepData.title}</StepTitle>
          <StepSubtitle>{currentStepData.subtitle}</StepSubtitle>

          {currentStepData.type === 'select' ? (
            <CategoryGrid>
              {SUPPORT_CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.id}
                  selected={formData.category === category.id}
                  onClick={() => handleInputChange('category', category.id)}
                >
                  <CategoryLabel>{category.label}</CategoryLabel>
                  <CategoryDescription>{category.description}</CategoryDescription>
                </CategoryCard>
              ))}
            </CategoryGrid>
          ) : currentStepData.type === 'textarea' ? (
            <StyledTextArea
              value={formData[currentStepData.field as keyof FormData]}
              onChange={(e) => handleInputChange(currentStepData.field, e.target.value)}
              placeholder={currentStepData.placeholder}
              onKeyPress={handleKeyPress}
              hasError={!!errors[currentStepData.field as keyof FormData]}
              autoFocus
            />
          ) : (
            <StyledInput
              type={currentStepData.type}
              value={formData[currentStepData.field as keyof FormData]}
              onChange={(e) => handleInputChange(currentStepData.field, e.target.value)}
              placeholder={currentStepData.placeholder}
              onKeyPress={handleKeyPress}
              hasError={!!errors[currentStepData.field as keyof FormData]}
              autoFocus
            />
          )}

          {errors[currentStepData.field as keyof FormData] && (
            <ErrorMessage>{errors[currentStepData.field as keyof FormData]}</ErrorMessage>
          )}
        </StepContent>

        <ButtonGroup>
          {currentStep > 0 && (
            <BackButton onClick={handleBack}>
              ← Back
            </BackButton>
          )}
          
          <NextButton 
            onClick={handleNext}
            disabled={isSubmitting}
            isPrimary={currentStep === steps.length - 1}
          >
            {isSubmitting ? (
              <>⏳ Submitting...</>
            ) : currentStep === steps.length - 1 ? (
              'Submit →'
            ) : (
              'Continue →'
            )}
          </NextButton>
        </ButtonGroup>
        
        <KeyboardHint>
          Press <kbd>Enter</kbd> to continue
        </KeyboardHint>
      </FormWrapper>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
  height: 100%;
  padding: 16px 0;

  padding-top: 148px;
  background: #000;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-self: center;
  width: 800px;
  max-width: 100%;

  @media ${device.tablet} {
    width: 100%;
    padding: 0 16px;
  }
`;

const AlertContainer = styled.div<{ variant: 'success' | 'error' }>`
  display: flex;
  align-items: flex-start;
  padding: 16px 20px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.variant === 'success'
      ? 'rgba(34, 197, 94, 0.1)'
      : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid
    ${(props) =>
      props.variant === 'success'
        ? 'rgba(34, 197, 94, 0.3)'
        : 'rgba(239, 68, 68, 0.3)'};
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertHeader = styled.h4`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;

const AlertDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #d1d5db;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  margin-left: 12px;

  &:hover {
    color: #ffffff;
  }
`;

const StyledForm = styled.form`
  width: 100%;
`;

const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 48px;
  border-radius: 12px;
  background-color: #202124;
  // background-color: #202124;

  @media ${device.tablet} {
    padding: 24px;
  }
`;

const FormHeader = styled.div`
  align-self: center;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;

  @media ${device.tablet} {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #9ca3af;
  margin: 0;
`;

const InputRow = styled.div`
  display: flex;
  gap: 12px;

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: ${(props) => props.width || 'auto'};

  @media ${device.tablet} {
    width: 100%;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 8px;
`;

const inputStyles = `
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  background-color: #313338;
  color: #ffffff;
  font-size: 16px;
  font-family: 'DM Sans', sans-serif;

  &::placeholder {
    color: #9ca3af;
    font-family: 'DM Sans', sans-serif;
  }

  &:focus {
    outline: none;
    border-color: #e91e63;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  ${inputStyles}
  border-color: ${(props) =>
    props.hasError ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'};
`;

const StyledSelect = styled.select<{ hasError?: boolean }>`
  ${inputStyles}
  cursor: pointer;
  border-color: ${(props) =>
    props.hasError ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'};
  padding-right: 40px;
  background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  option {
    background-color: #2a2a39;
    color: #ffffff;
  }
`;

const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
  ${inputStyles}
  resize: vertical;
  min-height: 150px;
  font-family: inherit;
  border-color: ${(props) =>
    props.hasError ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'};
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #ef4444;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  padding: 14px 32px;
  border-radius: 8px;
  border: none;
  background: #484d58;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export { Support };
