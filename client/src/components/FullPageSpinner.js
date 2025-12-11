import { Spinner } from 'react-bootstrap';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
};

const FullPageSpinner = ({ show = true, variant = 'light', size = 64 }) => {
  if (!show) return null;

  return (
    <div style={overlayStyle} role='status' aria-live='polite'>
      <Spinner
        animation='border'
        variant={variant}
        style={{ width: size, height: size }}
      >
        <span className='visually-hidden'>Loading…</span>
      </Spinner>
    </div>
  );
};

export default FullPageSpinner;
