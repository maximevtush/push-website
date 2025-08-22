import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

import { device } from '@site/src/config/globals';
import { contactFormTopics } from './Contact.constants';
import { useSendContactMessage } from './useSendContactMessage';
import { contactValidationSchema } from './Contact.utils';

const Contact: FC = () => {
  const [status, setStatus] = useState(0);
  const [contactFormAlertMsg, setContactFormAlertMsg] = useState('');
  const [validateOnReset, setValidateOnReset] = useState(true);

  const { mutate: sendMessage, isPending: isSendingMessage } =
    useSendContactMessage();

  const contactFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      company: '',
      topic: contactFormTopics[0].value,
      subject: '',
      message: '',
    },
    validationSchema: validateOnReset ? contactValidationSchema : null,
    onSubmit: () => {
      handleContactFormSubmit();
    },
  });

  const handleContactFormSubmit = () => {
    setValidateOnReset(false);
    const { name, email, company, topic, subject, message } =
      contactFormik.values;
    sendMessage(
      {
        from: email,
        name,
        company,
        topic,
        sub: subject,
        msg: message,
      },
      {
        onSuccess: () => {
          setStatus(1);
          setContactFormAlertMsg('Message Sent! We will be in Touch :)');
          contactFormik.resetForm();
          setValidateOnReset(true);
        },
        onError: (error: Error) => {
          console.log('Error sending message', error);
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
        {status > 0 && (
          <AlertContainer variant={status === 1 ? 'success' : 'error'}>
            <AlertContent>
              <AlertHeader>{status === 1 ? 'Success' : 'Error'}</AlertHeader>
              <AlertDescription>{contactFormAlertMsg}</AlertDescription>
            </AlertContent>
            <CloseButton
              onClick={() => {
                setStatus(0);
                setContactFormAlertMsg('');
              }}
            >
              <AiOutlineClose />
            </CloseButton>
          </AlertContainer>
        )}

        <StyledForm onSubmit={contactFormik.handleSubmit}>
          <FormCard>
            <FormHeader>
              <Title>Contact</Title>
              <Subtitle>
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </Subtitle>
            </FormHeader>

            <InputRow>
              <InputWrapper width='219px'>
                <Label>Name</Label>
                <StyledInput
                  required
                  type='text'
                  placeholder='Your name'
                  value={contactFormik.values.name}
                  onChange={contactFormik.handleChange('name')}
                  hasError={
                    contactFormik.touched.name &&
                    Boolean(contactFormik.errors.name)
                  }
                  disabled={isSendingMessage}
                />
                {contactFormik.touched.name && contactFormik.errors.name && (
                  <ErrorMessage>{contactFormik.errors.name}</ErrorMessage>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>Email</Label>
                <StyledInput
                  required
                  type='email'
                  placeholder='your.email@example.com'
                  value={contactFormik.values.email}
                  onChange={contactFormik.handleChange('email')}
                  hasError={
                    contactFormik.touched.email &&
                    Boolean(contactFormik.errors.email)
                  }
                  disabled={isSendingMessage}
                />
                {contactFormik.touched.email && contactFormik.errors.email && (
                  <ErrorMessage>{contactFormik.errors.email}</ErrorMessage>
                )}
              </InputWrapper>
            </InputRow>

            <InputWrapper>
              <Label>Company (Optional)</Label>
              <StyledInput
                type='text'
                placeholder='Your company name'
                value={contactFormik.values.company}
                onChange={contactFormik.handleChange('company')}
                hasError={
                  contactFormik.touched.company &&
                  Boolean(contactFormik.errors.company)
                }
                disabled={isSendingMessage}
              />
              {contactFormik.touched.company &&
                contactFormik.errors.company && (
                  <ErrorMessage>{contactFormik.errors.company}</ErrorMessage>
                )}
            </InputWrapper>

            <InputWrapper>
              <Label>Topic</Label>
              <StyledSelect
                required
                value={contactFormik.values.topic}
                onChange={contactFormik.handleChange('topic')}
                hasError={
                  contactFormik.touched.topic &&
                  Boolean(contactFormik.errors.topic)
                }
                disabled={isSendingMessage}
              >
                {contactFormTopics.map((topic) => (
                  <option key={topic.value} value={topic.value}>
                    {topic.label}
                  </option>
                ))}
              </StyledSelect>
              {contactFormik.touched.topic && contactFormik.errors.topic && (
                <ErrorMessage>{contactFormik.errors.topic}</ErrorMessage>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label>Subject</Label>
              <StyledInput
                required
                type='text'
                placeholder="Let's collaborate on something amazing!"
                value={contactFormik.values.subject}
                onChange={contactFormik.handleChange('subject')}
                hasError={
                  contactFormik.touched.subject &&
                  Boolean(contactFormik.errors.subject)
                }
                disabled={isSendingMessage}
              />
              {contactFormik.touched.subject &&
                contactFormik.errors.subject && (
                  <ErrorMessage>{contactFormik.errors.subject}</ErrorMessage>
                )}
            </InputWrapper>

            <InputWrapper>
              <Label>Message</Label>
              <StyledTextArea
                required
                placeholder='Tell us about your project, partnership idea, or how we can help you...'
                rows={12}
                value={contactFormik.values.message}
                onChange={contactFormik.handleChange('message')}
                hasError={
                  contactFormik.touched.message &&
                  Boolean(contactFormik.errors.message)
                }
                disabled={isSendingMessage}
              />
              {contactFormik.touched.message &&
                contactFormik.errors.message && (
                  <ErrorMessage>{contactFormik.errors.message}</ErrorMessage>
                )}
            </InputWrapper>

            <SubmitButton type='submit' disabled={isSendingMessage}>
              {isSendingMessage ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </FormCard>
        </StyledForm>
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
  background: var(--ifm-color-black);
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
  color: var(--ifm-color-white);
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
    color: var(--ifm-color-white);
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
  background-color: var(--ifm-color-gray-700);

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
  color: var(--ifm-color-white);
  margin: 0 0 8px 0;

  @media ${device.tablet} {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #9ca3af;
  margin: 0;
  max-width: 600px;
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
  color: var(--ifm-color-white);
  margin-bottom: 8px;
`;

const inputStyles = `
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  background-color: #313338;
  color: var(--ifm-color-white);
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
    background-color: var(--ifm-color-gray-200);
    color: var(--ifm-color-white);
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
  color: var(--ifm-color-white);
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

export { Contact };
