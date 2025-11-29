import React from 'react';
import Layout from '@theme-original/Layout';
import ChatbotWrapper from '@site/src/components/ChatbotWrapper';

export default function LayoutWrapper(props): JSX.Element {
  return (
    <Layout {...props}>
      {props.children}
      <ChatbotWrapper />
    </Layout>
  );
}
