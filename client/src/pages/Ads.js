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

const Ads = () => {
  const { data, isPending, status, isError, error } = useGetAllAds();

  console.log('data: ', data);
  console.log('isPending: ', isPending);
  console.log('status: ', status);
  console.log('isError: ', isError);
  console.log('error: ', error);

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

  return (
    <div>
      <Row className='mb-3'>
        <Col>
          <h2>Advertisements</h2>
        </Col>
      </Row>
    </div>
  );
};

export default Ads;
