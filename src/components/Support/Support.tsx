import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

import { device } from '@site/src/config/globals';
import { contactFormTopics } from './Support.constants';
import { supportValidationSchema } from './Support.utils';

const Support: FC = () => {
  const [status, setStatus] = useState(0);
  const [contactFormAlertMsg, setContactFormAlertMsg] = useState('');
  const [validateOnReset, setValidateOnReset] = useState(true);

  // const { mutate: sendMessage, isPending: isSendingMessage } =
  //   useSendSupportMessage();
  const isSendingMessage = false;

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
    console.log(name, email, topic, subject, message, 'formdata');
    // sendMessage(
    //   {
    //     from: email,
    //     name,
    //     topic,
    //     sub: subject,
    //     msg: message,
    //   },
    //   {
    //     onSuccess: () => {
    //       setStatus(1);
    //       setContactFormAlertMsg('Message Sent! We will be in Touch :)');
    //       supportFormik.resetForm();
    //       setValidateOnReset(true);
    //     },
    //     onError: (error: Error) => {
    //       console.log('Error sending code', error);
    //       setContactFormAlertMsg(
    //         'Error in sending mail, please try again later...'
    //       );
    //       setStatus(2);
    //     },
    //   }
    // );
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

        <StyledForm onSubmit={supportFormik.handleSubmit}>
          <FormCard>
            <FormHeader>
              <Title>Support</Title>
              <Subtitle>Let's get in touch!</Subtitle>
            </FormHeader>

            <InputRow>
              <InputWrapper width='219px'>
                <Label>Name</Label>
                <StyledInput
                  required
                  type='text'
                  placeholder='Your name'
                  value={supportFormik.values.name}
                  onChange={supportFormik.handleChange('name')}
                  hasError={
                    supportFormik.touched.name &&
                    Boolean(supportFormik.errors.name)
                  }
                  disabled={isSendingMessage}
                />
                {supportFormik.touched.name && supportFormik.errors.name && (
                  <ErrorMessage>{supportFormik.errors.name}</ErrorMessage>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>E-mail</Label>
                <StyledInput
                  required
                  type='email'
                  placeholder='your.email@example.com'
                  value={supportFormik.values.email}
                  onChange={supportFormik.handleChange('email')}
                  hasError={
                    supportFormik.touched.email &&
                    Boolean(supportFormik.errors.email)
                  }
                  disabled={isSendingMessage}
                />
                {supportFormik.touched.email && supportFormik.errors.email && (
                  <ErrorMessage>{supportFormik.errors.email}</ErrorMessage>
                )}
              </InputWrapper>
            </InputRow>

            <InputWrapper>
              <Label>Topic</Label>
              <StyledSelect
                required
                value={supportFormik.values.topic}
                onChange={supportFormik.handleChange('topic')}
                hasError={
                  supportFormik.touched.topic &&
                  Boolean(supportFormik.errors.topic)
                }
                disabled={isSendingMessage}
              >
                {contactFormTopics.map((topic) => (
                  <option key={topic.value} value={topic.value}>
                    {topic.label}
                  </option>
                ))}
              </StyledSelect>
              {supportFormik.touched.topic && supportFormik.errors.topic && (
                <ErrorMessage>{supportFormik.errors.topic}</ErrorMessage>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label>Subject</Label>
              <StyledInput
                required
                type='text'
                placeholder='I want to tell you guys a secret!'
                value={supportFormik.values.subject}
                onChange={supportFormik.handleChange('subject')}
                hasError={
                  supportFormik.touched.subject &&
                  Boolean(supportFormik.errors.subject)
                }
                disabled={isSendingMessage}
              />
              {supportFormik.touched.subject &&
                supportFormik.errors.subject && (
                  <ErrorMessage>{supportFormik.errors.subject}</ErrorMessage>
                )}
            </InputWrapper>

            <InputWrapper>
              <Label>Message</Label>
              <StyledTextArea
                required
                placeholder='This is where you will tell us that secret, or a bug or whatever is on your mind.'
                rows={12}
                value={supportFormik.values.message}
                onChange={supportFormik.handleChange('message')}
                hasError={
                  supportFormik.touched.message &&
                  Boolean(supportFormik.errors.message)
                }
                disabled={isSendingMessage}
              />
              {supportFormik.touched.message &&
                supportFormik.errors.message && (
                  <ErrorMessage>{supportFormik.errors.message}</ErrorMessage>
                )}
            </InputWrapper>

            <SubmitButton type='submit' disabled={isSendingMessage}>
              {isSendingMessage ? 'Submitting...' : 'Submit'}
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

  &::placeholder {
    color: #9ca3af;
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
