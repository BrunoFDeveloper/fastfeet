import React, { useState, useEffect } from 'react';
import { FaImage } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Container } from './styles';

import api from '~/services/api';

export default function AvatarPreview({ imageUrl, register, id }) {
  const [imagePreview, setPreview] = useState(imageUrl);

  const [avatarId, setAvatarId] = useState(id);

  async function handleFileChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    setAvatarId(response.data.id);
    setPreview(response.data.url);
  }

  useEffect(() => {
    setPreview(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    setAvatarId(id);
  }, [id]);

  return (
    <Container>
      <label htmlFor="avatar">
        {imagePreview ? (
          <img src={imagePreview} alt="Profile" />
        ) : (
          <>
            <FaImage color="#CCC" size={25} />
            <span>Adicionar foto</span>
          </>
        )}

        <input
          id="avatar"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
        <input
          defaultValue={avatarId}
          type="text"
          name="avatar_id"
          ref={register}
        />
      </label>
    </Container>
  );
}

AvatarPreview.defaultProps = {
  imageUrl: '',
  id: '',
};

AvatarPreview.propTypes = {
  imageUrl: PropTypes.string,
  register: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
