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

const Ads = () => {
  const { ads, isPending, status, isError } = useGetAllAds();

  console.log('ads: ', ads);
  console.log('isPending: ', isPending);
  console.log('status: ', status);
  console.log('isError: ', isError);

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

  return (
    <div>
      <Row className='mb-3'>
        <Col>
          <PageTitle title='Advertisements' />
        </Col>
      </Row>
      {ads.data.map((item) => (
        <Row className='mb-3'>
          <Col>
            <p>title: {item.title}</p>
            <p>picture: {item.picture}</p>
            <p>location: {item.user.location}</p>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Ads;
