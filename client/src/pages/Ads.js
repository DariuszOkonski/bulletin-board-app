import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useGetAllAds from '../hooks/useGetAllAds';
import FullPageSpinner from '../components/FullPageSpinner';
import ErrorModal from '../components/ErrorModal';
import { useEffect } from 'react';
import NoAdsFound from '../components/NoAdsFound';
import PageTitle from '../components/PageTitle';
import AdShortCard from '../components/AdShortCard';

const Ads = () => {
  const { ads, isPending, isError } = useGetAllAds();

  if (isPending) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return (
      <ErrorModal
        show={isError}
        title='Unable to load advertisements'
        message='Unable to load ads. Please check your internet connection or try again later.'
      />
    );
  }

  if (!ads.data.length) {
    return <NoAdsFound />;
  }

  console.log('!!! ');

  return (
    <div>
      <Row className='mb-3'>
        <Col>
          <PageTitle title='Advertisements' />
        </Col>
      </Row>
      {ads.data.map((item) => (
        <Row className='mb-3' key={item._id}>
          <Col>
            <AdShortCard
              id={item._id}
              title={item.title}
              picture={item.picture}
              author={item.user.login}
              location={item.user.location}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Ads;
