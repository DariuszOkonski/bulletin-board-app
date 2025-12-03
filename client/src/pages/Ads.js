import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import AdShortCard from '../components/AdShortCard';
import ErrorModal from '../components/ErrorModal';
import FullPageSpinner from '../components/FullPageSpinner';
import NoAdsFound from '../components/NoAdsFound';
import PageTitle from '../components/PageTitle';
import SearchAds from '../components/SearchAds';
import useGetAllAds from '../hooks/useGetAllAds';

const Ads = () => {
  const [searchBy, setSearchBy] = useState('');
  const { ads, isPending, isError } = useGetAllAds({ search: searchBy });

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
      <Row className='mb-3'>
        <Col>
          <SearchAds onSetSearchBy={setSearchBy} />
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
