import { useContext } from 'react';
import getBase64 from '../../../Functions/getBase64';
import BackContext from '../BackContext';

function Photo() {
  const { fileInput, image, setImage, showMessage } = useContext(BackContext);

  const showImage = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setImage(photo))
      .catch((_) => {
        showMessage({ text: 'failo pasirinkimas atsauktas!', type: 'danger' });
      });
  };

  return (
    <div className='flex-row'>
      <div>
        <label>Photo</label>
        <input ref={fileInput} type='file' onChange={showImage} />
        <small style={{ fontSize: '12px', float: 'left' }}>
          Upload Photo.
        </small>
      </div>
      {image ? (
        <div className='fix'>
          <img
            src={image}
            alt='activity'
          />
        </div>
      ) : null}
    </div>)
}

export default Photo;